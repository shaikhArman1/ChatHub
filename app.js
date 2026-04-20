// ============ DATA STRUCTURE & STATE ============
let currentUser = null;
let selectedChatUser = null;
let confirmationCallback = null;
let selectedMessages = new Set();
let isSelectionMode = false;

// Database - simulating a backend
let database = {
    users: {},
    messages: {} // Format: { "user1-user2": [messages] }
};

// Demo data
const demoUsers = {
    alice: {
        username: 'alice',
        email: 'alice@example.com',
        password: 'password123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
        bio: 'Creative designer and coffee lover ☕',
        joinDate: new Date(2024, 0, 15),
        isOnline: true
    },
    bob: {
        username: 'bob',
        email: 'bob@example.com',
        password: 'password123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
        bio: 'Full-stack developer | Tech enthusiast',
        joinDate: new Date(2024, 1, 20),
        isOnline: true
    },
    charlie: {
        username: 'charlie',
        email: 'charlie@example.com',
        password: 'password123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie',
        bio: 'Product manager | Startup lover 🚀',
        joinDate: new Date(2024, 2, 10),
        isOnline: true
    }
};

// Initialize with demo users
function initializeDemoUsers() {
    for (const key in demoUsers) {
        database.users[demoUsers[key].username] = { ...demoUsers[key] };
    }
}

// ============ AUTHENTICATION ============
function signup() {
    const username = document.getElementById('authUsername').value.trim();
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    const avatar = document.getElementById('authAvatar').value.trim() || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';

    // Validation
    if (!username || !email || !password) {
        alert('Please fill in all fields');
        return;
    }

    if (username.length < 3) {
        showUsernameError('Username must be at least 3 characters');
        return;
    }

    if (database.users[username.toLowerCase()]) {
        showUsernameError('Username already exists');
        return;
    }

    // Create user
    const newUser = {
        username: username.toLowerCase(),
        email: email,
        password: password,
        avatar: avatar,
        bio: '',
        joinDate: new Date(),
        isOnline: true
    };

    database.users[username.toLowerCase()] = newUser;
    clearUsernameError();
    
    // Auto login after signup
    currentUser = newUser;
    localStorage.setItem('currentUser', newUser.username);
    switchToAppPage();
}

function loginDemo(username) {
    const user = database.users[username];
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', username);
        switchToAppPage();
    }
}

function logout() {
    if (currentUser) {
        currentUser.isOnline = false;
        currentUser = null;
        selectedChatUser = null;
        selectedMessages.clear();
        localStorage.removeItem('currentUser');
        switchToAuthPage();
    }
}

// ============ PAGE NAVIGATION ============
function switchToAppPage() {
    document.getElementById('authPage').classList.remove('active');
    document.getElementById('appPage').classList.add('active');
    updateUI();
}

function switchToAuthPage() {
    document.getElementById('appPage').classList.remove('active');
    document.getElementById('authPage').classList.add('active');
    clearAuthForm();
}

function updateUI() {
    // Update profile section
    document.getElementById('currentUserAvatar').src = currentUser.avatar;
    document.getElementById('currentUsername').textContent = currentUser.username;

    // Update users list
    renderUsersList();

    // Clear chat screen if any
    deselectUser();
}

function clearAuthForm() {
    document.getElementById('authUsername').value = '';
    document.getElementById('authEmail').value = '';
    document.getElementById('authPassword').value = '';
    document.getElementById('authAvatar').value = 'https://api.dicebear.com/7.x/avataaars/svg?seed=default';
    clearUsernameError();
}

// ============ USERS LIST & SELECTION ============
function renderUsersList() {
    const usersList = document.getElementById('usersList');
    const searchQuery = document.getElementById('userSearchInput').value.toLowerCase();
    
    usersList.innerHTML = '';

    for (const username in database.users) {
        if (username === currentUser.username) continue; // Don't show self

        const user = database.users[username];
        
        // Filter by search
        if (!user.username.includes(searchQuery)) continue;

        const userItem = document.createElement('div');
        userItem.className = 'user-item';
        if (selectedChatUser && selectedChatUser.username === username) {
            userItem.classList.add('active');
        }

        userItem.innerHTML = `
            <img src="${user.avatar}" alt="${user.username}" class="user-avatar-small">
            <div class="user-item-info">
                <div class="user-item-name">${user.username}</div>
                <div class="user-item-status">${user.isOnline ? 'Online' : 'Offline'}</div>
            </div>
        `;

        userItem.addEventListener('click', () => selectUser(user));
        usersList.appendChild(userItem);
    }
}

function selectUser(user) {
    selectedChatUser = user;
    selectedMessages.clear();
    isSelectionMode = false;
    renderUsersList();
    renderChatScreen();
    renderMessages();
}

function deselectUser() {
    selectedChatUser = null;
    selectedMessages.clear();
    isSelectionMode = false;
    document.getElementById('welcomeScreen').classList.add('active');
    document.getElementById('chatScreen').classList.remove('active');
}

// ============ MESSAGES ============
function getConversationKey(user1, user2) {
    const names = [user1, user2].sort();
    return `${names[0]}-${names[1]}`;
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const text = input.value.trim();

    if (!text || !selectedChatUser) {
        return;
    }

    const conversationKey = getConversationKey(currentUser.username, selectedChatUser.username);
    
    if (!database.messages[conversationKey]) {
        database.messages[conversationKey] = [];
    }

    const message = {
        id: Date.now().toString(),
        sender: currentUser.username,
        text: text,
        timestamp: new Date(),
        deletedFor: [] // Track who deleted the message
    };

    database.messages[conversationKey].push(message);
    input.value = '';

    renderMessages();

    // Auto scroll to bottom
    setTimeout(() => {
        const container = document.getElementById('messagesContainer');
        container.scrollTop = container.scrollHeight;
    }, 0);
}

function renderMessages() {
    if (!selectedChatUser) return;

    const conversationKey = getConversationKey(currentUser.username, selectedChatUser.username);
    const messages = database.messages[conversationKey] || [];
    const container = document.getElementById('messagesContainer');

    container.innerHTML = '';

    messages.forEach((message) => {
        // Skip if deleted for current user
        if (message.deletedFor.includes(currentUser.username)) {
            return;
        }

        const messageEl = document.createElement('div');
        messageEl.className = `message ${message.sender === currentUser.username ? 'own' : ''}`;
        messageEl.dataset.messageId = message.id;

        const isOwn = message.sender === currentUser.username;
        const canDelete = isOwn || true; // Everyone can delete for themselves

        const checkbox = canDelete ? `<input type="checkbox" class="message-checkbox" data-message-id="${message.id}">` : '';
        const time = formatTime(message.timestamp);

        messageEl.innerHTML = `
            ${checkbox}
            <div class="message-content">
                <div class="message-bubble">${escapeHtml(message.text)}</div>
                <div class="message-time">${time}</div>
            </div>
        `;

        const checkbox_el = messageEl.querySelector('.message-checkbox');
        if (checkbox_el) {
            checkbox_el.addEventListener('change', (e) => {
                toggleMessageSelection(message.id, e.target.checked);
            });

            if (selectedMessages.has(message.id)) {
                checkbox_el.checked = true;
                messageEl.querySelector('.message-bubble').classList.add('selected');
            }
        }

        container.appendChild(messageEl);
    });
}

function toggleMessageSelection(messageId, checked) {
    if (checked) {
        selectedMessages.add(messageId);
        updateMessageBubbleStyle(messageId, true);
    } else {
        selectedMessages.delete(messageId);
        updateMessageBubbleStyle(messageId, false);
    }

    updateDeleteButton();
}

function updateMessageBubbleStyle(messageId, selected) {
    const bubble = document.querySelector(`[data-message-id="${messageId}"] .message-bubble`);
    if (bubble) {
        if (selected) {
            bubble.classList.add('selected');
        } else {
            bubble.classList.remove('selected');
        }
    }
}

function deleteSelectedMessages(deleteForEveryone) {
    if (selectedMessages.size === 0) return;

    const conversationKey = getConversationKey(currentUser.username, selectedChatUser.username);
    const messages = database.messages[conversationKey] || [];

    messages.forEach((message) => {
        if (selectedMessages.has(message.id)) {
            if (deleteForEveryone && message.sender === currentUser.username) {
                // Delete for everyone
                database.messages[conversationKey] = database.messages[conversationKey].filter(m => m.id !== message.id);
            } else {
                // Delete only for current user
                if (!message.deletedFor.includes(currentUser.username)) {
                    message.deletedFor.push(currentUser.username);
                }
            }
        }
    });

    selectedMessages.clear();
    isSelectionMode = false;
    renderMessages();
    updateDeleteButton();
}

function updateDeleteButton() {
    const container = document.getElementById('messagesContainer');
    let deleteBtn = container.querySelector('.delete-selected-btn');

    if (selectedMessages.size === 0) {
        if (deleteBtn) deleteBtn.remove();
        return;
    }

    if (!deleteBtn) {
        deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-selected-btn';
        container.appendChild(deleteBtn);
    }

    deleteBtn.innerHTML = `Delete (${selectedMessages.size}) ▼`;
    deleteBtn.onclick = showDeleteOptions;
}

function showDeleteOptions() {
    showConfirmation(
        `Delete ${selectedMessages.size} message(s)?`,
        () => deleteSelectedMessages(false),
        () => {
            // Show submenu
            const option = confirm('Delete for everyone? (Cancel = Delete only for me)');
            deleteSelectedMessages(option);
        }
    );
}

// ============ PROFILES ============
function renderChatScreen() {
    if (!selectedChatUser) return;

    document.getElementById('welcomeScreen').classList.remove('active');
    document.getElementById('chatScreen').classList.add('active');
    document.getElementById('chatUserAvatar').src = selectedChatUser.avatar;
    document.getElementById('chatUsername').textContent = selectedChatUser.username;
    document.getElementById('chatUserStatus').textContent = selectedChatUser.isOnline ? 'Online' : 'Offline';
}

function showProfile(user, isOwnProfile = false) {
    const modal = document.getElementById('profileModal');
    
    // Update modal content
    document.getElementById('modalUserAvatar').src = user.avatar;
    document.getElementById('modalUsername').textContent = user.username;
    document.getElementById('modalUserStatus').textContent = user.isOnline ? 'Online' : 'Offline';
    document.getElementById('modalUserEmail').textContent = user.email;
    document.getElementById('modalUserBio').textContent = user.bio || 'No bio yet';
    document.getElementById('modalUserJoinDate').textContent = formatDate(user.joinDate);

    const myProfileActions = document.getElementById('myProfileActions');
    const editSection = document.getElementById('editProfileSection');

    if (isOwnProfile) {
        myProfileActions.style.display = 'block';
        editSection.style.display = 'none';
    } else {
        myProfileActions.style.display = 'none';
        editSection.style.display = 'none';
    }

    modal.classList.add('active');
}

function closeProfileModal() {
    document.getElementById('profileModal').classList.remove('active');
}

function editProfile() {
    document.getElementById('editBioInput').value = currentUser.bio || '';
    document.getElementById('editAvatarInput').value = currentUser.avatar;
    document.getElementById('editProfileSection').style.display = 'block';
    document.getElementById('myProfileActions').style.display = 'none';
}

function saveProfile() {
    const bio = document.getElementById('editBioInput').value.trim();
    const avatar = document.getElementById('editAvatarInput').value.trim();

    if (!avatar) {
        alert('Avatar URL is required');
        return;
    }

    currentUser.bio = bio;
    currentUser.avatar = avatar;
    database.users[currentUser.username] = currentUser;

    // Update UI
    document.getElementById('currentUserAvatar').src = currentUser.avatar;
    showProfile(currentUser, true);

    alert('Profile updated successfully!');
}

function cancelEdit() {
    document.getElementById('editProfileSection').style.display = 'none';
    document.getElementById('myProfileActions').style.display = 'block';
}

// ============ CONFIRMATION MODAL ============
function showConfirmation(message, onConfirm, onCancel = null) {
    document.getElementById('confirmationMessage').textContent = message;
    confirmationCallback = onConfirm;
    document.getElementById('confirmationModal').classList.add('active');

    const confirmBtn = document.getElementById('confirmBtn');
    confirmBtn.onclick = () => {
        closeConfirmationModal();
        onConfirm();
    };
}

function closeConfirmationModal() {
    document.getElementById('confirmationModal').classList.remove('active');
    confirmationCallback = null;
}

// ============ UTILITY FUNCTIONS ============
function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showUsernameError(message) {
    const error = document.getElementById('usernameError');
    error.textContent = message;
}

function clearUsernameError() {
    document.getElementById('usernameError').textContent = '';
}

// ============ EVENT LISTENERS ============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize demo users
    initializeDemoUsers();

    // Check if user is logged in
    const savedUsername = localStorage.getItem('currentUser');
    if (savedUsername && database.users[savedUsername]) {
        currentUser = database.users[savedUsername];
        currentUser.isOnline = true;
        switchToAppPage();
    }

    // Auth page events
    document.getElementById('signupBtn').addEventListener('click', signup);
    
    document.getElementById('authUsername').addEventListener('keyup', clearUsernameError);
    document.getElementById('authPassword').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') signup();
    });

    // Toggle login link
    document.getElementById('toggleLoginLink').addEventListener('click', () => {
        alert('Login functionality uses existing demo accounts. Use the demo buttons or create a new account!');
    });

    // App page events
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('viewMyProfileBtn').addEventListener('click', () => {
        showProfile(currentUser, true);
    });

    document.getElementById('userSearchInput').addEventListener('input', renderUsersList);

    // Chat screen events
    document.getElementById('viewProfileBtn').addEventListener('click', () => {
        if (selectedChatUser) {
            showProfile(selectedChatUser, false);
        }
    });

    document.getElementById('messageInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    document.getElementById('sendBtn').addEventListener('click', sendMessage);

    // Profile modal events
    document.getElementById('editProfileBtn').addEventListener('click', editProfile);
    document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);

    // Close modal on outside click
    document.getElementById('profileModal').addEventListener('click', (e) => {
        if (e.target.id === 'profileModal') {
            closeProfileModal();
        }
    });

    document.getElementById('confirmationModal').addEventListener('click', (e) => {
        if (e.target.id === 'confirmationModal') {
            closeConfirmationModal();
        }
    });
});

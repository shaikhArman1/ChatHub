# ChatHub - Dynamic Chat Application

A fully functional chat application built with HTML, CSS, and JavaScript. Users can sign up, create unique usernames, view profiles, send messages, and manage message deletion.

## Features

### User Management
- **Sign Up**: Create new accounts with username, email, password, and avatar
- **Unique Usernames**: System prevents duplicate usernames
- **Demo Accounts**: Quick access to pre-made accounts (Alice, Bob, Charlie)
- **Profile Viewing**: View your own and other users' profiles
- **Profile Editing**: Change bio and avatar (own profile only)
- **Online Status**: See if users are online or offline
- **Session Persistence**: Login state is saved in localStorage

### Messaging
- **Send Messages**: Send messages to any user in real-time
- **Message History**: All conversations are preserved
- **Message Timestamps**: See when each message was sent
- **Delete for Me**: Delete messages only for yourself
- **Delete for Everyone**: Delete your own messages for all users
- **Message Selection**: Select multiple messages and delete them together

### User Discovery
- **User List**: See all available users in the sidebar
- **Search Functionality**: Filter users by username
- **User Profiles**: Click on any user to view their profile
- **Profile Information**: See username, email, bio, and join date

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. You can either:
   - **Create a new account** by filling the signup form
   - **Try demo accounts**: Click on Alice, Bob, or Charlie buttons

### Sending Messages
1. Select a user from the user list on the left sidebar
2. Type your message in the input field
3. Press Enter or click the Send button
4. Your message appears on the right side of the chat

### Managing Messages
1. **To delete your message for everyone**:
   - Check the checkbox next to your message
   - Click the "Delete (1) ▼" button that appears
   - Click "Confirm"

2. **To delete a message just for you**:
   - Check the checkbox next to the message
   - Click the "Delete (1) ▼" button
   - The message will be hidden from your view

3. **To delete multiple messages**:
   - Check multiple message checkboxes
   - Click the "Delete (N) ▼" button where N is the count
   - Confirm the deletion

### Viewing Profiles
1. Click on a user's name in the sidebar to open chat
2. Click "View Profile" in the chat header
3. To view your own profile: Click your username in the top-left profile section

### Editing Your Profile
1. Click on your username in the top-left profile section
2. Click "Edit Profile"
3. Update your bio and/or avatar URL
4. Click "Save Changes"

## Demo Accounts

| Username | Email | Password | Bio |
|----------|-------|----------|-----|
| alice | alice@example.com | password123 | Creative designer and coffee lover ☕ |
| bob | bob@example.com | password123 | Full-stack developer \| Tech enthusiast |
| charlie | charlie@example.com | password123 | Product manager \| Startup lover 🚀 |

## Technical Details

### Architecture
- **Frontend Only**: No backend server required
- **Local Storage**: User session is saved in browser
- **In-Memory Database**: All data is stored in JavaScript objects
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### File Structure
```
├── index.html       # Main HTML structure
├── styles.css       # Complete styling and responsive design
├── app.js          # All JavaScript functionality
└── README.md       # This file
```

### Key JavaScript Objects

**User Object**
```javascript
{
    username: string,      // Unique identifier
    email: string,
    password: string,      // Simple password (demo only)
    avatar: string,        // Avatar image URL
    bio: string,          // User biography
    joinDate: Date,       // Account creation date
    isOnline: boolean     // Online status
}
```

**Message Object**
```javascript
{
    id: string,           // Unique message ID
    sender: string,       // Username of sender
    text: string,         // Message content
    timestamp: Date,      // When message was sent
    deletedFor: array     // Usernames who deleted it
}
```

## Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser supporting ES6 JavaScript

## Data Persistence
- User sessions are saved in browser's localStorage
- All messages and user data are stored in-memory
- Data will be lost when the browser cache is cleared
- This is a demo application - use a backend for production

## Future Enhancements
- Real backend server with database
- User authentication with JWT tokens
- Real-time notifications with WebSockets
- Message encryption
- File sharing
- User presence tracking
- Group chats
- Message reactions and replies

## Notes
- This is a front-end demonstration application
- All data is stored locally in the browser
- For a production system, implement a proper backend
- Passwords are stored as plain text (demo only)
- Use HTTPS and proper authentication in production

## License
Free to use for educational purposes

---
**Built with ❤️ using HTML, CSS, and JavaScript**

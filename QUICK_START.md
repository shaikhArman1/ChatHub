# ChatHub - Quick Start Guide

## 🚀 Getting Started (30 seconds)

1. **Open** `index.html` in your browser
2. **Click** one of the demo buttons (Alice, Bob, or Charlie)
3. **Select** another user from the left sidebar
4. **Type** a message and press Enter
5. **Enjoy** chatting!

---

## 💡 Key Features Explained

### 1️⃣ Sign Up
```
Form Fields:
- Username (3+ characters, must be unique)
- Email (any valid email)
- Password (any password)
- Avatar URL (optional, uses default if empty)
```

### 2️⃣ Chat Interface
```
Left Sidebar:
├── Your Profile (Click to view/edit)
├── Search Bar (Filter users)
└── User List (Select to chat)

Main Area:
├── Chat Header (View user profile)
├── Messages Area (See conversation)
└── Input Box (Type and send messages)
```

### 3️⃣ Message Management
```
Default View:
- Messages show timestamp
- Your messages appear on the right
- Others' messages appear on the left

Selection Mode:
- Click checkbox to select message
- Selected messages highlight in yellow
- "Delete (N)" button appears
- Choose to delete for yourself or everyone
```

### 4️⃣ Profiles
```
Profile Information Shows:
✓ Avatar
✓ Username
✓ Online/Offline Status
✓ Email
✓ Bio
✓ Member Since date

Your Profile Only:
✓ Edit Profile button
✓ Change bio and avatar
✓ Save changes
```

---

## 🎮 Quick Actions

| Action | How To |
|--------|--------|
| Send Message | Type + Enter or Click Send |
| Select Message | Click checkbox on message |
| Delete Message | Check it, click Delete button |
| View Profile | Click username in chat header |
| Edit Profile | Click your name → Edit Profile |
| Search User | Type in search box |
| Logout | Click Logout button (top-right) |
| Create Account | Fill form & click Sign Up |

---

## 🧪 Demo Workflow

```
Step 1: Login as Alice
├─ Click "Alice" button

Step 2: Send a message to Bob
├─ Click "bob" in user list
├─ Type "Hi Bob!" 
├─ Press Enter

Step 3: View Bob's profile
├─ Click "View Profile" button
├─ See Bob's info

Step 4: Delete a message
├─ Check message checkbox
├─ Click "Delete (1)" 
├─ Confirm deletion

Step 5: Logout
├─ Click "Logout"
```

---

## ⚙️ Technical Notes

**Storage:**
- User sessions stored in `localStorage`
- Messages stored in memory (JavaScript objects)
- Data persists during browsing session
- Cleared when browser cache is cleared

**Responsive:**
- Desktop: Full sidebar + chat area
- Tablet: Stacked layout
- Mobile: Optimized for small screens

**No Backend Needed:**
- Everything runs in the browser
- No server required
- No internet connection needed (except for avatars)

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Avatar not loading | Use a valid image URL or use default |
| Session lost | Browser cache was cleared or cookies disabled |
| Messages not saving | Reload page - data is memory-based |
| Can't login | Create new account or use demo account |

---

## 📱 Avatar URLs You Can Use

```
DiceBear (Random):
https://api.dicebear.com/7.x/avataaars/svg?seed=yourname

Custom Initials:
https://api.dicebear.com/7.x/initials/svg?seed=A

Animal Icons:
https://api.dicebear.com/7.x/animal/svg?seed=random

Emoji Style:
https://api.dicebear.com/7.x/fun-emoji/svg?seed=yourname
```

---

## ✨ Tips & Tricks

1. **Create Multiple Accounts**
   - Sign up as different users
   - Test conversations between accounts
   - See how deletion works

2. **Delete for Everyone**
   - Only works for your own messages
   - Other users can't delete your messages
   - Perfect for correcting mistakes

3. **Profile Customization**
   - Edit your bio to any text
   - Change avatar to any image URL
   - Updates appear immediately

4. **Search Users**
   - Real-time filtering as you type
   - Case-insensitive search
   - Shows online status

---

**Enjoy ChatHub! 🎉**

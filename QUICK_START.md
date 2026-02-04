# Quick Start Guide - Admin Dashboard

## 🚀 Start the Application

### Terminal 1 - Backend
```powershell
cd Task_1
npm start
```
Backend runs on: http://localhost:5000

### Terminal 2 - Frontend
```powershell
cd task1-frontend
npm start
```
Frontend opens at: http://localhost:3000

## 👥 Create Test Users

### 1. Create Admin User
1. Go to http://localhost:3000/signup
2. Fill in:
   - Name: Admin User
   - Email: admin@test.com
   - Password: admin123
   - Role: **admin**
3. Click "Sign Up"

### 2. Create Regular Users
Repeat for multiple users:
- john@test.com (user)
- jane@test.com (user)
- mike@test.com (moderator)

## 📋 Test Task Management

### As Admin:

1. **Login:** admin@test.com / admin123

2. **View Analytics:**
   - Automatically see dashboard
   - View metrics (all will be 0 initially)

3. **Create First Task:**
   - Click "Task Management" tab
   - Click "+ Create New Task"
   - Fill in:
     - Title: "Complete Project Documentation"
     - Description: "Write comprehensive docs"
     - Assign To: Select a user (john@test.com)
     - Status: Pending
     - Priority: High
     - Due Date: Select tomorrow
   - Click "Create Task"

4. **Create More Tasks:**
   - "Fix Bug in Login" → Assign to jane@test.com (Urgent)
   - "Update API Tests" → Assign to john@test.com (Medium)
   - "Review Code" → Assign to mike@test.com (Low)
   - "Deploy to Production" → Assign to john@test.com (High)

5. **View Analytics:**
   - Go back to Analytics tab
   - See metrics updated
   - View charts populated
   - Check recent activity

6. **Manage Tasks:**
   - Edit a task (✏️ icon)
   - Change status to "In Progress"
   - Update priority
   - Save changes

7. **Filter Tasks:**
   - Filter by Status: "Pending"
   - Filter by Priority: "High"
   - Clear filters

8. **View Users:**
   - Click "User Management" tab
   - See all registered users
   - Search by name
   - Filter by role

### As Regular User:

1. **Login:** john@test.com / your-password

2. **View Dashboard:**
   - See "My Tasks" card with count
   - Scroll to "My Assigned Tasks" section
   - View all tasks assigned to you

3. **Update Task Status:**
   - Find "Complete Project Documentation"
   - Change status dropdown from "Pending" to "In Progress"
   - Status updates automatically

4. **Complete a Task:**
   - Change status to "Completed"
   - See visual change (green background)

## 📊 See Analytics Update

1. **Login as Admin** again

2. **View Analytics:**
   - Total Tasks: 5
   - Pending: Updated count
   - In Progress: Updated count
   - Completed: Updated count
   - Charts show distribution
   - Top users ranked
   - Recent activity updated

## 🎨 Ready for Your Figma Design

**Current Status:**
✅ Full functionality working
✅ All CRUD operations
✅ Role-based access
✅ Real-time updates
✅ Analytics & charts
✅ Task management
✅ User management

**Next Step:**
📤 **Share your Figma file** and I'll customize:
- Colors to match your brand
- Typography (fonts, sizes)
- Spacing and layouts
- Component styles
- Animations
- Icons
- Any specific design elements

## 🐛 Troubleshooting

### Backend won't start?
- Check `.env` file exists with Firebase credentials
- Run `npm install` in Task_1 folder

### Frontend won't start?
- Run `npm install` in task1-frontend folder
- Check port 3000 is available

### Can't create tasks?
- Ensure backend is running
- Check you're logged in as admin
- Verify user exists to assign to

### Tasks not showing?
- Refresh the page
- Check browser console for errors
- Verify backend connection

## 📝 Test Checklist

- [ ] Backend starts successfully
- [ ] Frontend opens in browser
- [ ] Can sign up new users
- [ ] Can login as admin
- [ ] Can create tasks
- [ ] Can assign tasks to users
- [ ] Can edit tasks
- [ ] Can delete tasks
- [ ] Can filter tasks
- [ ] Analytics show correct data
- [ ] Charts display properly
- [ ] User can see their tasks
- [ ] User can update task status
- [ ] Search and filters work

## 🎯 What's Included

### Backend:
- Task model with Firestore
- Task controller with all operations
- Task routes with authentication
- Statistics calculation
- Role-based permissions

### Frontend:
- Admin dashboard with tabs
- Analytics with charts
- Task management (CRUD)
- User management
- User task view
- Status updates
- Filters and search
- Responsive design
- Professional styling

### Features:
- JWT authentication
- Role-based access control
- Real-time data updates
- Task assignment
- Status tracking (Pending → In Progress → Completed)
- Priority levels (Low → Medium → High → Urgent)
- Due date management
- Analytics & statistics
- User search and filtering
- Responsive mobile design

**Everything is ready and fully functional! 🎉**

Share your Figma design to customize the look and feel!

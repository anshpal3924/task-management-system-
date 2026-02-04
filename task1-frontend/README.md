# JWT Authentication Frontend

A React frontend application for JWT authentication with role-based access control, built with React Router and Axios.

## Features

✅ User Authentication (Login/Signup)  
✅ JWT Token Management  
✅ Role-Based Access Control (User, Moderator, Admin)  
✅ Protected Routes  
✅ API Testing Interface  
✅ Admin Panel for User Management  
✅ Moderator Panel  
✅ Responsive Design  
✅ Context API for State Management  

## Project Structure

```
task1-frontend/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── AdminPanel.js      # Admin dashboard
│   │   ├── ApiTest.js         # API testing interface
│   │   ├── Dashboard.js       # Main dashboard
│   │   ├── Login.js          # Login form
│   │   ├── ModeratorPanel.js  # Moderator dashboard
│   │   ├── Navbar.js         # Navigation bar
│   │   ├── ProtectedRoute.js  # Route protection HOC
│   │   └── Signup.js         # Signup form
│   ├── context/           # React Context
│   │   └── AuthContext.js    # Authentication context
│   ├── services/          # API services
│   │   └── api.js           # Axios configuration & API calls
│   ├── App.css           # Main styles
│   ├── App.js            # Main app component
│   ├── index.css         # Global styles
│   └── index.js          # Entry point
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:5000`

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure API URL** (Optional)
   
   The default API URL is `http://localhost:5000`. To change it, edit `src/services/api.js`:
   ```javascript
   const API_URL = 'http://localhost:5000'; // Change this if needed
   ```

## Running the Application

### Development Mode

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Available Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/login` | Public | User login page |
| `/signup` | Public | User registration page |
| `/dashboard` | Protected | User dashboard |
| `/api-test` | Protected | API testing interface |
| `/admin` | Admin Only | Admin panel with user management |
| `/moderator` | Moderator/Admin | Moderator panel |

## Features Overview

### 1. Authentication

**Sign Up**
- Register with name, email, password, and role
- Automatic login after registration
- JWT token stored in localStorage

**Login**
- Email and password authentication
- JWT token management
- Automatic redirect to dashboard

**Logout**
- Clear token and user data
- Redirect to login page

### 2. Role-Based Access Control

The application supports three user roles:

- **User**: Basic access to dashboard and API testing
- **Moderator**: Access to moderator panel + user features
- **Admin**: Full access to all features including admin panel

### 3. Protected Routes

Routes are automatically protected based on authentication status and user roles:

```javascript
// Any authenticated user
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>

// Admin only
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>

// Moderator or Admin
<ProtectedRoute requiredRole="moderator">
  <ModeratorPanel />
</ProtectedRoute>
```

### 4. API Testing Interface

Test various backend endpoints directly from the UI:
- Health Check (Public)
- Get Users (Protected)
- Admin Dashboard (Admin only)
- Moderator Reports (Moderator/Admin)

View real-time responses and test authentication.

### 5. Admin Panel

- View all registered users
- Display user details (name, email, role, ID, creation date)
- Accessible only to admin users

### 6. State Management

Uses React Context API for global state:
- User authentication state
- JWT token management
- Role-based permissions
- Loading states

## API Integration

The frontend communicates with the backend via Axios. All API calls are centralized in `src/services/api.js`.

### API Configuration

```javascript
// Automatic token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Available API Functions

```javascript
// Authentication
authAPI.signup(userData)
authAPI.login(credentials)
authAPI.getProfile()
authAPI.getAllUsers()

// General APIs
generalAPI.healthCheck()
generalAPI.getUsers()
generalAPI.createUser(userData)
generalAPI.adminDashboard()
generalAPI.moderatorReports()
```

## Usage Example

### 1. Start the Backend Server

Make sure your backend is running on port 5000:
```bash
cd Task_1
npm start
```

### 2. Start the Frontend

```bash
cd task1-frontend
npm start
```

### 3. Register a New User

1. Navigate to [http://localhost:3000/signup](http://localhost:3000/signup)
2. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Role: user/moderator/admin
3. Click "Sign Up"

### 4. Test Features

- **Dashboard**: View your profile and access features
- **API Test**: Test various endpoints with your token
- **Admin Panel**: (Admin only) View all users
- **Moderator Panel**: (Moderator/Admin) Access moderator features

## Styling

The application uses custom CSS with:
- Gradient backgrounds
- Card-based layouts
- Responsive design
- Hover effects
- Role badges
- Alert messages

## Error Handling

- API errors are caught and displayed to users
- Authentication errors redirect to login
- Role-based access denials show appropriate messages
- Loading states for async operations

## Security Features

- JWT tokens stored in localStorage
- Automatic token injection in API requests
- Protected routes with role checking
- Secure password handling (backend)
- Token validation on each request

## Technologies Used

- **React** (v19.2.4) - UI library
- **React Router DOM** (v7.13.0) - Routing
- **Axios** (v1.13.4) - HTTP client
- **React Context API** - State management
- **CSS3** - Styling

## Troubleshooting

### Backend Connection Error

If you see connection errors:
1. Ensure backend is running on port 5000
2. Check CORS configuration in backend
3. Verify API_URL in `src/services/api.js`

### Token Expiration

JWT tokens expire based on backend configuration. If you get authentication errors:
1. Log out and log back in
2. Check JWT_EXPIRE setting in backend

### Role Access Issues

If you can't access certain routes:
1. Verify your user role in the dashboard
2. Check if backend assigned the correct role
3. Clear localStorage and re-login

## Development

### Available Scripts

- `npm start` - Run development server
- `npm test` - Run tests
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App (irreversible)

### Adding New Features

1. Create component in `src/components/`
2. Add route in `src/App.js`
3. Add API call in `src/services/api.js`
4. Update styles in `src/App.css`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for educational purposes.

## Backend Repository

This frontend works with the Express backend located in the `Task_1` directory.

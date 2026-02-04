# Express Backend Project

A Node.js Express backend project with JWT authentication, role-based authorization, and Firebase Firestore database.

## Features

✅ JWT Authentication (Login/Signup)  
✅ Role-Based Authorization (User, Moderator, Admin)  
✅ Password Hashing with bcrypt  
✅ Protected Routes  
✅ Firebase Firestore Database Integration  
✅ RESTful API Structure  

## Project Structure

```
Task_1/
├── config/            # Configuration files
│   ├── config.js          # App configuration
│   └── firebase.js        # Firebase initialization
├── controllers/       # Route controllers
│   ├── authController.js   # Authentication logic
│   └── apiController.js    # API logic
├── middleware/        # Custom middleware
│   ├── auth.js            # JWT & role authorization
│   └── logger.js          # Request logger
├── models/           # Data models
│   └── User.js           # User model with Firebase
├── routes/           # API routes
│   ├── auth.js           # Auth routes
│   └── api.js            # API routes
├── .env              # Environment variables (create from .env.example)
├── .env.example      # Example environment file
├── .gitignore        # Git ignore file
├── server.js         # Main application file
├── package.json      # Project dependencies
├── README.md         # This file
├── FIREBASE_SETUP.md # Firebase setup guide
└── API_TESTING.md    # API testing guide
```

## Getting Started

### Installation

```bash
npm install
```

### Running the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server with nodemon (auto-restart on changes)

## API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/auth/signup` | Public | Register a new user |
| POST | `/auth/login` | Public | Login user |
| GET | `/auth/me` | Private | Get current user profile |
| GET | `/auth/users` | Admin | Get all users |

### API Routes (`/api`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/health` | Public | Health check |
| GET | `/api/users` | Private | Get users list |
| POST | `/api/users` | Private | Create new user |
| GET | `/api/admin/dashboard` | Admin | Admin dashboard |
| GET | `/api/moderator/reports` | Moderator/Admin | Get reports |

## User Roles

- **user** - Default role with basic access
- **moderator** - Can access moderator routes
- **admin** - Full access to all routes

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Firebase
Follow the detailed guide in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

**Quick steps:**
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore Database
3. Generate a service account key
4. Copy `.env.example` to `.env` and fill in your Firebase credentials

### 3. Configure Environment
Update `.env` file with your credentials:
```env
# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=30d

# Firebase Configuration (get from Firebase Console)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project-id.iam.gserviceaccount.com
# ... see .env.example for all required fields
```

### 4. Start the Server
```bash
npm run dev
```

You should see:
```
Firebase Admin initialized successfully
Server is running on port 5000
```

### 4. Test the API

**Sign Up:**
```bash
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

**Check Firestore:**
- Open Firebase Console
- Go to Firestore Database
- You should see a `users` collection with your new user

**Login:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

**Access Protected Route:**
```bash
curl -X GET http://localhost:5000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Authentication Flow

1. User signs up with name, email, password, and role
2. Password is hashed using bcrypt
3. User receives JWT token upon successful registration/login
4. Include token in Authorization header for protected routes:
   ```
   Authorization: Bearer <token>
   ```
5. Server verifies token and checks user role for authorization

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {...}
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Technologies Used

- **Express.js** - Web framework
- **Firebase Admin SDK** - Firebase Firestore database
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management
- **nodemon** - Development auto-restart

## Database Structure

### Firestore Collections

**users**
```
users/
  └── {userId}/
      ├── name: string
      ├── email: string
      ├── password: string (bcrypt hashed)
      ├── role: string (user | moderator | admin)
      └── createdAt: string (ISO timestamp)
```

## Security Notes

⚠️ **Important:**
- Change `JWT_SECRET` in `.env` to a strong random string in production
- Never commit `.env` file or Firebase service account credentials to version control
- Configure proper Firestore security rules (see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md))
- Implement rate limiting for authentication endpoints
- Add input validation and sanitization
- Use HTTPS in production
- Consider implementing refresh tokens for better security

## Next Steps

To make this production-ready:

1. **Configure Firestore Security Rules**
   - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for examples
   - Restrict access based on authentication and user roles

2. **Add More Features**
   - Email verification
   - Password reset functionality
   - Refresh tokens
   - Account lockout after failed attempts
   - Two-factor authentication
   - User profile management
   - Password change functionality

3. **Add Validation**
   - express-validator or Joi
   - Input sanitization
   - File upload validation

4. **Add Rate Limiting**
   - express-rate-limit
   - Protect against brute force attacks

5. **Add Logging**
   - Winston or Morgan
   - Error tracking (Sentry)
   - Performance monitoring

6. **Add Testing**
   - Jest or Mocha/Chai
   - Supertest for API testing
   - Integration tests with Firebase emulator

7. **Add More Collections**
   - User profiles
   - Activity logs
   - Settings
   - Custom data models for your app

## Documentation

- [API Testing Guide](./API_TESTING.md) - Detailed API endpoint documentation and testing examples
- [Firebase Setup Guide](./FIREBASE_SETUP.md) - Step-by-step Firebase configuration

## Troubleshooting

### Firebase Connection Issues
- Verify all Firebase environment variables are set correctly
- Check that Firestore is enabled in Firebase Console
- Ensure service account has proper permissions
- See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed troubleshooting

### Common Errors
- **"Firebase Admin not initialized"** - Check `.env` file and restart server
- **"Permission denied"** - Update Firestore security rules
- **"Invalid credentials"** - Verify email/password combination
- **"User already exists"** - Email is already registered

## License

ISC

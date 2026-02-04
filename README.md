# Task Management System

A full-stack task management application with role-based access control.

## Features

- 🔐 JWT Authentication
- 👥 Role-based access (Admin, Moderator, User)
- 📋 Task CRUD operations
- 📊 Analytics Dashboard
- 🎨 Modern UI with Figma-inspired design
- 🔥 Firebase Firestore database

## Tech Stack

### Backend
- Node.js & Express
- Firebase Admin SDK
- JWT Authentication
- bcryptjs for password hashing

### Frontend
- React 19
- React Router DOM
- Axios
- Context API for state management

## Local Development

### Backend Setup

```bash
cd Task_1
npm install
```

Create `.env` file:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
```

Add Firebase service account key as `serviceAccountKey.json`

Run backend:
```bash
npm start
# or for development with auto-reload
npm run dev
```

### Frontend Setup

```bash
cd task1-frontend
npm install
npm start
```

Frontend runs on http://localhost:3000
Backend runs on http://localhost:5000

## Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

## API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/users` - Get all users (Admin only)

### Tasks
- `GET /api/tasks` - Get all tasks (Admin/Moderator)
- `GET /api/tasks/my-tasks` - Get user's tasks
- `GET /api/tasks/stats/overview` - Get task statistics
- `POST /api/tasks` - Create task (Admin/Moderator)
- `PATCH /api/tasks/:id` - Update task (Admin/Moderator)
- `PATCH /api/tasks/:id/status` - Update task status
- `DELETE /api/tasks/:id` - Delete task (Admin/Moderator)

## Default Test Users

After first run, you can create users with different roles:
- Admin: Full access to all features
- Moderator: Can manage tasks
- User: Can view and update their assigned tasks

## Project Structure

```
Task_1/                 # Backend
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── server.js

task1-frontend/         # Frontend
├── public/
└── src/
    ├── components/
    ├── context/
    ├── services/
    └── styles/
```

## License

ISC

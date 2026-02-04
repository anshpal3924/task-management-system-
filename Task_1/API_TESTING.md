# JWT Authentication API - Testing Guide

## Base URL
`http://localhost:5000`

---

## Authentication Endpoints

### 1. Sign Up (Register)
**POST** `/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Roles:**
- `user` (default)
- `moderator`
- `admin`

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1706603200000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-01-30T..."
  }
}
```

---

### 2. Login
**POST** `/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1706603200000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-01-30T..."
  }
}
```

---

### 3. Get Current User Profile
**GET** `/auth/me`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "1706603200000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-01-30T..."
  }
}
```

---

### 4. Get All Users (Admin Only)
**GET** `/auth/users`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "users": [
    {
      "id": "1706603200000",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2026-01-30T..."
    }
  ]
}
```

---

## Protected API Endpoints

### 5. Health Check (Public)
**GET** `/api/health`

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

### 6. Get Users (Protected)
**GET** `/api/users`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "requestedBy": "John Doe"
}
```

---

### 7. Create User (Protected)
**POST** `/api/users`

**Headers:**
```
Authorization: Bearer <your_token>
```

**Request Body:**
```json
{
  "name": "New User",
  "email": "newuser@example.com"
}
```

---

### 8. Admin Dashboard (Admin Only)
**GET** `/api/admin/dashboard`

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to Admin Dashboard",
  "admin": "Admin Name",
  "stats": {
    "totalUsers": 150,
    "activeUsers": 120,
    "pendingRequests": 15
  }
}
```

---

### 9. Get Reports (Moderator & Admin Only)
**GET** `/api/moderator/reports`

**Headers:**
```
Authorization: Bearer <moderator_or_admin_token>
```

**Response:**
```json
{
  "success": true,
  "message": "Reports data",
  "accessedBy": {...},
  "reports": [...]
}
```

---

## Testing with cURL

### Sign Up
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

### Login
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

### Access Protected Route
```bash
curl -X GET http://localhost:5000/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Admin Route
```bash
curl -X GET http://localhost:5000/api/admin/dashboard \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN_HERE"
```

---

## Testing with Postman

1. **Sign Up/Login** to get a token
2. **Copy the token** from the response
3. For protected routes:
   - Go to **Headers** tab
   - Add key: `Authorization`
   - Add value: `Bearer YOUR_TOKEN_HERE`

---

## Role-Based Access Summary

| Endpoint | Public | User | Moderator | Admin |
|----------|--------|------|-----------|-------|
| POST /auth/signup | ✅ | ✅ | ✅ | ✅ |
| POST /auth/login | ✅ | ✅ | ✅ | ✅ |
| GET /auth/me | ❌ | ✅ | ✅ | ✅ |
| GET /auth/users | ❌ | ❌ | ❌ | ✅ |
| GET /api/health | ✅ | ✅ | ✅ | ✅ |
| GET /api/users | ❌ | ✅ | ✅ | ✅ |
| POST /api/users | ❌ | ✅ | ✅ | ✅ |
| GET /api/admin/dashboard | ❌ | ❌ | ❌ | ✅ |
| GET /api/moderator/reports | ❌ | ❌ | ✅ | ✅ |

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Please provide name, email, and password"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": "Not authorized to access this route"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "error": "User role 'user' is not authorized to access this route"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": "Route not found"
}
```

### 500 Server Error
```json
{
  "success": false,
  "error": "Server error"
}
```

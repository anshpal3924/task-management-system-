# Firebase Setup Guide

## Prerequisites

1. A Firebase account (create one at [firebase.google.com](https://firebase.google.com))
2. A Firebase project

---

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or select an existing project
3. Follow the setup wizard to create your project

---

## Step 2: Enable Firestore Database

1. In the Firebase Console, go to **"Build" > "Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development) or **"Start in production mode"**
4. Select a location for your database
5. Click **"Enable"**

### Set Firestore Security Rules (Important!)

For development, you can use test mode rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 3, 1);
    }
  }
}
```

For production, use more restrictive rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Step 3: Generate Service Account Key

1. In the Firebase Console, click the **gear icon** next to "Project Overview"
2. Select **"Project settings"**
3. Go to the **"Service accounts"** tab
4. Click **"Generate new private key"**
5. Click **"Generate key"** - a JSON file will be downloaded

---

## Step 4: Configure Environment Variables

The downloaded JSON file contains your credentials. Extract the values and add them to your `.env` file:

**Downloaded JSON structure:**
```json
{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
  "client_id": "123456789...",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

**Update your `.env` file:**
```env
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRE=30d

# Firebase Configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=abc123...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789...
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
```

**Important Notes:**
- Keep the private key in quotes
- Make sure to include `\n` characters in the private key
- Replace `your-project-id` with your actual Firebase project ID
- **NEVER commit the `.env` file or service account JSON to version control!**

---

## Step 5: Update .gitignore

Make sure your `.gitignore` includes:
```
.env
.env.local
.env.production
*.json
serviceAccountKey.json
firebase-credentials.json
```

---

## Step 6: Test the Connection

1. Start your server:
```bash
npm run dev
```

2. You should see:
```
Firebase Admin initialized successfully
Server is running on port 5000
```

3. Test the signup endpoint:
```bash
curl -X POST http://localhost:5000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "role": "user"
  }'
```

4. Check Firebase Console:
   - Go to **Firestore Database**
   - You should see a new `users` collection with your user data

---

## Firestore Data Structure

### Users Collection
```
users/
  └── {userId}/
      ├── name: string
      ├── email: string
      ├── password: string (hashed)
      ├── role: string (user, moderator, admin)
      └── createdAt: string (ISO timestamp)
```

---

## Common Issues & Solutions

### Issue 1: "Error initializing Firebase"
**Solution:** Check that all environment variables are correctly set in `.env`

### Issue 2: "Permission denied" errors
**Solution:** Update your Firestore security rules (see Step 2)

### Issue 3: Private key format error
**Solution:** Ensure the private key includes `\n` characters and is wrapped in quotes

### Issue 4: "Project not found"
**Solution:** Verify `FIREBASE_PROJECT_ID` matches your Firebase project ID exactly

---

## Security Best Practices

1. **Never expose service account credentials:**
   - Keep `.env` in `.gitignore`
   - Don't commit service account JSON files
   - Use environment variables in production

2. **Use proper Firestore security rules:**
   - Restrict read/write access based on authentication
   - Validate data before writing

3. **Rotate credentials regularly:**
   - Generate new service account keys periodically
   - Delete old keys from Firebase Console

4. **Use strong JWT secrets:**
   - Generate a random, complex JWT_SECRET
   - Use different secrets for development and production

---

## Production Deployment

When deploying to production:

1. **Set environment variables** in your hosting platform:
   - Heroku: `heroku config:set FIREBASE_PROJECT_ID=...`
   - Vercel: Add in Environment Variables settings
   - AWS/Azure: Use their secret management services

2. **Update Firestore security rules** to production mode

3. **Enable Firebase billing** if needed for production limits

4. **Set up monitoring** in Firebase Console

---

## Additional Resources

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Pricing](https://firebase.google.com/pricing)

---

## Testing Checklist

- [ ] Firebase project created
- [ ] Firestore database enabled
- [ ] Service account key downloaded
- [ ] Environment variables configured
- [ ] Server starts without errors
- [ ] User signup works
- [ ] User login works
- [ ] Data appears in Firestore Console
- [ ] Protected routes work with JWT
- [ ] Role-based authorization works

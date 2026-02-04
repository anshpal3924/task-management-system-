# Deployment Guide

## Prerequisites
- GitHub account
- Firebase project with Firestore setup
- Service account key JSON file

## Backend Deployment (Render/Railway)

### Option 1: Deploy to Render

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `Task_1` folder as root directory
   - Configure:
     - Name: `task-management-backend`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `node server.js`
     - Instance Type: Free

4. **Add Environment Variables**
   ```
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=<your-secret-key>
   FIREBASE_PROJECT_ID=<your-firebase-project-id>
   FIREBASE_PRIVATE_KEY=<your-firebase-private-key>
   FIREBASE_CLIENT_EMAIL=<your-firebase-client-email>
   ```

5. **Deploy** - Click "Create Web Service"

### Option 2: Deploy to Railway

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js

3. **Configure Settings**
   - Set root directory to `Task_1`
   - Add environment variables (same as Render)

4. **Deploy** - Railway will automatically deploy

## Frontend Deployment (Vercel)

### Deploy to Vercel

1. **Update API URL**
   - Open `task1-frontend/src/services/api.js`
   - Change `baseURL` to your deployed backend URL

2. **Push to GitHub** (if not already done)

3. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

4. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select the `task1-frontend` folder as root directory
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

5. **Add Environment Variables** (if needed)
   ```
   REACT_APP_API_URL=<your-backend-url>
   ```

6. **Deploy** - Click "Deploy"

## Frontend Deployment (Netlify)

### Alternative: Deploy to Netlify

1. **Create Netlify Account**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select repository
   - Configure:
     - Base directory: `task1-frontend`
     - Build command: `npm run build`
     - Publish directory: `build`

3. **Add Environment Variables**
   ```
   REACT_APP_API_URL=<your-backend-url>
   ```

4. **Deploy**

## Post-Deployment Steps

1. **Update CORS Settings**
   - Update backend `server.js` to allow your frontend domain
   ```javascript
   const allowedOrigins = [
     'http://localhost:3000',
     'https://your-frontend-domain.vercel.app'
   ];
   ```

2. **Test the Application**
   - Visit your deployed frontend URL
   - Test login, signup, and all features
   - Check browser console for errors

3. **Setup Custom Domain** (Optional)
   - Vercel: Settings → Domains → Add Domain
   - Render: Settings → Custom Domain

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

## Troubleshooting

### Backend Issues
- Check Render/Railway logs for errors
- Verify all environment variables are set
- Ensure Firebase credentials are correct
- Check if PORT is properly configured

### Frontend Issues
- Clear browser cache
- Check if API URL is correct
- Verify CORS settings on backend
- Check browser console for errors

### CORS Errors
- Add your frontend domain to backend CORS whitelist
- Ensure credentials are properly configured

## Quick Deploy Commands

```bash
# Backend
cd Task_1
git init
git add .
git commit -m "Backend ready for deployment"

# Frontend
cd task1-frontend
npm run build
# Test production build locally
npx serve -s build
```

## Recommended Stack
- **Backend**: Render (Free tier, easy setup)
- **Frontend**: Vercel (Free tier, automatic deployments)
- **Database**: Firebase Firestore (Already configured)

## Next Steps After Deployment
1. Monitor application logs
2. Set up error tracking (Sentry)
3. Configure CI/CD pipelines
4. Setup SSL certificates (handled by platforms)
5. Add monitoring and analytics

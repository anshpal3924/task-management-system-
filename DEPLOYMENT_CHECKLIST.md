# 🚀 Quick Deployment Checklist

## Step 1: Prepare Your Code

- [x] ✅ Project is working locally
- [ ] Update CORS settings in `Task_1/server.js` with your frontend URL
- [ ] Ensure all `.env.example` files are created
- [ ] Verify `.gitignore` files are in place

## Step 2: Push to GitHub

```bash
# Initialize git in root directory
cd C:\Users\asus\OneDrive\Desktop\new
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Task Management System"

# Create GitHub repository and connect
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend (Render - Recommended)

### 3.1 Sign Up for Render
- Visit https://render.com
- Sign up with GitHub

### 3.2 Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. **Important Settings:**
   - Name: `task-management-backend`
   - Root Directory: `Task_1`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Instance Type: `Free`

### 3.3 Add Environment Variables
Go to "Environment" tab and add:

```
PORT=5000
NODE_ENV=production
JWT_SECRET=create-a-super-long-random-secret-key-here-minimum-32-characters
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FRONTEND_URL=https://your-frontend-will-be-deployed-here.vercel.app
```

**📝 Note:** Copy your backend URL (e.g., `https://task-management-backend.onrender.com`)

### 3.4 Deploy
- Click "Create Web Service"
- Wait 3-5 minutes for deployment

## Step 4: Deploy Frontend (Vercel - Recommended)

### 4.1 Sign Up for Vercel
- Visit https://vercel.com
- Sign up with GitHub

### 4.2 Import Project
1. Click "Add New" → "Project"
2. Import your GitHub repository
3. **Important Settings:**
   - Framework Preset: `Create React App`
   - Root Directory: `task1-frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### 4.3 Add Environment Variable
Go to "Environment Variables" and add:

```
REACT_APP_API_URL=https://YOUR_BACKEND_URL.onrender.com
```
(Use the URL from Step 3.3)

### 4.4 Deploy
- Click "Deploy"
- Wait 2-3 minutes

**📝 Note:** Copy your frontend URL (e.g., `https://your-app.vercel.app`)

## Step 5: Update Backend CORS

1. Go back to Render dashboard
2. Open your backend service
3. Go to "Environment" tab
4. Update `FRONTEND_URL` variable with your Vercel URL
5. Click "Save Changes"
6. Service will auto-redeploy

## Step 6: Test Your Deployment

Visit your frontend URL and test:
- [ ] Login page loads
- [ ] Can create account
- [ ] Can login
- [ ] Dashboard shows correctly
- [ ] Admin can create tasks
- [ ] Users can update task status

## 🎉 Your App is Live!

**Frontend URL:** `https://your-app.vercel.app`
**Backend URL:** `https://your-backend.onrender.com`

---

## Alternative: Deploy Backend to Railway

If you prefer Railway over Render:

1. Visit https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select repository
5. Add same environment variables
6. Deploy

---

## Troubleshooting

### CORS Error
- Make sure `FRONTEND_URL` is set in backend environment variables
- Verify the URL matches exactly (no trailing slash)
- Check Render logs for CORS errors

### Can't Login/Signup
- Check browser console for API errors
- Verify `REACT_APP_API_URL` is correct
- Check if backend is running (visit backend URL)

### Firebase Error
- Verify Firebase credentials in environment variables
- Ensure private key is properly escaped with `\n`
- Check Firebase project is active

### Build Failed
- Check build logs in Vercel/Render
- Ensure all dependencies are in package.json
- Verify Node version compatibility

---

## Free Tier Limits

**Render Free Tier:**
- App sleeps after 15 mins of inactivity
- Wakes up on first request (may take 30 seconds)
- 750 hours/month

**Vercel Free Tier:**
- Unlimited deployments
- Automatic HTTPS
- 100GB bandwidth/month

---

## Need Help?

Check the full [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

@echo off
echo ================================
echo  Task Management Deployment Prep
echo ================================
echo.

echo Step 1: Installing dependencies...
echo.

echo Installing backend dependencies...
cd Task_1
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed
    pause
    exit /b 1
)
cd ..

echo.
echo Installing frontend dependencies...
cd task1-frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed
    pause
    exit /b 1
)
cd ..

echo.
echo Step 2: Building frontend...
cd task1-frontend
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Frontend build failed
    pause
    exit /b 1
)
cd ..

echo.
echo ================================
echo  Deployment Prep Complete! ✓
echo ================================
echo.
echo Next Steps:
echo 1. Push code to GitHub
echo 2. Deploy backend to Render
echo 3. Deploy frontend to Vercel
echo.
echo See DEPLOYMENT_CHECKLIST.md for detailed instructions
echo.
pause

@echo off
echo 🚀 Integra OS Quick Deploy Script for Windows
echo ========================================
echo.

REM Check if Git is available
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git not found. Please install Git first.
    echo https://git-scm.com/download/win
    pause
    exit /b 1
)

REM Check if gcloud is available
gcloud --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Google Cloud CLI not found. Please install it first.
    echo https://cloud.google.com/sdk/docs/install
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed
echo.

REM Get user input
set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p PROJECT_ID="Enter your Google Cloud Project ID: "

echo.
echo 📋 Configuration Summary:
echo GitHub Username: %GITHUB_USERNAME%
echo Google Cloud Project: %PROJECT_ID%
echo.

set /p CONFIRM="Is this correct? (y/n): "
if /i not "%CONFIRM%"=="y" goto :eof

echo.
echo 🔧 Setting up deployment...

REM Set Google Cloud project
echo Setting Google Cloud project...
gcloud config set project %PROJECT_ID%
if errorlevel 1 (
    echo ❌ Failed to set Google Cloud project
    pause
    exit /b 1
)

REM Create GitHub repository
echo.
echo 📝 Creating GitHub repository...
echo Please create a new repository at: https://github.com/new
echo Repository name: integra-web-interface
echo Make it public and don't initialize with README
echo.
pause

REM Add remote and push
echo 🔗 Connecting to GitHub...
git remote add origin https://github.com/%GITHUB_USERNAME%/integra-web-interface.git
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo ❌ Failed to push to GitHub. Please check your repository setup.
    pause
    exit /b 1
)

echo.
echo ✅ Code pushed to GitHub successfully!
echo.
echo 🌐 Next Steps:
echo.
echo 1. Go to: https://github.com/%GITHUB_USERNAME%/integra-web-interface/settings/secrets/actions
echo.
echo 2. Add these Repository Secrets:
echo    - GCP_PROJECT_ID: %PROJECT_ID%
echo    - GCP_SERVICE_ACCOUNT: github-actions@%PROJECT_ID%.iam.gserviceaccount.com
echo.
echo 3. Run the Google Cloud setup:
echo    .\setup-google-cloud.bat %PROJECT_ID% %GITHUB_USERNAME%
echo.
echo 4. Configure DNS for integra-os.com in your domain registrar
echo.
echo 🎉 Repository is ready! Check QUICK_DEPLOY.md for complete instructions.

pause
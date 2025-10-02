@echo off
echo 🛠️ Google Cloud Setup for Integra OS
echo ===================================

set PROJECT_ID=%1
set GITHUB_USERNAME=%2

if "%PROJECT_ID%"=="" (
    set /p PROJECT_ID="Enter your Google Cloud Project ID: "
)

if "%GITHUB_USERNAME%"=="" (
    set /p GITHUB_USERNAME="Enter your GitHub username: "
)

echo.
echo 📋 Setting up Google Cloud for:
echo Project: %PROJECT_ID%
echo GitHub: %GITHUB_USERNAME%/integra-web-interface
echo.

REM Set project
gcloud config set project %PROJECT_ID%

echo 🔧 Enabling required APIs...
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable dns.googleapis.com

echo.
echo 🏗️ Creating Artifact Registry...
gcloud artifacts repositories create web-app --repository-format=docker --location=us-central1 --description="Integra Web Interface container registry" 2>nul

echo.
echo 👤 Creating service account...
gcloud iam service-accounts create github-actions --description="Service account for GitHub Actions deployments" --display-name="GitHub Actions" 2>nul

echo.
echo 🔐 Granting IAM roles...
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:github-actions@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/run.admin" --quiet
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:github-actions@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/artifactregistry.admin" --quiet
gcloud projects add-iam-policy-binding %PROJECT_ID% --member="serviceAccount:github-actions@%PROJECT_ID%.iam.gserviceaccount.com" --role="roles/iam.serviceAccountUser" --quiet

REM Get project number
for /f "tokens=*" %%i in ('gcloud projects describe %PROJECT_ID% --format="value(projectNumber)"') do set PROJECT_NUMBER=%%i

echo.
echo 🔗 Setting up Workload Identity Federation...
gcloud iam workload-identity-pools create github-pool --location="global" --description="Pool for GitHub Actions" 2>nul

gcloud iam workload-identity-pools providers create-oidc github-provider --workload-identity-pool="github-pool" --location="global" --issuer-uri="https://token.actions.githubusercontent.com" --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" --attribute-condition="assertion.repository=='%GITHUB_USERNAME%/integra-web-interface'" 2>nul

gcloud iam service-accounts add-iam-policy-binding github-actions@%PROJECT_ID%.iam.gserviceaccount.com --role="roles/iam.workloadIdentityUser" --member="principalSet://iam.googleapis.com/projects/%PROJECT_NUMBER%/locations/global/workloadIdentityPools/github-pool/attribute.repository/%GITHUB_USERNAME%/integra-web-interface" --quiet

echo.
echo 🌐 Creating DNS zone for integra-os.com...
gcloud dns managed-zones create integra-os-zone --description="DNS zone for integra-os.com" --dns-name="integra-os.com." 2>nul

echo.
echo ✅ Google Cloud setup complete!
echo.
echo 📋 GitHub Repository Secrets to add:
echo =====================================
echo.
echo Secret Name: GCP_PROJECT_ID
echo Secret Value: %PROJECT_ID%
echo.
echo Secret Name: GCP_SERVICE_ACCOUNT
echo Secret Value: github-actions@%PROJECT_ID%.iam.gserviceaccount.com
echo.
echo Secret Name: GCP_WORKLOAD_IDENTITY_PROVIDER
echo Secret Value: projects/%PROJECT_NUMBER%/locations/global/workloadIdentityPools/github-pool/providers/github-provider
echo.
echo 🌐 DNS Name Servers for integra-os.com:
echo =======================================
gcloud dns managed-zones describe integra-os-zone --format="value(nameServers)"
echo.
echo Update your domain registrar to use these name servers.
echo.
echo 🚀 Ready to deploy! Push code to main branch to trigger deployment.

pause
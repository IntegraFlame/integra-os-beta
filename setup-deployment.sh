#!/bin/bash

# Integra OS Deployment Setup Script
# Run this script to configure your Google Cloud project for deployment

set -e

echo "🚀 Integra OS Deployment Setup"
echo "================================"

# Check if required tools are installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud CLI not found. Please install it first."
    echo "   https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Get project information
echo "📋 Project Configuration"
echo "Current project: $(gcloud config get-value project)"
read -p "Is this the correct project for integra-os.com? (y/n): " confirm

if [[ $confirm != "y" ]]; then
    read -p "Enter your Google Cloud Project ID: " PROJECT_ID
    gcloud config set project $PROJECT_ID
else
    PROJECT_ID=$(gcloud config get-value project)
fi

echo "✅ Using project: $PROJECT_ID"

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable dns.googleapis.com

echo "✅ APIs enabled successfully"

# Create Artifact Registry repository
echo "🏗️ Creating Artifact Registry repository..."
if ! gcloud artifacts repositories describe web-app --location=us-central1 &> /dev/null; then
    gcloud artifacts repositories create web-app \
        --repository-format=docker \
        --location=us-central1 \
        --description="Integra Web Interface container registry"
    echo "✅ Artifact Registry repository created"
else
    echo "ℹ️ Artifact Registry repository already exists"
fi

# Create service account
echo "👤 Creating service account for GitHub Actions..."
if ! gcloud iam service-accounts describe github-actions@$PROJECT_ID.iam.gserviceaccount.com &> /dev/null; then
    gcloud iam service-accounts create github-actions \
        --description="Service account for GitHub Actions deployments" \
        --display-name="GitHub Actions"
    echo "✅ Service account created"
else
    echo "ℹ️ Service account already exists"
fi

# Grant IAM roles
echo "🔐 Granting IAM roles..."
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin" --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.admin" --quiet

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:github-actions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser" --quiet

echo "✅ IAM roles granted"

# Get project number for workload identity
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

# Setup Workload Identity Federation
echo "🔗 Setting up Workload Identity Federation..."
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Create workload identity pool
if ! gcloud iam workload-identity-pools describe github-pool --location="global" &> /dev/null; then
    gcloud iam workload-identity-pools create github-pool \
        --location="global" \
        --description="Pool for GitHub Actions"
    echo "✅ Workload identity pool created"
else
    echo "ℹ️ Workload identity pool already exists"
fi

# Create provider
if ! gcloud iam workload-identity-pools providers describe github-provider --workload-identity-pool="github-pool" --location="global" &> /dev/null; then
    gcloud iam workload-identity-pools providers create-oidc github-provider \
        --workload-identity-pool="github-pool" \
        --location="global" \
        --issuer-uri="https://token.actions.githubusercontent.com" \
        --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
        --attribute-condition="assertion.repository=='$GITHUB_USERNAME/integra-web-interface'"
    echo "✅ Workload identity provider created"
else
    echo "ℹ️ Workload identity provider already exists"
fi

# Allow service account to be used by GitHub Actions
gcloud iam service-accounts add-iam-policy-binding \
    github-actions@$PROJECT_ID.iam.gserviceaccount.com \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/$GITHUB_USERNAME/integra-web-interface" --quiet

echo "✅ Workload Identity Federation configured"

# Create DNS zone
echo "🌐 Setting up DNS for integra-os.com..."
if ! gcloud dns managed-zones describe integra-os-zone &> /dev/null; then
    gcloud dns managed-zones create integra-os-zone \
        --description="DNS zone for integra-os.com" \
        --dns-name="integra-os.com."
    echo "✅ DNS zone created"
else
    echo "ℹ️ DNS zone already exists"
fi

# Get name servers
echo "📋 DNS Configuration Required"
echo "Update your domain registrar to use these name servers:"
gcloud dns managed-zones describe integra-os-zone --format="value(nameServers)" | tr ';' '\n'

# Show GitHub secrets configuration
echo ""
echo "🔑 GitHub Repository Secrets"
echo "Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):"
echo ""
echo "GCP_PROJECT_ID: $PROJECT_ID"
echo "GCP_SERVICE_ACCOUNT: github-actions@$PROJECT_ID.iam.gserviceaccount.com"
echo "GCP_WORKLOAD_IDENTITY_PROVIDER: projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "Next Steps:"
echo "1. Update your domain registrar with the DNS name servers shown above"
echo "2. Add the GitHub secrets to your repository"
echo "3. Push your code to trigger the first deployment"
echo "4. Your site will be live at https://integra-os.com"
echo ""
echo "For troubleshooting, see DEPLOYMENT.md"
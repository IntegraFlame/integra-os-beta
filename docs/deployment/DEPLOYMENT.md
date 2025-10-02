# 🚀 Integra OS - Deployment Guide for integra-os.com

## 🎯 Overview

This guide will help you deploy the Integra Web Interface to your custom domain `integra-os.com` using Google Cloud Run and GitHub Actions.

## 📋 Prerequisites

- Google Cloud Project
- GitHub Repository
- Domain `integra-os.com` (DNS management access)
- Google Cloud billing enabled

## 🛠️ Setup Steps

### 1. Google Cloud Project Setup

#### Enable Required APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable dns.googleapis.com
```

#### Create Artifact Registry Repository

```bash
gcloud artifacts repositories create web-app \
    --repository-format=docker \
    --location=us-central1 \
    --description="Integra Web Interface container registry"
```

#### Create Service Account for GitHub Actions

```bash
# Create service account
gcloud iam service-accounts create github-actions \
    --description="Service account for GitHub Actions deployments" \
    --display-name="GitHub Actions"

# Grant necessary roles
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:github-actions@PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:github-actions@PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:github-actions@PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"
```

### 2. GitHub Repository Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

```
GCP_PROJECT_ID: your-google-cloud-project-id
GCP_SERVICE_ACCOUNT: github-actions@PROJECT_ID.iam.gserviceaccount.com
GCP_WORKLOAD_IDENTITY_PROVIDER: projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/POOL_NAME/providers/PROVIDER_NAME
```

#### Setup Workload Identity Federation (Recommended)

```bash
# Create workload identity pool
gcloud iam workload-identity-pools create github-pool \
    --location="global" \
    --description="Pool for GitHub Actions"

# Create provider
gcloud iam workload-identity-pools providers create-oidc github-provider \
    --workload-identity-pool="github-pool" \
    --location="global" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
    --attribute-condition="assertion.repository=='YOUR_GITHUB_USERNAME/integra-web-interface'"

# Allow service account to be used by GitHub Actions
gcloud iam service-accounts add-iam-policy-binding \
    github-actions@PROJECT_ID.iam.gserviceaccount.com \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/attribute.repository/YOUR_GITHUB_USERNAME/integra-web-interface"
```

### 3. DNS Configuration for integra-os.com

#### Option A: Google Cloud DNS (Recommended)

```bash
# Create managed zone
gcloud dns managed-zones create integra-os-zone \
    --description="DNS zone for integra-os.com" \
    --dns-name="integra-os.com."

# Get name servers
gcloud dns managed-zones describe integra-os-zone

# Update your domain registrar to use Google Cloud DNS name servers
```

#### Option B: External DNS Provider

- Create an A record pointing to your Cloud Run service IP
- Add CNAME for www → integra-os.com

### 4. Deploy to Cloud Run

#### Manual Deployment (Initial)

```bash
# Build and push container
gcloud builds submit --tag us-central1-docker.pkg.dev/PROJECT_ID/web-app/integra-web:latest

# Deploy to Cloud Run
gcloud run deploy integra-web \
    --image us-central1-docker.pkg.dev/PROJECT_ID/web-app/integra-web:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1 \
    --min-instances 0 \
    --max-instances 10
```

#### Map Custom Domain

```bash
# Map domain to Cloud Run service
gcloud run domain-mappings create \
    --service integra-web \
    --domain integra-os.com \
    --region us-central1

# Map www subdomain
gcloud run domain-mappings create \
    --service integra-web \
    --domain www.integra-os.com \
    --region us-central1
```

### 5. GitHub Actions Auto-Deployment

The included `.github/workflows/deploy-cloud-run.yml` will automatically:

1. Build the Docker container
2. Push to Google Artifact Registry
3. Deploy to Cloud Run
4. Update the live site at integra-os.com

Every push to the `main` branch triggers automatic deployment.

### 6. SSL Certificate

Cloud Run automatically provisions and manages SSL certificates for custom domains. It may take 15-30 minutes for the certificate to be fully provisioned.

### 7. Verify Deployment

1. Check Cloud Run service: `gcloud run services list`
2. Test domain: `curl -I https://integra-os.com`
3. Monitor logs: `gcloud run logs tail integra-web --region us-central1`

## 🔧 Troubleshooting

### Common Issues

1. **DNS propagation**: Can take up to 48 hours
2. **SSL certificate**: Allow 15-30 minutes for provisioning
3. **Build failures**: Check GitHub Actions logs
4. **Permission errors**: Verify service account roles

### Useful Commands

```bash
# Check Cloud Run service status
gcloud run services describe integra-web --region us-central1

# View deployment logs
gcloud run logs tail integra-web --region us-central1

# Update service configuration
gcloud run services update integra-web --region us-central1 --memory 1Gi

# Check domain mapping status
gcloud run domain-mappings list --region us-central1
```

## 🎉 Success

Once deployed, your Integra Web Interface will be live at:

- <https://integra-os.com>
- <https://www.integra-os.com>

The interface includes:

- ✅ Complete Three Eyes system with clarity controls
- ✅ Daily Planet Protocol news monitoring
- ✅ State persistence with localStorage
- ✅ Responsive design with Orbitron fonts
- ✅ Full accessibility support
- ✅ Auto-scaling Cloud Run deployment

## 🔄 Continuous Updates

To update the interface:

1. Make changes to your code
2. Push to the `main` branch
3. GitHub Actions automatically deploys to integra-os.com
4. Changes are live within 2-3 minutes

---

**Need help?** Check the deployment logs in GitHub Actions or Cloud Run console.

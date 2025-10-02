# 🚀 Complete Deployment Guide for integra-os.com

## 📝 Quick Setup Checklist

Follow these steps to deploy your Integra Web Interface to integra-os.com:

### Step 1: Create GitHub Repository

```bash
# Initialize GitHub repository (if not already done)
cd "c:\Users\Javon Jenkins\OneDrive\Desktop\integra-web-interface"
git remote add origin https://github.com/YOUR_USERNAME/integra-web-interface.git
git push -u origin master
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 2: Google Cloud Setup

#### 2.1 Install Google Cloud CLI (if not installed)
Download from: https://cloud.google.com/sdk/docs/install

#### 2.2 Login and Set Project
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

#### 2.3 Run the Setup Script
```bash
# Make script executable (on Windows, use Git Bash or WSL)
chmod +x setup-deployment.sh
./setup-deployment.sh
```

Or manually run the commands from the script for Windows PowerShell.

### Step 3: Configure GitHub Secrets

Go to your GitHub repository: `https://github.com/YOUR_USERNAME/integra-web-interface`

1. Click **Settings** → **Secrets and variables** → **Actions**
2. Add these Repository secrets:

```
Name: GCP_PROJECT_ID
Value: your-google-cloud-project-id

Name: GCP_SERVICE_ACCOUNT  
Value: github-actions@YOUR_PROJECT_ID.iam.gserviceaccount.com

Name: GCP_WORKLOAD_IDENTITY_PROVIDER
Value: projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-pool/providers/github-provider
```

### Step 4: DNS Configuration for integra-os.com

#### Option A: Use Google Cloud DNS (Recommended)

1. **Get your name servers:**
```bash
gcloud dns managed-zones describe integra-os-zone --format="value(nameServers)"
```

2. **Update your domain registrar:**
   - Log into your domain registrar (GoDaddy, Namecheap, etc.)
   - Find DNS settings for integra-os.com
   - Replace existing name servers with Google Cloud DNS servers
   - Save changes

#### Option B: Use existing DNS provider

If you prefer to keep your current DNS provider:

1. **Deploy first, then get the IP:**
```bash
gcloud run services describe integra-web --region us-central1 --format="value(status.url)"
```

2. **Create A record:**
   - In your DNS settings, create an A record
   - Point integra-os.com to the Cloud Run service IP
   - Also create CNAME for www → integra-os.com

### Step 5: Deploy to Cloud Run

#### 5.1 Initial Manual Deployment
```bash
# Build and deploy
gcloud builds submit --tag us-central1-docker.pkg.dev/YOUR_PROJECT_ID/web-app/integra-web:latest

gcloud run deploy integra-web \
    --image us-central1-docker.pkg.dev/YOUR_PROJECT_ID/web-app/integra-web:latest \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated \
    --port 8080 \
    --memory 512Mi \
    --cpu 1
```

#### 5.2 Map Custom Domain
```bash
# Map your domain
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

### Step 6: Trigger Automatic Deployment

```bash
# Push code to trigger GitHub Actions
git add .
git commit -m "Deploy to integra-os.com"
git push origin master
```

The GitHub Actions workflow will automatically:
1. Build the Docker container
2. Push to Google Artifact Registry  
3. Deploy to Cloud Run
4. Update integra-os.com

### Step 7: Verify Deployment

1. **Check GitHub Actions:**
   - Go to your repository → **Actions** tab
   - Watch the deployment progress

2. **Check Cloud Run:**
```bash
gcloud run services list
gcloud run logs tail integra-web --region us-central1
```

3. **Test your website:**
   - https://integra-os.com
   - https://www.integra-os.com

## 🔧 Troubleshooting

### Common Issues:

1. **DNS not propagating:** Can take up to 48 hours
2. **SSL certificate pending:** Allow 15-30 minutes for automatic provisioning  
3. **Build failing:** Check GitHub Actions logs for errors
4. **Permission denied:** Verify service account roles in Google Cloud Console

### Quick Fixes:

```bash
# Check domain mapping status
gcloud run domain-mappings list --region us-central1

# Force rebuild and deploy
gcloud builds submit --tag us-central1-docker.pkg.dev/YOUR_PROJECT_ID/web-app/integra-web:latest
gcloud run services replace service.yaml --region us-central1

# View deployment logs
gcloud run logs tail integra-web --region us-central1 --follow
```

## 🎉 Success!

Once complete, your Integra Web Interface will be live at:
- **https://integra-os.com** 
- **https://www.integra-os.com**

### Automatic Updates

Every time you push code to the `master` branch:
1. GitHub Actions automatically builds and deploys
2. Changes are live within 2-3 minutes
3. Zero downtime deployment with Cloud Run

### Features Available:

✅ **Three Eyes System** - Complete clarity controls  
✅ **Daily Planet Protocol** - Real-time news monitoring  
✅ **Dragon-Phoenix Interface** - Advanced communication  
✅ **State Persistence** - Settings saved across sessions  
✅ **Responsive Design** - Mobile and desktop optimized  
✅ **Auto-scaling** - Handles traffic spikes automatically

---

**Need help?** Check the logs in GitHub Actions or run:
```bash
gcloud run logs tail integra-web --region us-central1
```
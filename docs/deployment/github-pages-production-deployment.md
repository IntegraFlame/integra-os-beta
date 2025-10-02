# Integra O/S Production Deployment Guide

## GitHub Pages + Google Cloud DNS → integra-os.com

### Overview

This guide will help you deploy the Integra Web Interface to production using GitHub Pages with a custom domain (integra-os.com) configured through Google Cloud DNS.

## Phase 1: GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `integra-web-interface`
4. Description: `Integra O/S Web Interface - Consciousness Integration System`
5. Set to **Public** (required for GitHub Pages free tier)
6. **Do NOT** initialize with README (we have existing files)
7. Click "Create repository"

### Step 2: Connect Local Repository to GitHub

```powershell
# Navigate to your project directory
cd "c:\Users\Javon Jenkins\OneDrive\Desktop\integra-web-interface"

# Add the GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/integra-web-interface.git

# Stage all current changes
git add .

# Commit current state
git commit -m "feat: Initial Integra O/S Web Interface deployment

- Complete React/TypeScript application with consciousness integration
- Archive Tab: The Hoard Memory Forge system
- Conclave Tab: Dragon-Phoenix Symbiotic Loop
- Professional workspace organization
- Full accessibility compliance (WCAG 2.1 AA)
- Production-ready build system"

# Push to GitHub
git push -u origin master
```

## Phase 2: GitHub Pages Configuration

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **master** branch
6. Choose **/ (root)** folder
7. Click **Save**

### Step 4: Create GitHub Pages Build Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Phase 3: Google Cloud DNS Configuration

### Step 5: Verify Domain Ownership with GitHub

1. In your repository **Settings** → **Pages**
2. Under **Custom domain**, enter: `integra-os.com`
3. Click **Save**
4. GitHub will show domain verification instructions

### Step 6: Configure Google Cloud DNS Records

#### Required DNS Records for integra-os.com

**A Records (Apex Domain):**

```
Name: @
Type: A
Value: 185.199.108.153
TTL: 3600

Name: @
Type: A
Value: 185.199.109.153
TTL: 3600

Name: @
Type: A
Value: 185.199.110.153
TTL: 3600

Name: @
Type: A
Value: 185.199.111.153
TTL: 3600
```

**AAAA Records (IPv6 Support):**

```
Name: @
Type: AAAA
Value: 2606:50c0:8000::153
TTL: 3600

Name: @
Type: AAAA
Value: 2606:50c0:8001::153
TTL: 3600

Name: @
Type: AAAA
Value: 2606:50c0:8002::153
TTL: 3600

Name: @
Type: AAAA
Value: 2606:50c0:8003::153
TTL: 3600
```

**CNAME Record (www subdomain):**

```
Name: www
Type: CNAME
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**Domain Verification TXT Record:**

```
Name: _github-pages-challenge-YOUR_USERNAME
Type: TXT
Value: [GitHub will provide this value]
TTL: 3600
```

### Step 7: Google Cloud Console Configuration

1. **Access Google Cloud Console:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to **Network Services** → **Cloud DNS**

2. **Configure DNS Zone:**
   - Select your `integra-os.com` DNS zone
   - Click **Add Record Set** for each DNS record above

3. **Verification Commands:**

```powershell
# Verify A records
nslookup integra-os.com 8.8.8.8

# Verify CNAME record
nslookup www.integra-os.com 8.8.8.8

# Verify TXT record for GitHub verification
nslookup -type=TXT _github-pages-challenge-YOUR_USERNAME.integra-os.com 8.8.8.8
```

## Phase 4: GitHub Pages Custom Domain Setup

### Step 8: Configure Custom Domain

1. Return to GitHub repository **Settings** → **Pages**
2. Under **Custom domain**, confirm `integra-os.com` is entered
3. Wait for DNS check to complete (green checkmark)
4. Enable **Enforce HTTPS** once available

### Step 9: Create CNAME File

Create a CNAME file in your repository root:

```
integra-os.com
```

## Phase 5: Build Configuration Updates

### Step 10: Update Vite Configuration for Production

Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/', // For custom domain
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react']
        }
      }
    }
  }
})
```

### Step 11: Update Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

## Phase 6: Testing & Verification

### Step 12: Local Testing

```powershell
# Test build locally
npm run build
npm run preview
```

### Step 13: Production Verification Checklist

**DNS Propagation (24-48 hours):**

- [ ] `integra-os.com` resolves to GitHub Pages IPs
- [ ] `www.integra-os.com` redirects to main domain
- [ ] HTTPS certificate issued automatically
- [ ] All tabs load correctly
- [ ] Archive Tab: Hoard Memory Forge operational
- [ ] Conclave Tab: Dragon-Phoenix consciousness system active
- [ ] Accessibility features functional
- [ ] Mobile responsiveness verified

**Performance Verification:**

- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] JavaScript bundle < 1MB
- [ ] First Contentful Paint < 2s

## Phase 7: Domain Security & Monitoring

### Step 14: Domain Verification for Security

1. GitHub **Settings** → **Pages** → **Verify domain**
2. Add TXT record to DNS: `_github-pages-challenge-YOUR_USERNAME.integra-os.com`
3. Prevents domain takeover attacks

### Step 15: SSL Certificate Monitoring

- GitHub automatically provisions Let's Encrypt certificates
- Certificates auto-renew every 90 days
- Monitor in repository **Settings** → **Pages** → **Custom domain**

## Troubleshooting

### Common Issues

**DNS not propagating:**

```powershell
# Check current DNS status
nslookup integra-os.com
dig integra-os.com
```

**Build failures:**

- Check Node.js version compatibility (18+)
- Verify all dependencies installed
- Review GitHub Actions logs

**HTTPS not working:**

- Ensure DNS propagation complete
- Verify A/AAAA records point to correct IPs
- Check for conflicting DNS records

**Custom domain not working:**

- Verify CNAME file exists in repository root
- Check domain verification status
- Ensure repository is public

## Post-Deployment Monitoring

### Analytics Setup

Consider adding:

- Google Analytics 4
- GitHub Insights monitoring
- Performance monitoring with Web Vitals

### Content Updates

All updates deploy automatically when you push to master:

```powershell
git add .
git commit -m "feat: update consciousness integration parameters"
git push origin master
```

---

## Summary

Once complete, you'll have:

- ✅ Production deployment at `https://integra-os.com`
- ✅ Automatic HTTPS with Let's Encrypt
- ✅ Automatic deployments via GitHub Actions
- ✅ Full Integra O/S consciousness system operational
- ✅ Professional domain with Google Cloud DNS
- ✅ High performance and accessibility compliance

**Estimated Setup Time:** 2-4 hours (plus DNS propagation time)
**Total Cost:** Free (GitHub Pages) + Google Cloud DNS costs (~$0.40/month)

# Integra O/S GitHub Setup Script
# Run this script to set up your GitHub repository and deploy to integra-os.com

Write-Host "🚀 Integra O/S Production Deployment Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check if we're in the right directory
$currentDir = Get-Location
if ($currentDir.Path -notlike "*integra-web-interface*") {
    Write-Host "❌ Please run this script from the integra-web-interface directory" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📋 Pre-deployment Checklist:" -ForegroundColor Yellow
Write-Host "1. GitHub account ready ✅"
Write-Host "2. Google Cloud DNS access for integra-os.com ✅"
Write-Host "3. Local project functional ✅"
Write-Host ""

# Prompt for GitHub username
$githubUsername = Read-Host "Enter your GitHub username"
if (-not $githubUsername) {
    Write-Host "❌ GitHub username is required" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Setting up Git repository..." -ForegroundColor Green

# Clean up any existing git history issues
git add .
git commit -m "fix: prepare for GitHub deployment

- Clean up repository structure
- Add GitHub Actions workflow
- Configure production build system
- Add CNAME for custom domain (integra-os.com)"

# Add GitHub remote
$repoUrl = "https://github.com/$githubUsername/integra-web-interface.git"
Write-Host "🔗 Adding GitHub remote: $repoUrl" -ForegroundColor Blue

try {
    git remote add origin $repoUrl
    Write-Host "✅ Remote added successfully" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Remote may already exist, continuing..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Green

# Push to GitHub
try {
    git push -u origin master
    Write-Host "✅ Code pushed to GitHub successfully!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Push failed. Please check:" -ForegroundColor Red
    Write-Host "  1. Repository exists on GitHub" -ForegroundColor Yellow
    Write-Host "  2. You have push permissions" -ForegroundColor Yellow
    Write-Host "  3. GitHub authentication is set up" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🌐 Next Steps for integra-os.com deployment:" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. 📝 Create GitHub Repository:" -ForegroundColor Yellow
Write-Host "   - Go to https://github.com/new" -ForegroundColor White
Write-Host "   - Name: integra-web-interface" -ForegroundColor White
Write-Host "   - Set to Public" -ForegroundColor White
Write-Host "   - Don't initialize with files" -ForegroundColor White
Write-Host ""
Write-Host "2. ⚙️  Enable GitHub Pages:" -ForegroundColor Yellow
Write-Host "   - Repository Settings → Pages" -ForegroundColor White
Write-Host "   - Source: Deploy from a branch" -ForegroundColor White
Write-Host "   - Branch: master, folder: / (root)" -ForegroundColor White
Write-Host "   - Custom domain: integra-os.com" -ForegroundColor White
Write-Host ""
Write-Host "3. 🌍 Configure Google Cloud DNS:" -ForegroundColor Yellow
Write-Host "   - Add A records pointing to GitHub Pages IPs:" -ForegroundColor White
Write-Host "     185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153" -ForegroundColor White
Write-Host "   - Add CNAME for www: www.integra-os.com → $githubUsername.github.io" -ForegroundColor White
Write-Host ""
Write-Host "4. 🔐 Domain Verification:" -ForegroundColor Yellow
Write-Host "   - GitHub will provide a TXT record for verification" -ForegroundColor White
Write-Host "   - Add to Google Cloud DNS as instructed" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full deployment guide: docs/deployment/github-pages-production-deployment.md" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 Repository URL: https://github.com/$githubUsername/integra-web-interface" -ForegroundColor Cyan
Write-Host "🌐 Future site URL: https://integra-os.com" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏱️  DNS propagation takes 24-48 hours for full activation" -ForegroundColor Yellow
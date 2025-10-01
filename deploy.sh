#!/bin/bash

# Integra Web Interface Deployment Script
# This script builds and deploys the Integra web interface to Google Cloud

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID=""
DOMAIN_NAME=""
BUCKET_NAME=""
TERRAFORM_DIR="./terraform"
BUILD_DIR="./dist"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if required tools are installed
check_dependencies() {
    print_status "Checking dependencies..."
    
    local missing_deps=()
    
    if ! command -v node &> /dev/null; then
        missing_deps+=("node")
    fi
    
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
    fi
    
    if ! command -v terraform &> /dev/null; then
        missing_deps+=("terraform")
    fi
    
    if ! command -v gcloud &> /dev/null; then
        missing_deps+=("gcloud")
    fi
    
    if ! command -v gsutil &> /dev/null; then
        missing_deps+=("gsutil")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing required dependencies: ${missing_deps[*]}"
        print_error "Please install the missing dependencies and try again."
        exit 1
    fi
    
    print_success "All dependencies are installed."
}

# Function to load configuration
load_config() {
    print_status "Loading configuration..."
    
    if [ -f ".env" ]; then
        source .env
        print_success "Configuration loaded from .env file."
    else
        print_warning ".env file not found. Using default configuration."
    fi
    
    # Prompt for required values if not set
    if [ -z "$PROJECT_ID" ]; then
        read -p "Enter Google Cloud Project ID: " PROJECT_ID
    fi
    
    if [ -z "$DOMAIN_NAME" ]; then
        read -p "Enter domain name (e.g., integra.yourdomain.com): " DOMAIN_NAME
    fi
    
    # Set bucket name based on project ID if not provided
    if [ -z "$BUCKET_NAME" ]; then
        BUCKET_NAME="${PROJECT_ID}-integra-website"
    fi
    
    print_success "Configuration loaded successfully."
    echo "  Project ID: $PROJECT_ID"
    echo "  Domain Name: $DOMAIN_NAME"
    echo "  Bucket Name: $BUCKET_NAME"
}

# Function to authenticate with Google Cloud
authenticate_gcloud() {
    print_status "Checking Google Cloud authentication..."
    
    if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
        print_warning "Not authenticated with Google Cloud. Starting authentication..."
        gcloud auth login
    fi
    
    # Set the project
    gcloud config set project "$PROJECT_ID"
    
    print_success "Google Cloud authentication verified."
}

# Function to build the React application
build_application() {
    print_status "Building the Integra web interface..."
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        print_status "Installing dependencies..."
        npm install
    fi
    
    # Build the application
    npm run build
    
    if [ ! -d "$BUILD_DIR" ]; then
        print_error "Build failed. $BUILD_DIR directory not found."
        exit 1
    fi
    
    print_success "Application built successfully."
}

# Function to initialize and apply Terraform
deploy_infrastructure() {
    print_status "Deploying infrastructure with Terraform..."
    
    cd "$TERRAFORM_DIR"
    
    # Initialize Terraform
    terraform init
    
    # Create terraform.tfvars file
    cat > terraform.tfvars <<EOF
project_id = "$PROJECT_ID"
domain_name = "$DOMAIN_NAME"
environment = "production"
EOF
    
    # Plan the deployment
    print_status "Planning Terraform deployment..."
    terraform plan -var-file=terraform.tfvars
    
    # Ask for confirmation
    read -p "Do you want to apply these changes? (y/N): " confirm
    if [[ $confirm != [yY] && $confirm != [yY][eE][sS] ]]; then
        print_warning "Deployment cancelled by user."
        cd ..
        exit 0
    fi
    
    # Apply the configuration
    terraform apply -var-file=terraform.tfvars -auto-approve
    
    # Get outputs
    BUCKET_NAME=$(terraform output -raw bucket_name)
    LOAD_BALANCER_IP=$(terraform output -raw load_balancer_ip)
    
    cd ..
    
    print_success "Infrastructure deployed successfully."
    echo "  Bucket Name: $BUCKET_NAME"
    echo "  Load Balancer IP: $LOAD_BALANCER_IP"
}

# Function to upload files to Cloud Storage
upload_files() {
    print_status "Uploading files to Cloud Storage..."
    
    # Sync the build directory to the bucket
    gsutil -m rsync -r -d "$BUILD_DIR/" "gs://$BUCKET_NAME/"
    
    # Set cache control headers
    gsutil -m setmeta -h "Cache-Control:public, max-age=3600" "gs://$BUCKET_NAME/**"
    
    # Set security headers
    gsutil -m setmeta \
        -h "X-Frame-Options:DENY" \
        -h "X-Content-Type-Options:nosniff" \
        -h "X-XSS-Protection:1; mode=block" \
        "gs://$BUCKET_NAME/**"
    
    print_success "Files uploaded successfully."
}

# Function to verify deployment
verify_deployment() {
    print_status "Verifying deployment..."
    
    # Check if the bucket exists and has files
    if gsutil ls "gs://$BUCKET_NAME/" &> /dev/null; then
        print_success "Bucket is accessible and contains files."
    else
        print_error "Bucket verification failed."
        exit 1
    fi
    
    # Test the website URL (if DNS is configured)
    if command -v curl &> /dev/null; then
        if curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN_NAME" | grep -q "200\|301\|302"; then
            print_success "Website is accessible at https://$DOMAIN_NAME"
        else
            print_warning "Website may not be accessible yet. DNS propagation can take up to 48 hours."
        fi
    fi
}

# Function to display post-deployment instructions
show_instructions() {
    print_success "Deployment completed successfully!"
    echo
    echo "Next steps:"
    echo "1. Configure your domain registrar to use the following name servers:"
    
    cd "$TERRAFORM_DIR"
    terraform output dns_zone_name_servers
    cd ..
    
    echo
    echo "2. Wait for DNS propagation (can take up to 48 hours)"
    echo "3. Your website will be available at: https://$DOMAIN_NAME"
    echo
    echo "Monitoring URLs:"
    echo "  - Cloud Storage: https://console.cloud.google.com/storage/browser/$BUCKET_NAME"
    echo "  - Load Balancer: https://console.cloud.google.com/net-services/loadbalancing"
    echo "  - DNS: https://console.cloud.google.com/net-services/dns"
    echo
    echo "To update the website in the future, run:"
    echo "  npm run build && gsutil -m rsync -r -d dist/ gs://$BUCKET_NAME/"
}

# Function to clean up on error
cleanup() {
    if [ $? -ne 0 ]; then
        print_error "Deployment failed. Check the error messages above."
        exit 1
    fi
}

# Main deployment function
main() {
    echo "=========================================="
    echo "Integra Web Interface Deployment Script"
    echo "=========================================="
    echo
    
    trap cleanup EXIT
    
    check_dependencies
    load_config
    authenticate_gcloud
    build_application
    deploy_infrastructure
    upload_files
    verify_deployment
    show_instructions
    
    print_success "Deployment process completed successfully!"
}

# Parse command line arguments
case "${1:-}" in
    "build")
        build_application
        ;;
    "deploy")
        upload_files
        ;;
    "infrastructure")
        deploy_infrastructure
        ;;
    "verify")
        verify_deployment
        ;;
    "help"|"-h"|"--help")
        echo "Usage: $0 [command]"
        echo
        echo "Commands:"
        echo "  build         Build the application only"
        echo "  deploy        Deploy files to existing infrastructure"
        echo "  infrastructure Deploy infrastructure only"
        echo "  verify        Verify the deployment"
        echo "  help          Show this help message"
        echo
        echo "Run without arguments to perform full deployment."
        ;;
    "")
        main
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Run '$0 help' for usage information."
        exit 1
        ;;
esac

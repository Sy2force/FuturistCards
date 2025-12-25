#!/bin/bash

# FuturistCards Deployment Script
# This script automates the deployment process for both frontend and backend

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check if we're in the right directory
if [ ! -f "package.json" ] && [ ! -d "frontend" ] && [ ! -d "backend" ]; then
    print_error "This script must be run from the project root directory"
    exit 1
fi

print_status "Starting FuturistCards deployment process..."

# Check Node.js version
NODE_VERSION=$(node --version)
print_status "Node.js version: $NODE_VERSION"

if ! node -e "process.exit(process.version.match(/v(\d+)/)[1] >= 18 ? 0 : 1)"; then
    print_error "Node.js version 18 or higher is required"
    exit 1
fi

# Function to deploy frontend
deploy_frontend() {
    print_status "Deploying frontend to Vercel..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm ci --production=false
    
    # Run linting
    print_status "Running ESLint..."
    npm run lint
    
    # Build the project
    print_status "Building frontend..."
    npm run build
    
    # Check if build was successful
    if [ ! -d "dist" ]; then
        print_error "Frontend build failed - dist directory not found"
        exit 1
    fi
    
    print_success "Frontend build completed successfully"
    
    # Deploy to Vercel (requires Vercel CLI)
    if command -v vercel &> /dev/null; then
        print_status "Deploying to Vercel..."
        vercel --prod --yes
        print_success "Frontend deployed to Vercel"
    else
        print_warning "Vercel CLI not found. Please deploy manually or install Vercel CLI"
        print_status "Build files are ready in the dist/ directory"
    fi
    
    cd ..
}

# Function to deploy backend
deploy_backend() {
    print_status "Preparing backend for deployment..."
    
    cd backend
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    npm ci --production
    
    # Run tests if they exist
    if [ -f "package.json" ] && grep -q '"test"' package.json; then
        print_status "Running backend tests..."
        npm test || print_warning "Some tests failed, but continuing deployment"
    fi
    
    print_success "Backend is ready for deployment"
    print_status "Backend should be deployed through Render dashboard or Git integration"
    
    cd ..
}

# Function to run final checks
run_final_checks() {
    print_status "Running final deployment checks..."
    
    # Check if environment files exist
    if [ ! -f "frontend/.env.example" ]; then
        print_warning "Frontend .env.example not found"
    fi
    
    if [ ! -f "backend/.env.example" ]; then
        print_warning "Backend .env.example not found"
    fi
    
    # Check deployment configuration files
    if [ ! -f "vercel.json" ]; then
        print_warning "vercel.json not found"
    fi
    
    if [ ! -f "render.yaml" ]; then
        print_warning "render.yaml not found"
    fi
    
    print_success "Deployment checks completed"
}

# Main deployment process
main() {
    print_status "=== FuturistCards Deployment Script ==="
    
    # Parse command line arguments
    DEPLOY_FRONTEND=true
    DEPLOY_BACKEND=true
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --frontend-only)
                DEPLOY_BACKEND=false
                shift
                ;;
            --backend-only)
                DEPLOY_FRONTEND=false
                shift
                ;;
            --help)
                echo "Usage: $0 [options]"
                echo "Options:"
                echo "  --frontend-only    Deploy only the frontend"
                echo "  --backend-only     Deploy only the backend"
                echo "  --help            Show this help message"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    # Run deployment steps
    if [ "$DEPLOY_FRONTEND" = true ]; then
        deploy_frontend
    fi
    
    if [ "$DEPLOY_BACKEND" = true ]; then
        deploy_backend
    fi
    
    run_final_checks
    
    print_success "=== Deployment process completed! ==="
    print_status "Next steps:"
    echo "1. Verify frontend deployment at your Vercel URL"
    echo "2. Check backend deployment at your Render URL"
    echo "3. Test all functionality end-to-end"
    echo "4. Monitor logs for any issues"
}

# Run the main function
main "$@"

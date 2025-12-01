#!/usr/bin/env bash
set -e

echo "🔧 Building FuturistCards for Render..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
cd ../frontend && npm install

echo "🏗️ Building frontend..."
npm run build

# Copy frontend build to backend for serving
echo "📁 Copying frontend build to backend..."
cp -r dist ../backend/

echo "✅ Build completed successfully!"

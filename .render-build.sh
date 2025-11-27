#!/usr/bin/env bash
set -e

echo "🔧 Building FuturistCards for Render..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install --prefix backend

# Install frontend dependencies and build
echo "📦 Installing frontend dependencies..."
npm install --prefix frontend

echo "🏗️ Building frontend..."
npm run build --prefix frontend

echo "✅ Build completed successfully!"

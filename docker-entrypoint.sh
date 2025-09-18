#!/bin/sh

# Start backend in background
echo "🚀 Starting backend server..."
cd /app && npm run start:backend &

# Wait for backend to be ready
echo "⏳ Waiting for backend to start..."
sleep 10

# Start nginx in foreground
echo "🌐 Starting nginx..."
nginx -g 'daemon off;'

#!/bin/bash

# FuturistCards - Automatic Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting FuturistCards Application..."
echo "======================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Function to kill processes on specific ports
cleanup_ports() {
    echo "🧹 Cleaning up ports 3000 and 5001..."
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    lsof -ti:5001 | xargs kill -9 2>/dev/null || true
    sleep 2
}

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    
    # Install root dependencies
    if [ -f "package.json" ]; then
        npm install
    fi
    
    # Install backend dependencies
    if [ -d "backend" ]; then
        echo "📦 Installing backend dependencies..."
        cd backend
        npm install
        cd ..
    fi
    
    # Install frontend dependencies
    if [ -d "frontend" ]; then
        echo "📦 Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
    fi
}

# Function to check if .env files exist
check_env_files() {
    echo "🔍 Checking environment files..."
    
    if [ ! -f "backend/.env" ]; then
        echo "⚠️  Backend .env file not found. Creating from .env.example..."
        if [ -f ".env.example" ]; then
            cp .env.example backend/.env
            echo "✅ Created backend/.env from .env.example"
            echo "📝 Please update backend/.env with your MongoDB URI and JWT secrets"
        else
            echo "❌ .env.example not found. Please create backend/.env manually"
        fi
    fi
    
    if [ ! -f "frontend/.env" ]; then
        echo "⚠️  Frontend .env file not found. Creating from .env.example..."
        if [ -f "frontend/.env.example" ]; then
            cp frontend/.env.example frontend/.env
            echo "✅ Created frontend/.env from frontend/.env.example"
        fi
    fi
}

# Function to start backend
start_backend() {
    echo "🔧 Starting backend server..."
    cd backend
    npm start &
    BACKEND_PID=$!
    cd ..
    echo "✅ Backend started with PID: $BACKEND_PID"
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting frontend server..."
    cd frontend
    npm run dev &
    FRONTEND_PID=$!
    cd ..
    echo "✅ Frontend started with PID: $FRONTEND_PID"
}

# Function to wait for servers
wait_for_servers() {
    echo "⏳ Waiting for servers to start..."
    sleep 5
    
    # Check backend health
    if curl -s http://localhost:5001/api/health > /dev/null; then
        echo "✅ Backend is running on http://localhost:5001"
    else
        echo "⚠️  Backend might not be ready yet"
    fi
    
    # Check frontend
    if curl -s http://localhost:3000 > /dev/null; then
        echo "✅ Frontend is running on http://localhost:3000"
    else
        echo "⚠️  Frontend might not be ready yet"
    fi
}

# Function to open browser
open_browser() {
    echo "🌐 Opening browser..."
    sleep 3
    if command -v open &> /dev/null; then
        open http://localhost:3000
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:3000
    else
        echo "📱 Please open http://localhost:3000 in your browser"
    fi
}

# Function to handle cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    cleanup_ports
    echo "👋 FuturistCards stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    cleanup_ports
    install_dependencies
    check_env_files
    start_backend
    sleep 3
    start_frontend
    wait_for_servers
    open_browser
    
    echo ""
    echo "🎉 FuturistCards is running!"
    echo "================================"
    echo "🔧 Backend:  http://localhost:5001"
    echo "🎨 Frontend: http://localhost:3000"
    echo "📚 API Docs: http://localhost:5001/api/health"
    echo ""
    echo "Press Ctrl+C to stop all servers"
    echo ""
    
    # Keep script running
    wait
}

# Run main function
main

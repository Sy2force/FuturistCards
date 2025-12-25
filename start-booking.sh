#!/bin/bash

# FuturistCards - Booking.com Design - Start Script
echo "🚀 Starting FuturistCards with Booking.com Design..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "frontend/node_modules" ] || [ ! -d "backend/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    cd backend && npm install
    cd ../frontend && npm install
    cd ..
fi

# Kill existing processes on ports
echo -e "${BLUE}🔧 Cleaning up ports...${NC}"
lsof -ti:3010 | xargs kill -9 2>/dev/null
lsof -ti:5001 | xargs kill -9 2>/dev/null

# Start Backend
echo -e "${GREEN}🚀 Starting Backend on port 5001...${NC}"
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start Frontend
echo -e "${GREEN}🚀 Starting Frontend on port 3010...${NC}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
sleep 3

echo -e "${GREEN}✅ FuturistCards is running!${NC}"
echo ""
echo "📍 Frontend: http://localhost:3010"
echo "📍 Backend:  http://localhost:5001"
echo "📍 API Health: http://localhost:5001/api/health"
echo ""
echo "🎨 Design: Booking.com Professional Style"
echo "📚 Documentation: README_BOOKING.md"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for user to press Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo -e '\n${YELLOW}👋 Stopped FuturistCards${NC}'; exit" INT
wait

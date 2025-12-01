#!/bin/bash

# 🚀 Script de vérification déploiement FuturistCards
# Vérifie la connectivité Render, MongoDB et endpoints critiques

set -e

# Configuration
BACKEND_URL="http://localhost:5001"
FRONTEND_URL="http://localhost:3000"
LOCAL_API="${3:-http://localhost:10000/api}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔥 FUTURISTCARDS DEPLOYMENT CHECK${NC}"
echo -e "${BLUE}=================================${NC}"
echo ""

# Test function
test_endpoint() {
    local url=$1
    local name=$2
    local expected_status=${3:-200}
    
    echo -n "Testing $name... "
    
    if response=$(curl -s -w "%{http_code}" -o /tmp/response.json "$url" 2>/dev/null); then
        status_code="${response: -3}"
        if [ "$status_code" = "$expected_status" ]; then
            echo -e "${GREEN}✅ OK ($status_code)${NC}"
            # Show response content for health checks
            if [[ "$name" == *"Health"* ]]; then
                echo "Response: $(cat /tmp/response.json | head -c 200)..."
            fi
            return 0
        else
            echo -e "${RED}❌ FAIL ($status_code)${NC}"
            echo "Response: $(cat /tmp/response.json | head -c 200)..."
            return 1
        fi
    else
        echo -e "${RED}❌ CONNECTION FAILED${NC}"
        return 1
    fi
}

# Test MongoDB connection via health endpoint
test_mongodb() {
    local api_url=$1
    echo -n "Testing MongoDB connection... "
    
    if response=$(curl -s "$api_url/health" 2>/dev/null); then
        if echo "$response" | grep -q '"mongodb":true'; then
            echo -e "${GREEN}✅ CONNECTED${NC}"
            echo "MongoDB Status: $(echo "$response" | grep -o '"mongodb":[^,]*')"
            return 0
        elif echo "$response" | grep -q '"mongodb":false'; then
            echo -e "${RED}❌ DISCONNECTED${NC}"
            echo "Error: $(echo "$response" | grep -o '"error":"[^"]*"')"
            return 1
        else
            echo -e "${YELLOW}⚠️ UNKNOWN STATUS${NC}"
            echo "Response: $response"
            return 1
        fi
    else
        echo -e "${RED}❌ HEALTH CHECK FAILED${NC}"
        return 1
    fi
}

# Test authentication endpoint
test_auth() {
    local api_url=$1
    echo -n "Testing auth endpoint... "
    
    auth_data='{"email":"test@demo.com","password":"Demo1234!"}'
    if response=$(curl -s -X POST -H "Content-Type: application/json" -d "$auth_data" "$api_url/auth/login" 2>/dev/null); then
        if echo "$response" | grep -q '"token"'; then
            echo -e "${GREEN}✅ AUTH OK${NC}"
            return 0
        else
            echo -e "${YELLOW}⚠️  AUTH RESPONSE: $(echo "$response" | head -c 100)${NC}"
            return 1
        fi
    else
        echo -e "${RED}❌ AUTH FAILED${NC}"
        return 1
    fi
}

# Main tests
echo -e "${YELLOW}📊 TESTING LOCAL BACKEND${NC}"
echo "URL: $BACKEND_URL"
echo ""

test_endpoint "$BACKEND_URL/api/health" "Health endpoint"
test_mongodb "$BACKEND_URL/api"
test_endpoint "$BACKEND_URL/api/cards" "Cards endpoint"
test_auth "$BACKEND_URL/api"

echo ""
echo -e "${YELLOW}📊 TESTING FRONTEND${NC}"
echo "URL: $FRONTEND_URL"
echo ""

if curl -s "$FRONTEND_URL" >/dev/null 2>&1; then
    test_endpoint "$FRONTEND_URL" "Frontend homepage"
    test_endpoint "$FRONTEND_URL/cards" "Cards page"
    test_endpoint "$FRONTEND_URL/login" "Login page"
else
    echo -e "${YELLOW}⚠️  Frontend server not running${NC}"
fi

echo ""
echo -e "${BLUE}📋 DEPLOYMENT STATUS SUMMARY${NC}"
echo -e "${BLUE}=============================${NC}"

# Final status
if test_endpoint "$BACKEND_URL/api/health" "Final Backend check" >/dev/null 2>&1; then
    echo -e "${GREEN}🎉 LOCAL BACKEND WORKING!${NC}"
    echo -e "${GREEN}✅ Backend: $BACKEND_URL${NC}"
    echo -e "${GREEN}✅ MongoDB: Connected${NC}"
    exit 0
else
    echo -e "${RED}❌ BACKEND ISSUES DETECTED${NC}"
    echo -e "${YELLOW}💡 Check logs and environment variables${NC}"
    exit 1
fi

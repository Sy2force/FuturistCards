#!/bin/bash

# 🚀 Script de test API complet FuturistCards
# Tests des endpoints critiques pour validation Render + Vercel

set -e

API_BASE_URL="${1:-http://localhost:10000/api}"
COLORS=true

# Colors for output
if [ "$COLORS" = true ]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
    NC='\033[0m' # No Color
else
    RED=''
    GREEN=''
    YELLOW=''
    BLUE=''
    NC=''
fi

echo -e "${BLUE}🔥 FUTURISTCARDS API TEST SUITE${NC}"
echo -e "${BLUE}=================================${NC}"
echo "Testing API: $API_BASE_URL"
echo ""

# Test counter
TOTAL_TESTS=0
PASSED_TESTS=0

test_endpoint() {
    local method="$1"
    local endpoint="$2"
    local expected_status="$3"
    local description="$4"
    local data="$5"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    echo -n "[$TOTAL_TESTS] $description... "
    
    if [ -n "$data" ]; then
        response=$(curl -s -w "%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$API_BASE_URL$endpoint" -o /tmp/response.json)
    else
        response=$(curl -s -w "%{http_code}" -X "$method" \
            "$API_BASE_URL$endpoint" -o /tmp/response.json)
    fi
    
    status_code="${response: -3}"
    
    if [ "$status_code" = "$expected_status" ]; then
        echo -e "${GREEN}✅ PASS (${status_code})${NC}"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        
        # Show response for important endpoints
        if [[ "$endpoint" == "/health" ]] || [[ "$endpoint" == "/auth/login" ]]; then
            echo "   Response: $(cat /tmp/response.json | head -c 200)..."
        fi
    else
        echo -e "${RED}❌ FAIL (Expected: ${expected_status}, Got: ${status_code})${NC}"
        echo "   Response: $(cat /tmp/response.json 2>/dev/null || echo 'No response')"
    fi
    echo ""
}

echo -e "${YELLOW}📊 TESTING CORE ENDPOINTS...${NC}"
echo ""

# 1. Health Check
test_endpoint "GET" "/health" "200" "Health endpoint"

# 2. Auth endpoints
test_endpoint "POST" "/auth/register" "400" "Register (no data - validation error)" ""
test_endpoint "POST" "/auth/login" "400" "Login (no data - validation error)" ""

# Test with valid registration data
register_data='{"email":"test@cardpro.dev","password":"Test123!","firstName":"Test","lastName":"User","phone":"1234567890"}'
test_endpoint "POST" "/auth/register" "201" "Register valid user" "$register_data"

# Test login with valid data
login_data='{"email":"test@cardpro.dev","password":"Test123!"}'
test_endpoint "POST" "/auth/login" "200" "Login valid user" "$login_data"

# 3. Public endpoints
test_endpoint "GET" "/cards" "200" "Get all cards (public)"
test_endpoint "GET" "/cards/search" "200" "Search cards (public)"
test_endpoint "GET" "/cards/suggestions" "200" "Get search suggestions (public)"

# 4. Protected endpoints (should fail without auth)
test_endpoint "GET" "/auth/me" "401" "Get user profile (no auth)"
test_endpoint "GET" "/cards/my-cards" "401" "Get user cards (no auth)"
test_endpoint "POST" "/cards" "401" "Create card (no auth)"

# 5. Admin endpoints (should fail without admin auth)
test_endpoint "GET" "/auth/admin/stats" "401" "Admin stats (no auth)"
test_endpoint "GET" "/auth/admin/health" "401" "Admin health (no auth)"

# 6. Favorites endpoints
test_endpoint "GET" "/favorites" "401" "Get favorites (no auth)"
test_endpoint "POST" "/favorites/toggle" "401" "Toggle favorite (no auth)"

# 7. Edge cases
test_endpoint "GET" "/nonexistent" "404" "Non-existent endpoint"
test_endpoint "GET" "/cards/invalid-id" "400" "Invalid card ID"

echo ""
echo -e "${BLUE}📈 TEST RESULTS${NC}"
echo -e "${BLUE}===============${NC}"
echo "Total Tests: $TOTAL_TESTS"
echo -e "Passed: ${GREEN}$PASSED_TESTS${NC}"
echo -e "Failed: ${RED}$((TOTAL_TESTS - PASSED_TESTS))${NC}"
echo -e "Success Rate: ${GREEN}$(( PASSED_TESTS * 100 / TOTAL_TESTS ))%${NC}"

if [ $PASSED_TESTS -eq $TOTAL_TESTS ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! API is ready for production.${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Some tests failed. Check the API configuration.${NC}"
    exit 1
fi

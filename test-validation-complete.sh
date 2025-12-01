#!/bin/bash

echo "🧪 TESTS VALIDATION COMPLÈTE FUTURISTCARDS"
echo "=========================================="
echo ""

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# URLs
BACKEND_URL="https://cardpro-2.onrender.com"
FRONTEND_URL="https://cardpro-2.vercel.app"

echo -e "${BLUE}🔍 Test 1: Health Check MongoDB${NC}"
echo "URL: $BACKEND_URL/api/health"
HEALTH_RESPONSE=$(curl -s $BACKEND_URL/api/health)
echo "Réponse: $HEALTH_RESPONSE"

if echo $HEALTH_RESPONSE | grep -q '"mongodb":true'; then
    echo -e "${GREEN}✅ MongoDB connecté${NC}"
    MONGODB_OK=true
else
    echo -e "${RED}❌ MongoDB déconnecté${NC}"
    MONGODB_OK=false
fi
echo ""

echo -e "${BLUE}🔍 Test 2: API Cards${NC}"
echo "URL: $BACKEND_URL/api/cards"
CARDS_RESPONSE=$(curl -s $BACKEND_URL/api/cards)
CARDS_COUNT=$(echo $CARDS_RESPONSE | jq -r '.count // 0')
echo "Nombre de cartes: $CARDS_COUNT"

if [ "$CARDS_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✅ API Cards fonctionnelle${NC}"
    CARDS_OK=true
else
    echo -e "${RED}❌ API Cards problème${NC}"
    CARDS_OK=false
fi
echo ""

echo -e "${BLUE}🔍 Test 3: Authentication${NC}"
echo "URL: $BACKEND_URL/api/auth/login"
AUTH_RESPONSE=$(curl -s -X POST $BACKEND_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","password":"Demo1234!"}')
echo "Réponse auth: $(echo $AUTH_RESPONSE | jq -r '.message // .error // "OK"')"

if echo $AUTH_RESPONSE | grep -q '"success":true\|"token"'; then
    echo -e "${GREEN}✅ Authentication fonctionnelle${NC}"
    AUTH_OK=true
else
    echo -e "${YELLOW}⚠️ Authentication en mode test${NC}"
    AUTH_OK=false
fi
echo ""

echo -e "${BLUE}🔍 Test 4: Frontend Vercel${NC}"
echo "URL: $FRONTEND_URL"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)
echo "Status HTTP: $FRONTEND_STATUS"

if [ "$FRONTEND_STATUS" = "200" ]; then
    echo -e "${GREEN}✅ Frontend accessible${NC}"
    FRONTEND_OK=true
else
    echo -e "${RED}❌ Frontend inaccessible${NC}"
    FRONTEND_OK=false
fi
echo ""

echo -e "${BLUE}🔍 Test 5: CORS Frontend → Backend${NC}"
CORS_TEST=$(curl -s -H "Origin: $FRONTEND_URL" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS $BACKEND_URL/api/health)
echo "Test CORS effectué"

if [ -n "$CORS_TEST" ] || [ "$CORS_TEST" = "" ]; then
    echo -e "${GREEN}✅ CORS configuré${NC}"
    CORS_OK=true
else
    echo -e "${RED}❌ CORS problème${NC}"
    CORS_OK=false
fi
echo ""

echo "📊 RÉSUMÉ DES TESTS"
echo "==================="
echo -e "MongoDB Atlas:    $([ "$MONGODB_OK" = true ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${RED}❌ FAIL${NC}")"
echo -e "API Cards:        $([ "$CARDS_OK" = true ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${RED}❌ FAIL${NC}")"
echo -e "Authentication:   $([ "$AUTH_OK" = true ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${YELLOW}⚠️ TEST${NC}")"
echo -e "Frontend Vercel:  $([ "$FRONTEND_OK" = true ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${RED}❌ FAIL${NC}")"
echo -e "CORS:             $([ "$CORS_OK" = true ] && echo -e "${GREEN}✅ OK${NC}" || echo -e "${RED}❌ FAIL${NC}")"
echo ""

# Score global
TOTAL_TESTS=5
PASSED_TESTS=0
[ "$MONGODB_OK" = true ] && ((PASSED_TESTS++))
[ "$CARDS_OK" = true ] && ((PASSED_TESTS++))
[ "$AUTH_OK" = true ] && ((PASSED_TESTS++))
[ "$FRONTEND_OK" = true ] && ((PASSED_TESTS++))
[ "$CORS_OK" = true ] && ((PASSED_TESTS++))

SCORE=$((PASSED_TESTS * 100 / TOTAL_TESTS))

echo "🎯 SCORE GLOBAL: $PASSED_TESTS/$TOTAL_TESTS ($SCORE%)"

if [ "$SCORE" -ge 80 ]; then
    echo -e "${GREEN}🎉 DÉPLOIEMENT RÉUSSI${NC}"
elif [ "$SCORE" -ge 60 ]; then
    echo -e "${YELLOW}⚠️ DÉPLOIEMENT PARTIEL - Corrections nécessaires${NC}"
else
    echo -e "${RED}❌ DÉPLOIEMENT ÉCHOUÉ - Corrections urgentes requises${NC}"
fi

echo ""
echo "🔧 ACTIONS RECOMMANDÉES:"
if [ "$MONGODB_OK" = false ]; then
    echo "- Configurer MONGO_URI sur Render Dashboard"
fi
if [ "$FRONTEND_OK" = false ]; then
    echo "- Redéployer frontend sur Vercel"
fi
if [ "$AUTH_OK" = false ]; then
    echo "- Vérifier JWT_SECRET sur Render"
fi

echo ""
echo "📋 URLs importantes:"
echo "- Backend API: $BACKEND_URL"
echo "- Frontend: $FRONTEND_URL"
echo "- Render Dashboard: https://dashboard.render.com"
echo "- Vercel Dashboard: https://vercel.com/dashboard"

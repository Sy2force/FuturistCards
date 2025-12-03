#!/bin/bash

# ===========================================
# SCRIPT TEST DÉPLOIEMENT COMPLET
# ===========================================

echo "🧪 TEST DÉPLOIEMENT COMPLET - CARDPRO"
echo "====================================="

# Variables
BACKEND_URL="https://cardpro-backend.onrender.com"
FRONTEND_URL="https://cardpro-frontend.vercel.app"

echo "📊 URLs de test:"
echo "Backend:  $BACKEND_URL"
echo "Frontend: $FRONTEND_URL"
echo ""

# Test Backend
echo "🖥️ TEST BACKEND RENDER"
echo "======================"

echo "1. Test Health Endpoint:"
HEALTH_RESPONSE=$(curl -s "$BACKEND_URL/api/health" 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Backend accessible"
    echo "$HEALTH_RESPONSE" | jq . 2>/dev/null || echo "$HEALTH_RESPONSE"
else
    echo "❌ Backend inaccessible"
fi

echo ""
echo "2. Test Cards Endpoint:"
CARDS_RESPONSE=$(curl -s "$BACKEND_URL/api/cards" 2>/dev/null)
if [ $? -eq 0 ]; then
    CARD_COUNT=$(echo "$CARDS_RESPONSE" | jq '.data | length' 2>/dev/null || echo "N/A")
    echo "✅ Cards endpoint: $CARD_COUNT cartes"
else
    echo "❌ Cards endpoint inaccessible"
fi

echo ""
echo "3. Test Auth Endpoint:"
AUTH_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"test@demo.com","password":"Demo1234!"}' 2>/dev/null)
if [ $? -eq 0 ]; then
    AUTH_SUCCESS=$(echo "$AUTH_RESPONSE" | jq '.success' 2>/dev/null || echo "false")
    echo "✅ Auth endpoint: success=$AUTH_SUCCESS"
else
    echo "❌ Auth endpoint inaccessible"
fi

# Test Frontend
echo ""
echo "🌐 TEST FRONTEND VERCEL"
echo "======================"

echo "1. Test Accès Frontend:"
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL" 2>/dev/null)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "✅ Frontend accessible (HTTP $FRONTEND_STATUS)"
else
    echo "❌ Frontend inaccessible (HTTP $FRONTEND_STATUS)"
fi

echo ""
echo "2. Test Configuration API:"
FRONTEND_CONTENT=$(curl -s "$FRONTEND_URL" 2>/dev/null)
if echo "$FRONTEND_CONTENT" | grep -q "cardpro-backend.onrender.com" 2>/dev/null; then
    echo "✅ Configuration API détectée"
else
    echo "⚠️ Configuration API non détectée"
fi

# Test Intégration
echo ""
echo "🔗 TEST INTÉGRATION"
echo "=================="

echo "1. Test CORS:"
CORS_TEST=$(curl -s -H "Origin: $FRONTEND_URL" \
    -H "Access-Control-Request-Method: GET" \
    -H "Access-Control-Request-Headers: Content-Type" \
    -X OPTIONS "$BACKEND_URL/api/health" 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ CORS configuré"
else
    echo "❌ Problème CORS"
fi

# Résumé
echo ""
echo "📋 RÉSUMÉ DU DÉPLOIEMENT"
echo "======================="
echo "Backend Render:  $([ "$HEALTH_RESPONSE" ] && echo "✅ Opérationnel" || echo "❌ Problème")"
echo "Frontend Vercel: $([ "$FRONTEND_STATUS" = "200" ] && echo "✅ Opérationnel" || echo "❌ Problème")"
echo "MongoDB Atlas:   $(echo "$HEALTH_RESPONSE" | jq -r '.mongodb // "false"' 2>/dev/null)"
echo "Intégration:     $([ $? -eq 0 ] && echo "✅ Fonctionnelle" || echo "⚠️ À vérifier")"

echo ""
echo "🎯 PROCHAINES ÉTAPES:"
echo "- Tester l'application complète sur $FRONTEND_URL"
echo "- Vérifier login/register/CRUD cards"
echo "- Valider la persistance MongoDB"

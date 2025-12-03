#!/bin/bash

# 🧪 SCRIPT TEST INTÉGRATION - FUTURISTCARDS
# Valide le fonctionnement complet de l'application

echo "🧪 TESTS D'INTÉGRATION - FUTURISTCARDS"
echo "======================================"

# Test Backend API
echo "🔍 TEST 1: Backend API Health"
BACKEND_RESPONSE=$(curl -s https://cardpro-1.onrender.com/api/health)
echo "Response: $BACKEND_RESPONSE"

if echo "$BACKEND_RESPONSE" | grep -q '"mongodb":"connected"'; then
    echo "✅ Backend: MongoDB connecté"
    BACKEND_OK=true
else
    echo "❌ Backend: MongoDB en fallback mode"
    BACKEND_OK=false
fi

# Test Backend Cards
echo ""
echo "🔍 TEST 2: Backend Cards Endpoint"
CARDS_RESPONSE=$(curl -s https://cardpro-1.onrender.com/api/cards)
if echo "$CARDS_RESPONSE" | grep -q '"success":true'; then
    echo "✅ Cards endpoint fonctionnel"
    CARDS_OK=true
else
    echo "❌ Cards endpoint défaillant"
    CARDS_OK=false
fi

# Test Backend Auth
echo ""
echo "🔍 TEST 3: Backend Auth Endpoints"
AUTH_RESPONSE=$(curl -s -X POST https://cardpro-1.onrender.com/api/auth/login -H "Content-Type: application/json" -d '{"email":"test@test.com","password":"test"}')
if echo "$AUTH_RESPONSE" | grep -q '"success"'; then
    echo "✅ Auth endpoint accessible"
    AUTH_OK=true
else
    echo "❌ Auth endpoint inaccessible"
    AUTH_OK=false
fi

# Résumé des tests
echo ""
echo "📊 RÉSUMÉ DES TESTS:"
echo "==================="
if [ "$BACKEND_OK" = true ]; then
    echo "✅ Backend MongoDB: Connecté"
else
    echo "❌ Backend MongoDB: Fallback mode"
fi

if [ "$CARDS_OK" = true ]; then
    echo "✅ API Cards: Fonctionnel"
else
    echo "❌ API Cards: Défaillant"
fi

if [ "$AUTH_OK" = true ]; then
    echo "✅ API Auth: Accessible"
else
    echo "❌ API Auth: Inaccessible"
fi

echo ""
if [ "$BACKEND_OK" = true ] && [ "$CARDS_OK" = true ] && [ "$AUTH_OK" = true ]; then
    echo "🎉 BACKEND: Tous les tests passés!"
    echo "🚀 Prêt pour déploiement frontend Vercel"
else
    echo "⚠️  BACKEND: Certains tests échouent"
    echo "🔧 Vérifier configuration Render"
fi

echo ""
echo "🎯 PROCHAINES ÉTAPES:"
echo "1. Corriger variables Render si nécessaire"
echo "2. Déployer frontend: ./scripts/deploy-vercel.sh"
echo "3. Tester intégration complète"

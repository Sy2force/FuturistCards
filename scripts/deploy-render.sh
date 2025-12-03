#!/bin/bash

# 🚀 SCRIPT DÉPLOIEMENT RENDER - FUTURISTCARDS
# Automatise la configuration et le déploiement sur Render

echo "🎯 DÉPLOIEMENT RENDER - FUTURISTCARDS BACKEND"
echo "=============================================="

# Variables Render à configurer
RENDER_SERVICE_ID="cardpro-1"
MONGO_URI="mongodb+srv://S-User:Sy2force2025secure!@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority"
JWT_SECRET="super-secret-cardpro-2025-hack3ru-validé-✅"
CORS_ORIGIN="https://cardpro-frontend.vercel.app"
NODE_ENV="production"
PORT="5001"

echo "📋 VARIABLES À CONFIGURER SUR RENDER:"
echo "------------------------------------"
echo "MONGO_URI=$MONGO_URI"
echo "JWT_SECRET=$JWT_SECRET"
echo "CORS_ORIGIN=$CORS_ORIGIN"
echo "NODE_ENV=$NODE_ENV"
echo "PORT=$PORT"
echo ""

echo "🔧 ÉTAPES MANUELLES REQUISES:"
echo "1. Aller sur: https://dashboard.render.com"
echo "2. Sélectionner service: $RENDER_SERVICE_ID"
echo "3. Onglet Environment → Mettre à jour les variables ci-dessus"
echo "4. Settings → Manual Deploy → Clear Cache and Deploy"
echo ""

echo "⏳ Attendre 2-3 minutes après déploiement..."
echo ""

echo "🧪 TEST AUTOMATIQUE DE L'API:"
echo "curl https://cardpro-1.onrender.com/api/health"
echo ""

# Test de l'API
echo "🔍 Test en cours..."
RESPONSE=$(curl -s https://cardpro-1.onrender.com/api/health)
echo "📊 Réponse API: $RESPONSE"

# Vérifier si MongoDB est connecté
if echo "$RESPONSE" | grep -q '"mongodb":"connected"'; then
    echo "✅ SUCCESS: MongoDB connecté!"
    echo "🎉 Backend Render opérationnel!"
else
    echo "❌ WARNING: MongoDB en mode fallback"
    echo "🔧 Vérifier les variables d'environnement sur Render"
fi

echo ""
echo "🎯 PROCHAINE ÉTAPE: Déploiement frontend Vercel"
echo "Script: ./scripts/deploy-vercel.sh"

#!/bin/bash

# ===========================================
# SCRIPT DÉPLOIEMENT RENDER - CARDPRO BACKEND
# ===========================================

echo "🚀 DÉPLOIEMENT BACKEND RENDER"
echo "============================="

# Vérification prérequis
echo "📋 Vérification des prérequis..."

if [ ! -f "backend/package.json" ]; then
    echo "❌ Erreur: backend/package.json non trouvé"
    exit 1
fi

if [ ! -f "backend/server.js" ]; then
    echo "❌ Erreur: backend/server.js non trouvé"
    exit 1
fi

echo "✅ Structure backend validée"

# Vérification variables d'environnement
echo "📋 Variables d'environnement requises pour Render:"
echo "MONGO_URI=mongodb+srv://cardpro-admin:PASSWORD@cardpro-cluster.xxxxx.mongodb.net/cardpro"
echo "JWT_SECRET=cardpro_jwt_secret_2025_secure_key_production"
echo "NODE_ENV=production"
echo "PORT=10000"
echo "CORS_ORIGIN=https://cardpro-frontend.vercel.app"
echo "LOG_LEVEL=info"
echo "ENABLE_REQUEST_LOGGING=true"

echo ""
echo "🔧 CONFIGURATION RENDER:"
echo "========================"
echo "Service Name: cardpro-backend"
echo "Environment: Node"
echo "Root Directory: backend"
echo "Build Command: npm install"
echo "Start Command: npm start"
echo "Instance Type: Free"

echo ""
echo "📝 ÉTAPES MANUELLES:"
echo "1. Aller sur https://render.com"
echo "2. New → Web Service"
echo "3. Connect GitHub repository"
echo "4. Configurer selon les paramètres ci-dessus"
echo "5. Ajouter les variables d'environnement"
echo "6. Deploy"

echo ""
echo "✅ URL attendue: https://cardpro-backend.onrender.com"

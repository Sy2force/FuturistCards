#!/bin/bash

# ===========================================
# SCRIPT DÉPLOIEMENT VERCEL - CARDPRO FRONTEND
# ===========================================

echo "🚀 DÉPLOIEMENT FRONTEND VERCEL"
echo "=============================="

# Vérification prérequis
echo "📋 Vérification des prérequis..."

if [ ! -f "frontend/package.json" ]; then
    echo "❌ Erreur: frontend/package.json non trouvé"
    exit 1
fi

if [ ! -f "frontend/vite.config.js" ]; then
    echo "❌ Erreur: frontend/vite.config.js non trouvé"
    exit 1
fi

echo "✅ Structure frontend validée"

# Vérification variables d'environnement
echo "📋 Variables d'environnement requises pour Vercel:"
echo "VITE_API_URL=https://cardpro-backend.onrender.com/api"
echo "VITE_APP_NAME=CardPro"
echo "VITE_ENVIRONMENT=production"

echo ""
echo "🔧 CONFIGURATION VERCEL:"
echo "========================"
echo "Project Name: cardpro-frontend"
echo "Framework: Vite"
echo "Root Directory: frontend"
echo "Build Command: npm run build"
echo "Output Directory: dist"
echo "Install Command: npm install"

echo ""
echo "📝 ÉTAPES MANUELLES:"
echo "1. Aller sur https://vercel.com"
echo "2. Import Project → GitHub"
echo "3. Sélectionner le repository CardPro"
echo "4. Configurer selon les paramètres ci-dessus"
echo "5. Ajouter les variables d'environnement"
echo "6. Deploy"

echo ""
echo "✅ URL attendue: https://cardpro-frontend.vercel.app"

#!/bin/bash

# 🚀 SCRIPT DÉPLOIEMENT VERCEL - FUTURISTCARDS
# Automatise la configuration et le déploiement frontend

echo "🎯 DÉPLOIEMENT VERCEL - FUTURISTCARDS FRONTEND"
echo "=============================================="

# Variables Vercel
BACKEND_URL="https://cardpro-1.onrender.com/api"
APP_NAME="CardPro"
ENVIRONMENT="production"

echo "📋 CONFIGURATION VERCEL FRONTEND:"
echo "--------------------------------"
echo "Repository: Sy2force/CardPro"
echo "Root Directory: frontend"
echo "Framework: Vite"
echo "Build Command: npm run build"
echo "Output Directory: dist"
echo ""

echo "🔧 VARIABLES D'ENVIRONNEMENT:"
echo "VITE_API_URL=$BACKEND_URL"
echo "VITE_APP_NAME=$APP_NAME"
echo "VITE_ENVIRONMENT=$ENVIRONMENT"
echo ""

echo "📝 ÉTAPES MANUELLES VERCEL:"
echo "1. Aller sur: https://vercel.com/dashboard"
echo "2. New Project → Import from GitHub"
echo "3. Sélectionner: Sy2force/CardPro"
echo "4. Configure Project:"
echo "   - Root Directory: frontend"
echo "   - Framework Preset: Vite"
echo "   - Build Command: npm run build"
echo "   - Output Directory: dist"
echo "5. Environment Variables → Ajouter:"
echo "   - VITE_API_URL=$BACKEND_URL"
echo "   - VITE_APP_NAME=$APP_NAME"
echo "   - VITE_ENVIRONMENT=$ENVIRONMENT"
echo "6. Deploy"
echo ""

echo "⏳ Après déploiement, tester l'intégration..."
echo ""

echo "🧪 TESTS D'INTÉGRATION:"
echo "1. Frontend accessible"
echo "2. Connexion API backend"
echo "3. Authentification fonctionnelle"
echo "4. CRUD cartes opérationnel"
echo ""

echo "🎉 PROJET FINALISÉ QUAND:"
echo "✅ Backend Render: MongoDB connecté"
echo "✅ Frontend Vercel: Déployé et accessible"
echo "✅ Intégration: API + Auth + CRUD fonctionnels"

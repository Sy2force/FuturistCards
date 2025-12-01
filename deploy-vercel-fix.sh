#!/bin/bash

# Script de correction déploiement Vercel
# Résout le problème DEPLOYMENT_NOT_FOUND

echo "🔧 CORRECTION DÉPLOIEMENT VERCEL"
echo "================================"

# 1. Vérifier la structure
echo "📁 Vérification structure frontend..."
if [ ! -d "frontend" ]; then
    echo "❌ Dossier frontend manquant"
    exit 1
fi

cd frontend

# 2. Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# 3. Build de test
echo "🔨 Build de test..."
npm run build

# 4. Vérifier que dist existe
if [ ! -d "dist" ]; then
    echo "❌ Erreur: dossier dist non créé"
    exit 1
fi

echo "✅ Build réussi - dossier dist créé"

# 5. Instructions pour Vercel
echo ""
echo "🌐 CONFIGURATION VERCEL REQUISE"
echo "==============================="
echo "1. Aller sur https://vercel.com/dashboard"
echo "2. Importer le projet GitHub: Sy2force/CardPro"
echo "3. IMPORTANT: Définir 'Root Directory' = frontend"
echo "4. Framework Preset: Vite (auto-détecté)"
echo "5. Build Command: npm run build"
echo "6. Output Directory: dist"
echo ""
echo "Variables d'environnement à ajouter:"
echo "VITE_API_URL=https://cardpro-2.onrender.com/api"
echo "VITE_APP_NAME=FuturistCards"
echo "VITE_ENVIRONMENT=production"
echo ""
echo "✅ Après configuration, le site sera accessible"

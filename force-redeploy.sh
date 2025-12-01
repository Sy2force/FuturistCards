#!/bin/bash

# Script de redéploiement forcé pour Render et Vercel
# Auteur: Shaï Acoca - FuturistCards

echo "🚀 REDÉPLOIEMENT FORCÉ - RENDER & VERCEL"
echo "========================================"

# 1. Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ] && [ ! -d "backend" ] && [ ! -d "frontend" ]; then
    echo "❌ Erreur: Exécuter depuis la racine du projet FuturistCards"
    exit 1
fi

echo "📁 Répertoire de travail: $(pwd)"

# 2. Forcer un commit vide pour déclencher le redéploiement
echo "🔄 Création d'un commit vide pour forcer le redéploiement..."
git commit --allow-empty -m "Force redeploy: Fix mongoose import and Vercel config

- Trigger Render rebuild with corrected mongoose import
- Trigger Vercel rebuild with optimized configuration
- All critical fixes applied and ready for production"

# 3. Push vers GitHub (déclenche auto-deploy)
echo "📤 Push vers GitHub main..."
git push origin main

echo ""
echo "✅ REDÉPLOIEMENT DÉCLENCHÉ"
echo "=========================="
echo "🔧 Render Backend: https://cardpro-2.onrender.com"
echo "🌐 Vercel Frontend: https://cardpro-2.vercel.app"
echo ""
echo "⏳ Attendre 2-3 minutes puis tester:"
echo "curl https://cardpro-2.onrender.com/api/health"
echo ""
echo "📊 Surveiller les déploiements:"
echo "- Render Dashboard: https://dashboard.render.com"
echo "- Vercel Dashboard: https://vercel.com/dashboard"

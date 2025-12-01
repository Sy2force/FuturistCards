#!/bin/bash

# 🚨 SCRIPT DE CORRECTION RENDER - FUTURISTCARDS
# Corrige automatiquement les variables d'environnement sur Render

echo "🔧 CORRECTION RENDER DEPLOYMENT"
echo "================================"

# Variables correctes
MONGO_URI_CORRECT="mongodb+srv://S-User:bg1skvf3eZmQdLNh@cluster0.lhvxveo.mongodb.net/cardpro?appName=Cluster0"
JWT_SECRET_CORRECT="super_secret_key_cardpro_2025_production_256_chars_minimum"
CORS_ORIGIN_CORRECT="https://cardpro-2.vercel.app"

echo "📋 Variables à configurer sur Render Dashboard:"
echo ""
echo "NODE_ENV=production"
echo "PORT=10000"
echo "MONGO_URI=$MONGO_URI_CORRECT"
echo "JWT_SECRET=$JWT_SECRET_CORRECT"
echo "CORS_ORIGIN=$CORS_ORIGIN_CORRECT"
echo ""

echo "🚀 ÉTAPES MANUELLES REQUISES:"
echo "1. Aller sur https://dashboard.render.com"
echo "2. Sélectionner service 'cardpro-2'"
echo "3. Onglet 'Environment'"
echo "4. Modifier/Ajouter les variables ci-dessus"
echo "5. Settings → 'Clear build cache & deploy'"
echo ""

echo "⏱️  Attendre 5-10 minutes pour le redéploiement"
echo ""

echo "🧪 Test après déploiement:"
echo "curl https://cardpro-2.onrender.com/api/health"
echo ""

echo "✅ Réponse attendue: {\"success\":true,\"mongodb\":true}"

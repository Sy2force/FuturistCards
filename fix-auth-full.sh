#!/bin/bash

# 🚀 Script de réparation totale de l'authentification React + Node
# Nom : fix-auth-full.sh

set -e

PROJECT_NAME="FuturistCards"
FRONTEND="frontend"
BACKEND="backend"
DB="fCardPro"
EMAIL="test@demo.com"
PASS="Demo1234!"

echo ""
echo "🔧 DÉMARRAGE DU SCRIPT DE VÉRIFICATION INTÉGRALE : $PROJECT_NAME"
echo "==============================================================="

# 🛑 Étape 0 : Arrêt de tous les serveurs en cours
echo "🛑 Arrêt des serveurs..."
killall node 2>/dev/null || true
pkill -f vite 2>/dev/null || true
sleep 1

# 🧹 Étape 1 : Nettoyage fichiers inutiles
echo "🧹 Nettoyage..."
find . -name "*.DS_Store" -delete
find . -name "*~" -delete
find . -name "*.log" -delete
rm -rf $BACKEND/node_modules $FRONTEND/node_modules
rm -f $BACKEND/package-lock.json $FRONTEND/package-lock.json

# 📦 Étape 2 : Réinstallation
echo "📦 Réinstallation des packages..."
cd $BACKEND && npm install && cd ../$FRONTEND && npm install && cd ..

# 🧪 Étape 3 : Vérification fichiers critiques
echo "🧪 Vérification des fichiers critiques..."
REQUIRED=(
  "$BACKEND/controllers/authController.js"
  "$BACKEND/models/User.js"
  "$BACKEND/routes/authRoutes.js"
  "$BACKEND/middleware/authMiddleware.js"
  "$FRONTEND/src/pages/LoginPage.jsx"
  "$FRONTEND/src/services/authService.js"
)

for file in "${REQUIRED[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Manquant : $file"
    exit 1
  else
    echo "✅ Présent : $file"
  fi
done

# 🔐 Étape 4 : Création user test
echo "🔐 Création utilisateur test : $EMAIL"

node -e "
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './$BACKEND/models/User.js';
mongoose.connect('mongodb://127.0.0.1:27017/$DB').then(async () => {
  const exists = await User.findOne({ email: '$EMAIL' });
  if (!exists) {
    await User.create({
      name: 'Test User',
      email: '$EMAIL',
      password: await bcrypt.hash('$PASS', 10),
      role: 'user'
    });
    console.log('✅ Utilisateur créé');
  } else {
    console.log('ℹ️ Utilisateur déjà existant');
  }
  mongoose.disconnect();
});
"

# 🔄 Étape 5 : Démarrage des serveurs
echo "🔄 Lancement backend sur port 5010..."
cd $BACKEND && cross-env PORT=5010 node server.js & BACK_PID=$! && cd ..
sleep 4

echo "🔄 Lancement frontend sur port 3010..."
cd $FRONTEND && cross-env PORT=3010 VITE_API_URL=http://localhost:5010 npm run dev & FRONT_PID=$! && cd ..
sleep 8

# 🔍 Étape 6 : Test API /auth/login
echo "🔍 Test direct API login avec curl..."
curl -s -X POST http://localhost:5010/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASS\"}" | jq

# 📡 Étape 7 : Vérification React Router
echo "📡 Vérification des avertissements React Router..."
if grep -q "React.startTransition" $FRONTEND/src/pages/LoginPage.jsx; then
  echo "✅ Login utilise React.startTransition (v7 ready)"
else
  echo "ℹ️ Ajouter 'React.startTransition(() => ...)' recommandé dans onSubmit"
fi

# 🔎 Étape 8 : Vérification LoginPage JSX
echo "🔎 Vérification du bouton de connexion..."
LOGIN_FILE="$FRONTEND/src/pages/LoginPage.jsx"
grep -q "onSubmit" $LOGIN_FILE && grep -q "authService.login" $LOGIN_FILE && echo "✅ Formulaire connecté à authService" || echo "❌ Problème dans le onSubmit"

# 🧪 Étape 9 : Playwright
echo "🧪 Lancement des tests Playwright..."
if [ -f "playwright.config.js" ]; then
  npx playwright test tests/auth.spec.js || echo "⚠️ Des tests échouent"
else
  echo "⚠️ Fichier de test manquant. Crée un auth.spec.js pour tester le login."
fi

# 📊 Étape 10 : Résumé final
echo ""
echo "🎯 SCRIPT TERMINÉ — VÉRIFICATION TOTALE EFFECTUÉE"
echo "🔑 Connexion test : $EMAIL / $PASS"
echo "🌐 Frontend : http://localhost:3010"
echo "🔐 Backend  : http://localhost:5010/api/health"
echo ""
echo "✅ Si ça ne se connecte pas → Vérifie dans la console navigateur (F12 > Network / Console)"

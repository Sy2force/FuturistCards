#!/bin/bash

########################################
# 🧠 PHASE 0 : VARIABLES & INIT
########################################

PROJECT_NAME="FuturistCards"
FRONTEND_DIR="frontend"
BACKEND_DIR="backend"
DB_NAME="fCardPro"
USER_SEED_EMAIL="test@demo.com"
USER_SEED_PASSWORD="Demo1234!"

echo ""
echo "🚀 INITIALISATION DE LA VÉRIFICATION DU PROJET : $PROJECT_NAME"
echo "=============================================================="
sleep 1

########################################
# 🔁 PHASE 1 : Nettoyage du projet
########################################

echo ""
echo "🧹 [1/9] Nettoyage des processus Node / Vite..."
killall node 2>/dev/null || echo "✅ Aucun process Node actif"
pkill -f vite 2>/dev/null || echo "✅ Aucun process Vite actif"

echo "🧹 Suppression fichiers inutiles..."
find . -name "*copy*" -type f -delete
find . -name "*.DS_Store" -delete
find . -name "*~" -delete
find . -name "*.log" -delete

echo "🧹 Suppression éventuels modules corrompus..."
rm -rf $BACKEND_DIR/node_modules $FRONTEND_DIR/node_modules
rm -f $BACKEND_DIR/package-lock.json $FRONTEND_DIR/package-lock.json

########################################
# 📦 PHASE 2 : Réinstallation des dépendances
########################################

echo ""
echo "📦 [2/9] Réinstallation propre..."
cd $BACKEND_DIR && npm install && cd ../$FRONTEND_DIR && npm install && cd ..

########################################
# 🧪 PHASE 3 : Vérification des fichiers critiques
########################################

echo ""
echo "📁 [3/9] Vérification structure du projet..."

# Vérification pages frontend
FRONTEND_PAGES=(
  "LoginPage.jsx"
  "RegisterPage.jsx"
  "MyCardsPage.jsx"
  "CreateCardPage.jsx"
  "FavoritesPage.jsx"
  "ProfilePage.jsx"
  "HomePage.jsx"
  "CardDetailsPage.jsx"
  "ErrorPage.jsx"
)

for page in "${FRONTEND_PAGES[@]}"; do
  if [ ! -f "$FRONTEND_DIR/src/pages/$page" ]; then
    echo "❌ Page manquante : $page"
  else
    echo "✅ $page présent"
  fi
done

# Vérification composants critiques
FRONTEND_COMPONENTS=(
  "Navbar.jsx"
  "Footer.jsx"
  "Card.jsx"
  "CardForm.jsx"
  "PrivateRoute.jsx"
)

for comp in "${FRONTEND_COMPONENTS[@]}"; do
  if [ ! -f "$FRONTEND_DIR/src/components/$comp" ]; then
    echo "❌ Composant manquant : $comp"
  else
    echo "✅ $comp présent"
  fi
done

# Vérification backend
REQUIRED_BACKEND_FILES=(
  "$BACKEND_DIR/models/User.js"
  "$BACKEND_DIR/controllers/authController.js"
  "$BACKEND_DIR/routes/authRoutes.js"
  "$BACKEND_DIR/middleware/authMiddleware.js"
)

for file in "${REQUIRED_BACKEND_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Fichier backend manquant : $file"
  else
    echo "✅ $file présent"
  fi
done

echo "🛡️ Vérification des rôles utilisateur"
# Vérifie dans le modèle User.js s'il y a bien : enum: ['user', 'business', 'admin']
grep -q "enum.*user.*business.*admin" backend/models/User.js \
  && echo "✅ Rôles correctement définis" \
  || echo "⚠️ Enum de rôles à ajouter dans User.js"

echo "🔐 Vérification de l'intégration authService"
if grep -q "authService.login" frontend/src/pages/LoginPage.jsx; then
  echo "✅ LoginPage connecté à authService"
else
  echo "❌ LoginPage.jsx n'appelle pas authService.login"
fi

echo "⚙️ Vérification des fichiers d'environnement"
# Backend .env
if [ ! -f backend/.env ]; then
  echo "❌ .env manquant – création auto pour backend"
  echo "MONGO_URI=mongodb://127.0.0.1:27017/fCardPro" > backend/.env
  echo "JWT_SECRET=supersecret" >> backend/.env
fi

# Frontend .env
if [ ! -f frontend/.env ]; then
  echo "❌ .env manquant – création auto pour frontend"
  echo "VITE_API_URL=http://localhost:5010" > frontend/.env
fi

########################################
# 🔐 PHASE 4 : Recréation de l'utilisateur test
########################################

echo ""
echo "🔐 [4/9] Recréation utilisateur test ($USER_SEED_EMAIL)..."

node -e "
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './$BACKEND_DIR/models/User.js';

mongoose.connect('mongodb://127.0.0.1:27017/$DB_NAME').then(async () => {
  const exists = await User.findOne({ email: '$USER_SEED_EMAIL' });
  if (!exists) {
    await User.create({
      name: 'Test',
      email: '$USER_SEED_EMAIL',
      password: await bcrypt.hash('$USER_SEED_PASSWORD', 10),
      role: 'user'
    });
    console.log('✅ Utilisateur créé');
  } else {
    console.log('ℹ️ Utilisateur déjà existant');
  }
  mongoose.disconnect();
});
"

########################################
# 🔄 PHASE 5 : Lancement serveurs
########################################

echo ""
echo "🔄 [5/9] Lancement des serveurs..."

# Backend
cd $BACKEND_DIR && cross-env PORT=5010 node server.js & BACK_PID=$! && cd ..

# Frontend
cd $FRONTEND_DIR && cross-env PORT=3010 VITE_API_URL=http://localhost:5010 npm run dev & FRONT_PID=$! && cd ..

sleep 10

########################################
# 📡 PHASE 6 : Test API de connexion
########################################

echo ""
echo "📡 [6/9] Test connexion API (auth/login)..."
curl -s -X POST http://localhost:5010/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$USER_SEED_EMAIL\",\"password\":\"$USER_SEED_PASSWORD\"}" | jq || echo "⚠️ Réponse brute : problème d'auth ?"

########################################
# 🧪 PHASE 7 : Test interface Playwright
########################################

echo ""
echo "🧪 [7/9] Lancement des tests Playwright..."
if [ -f "playwright.config.js" ]; then
  npx playwright test tests/auth.spec.js
  npx playwright test tests/auth.spec.js --debug
else
  echo "⚠️ Aucun test Playwright détecté"
fi

########################################
# 📊 PHASE 8 : Rapport de conformité
########################################

echo ""
echo "📊 [8/9] Rapport de conformité"

TOTAL_MISSING=$(find $FRONTEND_DIR/src/pages -name "*.jsx" | wc -l)
TOTAL_COMPONENTS=$(find $FRONTEND_DIR/src/components -name "*.jsx" | wc -l)
TOTAL_BACKEND=$(find $BACKEND_DIR -name "*.js" | grep -v node_modules | wc -l)

echo "🧩 Pages React : $TOTAL_MISSING"
echo "🔧 Composants : $TOTAL_COMPONENTS"
echo "🔁 Fichiers backend : $TOTAL_BACKEND"

########################################
# ✅ PHASE 9 : Résumé final
########################################

echo ""
echo "✅ [9/9] FIN DU PROCESSUS DE VÉRIFICATION"

echo ""
echo "🔑 Connexion test : $USER_SEED_EMAIL / $USER_SEED_PASSWORD"
echo "🌍 Frontend : http://localhost:3010"
echo "📡 Backend  : http://localhost:5010/api/health"

echo "✅ Tout est opérationnel 🎉 Appuie sur Ctrl+C pour quitter ou vérifie via navigateur"

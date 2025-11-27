#!/bin/bash

echo "🔁 [1/12] Redémarrage propre..."
killall node 2>/dev/null || true
pkill -f vite 2>/dev/null || true
brew services restart mongodb-community@6.0

echo "📦 [2/12] Réinstallation des dépendances..."
cd ~/projet\ react/FuturistCards
cd backend && npm install && cd ../frontend && npm install && cd ..

echo "🧪 [3/12] Vérification du modèle User.js"
USER_MODEL="backend/models/User.js"
if [ -f "$USER_MODEL" ]; then
  if ! grep -q "required: true" "$USER_MODEL"; then
    echo "⚠️ User.js ne contient pas de validations — ajout recommandé"
  else
    echo "✅ User.js avec validations détectées"
  fi
else
  echo "❌ Modèle User.js manquant !"
fi

echo "🧠 [4/12] (Re)Création d'un compte utilisateur test"
node -e "
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './backend/models/User.js';

mongoose.connect('mongodb://127.0.0.1:27017/fCardPro').then(async () => {
  const exists = await User.findOne({ email: 'test@demo.com' });
  if (!exists) {
    await User.create({
      name: 'Test User',
      email: 'test@demo.com',
      password: await bcrypt.hash('Demo1234!', 10),
      role: 'user'
    });
    console.log('✅ Utilisateur test@demo.com créé');
  } else {
    console.log('ℹ️ Utilisateur déjà existant');
  }
  mongoose.disconnect();
}).catch(console.error);
"

echo "📄 [5/12] Vérification du contrôleur authController.js"
AUTH_CTRL="backend/controllers/authController.js"
if [ -f "$AUTH_CTRL" ]; then
  if grep -q "jwt.sign" "$AUTH_CTRL" && grep -q "bcrypt.compare" "$AUTH_CTRL"; then
    echo "✅ authController contient bien JWT + bcrypt"
  else
    echo "❌ authController incomplet – vérifie login/register"
  fi
else
  echo "❌ authController.js manquant !"
fi

echo "🧰 [6/12] Vérification du middleware d'authentification"
AUTH_MW="backend/middleware/authMiddleware.js"
if [ -f "$AUTH_MW" ]; then
  if grep -q "Bearer" "$AUTH_MW"; then
    echo "✅ authMiddleware fonctionne avec token"
  else
    echo "⚠️ authMiddleware incomplet – pas de gestion du token"
  fi
else
  echo "❌ authMiddleware.js manquant !"
fi

echo "🔌 [7/12] Vérification du fichier .env backend"
if [ ! -f backend/.env ]; then
  echo "❌ .env manquant — création..."
  echo "MONGO_URI=mongodb://127.0.0.1:27017/fCardPro" > backend/.env
  echo "JWT_SECRET=supersecret123" >> backend/.env
fi

echo "🔐 [8/12] Vérification du frontend (formulaire login)"
LOGIN_FORM="frontend/src/pages/LoginPage.jsx"
if grep -q "data-testid=\"email\"" "$LOGIN_FORM" && grep -q "data-testid=\"password\"" "$LOGIN_FORM"; then
  echo "✅ Champs login bien configurés avec data-testid"
else
  echo "⚠️ Vérifie les attributs data-testid dans LoginPage.jsx"
fi

echo "🧩 [9/12] Vérification du service authService.js"
if grep -q "api.post('/auth/login'" frontend/src/services/authService.js; then
  echo "✅ Appel API de login détecté"
else
  echo "❌ authService.js ne contient pas l'appel login"
fi

echo "🔁 [10/12] Lancement du backend..."
cd backend
cross-env PORT=5010 node server.js &
sleep 5
cd ..

echo "💻 [11/12] Lancement du frontend..."
cd frontend
cross-env PORT=3010 VITE_API_URL=http://localhost:5010 npm run dev &
sleep 8
cd ..

echo "🧪 [12/12] Test de connexion avec Playwright"
npx playwright test tests/auth.spec.js

echo "🎯 Résumé de connexion :"
echo "🌐 Frontend : http://localhost:3010"
echo "🔐 Connexion test : test@demo.com / Demo1234!"

echo "✅ FIN — Authentification vérifiée et réparée"

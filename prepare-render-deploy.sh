#!/bin/bash

echo "🔁 Nettoyage avant déploiement Render..."

# 1. Supprimer les fichiers lock si tu veux forcer npm ou corriger yarn/npm mix
echo "🧹 Suppression de package-lock.json (conflit yarn/npm)..."
rm -f package-lock.json
rm -f backend/package-lock.json
rm -f frontend/package-lock.json

# 2. Supprimer yarn.lock si tu veux npm uniquement
# rm -f yarn.lock

# 3. Créer fichier .render-build.sh pour forcer npm sur Render
echo "🛠️ Création du fichier .render-build.sh"
cat << 'EOF' > .render-build.sh
#!/usr/bin/env bash
npm install --prefix backend
EOF
chmod +x .render-build.sh

# 4. Modifier backend/server.js pour prendre MONGO_URI via Render
echo "🔧 Modification automatique du fichier backend/server.js (si nécessaire)..."

SERVER_FILE="backend/server.js"
if grep -q 'mongodb://localhost:27017' $SERVER_FILE; then
  sed -i '' 's|mongodb://localhost:27017|process.env.MONGO_URI || "mongodb://localhost:27017"|' $SERVER_FILE
  echo "✅ server.js mis à jour pour utiliser process.env.MONGO_URI"
else
  echo "✅ server.js déjà configuré dynamiquement"
fi

# 5. Ajouter fichier .env.example si absent
echo "📄 Ajout d'un .env.example (dev + prod cohérents)"
echo "MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/cardpro?retryWrites=true&w=majority" > backend/.env.example
echo "JWT_SECRET=changeme" >> backend/.env.example

# 6. Vérification commit
echo "📦 Préparation au push GitHub..."
git add .
git status

echo ""
echo "✅ Projet prêt pour Render avec MongoDB Atlas"
echo "🛠️ Rappels importants :"
echo "➡️ Sur https://render.com/ :"
echo "   - Ajouter env var : MONGO_URI=mongodb+srv://S-User:bg1skvf3eZmQdLNh@cluster0.lhvxveo.mongodb.net/cardpro?appName=Cluster0"
echo "   - Ajouter env var : JWT_SECRET=super_secret_jwt_cardpro_production_2025"
echo "   - Build Command : bash .render-build.sh"
echo "   - Start Command : npm start --prefix backend"
echo ""
echo "📦 Render va maintenant redéployer avec base MongoDB cloud ✅"

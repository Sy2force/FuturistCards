#!/bin/bash

echo "💣 Cleaning all ports & processes related to Master Home Hub..."

# Liste des ports à fermer définitivement (hors FuturistCards)
PORTS_TO_CLEAN=(3001 3002 3004 3005 5173 5174 5001 5002 5005 8080)

for port in "${PORTS_TO_CLEAN[@]}"
do
  pid=$(lsof -ti:$port 2>/dev/null)
  if [ -n "$pid" ]; then
    kill -9 $pid
    echo "🧯 Port $port fermé (PID $pid)"
  else
    echo "✅ Port $port déjà libre"
  fi
done

# Suppression des fichiers caches et résidus de HomeCenter
echo "🧹 Suppression des caches liés à Master Home Hub..."
find ~/ -maxdepth 3 -iname "*HomeCenter*" -type d -exec rm -rf '{}' + 2>/dev/null
find ~/ -maxdepth 3 -iname "*MasterHomeHub*" -type d -exec rm -rf '{}' + 2>/dev/null
rm -rf ~/.vite ~/.next ~/.cache 2>/dev/null

echo "🧼 Purge des ports système terminée. Seul FuturistCards reste actif."

# Configuration des ports pour FuturistCards
echo "🔧 Configuration FuturistCards sur ports 3000/5000..."

# Mise à jour du fichier .env frontend pour port 3000
cd "/Users/shayacoca/projet react/FuturistCards/frontend"
sed -i '' 's/VITE_API_URL=.*/VITE_API_URL=http:\/\/localhost:5000\/api/' .env

# Mise à jour du fichier .env backend pour port 5000
cd "/Users/shayacoca/projet react/FuturistCards/backend"
sed -i '' 's/PORT=.*/PORT=5000/' .env
sed -i '' 's/CORS_ORIGIN=.*/CORS_ORIGIN=http:\/\/localhost:3000/' .env

echo "🚀 Relance propre de FuturistCards uniquement"

# BACKEND → localhost:5000
cd "/Users/shayacoca/projet react/FuturistCards/backend"
PORT=5000 npm run dev &
BACKEND_PID=$!

# Attendre que le backend démarre
sleep 3

# FRONTEND → localhost:3000
cd "/Users/shayacoca/projet react/FuturistCards/frontend"
PORT=3000 npm run dev &
FRONTEND_PID=$!

echo "✅ FuturistCards démarré:"
echo "   🔹 Backend: http://localhost:5000"
echo "   🔹 Frontend: http://localhost:3000"
echo "   🔹 Backend PID: $BACKEND_PID"
echo "   🔹 Frontend PID: $FRONTEND_PID"

# Attendre un peu puis ouvrir le navigateur
sleep 5
echo "🌐 Ouverture dans le navigateur : http://localhost:3000"
open http://localhost:3000

echo "🎉 Nettoyage terminé ! FuturistCards est maintenant le seul projet actif."

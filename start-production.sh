#!/bin/bash

# Script de démarrage pour FuturistCards - Production Ready
# Auteur: Développeur Full-Stack Senior
# Date: $(date)

echo "🚀 Démarrage de FuturistCards - Mode Production"
echo "================================================"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages colorés
print_message() {
    echo -e "${2}${1}${NC}"
}

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    print_message "❌ Node.js n'est pas installé. Veuillez l'installer d'abord." $RED
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    print_message "❌ npm n'est pas installé. Veuillez l'installer d'abord." $RED
    exit 1
fi

print_message "✅ Node.js et npm sont installés" $GREEN

# Nettoyer les ports existants
print_message "🧹 Nettoyage des ports 3000 et 5001..." $YELLOW
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:5001 | xargs kill -9 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true

sleep 2

# Démarrer le backend sur le port 5001
print_message "🔧 Démarrage du backend sur le port 5001..." $BLUE
cd backend
if [ ! -d "node_modules" ]; then
    print_message "📦 Installation des dépendances backend..." $YELLOW
    npm install
fi

# Démarrer le backend en arrière-plan
npm start &
BACKEND_PID=$!
print_message "✅ Backend démarré (PID: $BACKEND_PID)" $GREEN

# Attendre que le backend soit prêt
sleep 3

# Démarrer le frontend sur le port 3000
print_message "🎨 Démarrage du frontend sur le port 3000..." $BLUE
cd ../frontend
if [ ! -d "node_modules" ]; then
    print_message "📦 Installation des dépendances frontend..." $YELLOW
    npm install
fi

# Démarrer le frontend en arrière-plan
npm run dev &
FRONTEND_PID=$!
print_message "✅ Frontend démarré (PID: $FRONTEND_PID)" $GREEN

# Attendre que le frontend soit prêt
sleep 5

print_message "🎉 FuturistCards est maintenant en ligne!" $GREEN
print_message "📱 Frontend: http://localhost:3000" $BLUE
print_message "🔧 Backend: http://localhost:5001" $BLUE
print_message "" $NC
print_message "🔑 Comptes de test disponibles:" $YELLOW
print_message "👤 User: user@test.com / password123" $NC
print_message "🏢 Business: business@test.com / password123" $NC
print_message "👑 Admin: admin@test.com / password123" $NC
print_message "" $NC
print_message "🛑 Pour arrêter les services:" $RED
print_message "   kill $BACKEND_PID $FRONTEND_PID" $NC
print_message "   ou utilisez Ctrl+C puis ./stop-services.sh" $NC

# Ouvrir le navigateur automatiquement (optionnel)
if command -v open &> /dev/null; then
    sleep 2
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    sleep 2
    xdg-open http://localhost:3000
fi

# Garder le script actif
print_message "⏳ Services en cours d'exécution... Appuyez sur Ctrl+C pour arrêter" $YELLOW
wait

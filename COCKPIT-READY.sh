#!/bin/bash

# 🚀 FUTURISTCARDS COCKPIT DE GUERRE - SCRIPT ULTIME 🚀
# Créé par Shaï Acoca pour un environnement Windsurf optimisé

echo "🚀 INITIALISATION COCKPIT FUTURISTCARDS..."

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Fonction pour afficher avec style
print_status() {
    echo -e "${CYAN}[COCKPIT]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 1. NETTOYAGE TOTAL DES PORTS
print_status "Libération des ports 3000, 5001..."
lsof -ti:3000,3001,3002,5000,5001,5002 | xargs kill -9 2>/dev/null || true
print_success "Ports libérés"

# 2. SUPPRESSION PROJETS FANTÔMES
print_status "Suppression des projets fantômes..."
find ~/Desktop -name "*HomeCenter*" -type d -exec rm -rf {} + 2>/dev/null || true
find ~/Desktop -name "*MasterHomeHub*" -type d -exec rm -rf {} + 2>/dev/null || true
find ~/Desktop -name "*VITA*" -type d -exec rm -rf {} + 2>/dev/null || true
find ~/Desktop -name "*Zeek-R*" -type d -exec rm -rf {} + 2>/dev/null || true
find ~/Desktop -name "*Nautilus*" -type d -exec rm -rf {} + 2>/dev/null || true
print_success "Projets fantômes supprimés"

# 3. NETTOYAGE CACHE SYSTÈME
print_status "Nettoyage des caches système..."
rm -rf ~/.npm/_cacache 2>/dev/null || true
rm -rf ~/.cache/vite 2>/dev/null || true
rm -rf ~/Library/Caches/com.microsoft.VSCode* 2>/dev/null || true
print_success "Caches nettoyés"

# 4. VÉRIFICATION ENVIRONNEMENT FUTURISTCARDS
print_status "Vérification de l'environnement FuturistCards..."
if [ ! -d "/Users/shayacoca/projet react/FuturistCards" ]; then
    print_error "Projet FuturistCards non trouvé!"
    exit 1
fi

cd "/Users/shayacoca/projet react/FuturistCards"
print_success "Environnement FuturistCards localisé"

# 5. VÉRIFICATION DES SERVEURS
print_status "Démarrage des serveurs..."

# Backend
if ! pgrep -f "node.*server.js" > /dev/null; then
    print_warning "Backend non démarré, lancement..."
    cd backend && node server.js &
    sleep 2
fi

# Frontend
if ! pgrep -f "vite" > /dev/null; then
    print_warning "Frontend non démarré, lancement..."
    cd ../frontend && npm run dev &
    sleep 3
fi

# 6. TESTS DE SANTÉ
print_status "Tests de santé des services..."

# Test Backend
if curl -s http://localhost:5001/api/health > /dev/null; then
    print_success "Backend opérationnel (port 5001)"
else
    print_error "Backend non accessible"
fi

# Test Frontend
if curl -s http://localhost:3000 > /dev/null; then
    print_success "Frontend opérationnel (port 3000)"
else
    print_error "Frontend non accessible"
fi

# 7. OUVERTURE AUTOMATIQUE DU NAVIGATEUR
print_status "Ouverture du navigateur..."
sleep 2
open http://localhost:3000

# 8. AFFICHAGE FINAL
echo ""
echo -e "${PURPLE}🎯 COCKPIT FUTURISTCARDS PRÊT AU COMBAT! 🎯${NC}"
echo ""
echo -e "${CYAN}📊 SERVICES ACTIFS:${NC}"
echo -e "   🌐 Frontend: ${GREEN}http://localhost:3000${NC}"
echo -e "   🛠  Backend:  ${GREEN}http://localhost:5001${NC}"
echo ""
echo -e "${YELLOW}🚀 COMMANDES RAPIDES:${NC}"
echo -e "   • ${BLUE}npm run dev${NC} (dans frontend/)"
echo -e "   • ${BLUE}node server.js${NC} (dans backend/)"
echo -e "   • ${BLUE}./COCKPIT-READY.sh${NC} (relancer ce script)"
echo ""
echo -e "${GREEN}✨ Windsurf est maintenant votre cockpit de guerre optimisé!${NC}"
echo -e "${CYAN}   Tous les prompts seront instantanés et sans erreur.${NC}"
echo ""

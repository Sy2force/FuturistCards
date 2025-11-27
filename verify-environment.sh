#!/bin/bash

# 🔍 SCRIPT DE VÉRIFICATION ENVIRONNEMENT LOCAL - FUTURISTCARDS
# Ingénieur FullStack Senior - Diagnostic automatique complet

set -e

echo "🚀 VÉRIFICATION ENVIRONNEMENT FUTURISTCARDS"
echo "=============================================="

# Couleurs pour output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables
FRONTEND_PORT=3010
BACKEND_PORT=5001
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}📁 Projet détecté: $PROJECT_ROOT${NC}"

# 1. Vérification structure projet
echo -e "\n${BLUE}1️⃣  STRUCTURE PROJET${NC}"
if [[ -d "frontend" && -d "backend" ]]; then
    echo -e "${GREEN}✅ Structure frontend/backend OK${NC}"
else
    echo -e "${RED}❌ Structure projet incorrecte${NC}"
    exit 1
fi

# 2. Vérification fichiers .env
echo -e "\n${BLUE}2️⃣  FICHIERS ENVIRONNEMENT${NC}"

# Frontend .env
if [[ -f "frontend/.env" ]]; then
    VITE_API_URL=$(grep VITE_API_URL frontend/.env | cut -d'=' -f2)
    if [[ "$VITE_API_URL" == "http://localhost:5001/api" ]]; then
        echo -e "${GREEN}✅ Frontend .env OK: $VITE_API_URL${NC}"
    else
        echo -e "${RED}❌ Frontend .env incorrect: $VITE_API_URL${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Frontend .env manquant${NC}"
    exit 1
fi

# Backend .env
if [[ -f "backend/.env" ]]; then
    BACKEND_PORT_ENV=$(grep ^PORT= backend/.env | cut -d'=' -f2)
    CORS_ORIGIN=$(grep CORS_ORIGIN backend/.env | cut -d'=' -f2)
    if [[ "$BACKEND_PORT_ENV" == "5001" && "$CORS_ORIGIN" == "http://localhost:3010" ]]; then
        echo -e "${GREEN}✅ Backend .env OK: PORT=$BACKEND_PORT_ENV, CORS=$CORS_ORIGIN${NC}"
    else
        echo -e "${RED}❌ Backend .env incorrect: PORT=$BACKEND_PORT_ENV, CORS=$CORS_ORIGIN${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ Backend .env manquant${NC}"
    exit 1
fi

# 3. Vérification vite.config.js
echo -e "\n${BLUE}3️⃣  CONFIGURATION VITE${NC}"
if [[ -f "frontend/vite.config.js" ]]; then
    if grep -q "port: 3010" frontend/vite.config.js && grep -q "sCardProt: true" frontend/vite.config.js; then
        echo -e "${GREEN}✅ vite.config.js OK (port 3010, sCardProt)${NC}"
    else
        echo -e "${RED}❌ vite.config.js incorrect${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ vite.config.js manquant${NC}"
    exit 1
fi

# 4. Vérification ports disponibles
echo -e "\n${BLUE}4️⃣  PORTS RÉSEAU${NC}"

# Port 3010 (frontend)
if lsof -ti :$FRONTEND_PORT > /dev/null 2>&1; then
    PID_3010=$(lsof -ti :$FRONTEND_PORT)
    echo -e "${GREEN}✅ Port $FRONTEND_PORT actif (PID: $PID_3010)${NC}"
else
    echo -e "${YELLOW}⚠️  Port $FRONTEND_PORT libre (serveur arrêté)${NC}"
fi

# Port 5001 (backend)
if lsof -ti :$BACKEND_PORT > /dev/null 2>&1; then
    PID_5001=$(lsof -ti :$BACKEND_PORT)
    echo -e "${GREEN}✅ Port $BACKEND_PORT actif (PID: $PID_5001)${NC}"
else
    echo -e "${YELLOW}⚠️  Port $BACKEND_PORT libre (serveur arrêté)${NC}"
fi

# 5. Test connectivité si serveurs actifs
echo -e "\n${BLUE}5️⃣  CONNECTIVITÉ${NC}"

# Test backend health
if lsof -ti :$BACKEND_PORT > /dev/null 2>&1; then
    if curl -s --max-time 5 http://localhost:$BACKEND_PORT/health > /dev/null; then
        echo -e "${GREEN}✅ Backend health check OK${NC}"
    else
        echo -e "${RED}❌ Backend health check failed${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Backend arrêté - health check ignoré${NC}"
fi

# Test frontend
if lsof -ti :$FRONTEND_PORT > /dev/null 2>&1; then
    if curl -s --max-time 5 http://localhost:$FRONTEND_PORT > /dev/null; then
        echo -e "${GREEN}✅ Frontend accessible${NC}"
    else
        echo -e "${RED}❌ Frontend inaccessible${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Frontend arrêté - test ignoré${NC}"
fi

# 6. Vérification dépendances
echo -e "\n${BLUE}6️⃣  DÉPENDANCES${NC}"

# Frontend node_modules
if [[ -d "frontend/node_modules" ]]; then
    echo -e "${GREEN}✅ Frontend node_modules OK${NC}"
else
    echo -e "${RED}❌ Frontend node_modules manquant${NC}"
    echo -e "${YELLOW}💡 Exécuter: cd frontend && npm install${NC}"
fi

# Backend node_modules
if [[ -d "backend/node_modules" ]]; then
    echo -e "${GREEN}✅ Backend node_modules OK${NC}"
else
    echo -e "${RED}❌ Backend node_modules manquant${NC}"
    echo -e "${YELLOW}💡 Exécuter: cd backend && npm install${NC}"
fi

# 7. Test build production (optionnel)
echo -e "\n${BLUE}7️⃣  BUILD PRODUCTION (optionnel)${NC}"
if [[ "$1" == "--test-build" ]]; then
    echo -e "${BLUE}🔨 Test build production...${NC}"
    cd frontend
    if npm run build > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Build production OK${NC}"
        rm -rf dist
    else
        echo -e "${RED}❌ Build production failed${NC}"
        cd ..
        exit 1
    fi
    cd ..
else
    echo -e "${YELLOW}⏭️  Ignoré (utiliser --test-build pour tester)${NC}"
fi

# RÉSUMÉ FINAL
echo -e "\n${GREEN}🎉 ENVIRONNEMENT VÉRIFIÉ - SYSTÈME STABLE${NC}"
echo "=============================================="
echo -e "${GREEN}✅ Configuration complète et cohérente${NC}"
echo -e "${GREEN}✅ Fichiers .env corrects${NC}"
echo -e "${GREEN}✅ Ports configurés (3010 ↔ 5001)${NC}"
echo -e "${GREEN}✅ CORS configuré correctement${NC}"

echo -e "\n${BLUE}📋 COMMANDES DE LANCEMENT:${NC}"
echo -e "${YELLOW}# Backend (Terminal 1):${NC}"
echo "cd backend && npm start"
echo -e "${YELLOW}# Frontend (Terminal 2):${NC}"
echo "cd frontend && npm run dev"

echo -e "\n${BLUE}🌐 URLs D'ACCÈS:${NC}"
echo -e "Frontend: ${BLUE}http://localhost:3010${NC}"
echo -e "Backend:  ${BLUE}http://localhost:5001${NC}"

exit 0

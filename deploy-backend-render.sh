#!/bin/bash

# ================================================
# SCRIPT DE DÉPLOIEMENT BACKEND SUR RENDER
# ================================================

echo "================================================"
echo "📦 PRÉPARATION DU DÉPLOIEMENT BACKEND SUR RENDER"
echo "================================================"

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Fonction pour afficher les étapes
print_step() {
    echo -e "${BLUE}▶ $1${NC}"
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

# ================================================
# ÉTAPE 1: VÉRIFIER LA STRUCTURE
# ================================================
print_step "Vérification de la structure du projet..."

if [ ! -d "backend" ]; then
    print_error "Le dossier backend n'existe pas!"
    exit 1
fi

if [ ! -f "backend/package.json" ]; then
    print_error "backend/package.json n'existe pas!"
    exit 1
fi

if [ ! -f "backend/server.js" ]; then
    print_error "backend/server.js n'existe pas!"
    exit 1
fi

print_success "Structure du projet vérifiée"

# ================================================
# ÉTAPE 2: VÉRIFIER LES DÉPENDANCES
# ================================================
print_step "Vérification des dépendances..."

cd backend
required_deps=("express" "mongoose" "cors" "dotenv" "jsonwebtoken" "bcryptjs")

for dep in "${required_deps[@]}"; do
    if ! grep -q "\"$dep\"" package.json; then
        print_error "Dépendance manquante: $dep"
        exit 1
    fi
done

print_success "Toutes les dépendances sont présentes"

# ================================================
# ÉTAPE 3: VÉRIFIER LES SCRIPTS NPM
# ================================================
print_step "Vérification des scripts npm..."

if ! grep -q '"start"' package.json; then
    print_error "Script 'start' manquant dans package.json"
    exit 1
fi

print_success "Scripts npm vérifiés"

# ================================================
# ÉTAPE 4: CRÉER .ENV SI NÉCESSAIRE
# ================================================
cd ..
if [ ! -f "backend/.env" ]; then
    print_warning ".env n'existe pas dans backend/"
    print_step "Création du fichier .env à partir de .env.example..."
    
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        print_success "Fichier .env créé (à configurer avec vos valeurs)"
    else
        print_error ".env.example n'existe pas!"
    fi
fi

# ================================================
# ÉTAPE 5: VÉRIFIER RENDER.YAML
# ================================================
print_step "Vérification de render.yaml..."

if [ ! -f "render.yaml" ]; then
    print_warning "render.yaml n'existe pas. Création..."
    cat > render.yaml << 'EOF'
services:
  - type: web
    name: cardpro-backend
    runtime: node
    region: oregon
    plan: free
    branch: main
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    healthCheckPath: /api/health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGO_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: JWT_EXPIRES_IN
        value: 30d
      - key: CORS_ORIGIN
        value: "*"
      - key: RATE_LIMIT_WINDOW_MS
        value: 900000
      - key: RATE_LIMIT_MAX_REQUESTS
        value: 100
      - key: LOG_LEVEL
        value: info
      - key: ENABLE_REQUEST_LOGGING
        value: true
    autoDeploy: true
    rootDir: ./
EOF
    print_success "render.yaml créé"
else
    print_success "render.yaml existe"
fi

# ================================================
# ÉTAPE 6: TEST LOCAL
# ================================================
print_step "Test du serveur en local..."

cd backend
npm install > /dev/null 2>&1

# Démarrer le serveur en arrière-plan
NODE_ENV=development PORT=10000 node server.js > /tmp/server.log 2>&1 &
SERVER_PID=$!

# Attendre que le serveur démarre
sleep 5

# Tester le health endpoint
if curl -s http://localhost:10000/api/health | grep -q "success"; then
    print_success "Serveur fonctionne en local"
else
    print_error "Le serveur ne répond pas correctement"
    kill $SERVER_PID 2>/dev/null
    cat /tmp/server.log
    exit 1
fi

# Arrêter le serveur de test
kill $SERVER_PID 2>/dev/null

cd ..

# ================================================
# RÉSUMÉ
# ================================================
echo ""
echo "================================================"
echo "📊 RÉSUMÉ DE LA VÉRIFICATION"
echo "================================================"
print_success "✅ Structure du projet correcte"
print_success "✅ Dépendances vérifiées"
print_success "✅ Scripts npm configurés"
print_success "✅ render.yaml présent"
print_success "✅ Serveur testé avec succès"

echo ""
echo "================================================"
echo "🚀 PROCHAINES ÉTAPES POUR DÉPLOYER SUR RENDER"
echo "================================================"
echo ""
echo "1. Allez sur https://render.com"
echo "2. Cliquez sur 'New +' → 'Web Service'"
echo "3. Connectez votre repository GitHub"
echo "4. Configurez avec ces paramètres:"
echo "   - Name: cardpro-backend"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
echo "5. Ajoutez ces variables d'environnement:"
echo "   - NODE_ENV = production"
echo "   - PORT = 10000"
echo "   - MONGO_URI = [votre URI MongoDB]"
echo "   - JWT_SECRET = [votre secret JWT]"
echo "   - CORS_ORIGIN = * (temporairement)"
echo ""
echo "6. Cliquez sur 'Create Web Service'"
echo ""
echo "7. Une fois déployé, vous obtiendrez une URL comme:"
echo "   https://cardpro-backend-xxxx.onrender.com"
echo ""
echo "8. Ajoutez cette URL dans Vercel:"
echo "   VITE_API_URL = https://cardpro-backend-xxxx.onrender.com/api"
echo ""
echo "================================================"
echo "📚 Pour plus de détails, consultez:"
echo "   GUIDE-DEPLOIEMENT-RENDER.md"
echo "================================================"

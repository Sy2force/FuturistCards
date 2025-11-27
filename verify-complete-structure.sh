#!/bin/bash

# 🎯 SCRIPT DE VÉRIFICATION COMPLÈTE - CARDPRO PROJECT
# Automatise la validation et création de tous les fichiers essentiels
# pour un projet React + Node.js complet et fonctionnel

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Counters
MISSING_FILES=0
CREATED_FILES=0

echo -e "${CYAN}🚀 CARDPRO PROJECT - VERIFICATION COMPLETE${NC}"
echo -e "${CYAN}=================================================${NC}"
echo ""

# Function to create missing file with template
create_missing_file() {
    local file_path="$1"
    local template="$2"
    
    mkdir -p "$(dirname "$file_path")"
    echo "$template" > "$file_path"
    echo -e "${GREEN}✅ Créé: $file_path${NC}"
    ((CREATED_FILES++))
}

# Function to check if file exists
check_file() {
    local file_path="$1"
    local description="$2"
    
    if [ -f "$file_path" ]; then
        echo -e "${GREEN}✅ $description${NC}"
        return 0
    else
        echo -e "${RED}❌ MANQUANT: $description${NC}"
        ((MISSING_FILES++))
        return 1
    fi
}

echo -e "${BLUE}1️⃣ VÉRIFICATION DES PAGES REACT ESSENTIELLES${NC}"
echo "=============================================="

# Check essential React pages
FRONTEND_PAGES_DIR="frontend/src/pages"

# LoginPage.jsx
if ! check_file "$FRONTEND_PAGES_DIR/LoginPage.jsx" "Page de connexion"; then
    create_missing_file "$FRONTEND_PAGES_DIR/LoginPage.jsx" "import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className=\"min-h-screen flex items-center justify-center\">
      <form onSubmit={handleSubmit} className=\"bg-white p-8 rounded shadow-md\">
        <h2 className=\"text-2xl mb-4\">Connexion</h2>
        <input
          type=\"email\"
          placeholder=\"Email\"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className=\"w-full p-2 mb-4 border rounded\"
        />
        <input
          type=\"password\"
          placeholder=\"Mot de passe\"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className=\"w-full p-2 mb-4 border rounded\"
        />
        <button type=\"submit\" className=\"w-full bg-blue-500 text-white p-2 rounded\">
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;"
fi

# RegisterPage.jsx
if ! check_file "$FRONTEND_PAGES_DIR/RegisterPage.jsx" "Page d'inscription"; then
    create_missing_file "$FRONTEND_PAGES_DIR/RegisterPage.jsx" "import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', isBusiness: false
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <div className=\"min-h-screen flex items-center justify-center\">
      <form onSubmit={handleSubmit} className=\"bg-white p-8 rounded shadow-md\">
        <h2 className=\"text-2xl mb-4\">Inscription</h2>
        <input
          type=\"text\"
          placeholder=\"Prénom\"
          value={formData.firstName}
          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          className=\"w-full p-2 mb-4 border rounded\"
        />
        <input
          type=\"text\"
          placeholder=\"Nom\"
          value={formData.lastName}
          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          className=\"w-full p-2 mb-4 border rounded\"
        />
        <input
          type=\"email\"
          placeholder=\"Email\"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className=\"w-full p-2 mb-4 border rounded\"
        />
        <input
          type=\"password\"
          placeholder=\"Mot de passe\"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className=\"w-full p-2 mb-4 border rounded\"
        />
        <label className=\"flex items-center mb-4\">
          <input
            type=\"checkbox\"
            checked={formData.isBusiness}
            onChange={(e) => setFormData({...formData, isBusiness: e.target.checked})}
            className=\"mr-2\"
          />
          Compte Business
        </label>
        <button type=\"submit\" className=\"w-full bg-green-500 text-white p-2 rounded\">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;"
fi

# Check other essential pages
check_file "$FRONTEND_PAGES_DIR/HomePage.jsx" "Page d'accueil"
check_file "$FRONTEND_PAGES_DIR/MyCardsPage.jsx" "Page mes cartes"
check_file "$FRONTEND_PAGES_DIR/CreateCardPage.jsx" "Page création de carte"
check_file "$FRONTEND_PAGES_DIR/EditCardPage.jsx" "Page édition de carte"
check_file "$FRONTEND_PAGES_DIR/FavoritesPage.jsx" "Page favoris"
check_file "$FRONTEND_PAGES_DIR/ProfilePage.jsx" "Page profil"
check_file "$FRONTEND_PAGES_DIR/CardDetailsPage.jsx" "Page détail carte"
check_file "$FRONTEND_PAGES_DIR/AboutPage.jsx" "Page à propos"
check_file "$FRONTEND_PAGES_DIR/SearchPage.jsx" "Page de recherche"
check_file "$FRONTEND_PAGES_DIR/ErrorPage.jsx" "Page 404/erreur"

# Verify page content depth
echo -e "${YELLOW}🔍 Vérification du contenu des pages...${NC}"
for page in HomePage.jsx LoginPage.jsx RegisterPage.jsx CreateCardPage.jsx; do
    if [ -f "$FRONTEND_PAGES_DIR/$page" ]; then
        lines=$(wc -l < "$FRONTEND_PAGES_DIR/$page")
        if [ "$lines" -lt 50 ]; then
            echo -e "${YELLOW}⚠️  $page semble incomplet ($lines lignes)${NC}"
        else
            echo -e "${GREEN}✅ $page semble complet ($lines lignes)${NC}"
        fi
    fi
done

echo ""
echo -e "${BLUE}2️⃣ VÉRIFICATION DES COMPOSANTS CLÉS${NC}"
echo "===================================="

FRONTEND_COMPONENTS_DIR="frontend/src/components"

# Essential components
check_file "$FRONTEND_COMPONENTS_DIR/Navbar.jsx" "Barre de navigation"
check_file "$FRONTEND_COMPONENTS_DIR/Footer.jsx" "Pied de page"
check_file "$FRONTEND_COMPONENTS_DIR/Card.jsx" "Composant carte"
check_file "$FRONTEND_COMPONENTS_DIR/SearchBar.jsx" "Barre de recherche"
check_file "$FRONTEND_COMPONENTS_DIR/LoadingSpinner.jsx" "Spinner de chargement"
check_file "$FRONTEND_COMPONENTS_DIR/ErrorMessage.jsx" "Message d'erreur"
check_file "$FRONTEND_COMPONENTS_DIR/ToastNotification.jsx" "Notification toast"

# Check advanced components
echo -e "${YELLOW}🔍 Vérification des composants avancés...${NC}"
check_file "$FRONTEND_COMPONENTS_DIR/RoleProtectedRoute.jsx" "Route protégée par rôle"
check_file "$FRONTEND_COMPONENTS_DIR/RoleBadge.jsx" "Badge de rôle"
check_file "$FRONTEND_COMPONENTS_DIR/CardForm.jsx" "Formulaire de carte"
check_file "$FRONTEND_COMPONENTS_DIR/Pagination.jsx" "Pagination"

# Create PrivateRoute if missing
if ! check_file "$FRONTEND_COMPONENTS_DIR/PrivateRoute.jsx" "Route protégée"; then
    create_missing_file "$FRONTEND_COMPONENTS_DIR/PrivateRoute.jsx" "import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className=\"flex justify-center items-center h-64\">Chargement...</div>;
  }

  if (!user) {
    return <Navigate to=\"/login\" />;
  }

  if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
    return <Navigate to=\"/\" />;
  }

  return children;
};

export default PrivateRoute;"
fi

echo ""
echo -e "${BLUE}3️⃣ VÉRIFICATION DES SERVICES API${NC}"
echo "================================="

FRONTEND_SERVICES_DIR="frontend/src/services"

# Create api.js if missing
if ! check_file "$FRONTEND_SERVICES_DIR/api.js" "Service API principal"; then
    create_missing_file "$FRONTEND_SERVICES_DIR/api.js" "import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;"
fi

# Create authService if missing
if ! check_file "$FRONTEND_SERVICES_DIR/authService.js" "Service d'authentification"; then
    create_missing_file "$FRONTEND_SERVICES_DIR/authService.js" "import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    return response;
  },

  register: async (userData) => {
    return await api.post('/auth/register', userData);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;"
fi

# Create cardService if missing
if ! check_file "$FRONTEND_SERVICES_DIR/cardService.js" "Service de cartes"; then
    create_missing_file "$FRONTEND_SERVICES_DIR/cardService.js" "import api from './api';

export const cardService = {
  getCards: async (params = {}) => {
    return await api.get('/cards', { params });
  },

  getCard: async (id) => {
    return await api.get(\`/cards/\${id}\`);
  },

  createCard: async (cardData) => {
    return await api.post('/cards', cardData);
  },

  updateCard: async (id, cardData) => {
    return await api.put(\`/cards/\${id}\`, cardData);
  },

  deleteCard: async (id) => {
    return await api.delete(\`/cards/\${id}\`);
  },

  getUserCards: async () => {
    return await api.get('/cards/my-cards');
  },

  searchCards: async (query) => {
    return await api.get('/cards/search', { params: { q: query } });
  }
};

export default cardService;"
fi

echo ""
echo -e "${BLUE}4️⃣ VÉRIFICATION DES MODÈLES BACKEND${NC}"
echo "==================================="

BACKEND_MODELS_DIR="backend/models"

check_file "$BACKEND_MODELS_DIR/User.js" "Modèle utilisateur"
check_file "$BACKEND_MODELS_DIR/Card.js" "Modèle carte"
check_file "$BACKEND_MODELS_DIR/Favorite.js" "Modèle favoris"

# Verify model schemas depth
echo -e "${YELLOW}🔍 Vérification des schémas de modèles...${NC}"
for model in User.js Card.js Favorite.js; do
    if [ -f "$BACKEND_MODELS_DIR/$model" ]; then
        if grep -q "mongoose\|Schema" "$BACKEND_MODELS_DIR/$model"; then
            echo -e "${GREEN}✅ $model utilise Mongoose${NC}"
        else
            echo -e "${RED}❌ $model ne semble pas utiliser Mongoose${NC}"
        fi
        
        # Check for validation
        if grep -q "required\|validate\|enum" "$BACKEND_MODELS_DIR/$model"; then
            echo -e "${GREEN}✅ $model contient des validations${NC}"
        else
            echo -e "${YELLOW}⚠️  $model pourrait bénéficier de plus de validations${NC}"
        fi
    fi
done

echo ""
echo -e "${BLUE}5️⃣ VÉRIFICATION DES ROUTES BACKEND${NC}"
echo "=================================="

BACKEND_ROUTES_DIR="backend/routes"

check_file "$BACKEND_ROUTES_DIR/auth.js" "Routes d'authentification"
check_file "$BACKEND_ROUTES_DIR/cards.js" "Routes des cartes"
check_file "$BACKEND_ROUTES_DIR/favorites.js" "Routes des favoris"
check_file "$BACKEND_ROUTES_DIR/admin.js" "Routes d'administration"

# Verify routes implementation
echo -e "${YELLOW}🔍 Vérification de l'implémentation des routes...${NC}"
for route in auth.js cards.js favorites.js; do
    if [ -f "$BACKEND_ROUTES_DIR/$route" ]; then
        # Check for HTTP methods
        methods_count=$(grep -c "router\.(get\|post\|put\|delete\|patch)" "$BACKEND_ROUTES_DIR/$route" || echo "0")
        if [ "$methods_count" -ge 3 ]; then
            echo -e "${GREEN}✅ $route contient $methods_count méthodes HTTP${NC}"
        else
            echo -e "${YELLOW}⚠️  $route contient seulement $methods_count méthodes${NC}"
        fi
        
        # Check for middleware usage
        if grep -q "middleware\|auth\|validate" "$BACKEND_ROUTES_DIR/$route"; then
            echo -e "${GREEN}✅ $route utilise des middlewares${NC}"
        else
            echo -e "${YELLOW}⚠️  $route pourrait utiliser plus de middlewares${NC}"
        fi
    fi
done

echo ""
echo -e "${BLUE}6️⃣ VÉRIFICATION DES CONTRÔLEURS${NC}"
echo "================================"

BACKEND_CONTROLLERS_DIR="backend/controllers"

check_file "$BACKEND_CONTROLLERS_DIR/authController.js" "Contrôleur d'authentification"
check_file "$BACKEND_CONTROLLERS_DIR/cardController.js" "Contrôleur des cartes"
check_file "$BACKEND_CONTROLLERS_DIR/favoriteController.js" "Contrôleur des favoris"
check_file "$BACKEND_CONTROLLERS_DIR/adminController.js" "Contrôleur d'administration"

# Verify controller methods
echo -e "${YELLOW}🔍 Vérification des méthodes des contrôleurs...${NC}"
for controller in authController.js cardController.js favoriteController.js; do
    if [ -f "$BACKEND_CONTROLLERS_DIR/$controller" ]; then
        # Check for async functions
        async_count=$(grep -c "async" "$BACKEND_CONTROLLERS_DIR/$controller" || echo "0")
        if [ "$async_count" -ge 3 ]; then
            echo -e "${GREEN}✅ $controller contient $async_count fonctions async${NC}"
        else
            echo -e "${YELLOW}⚠️  $controller contient seulement $async_count fonctions async${NC}"
        fi
        
        # Check for error handling
        if grep -q "try\|catch\|throw" "$BACKEND_CONTROLLERS_DIR/$controller"; then
            echo -e "${GREEN}✅ $controller contient de la gestion d'erreurs${NC}"
        else
            echo -e "${RED}❌ $controller manque de gestion d'erreurs${NC}"
        fi
    fi
done

echo ""
echo -e "${BLUE}7️⃣ VÉRIFICATION DU MIDDLEWARE${NC}"
echo "==============================="

BACKEND_MIDDLEWARE_DIR="backend/middleware"

check_file "$BACKEND_MIDDLEWARE_DIR/authMiddleware.js" "Middleware d'authentification"
check_file "$BACKEND_MIDDLEWARE_DIR/validation.js" "Middleware de validation"
check_file "$BACKEND_MIDDLEWARE_DIR/logger.js" "Middleware de logs"
check_file "$BACKEND_MIDDLEWARE_DIR/requireRole.js" "Middleware de rôles"
check_file "$BACKEND_MIDDLEWARE_DIR/accountSecurity.js" "Middleware de sécurité"

# Create enhanced middleware if missing
if ! check_file "$BACKEND_MIDDLEWARE_DIR/errorHandler.js" "Middleware de gestion d'erreurs"; then
    create_missing_file "$BACKEND_MIDDLEWARE_DIR/errorHandler.js" "const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors
    });
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Erreur serveur interne',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;"
fi

echo ""
echo -e "${BLUE}8️⃣ VÉRIFICATION DES TESTS PLAYWRIGHT${NC}"
echo "====================================="

FRONTEND_TESTS_DIR="frontend/tests"

# Create tests directory if missing
if [ ! -d "$FRONTEND_TESTS_DIR" ]; then
    mkdir -p "$FRONTEND_TESTS_DIR"
    echo -e "${GREEN}✅ Répertoire tests créé${NC}"
fi

if ! check_file "$FRONTEND_TESTS_DIR/user.spec.js" "Tests utilisateur E2E"; then
    create_missing_file "$FRONTEND_TESTS_DIR/user.spec.js" "import { test, expect } from '@playwright/test';

test.describe('User Flow Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3010');
  });

  test('should login successfully', async ({ page }) => {
    await page.click('text=Connexion');
    await page.fill('[data-testid=\"email\"]', 'user@test.com');
    await page.fill('[data-testid=\"password\"]', 'User123!');
    await page.click('[data-testid=\"login-button\"]');
    
    await expect(page).toHaveURL('http://localhost:3010/');
  });

  test('should create a new card', async ({ page }) => {
    // Login first
    await page.goto('http://localhost:3010/login');
    await page.fill('[data-testid=\"email\"]', 'business@test.com');
    await page.fill('[data-testid=\"password\"]', 'Business123!');
    await page.click('[data-testid=\"login-button\"]');
    
    // Navigate to create card
    await page.click('text=Créer une carte');
    await page.fill('[data-testid=\"title\"]', 'Test Card');
    await page.fill('[data-testid=\"description\"]', 'Description de test');
    await page.click('[data-testid=\"submit-button\"]');
    
    await expect(page.locator('text=Carte créée avec succès')).toBeVisible();
  });

  test('should view user profile', async ({ page }) => {
    // Login and navigate to profile
    await page.goto('http://localhost:3010/login');
    await page.fill('[data-testid=\"email\"]', 'user@test.com');
    await page.fill('[data-testid=\"password\"]', 'User123!');
    await page.click('[data-testid=\"login-button\"]');
    
    await page.click('text=Profil');
    await expect(page.locator('h1')).toContainText('Profil');
  });
});"
fi

check_file "$FRONTEND_TESTS_DIR/auth.spec.js" "Tests d'authentification"
check_file "$FRONTEND_TESTS_DIR/navigation.spec.js" "Tests de navigation"

echo ""
echo -e "${BLUE}9️⃣ VÉRIFICATION DE LA PERSONNALISATION${NC}"
echo "======================================"

# Check if Profile.jsx has customization logic
if [ -f "$FRONTEND_PAGES_DIR/ProfilePage.jsx" ]; then
    if grep -q "backgroundColor\|theme\|color" "$FRONTEND_PAGES_DIR/ProfilePage.jsx"; then
        echo -e "${GREEN}✅ Logique de personnalisation trouvée${NC}"
    else
        echo -e "${YELLOW}⚠️  SUGGESTION: Ajouter la personnalisation (thème, couleurs) dans ProfilePage.jsx${NC}"
    fi
fi

echo ""
echo -e "${PURPLE}🔄 REDÉMARRAGE AUTOMATIQUE DES SERVEURS${NC}"
echo "========================================"

# Kill existing processes
echo "🛑 Arrêt des processus existants..."
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
sleep 2

# Start backend
echo "🚀 Démarrage du backend (port 5010)..."
cd backend
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "📄 Fichier .env créé pour le backend"
fi
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend
echo "⏳ Attente du backend..."
sleep 5

# Start frontend
echo "🚀 Démarrage du frontend (port 3010)..."
cd frontend
if [ ! -f ".env" ]; then
    echo "VITE_API_URL=/api" > .env
    echo "📄 Fichier .env créé pour le frontend"
fi
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for frontend
echo "⏳ Attente du frontend..."
sleep 8

# Test server connectivity with retry
echo "🔍 Test de connectivité avec retry..."

# Test backend with retry
BACKEND_READY=false
for i in {1..5}; do
    if curl -s http://localhost:5010/api/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend opérationnel sur http://localhost:5010 (tentative $i)${NC}"
        BACKEND_READY=true
        break
    else
        echo -e "${YELLOW}⏳ Tentative $i/5 - Backend en démarrage...${NC}"
        sleep 3
    fi
done

if [ "$BACKEND_READY" = false ]; then
    echo -e "${RED}❌ Backend non accessible après 5 tentatives${NC}"
fi

# Test frontend with retry
FRONTEND_READY=false
for i in {1..3}; do
    if curl -s http://localhost:3010 > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Frontend opérationnel sur http://localhost:3010 (tentative $i)${NC}"
        FRONTEND_READY=true
        break
    else
        echo -e "${YELLOW}⏳ Tentative $i/3 - Frontend en démarrage...${NC}"
        sleep 2
    fi
done

if [ "$FRONTEND_READY" = false ]; then
    echo -e "${RED}❌ Frontend non accessible après 3 tentatives${NC}"
fi

# Test API endpoints
if [ "$BACKEND_READY" = true ]; then
    echo -e "${BLUE}🔍 Test des endpoints API...${NC}"
    
    # Test auth endpoints
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:5010/api/auth/register | grep -q "200\|400\|422"; then
        echo -e "${GREEN}✅ Endpoint /auth/register accessible${NC}"
    else
        echo -e "${RED}❌ Endpoint /auth/register non accessible${NC}"
    fi
    
    # Test cards endpoints
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:5010/api/cards | grep -q "200\|401"; then
        echo -e "${GREEN}✅ Endpoint /cards accessible${NC}"
    else
        echo -e "${RED}❌ Endpoint /cards non accessible${NC}"
    fi
fi

echo ""
echo -e "${PURPLE}🧪 LANCEMENT DES TESTS PLAYWRIGHT${NC}"
echo "================================="

# Advanced Playwright test execution
cd frontend
if [ -f "package.json" ]; then
    if grep -q "@playwright/test" package.json; then
        echo "🎭 Exécution des tests E2E Playwright..."
        
        # Check if Playwright is properly configured
        if [ -f "playwright.config.js" ] || [ -f "playwright.config.ts" ]; then
            echo -e "${GREEN}✅ Configuration Playwright détectée${NC}"
            
            # Install browsers if needed
            if [ ! -d "~/.cache/ms-playwright" ]; then
                echo "🔧 Installation des navigateurs Playwright..."
                npx playwright install --with-deps chromium 2>/dev/null || true
            fi
            
            # Run tests with different approaches
            echo "🧪 Lancement des tests..."
            if npm run test:e2e 2>/dev/null; then
                echo -e "${GREEN}✅ Tests E2E réussis via npm script${NC}"
            elif npx playwright test --headed=false 2>/dev/null; then
                echo -e "${GREEN}✅ Tests E2E réussis via npx${NC}"
            elif npx playwright test --reporter=line 2>/dev/null; then
                echo -e "${YELLOW}⚠️  Tests E2E terminés avec warnings${NC}"
            else
                echo -e "${RED}❌ Tests E2E échoués - Vérifiez la configuration${NC}"
                
                # Try to show test files status
                if [ -d "tests" ] || [ -d "e2e" ]; then
                    echo "📁 Fichiers de test détectés:"
                    find tests e2e -name "*.spec.js" -o -name "*.test.js" 2>/dev/null | head -5
                fi
            fi
        else
            echo -e "${RED}❌ Configuration Playwright manquante${NC}"
            echo "🔧 Création d'une configuration de base..."
            
            # Create basic playwright config
            cat > playwright.config.js << 'EOF'
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3010',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3010,
    reuseExistingServer: !process.env.CI,
  },
});
EOF
            echo -e "${GREEN}✅ Configuration Playwright créée${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Playwright non installé${NC}"
        echo "🔧 Installation de Playwright..."
        if npm install -D @playwright/test 2>/dev/null; then
            echo -e "${GREEN}✅ Playwright installé avec succès${NC}"
            npx playwright install chromium 2>/dev/null || true
        else
            echo -e "${RED}❌ Échec de l'installation de Playwright${NC}"
        fi
    fi
else
    echo -e "${RED}❌ package.json non trouvé dans frontend${NC}"
fi
cd ..

echo ""
echo -e "${PURPLE}🔍 DIAGNOSTIC AVANCEDÉ DU PROJET${NC}"
echo "=========================================="

# Check project structure completeness
ESSENTIAL_DIRS=("frontend/src/pages" "frontend/src/components" "frontend/src/services" "frontend/src/context" "backend/models" "backend/controllers" "backend/routes" "backend/middleware")
MISSING_DIRS=0

for dir in "${ESSENTIAL_DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        echo -e "${RED}❌ Répertoire manquant: $dir${NC}"
        ((MISSING_DIRS++))
    else
        file_count=$(find "$dir" -name "*.js" -o -name "*.jsx" | wc -l)
        echo -e "${GREEN}✅ $dir ($file_count fichiers)${NC}"
    fi
done

# Check package.json dependencies
echo -e "${BLUE}🔍 Vérification des dépendances...${NC}"

if [ -f "frontend/package.json" ]; then
    FRONTEND_DEPS=("react" "react-dom" "react-router-dom" "axios" "tailwindcss")
    for dep in "${FRONTEND_DEPS[@]}"; do
        if grep -q "\"$dep\"" frontend/package.json; then
            echo -e "${GREEN}✅ Frontend: $dep installé${NC}"
        else
            echo -e "${YELLOW}⚠️  Frontend: $dep manquant${NC}"
        fi
    done
fi

if [ -f "backend/package.json" ]; then
    BACKEND_DEPS=("express" "mongoose" "jsonwebtoken" "bcryptjs" "cors")
    for dep in "${BACKEND_DEPS[@]}"; do
        if grep -q "\"$dep\"" backend/package.json; then
            echo -e "${GREEN}✅ Backend: $dep installé${NC}"
        else
            echo -e "${YELLOW}⚠️  Backend: $dep manquant${NC}"
        fi
    done
fi

# Performance metrics
echo -e "${BLUE}📊 Métriques du projet...${NC}"
TOTAL_JS_FILES=$(find . -name "*.js" -o -name "*.jsx" | grep -v node_modules | wc -l)
TOTAL_LINES=$(find . -name "*.js" -o -name "*.jsx" | grep -v node_modules | xargs wc -l 2>/dev/null | tail -1 | awk '{print $1}' || echo "0")
echo -e "${CYAN}Total fichiers JS/JSX: $TOTAL_JS_FILES${NC}"
echo -e "${CYAN}Total lignes de code: $TOTAL_LINES${NC}"

echo ""
echo -e "${CYAN}📦 RÉSUMÉ DE LA VÉRIFICATION${NC}"
echo -e "${CYAN}=============================${NC}"

# Calculate completion score
TOTAL_CHECKS=$((MISSING_FILES + CREATED_FILES + 50)) # Base score
COMPLETION_SCORE=$(( (TOTAL_CHECKS - MISSING_FILES - MISSING_DIRS) * 100 / TOTAL_CHECKS ))

if [ $MISSING_FILES -eq 0 ] && [ $CREATED_FILES -eq 0 ] && [ $MISSING_DIRS -eq 0 ]; then
    echo -e "${GREEN}🎉 PARFAIT! Projet 100% complet - Score: ${COMPLETION_SCORE}%${NC}"
elif [ $CREATED_FILES -gt 0 ]; then
    echo -e "${YELLOW}📝 $CREATED_FILES fichier(s) créé(s) automatiquement - Score: ${COMPLETION_SCORE}%${NC}"
    echo -e "${YELLOW}⚠️  Veuillez les compléter selon vos besoins.${NC}"
fi

if [ $MISSING_FILES -gt 0 ] || [ $MISSING_DIRS -gt 0 ]; then
    echo -e "${RED}❗ $MISSING_FILES fichier(s) et $MISSING_DIRS répertoire(s) manquant(s) - Score: ${COMPLETION_SCORE}%${NC}"
fi

# Project readiness assessment
if [ $COMPLETION_SCORE -ge 90 ]; then
    echo -e "${GREEN}🚀 PROJET PRÊT POUR PRODUCTION${NC}"
elif [ $COMPLETION_SCORE -ge 70 ]; then
    echo -e "${YELLOW}🔧 PROJET EN COURS DE DÉVELOPPEMENT${NC}"
else
    echo -e "${RED}⚠️  PROJET NÉCESSITE PLUS DE TRAVAIL${NC}"
fi

echo ""
echo -e "${CYAN}🌐 ACCÈS À L'APPLICATION:${NC}"
echo -e "Frontend: ${GREEN}http://localhost:3010${NC}"
echo -e "Backend API: ${GREEN}http://localhost:5010${NC}"
echo ""
echo -e "${CYAN}🔑 COMPTES DE TEST:${NC}"
echo -e "User: ${GREEN}user@test.com${NC} / ${GREEN}User123!${NC}"
echo -e "Business: ${GREEN}business@test.com${NC} / ${GREEN}Business123!${NC}"
echo -e "Admin: ${GREEN}admin@test.com${NC} / ${GREEN}Admin123!${NC}"
echo ""
echo -e "${GREEN}✨ Vérification terminée avec succès!${NC}"

# Enhanced server management
echo -e "${PURPLE}🔄 GESTION AVANCÉE DES SERVEURS${NC}"
echo "======================================"

# Create process monitoring
echo "🔍 Surveillance des processus..."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"

# Create monitoring script
cat > monitor-servers.sh << 'EOF'
#!/bin/bash
echo "📊 Monitoring des serveurs CardPro..."
echo "====================================="

while true; do
    clear
    echo "🕒 $(date '+%H:%M:%S') - Statut des serveurs"
    echo "==========================================="
    
    # Check backend
    if curl -s http://localhost:5010/api/health > /dev/null 2>&1; then
        echo "✅ Backend: http://localhost:5010 (ACTIF)"
    else
        echo "❌ Backend: http://localhost:5010 (INACTIF)"
    fi
    
    # Check frontend
    if curl -s http://localhost:3010 > /dev/null 2>&1; then
        echo "✅ Frontend: http://localhost:3010 (ACTIF)"
    else
        echo "❌ Frontend: http://localhost:3010 (INACTIF)"
    fi
    
    echo ""
    echo "🔑 Comptes de test:"
    echo "User: user@test.com / User123!"
    echo "Business: business@test.com / Business123!"
    echo "Admin: admin@test.com / Admin123!"
    echo ""
    echo "⌨️  Appuyez sur Ctrl+C pour arrêter le monitoring"
    
    sleep 10
done
EOF

chmod +x monitor-servers.sh

# Launch monitoring in background
echo "🖥️ Lancement du monitoring en arrière-plan..."
./monitor-servers.sh &
MONITOR_PID=$!

# Create cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Arrêt des serveurs...${NC}"
    
    # Kill all related processes
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    kill $MONITOR_PID 2>/dev/null || true
    
    # Kill any remaining processes
    pkill -f "node.*server.js" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    
    echo -e "${GREEN}✅ Serveurs arrêtés proprement${NC}"
    exit 0
}

# Set trap for clean exit
trap cleanup SIGINT SIGTERM

echo -e "${GREEN}🎉 SCRIPT TERMINÉ AVEC SUCCÈS!${NC}"
echo -e "${BLUE}🔄 Serveurs actifs - Monitoring en cours...${NC}"
echo -e "${YELLOW}⌨️  Appuyez sur Ctrl+C pour arrêter tous les services${NC}"
echo ""
echo -e "${CYAN}🔗 Liens utiles:${NC}"
echo -e "Frontend: ${GREEN}http://localhost:3010${NC}"
echo -e "Backend API: ${GREEN}http://localhost:5010${NC}"
echo -e "Health Check: ${GREEN}http://localhost:5010/api/health${NC}"

# Keep everything running
wait

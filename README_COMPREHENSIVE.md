# 🚀 FuturistCards - Plateforme de Cartes de Visite Numériques

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/shayacoca/FuturistCards)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)

> Plateforme moderne full-stack pour créer et gérer des cartes de visite numériques avec design glassmorphism Tesla/Apple/Iron Man et support multilingue complet.

## 📋 Table des Matières

- [🎯 Aperçu](#-aperçu)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies](#️-technologies)
- [🚀 Installation](#-installation)
- [📁 Structure](#-structure-du-projet)
- [🔧 Scripts](#-scripts)
- [🧪 Tests](#-tests)
- [🌐 Déploiement](#-déploiement)
- [👥 Comptes Test](#-comptes-de-test)
- [📚 API](#-api-endpoints)
- [🎨 Design System](#-design-system)
- [🌍 Internationalisation](#-internationalisation)
- [📊 Statut Production](#-statut-production)
- [📄 Licence](#-licence)

## 🎯 Aperçu

Application full-stack moderne permettant de créer, gérer et partager des cartes de visite numériques avec :
- **Design glassmorphism** inspiré Tesla/Apple/Iron Man
- **Support multilingue** (FR/EN/HE) avec RTL complet
- **Authentification JWT** sécurisée avec rôles
- **Interface responsive** et accessible
- **Animations fluides** avec Framer Motion
- **12 pages complètes** et fonctionnelles

## ✨ Fonctionnalités

### 🔐 Authentification & Sécurité
- Inscription/Connexion JWT sécurisée avec refresh tokens
- 3 rôles utilisateur (User, Business, Admin) avec permissions
- Gestion de profil et modification mots de passe
- Protection des routes et middleware d'autorisation
- Validation stricte des données avec Joi

### 💼 Gestion des Cartes de Visite
- **Création/modification** (Business uniquement) avec formulaires avancés
- **Système de favoris** avec persistance MongoDB
- **Système de likes** avec animations temps réel
- **Recherche et filtrage** par catégories et mots-clés
- **Prévisualisation temps réel** avec validation
- **CRUD complet** avec gestion d'erreurs

### 👨‍💼 Administration
- **Dashboard admin** avec statistiques système
- **Gestion utilisateurs** complète (CRUD, rôles)
- **Modération contenu** et supervision
- **Analytics** et métriques de performance

### 🌍 Multilingue & Accessibilité
- **3 langues complètes** : Français, Anglais, Hébreu
- **Interface RTL** pour l'hébreu avec direction automatique
- **Détection automatique** de la langue navigateur
- **Fallback gracieux** pour clés manquantes
- **Accessibilité WCAG** avec labels et ARIA

### 🎨 Design & UX
- **Glassmorphism unifié** sur toutes les pages
- **Animations Framer Motion** fluides et professionnelles
- **Responsive design** mobile-first
- **Dark/Light mode** avec persistance
- **CTA optimisés** pour conversion

## 🛠️ Technologies

### Frontend
- **React 18** + **Vite** - Interface moderne avec HMR
- **Tailwind CSS** - Styling utility-first avec design system
- **Framer Motion** - Animations et transitions fluides
- **React Router v6** - Navigation SPA avec lazy loading
- **Axios** - Client HTTP avec intercepteurs
- **React i18next** - Internationalisation complète
- **React Hook Form** + **Yup** - Gestion formulaires et validation

### Backend
- **Node.js** + **Express** - API REST sécurisée
- **MongoDB** + **Mongoose** - Base de données NoSQL
- **JWT** - Authentification avec refresh tokens
- **bcryptjs** - Hashage sécurisé des mots de passe
- **Helmet** + **CORS** - Sécurité HTTP et headers
- **Rate Limiting** - Protection contre les attaques
- **Joi** - Validation des données d'entrée

### DevOps & Tests
- **Playwright** - Tests E2E automatisés
- **ESLint** - Qualité et cohérence du code
- **Render** - Hébergement backend avec auto-deploy
- **Vercel** - Hébergement frontend avec CDN
- **GitHub Actions** - CI/CD automatisé

## 🚀 Installation

### Prérequis
- Node.js >= 16.0.0
- MongoDB (local ou Atlas)
- Git

### Setup Rapide

```bash
# Cloner le projet
git clone https://github.com/shayacoca/FuturistCards.git
cd FuturistCards

# Backend
cd backend
npm install
cp .env.example .env  # Configurer les variables
npm run dev

# Frontend (nouveau terminal)
cd ../frontend
npm install
cp .env.example .env  # Configurer les variables
npm run dev
```

### Variables d'Environnement

**Backend (.env)**
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/futuristcards
JWT_SECRET=your-super-secret-jwt-key-256-bits
JWT_REFRESH_SECRET=your-refresh-secret-key
CLIENT_URL=http://localhost:3010
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=FuturistCards
VITE_ENABLE_ANALYTICS=false
```

## 📁 Structure du Projet

```
FuturistCards/
├── backend/                 # API Node.js/Express
│   ├── controllers/        # Logique métier (auth, cards, users)
│   ├── models/            # Modèles MongoDB (User, Card, Favorite)
│   ├── routes/            # Routes API REST
│   ├── middleware/        # Auth, validation, error handling
│   ├── config/            # Configuration DB et environnement
│   ├── utils/             # Utilitaires et helpers
│   └── server.js          # Point d'entrée serveur
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   │   ├── ui/       # Composants UI (Button, Card, Modal)
│   │   │   ├── forms/    # Formulaires (CardForm, LoginForm)
│   │   │   └── layout/   # Layout (Navbar, Footer, Sidebar)
│   │   ├── pages/         # Pages application (12 pages)
│   │   ├── context/       # Contextes React (Auth, Theme, Favorites)
│   │   ├── hooks/         # Hooks personnalisés
│   │   ├── services/      # Services API et utilitaires
│   │   ├── utils/         # i18n et helpers
│   │   └── styles/        # CSS global et variables
│   ├── tests/             # Tests Playwright E2E
│   └── public/            # Assets statiques et traductions
├── scripts/               # Scripts d'automatisation
├── render.yaml           # Configuration Render
├── vercel.json           # Configuration Vercel
└── README.md
```

## 🔧 Scripts

### Backend
```bash
npm start          # Production
npm run dev        # Développement avec nodemon
npm test           # Tests unitaires Jest
npm run seed       # Seeding base de données
```

### Frontend
```bash
npm run dev        # Développement avec HMR
npm run build      # Build production optimisé
npm run preview    # Prévisualisation build
npm test           # Tests Playwright E2E
npm run test:headed # Tests avec interface navigateur
npm run test:ui    # Interface graphique tests
npm run lint       # Linting ESLint
npm run lint:fix   # Correction automatique
```

## 🧪 Tests

### Tests E2E Playwright
Couverture complète avec 30+ tests :
- **Authentification** : Register, Login, Logout, Rôles
- **Navigation** : Toutes les pages, liens, redirections
- **CRUD Cartes** : Création, modification, suppression
- **Favoris** : Ajout, suppression, persistance
- **Multilingue** : Changement langue, RTL
- **Responsive** : Mobile, tablet, desktop

```bash
cd frontend
npm test                    # Tests headless
npm run test:headed        # Tests avec navigateur visible
npm run test:ui            # Interface graphique Playwright
npm run test:debug         # Mode debug
```

### Tests Unitaires Backend
```bash
cd backend
npm test                    # Tests Jest
npm run test:watch         # Mode watch
npm run test:coverage      # Couverture de code
```

## 🌐 Déploiement

### Production
- **Backend** : Render avec auto-deploy GitHub
- **Frontend** : Vercel avec CDN global
- **Base de données** : MongoDB Atlas
- **Domaines** : Configuration DNS personnalisée

### Configuration Render (Backend)
```yaml
# render.yaml
services:
  - type: web
    name: futuristcards-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        fromDatabase:
          name: futuristcards-db
          property: connectionString
```

### Configuration Vercel (Frontend)
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

### URLs Production
- **Frontend** : https://futuristcards.vercel.app
- **Backend** : https://futuristcards-backend.onrender.com
- **API Docs** : https://futuristcards-backend.onrender.com/api/docs

## 👥 Comptes de Test

```
Admin      : admin@futuristcards.com / AdminPass123!
Business   : business@test.com / BusinessPass123!
User       : user@test.com / UserPass123!
```

## 📚 API Endpoints

### Authentification
```
POST /api/auth/register     # Inscription utilisateur
POST /api/auth/login        # Connexion JWT
POST /api/auth/refresh      # Refresh token
GET  /api/auth/profile      # Profil utilisateur
PUT  /api/auth/profile      # Modifier profil
POST /api/auth/logout       # Déconnexion
```

### Cartes de Visite
```
GET    /api/cards           # Liste cartes (publique)
GET    /api/cards/my        # Mes cartes (Business)
POST   /api/cards           # Créer carte (Business)
GET    /api/cards/:id       # Détail carte
PUT    /api/cards/:id       # Modifier carte (propriétaire)
DELETE /api/cards/:id       # Supprimer carte (propriétaire)
POST   /api/cards/:id/like  # Liker carte
```

### Favoris
```
GET    /api/favorites       # Mes favoris
POST   /api/favorites/:id   # Ajouter aux favoris
DELETE /api/favorites/:id   # Retirer des favoris
```

### Administration
```
GET    /api/admin/users     # Liste utilisateurs (Admin)
PUT    /api/admin/users/:id # Modifier utilisateur (Admin)
DELETE /api/admin/users/:id # Supprimer utilisateur (Admin)
GET    /api/admin/stats     # Statistiques système (Admin)
```

### Utilitaires
```
GET /api/health            # Health check
GET /api/docs              # Documentation API
```

## 🎨 Design System

### Glassmorphism Tesla/Apple/Iron Man
```css
/* Variables CSS principales */
:root {
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  --glass-blur: blur(12px);
  
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-gradient: linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%);
  --tesla-red: #e31837;
  --iron-man-gold: #ffd700;
}
```

### Composants UI
- **GlassCard** : Cartes avec effet glassmorphism
- **GlassButton** : Boutons avec gradients et hover effects
- **GlassInput** : Champs de saisie avec backdrop-blur
- **GlassModal** : Modales avec animations Framer Motion
- **LikeButton** : Bouton like avec animations cœur

### Animations
- **Hover effects** : Scale, glow, color transitions
- **Page transitions** : Fade in/out avec Framer Motion
- **Loading states** : Spinners et skeletons
- **Micro-interactions** : Boutons, formulaires, navigation

## 🌍 Internationalisation

### Langues Supportées
- **Français** (fr) - Langue par défaut
- **Anglais** (en) - Traduction complète
- **Hébreu** (he) - Traduction complète avec RTL

### Fonctionnalités i18n
- **609 clés de traduction** dans chaque langue
- **Support RTL** automatique pour l'hébreu
- **Détection langue navigateur** avec fallback
- **Changement instantané** sans rechargement
- **Persistance localStorage** des préférences
- **Formatage dates/nombres** localisé

### Structure Traductions
```
public/locales/
├── fr/translation.json    # Français (609 clés)
├── en/translation.json    # Anglais (609 clés)
└── he/translation.json    # Hébreu (609 clés)
```

## 📊 Statut Production

### ✅ Fonctionnalités Complètes (100%)
- **12 pages** : Home, Cards, Services, Packs, Contact, About, Auth, Dashboard, Profile, Admin, Favorites, Error
- **Authentification JWT** : 3 rôles avec permissions
- **CRUD cartes** : Création, lecture, modification, suppression
- **Système favoris** : Persistance MongoDB
- **Multilingue** : FR/EN/HE avec RTL
- **Design glassmorphism** : Unifié sur toutes les pages
- **Responsive design** : Mobile-first approach
- **Tests E2E** : 30+ tests Playwright

### ✅ Qualité & Performance
- **Build** : 0 erreurs critiques
- **Bundle size** : ~340KB (optimisé)
- **Lighthouse** : Score > 90
- **ESLint** : Code quality conforme
- **Security** : Headers sécurisés, validation
- **Performance** : Lazy loading, optimisations

### ✅ Déploiement Ready
- **Variables environnement** : Configurées
- **CI/CD** : GitHub Actions prêt
- **Monitoring** : Health checks
- **Documentation** : Complète et à jour

## 📄 Licence

MIT License - voir [LICENSE](LICENSE)

---

## 👨‍💻 Auteur

**Shaï Acoca** - Full-Stack Developer  
📧 Email : contact@shayacoca.dev  
🐙 GitHub : [@shayacoca](https://github.com/shayacoca)  
💼 LinkedIn : [Shaï Acoca](https://linkedin.com/in/shayacoca)

---

<div align="center">
  <p><strong>🚀 Projet 100% Production Ready</strong></p>
  <p>Fait avec ❤️ et beaucoup de ☕ - © 2024 FuturistCards</p>
  <p><em>Tesla x Apple x Iron Man inspired design</em></p>
</div>

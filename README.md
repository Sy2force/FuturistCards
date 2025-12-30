# 🚀 FuturistCards - Plateforme de Cartes de Visite Numériques

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/shayacoca/FuturistCards)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)
[![Production Ready](https://img.shields.io/badge/status-production%20ready-brightgreen.svg)]()

> Plateforme moderne full-stack pour créer et gérer des cartes de visite numériques avec design glassmorphism Tesla/Apple/Iron Man et support multilingue complet (FR/EN/HE).

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
- [📄 Licence](#-licence)

## 🎯 Aperçu

Application full-stack moderne permettant de créer, gérer et partager des cartes de visite numériques avec :
- Design glassmorphism inspiré de Booking.com
- Support multilingue (FR/EN/HE) avec RTL
- Authentification JWT sécurisée
- Interface responsive et accessible

## ✨ Fonctionnalités

### 🔐 Authentification
- Inscription/Connexion JWT sécurisée
- Rôles utilisateur (User, Business, Admin)
- Gestion de profil et mots de passe

### 💼 Cartes de Visite
- Création/modification (Business uniquement)
- Système de favoris
- Recherche et filtrage
- Prévisualisation temps réel

### 👨‍💼 Administration
- Gestion utilisateurs
- Modération contenu
- Statistiques système

### 🌍 Multilingue
- Français, Anglais, Hébreu
- Interface RTL pour l'hébreu
- Détection automatique langue

## 🛠️ Technologies

### Frontend
- **React 18** + **Vite** - Interface moderne
- **Tailwind CSS** - Styling utility-first
- **Framer Motion** - Animations fluides
- **React Router v6** - Navigation SPA
- **Axios** - Client HTTP
- **React i18next** - Internationalisation

### Backend
- **Node.js** + **Express** - API REST
- **MongoDB** + **Mongoose** - Base de données
- **JWT** - Authentification
- **bcryptjs** - Sécurité mots de passe
- **Helmet** + **CORS** - Sécurité HTTP

### DevOps
- **Playwright** - Tests E2E
- **ESLint** - Qualité code
- **Render** - Backend hosting
- **Vercel** - Frontend hosting

## 🚀 Installation

### Prérequis
- Node.js >= 16.0.0
- MongoDB (local ou Atlas)

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
JWT_SECRET=your-jwt-secret-key
CLIENT_URL=http://localhost:3010
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=FuturistCards
```

## 📁 Structure du Projet

```
FuturistCards/
├── backend/                 # API Node.js/Express
│   ├── controllers/        # Logique métier
│   ├── models/            # Modèles MongoDB
│   ├── routes/            # Routes API
│   ├── middleware/        # Middlewares
│   └── server.js          # Point d'entrée
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── pages/         # Pages application
│   │   ├── context/       # Contextes React
│   │   ├── hooks/         # Hooks personnalisés
│   │   └── services/      # Services API
│   └── tests/             # Tests Playwright
├── render.yaml           # Config Render
├── vercel.json           # Config Vercel
└── README.md
```

## 🔧 Scripts

### Backend
```bash
npm start          # Production
npm run dev        # Développement
npm test           # Tests
```

### Frontend
```bash
npm run dev        # Développement
npm run build      # Build production
npm test           # Tests Playwright
npm run test:headed # Tests avec UI
npm run lint       # Linting
```

## 🧪 Tests

Tests E2E avec Playwright couvrant :
- Authentification complète
- Navigation et routing
- CRUD des cartes
- Système de favoris
- Interface responsive

```bash
cd frontend
npm test                    # Tests headless
npm run test:headed        # Tests avec navigateur
npm run test:ui            # Interface graphique
```

## 🌐 Déploiement

### Production
- **Backend** : Render (render.yaml)
- **Frontend** : Vercel (vercel.json)
- Déploiement automatique sur push GitHub

### URLs Production
- Frontend : https://futuristcards.vercel.app
- Backend : https://futuristcards-backend.onrender.com

## 👥 Comptes de Test

```
Utilisateur : user@test.com / Test123!
Business   : business@test.com / Test123!
Admin      : admin@test.com / Test123!
```

## 📚 API Endpoints

### Auth
```
POST /api/auth/register     # Inscription
POST /api/auth/login        # Connexion
GET  /api/auth/profile      # Profil
```

### Cards
```
GET    /api/cards           # Liste cartes
POST   /api/cards           # Créer (Business)
PUT    /api/cards/:id       # Modifier
DELETE /api/cards/:id       # Supprimer
```

### Favorites
```
GET    /api/favorites       # Mes favoris
POST   /api/favorites/:id   # Ajouter
DELETE /api/favorites/:id   # Retirer
```

### Admin
```
GET /api/admin/users        # Gestion utilisateurs
GET /api/admin/stats        # Statistiques
```

## 📄 Licence

MIT License - voir [LICENSE](LICENSE)

---

**Auteur** : Shaï Acoca (contact@shayacoca.dev)  
**GitHub** : [@shayacoca](https://github.com/shayacoca)

<div align="center">
  <p>Fait avec ❤️ - © 2024 FuturistCards</p>
</div>

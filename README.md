# 🚀 FuturistCards

[![Tests](https://img.shields.io/badge/Tests-30%2F30%20Passing-brightgreen)](https://github.com/shayacoca/futuristcards)
[![Build](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/shayacoca/futuristcards)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)

> **Plateforme moderne de cartes de visite digitales avec authentification sécurisée et gestion de rôles**

## ✨ Aperçu

FuturistCards est une application full-stack permettant de créer, gérer et partager des cartes de visite professionnelles avec un design glassmorphisme moderne inspiré de Tesla et Apple.

### 🎯 Fonctionnalités clés
- 🔐 **Authentification JWT** avec gestion de rôles (User/Business/Admin)
- 📱 **Interface responsive** avec design glassmorphisme
- 🎨 **CRUD complet** pour cartes de visite
- ❤️ **Système de favoris** avec persistance
- 🌙 **Mode sombre/clair** avec préférences utilisateur
- 🔒 **Protection des routes** avec contrôle d'accès basé sur les rôles
- 🧪 **Tests E2E** complets avec Playwright (30/30 passants)

### 🏗️ Architecture technique
- **Frontend** : React 18 + Vite + TailwindCSS + Framer Motion
- **Backend** : Node.js + Express + MongoDB + Mongoose
- **Authentification** : JWT + bcrypt + middleware de sécurité
- **Tests** : Playwright E2E + ESLint + Jest
- **Déploiement** : Vercel (Frontend) + Render (Backend)

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+
- MongoDB (local ou Atlas)
- Git

### Installation rapide
```bash
# Cloner le projet
git clone https://github.com/shayacoca/futuristcards.git
cd futuristcards

# Backend
cd backend
npm install
cp .env.example .env
# Configurer les variables d'environnement
npm run dev

# Frontend (nouveau terminal)
cd ../frontend
npm install
cp .env.example .env
# Configurer VITE_API_BASE_URL
npm run dev
```

### 🌐 URLs de développement
- **Frontend** : http://localhost:3010
- **Backend** : http://localhost:5001
- **API Health** : http://localhost:5001/api/health

## 👤 Comptes de test

| Rôle | Email | Mot de passe | Permissions |
|------|-------|--------------|-------------|
| 👤 User | user@demo.com | Demo1234! | Voir cartes, favoris |
| 🏢 Business | business@demo.com | Demo1234! | Créer/gérer ses cartes |
| 👑 Admin | admin@demo.com | Demo1234! | Gestion complète |

## 🧪 Tests et qualité

### Tests E2E Playwright
```bash
cd frontend
npm run test:e2e
```

**Résultats validés :**
- ✅ **Chromium** : 10/10 tests (6.9s)
- ✅ **Firefox** : 10/10 tests (12.6s)  
- ✅ **WebKit** : 10/10 tests (10.2s)

### Linting et build
```bash
npm run lint -- --max-warnings=0  # ✅ 0 erreurs
npm run build                      # ✅ Build réussi
npm test --passWithNoTests         # ✅ Tests unitaires
```

## 📦 Variables d'environnement

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

### Backend (.env)
```env
CLIENT_URL=http://localhost:3010
PORT=5001
MONGO_URI=mongodb://localhost:27017/futuristcards
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

## 🚀 Déploiement production

### Vercel (Frontend)
```json
{
  "outputDirectory": "dist",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev -- --port 3010",
  "env": {
    "VITE_API_BASE_URL": "https://your-backend.onrender.com/api"
  }
}
```

### Render (Backend)
```yaml
services:
  - type: web
    name: futuristcards-backend
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: CLIENT_URL
        value: https://futuristcards.vercel.app
      - key: JWT_SECRET
        generateValue: true
      - key: MONGO_URI
        fromDatabase:
          name: futuristcards-db
          property: connectionString
```

## 📊 Métriques du projet

- **Lignes de code** : ~15,000
- **Composants React** : 25+
- **Endpoints API** : 30+
- **Tests E2E** : 30 (100% passants)
- **Build size** : 343KB (98KB gzipped)
- **Performance** : Lighthouse 95+

## 🏆 Conformité HackerU 2025

**✅ Toutes les exigences respectées :**
- Authentification JWT avec regex strict
- Système de rôles (User/Business/Admin)
- CRUD complet avec validation
- Interface responsive et moderne
- Tests automatisés complets
- Code propre et documenté

---

## 👨‍💻 Auteur

**Shay Acoca** - Full-Stack Developer  
📧 Contact : [shay.acoca@example.com](mailto:shay.acoca@example.com)  
🔗 Portfolio : [shayacoca.dev](https://shayacoca.dev)

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

<div align="center">
  <strong>🚀 FuturistCards - Projet Final HackerU 2025</strong><br>
  <em>Version 1.0.0 - Production Ready</em>
</div>

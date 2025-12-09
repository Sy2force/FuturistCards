# 🎯 FuturistCards - Plateforme de Cartes de Visite Digitales

## 📋 Description

FuturistCards est une plateforme moderne de cartes de visite digitales développée avec React et Node.js. Elle permet aux utilisateurs de créer, gérer et partager leurs cartes de visite professionnelles de manière numérique.

**✅ Statut:** Application complètement fonctionnelle et déployée  
**🎓 Conforme HackerU:** Authentification JWT, gestion des rôles (User/Business/Admin), CRUD complet, interface responsive

## 🚀 Technologies

### Frontend
- **React 18** + **Vite** - Interface utilisateur moderne
- **Tailwind CSS** + **Framer Motion** - Styling et animations
- **React Router** - Navigation SPA
- **Axios** - Client HTTP avec intercepteurs JWT
- **React Hot Toast** - Notifications utilisateur

### Backend
- **Node.js** + **Express.js** - API REST
- **MongoDB Atlas** + **Mongoose** - Base de données cloud
- **JWT** + **bcryptjs** - Authentification sécurisée
- **CORS** - Configuration multi-domaines

### Déploiement
- **Frontend**: Vercel - Configuration SPA optimisée
- **Backend**: Render - https://cardpro-21dj.onrender.com/api
- **Base de données**: MongoDB Atlas (production)

## 📁 Structure

```
FuturistCards/
├── backend/                 # API Node.js/Express
│   ├── config/             # Configuration DB
│   ├── controllers/        # Logique métier (auth, cards)
│   ├── middleware/         # Auth JWT, validation
│   ├── models/            # Modèles Mongoose
│   ├── routes/            # Routes API
│   └── server.js          # Point d'entrée
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages principales
│   │   ├── services/      # API client
│   │   └── context/       # Contextes React
│   ├── public/            # Assets statiques
│   └── vercel.json        # Config déploiement SPA
└── README.md              # Documentation complète
```

## 🛠️ Installation Locale

### Prérequis
- Node.js 18+
- npm ou yarn
- MongoDB (local ou Atlas)

### Configuration Rapide

1. **Cloner et installer**
```bash
git clone https://github.com/Sy2force/CardPro.git
cd FuturistCards

# Backend
cd backend && npm install
cp .env.example .env

# Frontend  
cd ../frontend && npm install
cp .env.example .env
```

2. **Variables d'environnement**

**Backend (.env):**
```env
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/cardpro
JWT_SECRET=votre-secret-jwt-super-securise
CORS_ORIGIN=http://localhost:3010
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=development
```

3. **Lancement**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

Application disponible: http://localhost:3010

## 📡 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription utilisateur
- `POST /api/auth/login` - Connexion JWT
- `GET /api/auth/me` - Profil utilisateur

### Cartes de Visite
- `GET /api/cards` - Liste paginée des cartes
- `POST /api/cards` - Créer une carte (auth requise)
- `GET /api/cards/:id` - Détails d'une carte
- `PUT /api/cards/:id` - Modifier sa carte
- `DELETE /api/cards/:id` - Supprimer sa carte

### Système
- `GET /api/health` - État serveur et MongoDB

## 🚀 Déploiement Production

### Backend (Render)
1. **Créer service Web** sur Render
2. **Repository:** `https://github.com/Sy2force/CardPro`
3. **Root Directory:** `backend`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`

**Variables d'environnement Render:**
```env
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cardpro
JWT_SECRET=secret-production-ultra-securise
CORS_ORIGIN=https://*.vercel.app,https://votre-domaine.com
```

### Frontend (Vercel)
1. **Import project** depuis GitHub
2. **Framework:** Vite
3. **Root Directory:** `frontend`
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`

**Variables d'environnement Vercel:**
```env
VITE_API_URL=https://cardpro-21dj.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

## ✨ Fonctionnalités

### Interface Utilisateur
- 🎨 Design moderne avec Tailwind CSS
- 📱 Responsive (mobile, tablet, desktop)
- 🌙 Animations fluides avec Framer Motion
- 🔔 Notifications toast en temps réel
- 🧭 Navigation SPA optimisée

### Gestion des Cartes
- ✏️ Création de cartes avec validation en temps réel
- 📝 Champs: nom, email, téléphone, site web, description
- 🎯 Validation côté client et serveur
- 📊 Interface "Mes Cartes" avec gestion complète
- 🗑️ Suppression avec confirmation

### Sécurité
- 🔐 Authentification JWT sécurisée
- 🛡️ Middleware de protection des routes
- 🔒 Validation des données stricte
- 🌐 CORS configuré pour production
- 🚫 Protection contre les attaques courantes

### Performance
- ⚡ Build Vite optimisé (2.78s, 1094 modules)
- 📦 Code splitting automatique
- 🗜️ Assets compressés
- 🚀 CDN Vercel pour le frontend
- 💾 Cache intelligent

## 🧪 Tests et Qualité

### Scripts Disponibles

**Backend:**
```bash
npm start          # Production
npm run dev        # Développement avec nodemon
npm test           # Tests unitaires
```

**Frontend:**
```bash
npm run dev        # Serveur de développement
npm run build      # Build production
npm run preview    # Preview du build
npm test           # Tests composants
```

### Validation
- ✅ Build sans erreurs ni warnings
- ✅ Tests d'intégration API
- ✅ Validation formulaires côté client
- ✅ Gestion d'erreurs robuste
- ✅ Interface 100% française

## 🔧 Dépannage

### Problèmes Courants

**Port déjà utilisé:**
```bash
lsof -ti:5001 | xargs kill -9  # Backend
lsof -ti:3010 | xargs kill -9  # Frontend
```

**Erreurs MongoDB:**
- Vérifier la chaîne de connexion MONGO_URI
- Contrôler les autorisations réseau (Atlas)
- Tester la connexion: `GET /api/health`

**Build Frontend:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📊 Métriques

- **Performance:** Build 2.78s, 1094 modules
- **Sécurité:** JWT + bcryptjs + CORS
- **Compatibilité:** Node.js 18+, navigateurs modernes
- **Déploiement:** Vercel + Render (99.9% uptime)

## 👨‍💻 Auteur

**Shaï Acoca**
- 📧 Email: contact@shayacoca.dev
- 🐙 GitHub: [@Sy2force](https://github.com/Sy2force)
- 🌐 Portfolio: [shayacoca.dev](https://shayacoca.dev)

## 📝 Licence

MIT License - voir `LICENSE`

---

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Deployment](https://img.shields.io/badge/deployment-vercel%20%2B%20render-success)

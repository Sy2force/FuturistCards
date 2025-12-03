# 🎯 FuturistCards - Plateforme de Cartes de Visite Digitales

## 📋 Description

FuturistCards est une plateforme moderne de cartes de visite digitales développée avec React et Node.js. Elle permet aux utilisateurs de créer, gérer et partager leurs cartes de visite professionnelles de manière numérique.

**Conforme aux exigences HackerU** - Authentification JWT, gestion des rôles (User/Business/Admin), CRUD complet, interface responsive.

## 🚀 Technologies

### Frontend
- **React 18** + **Vite** - Interface utilisateur moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Navigation côté client
- **Axios** - Client HTTP pour les requêtes API

### Backend
- **Node.js** + **Express.js** - API REST
- **MongoDB** + **Mongoose** - Base de données NoSQL
- **JWT** + **bcryptjs** - Authentification sécurisée

### Déploiement
- **Frontend**: Vercel - https://cardpro-frontend.vercel.app
- **Backend**: Render - https://cardpro-1.onrender.com
- **Base de données**: MongoDB Atlas

## 📁 Structure

```
FuturistCards/
├── backend/                 # API Node.js/Express
│   ├── config/             # Configuration DB
│   ├── controllers/        # Logique métier
│   ├── middleware/         # Middlewares Express
│   ├── models/            # Modèles Mongoose
│   ├── routes/            # Routes API
│   └── server.js          # Point d'entrée
├── frontend/               # Application React
│   ├── src/
│   │   ├── components/    # Composants React
│   │   ├── pages/         # Pages de l'application
│   │   ├── services/      # Services API
│   │   └── context/       # Contextes React
│   └── public/            # Fichiers statiques
└── README.md              # Documentation
```

## 🛠️ Installation

### Prérequis
- Node.js 16+
- npm
- MongoDB

### Configuration

1. **Cloner le repository**
```bash
git clone https://github.com/Sy2force/CardPro.git
cd FuturistCards
```

2. **Backend**
```bash
cd backend
npm install
cp .env.example .env
# Configurer .env avec vos valeurs
npm run dev
```

3. **Frontend**
```bash
cd frontend
npm install
cp .env.example .env
# Configurer VITE_API_URL
npm run dev
```

## ⚙️ Variables d'Environnement

### Backend (.env)
```env
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/cardpro
JWT_SECRET=votre-secret-jwt
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=FuturistCards
```

## 📡 API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion

### Cartes
- `GET /api/cards` - Liste des cartes
- `POST /api/cards` - Créer une carte
- `PUT /api/cards/:id` - Modifier une carte
- `DELETE /api/cards/:id` - Supprimer une carte

### Système
- `GET /api/health` - État du serveur

## 🚀 Déploiement

### Production

#### Backend (Render)
```env
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/cardpro
JWT_SECRET=secret-production
CORS_ORIGIN=https://votre-app.vercel.app
```

#### Frontend (Vercel)
```env
VITE_API_URL=https://votre-backend.onrender.com/api
```

## 🧪 Scripts

### Backend
- `npm start` - Production
- `npm run dev` - Développement
- `npm test` - Tests

### Frontend
- `npm run dev` - Serveur de développement
- `npm run build` - Build production
- `npm test` - Tests

## 👨‍💻 Auteur

**Shaï Acoca**
- Email: contact@shayacoca.dev
- GitHub: [@Sy2force](https://github.com/Sy2force)

## 📝 Licence

MIT License - voir `LICENSE`

---

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

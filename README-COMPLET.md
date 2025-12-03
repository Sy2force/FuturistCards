# 🚀 CardPro - Application de Cartes de Visite Futuristes

Application web full-stack moderne pour créer et gérer des cartes de visite numériques avec un design futuriste.

## 📋 Table des Matières

- [🎯 Fonctionnalités](#-fonctionnalités)
- [🛠️ Stack Technique](#️-stack-technique)
- [📁 Structure du Projet](#-structure-du-projet)
- [⚡ Démarrage Rapide](#-démarrage-rapide)
- [🗄️ Configuration MongoDB](#️-configuration-mongodb)
- [🔧 Variables d'Environnement](#-variables-denvironnement)
- [🚀 Déploiement Production](#-déploiement-production)
- [📚 Documentation API](#-documentation-api)
- [🧪 Tests et Validation](#-tests-et-validation)
- [🔍 Diagnostic et Dépannage](#-diagnostic-et-dépannage)

---

## 🎯 Fonctionnalités

### ✨ Interface Utilisateur
- **Design Futuriste**: Interface moderne avec animations fluides
- **Responsive**: Optimisé pour tous les appareils (mobile, tablette, desktop)
- **Thème Sombre**: Design élégant avec palette de couleurs futuriste
- **Navigation Intuitive**: Expérience utilisateur optimisée

### 🔐 Authentification & Sécurité
- **JWT Authentication**: Système d'authentification sécurisé
- **Inscription/Connexion**: Gestion complète des utilisateurs
- **Protection des Routes**: Accès sécurisé aux fonctionnalités
- **Validation des Données**: Validation côté client et serveur

### 📇 Gestion des Cartes
- **CRUD Complet**: Créer, lire, modifier, supprimer des cartes
- **Recherche Avancée**: Filtrage par nom, catégorie, localisation
- **Favoris**: Système de likes et favoris
- **Catégories**: Organisation par secteurs d'activité

### 🌐 Fonctionnalités Réseau
- **Partage Social**: Partage des cartes sur les réseaux sociaux
- **Export**: Téléchargement des cartes en différents formats
- **Statistiques**: Vues et interactions sur les cartes

---

## 🛠️ Stack Technique

### Frontend
```
React 18 + Hooks
├── Vite (Build tool ultra-rapide)
├── Tailwind CSS (Styling utility-first)
├── React Router (Navigation SPA)
├── Axios (Client HTTP)
├── React Context (State management)
└── Framer Motion (Animations)
```

### Backend
```
Node.js + Express
├── MongoDB + Mongoose (Base de données)
├── JWT (Authentification)
├── bcryptjs (Hachage mots de passe)
├── Helmet (Sécurité HTTP)
├── CORS (Cross-Origin Resource Sharing)
└── Rate Limiting (Protection DDoS)
```

### Déploiement
```
Production Stack
├── Frontend: Vercel (CDN global)
├── Backend: Render (Serveur Node.js)
├── Database: MongoDB Atlas (Cloud)
└── DNS: Domaines personnalisés
```

---

## 📁 Structure du Projet

```
CardPro/
├── 📂 frontend/                 # Application React
│   ├── 📂 src/
│   │   ├── 📂 components/       # Composants réutilisables
│   │   │   ├── Card.jsx         # Composant carte
│   │   │   ├── Navbar.jsx       # Navigation
│   │   │   └── SearchBar.jsx    # Barre de recherche
│   │   ├── 📂 pages/            # Pages de l'application
│   │   │   ├── HomePage.jsx     # Page d'accueil
│   │   │   ├── LoginPage.jsx    # Connexion
│   │   │   ├── SearchPage.jsx   # Recherche
│   │   │   └── ProfilePage.jsx  # Profil utilisateur
│   │   ├── 📂 context/          # Contextes React
│   │   │   ├── AuthContext.jsx  # Authentification
│   │   │   └── CardContext.jsx  # Gestion cartes
│   │   ├── 📂 services/         # Services API
│   │   │   └── api.js           # Client API centralisé
│   │   └── 📂 assets/           # Ressources statiques
│   ├── 📂 public/               # Fichiers publics
│   └── 📄 package.json          # Dépendances frontend
├── 📂 backend/                  # API Node.js
│   ├── 📂 controllers/          # Logique métier
│   │   ├── authController.js    # Authentification
│   │   ├── cardController.js    # Gestion cartes
│   │   └── favoriteController.js # Favoris
│   ├── 📂 models/               # Modèles de données
│   │   ├── User.js              # Modèle utilisateur
│   │   ├── Card.js              # Modèle carte
│   │   └── Favorite.js          # Modèle favoris
│   ├── 📂 middleware/           # Middlewares
│   │   ├── authMiddleware.js    # Vérification JWT
│   │   ├── errorHandler.js      # Gestion erreurs
│   │   └── rateLimiter.js       # Limitation requêtes
│   ├── 📂 routes/               # Routes API
│   │   ├── auth.js              # Routes authentification
│   │   ├── cards.js             # Routes cartes
│   │   └── favorites.js         # Routes favoris
│   ├── 📂 config/               # Configuration
│   │   └── db.js                # Connexion MongoDB
│   ├── 📄 server.js             # Serveur principal
│   └── 📄 package.json          # Dépendances backend
├── 📂 scripts/                  # Scripts utilitaires
│   ├── 📄 deploy-render.sh      # Déploiement Render
│   ├── 📄 deploy-vercel.sh      # Déploiement Vercel
│   └── 📄 test-deployment.sh    # Tests déploiement
└── 📄 README.md                 # Documentation (ce fichier)
```

---

## ⚡ Démarrage Rapide

### Prérequis
```bash
Node.js >= 18.0.0
MongoDB (local ou Atlas)
npm ou yarn
Git
```

### Installation Locale

#### 1. Cloner le Projet
```bash
git clone https://github.com/Sy2force/CardPro.git
cd CardPro
```

#### 2. Configuration Backend
```bash
cd backend
npm install

# Copier et configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos vraies valeurs

# Démarrer le serveur backend
npm start
# ✅ Backend disponible sur http://localhost:10000
```

#### 3. Configuration Frontend
```bash
cd frontend
npm install

# Créer le fichier d'environnement local
echo "VITE_API_URL=http://localhost:10000/api" > .env.local

# Démarrer le serveur de développement
npm run dev
# ✅ Frontend disponible sur http://localhost:3010
```

#### 4. Accès à l'Application
```
🌐 Frontend: http://localhost:3010
🖥️ Backend API: http://localhost:10000/api
📊 Health Check: http://localhost:10000/api/health
```

---

## 🗄️ Configuration MongoDB

### Option 1: MongoDB Atlas (Recommandé)

#### Étape 1: Créer un Cluster
```bash
1. Aller sur https://cloud.mongodb.com
2. Créer un compte ou se connecter
3. Create Project → "CardPro-Production"
4. Build Database → M0 Sandbox (GRATUIT)
5. Provider: AWS, Region: eu-west-1 (Ireland)
6. Cluster Name: cardpro-cluster
```

#### Étape 2: Configuration Sécurité
```bash
Database Access → Add New Database User
├── Username: cardpro-admin
├── Password: [Générer mot de passe sécurisé]
├── Privileges: Read and write to any database
└── Add User

Network Access → Add IP Address
├── IP Address: 0.0.0.0/0
├── Comment: Allow access from anywhere
└── Confirm
```

#### Étape 3: URI de Connexion
```
Clusters → Connect → Connect your application
URI Format:
mongodb+srv://cardpro-admin:VOTRE_PASSWORD@cardpro-cluster.xxxxx.mongodb.net/cardpro?retryWrites=true&w=majority
```

### Option 2: MongoDB Local
```bash
# Installation MongoDB (macOS)
brew install mongodb-community

# Démarrer MongoDB
brew services start mongodb-community

# URI locale
mongodb://localhost:27017/cardpro
```

### Test de Connexion
```bash
cd backend
node -e "
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.log('❌ Erreur:', err.message));
"
```

---

## 🔧 Variables d'Environnement

### Backend (.env)
```env
# ===========================================
# 🗄️ DATABASE CONFIGURATION
# ===========================================
MONGO_URI=mongodb+srv://cardpro-admin:PASSWORD@cardpro-cluster.xxxxx.mongodb.net/cardpro

# ===========================================
# 🔐 AUTHENTICATION & SECURITY
# ===========================================
JWT_SECRET=cardpro_jwt_secret_2025_secure_key_production
JWT_EXPIRES_IN=7d

# ===========================================
# 🌐 SERVER CONFIGURATION
# ===========================================
PORT=10000
NODE_ENV=development

# ===========================================
# 🔗 CORS CONFIGURATION
# ===========================================
CORS_ORIGIN=http://localhost:3010

# ===========================================
# 📊 LOGGING & MONITORING
# ===========================================
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true
```

### Frontend (.env.local)
```env
# ===========================================
# 🌐 API CONFIGURATION
# ===========================================
VITE_API_URL=http://localhost:10000/api

# ===========================================
# 📱 APP CONFIGURATION
# ===========================================
VITE_APP_NAME=CardPro
VITE_ENVIRONMENT=development
```

---

## 🚀 Déploiement Production

### Architecture de Déploiement
```
Production Stack:
├── 🌐 Frontend: Vercel (CDN Global)
├── 🖥️ Backend: Render (Node.js Server)
└── 🗄️ Database: MongoDB Atlas (Cloud)
```

### 1. Déploiement Backend (Render)

#### Configuration Render
```bash
1. https://render.com → Se connecter
2. New → Web Service
3. Connect GitHub Repository
4. Configuration:
   ├── Service Name: cardpro-backend
   ├── Root Directory: backend
   ├── Environment: Node
   ├── Build Command: npm install
   ├── Start Command: npm start
   └── Instance Type: Free
```

#### Variables d'Environnement Render
```env
MONGO_URI=mongodb+srv://cardpro-admin:PASSWORD@cardpro-cluster.xxxxx.mongodb.net/cardpro
JWT_SECRET=cardpro_jwt_secret_2025_secure_key_production
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://cardpro-frontend.vercel.app
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true
```

### 2. Déploiement Frontend (Vercel)

#### Configuration Vercel
```bash
1. https://vercel.com → Se connecter
2. Import Project → GitHub
3. Repository: CardPro
4. Configuration:
   ├── Project Name: cardpro-frontend
   ├── Framework: Vite
   ├── Root Directory: frontend
   ├── Build Command: npm run build
   └── Output Directory: dist
```

#### Variables d'Environnement Vercel
```env
VITE_API_URL=https://cardpro-backend.onrender.com/api
VITE_APP_NAME=CardPro
VITE_ENVIRONMENT=production
```

### 3. URLs de Production
```
🌐 Frontend: https://cardpro-frontend.vercel.app
🖥️ Backend:  https://cardpro-backend.onrender.com
📊 API:      https://cardpro-backend.onrender.com/api
```

---

## 📚 Documentation API

### Base URL
```
Local:      http://localhost:10000/api
Production: https://cardpro-backend.onrender.com/api
```

### 🔐 Authentification

#### Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123!"
}

Response:
{
  "success": true,
  "message": "Utilisateur créé avec succès",
  "user": { "id": "...", "email": "john@example.com" },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123!"
}

Response:
{
  "success": true,
  "message": "Connexion réussie",
  "user": { "id": "...", "email": "john@example.com" },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### 📇 Gestion des Cartes

#### Lister les Cartes
```http
GET /api/cards?page=1&limit=10&search=developer

Response:
{
  "success": true,
  "count": 5,
  "total": 50,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "...",
      "title": "John Doe - Développeur Full Stack",
      "subtitle": "Expert React & Node.js",
      "email": "john@example.com",
      "phone": "+33 1 23 45 67 89",
      "category": "Technology",
      "likeCount": 15,
      "views": 234
    }
  ]
}
```

#### Créer une Carte
```http
POST /api/cards
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "title": "Jane Smith - Designer UX/UI",
  "subtitle": "Créatrice d'expériences digitales",
  "email": "jane@example.com",
  "phone": "+33 1 98 76 54 32",
  "category": "Design",
  "address": {
    "street": "123 Rue de la Paix",
    "city": "Paris",
    "country": "France"
  }
}
```

### 📊 Monitoring

#### Health Check
```http
GET /api/health

Response:
{
  "success": true,
  "mongodb": true,
  "status": "OK",
  "message": "Server is running",
  "database": {
    "status": "Connected",
    "name": "cardpro"
  },
  "uptime": 3600.123,
  "timestamp": "2025-12-02T12:00:00.000Z"
}
```

---

## 🧪 Tests et Validation

### Tests Backend
```bash
cd backend

# Test de connexion MongoDB
node -e "
import('./config/db.js').then(connectDB => {
  connectDB.default().then(() => {
    console.log('✅ MongoDB: Connexion réussie');
    process.exit(0);
  }).catch(err => {
    console.log('❌ MongoDB: Erreur -', err.message);
    process.exit(1);
  });
});
"

# Test des endpoints API
curl http://localhost:10000/api/health | jq .
curl http://localhost:10000/api/cards | jq '.data | length'
```

### Tests Frontend
```bash
cd frontend

# Vérifier la configuration
npm run build
npm run preview

# Test des variables d'environnement
echo $VITE_API_URL
```

### Tests d'Intégration
```bash
# Script de test complet
./scripts/test-deployment.sh

# Test manuel de l'authentification
curl -X POST http://localhost:10000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","password":"Demo1234!"}'
```

### Validation Production
```bash
# Test backend production
curl https://cardpro-backend.onrender.com/api/health

# Test frontend production
curl -I https://cardpro-frontend.vercel.app

# Test intégration complète
./scripts/test-deployment.sh
```

---

## 🔍 Diagnostic et Dépannage

### Problèmes Courants

#### 1. Erreur de Connexion MongoDB
```bash
# Symptôme
❌ MongoServerError: bad auth : authentication failed

# Diagnostic
cd backend
node -e "
import dotenv from 'dotenv';
dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI?.replace(/:[^@]*@/, ':****@'));
"

# Solutions
1. Vérifier les identifiants sur MongoDB Atlas
2. Réinitialiser le mot de passe utilisateur
3. Vérifier l'accès réseau (IP whitelist)
4. Tester avec mongosh directement
```

#### 2. Erreur CORS Frontend-Backend
```bash
# Symptôme
❌ Access to XMLHttpRequest blocked by CORS policy

# Diagnostic
curl -H "Origin: http://localhost:3010" \
  -H "Access-Control-Request-Method: GET" \
  -X OPTIONS http://localhost:10000/api/health

# Solutions
1. Vérifier CORS_ORIGIN dans backend/.env
2. Redémarrer le serveur backend
3. Vérifier que frontend utilise la bonne API URL
```

#### 3. Erreur de Build Frontend
```bash
# Symptôme
❌ Failed to resolve import

# Diagnostic
cd frontend
npm run build 2>&1 | grep -i error

# Solutions
1. Vérifier les imports/exports
2. Nettoyer node_modules: rm -rf node_modules && npm install
3. Vérifier les variables d'environnement VITE_*
```

### Scripts de Diagnostic
```bash
# Diagnostic complet local
cd backend && npm start &
cd frontend && npm run dev &
sleep 5
curl http://localhost:10000/api/health
curl http://localhost:3010

# Diagnostic production
curl https://cardpro-backend.onrender.com/api/health
curl -I https://cardpro-frontend.vercel.app
```

### Mode Mock (Développement)
L'application fonctionne en mode mock si MongoDB n'est pas disponible :
- 5 cartes de démonstration
- Authentification simulée
- Toutes les fonctionnalités disponibles
- Idéal pour le développement et les démonstrations

---

## 🎯 Fonctionnalités Avancées

### Sécurité
- **JWT Tokens**: Authentification stateless
- **Password Hashing**: bcryptjs avec salt
- **Rate Limiting**: Protection contre les attaques DDoS
- **CORS**: Configuration stricte des origines
- **Helmet**: Headers de sécurité HTTP
- **Input Validation**: Validation côté client et serveur

### Performance
- **Vite**: Build ultra-rapide
- **Code Splitting**: Chargement optimisé
- **CDN**: Vercel Edge Network
- **Compression**: Gzip/Brotli automatique
- **Caching**: Stratégies de cache optimisées

---

## 🤝 Contribution

### Développement Local
```bash
# Fork le projet
git clone https://github.com/VOTRE_USERNAME/CardPro.git

# Créer une branche feature
git checkout -b feature/nouvelle-fonctionnalite

# Développer et tester
npm run dev
npm test

# Commit et push
git commit -m "feat: ajouter nouvelle fonctionnalité"
git push origin feature/nouvelle-fonctionnalite

# Créer une Pull Request
```

### Standards de Code
- **ESLint**: Linting JavaScript/React
- **Prettier**: Formatage automatique
- **Conventional Commits**: Messages de commit standardisés
- **Tests**: Couverture minimale 80%

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- **React Team** pour le framework React
- **Vercel** pour la plateforme de déploiement frontend
- **Render** pour l'hébergement backend
- **MongoDB** pour la base de données cloud
- **Tailwind CSS** pour le framework CSS
- **Vite** pour l'outil de build ultra-rapide

---

## 📞 Support

Pour toute question ou problème :
- 📧 Email: support@cardpro.com
- 🐛 Issues: [GitHub Issues](https://github.com/Sy2force/CardPro/issues)
- 📖 Documentation: Ce README.md
- 💬 Discussions: [GitHub Discussions](https://github.com/Sy2force/CardPro/discussions)

---

**🎉 CardPro - Créez l'avenir des cartes de visite !**

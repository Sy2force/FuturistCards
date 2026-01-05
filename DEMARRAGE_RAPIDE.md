# 🚀 Guide de Démarrage Rapide - FuturistCards

## ⚡ Installation en 5 Minutes

### Prérequis
- Node.js 18+ installé
- MongoDB Atlas compte (ou MongoDB local)
- Git installé

---

## 📦 Installation

### 1. Cloner le Projet
```bash
git clone https://github.com/yourusername/FuturistCards.git
cd FuturistCards
```

### 2. Installer les Dépendances

**Frontend**
```bash
cd frontend
npm install
```

**Backend**
```bash
cd ../backend
npm install
```

---

## 🔧 Configuration

### Frontend (.env)

Créez `frontend/.env` :
```env
VITE_API_URL=http://localhost:5001/api
NODE_ENV=development
VITE_APP_NAME=FuturistCards
VITE_DEBUG_MODE=true
```

### Backend (.env)

Créez `backend/.env` :
```env
# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/futuristcards
# Ou MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futuristcards

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=30d

# Server
PORT=5001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3010
```

---

## 🚀 Démarrage

### Option 1 : Deux Terminaux

**Terminal 1 - Backend**
```bash
cd backend
npm run dev
```
✅ Backend démarre sur http://localhost:5001

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```
✅ Frontend démarre sur http://localhost:3010

### Option 2 : Script Unique (si disponible)
```bash
npm run dev
```

---

## 🧪 Vérification

### 1. Tester le Backend
```bash
curl http://localhost:5001/api/health
```

Réponse attendue :
```json
{
  "success": true,
  "status": "OK",
  "mongodb": "connected",
  "timestamp": "2026-01-05T..."
}
```

### 2. Tester le Frontend
Ouvrez http://localhost:3010 dans votre navigateur

---

## 👤 Comptes de Test

### Utilisateur Standard
```
Email: user@futuristcards.com
Password: User123!
```

### Compte Business
```
Email: business@futuristcards.com
Password: Business123!
```

### Compte Admin
```
Email: admin@futuristcards.com
Password: Admin123!
```

---

## 📁 Structure du Projet

```
FuturistCards/
├── frontend/              # Application React
│   ├── src/
│   │   ├── components/   # Composants réutilisables
│   │   ├── pages/        # Pages (27 pages)
│   │   ├── context/      # Context providers
│   │   ├── hooks/        # Custom hooks
│   │   └── utils/        # Utilitaires
│   ├── public/           # Assets statiques
│   └── dist/             # Build production
└── backend/              # API Node.js
    ├── controllers/      # Logique métier
    ├── models/          # Schémas MongoDB
    ├── routes/          # Routes API
    ├── middleware/      # Middleware
    └── config/          # Configuration
```

---

## 🛠️ Commandes Utiles

### Frontend
```bash
npm run dev       # Démarrage développement (port 3010)
npm run build     # Build production
npm run preview   # Preview du build
npm run lint      # Vérification ESLint
```

### Backend
```bash
npm run dev       # Démarrage avec nodemon
npm start         # Démarrage production
npm run health    # Check santé du serveur
npm run seed      # Peupler la DB avec des données test
```

---

## 🔍 Endpoints API Principaux

### Authentification
```
POST /api/auth/register   # Inscription
POST /api/auth/login      # Connexion
GET  /api/auth/profile    # Profil utilisateur
```

### Cartes
```
GET    /api/cards         # Liste des cartes
POST   /api/cards         # Créer une carte (Business)
GET    /api/cards/:id     # Détails d'une carte
PUT    /api/cards/:id     # Modifier une carte
DELETE /api/cards/:id     # Supprimer une carte
```

### Favoris
```
GET    /api/favorites     # Mes favoris
POST   /api/favorites/:id # Ajouter aux favoris
DELETE /api/favorites/:id # Retirer des favoris
```

---

## 🎨 Pages Disponibles

### Pages Publiques
- `/` - Page d'accueil
- `/cards` - Liste des cartes
- `/cards/:id` - Détails d'une carte
- `/about` - À propos
- `/contact` - Contact
- `/services` - Services
- `/packs` - Packs
- `/login` - Connexion
- `/register` - Inscription

### Pages Protégées (Authentification requise)
- `/dashboard` - Tableau de bord
- `/profile` - Profil utilisateur
- `/my-cards` - Mes cartes
- `/favorites` - Mes favoris

### Pages Business
- `/create-card` - Créer une carte
- `/edit-card/:id` - Modifier une carte

### Pages Admin
- `/admin` - Panel admin
- `/admin/analytics` - Analytiques
- `/admin/users` - Gestion utilisateurs
- `/admin/logs` - Logs système

---

## 🐛 Dépannage

### Backend ne démarre pas
```bash
# Vérifier MongoDB
mongosh  # ou mongo

# Vérifier le port
lsof -i :5001

# Vérifier les logs
cd backend && npm run dev
```

### Frontend ne démarre pas
```bash
# Nettoyer le cache
rm -rf node_modules/.vite
npm run dev

# Vérifier le port
lsof -i :3010
```

### Erreur de connexion MongoDB
1. Vérifier que MongoDB est démarré
2. Vérifier `MONGODB_URI` dans `.env`
3. Pour MongoDB Atlas, vérifier l'IP whitelist

### CORS Errors
1. Vérifier `CORS_ORIGIN` dans backend `.env`
2. Vérifier `VITE_API_URL` dans frontend `.env`
3. Redémarrer les deux serveurs

---

## 📊 Métriques de Développement

### Build Frontend
- Temps : ~4s
- Bundle : 210 kB gzippé
- Modules : 1112

### Backend
- Démarrage : < 2s
- Endpoints : 20+
- MongoDB : Connection pooling

---

## 🎯 Prochaines Étapes

1. ✅ Installer et démarrer le projet
2. ✅ Tester avec les comptes de test
3. ✅ Explorer les différentes pages
4. ✅ Créer votre première carte (compte Business)
5. ✅ Tester les favoris
6. ✅ Explorer le panel admin

---

## 📚 Documentation Complète

- **README.md** : Documentation générale
- **DEPLOIEMENT.md** : Guide de déploiement Vercel + Render
- **NETTOYAGE_COMPLET.md** : Rapport de nettoyage

---

## 🆘 Support

**Problèmes ?**
- Vérifier les logs du backend
- Vérifier la console du frontend (F12)
- Vérifier que MongoDB est connecté
- Vérifier les variables d'environnement

**Tout fonctionne ?**
Vous êtes prêt à développer ! 🎉

---

*Guide créé le 5 Janvier 2026*  
*Projet FuturistCards - Production Ready* ✅

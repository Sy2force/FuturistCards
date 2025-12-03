# 🚀 Guide de Déploiement FuturistCards - Render + Vercel

## 📋 Configuration Backend (Render)

### 1. Variables d'Environnement Render Dashboard

Allez sur https://dashboard.render.com et configurez ces variables **EXACTEMENT** :

```bash
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
JWT_SECRET=cardpro_jwt_secret_2025_production_super_secure_key_with_at_least_256_characters_for_maximum_security
JWT_EXPIRES_IN=30d
CORS_ORIGIN=https://cardpro-2.vercel.app,https://cardpro-frontend.vercel.app,https://futurist-cards.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true
```

### 2. Configuration Render Build & Deploy

**Build Command:**
```bash
cd backend && npm ci --production=false
```

**Start Command:**
```bash
cd backend && npm start
```

**Health Check Path:**
```
/api/health
```

### 3. Test MongoDB Atlas

Avant de déployer, testez la connexion MongoDB :

```bash
cd backend
node test-mongodb.js
```

Si l'authentification échoue :
1. Allez sur MongoDB Atlas → Security → Database Access
2. Éditez l'utilisateur `S-User`
3. Cliquez "Edit Password" → nouveau mot de passe : `Sy2force`
4. Sauvegardez et attendez 1 minute

### 4. Structure Backend Requise

```
/backend
├── server.js          # Point d'entrée principal
├── package.json       # Scripts: start, dev, build
├── config/
│   └── db.js         # Connexion MongoDB
├── routes/
│   ├── auth.js       # Routes authentification
│   ├── cards.js      # Routes cartes
│   └── favorites.js  # Routes favoris
├── models/
│   ├── User.js       # Modèle utilisateur
│   ├── Card.js       # Modèle carte
│   └── Favorite.js   # Modèle favori
└── middleware/
    ├── authMiddleware.js
    └── errorHandler.js
```

## 💻 Configuration Frontend (Vercel)

### 1. Variables d'Environnement Vercel

Dans Vercel Dashboard → Settings → Environment Variables :

```bash
VITE_API_URL=https://cardpro-x3za.onrender.com/api
VITE_APP_NAME=CardPro
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
VITE_DEV_TOOLS=false
VITE_DEBUG=false
```

### 2. Configuration Build Vercel

- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### 3. Structure Frontend Requise

```
/frontend
├── index.html
├── package.json
├── vite.config.js
├── .env.production    # Variables production
├── vercel.json        # Config Vercel
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── services/
    │   └── api.js     # Client API avec axios
    └── pages/
        ├── HomePage.jsx
        ├── LoginPage.jsx
        └── SearchPage.jsx
```

## 🧪 Tests de Vérification

### Backend (Render)

```bash
# Test health endpoint
curl https://cardpro-x3za.onrender.com/api/health

# Réponse attendue:
{
  "success": true,
  "status": "OK",
  "environment": "production",
  "mongodb": {
    "connected": true,
    "ping": true
  }
}

# Test API cards
curl https://cardpro-x3za.onrender.com/api/cards
```

### Frontend (Vercel)

```bash
# Vérifier le déploiement
curl -I https://cardpro-2.vercel.app

# Dans la console du navigateur
console.log(import.meta.env.VITE_API_URL)
# Doit afficher: https://cardpro-x3za.onrender.com/api
```

## 🔍 Résolution des Problèmes

### Erreur "bad auth" MongoDB

```bash
# 1. Test local de connexion
cd backend
node test-mongodb.js "mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro"

# 2. Si erreur, réinitialiser le mot de passe sur Atlas
# MongoDB Atlas → Security → Database Access → Edit User → Update Password
```

### Erreur CORS

Vérifiez que `CORS_ORIGIN` sur Render inclut votre URL Vercel :

```bash
CORS_ORIGIN=https://cardpro-2.vercel.app,https://votre-app.vercel.app
```

### Port déjà utilisé

Le serveur détecte automatiquement le port depuis `process.env.PORT` ou utilise 10000 par défaut.

### Erreur 404 sur Vercel

Vérifiez que `vercel.json` contient :

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 📦 Scripts package.json Backend

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "NODE_ENV=development nodemon server.js",
    "build": "echo 'Backend built successfully'",
    "test:mongo": "node test-mongodb.js"
  }
}
```

## 🔄 Processus de Déploiement

### Backend Render

1. Push sur GitHub `main` branch
2. Render détecte automatiquement et déploie
3. Vérifier les logs : Dashboard → Logs
4. Tester : `curl https://cardpro-x3za.onrender.com/api/health`

### Frontend Vercel

1. Push sur GitHub `main` branch  
2. Vercel build automatiquement
3. Vérifier : https://cardpro-2.vercel.app
4. Ouvrir Console → Network → Vérifier appels vers Render

## ✅ Checklist Finale

- [ ] MongoDB Atlas : Utilisateur `S-User` avec mot de passe `Sy2force`
- [ ] MongoDB Atlas : Network Access → 0.0.0.0/0 autorisé
- [ ] Render : Variables d'environnement configurées
- [ ] Render : Health check `/api/health` retourne 200 OK
- [ ] Vercel : `VITE_API_URL` pointe vers Render
- [ ] Frontend : Appels API utilisent `import.meta.env.VITE_API_URL`
- [ ] CORS : Backend autorise l'origine Vercel
- [ ] Tests : MongoDB connection + API endpoints fonctionnels

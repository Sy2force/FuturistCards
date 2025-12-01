# 🚀 DÉPLOIEMENT COMPLET VERCEL - FRONTEND + BACKEND

## PLAN COMPLET VERCEL

### 1. BACKEND VERCEL
Créer un déploiement backend séparé sur Vercel

### 2. FRONTEND VERCEL  
Déployer le frontend avec la nouvelle URL backend Vercel

### 3. CONFIGURATION
Mettre à jour toutes les URLs et variables d'environnement

## ÉTAPES DÉTAILLÉES

### ÉTAPE 1: PRÉPARER BACKEND POUR VERCEL

#### A. Créer vercel.json pour backend
```json
{
  "version": 2,
  "name": "cardpro-backend",
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

#### B. Variables d'environnement backend Vercel
```
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro
JWT_SECRET=your-super-secret-jwt-key-here-2024
NODE_ENV=production
CORS_ORIGIN=https://cardpro-frontend.vercel.app
```

### ÉTAPE 2: DÉPLOYER BACKEND SUR VERCEL

1. **Vercel Dashboard**: https://vercel.com/dashboard
2. **Add New Project**
3. **Importer**: `Sy2force/CardPro`
4. **Root Directory**: `backend`
5. **Framework**: Other
6. **Build Command**: `npm install`
7. **Output Directory**: (laisser vide)
8. **Install Command**: `npm install`
9. **Ajouter variables d'environnement**
10. **Déployer**

### ÉTAPE 3: DÉPLOYER FRONTEND SUR VERCEL

1. **Nouveau projet Vercel**
2. **Importer**: `Sy2force/CardPro`
3. **Root Directory**: `frontend`
4. **Framework**: Vite
5. **Variables d'environnement**:
   ```
   VITE_API_URL=https://cardpro-backend.vercel.app/api
   VITE_APP_NAME=FuturistCards
   VITE_ENVIRONMENT=production
   ```
6. **Déployer**

### ÉTAPE 4: MISE À JOUR CORS

Mettre à jour le CORS du backend avec la nouvelle URL frontend:
```
CORS_ORIGIN=https://cardpro-frontend.vercel.app
```

## RÉSULTAT FINAL

- **Backend**: https://cardpro-backend.vercel.app/api
- **Frontend**: https://cardpro-frontend.vercel.app
- **Base de données**: MongoDB Atlas (inchangé)
- **Tout sur Vercel**: ✅

## AVANTAGES

1. **Performance**: Vercel CDN global
2. **Simplicité**: Un seul provider
3. **Intégration**: Git auto-deploy
4. **Gratuit**: Plan Hobby suffisant
5. **HTTPS**: Automatique

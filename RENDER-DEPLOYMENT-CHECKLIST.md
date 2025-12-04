# ✅ CHECKLIST DÉPLOIEMENT RENDER + VERCEL - FUTURISTCARDS

## 🎯 PLAN DE DÉPLOIEMENT COMPLET

### Phase 1: Backend sur Render

### Phase 2: Frontend sur Vercel

### Phase 3: Intégration et tests

## 🔧 BACKEND RENDER - Configuration prête

### ✅ Fichiers validés

- [x] `server.js` - Serveur principal avec logique universelle
- [x] `api/index.js` - Point d'entrée Vercel Functions
- [x] `vercel.json` - Configuration Vercel Functions simplifiée
- [x] `package.json` - Scripts compatibles Render/Vercel
- [x] Structure modulaire complète (models, controllers, routes, middleware)

### 🚀 ÉTAPES RENDER

**1. Variables d'environnement Render :**
```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters-long-2024
CORS_ORIGIN=*
```

**2. Configuration Render Dashboard :**
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Auto-Deploy: `Yes`

**3. Déploiement automatique :**
- Push sur GitHub déclenche le déploiement
- URL finale: `https://cardpro-xxx.onrender.com`

---

## 🌐 FRONTEND VERCEL - Configuration

### ✅ Fichiers validés

- [x] `vite.config.js` - Configuration Vite optimisée
- [x] `package.json` - Scripts de build
- [x] `.env.production` - Variables d'environnement
- [x] Structure React complète

### 🚀 ÉTAPES VERCEL

**1. Variables d'environnement Vercel :**
```env
VITE_API_URL=https://cardpro-xxx.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

**2. Configuration Vercel Dashboard :**
- Root Directory: `frontend`
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

**3. Déploiement :**
- Import depuis GitHub
- URL finale: `https://futuristcards-xxx.vercel.app`

---

## 🔗 INTÉGRATION FINALE

### ✅ Tests à effectuer

- [ ] Backend Render: `/api/health` retourne `mongodb: connected`
- [ ] Backend Render: `/api/cards` retourne les 5 cartes
- [ ] Frontend Vercel: Interface se charge correctement
- [ ] Frontend Vercel: API calls vers Render fonctionnent
- [ ] CORS configuré correctement

### 🎯 URLs finales attendues

- **Backend API**: `https://cardpro-xxx.onrender.com/api`
- **Frontend App**: `https://futuristcards-xxx.vercel.app`
- **MongoDB**: Base locale (développement) + Atlas (production)


#### 1. Paramètres Render Dashboard
```
Service Type: Web Service
Repository: Votre repo GitHub
Branch: main
Root Directory: backend
Runtime: Node.js
Build Command: npm install
Start Command: node server.js
```

#### 2. Variables d'environnement
```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters-long-2024
JWT_EXPIRE=30d
CORS_ORIGIN=*
```

#### 3. Après déploiement
- [ ] Tester `/api/health`
- [ ] Tester `/api/cards`
- [ ] Tester `/api/auth/register`
- [ ] Noter l'URL backend pour le frontend
- [ ] Mettre à jour CORS_ORIGIN avec l'URL frontend

## 🎯 URL attendue
`https://cardpro-backend-xxx.onrender.com/api`

Cette URL sera utilisée dans `VITE_API_URL` du frontend.

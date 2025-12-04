# ✅ CHECKLIST DÉPLOIEMENT RENDER - BACKEND

## 🔧 Configuration prête

### ✅ Fichiers validés
- [x] `server.js` - Serveur principal avec logique universelle
- [x] `api/index.js` - Point d'entrée Vercel Functions
- [x] `vercel.json` - Configuration Vercel Functions simplifiée
- [x] `package.json` - Scripts compatibles Render/Vercel
- [x] Structure modulaire complète (models, controllers, routes, middleware)

### 📋 Étapes de déploiement

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

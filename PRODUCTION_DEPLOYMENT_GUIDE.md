# 🚀 GUIDE DE DÉPLOIEMENT PRODUCTION - FuturistCards

## 📋 ÉTAPES COMPLÈTES DE DÉPLOIEMENT

### 1. PRÉPARATION DES FICHIERS

✅ **Fichiers de configuration créés :**
- `frontend/vercel.json` - Configuration SPA routing
- `DEPLOYMENT_FINAL_CHECKLIST.md` - Liste complète des vérifications
- `.env.example` mis à jour avec variables production

### 2. DÉPLOIEMENT VERCEL (Frontend)

**Configuration Dashboard Vercel :**
```
Project Name: futuristcards
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node.js Version: 18.x
```

**Variables d'environnement Vercel :**
```
VITE_API_URL=https://futuristcards.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=false
NODE_ENV=production
```

### 3. DÉPLOIEMENT RENDER (Backend)

**Configuration Service Render :**
```
Service Name: futuristcards-backend
Runtime: Node.js
Build Command: npm install
Start Command: npm start
Auto-Deploy: Yes
Node.js Version: 18
```

**Variables d'environnement Render :**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://[username]:[password]@[cluster].mongodb.net/futuristcards
JWT_SECRET=[votre-clé-jwt-sécurisée]
CORS_ORIGIN=https://futuristcards.vercel.app,https://futuristcards-*.vercel.app
```

### 4. CONFIGURATION MONGODB ATLAS

**Étapes requises :**
1. Créer cluster MongoDB Atlas
2. Configurer utilisateur database
3. Ajouter IP Render aux whitelist (0.0.0.0/0 pour tous)
4. Copier connection string dans MONGODB_URI

### 5. VÉRIFICATIONS POST-DÉPLOIEMENT

**Tests essentiels :**
- [ ] Frontend accessible sur Vercel URL
- [ ] Backend health check: `https://[render-url]/api/health`
- [ ] CORS fonctionne entre Vercel et Render
- [ ] Authentification complète (register/login/logout)
- [ ] CRUD cartes fonctionnel
- [ ] Système favoris opérationnel
- [ ] Navigation role-based correcte

## 🔧 COMMANDES DE DÉPLOIEMENT

### Push vers production :
```bash
git add .
git commit -m "🚀 Final production deployment configuration"
git push origin main
```

### Test API en production :
```bash
# Test health endpoint
curl https://futuristcards.onrender.com/api/health

# Test CORS
curl -H "Origin: https://futuristcards.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://futuristcards.onrender.com/api/auth/login
```

## 🚨 RÉSOLUTION PROBLÈMES COURANTS

### CORS Errors :
- Vérifier CORS_ORIGIN inclut tous domaines Vercel
- Vérifier credentials: false dans axios et backend

### Build Failures :
- Vérifier toutes dépendances dans package.json
- Vérifier Node.js version 18+

### API Timeouts :
- Render cold start peut prendre 30s+
- Augmenter timeout axios à 15s+

### 404 Routes :
- Vérifier vercel.json rewrites configuration
- Vérifier React Router configuration

## 📊 URLS FINALES

- **Frontend Production**: https://futuristcards.vercel.app
- **Backend Production**: https://futuristcards.onrender.com
- **API Health Check**: https://futuristcards.onrender.com/api/health
- **GitHub Repository**: https://github.com/Sy2force/FuturistCards

## ✅ STATUT DÉPLOIEMENT

**Configuration**: ✅ COMPLÈTE
**Fichiers**: ✅ PRÊTS
**Variables**: ✅ DOCUMENTÉES
**Tests**: ⏳ À EFFECTUER
**Production**: ⏳ EN COURS

---

**Prochaine étape**: Configurer les variables d'environnement sur Vercel et Render, puis tester le déploiement complet.

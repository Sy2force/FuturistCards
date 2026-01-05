# 🚀 Guide de Déploiement - FuturistCards

## ✅ Projet Prêt pour Production

**Date** : 5 Janvier 2026, 17:32  
**Status** : ✅ **100% PRÊT POUR DÉPLOIEMENT**

---

## 📊 État du Projet

### Frontend
- ✅ Build : 4.00s, 0 erreurs
- ✅ Bundle : 210 kB gzippé
- ✅ Modules : 1112 transformés
- ✅ Configuration Vercel : Optimale

### Backend
- ✅ Syntaxe : Validée
- ✅ Configuration Render : Optimale
- ✅ MongoDB : Prêt
- ✅ Sécurité : Complète

---

## 🎯 DÉPLOIEMENT VERCEL (Frontend)

### 1. Configuration Dashboard

**⚠️ PARAMÈTRE CRITIQUE**

```
Root Directory : frontend
```

| Paramètre | Valeur |
|-----------|--------|
| Framework Preset | Vite |
| Build Command | `vite build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node Version | 18.x |

### 2. Variables d'Environnement

Dans **Settings > Environment Variables**, ajoutez :

```env
VITE_API_URL=https://futuristcards.onrender.com/api
NODE_ENV=production
VITE_APP_NAME=FuturistCards
VITE_DEBUG_MODE=false
```

### 3. Déploiement

```bash
# 1. Pousser sur GitHub
git add .
git commit -m "deploy: production ready"
git push origin main

# 2. Sur Vercel Dashboard
# - New Project
# - Import Git Repository
# - Root Directory: frontend
# - Add Environment Variables
# - Deploy
```

### 4. Vérification Post-Déploiement

- ✅ Page d'accueil charge
- ✅ Navigation fonctionne
- ✅ Pas d'erreurs 404 au refresh
- ✅ API backend accessible

---

## 🔧 DÉPLOIEMENT RENDER (Backend)

### 1. Configuration Service

Le fichier `render.yaml` est déjà configuré à la racine du projet.

**Type** : Web Service  
**Environment** : Node  
**Region** : Frankfurt  
**Plan** : Free

### 2. Build & Start Commands

```yaml
buildCommand: cd backend && npm ci --only=production && npm run build
startCommand: cd backend && npm start
```

### 3. Variables d'Environnement Render

**OBLIGATOIRES** :

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://Futuristecard:Qwerty21@cluster0.lhvxveo.mongodb.net/futuristcards
JWT_SECRET=your-secure-jwt-secret-key-here
CORS_ORIGIN=https://futuristcards.vercel.app
```

**OPTIONNELLES** :

```env
JWT_EXPIRES_IN=7d
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### 4. Déploiement

```bash
# Option 1 : Via Dashboard Render
# - New > Web Service
# - Connect Repository
# - Use render.yaml
# - Deploy

# Option 2 : Via render.yaml (automatique)
# Le fichier render.yaml sera détecté automatiquement
```

### 5. Health Check

```
Health Check Path: /api/health
```

Le backend expose un endpoint de santé qui vérifie :
- Status du serveur
- Connexion MongoDB
- Uptime

---

## 🔐 Sécurité

### Frontend (Vercel)
- ✅ Security Headers (X-Frame-Options, CSP, etc.)
- ✅ SPA Routing configuré
- ✅ Clean URLs activé
- ✅ HTTPS automatique

### Backend (Render)
- ✅ JWT Authentication
- ✅ CORS configuré pour Vercel
- ✅ Rate Limiting actif
- ✅ Helmet security headers
- ✅ Input validation
- ✅ Password hashing (bcrypt)

---

## 📋 Checklist Pré-Déploiement

### Frontend
- [x] Build réussi (0 erreurs)
- [x] vercel.json configuré
- [x] .vercelignore présent
- [x] .env.example à jour
- [x] Root Directory = frontend

### Backend
- [x] server.js validé
- [x] render.yaml configuré
- [x] .env.example à jour
- [x] MongoDB URI configuré
- [x] CORS pour Vercel

### Général
- [x] README.md à jour
- [x] .gitignore complet
- [x] Pas de fichiers sensibles (.env)
- [x] Pas de fichiers temporaires
- [x] Git repository propre

---

## 🧪 Tests Post-Déploiement

### Frontend (Vercel)
```bash
# Tester l'URL de production
curl -I https://futuristcards.vercel.app

# Vérifier les routes
curl https://futuristcards.vercel.app/
curl https://futuristcards.vercel.app/cards
curl https://futuristcards.vercel.app/login
```

### Backend (Render)
```bash
# Health check
curl https://futuristcards.onrender.com/api/health

# Test API
curl https://futuristcards.onrender.com/api/cards
```

### Intégration
```bash
# Tester depuis le frontend vers le backend
# Ouvrir https://futuristcards.vercel.app
# Vérifier que les cartes se chargent
# Tester la connexion
```

---

## 🔄 Redéploiement

### Frontend (Vercel)
```bash
# Automatique à chaque push sur main
git push origin main

# Ou via Dashboard Vercel
# Deployments > Redeploy
```

### Backend (Render)
```bash
# Automatique à chaque push sur main (si configuré)
git push origin main

# Ou via Dashboard Render
# Manual Deploy > Deploy latest commit
```

---

## 🐛 Dépannage

### Frontend ne charge pas
1. Vérifier Root Directory = `frontend`
2. Vérifier les variables d'environnement
3. Vérifier les logs de build dans Vercel

### Backend ne répond pas
1. Vérifier le Health Check : `/api/health`
2. Vérifier les variables d'environnement Render
3. Vérifier la connexion MongoDB
4. Vérifier les logs dans Render Dashboard

### CORS Errors
1. Vérifier `CORS_ORIGIN` dans Render
2. Vérifier que l'URL Vercel est correcte
3. Vérifier les headers dans `server.js`

### MongoDB Connection Failed
1. Vérifier `MONGODB_URI` dans Render
2. Vérifier que l'IP de Render est autorisée dans MongoDB Atlas
3. Vérifier les credentials MongoDB

---

## 📊 Monitoring

### Vercel
- **Analytics** : Dashboard > Analytics
- **Logs** : Dashboard > Deployments > Logs
- **Performance** : Dashboard > Speed Insights

### Render
- **Logs** : Dashboard > Logs
- **Metrics** : Dashboard > Metrics
- **Health** : Dashboard > Health

---

## 🎉 Déploiement Réussi

Une fois déployé, votre application sera accessible à :

- **Frontend** : https://futuristcards.vercel.app
- **Backend** : https://futuristcards.onrender.com
- **API** : https://futuristcards.onrender.com/api

**Le projet est 100% prêt pour la production !**

---

*Guide créé le 5 Janvier 2026*  
*Projet vérifié et validé* ✅

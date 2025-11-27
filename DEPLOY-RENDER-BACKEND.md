# 🚀 GUIDE DÉPLOIEMENT BACKEND CARDPRO SUR RENDER

## 📋 PRÉREQUIS

1. **Compte Render** : https://render.com
2. **Repository GitHub** : https://github.com/Sy2force/CardPro.git
3. **Base de données MongoDB Atlas** (recommandée)

## ⚙️ CONFIGURATION AUTOMATIQUE

### 1. Fichiers déjà préparés ✅
- `render.yaml` : Configuration service Render
- `backend/.env.production` : Variables d'environnement
- `backend/server.js` : Port configuré pour Render (10000)

### 2. Structure de déploiement
```
├── render.yaml          # Configuration Render
├── backend/
│   ├── server.js        # Port 10000 configuré
│   ├── package.json     # Scripts de build/start
│   └── .env.production  # Variables template
```

## 🔧 ÉTAPES DE DÉPLOIEMENT

### Étape 1: Créer le service sur Render
1. Connectez-vous sur https://render.com
2. Cliquez **"New +"** → **"Web Service"**
3. Connectez votre repository GitHub `Sy2force/CardPro`
4. Sélectionnez la branche `main`

### Étape 2: Configuration automatique
Render détectera automatiquement le fichier `render.yaml` avec :
- **Name**: cardpro-backend
- **Environment**: Node
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Port**: 10000 (automatique)

### Étape 3: Variables d'environnement
Dans le Dashboard Render, ajoutez ces variables :

```bash
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/cardpro
JWT_SECRET=votre_super_secret_jwt_key_production_2024
JWT_EXPIRES_IN=30d
CORS_ORIGIN=https://votre-frontend.com
```

### Étape 4: Base de données MongoDB Atlas
1. Créez un cluster sur https://cloud.mongodb.com
2. Obtenez votre connection string
3. Ajoutez-la dans `MONGODB_URI` sur Render

## 🌐 ENDPOINTS DISPONIBLES

Une fois déployé, votre backend sera accessible :
- **URL**: `https://cardpro-backend.onrender.com`
- **Health Check**: `https://cardpro-backend.onrender.com/api/health`
- **API Auth**: `https://cardpro-backend.onrender.com/api/auth`
- **API Cards**: `https://cardpro-backend.onrender.com/api/cards`

## 🔍 VÉRIFICATION POST-DÉPLOIEMENT

```bash
# Test de santé
curl https://cardpro-backend.onrender.com/api/health

# Test API
curl -X POST https://cardpro-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

## 🚨 SÉCURITÉ PRODUCTION

Variables critiques configurées :
- ✅ JWT_SECRET sécurisé
- ✅ CORS restreint aux domaines autorisés
- ✅ Rate limiting activé
- ✅ Helmet security headers
- ✅ Compression activée
- ✅ Logs de sécurité

## 📊 MONITORING

Render fournit automatiquement :
- **Logs en temps réel**
- **Métriques de performance**
- **Health checks automatiques**
- **Auto-redémarrage en cas d'erreur**

## 🔄 DÉPLOIEMENT CONTINU

- ✅ Auto-deploy activé sur push vers `main`
- ✅ Build automatique à chaque commit
- ✅ Zero-downtime deployment

---

**🎯 Une fois déployé, mettez à jour l'URL backend dans votre frontend local :**
```javascript
// frontend/src/services/api.js
const API_BASE_URL = 'https://cardpro-backend.onrender.com/api';
```

# 🔧 Configuration des Fichiers d'Environnement Frontend

## 📝 Fichier `.env` (Développement Local)

Créez un fichier `.env` dans le dossier `/frontend` avec ce contenu exact :

```env
# ===========================================
# CARDPRO - FRONTEND LOCAL DEVELOPMENT
# ===========================================

# 🌐 API Configuration
VITE_API_URL=http://localhost:10000/api

# 🎨 Application
VITE_APP_NAME=CardPro
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=development

# 🔧 Development
VITE_DEV_TOOLS=true
VITE_DEBUG=true
```

## 📦 Fichier `.env.production` (Production Vercel)

Ce fichier est déjà configuré et prêt :

```env
# ===========================================
# CARDPRO - FRONTEND PRODUCTION (VERCEL)
# ===========================================

# 🌐 API Configuration
VITE_API_URL=https://cardpro-x3za.onrender.com/api

# 🎨 Application
VITE_APP_NAME=CardPro
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production

# 🔧 Production
VITE_DEV_TOOLS=false
VITE_DEBUG=false
```

## ✅ Configuration Vite (`vite.config.js`)

Les modifications suivantes ont été appliquées :

```javascript
server: {
  port: 3010,
  strictPort: false, // Permet de basculer sur un autre port si 3010 est occupé
  host: '0.0.0.0',
  open: false,
  cors: true,
  hmr: {
    overlay: true,
    port: 3011 // Port HMR séparé pour éviter les conflits
  }
  // Pas de proxy - on utilise VITE_API_URL directement
}
```

## 🚀 Configuration Vercel (`vercel.json`)

Le fichier est correctement configuré avec :
- Framework: `vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Rewrites pour SPA routing
- Headers de sécurité

## 📋 Instructions d'Installation

### 1. Développement Local

```bash
# Dans le dossier frontend
cd frontend

# Copier .env.example vers .env
cp .env.example .env

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

Le frontend sera accessible sur : `http://localhost:3010`

### 2. Production sur Vercel

```bash
# Les variables sont déjà dans .env.production
# Pousser sur GitHub déclenchera le déploiement automatique

git add .
git commit -m "Configure frontend environment"
git push origin main
```

### 3. Variables d'Environnement Vercel Dashboard

Si vous devez configurer manuellement sur Vercel :

1. Allez dans Project Settings → Environment Variables
2. Ajoutez ces variables pour Production :

```
VITE_API_URL = https://cardpro-x3za.onrender.com/api
VITE_APP_NAME = CardPro
VITE_APP_VERSION = 1.0.0
VITE_ENVIRONMENT = production
VITE_DEV_TOOLS = false
VITE_DEBUG = false
```

## 🔍 Vérification

### Test Local
```bash
# Vérifier que l'API est accessible
curl http://localhost:10000/api/health

# Vérifier les variables d'environnement
npm run dev
# Ouvrir la console du navigateur et taper :
# console.log(import.meta.env.VITE_API_URL)
```

### Test Production
```bash
# Vérifier l'API Render
curl https://cardpro-x3za.onrender.com/api/health

# Après déploiement Vercel
# Vérifier dans les Network Tools que les appels vont bien vers l'API Render
```

## ⚠️ Résolution des Problèmes

### Port 3010 déjà utilisé
Le serveur basculera automatiquement sur le prochain port disponible (3011, 3012, etc.)

### Erreurs CORS
- Vérifiez que le backend autorise bien l'origine du frontend
- En développement : `http://localhost:3010`
- En production : `https://[votre-app].vercel.app`

### API non accessible
- Vérifiez que le backend est bien démarré sur le port 10000
- Vérifiez la valeur de `VITE_API_URL` dans `.env`

## 📌 Notes Importantes

1. **Ne jamais commiter `.env`** - il est dans `.gitignore`
2. **`.env.production`** est versionné car il ne contient pas de secrets
3. **Vercel** lira automatiquement `.env.production` lors du build
4. **Les variables VITE_*** sont exposées au client** - ne jamais y mettre de secrets

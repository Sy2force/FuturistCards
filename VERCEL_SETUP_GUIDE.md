# Guide de Configuration Vercel pour FuturistCards

## Problème actuel
Erreur `DEPLOYMENT_NOT_FOUND` - Le projet n'est pas correctement configuré dans Vercel Dashboard.

## Solution étape par étape

### 1. Accéder au Dashboard Vercel
- Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
- Se connecter avec votre compte GitHub

### 2. Importer le projet
- Cliquer sur "Add New..." → "Project"
- Sélectionner "Import Git Repository"
- Chercher et sélectionner `Sy2force/FuturistCards`

### 3. Configuration du projet
```
Framework Preset: Other
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm ci
Node.js Version: 24.x
```

### 4. Variables d'environnement
Ajouter dans les Environment Variables :
```
VITE_API_URL=https://futuristcards.onrender.com/api
VITE_API_BASE_URL=https://futuristcards.onrender.com/api
NODE_ENV=production
```

### 5. Déployer
- Cliquer sur "Deploy"
- Le déploiement devrait réussir avec la configuration Node.js 24.x

## Fichiers de configuration présents
- ✅ `/vercel.json` (racine du projet)
- ✅ `/frontend/vercel.json` (dossier frontend)
- ✅ `/frontend/.nvmrc` (Node 24)
- ✅ `/frontend/package.json` (engines: node 24.x)

## Vérification
Une fois déployé, l'application sera accessible sur :
`https://futuristcards.vercel.app`

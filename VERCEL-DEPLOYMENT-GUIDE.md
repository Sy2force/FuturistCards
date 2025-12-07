# Guide de Déploiement Vercel - FuturistCards

## Configuration Port 3010 Forcé ✅

Le projet est maintenant configuré pour utiliser **uniquement le port 3010** :

### Modifications Appliquées :
- `package.json` : `"dev": "vite --port 3010 --host"`
- `vite.config.js` : `strictPort: true` (force le port 3010, échoue si occupé)
- `preview` : Port 3010 également forcé

## Déploiement Vercel Frontend

### 1. Configuration Vercel Dashboard

**Paramètres Projet :**
```
Framework: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2. Variables d'Environnement Vercel

**Variables à ajouter dans Vercel Dashboard :**
```env
VITE_API_URL=https://cardpro-21dj.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

### 3. Configuration vercel.json ✅

Le fichier `frontend/vercel.json` est correctement configuré :
- SPA routing avec rewrites
- Headers de sécurité
- Cache optimisé pour assets

## Backend Render (Actuel)

**URL Backend :** https://cardpro-21dj.onrender.com/api

Le backend Render est opérationnel et configuré pour accepter les requêtes du frontend Vercel.

## Étapes de Déploiement

### 1. Créer Projet Vercel
1. Aller sur vercel.com
2. "New Project" → Importer depuis GitHub
3. Sélectionner le repo CardPro
4. **Important :** Root Directory = `frontend`

### 2. Configuration
- Framework : Vite (détection automatique)
- Build Command : `npm run build`
- Output Directory : `dist`

### 3. Variables d'Environnement
Ajouter les 3 variables listées ci-dessus dans Settings → Environment Variables

### 4. Déployer
- Deploy → Attendre le build
- Tester l'URL générée

## Résolution d'Erreurs Communes

### Erreur 404 NOT_FOUND
- **Cause :** Root Directory incorrect
- **Solution :** Vérifier que Root Directory = `frontend`

### Network Error
- **Cause :** VITE_API_URL incorrect
- **Solution :** Vérifier l'URL backend dans les variables d'environnement

### Build Failed
- **Cause :** Dépendances manquantes
- **Solution :** Vérifier package.json et node_modules

## Architecture Finale

```
Frontend Vercel: https://[project-name].vercel.app
Backend Render:  https://cardpro-21dj.onrender.com/api
Database:        MongoDB Atlas
```

## Test Post-Déploiement

1. **Connexion :** Tester login avec `test@example.com` / `Test123!`
2. **Redirection :** Vérifier redirection vers `/cards`
3. **API :** Vérifier chargement des cartes utilisateur
4. **Navigation :** Tester toutes les pages

## Statut

- ✅ Port 3010 forcé
- ✅ Configuration Vercel optimisée  
- ✅ Variables d'environnement préparées
- ✅ Backend Render opérationnel
- ✅ Prêt pour déploiement Vercel

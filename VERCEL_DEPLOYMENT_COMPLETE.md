# 🚀 Guide de Déploiement Vercel Complet

## 📋 Étapes pour un Déploiement Réussi

### 1. Configuration Vercel
1. Aller sur [vercel.com](https://vercel.com)
2. Connecter avec GitHub
3. Importer le projet `Sy2force/FuturistCards`

### 2. Paramètres du Projet
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm ci
```

### 3. Variables d'Environnement Vercel
```env
VITE_API_URL=https://futuristcards.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true
NODE_ENV=production
```

### 4. Configuration Backend (Render)
Le backend est déjà configuré pour accepter les requêtes de Vercel :

```javascript
const allowedOrigins = [
  'https://futuristcards.vercel.app',
  /^https:\/\/futuristcards-.*\.vercel\.app$/,
  /^https:\/\/.*--futuristcards\.vercel\.app$/
];
```

### 5. Vérifications Post-Déploiement

#### ✅ Frontend (Vercel)
- [ ] Site accessible sur `https://futuristcards.vercel.app`
- [ ] Pages se chargent sans erreur 404
- [ ] Routing fonctionne (SPA)
- [ ] Assets CSS/JS chargés

#### ✅ Backend (Render)
- [ ] API accessible sur `https://futuristcards.onrender.com/api`
- [ ] Endpoint health: `GET /api/health`
- [ ] CORS configuré pour Vercel

#### ✅ Connexion Frontend-Backend
- [ ] Login/Register fonctionne
- [ ] Requêtes API passent
- [ ] Pas d'erreurs CORS dans console
- [ ] Authentification JWT fonctionne

### 6. Tests de Fonctionnalité
1. **Authentification**
   - Inscription nouvel utilisateur
   - Connexion utilisateur existant
   - Déconnexion

2. **Cartes de Visite**
   - Création nouvelle carte
   - Modification carte existante
   - Suppression carte
   - Visualisation cartes

3. **Navigation**
   - Toutes les pages accessibles
   - Redirections role-based
   - Pages protégées

### 7. Monitoring
- **Vercel Analytics**: Activé pour performance
- **Error Tracking**: Console browser pour erreurs
- **API Monitoring**: Logs Render pour backend

## 🔧 Dépannage

### Erreur CORS
Si erreurs CORS, vérifier :
1. URL Vercel dans `allowedOrigins` backend
2. Variables d'environnement `VITE_API_URL`

### Page Blanche
Si page blanche :
1. Vérifier `vercel.json` rewrites
2. Console browser pour erreurs JS
3. Build assets générés correctement

### API Non Accessible
Si API ne répond pas :
1. Vérifier Render service actif
2. Tester endpoint health directement
3. Vérifier variables d'environnement backend

## 🎯 URLs Finales
- **Frontend**: https://futuristcards.vercel.app
- **Backend**: https://futuristcards.onrender.com
- **API**: https://futuristcards.onrender.com/api

## ✅ Checklist Finale
- [ ] Vercel déployé avec succès
- [ ] Render backend actif
- [ ] Variables d'environnement configurées
- [ ] CORS fonctionnel
- [ ] Site entièrement fonctionnel
- [ ] Tests utilisateur passés

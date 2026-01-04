# 🚀 Guide de Déploiement FuturistCards

## Vue d'ensemble
Ce guide vous accompagne dans le déploiement complet de l'application FuturistCards sur les plateformes de production.

## Architecture de Déploiement
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Base de données**: MongoDB Atlas

## 📋 Prérequis

### Comptes requis
- [Vercel](https://vercel.com) - Déploiement frontend
- [Render](https://render.com) - Déploiement backend
- [MongoDB Atlas](https://cloud.mongodb.com) - Base de données

### Repository GitHub
- Repository public ou privé avec le code source
- Accès push pour déclencher les déploiements automatiques

## 🎯 Étape 1: Déploiement Backend (Render)

### 1.1 Configuration Render
1. Connectez-vous à [Render](https://render.com)
2. Cliquez sur "New +" → "Web Service"
3. Connectez votre repository GitHub
4. Configurez le service :
   - **Name**: `futuristcards-backend`
   - **Region**: `Frankfurt` (ou votre région préférée)
   - **Branch**: `main`
   - **Root Directory**: `./` (racine du projet)
   - **Build Command**: `cd backend && npm ci --only=production && npm run build`
   - **Start Command**: `cd backend && npm start`

### 1.2 Variables d'environnement Render
Ajoutez ces variables dans l'onglet "Environment" :

```env
NODE_ENV=production
PORT=10000
CLIENT_URL=https://futuristcards.vercel.app
CLIENT_URL_PROD=https://futuristcards.vercel.app
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futuristcards
JWT_SECRET=your-super-secure-jwt-secret-key-here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key-here
JWT_REFRESH_EXPIRES_IN=30d
CORS_ORIGIN=https://futuristcards.vercel.app
CORS_ORIGIN_PROD=https://futuristcards.vercel.app
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
ENABLE_REGISTRATION=true
ENABLE_RATE_LIMITING=true
LOG_LEVEL=info
```

### 1.3 Configuration MongoDB Atlas
1. Créez un cluster MongoDB Atlas
2. Créez un utilisateur de base de données
3. Configurez l'accès réseau (0.0.0.0/0 pour Render)
4. Copiez la chaîne de connexion dans `MONGODB_URI`

## 🎯 Étape 2: Déploiement Frontend (Vercel)

### 2.1 Configuration Vercel
1. Connectez-vous à [Vercel](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub
4. Configurez le projet :
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm ci`

### 2.2 Variables d'environnement Vercel
Ajoutez ces variables dans l'onglet "Settings" → "Environment Variables" :

```env
VITE_API_URL=https://futuristcards-backend.onrender.com/api
VITE_API_BASE_URL=https://futuristcards-backend.onrender.com/api
VITE_APP_NAME=FuturistCards
NODE_ENV=production
```

## 🔧 Configuration des Domaines

### Backend URL
Votre backend sera accessible à :
```
https://futuristcards-backend.onrender.com
```

### Frontend URL
Votre frontend sera accessible à :
```
https://futuristcards.vercel.app
```

## ✅ Vérification du Déploiement

### 1. Test Backend
```bash
curl https://futuristcards-backend.onrender.com/api/health
```
Réponse attendue :
```json
{
  "success": true,
  "status": "OK",
  "mongodb": "connected",
  "environment": "production"
}
```

### 2. Test Frontend
Visitez `https://futuristcards.vercel.app` et vérifiez :
- ✅ Page d'accueil se charge
- ✅ Navigation fonctionne
- ✅ Connexion/inscription possible
- ✅ API calls fonctionnent

## 🔄 Déploiements Automatiques

### Render
- Déploiement automatique sur push vers `main`
- Logs disponibles dans le dashboard Render
- Redémarrage automatique en cas d'erreur

### Vercel
- Déploiement automatique sur push vers `main`
- Preview deployments sur les pull requests
- Logs disponibles dans le dashboard Vercel

## 🛠️ Dépannage

### Erreurs communes

#### Backend ne démarre pas
1. Vérifiez les logs Render
2. Vérifiez la variable `MONGODB_URI`
3. Vérifiez que le port 10000 est utilisé

#### Frontend ne se connecte pas au backend
1. Vérifiez `VITE_API_URL` dans Vercel
2. Vérifiez CORS dans le backend
3. Vérifiez que le backend est déployé et accessible

#### Erreurs MongoDB
1. Vérifiez la chaîne de connexion
2. Vérifiez l'accès réseau (IP whitelist)
3. Vérifiez les credentials utilisateur

### Commandes utiles

```bash
# Test local avant déploiement
npm run build  # Frontend
npm start      # Backend

# Vérification des variables d'environnement
echo $VITE_API_URL
echo $MONGODB_URI
```

## 📊 Monitoring

### Render
- Health checks automatiques sur `/api/health`
- Métriques de performance disponibles
- Alertes en cas de downtime

### Vercel
- Analytics intégrées
- Métriques Core Web Vitals
- Monitoring des erreurs

## 🔐 Sécurité

### Variables sensibles
- Utilisez des secrets forts pour JWT
- Ne commitez jamais les fichiers `.env`
- Rotez régulièrement les secrets

### CORS
- Configuré pour accepter uniquement le domaine frontend
- Pas de wildcard (*) en production

### Rate Limiting
- 100 requêtes par 15 minutes par IP
- Protection contre les attaques DDoS

## 📝 Maintenance

### Mises à jour
1. Testez localement
2. Pushez vers une branche de test
3. Vérifiez le preview deployment
4. Mergez vers `main`

### Backups
- MongoDB Atlas : backups automatiques
- Code source : sauvegardé sur GitHub
- Configurations : documentées dans ce guide

---

## 🎉 Félicitations !

Votre application FuturistCards est maintenant déployée et accessible en production !

- **Frontend** : https://futuristcards.vercel.app
- **Backend** : https://futuristcards-backend.onrender.com
- **API** : https://futuristcards-backend.onrender.com/api

Pour toute question ou problème, consultez les logs des plateformes respectives.

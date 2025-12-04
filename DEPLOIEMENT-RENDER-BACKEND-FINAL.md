# 🚀 DÉPLOIEMENT BACKEND RENDER - FUTURISTCARDS

## 📋 Configuration Render pour le backend restructuré

### 🔧 Paramètres de déploiement

**Service Settings :**
- **Type** : Web Service
- **Repository** : Connecter votre repo GitHub
- **Branch** : main
- **Root Directory** : `backend`
- **Runtime** : Node.js
- **Build Command** : `npm install`
- **Start Command** : `node server-final.js`
- **Instance Type** : Free tier (ou Starter pour production)

### 🌍 Variables d'environnement Render

Configurer ces variables dans Render Dashboard → Environment :

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters-long-2024
JWT_EXPIRE=30d
CORS_ORIGIN=https://votre-frontend.vercel.app
```

### 📦 Configuration package.json

Vérifier que le `package.json` backend contient :

```json
{
  "name": "cardpro-backend",
  "version": "1.0.0",
  "main": "server-final.js",
  "scripts": {
    "start": "node server-final.js",
    "dev": "NODE_ENV=development nodemon server-final.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## 🔗 Étapes de déploiement

### 1. Préparer le repository
```bash
# S'assurer que le code est pushé
git add .
git commit -m "Backend restructuré pour Render"
git push origin main
```

### 2. Créer le service Render
1. Aller sur [render.com](https://render.com)
2. Connecter votre compte GitHub
3. Cliquer "New +" → "Web Service"
4. Sélectionner votre repository
5. Configurer les paramètres :
   - **Name** : `cardpro-backend`
   - **Root Directory** : `backend`
   - **Environment** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `node server-final.js`

### 3. Configurer les variables d'environnement
Dans l'onglet "Environment" du service :

| Variable | Valeur |
|----------|--------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `MONGO_URI` | `mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority` |
| `JWT_SECRET` | `your-super-secret-jwt-key-here-minimum-32-characters-long-2024` |
| `JWT_EXPIRE` | `30d` |
| `CORS_ORIGIN` | `*` (temporaire, à changer après déploiement frontend) |

### 4. Déployer
1. Cliquer "Create Web Service"
2. Attendre le build et déploiement (5-10 minutes)
3. Noter l'URL générée : `https://cardpro-backend-xxx.onrender.com`

## 🧪 Tests de validation

### 1. Health Check
```bash
curl https://cardpro-backend-xxx.onrender.com/api/health
```

**Réponse attendue :**
```json
{
  "success": true,
  "message": "Server is healthy",
  "timestamp": "2024-12-04T06:42:47.000Z",
  "environment": "production",
  "mongodb": "connected",
  "version": "1.0.0"
}
```

### 2. Test endpoints
```bash
# Test cartes
curl https://cardpro-backend-xxx.onrender.com/api/cards

# Test inscription
curl -X POST https://cardpro-backend-xxx.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🔧 Configuration frontend

Une fois le backend déployé, mettre à jour le frontend :

### 1. Mettre à jour .env.production
```env
VITE_API_URL=https://cardpro-backend-xxx.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

### 2. Mettre à jour CORS_ORIGIN sur Render
Après déploiement du frontend, mettre à jour la variable :
```env
CORS_ORIGIN=https://votre-frontend.vercel.app
```

## 🚨 Dépannage

### Problèmes courants

#### 1. Build failed
**Erreur** : `npm install` échoue
**Solution** : Vérifier `package.json` et `package-lock.json`

#### 2. Start command failed
**Erreur** : `node server-final.js` ne démarre pas
**Solution** : Vérifier que le fichier existe et les imports

#### 3. MongoDB connection failed
**Erreur** : Connection timeout
**Solution** : Vérifier `MONGO_URI` et whitelist IP `0.0.0.0/0`

#### 4. CORS errors
**Erreur** : Blocked by CORS policy
**Solution** : Mettre à jour `CORS_ORIGIN` avec l'URL frontend

### Logs de débogage
```bash
# Voir les logs Render
# Dashboard → Service → Logs tab

# Vérifier les variables d'environnement
# Dashboard → Service → Environment tab
```

## 📊 Monitoring

### Métriques Render
- **CPU Usage** : Surveillance automatique
- **Memory Usage** : Limite 512MB (free tier)
- **Response Time** : Objectif < 500ms
- **Uptime** : 99.9% visé

### Logs importants
```bash
✅ Base de données connectée
🚀 Serveur démarré sur le port 10000
🏥 Health check: https://cardpro-backend-xxx.onrender.com/api/health
🌍 Environnement: production
🔐 CORS Origins: https://votre-frontend.vercel.app
```

## 🔄 Redéploiement

### Mise à jour automatique
- Push sur `main` → Redéploiement automatique
- Temps de build : 3-5 minutes
- Zero downtime deployment

### Mise à jour manuelle
1. Dashboard → Service
2. "Manual Deploy" → "Deploy latest commit"
3. Attendre le build

## 🎯 Résultat attendu

Après déploiement réussi :
- ✅ Backend accessible sur `https://cardpro-backend-xxx.onrender.com`
- ✅ API endpoints fonctionnels
- ✅ MongoDB connecté
- ✅ CORS configuré
- ✅ Logs propres sans erreurs

**URL finale** : `https://cardpro-backend-xxx.onrender.com/api`

Cette URL sera utilisée dans `VITE_API_URL` pour le frontend.

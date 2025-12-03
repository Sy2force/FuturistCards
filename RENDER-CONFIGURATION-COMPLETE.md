# 🚀 CONFIGURATION RENDER COMPLÈTE - DEVOPS EXPERT

## 📋 Variables d'environnement pour Render Dashboard

### Copiez-collez ces variables dans Render → Environment :

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority&appName=CardPro
JWT_SECRET=your-super-secret-jwt-key-here-2024-production
JWT_EXPIRES_IN=30d
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true
```

## ⚙️ Configuration du service Render

```yaml
Name: cardpro-backend
Runtime: Node
Region: Oregon (US West)
Branch: main
Root Directory: backend
Build Command: npm ci --production=false
Start Command: npm start
Auto-Deploy: Yes
```

## 🔧 Corrections appliquées

### ✅ 1. Conflits gestionnaires supprimés
- Supprimé `yarn.lock` du backend
- Ajouté `.npmrc` pour forcer npm
- Garde `package-lock.json` existant

### ✅ 2. Variables d'environnement optimisées
- MongoDB URI avec `appName=CardPro`
- JWT_SECRET renforcé pour production
- CORS temporairement `*` (à changer après)
- Rate limiting configuré

### ✅ 3. Server.js sécurisé
- Gestion d'erreurs MongoDB améliorée
- Mode MOCK si pas de MONGO_URI
- Health check complet avec ping MongoDB
- Logs détaillés pour debugging

## 🌐 Configuration Frontend Vercel

### Variables à ajouter dans Vercel Dashboard :

```env
VITE_API_URL=https://cardpro-1.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

## 🔄 Étapes de déploiement

### 1. Sur Render (maintenant) :
1. Dashboard → Environment Variables
2. Ajouter toutes les variables ci-dessus
3. Save Changes → Redéploiement automatique

### 2. Test backend :
```bash
curl https://cardpro-1.onrender.com/api/health
```

### 3. Sur Vercel :
1. Settings → Environment Variables
2. Ajouter `VITE_API_URL=https://cardpro-1.onrender.com/api`
3. Deployments → Redeploy (sans cache)

### 4. Finaliser CORS :
Une fois Vercel déployé, remplacer dans Render :
```env
CORS_ORIGIN=https://votre-app.vercel.app
```

## 🧪 Tests de validation

### Backend health check :
```bash
curl -X GET https://cardpro-1.onrender.com/api/health \
  -H "Content-Type: application/json"
```

### Test CORS depuis frontend :
```javascript
fetch('https://cardpro-1.onrender.com/api/health')
  .then(res => res.json())
  .then(data => console.log(data))
```

## 🚨 Points critiques

1. **MongoDB Atlas** : Vérifier que l'IP `0.0.0.0/0` est whitelistée
2. **JWT_SECRET** : Changer en production avec une vraie clé secrète
3. **CORS** : Remplacer `*` par l'URL Vercel exacte après déploiement
4. **Port** : Render utilise automatiquement le PORT=10000

## 📊 Monitoring

### Logs Render à surveiller :
- ✅ `MongoDB Connected successfully`
- ✅ `Serveur démarré avec succès`
- ❌ `MONGO_URI n'est pas défini` → Variables manquantes

### Health check attendu :
```json
{
  "success": true,
  "status": "OK",
  "mongodb": {
    "connected": true,
    "ping": true,
    "status": "Connected"
  }
}
```

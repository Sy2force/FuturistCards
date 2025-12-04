# 🚀 ARCHITECTURE VERCEL FUNCTIONS - BACKEND

## 📁 Structure optimisée

```
backend/
├── api/
│   └── index.js          # Point d'entrée Vercel Functions
├── server.js             # Application Express (export app)
├── vercel.json           # Configuration Vercel simplifiée
└── package.json          # Scripts pour Render et Vercel
```

## 🔧 Configuration Vercel Functions

### 1. Point d'entrée `/api/index.js`
```javascript
// Point d'entrée pour Vercel Functions
const app = require('../server');

module.exports = app;
```

### 2. Serveur Express `/server.js`
```javascript
// Logique de démarrage intelligente
if (require.main === module) {
  // Mode Render ou local - démarre le serveur
  startServer();
}

// Export pour Vercel Functions
module.exports = app;
```

### 3. Configuration `/vercel.json`
```json
{
  "version": 2,
  "functions": {
    "api/index.js": {
      "runtime": "nodejs18.x",
      "maxDuration": 30
    }
  }
}
```

## 🎯 Avantages de cette architecture

### ✅ Compatibilité multi-plateforme
- **Vercel** : Functions serverless via `/api/index.js`
- **Render** : Serveur traditionnel via `server.js`
- **Local** : Développement avec `npm run dev`

### ✅ Logique de démarrage intelligente
```javascript
if (require.main === module) {
  startServer(); // Démarre seulement si exécuté directement
}
```

### ✅ Configuration simplifiée
- Pas de `builds` ou `routes` complexes
- Vercel détecte automatiquement `/api/index.js`
- Configuration minimale dans `vercel.json`

## 🚀 Déploiement

### Vercel
```bash
# Déploiement backend
cd backend
vercel --prod

# Variables d'environnement
MONGO_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://frontend.vercel.app
```

### Render (alternative)
```bash
# Configuration Render
Build Command: npm install
Start Command: node server.js
Root Directory: backend
```

## 🧪 Tests

### Endpoints disponibles
```bash
# Health check
GET /api/health

# Cards
GET /api/cards

# Auth
POST /api/auth/login
POST /api/auth/register
```

### Test local
```bash
cd backend
npm run dev
curl http://localhost:5001/api/health
```

### Test Vercel
```bash
curl https://backend.vercel.app/api/health
```

## 📊 Résultat

Architecture **universelle** qui fonctionne sur :
- ✅ Vercel Functions (serverless)
- ✅ Render (serveur traditionnel)  
- ✅ Local (développement)

**Un seul code, trois environnements !**

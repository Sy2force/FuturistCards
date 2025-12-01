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
MONGO_URI=mongodb+srv://S-User:bg1skvf3eZmQdLNh@cluster0.lhvxveo.mongodb.net/cardpro?appName=Cluster0
JWT_SECRET=super_secret_key_cardpro_2025_production_256_chars_minimum
JWT_EXPIRES_IN=30d
CORS_ORIGIN=https://cardpro-2.vercel.app
```

### Étape 4: Base de données MongoDB Atlas
1. Créez un cluster sur https://cloud.mongodb.com
2. Obtenez votre connection string
3. Ajoutez-la dans `MONGO_URI` sur Render

## 🌐 ENDPOINTS DISPONIBLES

Une fois déployé, votre backend sera accessible :

### **Base URL**: `https://cardpro-2.onrender.com`

#### 🏥 **Health Check**
```bash
GET /api/health
```
**Réponse attendue:**
```json
{
  "success": true,
  "mongodb": true,
  "status": "OK",
  "message": "Server is running",
  "database": {
    "status": "Connected",
    "name": "cardpro",
    "host": "cluster0.lhvxveo.mongodb.net"
  },
  "uptime": 123.45,
  "timestamp": "2025-11-28T00:00:00.000Z"
}
```

#### 🔐 **Authentication**
```bash
# Login
POST /api/auth/login
Content-Type: application/json
{
  "email": "test@demo.com",
  "password": "Demo1234!"
}

# Register
POST /api/auth/register
Content-Type: application/json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123!",
  "phone": "+33123456789"
}

# Get current user
GET /api/auth/me
Authorization: Bearer <token>
```

#### 🃏 **Cards Management**
```bash
# Get all cards
GET /api/cards
GET /api/cards?page=1&limit=10&search=developer

# Get card by ID
GET /api/cards/:id

# Create card (authenticated)
POST /api/cards
Authorization: Bearer <token>
Content-Type: application/json
{
  "title": "John Doe - Developer",
  "subtitle": "Full Stack Developer",
  "description": "Experienced developer...",
  "phone": "+33123456789",
  "email": "john@example.com",
  "category": "Technology"
}

# Update card (authenticated)
PUT /api/cards/:id
Authorization: Bearer <token>

# Delete card (authenticated)
DELETE /api/cards/:id
Authorization: Bearer <token>
```

#### ⭐ **Favorites**
```bash
# Get user favorites
GET /api/favorites
Authorization: Bearer <token>

# Add to favorites
POST /api/favorites
Authorization: Bearer <token>
Content-Type: application/json
{
  "cardId": "card_id_here"
}

# Remove from favorites
DELETE /api/favorites/:cardId
Authorization: Bearer <token>
```

#### 👤 **Users**
```bash
# Get current user profile
GET /api/users/me
Authorization: Bearer <token>

# Update user profile
PUT /api/users/me
Authorization: Bearer <token>
Content-Type: application/json
{
  "firstName": "John",
  "lastName": "Doe Updated"
}
```

## 🧪 TESTS POST-DÉPLOIEMENT

### Test Health Check
```bash
curl https://cardpro-2.onrender.com/api/health
```

### Test Authentication
```bash
# Test login
curl -X POST https://cardpro-2.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@demo.com","password":"Demo1234!"}'

# Test register
curl -X POST https://cardpro-2.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"Test",
    "lastName":"User",
    "email":"newuser@test.com",
    "password":"Password123!",
    "phone":"+33123456789"
  }'
```

### Test Cards API
```bash
# Get all cards
curl https://cardpro-2.onrender.com/api/cards

# Get cards with pagination
curl "https://cardpro-2.onrender.com/api/cards?page=1&limit=5"

# Search cards
curl "https://cardpro-2.onrender.com/api/cards?search=developer"
```

### Test avec Token (après login)
```bash
# Récupérer le token depuis la réponse login
TOKEN="your_jwt_token_here"

# Test user profile
curl -H "Authorization: Bearer $TOKEN" \
  https://cardpro-2.onrender.com/api/users/me

# Test favorites
curl -H "Authorization: Bearer $TOKEN" \
  https://cardpro-2.onrender.com/api/favorites
```

## 🚨 TROUBLESHOOTING

### Erreur: "mongoose is not defined"
**Cause**: Variables d'environnement non configurées sur Render
**Solution**:
1. Dashboard Render → Environment
2. Ajouter `MONGO_URI` avec la vraie connection string
3. Redéployer avec "Clear build cache"

### Erreur: "Invalid scheme"
**Cause**: MONGO_URI contient encore le placeholder
**Solution**: Remplacer par `mongodb+srv://S-User:bg1skvf3eZmQdLNh@cluster0.lhvxveo.mongodb.net/cardpro?appName=Cluster0`

### Erreur: "CORS"
**Cause**: Frontend URL non autorisée
**Solution**: Configurer `CORS_ORIGIN=https://cardpro-2.vercel.app`

### Erreur: "JWT malformed"
**Cause**: JWT_SECRET manquant ou invalide
**Solution**: Ajouter `JWT_SECRET=super_secret_key_cardpro_2025_production_256_chars_minimum`

### Service ne démarre pas
**Causes possibles**:
- Port déjà utilisé → Render utilise automatiquement PORT=10000
- Dépendances manquantes → Vérifier package.json
- Erreur de build → Consulter les logs Render

## 📊 MONITORING ET LOGS

### Accéder aux logs Render
1. Dashboard Render → Service `cardpro-2`
2. Onglet "Logs"
3. Rechercher:
   - `✅ MongoDB connecté avec succès !` (succès)
   - `❌ ERREUR DE CONNEXION MONGODB` (erreur)
   - `🏥 Health check` (requêtes health)

### Métriques importantes
- **Temps de réponse**: < 500ms pour /api/health
- **Uptime**: 99%+ 
- **Erreurs 5xx**: < 1%
- **Connexions MongoDB**: Stables

### Alertes à configurer
- Health check échoue > 2 minutes
- Erreurs MongoDB > 5 par minute
- Temps de réponse > 2 secondes

## 🔒 SÉCURITÉ ET BONNES PRATIQUES

### Variables d'environnement
- ✅ Jamais de secrets dans le code
- ✅ JWT_SECRET complexe (256+ caractères)
- ✅ MONGO_URI avec mot de passe fort
- ✅ CORS_ORIGIN restrictif

### Rate Limiting
- Login: 5 tentatives/15min par IP
- API générale: 100 req/15min par IP
- Health check: Illimité

### Headers de sécurité
- Helmet.js activé
- HTTPS forcé
- Content-Type validation
- XSS protection

### Base de données
- MongoDB Atlas avec IP whitelist
- Connexions chiffrées (SSL)
- Authentification requise
- Backup automatique

## 🚀 OPTIMISATIONS

### Performance
- Compression gzip activée
- Cache headers configurés
- Connection pooling MongoDB
- Pagination sur les listes

### Scalabilité
- Stateless design (JWT)
- MongoDB Atlas auto-scaling
- Render auto-scaling disponible
- CDN pour assets statiques

## 📝 MAINTENANCE

### Mises à jour
1. Tester en local
2. Commit sur GitHub
3. Render redéploie automatiquement
4. Vérifier health check
5. Tester endpoints critiques

### Backup
- MongoDB Atlas: Backup automatique quotidien
- Code: GitHub repository
- Variables: Documentation sécurisée

### Support

- Logs Render pour debugging
- MongoDB Atlas monitoring
- GitHub Issues pour bugs
- Documentation à jour

---

## 📋 RÉSUMÉ DÉPLOIEMENT

### ✅ Checklist Finale

- [ ] Variables d'environnement configurées sur Render
- [ ] MongoDB Atlas connection string valide
- [ ] Service déployé et accessible
- [ ] Health check retourne `{"success": true, "mongodb": true}`
- [ ] Endpoints API testés et fonctionnels
- [ ] Frontend configuré avec la bonne API URL
- [ ] CORS configuré pour le domaine frontend
- [ ] Logs monitoring en place

### 🎯 URLs Importantes

- **Backend API**: https://cardpro-2.onrender.com
- **Health Check**: https://cardpro-2.onrender.com/api/health
- **Render Dashboard**: https://dashboard.render.com
- **MongoDB Atlas**: https://cloud.mongodb.com
- **GitHub Repo**: https://github.com/Sy2force/CardPro

### 📞 Support

Pour toute question ou problème:
1. Consulter les logs Render
2. Vérifier la documentation
3. Tester les endpoints avec curl
4. Créer une issue GitHub si nécessaire

**🎯 Une fois déployé, mettez à jour l'URL backend dans votre frontend local :**
```javascript
// frontend/src/services/api.js
const API_BASE_URL = 'https://cardpro-backend.onrender.com/api';
```

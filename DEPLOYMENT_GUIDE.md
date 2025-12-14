# Guide de Déploiement FuturistCards

## Architecture de Déploiement Recommandée

### 🎯 Configuration Production
- **Frontend**: Vercel (React + Vite)
- **Backend**: Render (Node.js + Express)
- **Base de données**: MongoDB Atlas
- **CDN**: Vercel Edge Network

## 📋 Pré-requis

### Variables d'Environnement Backend (Render)
```env
MONGO_URI=mongodb+srv://S-User:Sy2force2025secure!@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority&appName=CardPro
JWT_SECRET=super-secret-cardpro-2025-hack3ru-validé-✅
NODE_ENV=production
PORT=3010
CORS_ORIGIN=https://futuristcards.vercel.app,https://cardpro-frontend.vercel.app
```

### Variables d'Environnement Frontend (Vercel)
```env
VITE_API_URL=https://futuristcards-api.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

## 🚀 Étapes de Déploiement

### 1. Déploiement Backend sur Render

1. **Créer un nouveau service Web sur Render**
   ```
   Repository: https://github.com/Sy2force/CardPro
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

2. **Configuration des variables d'environnement**
   - Aller dans Settings > Environment
   - Ajouter toutes les variables listées ci-dessus

3. **Vérifier le déploiement**
   ```bash
   curl https://your-backend.onrender.com/api/health
   # Doit retourner: {"success": true, "mongodb": true}
   ```

### 2. Déploiement Frontend sur Vercel

1. **Importer le projet depuis GitHub**
   ```
   Repository: https://github.com/Sy2force/CardPro
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```

2. **Configuration des variables d'environnement**
   - Aller dans Settings > Environment Variables
   - Ajouter les variables VITE_* listées ci-dessus

3. **Redéployer après configuration**

### 3. Configuration MongoDB Atlas

1. **Créer un cluster MongoDB Atlas**
2. **Configurer l'accès réseau**
   - Autoriser les IPs de Render: `0.0.0.0/0` (pour production)
3. **Créer un utilisateur de base de données**
4. **Récupérer la chaîne de connexion**

## 🔧 Configuration CORS Avancée

### Pour Production Multi-Domaines
```javascript
const allowedOrigins = [
  'https://your-main-domain.vercel.app',
  'https://your-custom-domain.com',
  /^https:\/\/.*\.vercel\.app$/,
  // Patterns Vercel universels
];
```

## 🧪 Tests de Validation Déploiement

### Script de Test Backend
```bash
#!/bin/bash
API_URL="https://your-backend.onrender.com/api"

echo "🔍 Test Health Endpoint..."
curl -f "$API_URL/health" || exit 1

echo "🔍 Test Cards Endpoint..."
curl -f "$API_URL/cards" || exit 1

echo "✅ Backend Tests Passed!"
```

### Script de Test Frontend
```bash
#!/bin/bash
FRONTEND_URL="https://your-frontend.vercel.app"

echo "🔍 Test Homepage..."
curl -f "$FRONTEND_URL" || exit 1

echo "🔍 Test API Connectivity..."
curl -f "$FRONTEND_URL/cards" || exit 1

echo "✅ Frontend Tests Passed!"
```

## 📊 Monitoring et Performance

### Métriques à Surveiller
- **Render**: CPU, Memory, Response Time
- **Vercel**: Core Web Vitals, Build Time
- **MongoDB**: Connection Pool, Query Performance

### Alertes Recommandées
- Response Time > 2s
- Error Rate > 5%
- Memory Usage > 80%

## 🚨 Résolution de Problèmes

### Erreur "Network Error"
1. Vérifier VITE_API_URL dans Vercel
2. Vérifier CORS_ORIGIN dans Render
3. Tester les endpoints manuellement

### Erreur "MongoDB Connection Failed"
1. Vérifier MONGO_URI dans Render
2. Vérifier Network Access dans Atlas
3. Redémarrer le service Render

### Build Frontend Échoue
1. Vérifier les variables d'environnement
2. Tester le build localement
3. Vérifier les dépendances dans package.json

## 🔐 Sécurité Production

### Checklist Sécurité
- [ ] JWT_SECRET complexe et unique
- [ ] CORS configuré strictement
- [ ] HTTPS enforced partout
- [ ] Variables d'environnement sécurisées
- [ ] Rate limiting activé
- [ ] Helmet.js configuré

### Variables Sensibles
```env
# ❌ Ne JAMAIS exposer dans le frontend
JWT_SECRET=
MONGO_URI=

# ✅ OK pour le frontend (préfixe VITE_)
VITE_API_URL=
VITE_APP_NAME=
```

## 📈 Optimisations Performance

### Backend (Render)
- Gzip compression activée
- Images optimisées avec Sharp
- Database indexing approprié
- Caching avec Redis (optionnel)

### Frontend (Vercel)
- Code splitting automatique
- Image optimization Vercel
- Edge caching configuré
- Bundle analysis régulière

## 🎯 Objectifs Performance
- **TTFB**: < 200ms
- **FCP**: < 1.5s
- **LCP**: < 2.5s
- **CLS**: < 0.1
- **FID**: < 100ms

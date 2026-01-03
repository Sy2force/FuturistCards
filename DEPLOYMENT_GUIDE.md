# 🚀 Guide de Déploiement - FuturistCards

## 📋 Prérequis

### Environnement de Développement
- Node.js 18+ 
- npm 9+
- MongoDB Atlas (ou MongoDB local)
- Git

### Variables d'Environnement

#### Backend (.env)
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futuristcards
JWT_SECRET=your-super-secure-jwt-secret-key-here
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_APP_NAME=FuturistCards
VITE_APP_VERSION=1.0.0
```

## 🏗️ Déploiement Backend

### Option 1: Render.com (Recommandé)
1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Root Directory: `backend`

### Option 2: Railway
1. Connecter le repository
2. Sélectionner le dossier `backend`
3. Configurer les variables d'environnement
4. Déploiement automatique

### Option 3: Docker
```bash
cd backend
docker build -t futuristcards-backend .
docker run -p 5001:5001 --env-file .env futuristcards-backend
```

## 🎨 Déploiement Frontend

### Option 1: Vercel (Recommandé)
1. Connecter le repository GitHub
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Configurer les variables d'environnement

### Option 2: Netlify
1. Drag & drop du dossier `frontend/dist`
2. Ou connecter via Git
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 3: Docker
```bash
cd frontend
docker build -t futuristcards-frontend .
docker run -p 3000:80 futuristcards-frontend
```

## 🔧 Configuration MongoDB Atlas

1. Créer un cluster MongoDB Atlas
2. Configurer les règles de sécurité réseau
3. Créer un utilisateur de base de données
4. Obtenir la chaîne de connexion
5. Remplacer dans MONGODB_URI

## 🛡️ Sécurité Production

### Headers de Sécurité (Helmet.js)
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy

### Rate Limiting
- 100 requêtes par 15 minutes par IP
- Protection contre les attaques DDoS

### Authentification JWT
- Tokens sécurisés avec expiration
- Refresh tokens pour sessions longues
- Validation stricte des permissions

## 📊 Monitoring et Logs

### Backend Monitoring
```javascript
// Health check endpoint
GET /api/health
Response: {"status":"OK","timestamp":"2024-01-01T00:00:00.000Z"}
```

### Frontend Monitoring
- Error Boundary pour capturer les erreurs React
- Analytics avec Google Analytics (optionnel)
- Performance monitoring avec Web Vitals

## 🔄 CI/CD Pipeline

### GitHub Actions (Exemple)
```yaml
name: Deploy FuturistCards
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm test
```

## 🧪 Tests en Production

### Tests Backend
```bash
cd backend
npm test
```

### Tests Frontend E2E
```bash
cd frontend
npx playwright test
```

## 📈 Performance

### Bundle Analysis
- Frontend: 349.96 kB → 115.20 kB (gzippé)
- Code splitting automatique par route
- Lazy loading des composants

### Optimisations
- Images optimisées (WebP, lazy loading)
- CSS minifié et purgé
- JavaScript tree-shaking
- Service Worker pour cache (optionnel)

## 🌍 Internationalisation

### Langues Supportées
- Français (FR) - Défaut
- Anglais (EN) - Fallback
- Hébreu (HE) - RTL Support

### Configuration i18n
- Détection automatique de la langue
- Persistance des préférences utilisateur
- Support RTL complet pour l'hébreu

## 🚨 Troubleshooting

### Erreurs Communes

#### Backend ne démarre pas
- Vérifier MONGODB_URI
- Vérifier les variables d'environnement
- Vérifier les logs du serveur

#### Frontend ne se connecte pas au Backend
- Vérifier VITE_API_URL
- Vérifier les règles CORS
- Vérifier le certificat SSL

#### Erreurs de base de données
- Vérifier la connexion MongoDB
- Vérifier les permissions utilisateur
- Vérifier les règles de sécurité réseau

## 📞 Support

### Logs Importants
```bash
# Backend logs
tail -f /var/log/futuristcards-backend.log

# Frontend logs (browser console)
# Activer les DevTools pour voir les erreurs
```

### Commandes Utiles
```bash
# Redémarrer les services
pm2 restart futuristcards-backend
systemctl restart nginx

# Vérifier l'état des services
pm2 status
systemctl status nginx
```

## ✅ Checklist de Déploiement

- [ ] Variables d'environnement configurées
- [ ] Base de données MongoDB opérationnelle
- [ ] Backend déployé et accessible
- [ ] Frontend déployé et accessible
- [ ] HTTPS configuré
- [ ] Tests passent en production
- [ ] Monitoring activé
- [ ] Sauvegardes configurées
- [ ] Documentation mise à jour

---

**🎉 Félicitations ! FuturistCards est maintenant déployé en production !**

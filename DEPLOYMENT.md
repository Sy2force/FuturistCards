# 🚀 Guide de Déploiement - FuturistCards

## 📋 Configuration Render (Backend)

### Variables d'environnement
```env
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro
JWT_SECRET=ton-secret-long-256-caracteres
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true
```

### Configuration service
- **Name**: cardpro-backend
- **Root Directory**: backend
- **Build Command**: npm install
- **Start Command**: npm start
- **Region**: Oregon (US West)
- **Plan**: Free

## 📋 Configuration Vercel (Frontend)

### Variables d'environnement
```env
VITE_API_URL=https://cardpro-1.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

### Configuration service
- **Root Directory**: frontend
- **Framework**: Vite
- **Build Command**: npm run build
- **Output Directory**: dist

## 🧪 Tests de validation

### Backend
```bash
curl https://cardpro-1.onrender.com/api/health
```

### Frontend
Vérifier que l'application charge correctement sur l'URL Vercel.

## 🔗 URLs de production

- **Backend**: https://cardpro-1.onrender.com
- **Frontend**: À configurer sur Vercel
- **API**: https://cardpro-1.onrender.com/api

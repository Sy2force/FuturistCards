# 🚀 Configuration Frontend Vercel - FuturistCards

## 📋 Variables d'environnement requises

Sur Vercel Dashboard → Settings → Environment Variables :

```env
VITE_API_URL=https://cardpro-1.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

## ⚙️ Configuration du projet

- **Root Directory**: `frontend`
- **Framework**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🧪 Test après déploiement

1. Vérifier que l'application charge
2. Tester la connexion API dans la console navigateur
3. Vérifier les appels vers `https://cardpro-1.onrender.com/api`

## 🔗 Architecture finale

- **Frontend Vercel**: https://[votre-app].vercel.app
- **Backend Render**: https://cardpro-1.onrender.com/api
- **Base de données**: MongoDB Atlas (mode fallback actuellement)

## 📝 Notes importantes

- Le backend fonctionne avec des données mock
- L'API répond correctement aux endpoints /health et /cards
- MongoDB sera corrigé après configuration frontend

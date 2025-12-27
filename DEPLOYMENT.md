# 🚀 FuturistCards - Guide de Déploiement

## 📋 Prérequis

- Compte [Render](https://render.com) pour le backend
- Compte [Vercel](https://vercel.com) pour le frontend
- Base de données MongoDB Atlas configurée
- Variables d'environnement prêtes

## 🔧 Configuration des Variables d'Environnement

### Backend (Render)
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futuristcards
JWT_SECRET=your-super-secure-jwt-secret-key
CORS_ORIGIN=https://futuristcards.vercel.app
```

### Frontend (Vercel)
```env
VITE_API_BASE_URL=https://futuristcards-api.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_APP_VERSION=1.0.0
VITE_APP_DESCRIPTION=Modern digital business card platform for professionals
```

## 🎯 Déploiement Backend (Render)

1. **Connecter le Repository**
   - Aller sur [Render Dashboard](https://dashboard.render.com)
   - Cliquer sur "New +" → "Web Service"
   - Connecter votre repository GitHub

2. **Configuration du Service**
   - **Name**: `futuristcards-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`

3. **Variables d'Environnement**
   - Ajouter toutes les variables listées ci-dessus
   - Vérifier que `MONGODB_URI` pointe vers votre cluster Atlas

4. **Déploiement**
   - Cliquer sur "Create Web Service"
   - Attendre la fin du build (5-10 minutes)
   - Vérifier l'URL: `https://futuristcards-api.onrender.com/api/health`

## 🌐 Déploiement Frontend (Vercel)

1. **Connecter le Repository**
   - Aller sur [Vercel Dashboard](https://vercel.com/dashboard)
   - Cliquer sur "New Project"
   - Importer votre repository GitHub

2. **Configuration du Projet**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Variables d'Environnement**
   - Ajouter toutes les variables listées ci-dessus
   - Vérifier que `VITE_API_BASE_URL` pointe vers votre API Render

4. **Déploiement**
   - Cliquer sur "Deploy"
   - Attendre la fin du build (2-5 minutes)
   - Vérifier l'URL: `https://futuristcards.vercel.app`

## ✅ Vérification Post-Déploiement

### Tests Backend
```bash
# Health check
curl https://futuristcards-api.onrender.com/api/health

# Test API cards
curl https://futuristcards-api.onrender.com/api/cards
```

### Tests Frontend
- Naviguer vers `https://futuristcards.vercel.app`
- Tester la connexion/inscription
- Vérifier la création de cartes
- Tester les favoris
- Vérifier le panel admin

## 🔄 Mise à Jour Continue

### Déploiement Automatique
- **Render**: Se redéploie automatiquement sur push vers `main`
- **Vercel**: Se redéploie automatiquement sur push vers `main`

### Rollback
- **Render**: Utiliser l'interface pour revenir à une version précédente
- **Vercel**: Utiliser `vercel --prod` pour redéployer ou l'interface web

## 🛠️ Dépannage

### Erreurs Communes

1. **MongoDB Connection Failed**
   - Vérifier `MONGODB_URI` dans les variables d'environnement
   - Vérifier les IP autorisées dans MongoDB Atlas (0.0.0.0/0 pour Render)

2. **CORS Errors**
   - Vérifier `CORS_ORIGIN` dans le backend
   - S'assurer que l'URL frontend est correcte

3. **Build Failures**
   - Vérifier les logs de build dans Render/Vercel
   - S'assurer que toutes les dépendances sont dans `package.json`

### Logs et Monitoring
- **Render**: Logs disponibles dans l'interface web
- **Vercel**: Logs de fonction et analytics disponibles
- **MongoDB**: Monitoring dans Atlas Dashboard

## 📊 Performance et Optimisation

### Backend (Render)
- Service configuré avec auto-scaling
- Health checks activés
- Logs structurés pour monitoring

### Frontend (Vercel)
- CDN global automatique
- Compression et optimisation des assets
- Analytics et Core Web Vitals tracking

## 🔐 Sécurité

### Checklist Sécurité
- ✅ Variables d'environnement sécurisées
- ✅ HTTPS activé sur tous les domaines
- ✅ CORS configuré correctement
- ✅ Rate limiting activé
- ✅ JWT avec expiration
- ✅ Validation des données côté serveur

---

**🎉 Félicitations ! Votre application FuturistCards est maintenant déployée et prête pour la production !**

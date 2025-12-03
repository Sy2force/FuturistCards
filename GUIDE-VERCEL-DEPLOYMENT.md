# 🚀 Guide Déploiement Vercel Frontend - FuturistCards

## 📋 ÉTAPES COMPLÈTES

### 1. Créer nouveau projet Vercel

1. **Aller sur** : https://vercel.com/dashboard
2. **Add New** → **Project**
3. **Import Git Repository** → Sélectionner `CardPro`
4. **Configure Project** :

```
Project Name: cardpro-frontend
Root Directory: frontend
Framework: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2. Variables d'environnement

**Settings** → **Environment Variables** → **Add** :

```env
VITE_API_URL=https://cardpro-1.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

### 3. Déploiement

1. **Deploy** → Attendre le build
2. **Récupérer l'URL** : `https://cardpro-frontend-xxx.vercel.app`

### 4. Mise à jour CORS Backend

Après déploiement, mettre à jour sur **Render Dashboard** :

```env
CORS_ORIGIN=https://cardpro-frontend-xxx.vercel.app
```

## 🧪 Tests de validation

### Frontend
- Vérifier que l'app charge
- Console navigateur : pas d'erreurs CORS
- Network tab : appels API vers Render

### API
```bash
curl https://cardpro-1.onrender.com/api/health
curl https://cardpro-1.onrender.com/api/cards
```

## 🔗 Architecture finale

- **Frontend** : https://cardpro-frontend-xxx.vercel.app
- **Backend** : https://cardpro-1.onrender.com/api
- **Database** : MongoDB Atlas

## ⚠️ Problèmes courants

### Build Error
- Vérifier `Root Directory = frontend`
- Vérifier que `package.json` existe dans `/frontend`

### CORS Error
- Mettre à jour `CORS_ORIGIN` sur Render
- Vérifier `VITE_API_URL` sur Vercel

### API Error
- Tester backend Render directement
- Vérifier variables d'environnement

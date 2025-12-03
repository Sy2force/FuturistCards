# 🚀 GUIDE DÉPLOIEMENT BACKEND VERCEL - CARDPRO

## 📋 **ÉTAPES DE DÉPLOIEMENT**

### **1. Créer nouveau projet Vercel pour le backend**
1. Aller sur [vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquer **"Add New..."** → **"Project"**
3. Importer depuis GitHub: **Sy2force/CardPro**
4. **IMPORTANT:** Configurer comme suit:
   - **Project Name:** `cardpro-backend`
   - **Framework Preset:** `Other`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Output Directory:** `./`
   - **Install Command:** `npm install`

### **2. Variables d'environnement backend**
Ajouter dans **Settings** → **Environment Variables**:

```env
MONGO_URI=mongodb+srv://S-User:Sy2force2025secure!@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority&appName=CardPro
JWT_SECRET=your-super-secret-jwt-key-here-2024
NODE_ENV=production
PORT=3000
CORS_ORIGIN=*
```

### **3. Déployer le backend**
1. Cliquer **"Deploy"**
2. Attendre le build (2-3 minutes)
3. Noter l'URL de déploiement (ex: `https://cardpro-backend-xxx.vercel.app`)

### **4. Tester le backend**
Tester ces endpoints:
- `https://cardpro-backend-xxx.vercel.app/api/health`
- `https://cardpro-backend-xxx.vercel.app/api/cards`

### **5. Mettre à jour le frontend**
Modifier `frontend/.env.production`:
```env
VITE_API_URL=https://cardpro-backend-xxx.vercel.app/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

### **6. Redéployer le frontend**
Le frontend se redéploiera automatiquement avec la nouvelle URL API.

## ✅ **RÉSULTAT ATTENDU**
- Backend: `https://cardpro-backend-xxx.vercel.app`
- Frontend: `https://card-pro-xxx.vercel.app`
- **Fini les Network Errors** - Tout sur Vercel !

## 🔧 **DÉPANNAGE**
Si erreurs:
1. Vérifier les variables d'environnement
2. Vérifier les logs Vercel
3. Tester les endpoints manuellement

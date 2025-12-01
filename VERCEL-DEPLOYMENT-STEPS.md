# 🚀 ÉTAPES VERCEL - FRONTEND + BACKEND

## PRÉREQUIS ✅
- Backend/vercel.json créé
- Dependencies installées
- Configuration prête

## DÉPLOIEMENT VERCEL DASHBOARD

### 1️⃣ DÉPLOYER BACKEND

**https://vercel.com/dashboard**

1. **Add New** → **Project**
2. **Import Git Repository** → `Sy2force/CardPro`
3. **Configure Project:**
   ```
   Project Name: cardpro-backend
   Framework Preset: Other
   Root Directory: backend ⚠️ OBLIGATOIRE
   Build Command: npm install
   Output Directory: (vide)
   Install Command: npm install
   ```

4. **Environment Variables:**
   ```
   MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro
   JWT_SECRET=your-super-secret-jwt-key-here-2024
   NODE_ENV=production
   CORS_ORIGIN=*
   ```

5. **Deploy**

### 2️⃣ DÉPLOYER FRONTEND

**Nouveau projet Vercel**

1. **Add New** → **Project**
2. **Import Git Repository** → `Sy2force/CardPro`
3. **Configure Project:**
   ```
   Project Name: cardpro-frontend
   Framework Preset: Vite
   Root Directory: frontend ⚠️ OBLIGATOIRE
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables:**
   ```
   VITE_API_URL=https://cardpro-backend.vercel.app/api
   VITE_APP_NAME=FuturistCards
   VITE_ENVIRONMENT=production
   ```

5. **Deploy**

### 3️⃣ FINALISER CORS

Après déploiement frontend, mettre à jour backend:
```
CORS_ORIGIN=https://cardpro-frontend.vercel.app
```

## RÉSULTAT FINAL

- **Backend API**: https://cardpro-backend.vercel.app/api/health
- **Frontend App**: https://cardpro-frontend.vercel.app
- **Network Error**: RÉSOLU ✅

## VÉRIFICATION

```bash
# Test backend
curl https://cardpro-backend.vercel.app/api/health

# Test frontend
curl https://cardpro-frontend.vercel.app
```

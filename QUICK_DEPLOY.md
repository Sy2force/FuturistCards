# ⚡ FuturistCards - Quick Deploy Guide

## 🚀 Ready to Deploy in 3 Steps

### Step 1: Backend Deployment (Render)
1. Go to [render.com](https://render.com) and create account
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   ```
   Name: futuristcards-api
   Branch: final-production
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5001
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_secure_jwt_secret
   CORS_ORIGIN=https://futuristcards.vercel.app
   ```
6. Click "Create Web Service"

### Step 2: Frontend Deployment (Vercel)
1. Go to [vercel.com](https://vercel.com) and create account
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   ```
5. Add Environment Variables:
   ```
   VITE_API_BASE_URL=https://your-render-app.onrender.com/api
   VITE_APP_NAME=FuturistCards
   VITE_APP_VERSION=1.0.0
   VITE_APP_DESCRIPTION=Modern digital business card platform
   ```
6. Click "Deploy"

### Step 3: Verification
1. Test backend: `https://your-render-app.onrender.com/api/health`
2. Test frontend: `https://your-vercel-app.vercel.app`
3. Create admin user and test all features

## 🔗 URLs After Deployment
- **Frontend**: `https://futuristcards.vercel.app`
- **Backend API**: `https://futuristcards-api.onrender.com`
- **Health Check**: `https://futuristcards-api.onrender.com/api/health`

## ⚡ One-Click Deploy (Alternative)

### Deploy to Render
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Sy2force/CardPro/tree/final-production)

### Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sy2force/CardPro/tree/final-production&root-directory=frontend)

---

**🎉 Your FuturistCards platform will be live in ~10 minutes!**

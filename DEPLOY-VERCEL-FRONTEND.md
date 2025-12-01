# 🚀 DÉPLOIEMENT FRONTEND VERCEL - FUTURISTCARDS

## 📋 **PRÉREQUIS**
- Compte Vercel connecté à GitHub
- Repository GitHub: https://github.com/Sy2force/CardPro
- Backend Render fonctionnel: https://cardpro-2.onrender.com

---

## 🔧 **ÉTAPES DE DÉPLOIEMENT**

### **1. Connexion Vercel**
1. Aller sur https://vercel.com/dashboard
2. Cliquer **"New Project"**
3. Importer depuis GitHub: `Sy2force/CardPro`
4. Sélectionner **"Frontend"** comme root directory

### **2. Configuration Build**
```bash
# Build Command
npm run build

# Output Directory
dist

# Install Command
npm install

# Root Directory
frontend
```

### **3. Variables d'Environnement**
```bash
VITE_API_URL=https://cardpro-2.onrender.com/api
VITE_APP_NAME=CardPro
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production
```

### **4. Domaine Personnalisé**
- Domaine suggéré: `cardpro-2.vercel.app`
- Ou utiliser votre domaine personnalisé

---

## 🧪 **TESTS POST-DÉPLOIEMENT**

```bash
# Test frontend
curl https://cardpro-2.vercel.app

# Test API connection
curl https://cardpro-2.vercel.app/api/health
```

---

## 🔄 **REDÉPLOIEMENT**
1. Push sur GitHub → Déploiement automatique
2. Ou manuel: Vercel Dashboard → "Redeploy"

---

## 🐛 **TROUBLESHOOTING**

### Build Errors
- Vérifier `package.json` scripts
- Vérifier variables d'environnement
- Logs Vercel pour détails

### API Connection Issues
- Vérifier VITE_API_URL
- Vérifier CORS sur backend Render
- Tester endpoints manuellement

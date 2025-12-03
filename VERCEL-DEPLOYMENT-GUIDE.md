# 🚀 GUIDE DÉPLOIEMENT VERCEL - FUTURISTCARDS

## ✅ **FRONTEND PRÊT POUR DÉPLOIEMENT**

### **🧪 Tests locaux réussis :**
- ✅ **Build** : Compilé sans erreurs (636 kB total)
- ✅ **Preview** : http://localhost:4173 fonctionnel
- ✅ **Configuration** : `.env.production` avec cardpro-2

## 🎯 **ÉTAPES DÉPLOIEMENT VERCEL**

### **1. Aller sur Vercel Dashboard**
**URL :** https://vercel.com/new/import

### **2. Configuration du projet**
```
Repository GitHub : Sy2force/CardPro
Framework : Vite
Root Directory : frontend
Build Command : npm run build
Output Directory : dist
```

### **3. Variables d'environnement**
```env
VITE_API_URL=https://cardpro-2.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

### **4. Paramètres avancés**
- **Node.js Version :** 18.x (recommandé)
- **Install Command :** npm install
- **Build Command :** npm run build

## 📋 **CHECKLIST DÉPLOIEMENT**

- [ ] Repository sélectionné : `Sy2force/CardPro`
- [ ] Root Directory : `frontend`
- [ ] Framework : `Vite`
- [ ] Variables d'environnement ajoutées
- [ ] Deploy button cliqué

## 🎉 **APRÈS DÉPLOIEMENT**

### **URL attendue :**
`https://futuristcards-[hash].vercel.app`

### **Tests à effectuer :**
1. **Page d'accueil** : Chargement correct
2. **Navigation** : Toutes les pages accessibles
3. **API Connection** : Pas d'erreurs CORS
4. **Responsive** : Design adaptatif

## 🔧 **DÉPANNAGE**

### **Si build échoue :**
- Vérifier Node.js version (18.x)
- Consulter les logs de build
- Vérifier les dépendances

### **Si API ne fonctionne pas :**
- Vérifier VITE_API_URL
- S'assurer que cardpro-2 est opérationnel
- Vérifier CORS configuration

## 🏆 **RÉSULTAT FINAL ATTENDU**
**Frontend Vercel + Backend Render = Application complète fonctionnelle**

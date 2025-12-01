# 📋 GUIDE VERCEL - ÉTAPES DÉTAILLÉES

## STATUT ACTUEL
- ❌ https://cardpro-2.vercel.app → DEPLOYMENT_NOT_FOUND
- ✅ Backend: https://cardpro-2.onrender.com/api/health → FONCTIONNEL
- ✅ Local: http://localhost:3010 → FONCTIONNEL

## ÉTAPES VERCEL DASHBOARD

### 1. Accéder au Dashboard
- Ouvrir: https://vercel.com/dashboard
- Se connecter avec votre compte

### 2. Nettoyer l'ancien projet
- Chercher "cardpro" ou "CardPro" dans vos projets
- Si trouvé: Cliquer → Settings → Advanced → Delete Project
- Confirmer la suppression

### 3. Créer nouveau projet
1. Cliquer **"Add New..."** (bouton bleu en haut à droite)
2. Sélectionner **"Project"**
3. Dans "Import Git Repository", chercher: **Sy2force/CardPro**
4. Cliquer **"Import"** sur le bon repository

### 4. Configuration critique
```
Project Name: cardpro-2
Framework Preset: Vite (détecté automatiquement)
Root Directory: frontend  ⚠️ OBLIGATOIRE - Cliquer "Edit" et taper "frontend"
Build Command: npm run build (auto)
Output Directory: dist (auto)
Install Command: npm install (auto)
```

### 5. Variables d'environnement
Cliquer "Environment Variables" et ajouter:
```
Name: VITE_API_URL
Value: https://cardpro-2.onrender.com/api

Name: VITE_APP_NAME  
Value: FuturistCards

Name: VITE_ENVIRONMENT
Value: production
```

### 6. Déployer
- Cliquer **"Deploy"** (bouton bleu)
- Attendre 2-3 minutes
- Vercel générera une URL: https://cardpro-2-[hash].vercel.app

## VÉRIFICATION
Une fois déployé:
1. Tester la nouvelle URL
2. Vérifier que la connexion API fonctionne
3. Plus d'erreur "Network Error"

## POINTS CRITIQUES
- **Root Directory = frontend** est OBLIGATOIRE
- Sans cela, Vercel build depuis la racine et échoue
- Les variables VITE_* sont nécessaires pour la connexion API

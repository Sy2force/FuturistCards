# 🚀 CONFIGURATION VERCEL - SOLUTION NETWORK ERROR

## ÉTAPES EXACTES POUR VERCEL

### 1. Accéder au Dashboard Vercel
- Aller sur: https://vercel.com/dashboard
- Se connecter avec votre compte

### 2. Supprimer l'ancien projet (si existe)
- Chercher "CardPro" ou "FuturistCards"
- Cliquer sur le projet → Settings → Advanced → Delete Project

### 3. Créer nouveau projet
1. Cliquer **"Add New..."** → **"Project"**
2. Sélectionner **"Import Git Repository"**
3. Chercher et sélectionner: **`Sy2force/CardPro`**
4. Cliquer **"Import"**

### 4. CONFIGURATION CRITIQUE
```
Project Name: cardpro-2
Framework Preset: Vite (auto-détecté)
Root Directory: frontend  ⚠️ OBLIGATOIRE
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 5. Variables d'environnement
Ajouter ces variables exactes:
```
VITE_API_URL=https://cardpro-2.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

### 6. Déployer
- Cliquer **"Deploy"**
- Attendre la fin du build
- Votre site sera accessible sur: `https://cardpro-2-[hash].vercel.app`

## VÉRIFICATION POST-DÉPLOIEMENT
1. Tester l'URL générée par Vercel
2. Vérifier que la connexion fonctionne (plus de Network Error)
3. Tester login/register
4. Tester recherche de cartes

## POURQUOI ÇA MARCHE
- **Root Directory = frontend** : Vercel build depuis le bon dossier
- **VITE_API_URL** : Frontend sait où contacter le backend Render
- **Backend Render** : Déjà fonctionnel avec MongoDB connecté

✅ Cette configuration résoudra définitivement le Network Error

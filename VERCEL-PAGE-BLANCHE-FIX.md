# 🚨 CORRECTION URGENTE - PAGE BLANCHE VERCEL

## PROBLÈME IDENTIFIÉ
Page blanche après déploiement Vercel = Configuration incorrecte du projet

## ✅ SOLUTION IMMÉDIATE (5 minutes)

### 1. CONFIGURATION VERCEL OBLIGATOIRE
Allez dans **Settings → General** de votre projet Vercel :

```
Root Directory: frontend
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 2. VARIABLES D'ENVIRONNEMENT REQUISES
Allez dans **Settings → Environment Variables** :

```env
VITE_API_URL=https://cardpro-21dj.onrender.com/api
VITE_APP_NAME=FuturistCards
VITE_ENVIRONMENT=production
```

### 3. REDÉPLOIEMENT
1. Allez dans **Deployments**
2. Cliquez sur les 3 points du dernier déploiement
3. Cliquez **Redeploy**

## 🔍 DIAGNOSTIC RAPIDE

### Vérifiez les logs de build :
- Build réussi ? ✅ Problème de configuration
- Build échoué ? ❌ Erreur de code

### Vérifiez la console navigateur :
- Erreurs 404 ? → Root Directory incorrect
- Erreurs Network ? → Variables d'environnement manquantes
- Erreurs JS ? → Build échoué

## 📋 CHECKLIST DE VÉRIFICATION

- [ ] Root Directory = `frontend` (PAS `./` ou vide)
- [ ] Framework = `Vite`
- [ ] Build Command = `npm run build`
- [ ] Output Directory = `dist`
- [ ] Variables d'environnement ajoutées
- [ ] Redéploiement effectué

## 🆘 SI ÇA NE MARCHE TOUJOURS PAS

1. **Supprimer le projet Vercel**
2. **Recréer depuis GitHub** avec la bonne configuration
3. **Importer depuis le dossier `frontend/`**

## ✅ RÉSULTAT ATTENDU
- Frontend accessible sur votre URL Vercel
- Connexion au backend Render fonctionnelle
- Application complètement opérationnelle

---
**Note**: Le backend Render fonctionne déjà : https://cardpro-21dj.onrender.com/api

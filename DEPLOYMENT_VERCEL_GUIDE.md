# 🚀 Guide de Déploiement Vercel - FuturistCards

## 📋 Prérequis

1. **Compte Vercel** : [vercel.com](https://vercel.com)
2. **Compte MongoDB Atlas** : [mongodb.com/atlas](https://mongodb.com/atlas)
3. **Repository Git** : Code poussé sur GitHub/GitLab

## 🔧 Configuration Complète

### 1. Variables d'Environnement Vercel

Dans le dashboard Vercel, ajouter ces variables d'environnement :

```bash
# Base de données
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futuristcards?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=votre-cle-secrete-jwt-super-secure-ici
JWT_EXPIRES_IN=7d

# Environment
NODE_ENV=production

# Frontend API URL (sera automatiquement définie par Vercel)
VITE_API_BASE_URL=https://votre-app.vercel.app/api
```

### 2. Structure du Projet

```
FuturistCards/
├── vercel.json              ✅ Configuration Vercel
├── .env.production          ✅ Variables d'environnement
├── frontend/
│   ├── package.json         ✅ Script vercel-build ajouté
│   └── dist/               (généré lors du build)
├── backend/
│   ├── server.js           ✅ Adapté pour Vercel
│   └── api/
│       └── index.js        ✅ Point d'entrée serverless
└── package.json            ✅ Scripts de build
```

## 🚀 Étapes de Déploiement

### 1. Préparer MongoDB Atlas

```bash
# 1. Créer un cluster MongoDB Atlas
# 2. Créer un utilisateur de base de données
# 3. Autoriser les connexions depuis 0.0.0.0/0 (toutes les IPs)
# 4. Copier la chaîne de connexion
```

### 2. Déployer sur Vercel

#### Option A: Interface Web Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Connecter votre repository GitHub
3. Importer le projet FuturistCards
4. Configurer les variables d'environnement
5. Déployer

#### Option B: CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer depuis la racine du projet
cd /Users/shayacoca/projet\ react/FuturistCards
vercel

# Suivre les instructions :
# - Link to existing project? No
# - Project name: futuristcards
# - Directory: ./
# - Override settings? No
```

### 3. Configuration Post-Déploiement

1. **Domaine personnalisé** (optionnel)
   - Aller dans Project Settings > Domains
   - Ajouter votre domaine personnalisé

2. **Variables d'environnement**
   - Project Settings > Environment Variables
   - Ajouter toutes les variables listées ci-dessus

3. **Redéploiement**
   ```bash
   vercel --prod
   ```

## 🔍 Vérification du Déploiement

### URLs à tester :

```bash
# Frontend
https://votre-app.vercel.app/

# Backend API Health Check
https://votre-app.vercel.app/api/health

# API Endpoints
https://votre-app.vercel.app/api/auth/demo-user
https://votre-app.vercel.app/api/cards
```

### Tests de Fonctionnalité :

1. ✅ **Page d'accueil** se charge correctement
2. ✅ **Connexion démo** fonctionne
3. ✅ **Navigation** entre les pages
4. ✅ **API calls** vers le backend
5. ✅ **Base de données** MongoDB connectée

## 🛠️ Dépannage

### Erreurs Communes :

1. **Build Failed**
   ```bash
   # Vérifier les dépendances
   cd frontend && npm install
   npm run build
   ```

2. **API 500 Error**
   ```bash
   # Vérifier MONGODB_URI dans Vercel
   # Vérifier les variables d'environnement
   ```

3. **CORS Error**
   ```bash
   # Vérifier allowedOrigins dans server.js
   # Ajouter votre domaine Vercel
   ```

## 📊 Monitoring

### Vercel Analytics
- Activer dans Project Settings > Analytics
- Surveiller les performances et erreurs

### Logs
```bash
# Voir les logs en temps réel
vercel logs votre-app.vercel.app
```

## 🔒 Sécurité

1. **Variables sensibles** : Jamais dans le code
2. **CORS** : Configuré pour votre domaine uniquement
3. **Rate limiting** : Activé sur toutes les routes API
4. **Helmet** : Headers de sécurité configurés

## 📈 Optimisations

1. **Compression** : Activée
2. **Caching** : Headers configurés
3. **Bundle size** : Optimisé avec Vite
4. **Images** : Optimisation automatique Vercel

---

## 🎉 Déploiement Réussi !

Votre application FuturistCards est maintenant déployée sur Vercel avec :

- ✅ Frontend React optimisé
- ✅ Backend Node.js serverless
- ✅ Base de données MongoDB Atlas
- ✅ Variables d'environnement sécurisées
- ✅ CORS et sécurité configurés
- ✅ Monitoring et analytics

**URL de production** : `https://votre-app.vercel.app`

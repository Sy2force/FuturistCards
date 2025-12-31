# 🚀 Guide Configuration Render - FuturistCards Backend

## ❌ Problème Identifié
```
❌ MongoDB Connection Error: querySrv ENOTFOUND _mongodb._tcp.cluster.mongodb.net
⚠️  Server will continue in fallback mode
```

## ✅ Solution - Configuration Manuelle Render

### 1. Créer la Base de Données
1. Aller sur [Render Dashboard](https://dashboard.render.com)
2. Cliquer sur **"New +"** → **"PostgreSQL"** ou **"MongoDB"**
3. Nom: `futuristcards-db`
4. Région: `Frankfurt` (même que le backend)
5. Plan: `Free`

### 2. Configurer les Variables d'Environnement
Dans le service backend Render, aller dans **Environment** et ajouter :

```bash
# Base de données (OBLIGATOIRE)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/futuristcards

# Ou utiliser la base Render PostgreSQL avec adaptateur
DATABASE_URL=postgresql://user:password@host:port/database
```

### 3. Alternative : MongoDB Atlas
1. Créer un compte [MongoDB Atlas](https://cloud.mongodb.com)
2. Créer un cluster gratuit
3. Configurer l'accès réseau : **0.0.0.0/0** (tous IPs)
4. Créer un utilisateur de base de données
5. Copier la connection string dans `MONGODB_URI`

### 4. Redéployer
1. Aller dans **Deployments**
2. Cliquer **"Deploy latest commit"**
3. Vérifier les logs : `✅ MongoDB connected successfully`

## 🔧 Configuration Actuelle
- ✅ Service déployé : https://futuristcards.onrender.com
- ✅ Port configuré : 10000
- ✅ Variables auto-générées : JWT_SECRET, JWT_REFRESH_SECRET
- ❌ Base de données : Non connectée (mode fallback)

## 📋 Checklist Post-Déploiement
- [ ] Configurer MONGODB_URI dans Render
- [ ] Redéployer le service
- [ ] Tester l'API : https://futuristcards.onrender.com/api/health
- [ ] Vérifier la connexion DB dans les logs
- [ ] Tester l'inscription/connexion utilisateur

## 🌐 URLs Finales
- **Backend API** : https://futuristcards.onrender.com/api
- **Health Check** : https://futuristcards.onrender.com/api/health
- **Frontend** : À déployer sur Vercel avec VITE_API_BASE_URL=https://futuristcards.onrender.com/api

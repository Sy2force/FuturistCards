# 🔧 VARIABLES ENVIRONNEMENT RENDER - CONFIGURATION REQUISE

## ✅ Variables à configurer dans Render Dashboard

### 1. **MONGO_URI** (CRITIQUE)
```
mongodb+srv://S-User:<PASSWORD>@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
```
⚠️ **Remplacez `<PASSWORD>` par le vrai mot de passe MongoDB Atlas**

### 2. **JWT_SECRET**
```
your-super-secret-production-jwt-key-256-characters-minimum-for-security
```

### 3. **NODE_ENV**
```
production
```

### 4. **PORT**
```
10000
```

### 5. **CORS_ORIGIN**
```
https://cardpro-2.vercel.app,https://futurist-cards.vercel.app
```

---

## 🚀 ÉTAPES DÉPLOIEMENT RENDER

### 1. Configurer les variables
1. Aller sur Render Dashboard
2. Sélectionner votre service `cardpro-backend`
3. Onglet "Environment"
4. Ajouter/modifier les variables ci-dessus

### 2. Redéployer avec cache clear
1. Onglet "Settings"
2. Cliquer "Clear build cache & deploy"
3. Attendre 5-10 minutes

### 3. Vérifier les logs
1. Onglet "Logs"
2. Chercher: `✅ MongoDB connecté avec succès !`
3. Vérifier: `🏥 Health check - MongoDB: Connected`

---

## 🧪 TESTS POST-DÉPLOIEMENT

```bash
# Test health endpoint
curl https://cardpro-2.onrender.com/api/health

# Réponse attendue:
{
  "success": true,
  "mongodb": true,
  "status": "OK",
  "message": "Server is running"
}
```

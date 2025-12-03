# 🔧 Configuration MongoDB Atlas - Actions requises

## 🎯 Objectif
Corriger l'utilisateur `S-User` sur MongoDB Atlas pour permettre la connexion depuis Render.

## 📋 Étapes sur MongoDB Atlas Dashboard

### 1. Accéder à MongoDB Atlas
- **URL :** https://cloud.mongodb.com
- **Se connecter** avec votre compte

### 2. Modifier l'utilisateur S-User
1. **Database Access** (dans le menu gauche)
2. **Trouver l'utilisateur `S-User`** → **Edit**
3. **Modifier le mot de passe :**
   ```
   yXBtQEGMozKQwC7AN60d3oOp
   ```
4. **Vérifier les rôles :**
   - **Built-in Role :** `atlasAdmin@admin`
   - **Ou :** `readWriteAnyDatabase@admin`
5. **Update User**

### 3. Configurer Network Access
1. **Network Access** (dans le menu gauche)
2. **Add IP Address**
3. **Allow Access from Anywhere :**
   ```
   IP Address: 0.0.0.0/0
   Description: Render deployment access
   ```
4. **Confirm**

### 4. Vérifier le cluster
1. **Clusters** → **Connect**
2. **Vérifier l'URI :**
   ```
   cluster0.lhvxveo.mongodb.net
   ```

## 🔧 Configuration Render Dashboard

Après avoir mis à jour MongoDB Atlas :

1. **https://dashboard.render.com**
2. **Service `cardpro-backend`**
3. **Environment** → **Edit**
4. **Mettre à jour `MONGO_URI` :**
   ```
   mongodb+srv://S-User:yXBtQEGMozKQwC7AN60d3oOp@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
   ```
5. **Mettre à jour `JWT_SECRET` :**
   ```
   5ee4438c51c8eb5263ef847ec752209c
   ```
6. **Save Changes**

## 🧪 Test final
Attendre 2-3 minutes après les modifications, puis :

```bash
curl https://cardpro-1.onrender.com/api/health
```

**Résultat attendu :**
```json
{
  "success": true,
  "message": "Server is healthy", 
  "mongodb": "connected",
  "timestamp": "2025-12-03T16:30:00.000Z"
}
```

## ⚠️ Si le problème persiste

1. **Vérifier les logs Render** pour plus de détails
2. **Tester la connexion** depuis MongoDB Compass avec la même URI
3. **Créer un nouvel utilisateur** sur MongoDB Atlas si nécessaire

# 🚨 CORRECTION MONGODB URGENTE - RENDER

## ⚠️ PROBLÈME ACTUEL
Backend en mode fallback - MongoDB non connecté malgré les nouvelles configurations.

## 🔧 ACTIONS IMMÉDIATES REQUISES

### 1. MongoDB Atlas Dashboard
**URL:** https://cloud.mongodb.com

**Étapes:**
1. **Database Access** → Trouver utilisateur `S-User`
2. **Edit User** → **Change Password**
3. **Nouveau mot de passe:** `yXBtQEGMozKQwC7AN60d3oOp`
4. **Database User Privileges:** `Atlas admin`
5. **Update User**

### 2. Network Access MongoDB
1. **Network Access** → **Add IP Address**
2. **Access List Entry:** `0.0.0.0/0`
3. **Comment:** "Render deployment access"
4. **Confirm**

### 3. Render Dashboard
**URL:** https://dashboard.render.com

**Service:** cardpro-backend → **Environment**

**Variables à modifier:**
```env
MONGO_URI=mongodb+srv://S-User:yXBtQEGMozKQwC7AN60d3oOp@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
JWT_SECRET=5ee4438c51c8eb5263ef847ec752209c
NODE_ENV=production
PORT=5001
CORS_ORIGIN=*
```

**Save Changes** → Service redémarrera automatiquement

## 🧪 VALIDATION
Attendre 3-5 minutes puis tester:

```bash
curl https://cardpro-1.onrender.com/api/health
```

**Résultat attendu:**
```json
{
  "success": true,
  "message": "Server is healthy",
  "mongodb": "connected",
  "timestamp": "2025-12-03T16:35:00.000Z"
}
```

## 🔄 SI ÉCHEC
1. Vérifier logs Render pour erreurs spécifiques
2. Tester connexion MongoDB Compass avec même URI
3. Créer nouvel utilisateur MongoDB si nécessaire

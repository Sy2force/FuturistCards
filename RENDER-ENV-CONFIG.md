# 🔧 Configuration MongoDB Corrigée - Render

## 🔐 Nouveau mot de passe MongoDB généré

**Mot de passe sécurisé :** `yXBtQEGMozKQwC7AN60d3oOp`
**JWT Secret généré :** `5ee4438c51c8eb5263ef847ec752209c`

## 📋 Variables d'environnement pour Render Dashboard

Copiez ces variables exactement dans **Render Dashboard → Environment** :

```env
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://S-User:yXBtQEGMozKQwC7AN60d3oOp@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
JWT_SECRET=5ee4438c51c8eb5263ef847ec752209c
JWT_EXPIRES_IN=7d
CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
ENABLE_REQUEST_LOGGING=true
```

## 🔧 Actions requises sur MongoDB Atlas

### 1. Mettre à jour le mot de passe utilisateur
1. **MongoDB Atlas Dashboard** → **Database Access**
2. **Modifier l'utilisateur `S-User`**
3. **Nouveau mot de passe :** `yXBtQEGMozKQwC7AN60d3oOp`
4. **Rôle :** `atlasAdmin@admin` ou `readWriteAnyDatabase@admin`

### 2. Vérifier Network Access
1. **Network Access** → **Add IP Address**
2. **Ajouter :** `0.0.0.0/0` (Allow access from anywhere)
3. **Description :** "Render deployment access"

## 🧪 Test de validation

Après mise à jour des variables sur Render :

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

## ⚠️ Sécurité

- Le mot de passe est généré aléatoirement (24 caractères)
- JWT Secret est unique (32 caractères hex)
- Pas de caractères spéciaux nécessitant un encodage URL
- Configuration CORS temporaire (`*`) à remplacer par l'URL Vercel finale

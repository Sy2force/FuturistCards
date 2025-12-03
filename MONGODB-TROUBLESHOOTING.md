# 🔧 MongoDB Troubleshooting - Render

## 🚨 Erreur actuelle
```
⚠️ MongoDB connection failed, running in fallback mode: bad auth : authentication failed
```

## 🔑 Solutions par ordre de priorité

### 1. URI MongoDB corrigée
```env
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority
```

### 2. Vérifications MongoDB Atlas

#### A) Utilisateur et mot de passe
- **Utilisateur** : `S-User`
- **Mot de passe** : `Sy2force`
- **Cluster** : `cluster0.lhvxveo.mongodb.net`
- **Database** : `cardpro`

#### B) Whitelist IP
Sur MongoDB Atlas → Network Access :
- Ajouter `0.0.0.0/0` (Allow access from anywhere)
- Ou ajouter les IPs Render spécifiquement

#### C) Permissions utilisateur
Sur MongoDB Atlas → Database Access :
- Vérifier que `S-User` a les permissions `readWrite` sur `cardpro`

### 3. URI alternatives à tester

#### Option 1 - Sans paramètres
```env
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro
```

#### Option 2 - Avec authSource
```env
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?authSource=admin
```

#### Option 3 - Complète avec options
```env
MONGO_URI=mongodb+srv://S-User:Sy2force@cluster0.lhvxveo.mongodb.net/cardpro?retryWrites=true&w=majority&authSource=admin
```

## 🧪 Test de validation

Après modification sur Render, attendre 2-3 minutes puis :

```bash
curl https://cardpro-1.onrender.com/api/health
```

**Résultat attendu :**
```json
{
  "success": true,
  "message": "Server is healthy",
  "mongodb": "connected",
  "timestamp": "2025-12-03T15:50:00.000Z"
}
```

## 🔄 Si le problème persiste

1. **Créer un nouvel utilisateur** sur MongoDB Atlas
2. **Régénérer le mot de passe** 
3. **Vérifier le nom du cluster** exact
4. **Tester la connexion** depuis MongoDB Compass

## 📞 Support

Si aucune solution ne fonctionne :
- Vérifier les logs Render pour plus de détails
- Contacter le support MongoDB Atlas
- Utiliser le mode fallback temporairement

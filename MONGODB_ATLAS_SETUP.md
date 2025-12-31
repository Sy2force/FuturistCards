# 🗄️ Configuration MongoDB Atlas - FuturistCards

## ❌ Problème Actuel
```
Error: querySrv ENOTFOUND _mongodb._tcp.cluster0.mongodb.net
```

La base de données MongoDB Atlas n'existe pas encore. Il faut la créer manuellement.

## 🔧 Étapes de Configuration MongoDB Atlas

### 1. Créer un Compte MongoDB Atlas
1. Aller sur [MongoDB Atlas](https://cloud.mongodb.com)
2. Créer un compte gratuit
3. Vérifier l'email

### 2. Créer un Cluster
1. Cliquer **"Build a Database"**
2. Choisir **"M0 Sandbox"** (gratuit)
3. Région : **Europe (Ireland)** ou **Frankfurt**
4. Nom du cluster : `Cluster0` (par défaut)

### 3. Configurer l'Accès
**Authentification Database :**
- Username : `futuristcards`
- Password : `FuturistCards2025`

**Accès Réseau :**
- Ajouter IP : `0.0.0.0/0` (tous les IPs)
- Description : "Allow all connections"

### 4. Obtenir la Connection String
1. Cliquer **"Connect"** sur le cluster
2. Choisir **"Connect your application"**
3. Driver : **Node.js**
4. Copier la connection string :
```
mongodb+srv://futuristcards:FuturistCards2025@cluster0.xxxxx.mongodb.net/futuristcards?retryWrites=true&w=majority
```

### 5. Mettre à Jour render.yaml
Remplacer `cluster0.mongodb.net` par l'URL complète obtenue :
```yaml
MONGODB_URI: mongodb+srv://futuristcards:FuturistCards2025@cluster0.xxxxx.mongodb.net/futuristcards?retryWrites=true&w=majority
```

### 6. Redéployer sur Render
Le service se redéploiera automatiquement après modification du fichier.

## 🎯 Alternative : Base de Données Locale de Test

Si MongoDB Atlas n'est pas disponible, utiliser une base locale pour les tests :

```bash
# Installer MongoDB localement (macOS)
brew install mongodb-community
brew services start mongodb-community

# Modifier .env pour utiliser la base locale
MONGODB_URI=mongodb://localhost:27017/futuristcards
```

## ✅ Validation
Après configuration, tester :
```bash
curl https://futuristcards.onrender.com/api/health
```

Résultat attendu :
```json
{
  "success": true,
  "status": "OK",
  "mongodb": "connected",
  "database": "futuristcards"
}
```

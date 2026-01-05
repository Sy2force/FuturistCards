# 🔧 Dépannage Vercel - "Failed to fetch"

## ❌ Problème Actuel

**Symptôme** : Le site Vercel affiche le design mais montre "Failed to fetch"  
**Cause** : Le backend n'est pas accessible ou pas déployé  
**Date** : 5 Janvier 2026, 18:43

---

## 🔍 Diagnostic

### Erreur Visible
```
Failed to fetch
```

Cette erreur signifie que le **frontend ne peut pas communiquer avec le backend**.

### Causes Possibles
1. ❌ Backend pas déployé sur Render
2. ❌ Backend déployé mais en erreur
3. ❌ URL API incorrecte dans Vercel
4. ❌ CORS bloquant les requêtes
5. ❌ Variables d'environnement manquantes

---

## ✅ Solutions

### Solution 1 : Vérifier le Backend Render

#### Étape 1 : Tester l'API Backend
```bash
# Tester le health check
curl https://futuristcards.onrender.com/api/health

# Réponse attendue :
{
  "success": true,
  "status": "OK",
  "mongodb": "connected"
}
```

**Si ça ne répond pas** → Le backend n'est pas déployé ou est en erreur

#### Étape 2 : Déployer le Backend sur Render

**Option A : Via Dashboard Render**
1. Aller sur https://dashboard.render.com
2. Cliquer sur "New +" → "Web Service"
3. Connecter votre repository GitHub
4. Configuration :
   - **Name** : futuristcards-backend
   - **Region** : Frankfurt
   - **Branch** : main
   - **Root Directory** : (laisser vide)
   - **Build Command** : `cd backend && npm ci --only=production && npm run build`
   - **Start Command** : `cd backend && npm start`
   - **Plan** : Free

5. Variables d'environnement (CRITIQUE) :
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://Futuristecard:Qwerty21@cluster0.lhvxveo.mongodb.net/futuristcards?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=votre-secret-jwt-super-securise-ici
CORS_ORIGIN=https://futuristcards.vercel.app
```

6. Cliquer sur "Create Web Service"

**Option B : Via render.yaml (Automatique)**
1. Le fichier `render.yaml` est déjà configuré à la racine
2. Sur Render Dashboard : "New +" → "Blueprint"
3. Connecter le repository
4. Render détectera automatiquement le `render.yaml`
5. Cliquer sur "Apply"

---

### Solution 2 : Configurer les Variables Vercel

#### Variables d'Environnement OBLIGATOIRES

Sur Vercel Dashboard :
1. Aller dans votre projet
2. Settings → Environment Variables
3. Ajouter ces variables :

```
VITE_API_URL=https://futuristcards.onrender.com/api
NODE_ENV=production
VITE_APP_NAME=FuturistCards
```

**⚠️ IMPORTANT** : Après avoir ajouté les variables, **REDÉPLOYER** :
- Deployments → Latest Deployment → "..." → Redeploy

---

### Solution 3 : Vérifier la Configuration CORS

Le backend est configuré pour accepter :
- `https://futuristcards.vercel.app`
- Tous les sous-domaines Vercel : `https://*.vercel.app`

**Si votre URL Vercel est différente** :

1. Vérifier l'URL exacte de votre déploiement Vercel
2. Mettre à jour le backend `server.js` ligne 28 :
```javascript
const allowedOrigins = [
  'https://VOTRE-URL-VERCEL.vercel.app',  // ← Votre URL exacte
  /^https:\/\/.*\.vercel\.app$/
];
```

3. Redéployer le backend

---

### Solution 4 : Tester la Connexion

#### Test 1 : Backend Health Check
```bash
curl https://futuristcards.onrender.com/api/health
```

**Résultat attendu** :
```json
{
  "success": true,
  "status": "OK",
  "mongodb": "connected"
}
```

#### Test 2 : Login API
```bash
curl -X POST https://futuristcards.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123!"}'
```

**Si ça fonctionne** → Le backend est OK, problème de configuration Vercel

#### Test 3 : Depuis le Frontend
Ouvrir la console du navigateur (F12) sur votre site Vercel :
```javascript
// Vérifier la variable d'environnement
console.log(import.meta.env.VITE_API_URL);
// Devrait afficher : https://futuristcards.onrender.com/api

// Tester l'API
fetch('https://futuristcards.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

---

## 🎯 Checklist de Vérification

### Backend Render
- [ ] Backend déployé sur Render
- [ ] Health check répond : `https://futuristcards.onrender.com/api/health`
- [ ] Variables d'environnement configurées (MONGODB_URI, JWT_SECRET, etc.)
- [ ] CORS_ORIGIN = URL Vercel
- [ ] Logs Render sans erreur

### Frontend Vercel
- [ ] Variables d'environnement configurées
- [ ] VITE_API_URL = `https://futuristcards.onrender.com/api`
- [ ] Redéployé après ajout des variables
- [ ] Console browser sans erreur CORS
- [ ] Requêtes API passent

### Configuration
- [ ] URL Vercel dans allowedOrigins du backend
- [ ] CORS configuré correctement
- [ ] MongoDB accessible depuis Render
- [ ] JWT_SECRET défini

---

## 🚀 Procédure Complète de Déploiement

### 1. Déployer le Backend (Render)

```bash
# 1. Pousser le code sur GitHub
git add .
git commit -m "deploy: backend ready"
git push origin main

# 2. Sur Render Dashboard
# - New > Blueprint
# - Connecter le repo
# - Render détecte render.yaml
# - Apply

# 3. Attendre le déploiement (5-10 min)

# 4. Tester
curl https://futuristcards.onrender.com/api/health
```

### 2. Configurer Vercel

```bash
# Sur Vercel Dashboard
# Settings > Environment Variables
# Ajouter :
VITE_API_URL=https://futuristcards.onrender.com/api
NODE_ENV=production

# Redéployer
# Deployments > Latest > Redeploy
```

### 3. Vérifier

```bash
# 1. Backend répond
curl https://futuristcards.onrender.com/api/health

# 2. Frontend charge
# Ouvrir https://futuristcards.vercel.app
# Console (F12) : Pas d'erreur "Failed to fetch"

# 3. Tester la connexion
# Essayer de se connecter sur le site
```

---

## 🐛 Erreurs Courantes

### Erreur 1 : "Failed to fetch"
**Cause** : Backend pas accessible  
**Solution** : Vérifier que le backend est déployé et répond

### Erreur 2 : CORS Error
**Cause** : URL Vercel pas dans allowedOrigins  
**Solution** : Ajouter l'URL dans server.js et redéployer

### Erreur 3 : "Cannot read properties of undefined"
**Cause** : VITE_API_URL non défini  
**Solution** : Ajouter la variable dans Vercel et redéployer

### Erreur 4 : 500 Internal Server Error
**Cause** : MongoDB non connecté ou JWT_SECRET manquant  
**Solution** : Vérifier les variables d'environnement Render

### Erreur 5 : Backend "Sleeping"
**Cause** : Plan gratuit Render met en veille après inactivité  
**Solution** : Attendre 30-60s que le backend se réveille

---

## 📊 URLs de Référence

### Production
- **Frontend** : https://futuristcards.vercel.app
- **Backend** : https://futuristcards.onrender.com
- **API** : https://futuristcards.onrender.com/api
- **Health** : https://futuristcards.onrender.com/api/health

### Dashboards
- **Vercel** : https://vercel.com/dashboard
- **Render** : https://dashboard.render.com
- **MongoDB Atlas** : https://cloud.mongodb.com

---

## 🔧 Configuration Actuelle

### Backend (server.js)
```javascript
const allowedOrigins = [
  'https://futuristcards.vercel.app',
  /^https:\/\/.*\.vercel\.app$/
];
```

### Frontend (.env.example)
```env
VITE_API_URL=https://futuristcards.onrender.com/api
NODE_ENV=production
```

### Render (render.yaml)
```yaml
buildCommand: cd backend && npm ci --only=production && npm run build
startCommand: cd backend && npm start
healthCheckPath: /api/health
```

---

## ✅ Solution Rapide (TL;DR)

1. **Déployer le backend sur Render** :
   - Dashboard Render → New Blueprint
   - Connecter le repo GitHub
   - Apply (utilise render.yaml)

2. **Configurer Vercel** :
   - Settings → Environment Variables
   - Ajouter : `VITE_API_URL=https://futuristcards.onrender.com/api`
   - Redéployer

3. **Tester** :
   ```bash
   curl https://futuristcards.onrender.com/api/health
   ```

4. **Vérifier le site** :
   - Ouvrir https://futuristcards.vercel.app
   - Essayer de se connecter
   - Plus d'erreur "Failed to fetch" ✅

---

## 🆘 Support

**Si le problème persiste** :

1. Vérifier les logs Render : Dashboard → Service → Logs
2. Vérifier la console browser (F12) sur Vercel
3. Tester l'API manuellement avec curl
4. Vérifier que MongoDB est accessible

**Logs à vérifier** :
- Render : Erreurs de démarrage, MongoDB connection
- Vercel : Console browser, Network tab
- MongoDB Atlas : IP whitelist (0.0.0.0/0 pour Render)

---

*Guide créé le 5 Janvier 2026 à 18:43*  
*Problème : "Failed to fetch" sur Vercel*  
*Solution : Déployer le backend + Configurer les variables*

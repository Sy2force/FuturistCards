# DIAGNOSTIC VERCEL - VARIABLES D'ENVIRONNEMENT

## Problème Identifié
- ✅ Variables ajoutées sur Vercel dashboard
- ❌ Application essaie d'appeler `/api/health` sur Vercel au lieu de Render
- ❌ `import.meta.env.VITE_API_URL` ne fonctionne pas sur Vercel

## Test de Diagnostic
```bash
# Backend Render fonctionne :
curl https://cardpro-21dj.onrender.com/api/health
# ✅ {"success": true, "mongodb": "connected"}

# Frontend Vercel essaie d'appeler :
curl https://carte-pro-fqfz.vercel.app/api/health  
# ❌ DEPLOYMENT_NOT_FOUND
```

## Solutions à Tester

### Solution 1 : Vérifier Configuration Vercel
1. Dashboard Vercel → Settings → Environment Variables
2. Vérifier que `VITE_API_URL` = `https://cardpro-21dj.onrender.com/api`
3. **IMPORTANT** : Cocher "Production" ET "Preview" ET "Development"
4. Redéployer complètement

### Solution 2 : Forcer le Build avec Variables
```bash
# Dans frontend/
VITE_API_URL=https://cardpro-21dj.onrender.com/api npm run build
```

### Solution 3 : Vérifier le Build
Ajouter un console.log temporaire dans api.js :
```javascript
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('API_URL:', API_URL);
```

## Action Immédiate
1. Vérifier que les variables Vercel sont cochées pour TOUS les environnements
2. Redéployer depuis GitHub (pas juste Redeploy)
3. Vérifier les logs de build Vercel

# 🚀 Guide de Déploiement Vercel - FuturistCards

## ✅ Configuration Production Finalisée

### 📋 Fichiers de Configuration

#### 1. `.nvmrc` - Force Node 18
```
18
```

#### 2. `package.json` - Configuration Optimale
```json
{
  "name": "futuristcards-frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "engines": {
    "node": "18.x"
  },
  "dependencies": {
    "@heroicons/react": "^2.2.0",
    "@hookform/resolvers": "^5.2.2",
    "axios": "^1.3.4",
    "framer-motion": "^10.0.1",
    "next-themes": "^0.4.6",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-helmet-async": "^2.0.5",
    "react-hook-form": "^7.69.0",
    "react-hot-toast": "^2.4.0",
    "react-router-dom": "^6.30.2",
    "yup": "^1.7.1",
    "autoprefixer": "^10.4.23",
    "postcss": "^8.4.21",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "vite": "^4.5.0",
    "@vitejs/plugin-react": "^4.3.1",
    "rollup": "^3.29.4",
    "eslint": "^9.0.0",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.26"
  }
}
```

#### 3. `vite.config.js` - Configuration Minimale
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', '@heroicons/react'],
          forms: ['react-hook-form', '@hookform/resolvers', 'yup'],
          utils: ['axios', 'react-hot-toast']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
});
```

#### 4. `vercel.json` - Configuration Vercel
```json
{
  "installCommand": "npm install",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "env": {
    "VITE_API_URL": "https://futuristcards.onrender.com/api"
  }
}
```

### 🔧 Variables d'Environnement Vercel

À configurer dans le Dashboard Vercel :

```bash
# Variables essentielles
VITE_API_URL=https://futuristcards.onrender.com/api
VITE_API_BASE_URL=https://futuristcards.onrender.com/api
NODE_ENV=production

# Variables optionnelles
VITE_APP_NAME=FuturistCards
VITE_DEBUG_MODE=false
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true
```

### 🧪 Tests de Validation

```bash
# 1. Nettoyage
rm -rf node_modules package-lock.json

# 2. Installation
npm install
# ✅ Résultat : 224 packages installés

# 3. Build
npm run build
# ✅ Résultat : 2.83s, 1082 modules, assets optimisés

# 4. Preview
npm run preview
# ✅ Résultat : serveur local sur port 4173
```

### 📊 Assets Générés

```
dist/
├── index.html (3.35 kB)
├── assets/
│   ├── index-*.css (78.84 kB)
│   ├── vendor-*.js (139.21 kB) 
│   ├── ui-*.js (103.88 kB)
│   ├── index-*.js (85.37 kB)
│   ├── utils-*.js (50.45 kB)
│   └── forms-*.js (60.27 kB)
├── images/
├── favicon.ico
└── robots.txt
```

### ⚡ Optimisations Appliquées

1. **Versions Stables** : Vite 4.5.0 + Rollup 3.29.4
2. **Node 18** : Forcé via `.nvmrc` et `engines`
3. **Chunks Manuels** : Séparation vendor/router/ui/forms/utils
4. **Assets Optimisés** : Minification terser, target es2015
5. **Configuration Minimale** : Suppression configs inutiles

### 🚫 Erreurs Résolues

- ❌ `@rollup/rollup-linux-x64-gnu` → Downgrade Rollup 3.29.4
- ❌ `vite: command not found` → Vite dans devDependencies
- ❌ `npm ci exited with 1` → Package-lock.json régénéré
- ❌ Scripts complexes → Scripts simplifiés (dev, build, preview)

### 🎯 Résultat Final

- **URL** : https://futuristcards.vercel.app
- **Build Time** : ~3s
- **Bundle Size** : 139KB vendor optimisé
- **Déploiement** : Automatique sur push GitHub
- **Status** : Production-ready ✅

### 📝 Commandes de Maintenance

```bash
# Redéployer
git add . && git commit -m "update" && git push futuristcards main

# Tester localement
npm run build && npm run preview

# Vérifier versions
node --version  # doit être 18.x sur Vercel
npm list vite rollup
```

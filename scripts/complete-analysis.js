const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 ANALYSE COMPLÈTE FUTURISTCARDS - PHASE 1');
console.log('='.repeat(70));

const errors = {
  critical: [],
  warnings: [],
  info: []
};

// 1. STRUCTURE DU PROJET
console.log('\n📁 1. STRUCTURE DU PROJET');
console.log('-'.repeat(50));

const requiredDirs = [
  'frontend/src',
  'frontend/public',
  'frontend/public/locales',
  'backend/controllers',
  'backend/models',
  'backend/routes',
  'backend/middleware'
];

requiredDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${dir}`);
  } else {
    errors.critical.push(`Dossier manquant: ${dir}`);
    console.log(`❌ ${dir} - MANQUANT`);
  }
});

// 2. FICHIERS DE CONFIGURATION
console.log('\n⚙️  2. FICHIERS DE CONFIGURATION');
console.log('-'.repeat(50));

const configFiles = [
  'frontend/package.json',
  'frontend/vite.config.js',
  'frontend/tailwind.config.js',
  'backend/package.json',
  'backend/server.js'
];

configFiles.forEach(file => {
  const fullPath = path.join(__dirname, '..', file);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file}`);
  } else {
    errors.critical.push(`Fichier manquant: ${file}`);
    console.log(`❌ ${file} - MANQUANT`);
  }
});

// 3. VÉRIFICATION DES TRADUCTIONS
console.log('\n🌐 3. TRADUCTIONS I18N');
console.log('-'.repeat(50));

const languages = ['fr', 'en', 'he'];
const translations = {};

languages.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'frontend/public/locales', lang, 'translation.json');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    translations[lang] = JSON.parse(content);
    console.log(`✅ ${lang.toUpperCase()}: ${Object.keys(translations[lang]).length} sections`);
  } catch (error) {
    errors.critical.push(`Traduction ${lang}: ${error.message}`);
    console.log(`❌ ${lang.toUpperCase()}: ${error.message}`);
  }
});

// Vérifier la cohérence des clés
function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const keysByLang = {};
languages.forEach(lang => {
  if (translations[lang]) {
    keysByLang[lang] = new Set(getAllKeys(translations[lang]));
  }
});

const allKeys = new Set();
Object.values(keysByLang).forEach(keys => {
  keys.forEach(key => allKeys.add(key));
});

console.log(`Total clés uniques: ${allKeys.size}`);

languages.forEach(lang => {
  if (keysByLang[lang]) {
    const missing = [...allKeys].filter(key => !keysByLang[lang].has(key));
    if (missing.length > 0) {
      errors.warnings.push(`${lang}: ${missing.length} clés manquantes`);
      console.log(`⚠️  ${lang.toUpperCase()}: ${missing.length} clés manquantes`);
    } else {
      console.log(`✅ ${lang.toUpperCase()}: Toutes les clés présentes`);
    }
  }
});

// 4. VÉRIFICATION DES COMPOSANTS REACT
console.log('\n⚛️  4. COMPOSANTS REACT');
console.log('-'.repeat(50));

const srcDir = path.join(__dirname, '..', 'frontend/src');
const reactFiles = [];

function findFiles(dir, extensions = ['.jsx', '.js']) {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      findFiles(fullPath, extensions);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      reactFiles.push(fullPath);
    }
  });
}

findFiles(srcDir);
console.log(`Fichiers React trouvés: ${reactFiles.length}`);

let componentErrors = 0;
reactFiles.forEach(filePath => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(srcDir, filePath);
    
    // Vérifications basiques
    if (content.includes('console.log') && !content.includes('// dev only')) {
      errors.warnings.push(`${relativePath}: console.log détecté`);
      componentErrors++;
    }
    
    if (content.includes('useI18n') && !content.includes("import { useI18n }")) {
      errors.critical.push(`${relativePath}: Import useI18n manquant`);
      componentErrors++;
    }
    
    if (content.includes('useState') && !content.includes("import { useState }") && !content.includes("import React")) {
      errors.critical.push(`${relativePath}: Import useState manquant`);
      componentErrors++;
    }
    
  } catch (error) {
    errors.critical.push(`${path.relative(srcDir, filePath)}: ${error.message}`);
    componentErrors++;
  }
});

if (componentErrors === 0) {
  console.log('✅ Aucune erreur dans les composants React');
} else {
  console.log(`❌ ${componentErrors} erreurs détectées dans les composants`);
}

// 5. VÉRIFICATION DES PORTS
console.log('\n🔌 5. CONFIGURATION DES PORTS');
console.log('-'.repeat(50));

// Vérifier vite.config.js
const viteConfigPath = path.join(__dirname, '..', 'frontend/vite.config.js');
try {
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  
  if (viteConfig.includes('port: 3010')) {
    console.log('✅ Frontend configuré sur port 3010');
  } else if (viteConfig.includes('port:')) {
    const portMatch = viteConfig.match(/port:\s*(\d+)/);
    const currentPort = portMatch ? portMatch[1] : 'inconnu';
    errors.warnings.push(`Frontend sur port ${currentPort}, requis: 3010`);
    console.log(`⚠️  Frontend sur port ${currentPort}, requis: 3010`);
  } else {
    errors.warnings.push('Port frontend non configuré dans vite.config.js');
    console.log('⚠️  Port frontend non configuré');
  }
} catch (error) {
  errors.critical.push(`vite.config.js: ${error.message}`);
}

// Vérifier backend server.js
const serverPath = path.join(__dirname, '..', 'backend/server.js');
try {
  const serverConfig = fs.readFileSync(serverPath, 'utf8');
  
  if (serverConfig.includes('3002') || serverConfig.includes('5001')) {
    console.log('✅ Backend configuré sur port approprié');
  } else {
    errors.warnings.push('Port backend non standard détecté');
    console.log('⚠️  Port backend à vérifier');
  }
} catch (error) {
  errors.critical.push(`server.js: ${error.message}`);
}

// 6. VÉRIFICATION DES DÉPENDANCES
console.log('\n📦 6. DÉPENDANCES');
console.log('-'.repeat(50));

const frontendPackagePath = path.join(__dirname, '..', 'frontend/package.json');
try {
  const packageJson = JSON.parse(fs.readFileSync(frontendPackagePath, 'utf8'));
  
  const requiredDeps = [
    'react', 'react-dom', 'react-router-dom', 'axios', 
    'i18next', 'react-i18next', 'framer-motion'
  ];
  
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  requiredDeps.forEach(dep => {
    if (allDeps[dep]) {
      console.log(`✅ ${dep}: ${allDeps[dep]}`);
    } else {
      errors.critical.push(`Dépendance manquante: ${dep}`);
      console.log(`❌ ${dep}: MANQUANT`);
    }
  });
  
} catch (error) {
  errors.critical.push(`package.json frontend: ${error.message}`);
}

// 7. RÉSUMÉ FINAL
console.log('\n📊 7. RÉSUMÉ DES ERREURS');
console.log('='.repeat(70));

const totalErrors = errors.critical.length + errors.warnings.length;

console.log(`🔴 Erreurs critiques: ${errors.critical.length}`);
console.log(`🟡 Avertissements: ${errors.warnings.length}`);
console.log(`🔵 Informations: ${errors.info.length}`);
console.log(`📊 Total: ${totalErrors} problèmes détectés`);

if (errors.critical.length > 0) {
  console.log('\n🔴 ERREURS CRITIQUES À CORRIGER:');
  errors.critical.forEach((error, index) => {
    console.log(`${index + 1}. ${error}`);
  });
}

if (errors.warnings.length > 0) {
  console.log('\n🟡 AVERTISSEMENTS:');
  errors.warnings.slice(0, 10).forEach((warning, index) => {
    console.log(`${index + 1}. ${warning}`);
  });
  if (errors.warnings.length > 10) {
    console.log(`... et ${errors.warnings.length - 10} autres avertissements`);
  }
}

// 8. RECOMMANDATIONS
console.log('\n💡 8. RECOMMANDATIONS PRIORITAIRES');
console.log('-'.repeat(50));

if (totalErrors === 0) {
  console.log('🎉 PROJET PRÊT POUR LA PHASE 2 (DESIGN)');
} else {
  console.log('⚠️  CORRECTIONS NÉCESSAIRES AVANT PHASE 2:');
  
  if (errors.critical.length > 0) {
    console.log('1. Corriger toutes les erreurs critiques');
  }
  
  console.log('2. Configurer les ports (frontend: 3010, backend: 3002)');
  console.log('3. Compléter les traductions manquantes');
  console.log('4. Nettoyer les console.log');
  console.log('5. Vérifier les imports React');
}

console.log('\n' + '='.repeat(70));
console.log(`Analyse terminée: ${new Date().toLocaleString('fr-FR')}`);
console.log('='.repeat(70));

// Retourner le code d'erreur approprié
process.exit(errors.critical.length > 0 ? 1 : 0);

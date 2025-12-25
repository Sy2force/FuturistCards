const fs = require('fs');
const path = require('path');

console.log('🔍 RAPPORT COMPLET D\'ANALYSE DES ERREURS - FUTURISTCARDS\n');
console.log('='.repeat(60));

// 1. VÉRIFICATION DES FICHIERS DE TRADUCTION
console.log('\n📋 1. ANALYSE DES TRADUCTIONS');
console.log('-'.repeat(40));

const translationsDir = path.join(__dirname, '../frontend/public/locales');
const languages = ['fr', 'en', 'he'];
const translations = {};
let translationErrors = [];

for (const lang of languages) {
  const filePath = path.join(translationsDir, lang, 'translation.json');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    translations[lang] = JSON.parse(content);
    console.log(`✅ ${lang.toUpperCase()}: Fichier valide (${Object.keys(translations[lang]).length} clés racines)`);
  } catch (error) {
    translationErrors.push(`❌ ${lang.toUpperCase()}: ${error.message}`);
    console.log(`❌ ${lang.toUpperCase()}: ERREUR - ${error.message}`);
  }
}

// Fonction pour extraire toutes les clés
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

// Vérifier la cohérence des clés
const keysByLang = {};
for (const lang of languages) {
  if (translations[lang]) {
    keysByLang[lang] = new Set(getAllKeys(translations[lang]));
  }
}

const allKeys = new Set();
for (const lang of languages) {
  if (keysByLang[lang]) {
    keysByLang[lang].forEach(key => allKeys.add(key));
  }
}

console.log(`\nTotal des clés uniques: ${allKeys.size}`);

// Clés manquantes par langue
for (const lang of languages) {
  if (keysByLang[lang]) {
    const missingKeys = [...allKeys].filter(key => !keysByLang[lang].has(key));
    if (missingKeys.length > 0) {
      translationErrors.push(`${lang.toUpperCase()}: ${missingKeys.length} clés manquantes`);
      console.log(`❌ ${lang.toUpperCase()}: ${missingKeys.length} clés manquantes`);
      missingKeys.slice(0, 5).forEach(key => console.log(`   - ${key}`));
      if (missingKeys.length > 5) console.log(`   ... et ${missingKeys.length - 5} autres`);
    } else {
      console.log(`✅ ${lang.toUpperCase()}: Toutes les clés présentes`);
    }
  }
}

// 2. VÉRIFICATION DES FICHIERS REACT
console.log('\n📋 2. ANALYSE DES COMPOSANTS REACT');
console.log('-'.repeat(40));

const reactFiles = [];
const srcDir = path.join(__dirname, '../frontend/src');

function findReactFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findReactFiles(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
      reactFiles.push(fullPath);
    }
  }
}

findReactFiles(srcDir);
console.log(`Fichiers React trouvés: ${reactFiles.length}`);

let reactErrors = [];
let translationUsageErrors = [];

for (const filePath of reactFiles) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(srcDir, filePath);
    
    // Vérifier les imports manquants
    if (content.includes('useI18n') && !content.includes("import { useI18n }")) {
      reactErrors.push(`${relativePath}: Import useI18n manquant`);
    }
    
    // Vérifier les clés de traduction utilisées
    const tMatches = content.match(/t\(['"`]([^'"`]+)['"`]\)/g);
    if (tMatches) {
      for (const match of tMatches) {
        const keyMatch = match.match(/t\(['"`]([^'"`]+)['"`]\)/);
        if (keyMatch) {
          const key = keyMatch[1];
          // Vérifier si la clé existe dans toutes les langues
          let keyExists = true;
          for (const lang of languages) {
            if (keysByLang[lang] && !keysByLang[lang].has(key)) {
              keyExists = false;
              break;
            }
          }
          if (!keyExists) {
            translationUsageErrors.push(`${relativePath}: Clé "${key}" utilisée mais non définie`);
          }
        }
      }
    }
    
  } catch (error) {
    reactErrors.push(`${path.relative(srcDir, filePath)}: Erreur de lecture - ${error.message}`);
  }
}

if (reactErrors.length === 0) {
  console.log('✅ Aucune erreur dans les composants React');
} else {
  console.log(`❌ ${reactErrors.length} erreurs trouvées:`);
  reactErrors.slice(0, 10).forEach(error => console.log(`   - ${error}`));
  if (reactErrors.length > 10) console.log(`   ... et ${reactErrors.length - 10} autres`);
}

// 3. VÉRIFICATION DES DÉPENDANCES
console.log('\n📋 3. ANALYSE DES DÉPENDANCES');
console.log('-'.repeat(40));

const packageJsonPath = path.join(__dirname, '../frontend/package.json');
let dependencyErrors = [];

try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const requiredDeps = [
    'react', 'react-dom', 'react-router-dom', 'axios', 'i18next', 'react-i18next'
  ];
  
  const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  for (const dep of requiredDeps) {
    if (!allDeps[dep]) {
      dependencyErrors.push(`Dépendance manquante: ${dep}`);
    } else {
      console.log(`✅ ${dep}: ${allDeps[dep]}`);
    }
  }
  
  if (dependencyErrors.length === 0) {
    console.log('✅ Toutes les dépendances requises sont présentes');
  }
  
} catch (error) {
  dependencyErrors.push(`Erreur lecture package.json: ${error.message}`);
}

// 4. VÉRIFICATION DE LA CONFIGURATION
console.log('\n📋 4. ANALYSE DE LA CONFIGURATION');
console.log('-'.repeat(40));

let configErrors = [];

// Vérifier vite.config.js
const viteConfigPath = path.join(__dirname, '../frontend/vite.config.js');
try {
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  console.log('✅ vite.config.js présent');
  
  if (!viteConfig.includes('server:')) {
    configErrors.push('Configuration serveur manquante dans vite.config.js');
  }
} catch (error) {
  configErrors.push(`vite.config.js: ${error.message}`);
}

// Vérifier .env.example
const envExamplePath = path.join(__dirname, '../frontend/.env.example');
try {
  fs.readFileSync(envExamplePath, 'utf8');
  console.log('✅ .env.example présent');
} catch (error) {
  configErrors.push(`.env.example manquant: ${error.message}`);
}

// 5. RÉSUMÉ FINAL
console.log('\n📋 5. RÉSUMÉ FINAL DES ERREURS');
console.log('='.repeat(60));

const totalErrors = translationErrors.length + reactErrors.length + 
                   dependencyErrors.length + configErrors.length + 
                   translationUsageErrors.length;

if (totalErrors === 0) {
  console.log('🎉 AUCUNE ERREUR DÉTECTÉE !');
  console.log('✅ Le projet est prêt pour la production');
} else {
  console.log(`⚠️  TOTAL: ${totalErrors} erreurs détectées`);
  
  if (translationErrors.length > 0) {
    console.log(`\n❌ TRADUCTIONS (${translationErrors.length}):`);
    translationErrors.forEach(error => console.log(`   - ${error}`));
  }
  
  if (translationUsageErrors.length > 0) {
    console.log(`\n❌ UTILISATION TRADUCTIONS (${translationUsageErrors.length}):`);
    translationUsageErrors.slice(0, 5).forEach(error => console.log(`   - ${error}`));
    if (translationUsageErrors.length > 5) {
      console.log(`   ... et ${translationUsageErrors.length - 5} autres`);
    }
  }
  
  if (reactErrors.length > 0) {
    console.log(`\n❌ COMPOSANTS REACT (${reactErrors.length}):`);
    reactErrors.slice(0, 5).forEach(error => console.log(`   - ${error}`));
    if (reactErrors.length > 5) {
      console.log(`   ... et ${reactErrors.length - 5} autres`);
    }
  }
  
  if (dependencyErrors.length > 0) {
    console.log(`\n❌ DÉPENDANCES (${dependencyErrors.length}):`);
    dependencyErrors.forEach(error => console.log(`   - ${error}`));
  }
  
  if (configErrors.length > 0) {
    console.log(`\n❌ CONFIGURATION (${configErrors.length}):`);
    configErrors.forEach(error => console.log(`   - ${error}`));
  }
}

console.log('\n' + '='.repeat(60));
console.log('Rapport généré le:', new Date().toLocaleString('fr-FR'));
console.log('='.repeat(60));

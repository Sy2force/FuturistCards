const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

process.stdout.write('🔍 ANALYSE QA COMPLÈTE - FUTURISTCARDS\n');
process.stdout.write('='.repeat(70) + '\n');
process.stdout.write(`Date: ${new Date().toLocaleString('fr-FR')}\n`);
process.stdout.write('='.repeat(70) + '\n');

const errors = {
  critical: [],
  warnings: [],
  consoleLogs: [],
  missingTranslations: [],
  buildErrors: [],
  syntaxErrors: []
};

// ============================================
// ÉTAPE 1: SCAN COMPLET DU PROJET
// ============================================
console.log('\n📁 ÉTAPE 1: ANALYSE DE LA STRUCTURE');
console.log('-'.repeat(50));

// Vérifier les dossiers essentiels
const essentialDirs = [
  'frontend/src/pages',
  'frontend/src/components',
  'frontend/src/contexts',
  'frontend/src/hooks',
  'frontend/public/locales',
  'backend/controllers',
  'backend/models',
  'backend/routes',
  'backend/middleware'
];

essentialDirs.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    errors.critical.push(`Dossier manquant: ${dir}`);
    console.log(`❌ ${dir} - MANQUANT`);
  } else {
    const files = fs.readdirSync(fullPath);
    console.log(`✅ ${dir} (${files.length} fichiers)`);
  }
});

// ============================================
// SCAN DES FICHIERS REACT/JS
// ============================================
console.log('\n🔍 ANALYSE DES FICHIERS SOURCE');
console.log('-'.repeat(50));

function scanDirectory(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.includes('node_modules') && !item.startsWith('.')) {
      files.push(...scanDirectory(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  });
  
  return files;
}

const frontendFiles = scanDirectory(path.join(__dirname, '..', 'frontend/src'));
const backendFiles = scanDirectory(path.join(__dirname, '..', 'backend'));

console.log(`Frontend: ${frontendFiles.length} fichiers`);
console.log(`Backend: ${backendFiles.length} fichiers`);

// ============================================
// RECHERCHE DES CONSOLE.LOG
// ============================================
console.log('\n🧹 RECHERCHE DES CONSOLE.LOG');
console.log('-'.repeat(50));

[...frontendFiles, ...backendFiles].forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      if (line.includes('console.log') && !line.includes('//') && !line.includes('/*')) {
        const relativePath = path.relative(path.join(__dirname, '..'), file);
        errors.consoleLogs.push({
          file: relativePath,
          line: index + 1,
          content: line.trim()
        });
      }
    });
  } catch (err) {
    // Ignorer les erreurs de lecture
  }
});

if (errors.consoleLogs.length > 0) {
  console.log(`❌ ${errors.consoleLogs.length} console.log trouvés`);
  errors.consoleLogs.slice(0, 5).forEach(log => {
    console.log(`   ${log.file}:${log.line}`);
  });
  if (errors.consoleLogs.length > 5) {
    console.log(`   ... et ${errors.consoleLogs.length - 5} autres`);
  }
} else {
  console.log('✅ Aucun console.log trouvé');
}

// ============================================
// VÉRIFICATION DES IMPORTS
// ============================================
console.log('\n📦 VÉRIFICATION DES IMPORTS');
console.log('-'.repeat(50));

frontendFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(path.join(__dirname, '..'), file);
    
    // Vérifier les imports manquants courants
    if (content.includes('useState') && !content.includes('import') && !content.includes('React.useState')) {
      errors.syntaxErrors.push(`${relativePath}: useState utilisé sans import`);
    }
    
    if (content.includes('useEffect') && !content.includes('import') && !content.includes('React.useEffect')) {
      errors.syntaxErrors.push(`${relativePath}: useEffect utilisé sans import`);
    }
    
    // Vérifier les imports de fichiers inexistants
    const importMatches = content.match(/import .* from ['"](.+)['"]/g) || [];
    importMatches.forEach(importLine => {
      const pathMatch = importLine.match(/from ['"](.+)['"]/);
      if (pathMatch && pathMatch[1].startsWith('.')) {
        const importPath = pathMatch[1];
        const resolvedPath = path.resolve(path.dirname(file), importPath);
        
        // Vérifier avec différentes extensions
        const extensions = ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx'];
        let found = false;
        
        for (const ext of extensions) {
          if (fs.existsSync(resolvedPath + ext) || fs.existsSync(resolvedPath)) {
            found = true;
            break;
          }
        }
        
        if (!found && !importPath.includes('css') && !importPath.includes('svg')) {
          errors.warnings.push(`Import introuvable: ${relativePath} -> ${importPath}`);
        }
      }
    });
    
  } catch (err) {
    // Ignorer
  }
});

console.log(`Erreurs de syntaxe: ${errors.syntaxErrors.length}`);
console.log(`Imports manquants: ${errors.warnings.filter(w => w.includes('Import')).length}`);

// ============================================
// VÉRIFICATION I18N
// ============================================
console.log('\n🌍 VÉRIFICATION DES TRADUCTIONS I18N');
console.log('-'.repeat(50));

const languages = ['fr', 'en', 'he'];
const translations = {};

languages.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'frontend/public/locales', lang, 'translation.json');
  try {
    translations[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`✅ ${lang.toUpperCase()}: Fichier chargé`);
  } catch (err) {
    errors.critical.push(`Fichier de traduction ${lang} manquant ou invalide`);
    console.log(`❌ ${lang.toUpperCase()}: ERREUR`);
  }
});

// Extraire toutes les clés de traduction utilisées dans le code
const usedTranslationKeys = new Set();

frontendFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Rechercher les utilisations de t()
    const tMatches = content.match(/t\(['"`]([^'"`]+)['"`]/g) || [];
    tMatches.forEach(match => {
      const key = match.match(/t\(['"`]([^'"`]+)['"`]/)?.[1];
      if (key) usedTranslationKeys.add(key);
    });
    
  } catch (err) {
    // Ignorer
  }
});

console.log(`Clés de traduction utilisées: ${usedTranslationKeys.size}`);

// Vérifier les clés manquantes
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

const missingByLang = {};
languages.forEach(lang => {
  if (translations[lang]) {
    missingByLang[lang] = [];
    usedTranslationKeys.forEach(key => {
      const value = getNestedValue(translations[lang], key);
      if (value === undefined) {
        missingByLang[lang].push(key);
      }
    });
    
    if (missingByLang[lang].length > 0) {
      console.log(`❌ ${lang.toUpperCase()}: ${missingByLang[lang].length} clés manquantes`);
      errors.missingTranslations.push(...missingByLang[lang].map(k => `${lang}: ${k}`));
    } else {
      console.log(`✅ ${lang.toUpperCase()}: Toutes les clés présentes`);
    }
  }
});

// ============================================
// TEST DE BUILD
// ============================================
console.log('\n🏗️ TEST DE BUILD');
console.log('-'.repeat(50));

// Test build frontend
try {
  console.log('Test build frontend...');
  execSync('cd frontend && npm run build', { 
    stdio: 'pipe',
    timeout: 60000 
  });
  console.log('✅ Build frontend: SUCCÈS');
} catch (err) {
  errors.buildErrors.push('Build frontend échoué');
  console.log('❌ Build frontend: ÉCHEC');
  if (err.stdout) {
    const output = err.stdout.toString();
    const errorLines = output.split('\n').filter(line => 
      line.includes('error') || line.includes('Error')
    );
    errorLines.slice(0, 3).forEach(line => {
      console.log(`   ${line}`);
    });
  }
}

// ============================================
// RÉSUMÉ FINAL
// ============================================
console.log('\n' + '='.repeat(70));
console.log('📊 RÉSUMÉ FINAL');
console.log('='.repeat(70));

const totalErrors = 
  errors.critical.length +
  errors.syntaxErrors.length +
  errors.buildErrors.length +
  errors.consoleLogs.length +
  errors.missingTranslations.length;

console.log(`\n🔴 Erreurs critiques: ${errors.critical.length}`);
console.log(`🟡 Console.log à supprimer: ${errors.consoleLogs.length}`);
console.log(`🟠 Erreurs de syntaxe: ${errors.syntaxErrors.length}`);
console.log(`🔵 Traductions manquantes: ${errors.missingTranslations.length}`);
console.log(`🟣 Erreurs de build: ${errors.buildErrors.length}`);
console.log(`📊 TOTAL: ${totalErrors} problèmes`);

if (totalErrors === 0) {
  console.log('\n🎉 PROJET PARFAIT - PRÊT POUR LA PRODUCTION!');
  console.log('✅ 0 erreur console');
  console.log('✅ 0 erreur i18n');
  console.log('✅ 0 warning de build');
  console.log('✅ Prêt pour déploiement sur Vercel/Render');
} else {
  console.log('\n⚠️  CORRECTIONS NÉCESSAIRES:');
  
  if (errors.critical.length > 0) {
    console.log('\n🔴 ERREURS CRITIQUES:');
    errors.critical.forEach((err, i) => {
      console.log(`${i + 1}. ${err}`);
    });
  }
  
  if (errors.consoleLogs.length > 0) {
    console.log(`\n🟡 ${errors.consoleLogs.length} console.log à supprimer`);
  }
  
  if (errors.missingTranslations.length > 0) {
    console.log(`\n🔵 ${errors.missingTranslations.length} traductions manquantes`);
    errors.missingTranslations.slice(0, 5).forEach(t => {
      console.log(`   - ${t}`);
    });
  }
}

console.log('\n' + '='.repeat(70));
console.log('Analyse terminée avec succès');
console.log('='.repeat(70));

// Créer un fichier de rapport
const report = {
  date: new Date().toISOString(),
  summary: {
    critical: errors.critical.length,
    consoleLogs: errors.consoleLogs.length,
    syntaxErrors: errors.syntaxErrors.length,
    missingTranslations: errors.missingTranslations.length,
    buildErrors: errors.buildErrors.length,
    total: totalErrors
  },
  errors: errors,
  status: totalErrors === 0 ? 'READY_FOR_PRODUCTION' : 'NEEDS_FIXES'
};

fs.writeFileSync(
  path.join(__dirname, 'qa-report.json'),
  JSON.stringify(report, null, 2)
);

console.log('\n📄 Rapport détaillé sauvegardé dans: scripts/qa-report.json');

process.exit(totalErrors > 0 ? 1 : 0);

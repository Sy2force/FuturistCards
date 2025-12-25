#!/usr/bin/env node

/**
 * Script de nettoyage automatique des imports inutilisés
 * Usage: node scripts/clean-imports.js
 */

const fs = require('fs');
const path = require('path');

const FRONTEND_SRC = path.join(__dirname, '../frontend/src');

function findUnusedImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const imports = [];
  const unusedImports = [];

  // Extraire les imports
  lines.forEach((line, index) => {
    const importMatch = line.match(/import\s+(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+))\s+from\s+['"]([^'"]+)['"]/);
    if (importMatch) {
      const [, namedImports, namespaceImport, defaultImport, modulePath] = importMatch;
      
      if (namedImports) {
        const names = namedImports.split(',').map(name => name.trim());
        names.forEach(name => {
          const cleanName = name.replace(/\s+as\s+\w+/, '').trim();
          if (!content.includes(cleanName) || content.split(cleanName).length <= 2) {
            unusedImports.push({ line: index + 1, import: cleanName, fullLine: line });
          }
        });
      }
      
      if (defaultImport && (!content.includes(defaultImport) || content.split(defaultImport).length <= 2)) {
        unusedImports.push({ line: index + 1, import: defaultImport, fullLine: line });
      }
      
      if (namespaceImport && (!content.includes(namespaceImport) || content.split(namespaceImport).length <= 2)) {
        unusedImports.push({ line: index + 1, import: namespaceImport, fullLine: line });
      }
    }
  });

  return unusedImports;
}

function scanDirectory(dir) {
  const results = [];
  
  function scan(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        scan(fullPath);
      } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.jsx'))) {
        const unusedImports = findUnusedImports(fullPath);
        if (unusedImports.length > 0) {
          results.push({
            file: path.relative(FRONTEND_SRC, fullPath),
            unusedImports
          });
        }
      }
    });
  }
  
  scan(dir);
  return results;
}

console.log('🧹 NETTOYAGE DES IMPORTS INUTILISÉS\n');

const results = scanDirectory(FRONTEND_SRC);

if (results.length === 0) {
  console.log('✅ Aucun import inutilisé détecté !');
} else {
  console.log(`⚠️  ${results.length} fichier(s) avec des imports potentiellement inutilisés :\n`);
  
  results.forEach(({ file, unusedImports }) => {
    console.log(`📄 ${file}`);
    unusedImports.forEach(({ line, import: importName, fullLine }) => {
      console.log(`   Ligne ${line}: ${importName}`);
      console.log(`   ${fullLine.trim()}`);
    });
    console.log('');
  });
}

console.log('\n🎯 Nettoyage terminé !');

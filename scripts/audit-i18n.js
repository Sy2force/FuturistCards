#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const hardcodedTexts = [];
const missingTranslations = new Set();

function checkHardcodedText(file) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Skip import statements and comments
    if (line.trim().startsWith('import') || line.trim().startsWith('//') || line.trim().startsWith('/*')) {
      return;
    }
    
    // Check for hardcoded text in JSX
    const jsxTextRegex = />([A-Za-z][^<>{}\n]*[A-Za-z\s]+)</g;
    const matches = [...line.matchAll(jsxTextRegex)];
    
    matches.forEach(match => {
      const text = match[1].trim();
      // Skip if it's a variable or uses t()
      if (!text.includes('{') && 
          !text.includes('t(') && 
          text.length > 2 && 
          !text.match(/^[0-9\s\-\+\*\/\=\%]+$/)) {
        hardcodedTexts.push({
          file: path.relative('./frontend/src', file),
          line: index + 1,
          text: text
        });
      }
    });
    
    // Check for hardcoded text in props
    const propTextRegex = /(?:placeholder|title|label|alt|aria-label)=["']([^"']+)["']/g;
    const propMatches = [...line.matchAll(propTextRegex)];
    
    propMatches.forEach(match => {
      const text = match[1].trim();
      if (!text.includes('{') && !text.includes('t(') && text.length > 2) {
        hardcodedTexts.push({
          file: path.relative('./frontend/src', file),
          line: index + 1,
          text: text,
          type: 'prop'
        });
      }
    });
  });
}

function scanJSX(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !file.includes('node_modules')) {
      scanJSX(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
      checkHardcodedText(fullPath);
    }
  }
}

console.log('🌐 AUDIT i18n - RECHERCHE DE TEXTES NON TRADUITS\n');

scanJSX('./frontend/src');

const byFile = {};
if (hardcodedTexts.length > 0) {
  hardcodedTexts.forEach(item => {
    if (!byFile[item.file]) {
      byFile[item.file] = [];
    }
    byFile[item.file].push(item);
  });
}

if (hardcodedTexts.length === 0) {
  console.log('✅ Aucun texte en dur détecté ! Tous les textes utilisent t()');
} else {
  console.log(`❌ ${hardcodedTexts.length} textes en dur détectés:\n`);
  
  Object.entries(byFile).forEach(([file, texts]) => {
    console.log(`📄 ${file}:`);
    texts.forEach(({ line, text, type }) => {
      console.log(`   L${line}: "${text}"${type ? ` (${type})` : ''}`);
    });
    console.log('');
  });
}

console.log('\n📊 RÉSUMÉ:');
const fileCount = Object.keys(byFile).length;
console.log(`   Fichiers analysés: ${fileCount}`);
console.log(`   Textes en dur: ${hardcodedTexts.length}`);

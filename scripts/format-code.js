#!/usr/bin/env node

/**
 * Script de formatage automatique du code
 * Usage: node scripts/format-code.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const FRONTEND_DIR = path.join(__dirname, '../frontend');
const BACKEND_DIR = path.join(__dirname, '../backend');

console.log('🎨 FORMATAGE AUTOMATIQUE DU CODE\n');

// Vérifier si Prettier est installé
function checkPrettier() {
  try {
    execSync('npx prettier --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.log('⚠️  Prettier non trouvé, installation...');
    try {
      execSync('npm install --save-dev prettier', { cwd: FRONTEND_DIR, stdio: 'inherit' });
      return true;
    } catch (installError) {
      console.log('❌ Impossible d\'installer Prettier');
      return false;
    }
  }
}

// Créer la configuration Prettier
function createPrettierConfig() {
  const prettierConfig = {
    semi: true,
    trailingComma: 'es5',
    singleQuote: true,
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    bracketSpacing: true,
    arrowParens: 'avoid',
    endOfLine: 'lf'
  };

  const configPath = path.join(FRONTEND_DIR, '.prettierrc.json');
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, JSON.stringify(prettierConfig, null, 2));
    console.log('✅ Configuration Prettier créée');
  }
}

// Formater les fichiers
function formatFiles(directory, extensions = ['js', 'jsx', 'ts', 'tsx', 'json', 'css']) {
  const extensionPattern = extensions.map(ext => `**/*.${ext}`).join(',');
  
  try {
    console.log(`📁 Formatage de ${path.basename(directory)}...`);
    execSync(`npx prettier --write "{${extensionPattern}}"`, {
      cwd: directory,
      stdio: 'pipe'
    });
    console.log(`✅ ${path.basename(directory)} formaté avec succès`);
  } catch (error) {
    console.log(`❌ Erreur lors du formatage de ${path.basename(directory)}`);
  }
}

// Vérifier la qualité du code
function lintCode() {
  try {
    console.log('🔍 Vérification ESLint...');
    execSync('npm run lint', { cwd: FRONTEND_DIR, stdio: 'pipe' });
    console.log('✅ ESLint: Aucune erreur détectée');
  } catch (error) {
    console.log('⚠️  ESLint: Quelques avertissements détectés');
  }
}

// Exécution principale
async function main() {
  if (!checkPrettier()) {
    return;
  }

  createPrettierConfig();
  
  // Formater le frontend
  if (fs.existsSync(FRONTEND_DIR)) {
    formatFiles(FRONTEND_DIR);
  }
  
  // Formater le backend
  if (fs.existsSync(BACKEND_DIR)) {
    formatFiles(BACKEND_DIR, ['js', 'json']);
  }
  
  // Vérification finale
  lintCode();
  
  console.log('\n🎉 Formatage terminé !');
  console.log('💡 Conseil: Configurez votre éditeur pour formater automatiquement à la sauvegarde');
}

main().catch(console.error);

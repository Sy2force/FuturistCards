#!/usr/bin/env node

/**
 * Script de nettoyage des fichiers parasites pour FuturistCards
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 Nettoyage des fichiers parasites\n');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function deleteFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      log(`✅ Supprimé: ${filePath}`, 'green');
      return true;
    }
    return false;
  } catch (error) {
    log(`❌ Erreur suppression: ${filePath} - ${error.message}`, 'red');
    return false;
  }
}

function deleteDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      log(`✅ Dossier supprimé: ${dirPath}`, 'green');
      return true;
    }
    return false;
  } catch (error) {
    log(`❌ Erreur suppression dossier: ${dirPath} - ${error.message}`, 'red');
    return false;
  }
}

// Fichiers de log et temporaires
const filesToDelete = [
  'reset-debug.log',
  'frontend/reset-debug.log',
  'backend/reset-debug.log',
  'npm-debug.log',
  'frontend/npm-debug.log',
  'backend/npm-debug.log',
  'yarn-error.log',
  'frontend/yarn-error.log',
  'backend/yarn-error.log',
  '.DS_Store',
  'frontend/.DS_Store',
  'backend/.DS_Store',
  'Thumbs.db',
  'desktop.ini'
];

// Dossiers temporaires
const dirsToDelete = [
  '.tmp',
  'tmp',
  'temp',
  'frontend/.tmp',
  'backend/.tmp',
  'frontend/dist',
  'backend/dist',
  'coverage',
  'frontend/coverage',
  'backend/coverage'
];

log('🗑️  Suppression des fichiers temporaires:', 'blue');
let deletedFiles = 0;

filesToDelete.forEach(file => {
  if (deleteFile(file)) {
    deletedFiles++;
  }
});

log('\n🗂️  Suppression des dossiers temporaires:', 'blue');
let deletedDirs = 0;

dirsToDelete.forEach(dir => {
  if (deleteDirectory(dir)) {
    deletedDirs++;
  }
});

// Nettoyage des fichiers cachés système
log('\n🔍 Recherche de fichiers cachés système:', 'blue');

function findAndDeleteSystemFiles(dir) {
  try {
    if (!fs.existsSync(dir)) return 0;
    
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let deleted = 0;
    
    files.forEach(file => {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        if (file.name !== 'node_modules' && file.name !== '.git') {
          deleted += findAndDeleteSystemFiles(fullPath);
        }
      } else {
        // Fichiers système à supprimer
        if (file.name === '.DS_Store' || 
            file.name === 'Thumbs.db' || 
            file.name === 'desktop.ini' ||
            file.name.endsWith('.log') ||
            file.name.endsWith('.tmp')) {
          if (deleteFile(fullPath)) {
            deleted++;
          }
        }
      }
    });
    
    return deleted;
  } catch (error) {
    return 0;
  }
}

const systemFilesDeleted = findAndDeleteSystemFiles('.');

log(`\n📊 Résumé du nettoyage:`, 'blue');
log(`Fichiers supprimés: ${deletedFiles + systemFilesDeleted}`, 'yellow');
log(`Dossiers supprimés: ${deletedDirs}`, 'yellow');

if (deletedFiles + deletedDirs + systemFilesDeleted > 0) {
  log('\n✨ Nettoyage terminé avec succès !', 'green');
} else {
  log('\n✅ Aucun fichier parasite trouvé. Le projet est déjà propre !', 'green');
}

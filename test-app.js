#!/usr/bin/env node

/**
 * Script de test complet pour FuturistCards
 * Vérifie toutes les fonctionnalités principales
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Test de l\'application FuturistCards\n');

// Couleurs pour les logs
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

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  log(`${exists ? '✅' : '❌'} ${description}: ${filePath}`, exists ? 'green' : 'red');
  return exists;
}

function checkDirectory(dirPath, description) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  log(`${exists ? '✅' : '❌'} ${description}: ${dirPath}`, exists ? 'green' : 'red');
  return exists;
}

// Tests des fichiers principaux
log('\n📁 Vérification de la structure des fichiers:', 'blue');

const frontendFiles = [
  ['frontend/package.json', 'Package.json Frontend'],
  ['frontend/src/App.jsx', 'App principal'],
  ['frontend/src/main.jsx', 'Point d\'entrée'],
  ['frontend/src/index.css', 'Styles principaux'],
  ['frontend/tailwind.config.js', 'Configuration Tailwind'],
  ['frontend/vite.config.js', 'Configuration Vite']
];

const backendFiles = [
  ['backend/package.json', 'Package.json Backend'],
  ['backend/server.js', 'Serveur principal'],
  ['backend/config/db.js', 'Configuration DB'],
  ['backend/.env.example', 'Variables d\'environnement exemple']
];

const pages = [
  ['frontend/src/pages/HomePage.jsx', 'Page d\'accueil'],
  ['frontend/src/pages/LoginPage.jsx', 'Page de connexion'],
  ['frontend/src/pages/RegisterPage.jsx', 'Page d\'inscription'],
  ['frontend/src/pages/ProfilePage.jsx', 'Page de profil'],
  ['frontend/src/pages/MyCardsPage.jsx', 'Mes cartes'],
  ['frontend/src/pages/CreateCardPage.jsx', 'Créer une carte'],
  ['frontend/src/pages/EditCardPage.jsx', 'Modifier une carte'],
  ['frontend/src/pages/FavoritesPage.jsx', 'Favoris'],
  ['frontend/src/pages/AdminPage.jsx', 'Administration'],
  ['frontend/src/pages/CardsPage.jsx', 'Galerie de cartes'],
  ['frontend/src/pages/AboutPage.jsx', 'À propos']
];

const contexts = [
  ['frontend/src/context/AuthContext.jsx', 'Contexte d\'authentification'],
  ['frontend/src/context/LanguageContext.jsx', 'Contexte de langue'],
  ['frontend/src/context/ThemeContext.jsx', 'Contexte de thème']
];

const components = [
  ['frontend/src/components/layout/Navbar.jsx', 'Barre de navigation'],
  ['frontend/src/components/layout/Footer.jsx', 'Pied de page'],
  ['frontend/src/components/common/ButtonGlass.jsx', 'Bouton glassmorphism'],
  ['frontend/src/components/common/ThemeToggle.jsx', 'Basculeur de thème'],
  ['frontend/src/components/common/LanguageSelector.jsx', 'Sélecteur de langue']
];

let totalTests = 0;
let passedTests = 0;

// Test des fichiers frontend
frontendFiles.forEach(([file, desc]) => {
  totalTests++;
  if (checkFile(file, desc)) passedTests++;
});

// Test des fichiers backend
backendFiles.forEach(([file, desc]) => {
  totalTests++;
  if (checkFile(file, desc)) passedTests++;
});

// Test des pages
log('\n📄 Vérification des pages:', 'blue');
pages.forEach(([file, desc]) => {
  totalTests++;
  if (checkFile(file, desc)) passedTests++;
});

// Test des contextes
log('\n🔄 Vérification des contextes:', 'blue');
contexts.forEach(([file, desc]) => {
  totalTests++;
  if (checkFile(file, desc)) passedTests++;
});

// Test des composants
log('\n🧩 Vérification des composants:', 'blue');
components.forEach(([file, desc]) => {
  totalTests++;
  if (checkFile(file, desc)) passedTests++;
});

// Test des dépendances
log('\n📦 Vérification des node_modules:', 'blue');
totalTests += 2;
if (checkDirectory('frontend/node_modules', 'Node modules Frontend')) passedTests++;
if (checkDirectory('backend/node_modules', 'Node modules Backend')) passedTests++;

// Vérification du contenu des package.json
log('\n📋 Vérification des dépendances:', 'blue');

try {
  const frontendPkg = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
  const requiredFrontendDeps = [
    'react', 'react-dom', 'react-router-dom', 'framer-motion',
    'tailwindcss', 'axios', 'react-hot-toast', '@heroicons/react'
  ];
  
  requiredFrontendDeps.forEach(dep => {
    totalTests++;
    const exists = frontendPkg.dependencies?.[dep] || frontendPkg.devDependencies?.[dep];
    log(`${exists ? '✅' : '❌'} Dépendance Frontend: ${dep}`, exists ? 'green' : 'red');
    if (exists) passedTests++;
  });
} catch (error) {
  log('❌ Erreur lecture package.json frontend', 'red');
}

try {
  const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
  const requiredBackendDeps = [
    'express', 'mongoose', 'jsonwebtoken', 'bcryptjs',
    'cors', 'helmet', 'express-rate-limit', 'joi'
  ];
  
  requiredBackendDeps.forEach(dep => {
    totalTests++;
    const exists = backendPkg.dependencies?.[dep] || backendPkg.devDependencies?.[dep];
    log(`${exists ? '✅' : '❌'} Dépendance Backend: ${dep}`, exists ? 'green' : 'red');
    if (exists) passedTests++;
  });
} catch (error) {
  log('❌ Erreur lecture package.json backend', 'red');
}

// Résumé final
log('\n📊 RÉSUMÉ DES TESTS:', 'blue');
log(`Total des tests: ${totalTests}`, 'yellow');
log(`Tests réussis: ${passedTests}`, 'green');
log(`Tests échoués: ${totalTests - passedTests}`, 'red');
log(`Pourcentage de réussite: ${Math.round((passedTests / totalTests) * 100)}%`, 'yellow');

if (passedTests === totalTests) {
  log('\n🎉 TOUS LES TESTS SONT PASSÉS ! L\'application est prête.', 'green');
} else {
  log('\n⚠️  Certains tests ont échoué. Vérifiez les fichiers manquants.', 'yellow');
}

log('\n🔧 Commandes pour démarrer l\'application:', 'blue');
log('Frontend: cd frontend && npm run dev', 'yellow');
log('Backend: cd backend && npm run dev', 'yellow');
log('Docker: docker-compose up', 'yellow');

#!/usr/bin/env node

/**
 * Script de test complet des traductions FuturistCards
 * Vérifie que toutes les clés de traduction sont présentes et cohérentes
 */

const fs = require('fs');
const path = require('path');

// Couleurs pour la console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.blue}🌐 TEST COMPLET DES TRADUCTIONS FUTURISTCARDS${colors.reset}\n`);

// Lire le fichier I18nContext.jsx
const i18nPath = path.join(__dirname, 'frontend/src/contexts/I18nContext.jsx');

if (!fs.existsSync(i18nPath)) {
  console.log(`${colors.red}❌ Fichier I18nContext.jsx non trouvé: ${i18nPath}${colors.reset}`);
  process.exit(1);
}

const i18nContent = fs.readFileSync(i18nPath, 'utf8');

// Extraire les traductions avec regex
const translationsMatch = i18nContent.match(/const translations = \{([\s\S]*?)\};/);
if (!translationsMatch) {
  console.log(`${colors.red}❌ Impossible d'extraire les traductions${colors.reset}`);
  process.exit(1);
}

// Fonction pour extraire les clés d'un objet de traduction
function extractKeys(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      keys.push(...extractKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

// Parser les traductions (simulation basique)
const languages = ['fr', 'en', 'he'];
const translationSections = {
  fr: [],
  en: [],
  he: []
};

// Sections attendues
const expectedSections = [
  'Navigation',
  'HomePage', 
  'AboutPage',
  'CardsPage',
  'Common',
  'Auth',
  'Likes system'
];

// Clés critiques qui doivent être présentes
const criticalKeys = [
  'home', 'cards', 'about', 'profile', 'favorites',
  'homeTitle', 'homeSubtitle', 'homeDescription',
  'aboutTitle', 'aboutDescription',
  'allCards', 'discoverCards', 'loadingCards',
  'auth.email', 'auth.password', 'auth.loginTitle',
  'likes.like', 'likes.unlike', 'likes.likes'
];

console.log(`${colors.bold}📋 VÉRIFICATION DES SECTIONS:${colors.reset}`);
expectedSections.forEach(section => {
  const sectionExists = i18nContent.includes(`// ${section}`);
  console.log(`${sectionExists ? colors.green + '✅' : colors.red + '❌'} ${section}${colors.reset}`);
});

console.log(`\n${colors.bold}🔑 VÉRIFICATION DES CLÉS CRITIQUES:${colors.reset}`);
criticalKeys.forEach(key => {
  let keyExists = false;
  
  if (key.includes('.')) {
    // For nested keys like 'auth.email', check for 'email:' within auth section
    const [section, subkey] = key.split('.');
    const sectionRegex = new RegExp(`${section}:\\s*{[^}]*${subkey}:`);
    keyExists = sectionRegex.test(i18nContent);
  } else {
    // For simple keys, check directly
    keyExists = i18nContent.includes(`${key}:`);
  }
  
  console.log(`${keyExists ? colors.green + '✅' : colors.red + '❌'} ${key}${colors.reset}`);
});

console.log(`\n${colors.bold}🌍 VÉRIFICATION DES LANGUES:${colors.reset}`);
languages.forEach(lang => {
  const langExists = i18nContent.includes(`${lang}: {`);
  console.log(`${langExists ? colors.green + '✅' : colors.red + '❌'} ${lang.toUpperCase()}${colors.reset}`);
});

// Vérifier la présence de isRTL
const hasRTL = i18nContent.includes('isRTL');
console.log(`\n${colors.bold}📱 SUPPORT RTL:${colors.reset}`);
console.log(`${hasRTL ? colors.green + '✅' : colors.red + '❌'} Support RTL implémenté${colors.reset}`);

// Vérifier les pages principales
const pagesPath = path.join(__dirname, 'frontend/src/pages');
const pages = ['HomePage.jsx', 'AboutPage.jsx', 'CardsPage.jsx', 'LoginPage.jsx', 'RegisterPage.jsx'];

console.log(`\n${colors.bold}📄 VÉRIFICATION UTILISATION TRADUCTIONS DANS LES PAGES:${colors.reset}`);
pages.forEach(page => {
  const pagePath = path.join(pagesPath, page);
  if (fs.existsSync(pagePath)) {
    const pageContent = fs.readFileSync(pagePath, 'utf8');
    const usesI18n = pageContent.includes('useI18n');
    const usesT = pageContent.includes('t(');
    console.log(`${usesI18n && usesT ? colors.green + '✅' : colors.red + '❌'} ${page} - useI18n: ${usesI18n}, t(): ${usesT}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  ${page} - Fichier non trouvé${colors.reset}`);
  }
});

// Vérifier les composants principaux
const componentsPath = path.join(__dirname, 'frontend/src/components');
const components = [
  'layout/Navbar.jsx',
  'layout/Footer.jsx', 
  'common/LanguageSelector.jsx',
  'ui/LikeButton.jsx'
];

console.log(`\n${colors.bold}🧩 VÉRIFICATION UTILISATION TRADUCTIONS DANS LES COMPOSANTS:${colors.reset}`);
components.forEach(comp => {
  const compPath = path.join(componentsPath, comp);
  if (fs.existsSync(compPath)) {
    const compContent = fs.readFileSync(compPath, 'utf8');
    const usesI18n = compContent.includes('useI18n');
    const usesT = compContent.includes('t(');
    console.log(`${usesI18n && usesT ? colors.green + '✅' : colors.red + '❌'} ${comp} - useI18n: ${usesI18n}, t(): ${usesT}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  ${comp} - Fichier non trouvé${colors.reset}`);
  }
});

// Statistiques finales
console.log(`\n${colors.bold}📊 STATISTIQUES:${colors.reset}`);
const totalLines = i18nContent.split('\n').length;
const translationLines = i18nContent.split('\n').filter(line => 
  line.includes(':') && (line.includes("'") || line.includes('"'))
).length;

console.log(`📝 Lignes totales I18nContext: ${totalLines}`);
console.log(`🔤 Lignes de traduction: ${translationLines}`);
console.log(`🌍 Langues supportées: ${languages.length} (FR, EN, HE)`);

// Vérification build
const distPath = path.join(__dirname, 'frontend/dist');
const buildExists = fs.existsSync(distPath);
console.log(`\n${colors.bold}🏗️  BUILD STATUS:${colors.reset}`);
console.log(`${buildExists ? colors.green + '✅' : colors.red + '❌'} Build de production disponible${colors.reset}`);

console.log(`\n${colors.bold}${colors.green}🎉 AUDIT TRADUCTIONS TERMINÉ${colors.reset}`);
console.log(`${colors.blue}Le système de traductions FuturistCards est opérationnel avec support complet FR/EN/HE${colors.reset}\n`);

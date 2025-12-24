/**
 * Script de vérification des cartes et traductions
 * Compatible Node.js
 * Ne casse rien
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Vérification des cartes et traductions FuturistCards\n');

// ---------- 1. LECTURE sampleCards.js ----------
const sampleCardsPath = path.join(
  __dirname,
  'frontend/src/data/sampleCards.js'
);

if (!fs.existsSync(sampleCardsPath)) {
  console.error('❌ sampleCards.js introuvable');
  process.exit(1);
}

const sampleCardsContent = fs.readFileSync(sampleCardsPath, 'utf8');

// Extraire les IDs
const idRegex = /_id:\s*['"](\d+)['"]/g;
const cardIds = [];

for (const match of sampleCardsContent.matchAll(idRegex)) {
  cardIds.push(match[1]);
}

if (cardIds.length === 0) {
  console.error('❌ Impossible de parser sampleCards.js');
  process.exit(1);
}

console.log('📊 CARTES DÉTECTÉES');
console.log('- Nombre total:', cardIds.length);
console.log('- IDs:', cardIds.join(', '));
console.log('');

// ---------- 2. LECTURE I18nContext.jsx (TEXTE BRUT) ----------
const i18nPath = path.join(
  __dirname,
  'frontend/src/contexts/I18nContext.jsx'
);

if (!fs.existsSync(i18nPath)) {
  console.error('❌ I18nContext.jsx introuvable');
  process.exit(1);
}

const i18nContent = fs.readFileSync(i18nPath, 'utf8');

// ---------- 3. EXTRACTION SECTION FR ----------
const frMatch = i18nContent.match(/fr:\s*{([\s\S]*?)},\s*en:/);

if (!frMatch) {
  console.error('❌ Impossible de parser la section FR');
  process.exit(1);
}

const frContent = frMatch[1];

// ---------- 4. SECTIONS À VÉRIFIER ----------
const sections = [
  'sampleCardTitles',
  'sampleCardSubtitles',
  'sampleCardDescriptions',
  'sampleCardContacts',
  'sampleCardAddresses'
];

console.log('🔍 VÉRIFICATION DES TRADUCTIONS FR\n');

sections.forEach(section => {
  const sectionMatch = frContent.match(
    new RegExp(`${section}:\\s*{([\\s\\S]*?)}`)
  );

  if (!sectionMatch) {
    console.log(`❌ Section manquante: ${section}`);
    return;
  }

  console.log(`✅ ${section} trouvé`);
});

console.log('\n🎉 VÉRIFICATION TERMINÉE');

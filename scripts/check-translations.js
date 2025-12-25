const fs = require('fs');
const path = require('path');

// Lire tous les fichiers de traduction
const translationsDir = path.join(__dirname, '../frontend/public/locales');
const languages = ['fr', 'en', 'he'];

console.log('🔍 ANALYSE COMPLÈTE DES TRADUCTIONS\n');

// Fonction pour extraire toutes les clés d'un objet imbriqué
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

// Charger toutes les traductions
const translations = {};
for (const lang of languages) {
  const filePath = path.join(translationsDir, lang, 'translation.json');
  try {
    translations[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`✅ ${lang.toUpperCase()}: Fichier chargé`);
  } catch (error) {
    console.log(`❌ ${lang.toUpperCase()}: Erreur de chargement - ${error.message}`);
  }
}

// Analyser les clés
const keysByLang = {};
for (const lang of languages) {
  if (translations[lang]) {
    keysByLang[lang] = new Set(getAllKeys(translations[lang]));
  }
}

console.log('\n📊 STATISTIQUES:');
for (const lang of languages) {
  if (keysByLang[lang]) {
    console.log(`${lang.toUpperCase()}: ${keysByLang[lang].size} clés`);
  }
}

// Trouver toutes les clés uniques
const allKeys = new Set();
for (const lang of languages) {
  if (keysByLang[lang]) {
    keysByLang[lang].forEach(key => allKeys.add(key));
  }
}

console.log(`\nTotal des clés uniques: ${allKeys.size}`);

// Vérifier les clés manquantes
let hasErrors = false;
for (const lang of languages) {
  if (keysByLang[lang]) {
    const missingKeys = [...allKeys].filter(key => !keysByLang[lang].has(key));
    if (missingKeys.length > 0) {
      console.log(`\n❌ CLÉS MANQUANTES EN ${lang.toUpperCase()}:`);
      missingKeys.forEach(key => console.log(`  - ${key}`));
      hasErrors = true;
    } else {
      console.log(`\n✅ ${lang.toUpperCase()}: Toutes les clés présentes`);
    }
  }
}

// Vérifier les valeurs vides
console.log('\n🔍 VÉRIFICATION DES VALEURS VIDES:');
for (const lang of languages) {
  if (translations[lang]) {
    const emptyValues = [];
    function checkEmptyValues(obj, prefix = '') {
      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          checkEmptyValues(obj[key], fullKey);
        } else if (!obj[key] || obj[key].trim() === '') {
          emptyValues.push(fullKey);
        }
      }
    }
    checkEmptyValues(translations[lang]);
    
    if (emptyValues.length > 0) {
      console.log(`❌ ${lang.toUpperCase()}: ${emptyValues.length} valeurs vides`);
      emptyValues.forEach(key => console.log(`  - ${key}`));
      hasErrors = true;
    } else {
      console.log(`✅ ${lang.toUpperCase()}: Aucune valeur vide`);
    }
  }
}

// Résultat final
console.log('\n' + '='.repeat(50));
if (!hasErrors) {
  console.log('🎉 PARFAIT! Toutes les traductions sont complètes à 100%');
  console.log('✅ Aucune clé manquante');
  console.log('✅ Aucune valeur vide');
  console.log('✅ Structure identique dans toutes les langues');
} else {
  console.log('⚠️  Des problèmes ont été détectés dans les traductions');
  console.log('❌ Corrections nécessaires avant validation finale');
}
console.log('='.repeat(50));

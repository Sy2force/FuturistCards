#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Couleurs pour la console
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function verifyTranslations() {
  try {
    log('cyan', '🔍 VÉRIFICATION DES TRADUCTIONS FUTURISTCARDS');
    log('cyan', '='.repeat(50));

    // 1. Vérifier sampleCards.js
    const sampleCardsPath = path.join(__dirname, '../frontend/src/data/sampleCards.js');
    if (!fs.existsSync(sampleCardsPath)) {
      log('red', '❌ Fichier sampleCards.js introuvable');
      return false;
    }

    const sampleCardsContent = fs.readFileSync(sampleCardsPath, 'utf8');
    const sampleCardsMatch = sampleCardsContent.match(/export const sampleCards = \[([\s\S]*?)\];/);
    
    if (!sampleCardsMatch) {
      log('red', '❌ Impossible de parser sampleCards.js');
      return false;
    }

    // Extraire les IDs des cartes
    const cardIds = [];
    const idMatches = sampleCardsContent.matchAll(/_id:\s*["'](\d+)["']/g);
    for (const match of idMatches) {
      cardIds.push(match[1]);
    }

    log('green', `✅ ${cardIds.length} cartes trouvées: ${cardIds.join(', ')}`);

    // 2. Vérifier I18nContext.jsx
    const i18nPath = path.join(__dirname, '../frontend/src/contexts/I18nContext.jsx');
    if (!fs.existsSync(i18nPath)) {
      log('red', '❌ Fichier I18nContext.jsx introuvable');
      return false;
    }

    const i18nContent = fs.readFileSync(i18nPath, 'utf8');

    // Extraire les clés de cartes utilisées
    const cardKeys = [];
    const keyMatches = sampleCardsContent.matchAll(/titleKey:\s*["']([^"']+)["']/g);
    for (const match of keyMatches) {
      cardKeys.push(match[1]);
    }

    log('blue', `📋 Clés de cartes: ${cardKeys.join(', ')}`);

    // 3. Vérifier les traductions par langue
    const languages = ['fr', 'en', 'he'];
    const sections = ['sampleCardTitles', 'sampleCardSubtitles', 'sampleCardDescriptions', 'sampleCardContacts', 'sampleCardAddresses'];
    
    let allValid = true;

    languages.forEach(lang => {
      log('magenta', `\n🌐 Vérification ${lang.toUpperCase()}:`);
      
      const langMatch = i18nContent.match(new RegExp(`${lang}:\\s*{([\\s\\S]*?)},\\s*(?:en|he|})`, 'm'));
      if (!langMatch) {
        log('red', `❌ Section ${lang} introuvable`);
        allValid = false;
        return;
      }

      const langContent = langMatch[1];

      sections.forEach(section => {
        const sectionMatch = langContent.match(new RegExp(`${section}:\\s*{([\\s\\S]*?)}`, 'm'));
        if (!sectionMatch) {
          log('yellow', `⚠️  Section ${section} manquante`);
          return;
        }

        const sectionContent = sectionMatch[1];
        
        // Vérifier les clés de cartes
        cardKeys.forEach(key => {
          if (section === 'sampleCardContacts') {
            // Vérifier les clés de contact
            const contactKeys = [`${key}_phone`, `${key}_email`, `${key}_web`];
            contactKeys.forEach(contactKey => {
              if (!sectionContent.includes(`${contactKey}:`)) {
                log('red', `❌ ${contactKey} manquant dans ${section}`);
                allValid = false;
              }
            });
          } else if (section === 'sampleCardAddresses') {
            // Vérifier les clés d'adresse
            const addressKey = `${key}_address`;
            if (!sectionContent.includes(`${addressKey}:`)) {
              log('red', `❌ ${addressKey} manquant dans ${section}`);
              allValid = false;
            }
          } else {
            // Vérifier les autres clés
            if (!sectionContent.includes(`${key}:`)) {
              log('red', `❌ ${key} manquant dans ${section}`);
              allValid = false;
            }
          }
        });

        log('green', `✅ ${section} vérifié`);
      });
    });

    // 4. Vérifier les doublons
    log('magenta', '\n🔍 Vérification des doublons:');
    const duplicateKeys = ['allCards', 'discoverCards', 'createFirstCard', 'loadingCards', 'register', 'login'];
    
    duplicateKeys.forEach(key => {
      const keyCount = (i18nContent.match(new RegExp(`${key}:`, 'g')) || []).length;
      if (keyCount > 3) { // Plus de 3 = doublons (1 par langue)
        log('red', `❌ Clé dupliquée: ${key} (${keyCount} occurrences)`);
        allValid = false;
      } else {
        log('green', `✅ ${key} (${keyCount} occurrences)`);
      }
    });

    // 5. Résultat final
    log('cyan', '\n' + '='.repeat(50));
    if (allValid) {
      log('green', '🎉 TOUTES LES TRADUCTIONS SONT VALIDES !');
      log('green', `✅ ${cardIds.length} cartes avec traductions complètes`);
      log('green', '✅ Aucun doublon détecté');
      log('green', '✅ Toutes les clés présentes dans les 3 langues');
    } else {
      log('red', '❌ ERREURS DÉTECTÉES DANS LES TRADUCTIONS');
      log('yellow', '⚠️  Corrigez les erreurs ci-dessus');
    }

    return allValid;

  } catch (error) {
    log('red', `❌ Erreur lors de la vérification: ${error.message}`);
    return false;
  }
}

// Exécuter si appelé directement
if (require.main === module) {
  const isValid = verifyTranslations();
  process.exit(isValid ? 0 : 1);
}

module.exports = { verifyTranslations };

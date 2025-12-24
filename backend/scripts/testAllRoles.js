const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

// Couleurs pour l'affichage
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = (color, message) => console.log(`${colors[color]}${message}${colors.reset}`);

async function testRoleSystem() {
  console.log('🚀 TEST COMPLET SYSTÈME RÔLES FUTURISTCARDS\n');

  // Utilisateurs de test pour chaque rôle
  const testUsers = [
    {
      role: 'user',
      firstName: 'Alice',
      lastName: 'Martin',
      email: 'alice.martin@test.com',
      password: 'User123!',
      phone: '+33612345678'
    },
    {
      role: 'business',
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@business.com',
      password: 'Business123!',
      phone: '+33623456789'
    },
    {
      role: 'admin',
      firstName: 'Sophie',
      lastName: 'Admin',
      email: 'sophie.admin@futurist.com',
      password: 'Admin123!',
      phone: '+33634567890'
    }
  ];

  const tokens = {};
  const users = {};

  // ===== TEST 1: INSCRIPTION DES UTILISATEURS =====
  console.log('📝 TEST 1: INSCRIPTION DES UTILISATEURS');
  console.log('=' + '='.repeat(50));

  for (const userData of testUsers) {
    try {
      const response = await axios.post(`${API_BASE}/auth/register`, userData);
      
      if (response.data.success) {
        log('green', `✅ ${userData.role.toUpperCase()}: ${userData.firstName} ${userData.lastName} inscrit`);
        tokens[userData.role] = response.data.token;
        users[userData.role] = response.data.user;
        
        // Vérifier que le rôle est correct
        if (response.data.user.role === userData.role) {
          log('blue', `   Rôle correct: ${response.data.user.role}`);
        } else {
          log('red', `   ❌ Rôle incorrect: attendu ${userData.role}, reçu ${response.data.user.role}`);
        }
        
        // Vérifier les flags isBusiness et isAdmin
        const expectedIsBusiness = userData.role === 'business' || userData.role === 'admin';
        const expectedIsAdmin = userData.role === 'admin';
        
        if (response.data.user.isBusiness === expectedIsBusiness) {
          log('blue', `   isBusiness: ${response.data.user.isBusiness} ✓`);
        } else {
          log('red', `   ❌ isBusiness incorrect: attendu ${expectedIsBusiness}, reçu ${response.data.user.isBusiness}`);
        }
        
        if (response.data.user.isAdmin === expectedIsAdmin) {
          log('blue', `   isAdmin: ${response.data.user.isAdmin} ✓`);
        } else {
          log('red', `   ❌ isAdmin incorrect: attendu ${expectedIsAdmin}, reçu ${response.data.user.isAdmin}`);
        }
        
      } else {
        log('red', `❌ ${userData.role.toUpperCase()}: Échec inscription - ${response.data.message}`);
      }
    } catch (error) {
      log('red', `❌ ${userData.role.toUpperCase()}: Erreur inscription - ${error.response?.data?.message || error.message}`);
    }
  }

  console.log('\n');

  // ===== TEST 2: CONNEXION DES UTILISATEURS =====
  console.log('🔐 TEST 2: CONNEXION DES UTILISATEURS');
  console.log('=' + '='.repeat(50));

  for (const userData of testUsers) {
    try {
      const response = await axios.post(`${API_BASE}/auth/login`, {
        email: userData.email,
        password: userData.password
      });
      
      if (response.data.success) {
        log('green', `✅ ${userData.role.toUpperCase()}: Connexion réussie`);
        tokens[userData.role] = response.data.token; // Mettre à jour le token
        
        // Vérifier les données utilisateur
        const user = response.data.user;
        log('blue', `   ID: ${user.id}`);
        log('blue', `   Nom: ${user.firstName} ${user.lastName}`);
        log('blue', `   Email: ${user.email}`);
        log('blue', `   Rôle: ${user.role}`);
        log('blue', `   isBusiness: ${user.isBusiness}`);
        log('blue', `   isAdmin: ${user.isAdmin}`);
        
      } else {
        log('red', `❌ ${userData.role.toUpperCase()}: Échec connexion - ${response.data.message}`);
      }
    } catch (error) {
      log('red', `❌ ${userData.role.toUpperCase()}: Erreur connexion - ${error.response?.data?.message || error.message}`);
    }
  }

  console.log('\n');

  // ===== TEST 3: ACCÈS AUX CARTES =====
  console.log('📋 TEST 3: ACCÈS AUX CARTES (tous rôles)');
  console.log('=' + '='.repeat(50));

  for (const role of ['user', 'business', 'admin']) {
    if (!tokens[role]) {
      log('red', `❌ ${role.toUpperCase()}: Pas de token disponible`);
      continue;
    }

    try {
      const response = await axios.get(`${API_BASE}/cards`, {
        headers: { Authorization: `Bearer ${tokens[role]}` }
      });
      
      if (response.data.success) {
        log('green', `✅ ${role.toUpperCase()}: Accès cartes autorisé (${response.data.count} cartes)`);
      } else {
        log('red', `❌ ${role.toUpperCase()}: Accès cartes refusé`);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        log('red', `❌ ${role.toUpperCase()}: Token invalide ou expiré`);
      } else {
        log('red', `❌ ${role.toUpperCase()}: Erreur accès cartes - ${error.message}`);
      }
    }
  }

  console.log('\n');

  // ===== TEST 4: CRÉATION DE CARTES (business et admin seulement) =====
  console.log('🏗️ TEST 4: CRÉATION DE CARTES (business/admin)');
  console.log('=' + '='.repeat(50));

  const cardData = {
    title: 'Test Card Role',
    subtitle: 'Test de permissions',
    description: 'Carte de test pour vérifier les permissions de création selon les rôles.',
    phone: '+33612345678',
    email: 'test@role.com',
    web: 'https://test-role.com'
  };

  // Test USER (devrait échouer)
  if (tokens['user']) {
    try {
      const response = await axios.post(`${API_BASE}/cards`, cardData, {
        headers: { Authorization: `Bearer ${tokens['user']}` }
      });
      log('red', `❌ USER: Création carte autorisée (ne devrait pas l'être)`);
    } catch (error) {
      if (error.response?.status === 403) {
        log('green', `✅ USER: Création carte refusée (permission correcte)`);
      } else {
        log('yellow', `⚠️ USER: Erreur inattendue - ${error.response?.data?.message || error.message}`);
      }
    }
  }

  // Test BUSINESS (devrait réussir)
  if (tokens['business']) {
    try {
      const response = await axios.post(`${API_BASE}/cards`, {
        ...cardData,
        title: 'Test Card Business'
      }, {
        headers: { Authorization: `Bearer ${tokens['business']}` }
      });
      
      if (response.data.success) {
        log('green', `✅ BUSINESS: Création carte autorisée`);
        log('blue', `   Carte ID: ${response.data.card._id}`);
      } else {
        log('red', `❌ BUSINESS: Création carte échouée - ${response.data.message}`);
      }
    } catch (error) {
      log('red', `❌ BUSINESS: Erreur création carte - ${error.response?.data?.message || error.message}`);
    }
  }

  // Test ADMIN (devrait réussir)
  if (tokens['admin']) {
    try {
      const response = await axios.post(`${API_BASE}/cards`, {
        ...cardData,
        title: 'Test Card Admin'
      }, {
        headers: { Authorization: `Bearer ${tokens['admin']}` }
      });
      
      if (response.data.success) {
        log('green', `✅ ADMIN: Création carte autorisée`);
        log('blue', `   Carte ID: ${response.data.card._id}`);
      } else {
        log('red', `❌ ADMIN: Création carte échouée - ${response.data.message}`);
      }
    } catch (error) {
      log('red', `❌ ADMIN: Erreur création carte - ${error.response?.data?.message || error.message}`);
    }
  }

  console.log('\n');

  // ===== TEST 5: PROFILS UTILISATEURS =====
  console.log('👤 TEST 5: ACCÈS PROFILS UTILISATEURS');
  console.log('=' + '='.repeat(50));

  for (const role of ['user', 'business', 'admin']) {
    if (!tokens[role]) continue;

    try {
      const response = await axios.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${tokens[role]}` }
      });
      
      if (response.data.success) {
        log('green', `✅ ${role.toUpperCase()}: Accès profil autorisé`);
        const profile = response.data.user;
        log('blue', `   Nom: ${profile.firstName} ${profile.lastName}`);
        log('blue', `   Email: ${profile.email}`);
        log('blue', `   Rôle: ${profile.role}`);
      } else {
        log('red', `❌ ${role.toUpperCase()}: Accès profil refusé`);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        log('yellow', `⚠️ ${role.toUpperCase()}: Route profil non trouvée`);
      } else {
        log('red', `❌ ${role.toUpperCase()}: Erreur accès profil - ${error.response?.data?.message || error.message}`);
      }
    }
  }

  console.log('\n');

  // ===== RÉSUMÉ =====
  console.log('📊 RÉSUMÉ DES TESTS');
  console.log('=' + '='.repeat(50));
  
  log('blue', `Utilisateurs créés: ${Object.keys(tokens).length}/3`);
  log('blue', `Tokens générés: ${Object.values(tokens).filter(t => t).length}/3`);
  
  console.log('\nTokens générés:');
  Object.keys(tokens).forEach(role => {
    if (tokens[role]) {
      log('green', `✅ ${role.toUpperCase()}: ${tokens[role].substring(0, 50)}...`);
    } else {
      log('red', `❌ ${role.toUpperCase()}: Pas de token`);
    }
  });

  console.log('\n🎉 TESTS TERMINÉS\n');
}

// Gestion des erreurs globales
process.on('unhandledRejection', (error) => {
  console.error('Erreur non gérée:', error);
  process.exit(1);
});

// Lancer les tests
if (require.main === module) {
  testRoleSystem().catch(console.error);
}

module.exports = testRoleSystem;

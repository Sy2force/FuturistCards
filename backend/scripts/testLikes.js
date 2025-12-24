const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

// Test du système de likes en temps réel
async function testLikesSystem() {
  console.log('🎯 Test du système de likes en temps réel');
  console.log('==========================================\n');

  try {
    // 1. Test Health Check
    console.log('1. Test Health Check...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health:', health.data);

    // 2. Créer un utilisateur de test
    console.log('\n2. Création utilisateur de test...');
    const registerData = {
      firstName: 'Like',
      lastName: 'Tester',
      email: 'liketester@test.com',
      password: 'Test1234!',
      role: 'user'
    };
    
    const registerResponse = await axios.post(`${API_BASE}/auth/register`, registerData);
    console.log('✅ Utilisateur créé:', {
      success: registerResponse.data.success,
      userId: registerResponse.data.user.id,
      email: registerResponse.data.user.email
    });

    const token = registerResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };

    // 3. Récupérer les cartes disponibles
    console.log('\n3. Récupération des cartes...');
    const cardsResponse = await axios.get(`${API_BASE}/cards`);
    console.log('✅ Cartes disponibles:', cardsResponse.data.cards.length);
    
    if (cardsResponse.data.cards.length === 0) {
      console.log('❌ Aucune carte disponible pour tester les likes');
      return;
    }

    const testCard = cardsResponse.data.cards[0];
    console.log('📋 Carte de test:', {
      id: testCard._id,
      title: testCard.title,
      likes: testCard.likes
    });

    // 4. Test du statut initial des likes
    console.log('\n4. Test statut initial des likes...');
    try {
      const statusResponse = await axios.get(`${API_BASE}/likes/${testCard._id}/status`, { headers });
      console.log('✅ Statut initial:', statusResponse.data.data);
    } catch (error) {
      console.log('❌ Erreur statut likes:', error.response?.data || error.message);
    }

    // 5. Test toggle like (ajouter)
    console.log('\n5. Test toggle like (ajouter)...');
    try {
      const toggleResponse = await axios.post(`${API_BASE}/likes/${testCard._id}/toggle`, {}, { headers });
      console.log('✅ Like ajouté:', toggleResponse.data.data);
    } catch (error) {
      console.log('❌ Erreur toggle like:', error.response?.data || error.message);
    }

    // 6. Vérifier le nouveau statut
    console.log('\n6. Vérification nouveau statut...');
    try {
      const newStatusResponse = await axios.get(`${API_BASE}/likes/${testCard._id}/status`, { headers });
      console.log('✅ Nouveau statut:', newStatusResponse.data.data);
    } catch (error) {
      console.log('❌ Erreur vérification statut:', error.response?.data || error.message);
    }

    // 7. Test toggle like (retirer)
    console.log('\n7. Test toggle like (retirer)...');
    try {
      const toggleResponse2 = await axios.post(`${API_BASE}/likes/${testCard._id}/toggle`, {}, { headers });
      console.log('✅ Like retiré:', toggleResponse2.data.data);
    } catch (error) {
      console.log('❌ Erreur retirer like:', error.response?.data || error.message);
    }

    // 8. Vérifier le statut final
    console.log('\n8. Vérification statut final...');
    try {
      const finalStatusResponse = await axios.get(`${API_BASE}/likes/${testCard._id}/status`, { headers });
      console.log('✅ Statut final:', finalStatusResponse.data.data);
    } catch (error) {
      console.log('❌ Erreur statut final:', error.response?.data || error.message);
    }

    // 9. Test des likes de l'utilisateur
    console.log('\n9. Test likes utilisateur...');
    try {
      const userLikesResponse = await axios.get(`${API_BASE}/likes/my-likes`, { headers });
      console.log('✅ Mes likes:', userLikesResponse.data.data);
    } catch (error) {
      console.log('❌ Erreur mes likes:', error.response?.data || error.message);
    }

    console.log('\n🎉 Test du système de likes terminé!');

  } catch (error) {
    console.error('❌ Erreur générale:', error.response?.data || error.message);
  }
}

// Exécuter le test
testLikesSystem();

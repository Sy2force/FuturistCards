const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

// Test data
const testUser = {
  firstName: 'Test',
  lastName: 'Business',
  email: 'testbusiness@futuristcards.com',
  password: 'TestPass123!',
  role: 'business'
};

const testCard = {
  title: 'Test Developer',
  subtitle: 'Full Stack Developer',
  description: 'Expert in React and Node.js with extensive experience in modern web development',
  phone: '972501234567',
  email: 'test@example.com',
  web: 'https://example.com',
  image: {
    url: 'https://via.placeholder.com/300x200',
    alt: 'Test Developer Profile'
  },
  address: {
    state: 'Tel Aviv',
    country: 'Israel',
    city: 'Tel Aviv',
    street: 'Rothschild Blvd',
    houseNumber: 1,
    zip: '12345'
  }
};

let authToken = '';
let userId = '';
let cardId = '';

async function testAPI() {
  console.log('🚀 Démarrage des tests complets FuturistCards\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Test Health Check...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health Check:', health.data.status);

    // Test 2: Register
    console.log('\n2️⃣ Test Registration...');
    try {
      const registerResponse = await axios.post(`${API_BASE}/auth/register`, testUser);
      console.log('✅ Registration réussie:', registerResponse.data.message);
      authToken = registerResponse.data.token;
      userId = registerResponse.data.user.id;
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.message.includes('already exists')) {
        console.log('⚠️ Utilisateur existe déjà, test de connexion...');
        
        // Test 3: Login
        console.log('\n3️⃣ Test Login...');
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
          email: testUser.email,
          password: testUser.password
        });
        console.log('✅ Login réussi:', loginResponse.data.message);
        authToken = loginResponse.data.token;
        userId = loginResponse.data.user.id;
      } else {
        throw error;
      }
    }

    // Test 4: Get Profile
    console.log('\n4️⃣ Test Get Profile...');
    const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Profile récupéré:', profileResponse.data.firstName, profileResponse.data.lastName);

    // Test 5: Create Card
    console.log('\n5️⃣ Test Create Card...');
    const createCardResponse = await axios.post(`${API_BASE}/cards`, testCard, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Carte créée:', createCardResponse.data.title);
    cardId = createCardResponse.data._id;

    // Test 6: Get All Cards
    console.log('\n6️⃣ Test Get All Cards...');
    const cardsResponse = await axios.get(`${API_BASE}/cards`);
    console.log('✅ Cartes récupérées:', cardsResponse.data.length, 'cartes trouvées');

    // Test 7: Get Card by ID
    console.log('\n7️⃣ Test Get Card by ID...');
    const cardResponse = await axios.get(`${API_BASE}/cards/${cardId}`);
    console.log('✅ Carte récupérée par ID:', cardResponse.data.title);

    // Test 8: Update Card
    console.log('\n8️⃣ Test Update Card...');
    const updatedCard = { ...testCard, title: 'Updated Test Developer' };
    const updateResponse = await axios.put(`${API_BASE}/cards/${cardId}`, updatedCard, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Carte mise à jour:', updateResponse.data.title);

    // Test 9: Like Card
    console.log('\n9️⃣ Test Like Card...');
    const likeResponse = await axios.post(`${API_BASE}/cards/${cardId}/like`, {}, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Carte likée:', likeResponse.data.message);

    // Test 10: Get My Cards
    console.log('\n🔟 Test Get My Cards...');
    const myCardsResponse = await axios.get(`${API_BASE}/cards/my-cards`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Mes cartes récupérées:', myCardsResponse.data.length, 'cartes');

    // Test 11: Search Cards
    console.log('\n1️⃣1️⃣ Test Search Cards...');
    const searchResponse = await axios.get(`${API_BASE}/cards?search=developer`);
    console.log('✅ Recherche effectuée:', searchResponse.data.length, 'résultats');

    // Test 12: Get Favorites
    console.log('\n1️⃣2️⃣ Test Get Favorites...');
    const favoritesResponse = await axios.get(`${API_BASE}/cards/favorites`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Favoris récupérés:', favoritesResponse.data.length, 'favoris');

    // Test 13: Analytics (Admin only)
    console.log('\n1️⃣3️⃣ Test Analytics...');
    try {
      const analyticsResponse = await axios.get(`${API_BASE}/cards/analytics`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      console.log('✅ Analytics récupérées:', Object.keys(analyticsResponse.data));
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('⚠️ Analytics - Accès refusé (utilisateur non admin)');
      } else {
        throw error;
      }
    }

    // Test 14: Delete Card
    console.log('\n1️⃣4️⃣ Test Delete Card...');
    const deleteResponse = await axios.delete(`${API_BASE}/cards/${cardId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Carte supprimée:', deleteResponse.data.message);

    console.log('\n🎉 TOUS LES TESTS SONT PASSÉS AVEC SUCCÈS! 🎉');
    console.log('\n📊 Résumé des tests:');
    console.log('✅ Health Check');
    console.log('✅ Registration/Login');
    console.log('✅ Profile Management');
    console.log('✅ Card CRUD Operations');
    console.log('✅ Like System');
    console.log('✅ Search Functionality');
    console.log('✅ Favorites System');
    console.log('✅ Analytics (si admin)');
    console.log('\n🚀 L\'API backend est 100% fonctionnelle!');

  } catch (error) {
    console.error('\n❌ ERREUR DANS LES TESTS:');
    console.error('Message:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
    process.exit(1);
  }
}

testAPI();

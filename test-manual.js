const axios = require('axios');

const API_BASE = 'http://localhost:5001/api';

async function testManual() {
  console.log('🚀 Tests manuels FuturistCards\n');

  try {
    // Test 1: Health Check
    console.log('1️⃣ Test Health Check...');
    const health = await axios.get(`${API_BASE}/health`);
    console.log('✅ Backend:', health.data.status);

    // Test 2: Créer utilisateur business
    console.log('\n2️⃣ Test création utilisateur business...');
    const userData = {
      firstName: 'Test',
      lastName: 'Business',
      email: 'testbiz@futuristcards.com',
      password: 'TestPass123!',
      role: 'business'
    };
    
    let token;
    try {
      const registerResponse = await axios.post(`${API_BASE}/auth/register`, userData);
      console.log('✅ Registration:', registerResponse.data.message);
      token = registerResponse.data.token;
    } catch (error) {
      if (error.response?.status === 400) {
        console.log('⚠️ Utilisateur existe, tentative login...');
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
          email: userData.email,
          password: userData.password
        });
        console.log('✅ Login:', loginResponse.data.message);
        token = loginResponse.data.token;
      } else {
        throw error;
      }
    }

    // Test 3: Créer une carte
    console.log('\n3️⃣ Test création carte...');
    const cardData = {
      title: 'Développeur Full Stack',
      subtitle: 'Expert React & Node.js',
      description: 'Développeur passionné avec 5 ans d\'expérience en développement web moderne',
      phone: '972501234567',
      email: 'dev@example.com',
      web: 'https://portfolio.dev',
      image: {
        url: 'https://via.placeholder.com/300x200/3b82f6/ffffff?text=Dev',
        alt: 'Développeur Full Stack'
      },
      address: {
        state: 'Tel Aviv',
        country: 'Israel',
        city: 'Tel Aviv',
        street: 'Rothschild Blvd',
        houseNumber: 100,
        zip: '12345'
      }
    };

    const cardResponse = await axios.post(`${API_BASE}/cards`, cardData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Carte créée:', cardResponse.data.title);
    const cardId = cardResponse.data._id;

    // Test 4: Liker la carte
    console.log('\n4️⃣ Test like carte...');
    const likeResponse = await axios.post(`${API_BASE}/cards/${cardId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Like:', likeResponse.data.message);

    // Test 5: Récupérer toutes les cartes
    console.log('\n5️⃣ Test récupération cartes...');
    const allCards = await axios.get(`${API_BASE}/cards`);
    console.log('✅ Cartes trouvées:', allCards.data.length);

    // Test 6: Recherche
    console.log('\n6️⃣ Test recherche...');
    const searchResults = await axios.get(`${API_BASE}/cards?search=développeur`);
    console.log('✅ Résultats recherche:', searchResults.data.length);

    console.log('\n🎉 TOUS LES TESTS API PASSÉS !');
    console.log('\n📋 Maintenant, testez manuellement sur http://localhost:3010 :');
    console.log('1. Ouvrir le site');
    console.log('2. Tester le toggle thème sombre/clair');
    console.log('3. Changer la langue (FR/EN/HE)');
    console.log('4. Se connecter avec: john.doe@example.com / Password123!');
    console.log('5. Naviguer sur toutes les pages');
    console.log('6. Créer une carte');
    console.log('7. Liker des cartes');
    console.log('8. Tester la recherche');
    console.log('9. Se déconnecter');
    console.log('10. Tester la page d\'inscription');

  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
  }
}

testManual();

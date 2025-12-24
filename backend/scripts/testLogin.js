const axios = require('axios');

async function testAuth() {
  const API_BASE_URL = 'http://localhost:5001/api';
  
  console.log('🔍 Test d\'authentification FuturistCards');
  console.log('=====================================');
  
  try {
    // Test 1: Health check
    console.log('\n1. Test Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health:', healthResponse.data);
    
    // Test 2: Registration avec email simple
    console.log('\n2. Test Registration...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@test.com',
      password: '1234',
      role: 'user'
    };
    
    const registerResponse = await axios.post(`${API_BASE_URL}/auth/register`, registerData);
    console.log('✅ Register:', registerResponse.data);
    
    // Test 3: Login avec les mêmes credentials
    console.log('\n3. Test Login...');
    const loginData = {
      email: 'test@test.com',
      password: '1234'
    };
    
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    console.log('✅ Login:', loginResponse.data);
    
    // Test 4: Verify token
    console.log('\n4. Test Token Verification...');
    const token = loginResponse.data.token;
    const verifyResponse = await axios.get(`${API_BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Verify:', verifyResponse.data);
    
    console.log('\n🎉 Tous les tests d\'authentification réussis !');
    
  } catch (error) {
    console.error('❌ Erreur:', error.response?.data || error.message);
    if (error.response?.status) {
      console.error('Status:', error.response.status);
    }
  }
}

testAuth();

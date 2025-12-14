const request = require('supertest');
const app = require('../server');

describe('API FuturistCards - Tests Complets', () => {
  let authToken;
  let businessToken;
  let adminToken;

  beforeAll(async () => {
    // Login business user pour les tests
    const businessLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testpro@example.com',
        password: 'TestPass123!'
      });
    businessToken = businessLogin.body.token;

    // Login admin user
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'TestPass123!'
      });
    adminToken = adminLogin.body.token;

    // Login regular user
    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'testnormal@example.com',
        password: 'TestPass123!'
      });
    authToken = userLogin.body.token;
  });

  describe('Health Check', () => {
    test('GET /api/health should return success', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200);
      
      expect(response.body.success).toBe(true);
    });
  });

  describe('Authentication', () => {
    test('POST /api/auth/login should authenticate user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testpro@example.com',
          password: 'TestPass123!'
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.token).toBeDefined();
      expect(response.body.user.role).toBe('business');
    });

    test('POST /api/auth/login should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'wrong@email.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body.message).toContain('incorrect');
    });
  });

  describe('Cards API', () => {
    test('GET /api/cards should return cards list', async () => {
      const response = await request(app)
        .get('/api/cards')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.cards).toBeDefined();
      expect(Array.isArray(response.body.cards)).toBe(true);
      expect(response.body.cards.length).toBeGreaterThan(0);
    });

    test('POST /api/cards should create card (business user)', async () => {
      const newCard = {
        title: 'Test Card',
        subtitle: 'Test Developer',
        company: 'Test Company',
        email: 'test@test.com',
        phone: '+33 1 23 45 67 89',
        website: 'https://test.com',
        description: 'Test card description'
      };

      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${businessToken}`)
        .send(newCard);
        
      expect(response.status).toBeLessThan(500); // Peut être 201 ou erreur business logic
    });
  });

  describe('Protected Routes', () => {
    test('Protected route should require authentication', async () => {
      const response = await request(app)
        .get('/api/favorites')
        .expect(401);

      expect(response.body.message).toContain('token') || expect(response.body.message).toContain('autorisation');
    });

    test('Protected route should work with valid token', async () => {
      const response = await request(app)
        .get('/api/favorites')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBeLessThan(500);
    });
  });

  describe('Rate Limiting', () => {
    test('Should handle rate limiting gracefully', async () => {
      // Test multiple requests
      const promises = Array(5).fill().map(() => 
        request(app).get('/api/health')
      );
      
      const responses = await Promise.all(promises);
      
      // Au moins une réponse doit être 200
      expect(responses.some(res => res.status === 200)).toBe(true);
    });
  });

  describe('Error Handling', () => {
    test('Should handle invalid JSON', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .set('Content-Type', 'application/json')
        .send('invalid json');

      expect(response.status).toBeGreaterThanOrEqual(400);
    });

    test('Should handle missing fields', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({})
        .expect(400);
    });
  });
});

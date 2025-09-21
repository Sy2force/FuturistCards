// Unit Tests for Cards Controller
const request = require('supertest');
const app = require('../server');
const { generateToken } = require('../utils/jwt');

describe('Cards Endpoints', () => {
  let userToken, businessToken, adminToken;

  beforeAll(() => {
    userToken = generateToken('507f1f77bcf86cd799439014', 'user');
    businessToken = generateToken('507f1f77bcf86cd799439015', 'business');
    adminToken = generateToken('507f1f77bcf86cd799439016', 'admin');
  });

  describe('GET /api/cards', () => {
    it('should get all cards without authentication', async () => {
      const response = await request(app)
        .get('/api/cards')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/cards?page=1&limit=2')
        .expect(200);

      expect(response.body.pagination).toBeDefined();
      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(2);
    });

    it('should support search functionality', async () => {
      const response = await request(app)
        .get('/api/cards?search=tech')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
    });
  });

  describe('POST /api/cards', () => {
    it('should create card for business user', async () => {
      const cardData = {
        title: 'Test Business Card',
        description: 'Test description',
        company: 'Test Company',
        position: 'Test Position',
        email: 'test@company.com',
        phone: '+1-555-0123',
        category: 'Technology'
      };

      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${businessToken}`)
        .send(cardData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(cardData.title);
    });

    it('should reject card creation for regular user', async () => {
      const cardData = {
        title: 'Test Card',
        description: 'Test description'
      };

      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${userToken}`)
        .send(cardData)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Access denied');
    });
  });

  describe('PUT /api/cards/:id', () => {
    it('should update card for owner', async () => {
      const cardId = '507f1f77bcf86cd799439011';
      const updateData = {
        title: 'Updated Card Title',
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/cards/${cardId}`)
        .set('Authorization', `Bearer ${businessToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(updateData.title);
    });
  });

  describe('DELETE /api/cards/:id', () => {
    it('should delete card for admin', async () => {
      const cardId = '507f1f77bcf86cd799439011';

      const response = await request(app)
        .delete(`/api/cards/${cardId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted');
    });
  });

  describe('PATCH /api/cards/:id/like', () => {
    it('should toggle like for authenticated user', async () => {
      const cardId = '507f1f77bcf86cd799439012';

      const response = await request(app)
        .patch(`/api/cards/${cardId}/like`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.likes).toBeDefined();
    });
  });
});

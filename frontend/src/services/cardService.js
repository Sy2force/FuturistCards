import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// Configure axios instance for cards API
const cardsAPI = axios.create({
  baseURL: `${API_URL}/cards`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
cardsAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const cardService = {
  // Get all cards
  getAllCards: async (filters = {}) => {
    try {
      const response = await cardsAPI.get('/', { params: filters });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת כרטיסים'
      };
    }
  },

  // Get card by ID
  getCardById: async (cardId) => {
    try {
      const response = await cardsAPI.get(`/${cardId}`);
      return {
        success: true,
        data: response.data.card
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת כרטיס'
      };
    }
  },

  // Get user's cards
  getMyCards: async () => {
    try {
      const response = await cardsAPI.get('/my-cards');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת הכרטיסים שלך'
      };
    }
  },

  // Create new card
  createCard: async (cardData) => {
    try {
      const response = await cardsAPI.post('/', cardData);
      return {
        success: true,
        data: response.data.card,
        message: response.data.message
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל ביצירת כרטיס'
      };
    }
  },

  // Update card
  updateCard: async (cardId, cardData) => {
    try {
      const response = await cardsAPI.put(`/${cardId}`, cardData);
      return {
        success: true,
        data: response.data.card,
        message: response.data.message
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בעדכון כרטיס'
      };
    }
  },

  // Delete card (only user-created cards, not demo cards)
  deleteCard: async (cardId) => {
    try {
      const response = await cardsAPI.delete(`/${cardId}`);
      return {
        success: true,
        message: response.data.message || 'כרטיס נמחק בהצלחה'
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל במחיקת כרטיס'
      };
    }
  },

  // Check if user can delete a card
  canDeleteCard: (card, user) => {
    if (!card || !user) return false;
    
    // Demo cards cannot be deleted
    if (card.isDemo) return false;
    
    // Only card owner or admin can delete
    return card.user_id === user.id || user.role === 'admin';
  },

  // Check if user can edit a card
  canEditCard: (card, user) => {
    if (!card || !user) return false;
    
    // Demo cards cannot be edited
    if (card.isDemo) return false;
    
    // Only card owner or admin can edit
    return card.user_id === user.id || user.role === 'admin';
  },

  // Search cards
  searchCards: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const response = await cardsAPI.get('/search', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בחיפוש כרטיסים'
      };
    }
  },

  // Get popular cards
  getPopularCards: async (limit = 10) => {
    try {
      const response = await cardsAPI.get('/popular', { params: { limit } });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת כרטיסים פופולריים'
      };
    }
  },

  // Toggle favorite
  toggleFavorite: async (cardId) => {
    try {
      const response = await cardsAPI.post(`/${cardId}/favorite`);
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בהחלפת מצב מועדפים'
      };
    }
  },

  // Get favorites
  getFavorites: async () => {
    try {
      const response = await cardsAPI.get('/favorites');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת מועדפים'
      };
    }
  }
};

export default cardService;

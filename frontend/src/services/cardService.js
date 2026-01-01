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
        error: error.response?.data?.message || 'כשל בטעינת כרטיסים'
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
        error: error.response?.data?.message || 'כשל בטעינת כרטיס'
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
        error: error.response?.data?.message || 'כשל בטעינת הכרטיסים שלך'
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
        error: error.response?.data?.message || 'כשל ביצירת כרטיס'
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
        error: error.response?.data?.message || 'כשל בעדכון כרטיס'
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
        error: error.response?.data?.message || 'כשל במחיקת כרטיס'
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
        error: error.response?.data?.message || 'כשל בחיפוש כרטיסים'
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
        error: error.response?.data?.message || 'כשל בטעינת כרטיסים פופולריים'
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
        error: error.response?.data?.message || 'כשל בהוספה/הסרה ממועדפים'
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
        error: error.response?.data?.message || 'כשל בטעינת מועדפים'
      };
    }
  },

  // Get card statistics
  getCardStats: async (cardId) => {
    try {
      const response = await cardsAPI.get(`/${cardId}/stats`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'כשל בטעינת סטטיסטיקות כרטיס'
      };
    }
  },

  // Get cards by category
  getCardsByCategory: async (category, limit = 20) => {
    try {
      const response = await cardsAPI.get('/category', { params: { category, limit } });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'כשל בטעינת כרטיסים לפי קטגוריה'
      };
    }
  },

  // Get recent cards
  getRecentCards: async (limit = 10) => {
    try {
      const response = await cardsAPI.get('/recent', { params: { limit } });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'כשל בטעינת כרטיסים אחרונים'
      };
    }
  },

  // Validate card data
  validateCardData: (cardData) => {
    const errors = {};
    
    if (!cardData.title?.trim()) {
      errors.title = 'כותרת נדרשת';
    }
    
    if (!cardData.subtitle?.trim()) {
      errors.subtitle = 'כותרת משנה נדרשת';
    }
    
    if (!cardData.description?.trim()) {
      errors.description = 'תיאור נדרש';
    }
    
    if (!cardData.email?.trim()) {
      errors.email = 'אימייל נדרש';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cardData.email)) {
      errors.email = 'פורמט אימייל לא תקין';
    }
    
    if (!cardData.phone?.trim()) {
      errors.phone = 'מספר טלפון נדרש';
    } else if (!/^[\d\s\-+()]+$/.test(cardData.phone)) {
      errors.phone = 'פורמט טלפון לא תקין';
    }
    
    if (!cardData.address?.country?.trim()) {
      errors.country = 'מדינה נדרשת';
    }
    
    if (!cardData.address?.city?.trim()) {
      errors.city = 'עיר נדרשת';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Format card data for display
  formatCardData: (card) => {
    if (!card) return null;
    
    return {
      ...card,
      displayName: card.title || 'Untitled Card',
      fullAddress: [
        card.address?.street,
        card.address?.city,
        card.address?.state,
        card.address?.country
      ].filter(Boolean).join(', '),
      formattedPhone: card.phone?.replace(/^(\+972|0)/, '0'),
      shortDescription: card.description?.length > 100 
        ? card.description.substring(0, 100) + '...'
        : card.description
    };
  },

  // Get card share URL
  getShareUrl: (cardId) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/cards/${cardId}`;
  },

  // Export card data
  exportCard: (card) => {
    const exportData = {
      title: card.title,
      subtitle: card.subtitle,
      description: card.description,
      email: card.email,
      phone: card.phone,
      website: card.web,
      address: card.address,
      image: card.image,
      createdAt: card.createdAt
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${card.title || 'card'}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }
};

export default cardService;

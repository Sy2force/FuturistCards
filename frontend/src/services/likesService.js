import { api } from './api';

export const likesService = {
  // Toggle like/unlike for a card
  toggleLike: async (cardId) => {
    try {
      const response = await api.post(`/likes/${cardId}/toggle`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בהחלפת מצב לייק'
      };
    }
  },

  // Get like status for a card
  getLikeStatus: async (cardId) => {
    try {
      const response = await api.get(`/likes/${cardId}/status`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      // Error handled in return statement
      // Return default state instead of mock data
      return {
        success: false,
        data: { isLiked: false, likesCount: 0, cardId },
        error: error.response?.data?.message || 'נכשל בקבלת מצב לייק'
      };
    }
  },

  // Get users who liked a card
  getCardLikers: async (cardId, limit = 10) => {
    try {
      const response = await api.get(`/likes/${cardId}/users?limit=${limit}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        data: { users: [], totalLikes: 0, cardId },
        error: error.response?.data?.message || 'נכשל בקבלת רשימת מלייקים'
      };
    }
  },

  // Get current user's liked cards
  getMyLikes: async (limit = 20) => {
    try {
      const response = await api.get(`/likes/my-likes?limit=${limit}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        data: { likedCards: [], count: 0 },
        error: error.response?.data?.message || 'נכשל בקבלת כרטיסים מועדפים'
      };
    }
  },

  // Get likes for a specific user (public)
  getUserLikes: async (userId, limit = 10) => {
    try {
      const response = await api.get(`/likes/user/${userId}?limit=${limit}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      // Error handled in return statement
      return {
        success: false,
        data: { likedCards: [], count: 0 },
        error: error.response?.data?.message || 'נכשל בקבלת לייקים של המשתמש'
      };
    }
  }
};

export default likesService;

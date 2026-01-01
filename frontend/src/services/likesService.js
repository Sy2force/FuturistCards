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
        error: error.response?.data?.message || 'Failed to toggle like'
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
        error: error.response?.data?.message || 'Failed to get like status'
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
        error: error.response?.data?.message || 'Failed to get users who liked a card'
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
        error: error.response?.data?.message || 'Failed to get favorite cards'
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
      return {
        success: false,
        data: { likedCards: [], count: 0 },
        error: error.response?.data?.message || 'Failed to get user likes'
      };
    }
  },

  // Get trending cards based on likes
  getTrendingCards: async (timeframe = '7d', limit = 10) => {
    try {
      const response = await api.get(`/likes/trending?timeframe=${timeframe}&limit=${limit}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        data: { trendingCards: [], count: 0 },
        error: error.response?.data?.message || 'Failed to get trending cards'
      };
    }
  },

  // Get like analytics for a card
  getLikeAnalytics: async (cardId) => {
    try {
      const response = await api.get(`/likes/${cardId}/analytics`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        data: { 
          totalLikes: 0, 
          dailyLikes: [], 
          topLikers: [],
          likeGrowth: 0
        },
        error: error.response?.data?.message || 'Failed to get analytics data'
      };
    }
  },

  // Bulk toggle likes
  bulkToggleLikes: async (cardIds) => {
    try {
      const response = await api.post('/likes/bulk-toggle', { cardIds });
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to bulk toggle likes'
      };
    }
  },

  // Check if user liked multiple cards
  checkMultipleLikes: async (cardIds) => {
    try {
      const response = await api.post('/likes/check-multiple', { cardIds });
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        data: {},
        error: error.response?.data?.message || 'Failed to check multiple likes'
      };
    }
  },

  // Get user's like history
  getLikeHistory: async (limit = 50, offset = 0) => {
    try {
      const response = await api.get(`/likes/history?limit=${limit}&offset=${offset}`);
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        data: { history: [], total: 0 },
        error: error.response?.data?.message || 'Failed to get like history'
      };
    }
  },

  // Get like statistics
  getLikeStats: async () => {
    try {
      const response = await api.get('/likes/stats');
      return {
        success: true,
        data: response.data.data
      };
    } catch (error) {
      return {
        success: false,
        data: {
          totalLikes: 0,
          totalLikedCards: 0,
          averageLikesPerCard: 0,
          mostLikedCard: null
        },
        error: error.response?.data?.message || 'Failed to get likes statistics'
      };
    }
  }
};

export default likesService;

import axios from 'axios';

// Create axios instance for cards API
const cardsAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/cards`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
cardsAPI.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Handle response errors
cardsAPI.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Cards API functions
export const cards = {
  // Get all cards (public)
  getCards: async (params = {}) => {
    try {
      const response = await cardsAPI.get('/', { params });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération des cartes'
      );
    }
  },

  // Get single card by ID
  getCard: async (id) => {
    try {
      const response = await cardsAPI.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération de la carte'
      );
    }
  },

  // Get card by ID (alias for getCard)
  getById: async id => {
    try {
      const response = await cardsAPI.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Carte introuvable');
    }
  },


  // Get my cards (authenticated)
  getMy: async () => {
    try {
      const response = await cardsAPI.get('/my-cards');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération de vos cartes'
      );
    }
  },

  // Get user cards (authenticated) - alias for getMy
  getUserCards: async () => {
    try {
      const response = await cardsAPI.get('/my-cards');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération de vos cartes'
      );
    }
  },

  // Create new card
  createCard: async cardData => {
    try {
      const response = await cardsAPI.post('/', cardData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la création de la carte'
      );
    }
  },

  create: async cardData => {
    try {
      const response = await cardsAPI.post('/', cardData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la création de la carte'
      );
    }
  },

  // Update card
  update: async (id, cardData) => {
    try {
      const response = await cardsAPI.put(`/${id}`, cardData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la mise à jour de la carte'
      );
    }
  },

  // Delete card
  delete: async id => {
    try {
      const response = await cardsAPI.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la suppression de la carte'
      );
    }
  },

  // Like/Unlike card
  toggleLike: async id => {
    try {
      const response = await cardsAPI.patch(`/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de la mise à jour du like'
      );
    }
  },

  // Search cards
  search: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const response = await cardsAPI.get('/search', { params });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de la recherche'
      );
    }
  },

};

// Add missing functions for FavoritesPage compatibility
export const getFavorites = async () => {
  try {
    const response = await cardsAPI.get('/favorites');
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Erreur lors de la récupération des favoris'
    );
  }
};

export const toggleFavorite = async (cardId) => {
  try {
    const response = await cardsAPI.post(`/${cardId}/favorite`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'Erreur lors de la modification des favoris'
    );
  }
};

// Add to cards object for consistency
cards.toggleFavorite = toggleFavorite;
cards.getFavorites = getFavorites;

// Export getUserCards for UserDashboard
export const getUserCards = cards.getUserCards;

export { cardsAPI };
export default cards;

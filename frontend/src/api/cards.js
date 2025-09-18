import axios from 'axios';

// Create axios instance for cards API
const cardsAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/cards`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
cardsAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
cardsAPI.interceptors.response.use(
  (response) => response,
  (error) => {
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
  getAll: async (params = {}) => {
    try {
      const response = await cardsAPI.get('/', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des cartes');
    }
  },

  // Get card by ID
  getById: async (id) => {
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
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération de vos cartes');
    }
  },

  // Create new card
  create: async (cardData) => {
    try {
      const response = await cardsAPI.post('/', cardData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la création de la carte');
    }
  },

  // Update card
  update: async (id, cardData) => {
    try {
      const response = await cardsAPI.put(`/${id}`, cardData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour de la carte');
    }
  },

  // Delete card
  delete: async (id) => {
    try {
      const response = await cardsAPI.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression de la carte');
    }
  },

  // Like/Unlike card
  toggleLike: async (id) => {
    try {
      const response = await cardsAPI.patch(`/${id}/like`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du like');
    }
  },

  // Search cards
  search: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const response = await cardsAPI.get('/search', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la recherche');
    }
  },

  // Get cards by category
  getByCategory: async (category) => {
    try {
      const response = await cardsAPI.get('/category', { params: { category } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération par catégorie');
    }
  },

  // Get popular cards
  getPopular: async (limit = 10) => {
    try {
      const response = await cardsAPI.get('/popular', { params: { limit } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des cartes populaires');
    }
  },

  // Get recent cards
  getRecent: async (limit = 10) => {
    try {
      const response = await cardsAPI.get('/recent', { params: { limit } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des cartes récentes');
    }
  },

  // Update card status (admin only)
  updateStatus: async (id, status) => {
    try {
      const response = await cardsAPI.patch(`/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour du statut');
    }
  },

  // Get card statistics (owner/admin only)
  getStats: async (id) => {
    try {
      const response = await cardsAPI.get(`/${id}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des statistiques');
    }
  }
};

export default cards;

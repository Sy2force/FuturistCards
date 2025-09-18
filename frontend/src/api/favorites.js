import axios from 'axios';

// Create axios instance for favorites API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const favoritesAPI = axios.create({
  baseURL: `${API_BASE_URL}/favorites`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
favoritesAPI.interceptors.request.use(
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
favoritesAPI.interceptors.response.use(
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

// Favorites API functions
export const favorites = {
  // Get all user favorites
  getAll: async (params = {}) => {
    try {
      const response = await favoritesAPI.get('/', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des favoris');
    }
  },

  // Add card to favorites
  add: async (cardId) => {
    try {
      const response = await favoritesAPI.post('/', { cardId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'ajout aux favoris');
    }
  },

  // Remove card from favorites
  remove: async (cardId) => {
    try {
      const response = await favoritesAPI.delete(`/${cardId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression des favoris');
    }
  },

  // Check if card is in favorites
  check: async (cardId) => {
    try {
      const response = await favoritesAPI.get(`/check/${cardId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la vérification des favoris');
    }
  },

  // Toggle favorite status
  toggle: async (cardId) => {
    try {
      const response = await favoritesAPI.post('/toggle', { cardId });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la modification des favoris');
    }
  },

  // Get favorites by category
  getByCategory: async (category) => {
    try {
      const response = await favoritesAPI.get('/category', { params: { category } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération par catégorie');
    }
  },

  // Search in favorites
  search: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const response = await favoritesAPI.get('/search', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la recherche dans les favoris');
    }
  },

  // Get favorites statistics
  getStats: async () => {
    try {
      const response = await favoritesAPI.get('/stats');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des statistiques');
    }
  },

  // Export favorites
  export: async (format = 'json') => {
    try {
      const response = await favoritesAPI.get('/export', { 
        params: { format },
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'export des favoris');
    }
  },

  // Import favorites
  import: async (file) => {
    try {
      const formData = new FormData();
      formData.append('favorites', file);
      
      const response = await favoritesAPI.post('/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de l\'import des favoris');
    }
  },

  // Clear all favorites
  clear: async () => {
    try {
      const response = await favoritesAPI.delete('/clear');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la suppression de tous les favoris');
    }
  },

  // Get recent favorites
  getRecent: async (limit = 10) => {
    try {
      const response = await favoritesAPI.get('/recent', { params: { limit } });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors de la récupération des favoris récents');
    }
  },

  // Get favorites count
  getCount: async () => {
    try {
      const response = await favoritesAPI.get('/count');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors du comptage des favoris');
    }
  }
};

export default favorites;

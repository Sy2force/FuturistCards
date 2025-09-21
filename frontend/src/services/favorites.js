import axios from 'axios';

// Create axios instance for favorites API
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const favoritesAPI = axios.create({
  baseURL: `${API_BASE_URL}/favorites`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
favoritesAPI.interceptors.request.use(
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
favoritesAPI.interceptors.response.use(
  response => response,
  error => {
    // Ne pas déconnecter automatiquement sur 401 pour éviter les déconnexions intempestives
    // Pas de log pour éviter le spam console
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
      // Return empty data for auth errors instead of throwing
      if (error.response?.status === 401) {
        return { data: [] };
      }
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération des favoris'
      );
    }
  },

  // Add card to favorites
  add: async cardId => {
    try {
      const response = await favoritesAPI.post('/', { cardId });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Erreur lors de l'ajout aux favoris"
      );
    }
  },

  // Remove card from favorites
  remove: async cardId => {
    try {
      const response = await favoritesAPI.delete(`/${cardId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la suppression des favoris'
      );
    }
  },

  // Check if card is in favorites
  check: async cardId => {
    try {
      const response = await favoritesAPI.get(`/check/${cardId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la vérification des favoris'
      );
    }
  },

  // Toggle favorite status
  toggle: async cardId => {
    try {
      const response = await favoritesAPI.post('/toggle', { cardId });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la modification des favoris'
      );
    }
  },

};

export default favorites;

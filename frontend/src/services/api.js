import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000/api';

// Créer une instance axios centralisée pour tous les appels API
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
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

// Error handling interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Never automatically disconnect in development mode
    return Promise.reject(error.response?.data || error);
  }
);

// API methods
const apiMethods = {
  // Auth methods
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  
  // Cards methods
  getCards: () => api.get('/cards'),
  getCard: (id) => api.get(`/cards/${id}`),
  createCard: (cardData) => api.post('/cards', cardData),
  updateCard: (id, cardData) => api.put(`/cards/${id}`, cardData),
  deleteCard: (id) => api.delete(`/cards/${id}`),
  
  // Favorites methods
  getFavorites: () => api.get('/favorites'),
  addFavorite: (cardId) => api.post('/favorites', { cardId }),
  removeFavorite: (cardId) => api.delete(`/favorites/${cardId}`)
};

// Export both the axios instance and the methods
export default { ...api, ...apiMethods };

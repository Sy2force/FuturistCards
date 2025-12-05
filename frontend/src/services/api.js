import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000/api';

// Debug pour Vercel (development only)
if (import.meta.env.DEV) {
  console.log('🔍 Environment Variables Debug:');
  console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('Final API_URL:', API_URL);
  console.log('All env vars:', import.meta.env);
}

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

// Create API object with methods
const apiService = {
  // Axios instance methods
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),
  
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

export default apiService;

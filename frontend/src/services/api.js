import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

// Créer une instance axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token
axiosInstance.interceptors.request.use(
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
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Never automatically disconnect in development mode
    return Promise.reject(error.response?.data || error);
  }
);

const api = {
  // Auth
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  register: (userData) => axiosInstance.post('/auth/register', userData),
  getProfile: () => axiosInstance.get('/auth/profile'),
  updateProfile: (data) => axiosInstance.put('/auth/profile', data),
  changePassword: (data) => axiosInstance.patch('/auth/change-password', data),
  logout: () => axiosInstance.post('/auth/logout'),

  // Cards
  getCards: (params) => axiosInstance.get('/cards', { params }),
  getCard: (id) => axiosInstance.get(`/cards/${id}`),
  createCard: (cardData) => axiosInstance.post('/cards', cardData),
  updateCard: (id, cardData) => axiosInstance.put(`/cards/${id}`, cardData),
  deleteCard: (id) => axiosInstance.delete(`/cards/${id}`),
  getUserCards: () => axiosInstance.get('/cards/my-cards'),
  searchCards: (params) => axiosInstance.get('/cards/search', { params }),
  getSearchSuggestions: (query) => axiosInstance.get('/cards/suggestions', { params: { q: query } }),
  likeCard: (id) => axiosInstance.patch(`/cards/${id}/like`),
  toggleFavorite: (id) => axiosInstance.post(`/cards/${id}/favorite`),

  // Favorites  
  getFavorites: () => axiosInstance.get('/favorites'),
  addToFavorites: (cardId) => axiosInstance.post('/favorites', { cardId }),
  removeFromFavorites: (cardId) => axiosInstance.delete(`/favorites/${cardId}`),

  // Users (Admin + Self)
  getAllUsers: (params) => axiosInstance.get('/users', { params }),
  getUserById: (id) => axiosInstance.get(`/users/${id}`),
  updateUser: (id, userData) => axiosInstance.put(`/users/${id}`, userData),
  changeUserRole: (id, role) => axiosInstance.patch(`/users/${id}/role`, { role }),
  deleteUser: (id) => axiosInstance.delete(`/users/${id}`),
  getUserStats: () => axiosInstance.get('/users/stats'),

  // Admin
  getAdminStats: () => axiosInstance.get('/admin/stats'),
  getSecurityData: () => axiosInstance.get('/admin/security'),
  getSystemHealth: () => axiosInstance.get('/admin/health'),
  getSystemLogs: (params) => axiosInstance.get('/admin/logs', { params }),
  performCleanup: () => axiosInstance.post('/admin/cleanup'),
  updateUserStatus: (id, isActive) => axiosInstance.put(`/admin/users/${id}/status`, { isActive }),

  // Health check
  healthCheck: () => axiosInstance.get('/health')
};

export default api;

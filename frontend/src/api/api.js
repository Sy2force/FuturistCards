import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor to add auth token
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

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
  verifyToken: () => api.get('/auth/verify'),
};

// Cards API calls
export const cardsAPI = {
  getAll: () => api.get('/cards'),
  getById: (id) => api.get(`/cards/${id}`),
  create: (cardData) => api.post('/cards', cardData),
  update: (id, cardData) => api.put(`/cards/${id}`, cardData),
  delete: (id) => api.delete(`/cards/${id}`),
  search: (query) => api.get(`/cards/search?q=${query}`),
};

// Users API calls
export const usersAPI = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (userData) => api.put('/users/me', userData),
  getAllUsers: () => api.get('/users'),
  updateUserRole: (userId, role) => api.put(`/users/${userId}/role`, { role }),
  deleteUser: (userId) => api.delete(`/users/${userId}`),
};

// Favorites API calls
export const favoritesAPI = {
  toggle: (cardId) => api.post(`/favorites/${cardId}`),
  getAll: () => api.get('/favorites'),
  remove: (cardId) => api.delete(`/favorites/${cardId}`),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;

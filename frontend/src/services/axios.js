import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
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

// Response interceptor to handle auth errors
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User profile API endpoints
export const userAPI = {
  // Get current user profile
  getProfile: () => api.get('/users/me'),

  // Update user profile and preferences
  updateProfile: data => api.put('/users/me', data),

  // Delete user account
  deleteAccount: () => api.delete('/users/me'),
};

// Auth API endpoints
export const authAPI = {
  login: credentials => api.post('/auth/login', credentials),
  register: userData => api.post('/auth/register', userData),
  refreshToken: () => api.post('/auth/refresh'),
  logout: () => api.post('/auth/logout'),
};

// Cards API endpoints
export const cardsAPI = {
  getAll: params => api.get('/cards', { params }),
  getById: id => api.get(`/cards/${id}`),
  create: cardData => api.post('/cards', cardData),
  update: (id, cardData) => api.put(`/cards/${id}`, cardData),
  delete: id => api.delete(`/cards/${id}`),
  getMyCards: () => api.get('/cards/my-cards'),
};

// Favorites API endpoints
export const favoritesAPI = {
  getAll: () => api.get('/favorites'),
  toggle: cardId => api.post('/favorites/toggle', { cardId }),
  remove: cardId => api.delete(`/favorites/${cardId}`),
};

export default api;

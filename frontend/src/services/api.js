import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';


// Create une instance axios centralisée pour tous les appels API
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000, // 10 second timeout
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

// Enhanced error handling interceptor with retry logic
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    
    // Retry logic for network errors
    if (error.code === 'NETWORK_ERROR' && !originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
      
      if (originalRequest._retryCount <= 2) {
        // Wait before retry (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * originalRequest._retryCount));
        return api(originalRequest);
      }
    }
    
    // Handle 401 errors - only logout if it's not a login/register request
    if (error.response?.status === 401 && 
        !originalRequest.url?.includes('/auth/login') && 
        !originalRequest.url?.includes('/auth/register')) {
      // Only clear auth if token exists (avoid infinite loops)
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect to login only if not already there
        if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
          window.location.href = '/login';
        }
      }
    }
    
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
  getUserCards: () => api.get('/cards/user'),
  createCard: (cardData) => api.post('/cards', cardData),
  updateCard: (id, cardData) => api.put(`/cards/${id}`, cardData),
  deleteCard: (id) => api.delete(`/cards/${id}`),
  
  // Favorites methods
  getFavorites: () => api.get('/favorites'),
  addFavorite: (cardId) => api.post(`/favorites/${cardId}`),
  removeFavorite: (cardId) => api.delete(`/favorites/${cardId}`),
  
  // Search methods
  searchCards: (query) => api.get(`/cards/search?q=${encodeURIComponent(query)}`),
  
  // Admin methods
  getUsers: () => api.get('/admin/users'),
  getUser: (id) => api.get(`/admin/users/${id}`),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAdminCards: () => api.get('/admin/cards'),
  deleteCardAdmin: (id) => api.delete(`/admin/cards/${id}`),
  getStats: () => api.get('/admin/stats')
};

export default apiService;
export { api };

import axios from 'axios';
import { STORAGE_KEYS, API_CONFIG } from '../utils/constants';
import { safeGetItem, safeSetItem } from '../utils/safeStorage';

const API_URL = API_CONFIG.BASE_URL;

// Configure axios instance for auth API
const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await authAPI.post('/login', credentials);
      
      if (response.data.success && response.data.token) {
        safeSetItem(STORAGE_KEYS.TOKEN, response.data.token);
        safeSetItem(STORAGE_KEYS.USER, response.data.user);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Network error');
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await authAPI.post('/register', userData);
      
      if (response.data.success && response.data.token) {
        safeSetItem(STORAGE_KEYS.TOKEN, response.data.token);
        safeSetItem(STORAGE_KEYS.USER, response.data.user);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Network error');
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    window.location.href = '/';
  },

  // Get current user
  getCurrentUser: () => {
    return safeGetItem(STORAGE_KEYS.USER);
  },

  // Get token
  getToken: () => {
    return safeGetItem(STORAGE_KEYS.TOKEN);
  },

  // Check if authenticated
  isAuthenticated: () => {
    const user = safeGetItem(STORAGE_KEYS.USER);
    const token = safeGetItem(STORAGE_KEYS.TOKEN);
    return !!(user && token);
  },

  // Get user profile
  getProfile: async () => {
    try {
      const token = safeGetItem(STORAGE_KEYS.TOKEN);
      const response = await authAPI.get('/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error loading profile');
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const token = safeGetItem(STORAGE_KEYS.TOKEN);
      const response = await authAPI.put('/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        const updatedUser = { ...authService.getCurrentUser(), ...response.data.user };
        safeSetItem(STORAGE_KEYS.USER, updatedUser);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Error updating profile');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Error updating profile');
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const token = safeGetItem(STORAGE_KEYS.TOKEN);
      const response = await authAPI.put('/change-password', {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || 'Error changing password');
    }
  }
};

export default authService;

import axios from 'axios';
import { STORAGE_KEYS, API_CONFIG } from '../utils/constants';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/safeStorage';

const API_URL = API_CONFIG.BASE_URL;

// Configure axios instance for users API
const usersAPI = axios.create({
  baseURL: `${API_URL}/users`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
usersAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await usersAPI.get('/me');
      return {
        success: true,
        data: response.data.user
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת פרופיל'
      };
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await usersAPI.put('/me', userData);
      
      // Update cached user data
      const currentUser = safeGetItem(STORAGE_KEYS.USER);
      if (currentUser) {
        const updatedUser = { ...currentUser, ...response.data.user };
        safeSetItem(STORAGE_KEYS.USER, updatedUser);
      }
      
      return {
        success: true,
        data: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בעדכון פרופיל'
      };
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await usersAPI.put('/me/password', passwordData);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בשינוי סיסמה'
      };
    }
  },

  // Get all users (admin only)
  getAllUsers: async (filters = {}) => {
    try {
      const response = await usersAPI.get('/', { params: filters });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת משתמשים'
      };
    }
  },

  // Update user role (admin only)
  updateUserRole: async (userId, role) => {
    try {
      const response = await usersAPI.put(`/${userId}/role`, { role });
      return {
        success: true,
        data: response.data.user,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בעדכון תפקיד משתמש'
      };
    }
  },

  // Delete user (admin only)
  deleteUser: async (userId) => {
    try {
      const response = await usersAPI.delete(`/${userId}`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל במחיקת משתמש'
      };
    }
  },

  // Get user statistics (admin only)
  getUserStats: async () => {
    try {
      const response = await usersAPI.get('/stats');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת סטטיסטיקות משתמש'
      };
    }
  },

  // Search users (admin only)
  searchUsers: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const response = await usersAPI.get('/search', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בחיפוש משתמשים'
      };
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (file) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      
      const response = await usersAPI.post('/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update cached user data
      const currentUser = safeGetItem(STORAGE_KEYS.USER);
      if (currentUser) {
        const updatedUser = { ...currentUser, profilePicture: response.data.profilePicture };
        safeSetItem(STORAGE_KEYS.USER, updatedUser);
      }
      
      return {
        success: true,
        data: response.data,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בהעלאת תמונת פרופיל'
      };
    }
  },

  // Get user preferences
  getPreferences: async () => {
    try {
      const response = await usersAPI.get('/me/preferences');
      return {
        success: true,
        data: response.data.preferences
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בטעינת העדפות'
      };
    }
  },

  // Update user preferences
  updatePreferences: async (preferences) => {
    try {
      const response = await usersAPI.put('/me/preferences', preferences);
      return {
        success: true,
        data: response.data.preferences,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'נכשל בעדכון העדפות'
      };
    }
  },

  // Check if user can perform action
  canPerformAction: (user, action) => {
    if (!user || !action) return false;
    
    const rolePermissions = {
      user: ['view', 'like', 'favorite'],
      business: ['view', 'like', 'favorite', 'create', 'edit', 'delete'],
      admin: ['view', 'like', 'favorite', 'create', 'edit', 'delete', 'manage', 'moderate']
    };
    
    const permissions = rolePermissions[user.role] || [];
    return permissions.includes(action);
  },

  // Get user display name
  getDisplayName: (user) => {
    if (!user) return 'Anonymous';
    
    const firstName = user.firstName?.trim() || '';
    const lastName = user.lastName?.trim() || '';
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    } else if (user.email) {
      return user.email.split('@')[0];
    }
    
    return 'Anonymous';
  },

  // Get user initials for avatar
  getUserInitials: (user) => {
    if (!user) return 'A';
    
    const firstName = user.firstName?.trim() || '';
    const lastName = user.lastName?.trim() || '';
    
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    } else if (firstName) {
      return firstName.substring(0, 2).toUpperCase();
    } else if (lastName) {
      return lastName.substring(0, 2).toUpperCase();
    } else if (user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return 'A';
  },

  // Clear user data from storage
  clearUserData: () => {
    safeRemoveItem(STORAGE_KEYS.USER);
    safeRemoveItem(STORAGE_KEYS.TOKEN);
    safeRemoveItem(STORAGE_KEYS.FAVORITES);
  }
};

export default userService;

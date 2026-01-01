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
        error: error.response?.data?.message || 'Failed to load profile'
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
        error: error.response?.data?.message || 'Failed to update profile'
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
        error: error.response?.data?.message || 'Failed to change password'
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
        error: error.response?.data?.message || 'Failed to load users'
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
        error: error.response?.data?.message || 'Failed to update user role'
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
        error: error.response?.data?.message || 'Failed to delete user'
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
        error: error.response?.data?.message || 'Failed to load user statistics'
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
        error: error.response?.data?.message || 'Failed to search users'
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
        error: error.response?.data?.message || 'Failed to upload profile picture'
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
        error: error.response?.data?.message || 'Failed to load preferences'
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
        error: error.response?.data?.message || 'Failed to update preferences'
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
    if (!user) return 'Anonymous User';
    
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
    
    return 'Anonymous User';
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
  },

  // Get user activity log
  getActivityLog: async (limit = 20, offset = 0) => {
    try {
      const response = await usersAPI.get(`/me/activity?limit=${limit}&offset=${offset}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load activity log'
      };
    }
  },

  // Update user settings
  updateSettings: async (settings) => {
    try {
      const response = await usersAPI.put('/me/settings', settings);
      return {
        success: true,
        data: response.data.settings,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update settings'
      };
    }
  },

  // Get user notifications
  getNotifications: async (limit = 10, unreadOnly = false) => {
    try {
      const params = { limit };
      if (unreadOnly) params.unread = true;
      
      const response = await usersAPI.get('/me/notifications', { params });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to load notifications'
      };
    }
  },

  // Mark notification as read
  markNotificationRead: async (notificationId) => {
    try {
      const response = await usersAPI.put(`/me/notifications/${notificationId}/read`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to mark notification as read'
      };
    }
  },

  // Delete user account
  deleteAccount: async (password) => {
    try {
      const response = await usersAPI.delete('/me', { data: { password } });
      
      // Clear all user data
      userService.clearUserData();
      
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to delete account'
      };
    }
  },

  // Export user data
  exportUserData: async () => {
    try {
      const response = await usersAPI.get('/me/export');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to export user data'
      };
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await usersAPI.post('/verify-email', { token });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to verify email'
      };
    }
  },

  // Resend verification email
  resendVerification: async () => {
    try {
      const response = await usersAPI.post('/resend-verification');
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send verification email'
      };
    }
  },

  // Get user role permissions
  getRolePermissions: (role) => {
    const permissions = {
      user: {
        cards: ['view', 'like', 'favorite'],
        profile: ['view', 'edit'],
        admin: []
      },
      business: {
        cards: ['view', 'create', 'edit', 'delete', 'like', 'favorite'],
        profile: ['view', 'edit'],
        admin: []
      },
      admin: {
        cards: ['view', 'create', 'edit', 'delete', 'like', 'favorite', 'moderate'],
        profile: ['view', 'edit'],
        admin: ['users', 'analytics', 'settings', 'moderate']
      }
    };
    
    return permissions[role] || permissions.user;
  },

  // Check if user has permission
  hasPermission: (user, resource, action) => {
    if (!user || !resource || !action) return false;
    
    const permissions = userService.getRolePermissions(user.role);
    return permissions[resource]?.includes(action) || false;
  },

  // Format user for display
  formatUserForDisplay: (user) => {
    if (!user) return null;
    
    return {
      ...user,
      displayName: userService.getDisplayName(user),
      initials: userService.getUserInitials(user),
      roleLabel: {
        user: 'User',
        business: 'Business',
        admin: 'Admin'
      }[user.role] || 'משתמש',
      isVerified: user.emailVerified || false,
      memberSince: user.createdAt ? new Date(user.createdAt).getFullYear() : null
    };
  },

  // Validate user data
  validateUserData: (userData) => {
    const errors = {};
    
    if (!userData.firstName?.trim()) {
      errors.firstName = 'שם פרטי נדרש';
    }
    
    if (!userData.lastName?.trim()) {
      errors.lastName = 'שם משפחה נדרש';
    }
    
    if (!userData.email?.trim()) {
      errors.email = 'אימייל נדרש';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      errors.email = 'פורמט אימייל לא תקין';
    }
    
    if (userData.phone && !/^[\d\s\-+()]+$/.test(userData.phone)) {
      errors.phone = 'פורמט טלפון לא תקין';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

export default userService;

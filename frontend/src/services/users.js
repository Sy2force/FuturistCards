import axios from 'axios';

// Create axios instance for users API
const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const usersAPI = axios.create({
  baseURL: `${API_BASE_URL}/users`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
usersAPI.interceptors.request.use(
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
usersAPI.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Users API functions
export const users = {
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await usersAPI.get('/me');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération du profil'
      );
    }
  },

  // Update current user profile
  updateProfile: async userData => {
    try {
      const response = await usersAPI.put('/me', userData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la mise à jour du profil'
      );
    }
  },

  // Change password
  changePassword: async passwordData => {
    try {
      const response = await usersAPI.put('/me/password', passwordData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors du changement de mot de passe'
      );
    }
  },

  // Upload profile image
  uploadAvatar: async file => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await usersAPI.post('/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors du téléchargement de l'image"
      );
    }
  },

  // Delete profile image
  deleteAvatar: async () => {
    try {
      const response = await usersAPI.delete('/me/avatar');
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de l'image"
      );
    }
  },

  // Get user by ID (public profile)
  getById: async id => {
    try {
      const response = await usersAPI.get(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'User not found');
    }
  },

  // Get all users (admin only)
  getAll: async (params = {}) => {
    try {
      const response = await usersAPI.get('/', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error fetching users');
    }
  },

  // Update user status (admin only)
  updateStatus: async (id, status) => {
    try {
      const response = await usersAPI.patch(`/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la mise à jour du statut'
      );
    }
  },

  // Update user role (admin only)
  updateRole: async (id, role) => {
    try {
      const response = await usersAPI.patch(`/${id}/role`, { role });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de la mise à jour du rôle'
      );
    }
  },

  // Delete user (admin only)
  delete: async id => {
    try {
      const response = await usersAPI.delete(`/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error deleting user');
    }
  },

  // Get user statistics
  getStats: async id => {
    try {
      const response = await usersAPI.get(`/${id}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération des statistiques'
      );
    }
  },

  // Search users
  search: async (query, filters = {}) => {
    try {
      const params = { q: query, ...filters };
      const response = await usersAPI.get('/search', { params });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de la recherche'
      );
    }
  },

  // Follow/Unfollow user
  toggleFollow: async id => {
    try {
      const response = await usersAPI.post(`/${id}/follow`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur lors du suivi');
    }
  },

  // Get user followers
  getFollowers: async id => {
    try {
      const response = await usersAPI.get(`/${id}/followers`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération des followers'
      );
    }
  },

  // Get user following
  getFollowing: async id => {
    try {
      const response = await usersAPI.get(`/${id}/following`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération des abonnements'
      );
    }
  },

  // Get user activity
  getActivity: async (id, params = {}) => {
    try {
      const response = await usersAPI.get(`/${id}/activity`, { params });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Erreur lors de la récupération de l'activité"
      );
    }
  },

  // Update user preferences
  updatePreferences: async preferences => {
    try {
      const response = await usersAPI.put('/me/preferences', preferences);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la mise à jour des préférences'
      );
    }
  },

  // Get user notifications
  getNotifications: async (params = {}) => {
    try {
      const response = await usersAPI.get('/me/notifications', { params });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la récupération des notifications'
      );
    }
  },

  // Mark notification as read
  markNotificationRead: async notificationId => {
    try {
      const response = await usersAPI.patch(
        `/me/notifications/${notificationId}/read`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors du marquage de la notification'
      );
    }
  },

  // Delete account
  deleteAccount: async password => {
    try {
      const response = await usersAPI.delete('/me', { data: { password } });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          'Erreur lors de la suppression du compte'
      );
    }
  },
};

export default users;

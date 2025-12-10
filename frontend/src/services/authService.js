import api from './api';

export const authService = {
  // Connexion utilisateur
  login: async (credentials) => {
    try {
      const response = await api.login(credentials);
      
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Network error during login');
    }
  },

  // Inscription utilisateur
  register: async (userData) => {
    try {
      const response = await api.register(userData);
      
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Network error during registration');
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // Obtenir l'utilisateur actuel
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },

  // Obtenir le token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // Obtenir le profil utilisateur
  getProfile: async () => {
    try {
      const response = await api.getProfile();
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error fetching profile');
    }
  },

  // Mettre à jour le profil
  updateProfile: async (profileData) => {
    try {
      const response = await api.updateProfile(profileData);
      
      if (response.success) {
        // Mettre à jour les données utilisateur en local
        const updatedUser = { ...authService.getCurrentUser(), ...response.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return response;
      } else {
        throw new Error(response.message || 'Profile update failed');
      }
    } catch (error) {
      throw new Error(error.message || 'Error updating profile');
    }
  },

  // Changer le mot de passe
  changePassword: async (passwordData) => {
    try {
      const response = await api.pos'/auth/change-password', passwordData;
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error changing password');
    }
  }
};

export default authService;

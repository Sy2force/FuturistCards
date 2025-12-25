import axios from 'axios';
import { STORAGE_KEYS, API_CONFIG, DEMO_ACCOUNTS } from '../utils/constants.js';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/safeStorage.js';
import { createUserData, handleAuthError } from '../utils/auth.helpers.js';

const API_URL = API_CONFIG.BASE_URL;

// Configure axios instance for auth API
const authAPI = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const authService = {
<<<<<<< HEAD
  // se connecter
  login: async (credentials) => {
    try {
      const response = await api.login(credentials);
      
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      } else {
        throw new Error(response.message || 'Connexion échouée');
      }
    } catch (error) {
      throw new Error(error.message || 'Erreur réseau');
    }
  },

  // créer un compte
=======
  // User registration
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  register: async (userData) => {
    try {
      const response = await authAPI.post('/register', userData);
      
<<<<<<< HEAD
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        return response;
      } else {
        throw new Error(response.message || 'Inscription échouée');
      }
    } catch (error) {
      throw new Error(error.message || 'Erreur réseau');
    }
  },

  // se déconnecter
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  },

  // récupérer l'utilisateur actuel
=======
      const user = createUserData(response.data.user, userData);
      const token = response.data.token;
      
      // Store user data and token
      safeSetItem(STORAGE_KEYS.USER, user);
      safeSetItem(STORAGE_KEYS.TOKEN, token);
      
      return {
        success: true,
        data: { user, token },
        message: response.data.message || 'Registration successful'
      };
    } catch (error) {
      return {
        success: false,
        error: handleAuthError(error)
      };
    }
  },

  // User login
  login: async (credentials) => {
    try {
      const response = await authAPI.post('/login', credentials);
      
      const user = createUserData(response.data.user, credentials);
      const token = response.data.token;
      
      // Store user data and token
      safeSetItem(STORAGE_KEYS.USER, user);
      safeSetItem(STORAGE_KEYS.TOKEN, token);
      
      return {
        success: true,
        data: { user, token },
        message: response.data.message || 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        error: handleAuthError(error)
      };
    }
  },

  // Demo login
  loginDemo: async (role = 'user') => {
    try {
      const demoAccount = DEMO_ACCOUNTS[role.toUpperCase()];
      if (!demoAccount) {
        throw new Error('Invalid demo role');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = {
        id: `demo-${role}-id`,
        email: demoAccount.email,
        firstName: role === 'admin' ? 'Admin' : role === 'business' ? 'Business' : 'Demo',
        lastName: 'User',
        role: demoAccount.role,
        isDemo: true
      };
      
      const token = `demo-token-${Date.now()}`;
      
      // Store demo user data
      safeSetItem(STORAGE_KEYS.USER, user);
      safeSetItem(STORAGE_KEYS.TOKEN, token);
      
      return {
        success: true,
        data: { user, token },
        message: `Demo ${role} login successful`
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Demo login failed'
      };
    }
  },

  // User logout
  logout: async () => {
    try {
      const token = safeGetItem(STORAGE_KEYS.TOKEN);
      
      if (token && !token.startsWith('demo-token')) {
        // Only call API for real users, not demo users
        await authAPI.post('/logout');
      }
      
      // Clear stored data
      safeRemoveItem(STORAGE_KEYS.USER);
      safeRemoveItem(STORAGE_KEYS.TOKEN);
      safeRemoveItem(STORAGE_KEYS.FAVORITES);
      
      return {
        success: true,
        message: 'Logout successful'
      };
    } catch (error) {
      // Even if API call fails, clear local data
      safeRemoveItem(STORAGE_KEYS.USER);
      safeRemoveItem(STORAGE_KEYS.TOKEN);
      safeRemoveItem(STORAGE_KEYS.FAVORITES);
      
      return {
        success: true,
        message: 'Logout successful'
      };
    }
  },

  // Verify token
  verifyToken: async () => {
    try {
      const token = safeGetItem(STORAGE_KEYS.TOKEN);
      if (!token) {
        return { success: false, error: 'No token found' };
      }

      // Skip verification for demo tokens
      if (token.startsWith('demo-token')) {
        const user = safeGetItem(STORAGE_KEYS.USER);
        return {
          success: true,
          data: { user, token }
        };
      }

      const response = await authAPI.get('/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const user = createUserData(response.data.user);
      
      // Update stored user data
      safeSetItem(STORAGE_KEYS.USER, user);
      
      return {
        success: true,
        data: { user, token }
      };
    } catch (error) {
      // Clear invalid token
      safeRemoveItem(STORAGE_KEYS.USER);
      safeRemoveItem(STORAGE_KEYS.TOKEN);
      
      return {
        success: false,
        error: handleAuthError(error)
      };
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const token = safeGetItem(STORAGE_KEYS.TOKEN);
      if (!token) {
        return { success: false, error: 'No token found' };
      }

      // Skip refresh for demo tokens
      if (token.startsWith('demo-token')) {
        const user = safeGetItem(STORAGE_KEYS.USER);
        return {
          success: true,
          data: { user, token }
        };
      }

      const response = await authAPI.post('/refresh', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const newToken = response.data.token;
      const user = createUserData(response.data.user);
      
      // Update stored data
      safeSetItem(STORAGE_KEYS.USER, user);
      safeSetItem(STORAGE_KEYS.TOKEN, newToken);
      
      return {
        success: true,
        data: { user, token: newToken }
      };
    } catch (error) {
      return {
        success: false,
        error: handleAuthError(error)
      };
    }
  },

  // Get current user from storage
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  getCurrentUser: () => {
    return safeGetItem(STORAGE_KEYS.USER);
  },

<<<<<<< HEAD
  // récupérer le token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // vérifier si connecté
=======
  // Get current token from storage
  getCurrentToken: () => {
    return safeGetItem(STORAGE_KEYS.TOKEN);
  },

  // Check if user is authenticated
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  isAuthenticated: () => {
    const user = safeGetItem(STORAGE_KEYS.USER);
    const token = safeGetItem(STORAGE_KEYS.TOKEN);
    return !!(user && token);
  },

<<<<<<< HEAD
  // récupérer le profil
  getProfile: async () => {
=======
  // Check if user has specific role
  hasRole: (requiredRole) => {
    const user = safeGetItem(STORAGE_KEYS.USER);
    if (!user) return false;
    
    const roleHierarchy = {
      user: 1,
      business: 2,
      admin: 3
    };
    
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  },

  // Check if user can access admin features
  canAccessAdmin: () => {
    const user = safeGetItem(STORAGE_KEYS.USER);
    return user?.role === 'admin';
  },

  // Check if user can create cards
  canCreateCards: () => {
    const user = safeGetItem(STORAGE_KEYS.USER);
    return user?.role === 'business' || user?.role === 'admin';
  },

  // Forgot password
  forgotPassword: async (email) => {
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
    try {
      const response = await authAPI.post('/forgot-password', { email });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
<<<<<<< HEAD
      throw new Error(error.message || 'Erreur profil');
    }
  },

  // mettre à jour le profil
  updateProfile: async (profileData) => {
=======
      return {
        success: false,
        error: handleAuthError(error)
      };
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
    try {
      const response = await authAPI.post('/reset-password', {
        token,
        password: newPassword
      });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: handleAuthError(error)
      };
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
      
<<<<<<< HEAD
      if (response.success) {
        // maj les données en local
        const updatedUser = { ...authService.getCurrentUser(), ...response.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return response;
      } else {
        throw new Error(response.message || 'Erreur mise à jour');
      }
    } catch (error) {
      throw new Error(error.message || 'Erreur profil');
    }
  },

  // changer le mot de passe
  changePassword: async (passwordData) => {
    try {
      const response = await api.post('/auth/change-password', passwordData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erreur mot de passe');
=======
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        error: handleAuthError(error)
      };
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
    }
  }
};

export default authService;

import api from './api';

export const authService = {
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
  register: async (userData) => {
    try {
      const response = await api.register(userData);
      
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
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  },

  // récupérer le token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // vérifier si connecté
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // récupérer le profil
  getProfile: async () => {
    try {
      const response = await api.getProfile();
      return response;
    } catch (error) {
      throw new Error(error.message || 'Erreur profil');
    }
  },

  // mettre à jour le profil
  updateProfile: async (profileData) => {
    try {
      const response = await api.updateProfile(profileData);
      
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
    }
  }
};

export default authService;

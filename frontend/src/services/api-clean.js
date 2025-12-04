import axios from 'axios';

// Configuration de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Création de l'instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Intercepteur pour ajouter le token d'authentification
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

// Intercepteur pour gérer les réponses et erreurs
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Une erreur est survenue';
    
    // Déconnexion automatique si token expiré
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    console.error('Erreur API:', errorMessage);
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

// Services d'authentification
export const authAPI = {
  // Inscription
  register: (userData) => api.post('/auth/register', userData),
  
  // Connexion
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Déconnexion
  logout: () => api.post('/auth/logout'),
  
  // Profil utilisateur
  getProfile: () => api.get('/auth/profile'),
  
  // Mise à jour du profil
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  
  // Changement de mot de passe
  changePassword: (passwordData) => api.put('/auth/change-password', passwordData),
};

// Services des cartes
export const cardsAPI = {
  // Obtenir toutes les cartes publiques
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/cards${queryString ? `?${queryString}` : ''}`);
  },
  
  // Obtenir une carte par ID
  getById: (id) => api.get(`/cards/${id}`),
  
  // Créer une nouvelle carte
  create: (cardData) => api.post('/cards', cardData),
  
  // Mettre à jour une carte
  update: (id, cardData) => api.put(`/cards/${id}`, cardData),
  
  // Supprimer une carte
  delete: (id) => api.delete(`/cards/${id}`),
  
  // Obtenir mes cartes
  getMy: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/cards/user/my-cards${queryString ? `?${queryString}` : ''}`);
  },
  
  // Liker/Unliker une carte
  toggleLike: (id) => api.post(`/cards/${id}/like`),
  
  // Rechercher des cartes
  search: (query, params = {}) => {
    const searchParams = new URLSearchParams({ q: query, ...params }).toString();
    return api.get(`/cards/search?${searchParams}`);
  },
  
  // Obtenir les cartes populaires
  getPopular: (limit = 10) => api.get(`/cards/popular?limit=${limit}`),
};

// Services des favoris
export const favoritesAPI = {
  // Obtenir les favoris
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/favorites${queryString ? `?${queryString}` : ''}`);
  },
  
  // Ajouter aux favoris
  add: (cardId) => api.post(`/favorites/${cardId}`),
  
  // Retirer des favoris
  remove: (cardId) => api.delete(`/favorites/${cardId}`),
  
  // Vérifier si une carte est favorite
  check: (cardId) => api.get(`/favorites/${cardId}/check`),
  
  // Obtenir le nombre de favoris
  getCount: () => api.get('/favorites/count'),
};

// Service de santé de l'API
export const healthAPI = {
  check: () => api.get('/health'),
};

// Export par défaut de l'instance axios pour les cas spéciaux
export default api;

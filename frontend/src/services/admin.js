import axios from './axios';

// API Admin pour la gestion des utilisateurs et statistiques
export const adminAPI = {
  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    const response = await axios.get('/admin/users');
    return response.data;
  },

  // Récupérer toutes les cartes
  getAllCards: async () => {
    const response = await axios.get('/admin/cards');
    return response.data;
  },

  // Récupérer les statistiques
  getStats: async () => {
    const response = await axios.get('/admin/stats');
    return response.data;
  },

  // Supprimer un utilisateur
  deleteUser: async (userId) => {
    const response = await axios.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Supprimer une carte
  deleteCard: async (cardId) => {
    const response = await axios.delete(`/admin/cards/${cardId}`);
    return response.data;
  },

  // Mettre à jour le rôle d'un utilisateur
  updateUserRole: async (userId, role) => {
    const response = await axios.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  },

  // Bloquer/débloquer un utilisateur
  toggleUserStatus: async (userId, isActive) => {
    const response = await axios.put(`/admin/users/${userId}/status`, { isActive });
    return response.data;
  },

  // Récupérer les logs d'activité
  getActivityLogs: async (limit = 50) => {
    const response = await axios.get(`/admin/logs?limit=${limit}`);
    return response.data;
  },

  // Récupérer les métriques de performance
  getPerformanceMetrics: async () => {
    const response = await axios.get('/admin/metrics');
    return response.data;
  }
};

export default adminAPI;

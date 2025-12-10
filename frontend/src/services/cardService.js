import api from './api';

export const cardService = {
  // Obtenir toutes les cartes avec filtres
  getCards: async () => {
    try {
      const response = await api.getCards();
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error fetching cards');
    }
  },

  // Obtenir une carte par ID
  getCard: async (id) => {
    try {
      const response = await api.getCard(id);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error fetching card');
    }
  },

  // Créer une nouvelle carte
  createCard: async (cardData) => {
    try {
      const response = await api.createCard(cardData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error creating card');
    }
  },

  // Mettre à jour une carte
  updateCard: async (id, cardData) => {
    try {
      const response = await api.updateCard(id, cardData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error updating card');
    }
  },

  // Supprimer une carte
  deleteCard: async (id) => {
    try {
      const response = await api.deleteCard(id);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error deleting card');
    }
  },

  // Obtenir les cartes de l'utilisateur connecté
  getUserCards: async () => {
    try {
      const response = await api.get('/cards/my-cards');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error fetching user cards');
    }
  },

  // Rechercher des cartes
  searchCards: async (query) => {
    try {
      const response = await api.get('/cards/search', { 
        params: { q: query } 
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error searching cards');
    }
  },

  // Liker/unliker une carte
  likeCard: async (id) => {
    try {
      const response = await api.pos`/cards/${id}/like`;
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error liking card');
    }
  },

  // Ajouter/retirer des favoris
  toggleFavorite: async (id) => {
    try {
      const response = await api.pos`/cards/${id}/favorite`;
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error toggling favorite');
    }
  },

  // Obtenir les cartes favorites
  getFavorites: async () => {
    try {
      const response = await api.getFavorites();
      return response;
    } catch (error) {
      throw new Error(error.message || 'Error fetching favorites');
    }
  }
};

export default cardService;

import { 
  offlineUsers, 
  offlineCards, 
  offlineFavorites, 
  offlineStats, 
  offlineConfig 
} from '../data/offlineData';

class OfflineService {
  constructor() {
    this.isOffline = true;
    this.currentUser = null;
    this.init();
  }

  init() {
    // Simuler une connexion utilisateur par défaut
    const savedUser = localStorage.getItem('offline_user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  // Authentification hors ligne
  async login(email) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = offlineUsers.find(u => u.email === email);
        if (user) {
          this.currentUser = user;
          localStorage.setItem('offline_user', JSON.stringify(user));
          localStorage.setItem('offline_token', 'demo_token_' + Date.now());
          resolve({
            success: true,
            user: user,
            token: 'demo_token_' + Date.now()
          });
        } else {
          resolve({
            success: false,
            message: 'Email ou mot de passe incorrect'
          });
        }
      }, 500);
    });
  }

  async register(userData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          _id: 'demo_user_' + Date.now(),
          ...userData,
          isActive: true,
          createdAt: new Date().toISOString()
        };
        
        // Simuler l'ajout à la base
        offlineUsers.push(newUser);
        
        resolve({
          success: true,
          message: 'Inscription réussie (mode démo)',
          user: newUser
        });
      }, 800);
    });
  }

  async logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        localStorage.removeItem('offline_user');
        localStorage.removeItem('offline_token');
        resolve({ success: true });
      }, 200);
    });
  }

  // Gestion des cartes hors ligne
  async getCards(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let cards = [...offlineCards];
        
        // Filtrage par recherche
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          cards = cards.filter(card => 
            card.title.toLowerCase().includes(searchTerm) ||
            card.subtitle.toLowerCase().includes(searchTerm) ||
            card.description.toLowerCase().includes(searchTerm)
          );
        }
        
        // Filtrage par catégorie
        if (filters.category && filters.category !== 'all') {
          cards = cards.filter(card => card.category === filters.category);
        }
        
        // Pagination simulée
        const page = filters.page || 1;
        const limit = filters.limit || 12;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        resolve({
          success: true,
          cards: cards.slice(startIndex, endIndex),
          total: cards.length,
          totalPages: Math.ceil(cards.length / limit),
          currentPage: page
        });
      }, 300);
    });
  }

  async getCard(cardId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const card = offlineCards.find(c => c._id === cardId);
        if (card) {
          // Simuler l'incrémentation des vues
          card.views += 1;
          resolve({
            success: true,
            card: card
          });
        } else {
          resolve({
            success: false,
            message: 'Carte non trouvée'
          });
        }
      }, 200);
    });
  }

  async createCard(cardData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.currentUser || (this.currentUser.role !== 'business' && this.currentUser.role !== 'admin')) {
          resolve({
            success: false,
            message: 'Accès non autorisé'
          });
          return;
        }

        const newCard = {
          _id: 'demo_card_' + Date.now(),
          ...cardData,
          user_id: this.currentUser._id,
          likes: 0,
          views: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        offlineCards.push(newCard);
        
        resolve({
          success: true,
          message: 'Carte créée avec succès (mode démo)',
          card: newCard
        });
      }, 600);
    });
  }

  async updateCard(cardId, cardData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cardIndex = offlineCards.findIndex(c => c._id === cardId);
        if (cardIndex !== -1) {
          const card = offlineCards[cardIndex];
          
          // Vérifier les permissions
          if (card.user_id !== this.currentUser._id && this.currentUser.role !== 'admin') {
            resolve({
              success: false,
              message: 'Accès non autorisé'
            });
            return;
          }
          
          offlineCards[cardIndex] = {
            ...card,
            ...cardData,
            updatedAt: new Date().toISOString()
          };
          
          resolve({
            success: true,
            message: 'Carte mise à jour (mode démo)',
            card: offlineCards[cardIndex]
          });
        } else {
          resolve({
            success: false,
            message: 'Carte non trouvée'
          });
        }
      }, 400);
    });
  }

  async deleteCard(cardId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cardIndex = offlineCards.findIndex(c => c._id === cardId);
        if (cardIndex !== -1) {
          const card = offlineCards[cardIndex];
          
          // Vérifier les permissions
          if (card.user_id !== this.currentUser._id && this.currentUser.role !== 'admin') {
            resolve({
              success: false,
              message: 'Accès non autorisé'
            });
            return;
          }
          
          offlineCards.splice(cardIndex, 1);
          
          resolve({
            success: true,
            message: 'Carte supprimée (mode démo)'
          });
        } else {
          resolve({
            success: false,
            message: 'Carte non trouvée'
          });
        }
      }, 300);
    });
  }

  // Gestion des favoris hors ligne
  async getFavorites() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.currentUser) {
          resolve({ success: false, message: 'Non connecté' });
          return;
        }
        
        const userFavorites = offlineFavorites.filter(f => f.user_id === this.currentUser._id);
        const favoriteCards = userFavorites.map(fav => {
          const card = offlineCards.find(c => c._id === fav.card_id);
          return card;
        }).filter(Boolean);
        
        resolve({
          success: true,
          favorites: favoriteCards
        });
      }, 250);
    });
  }

  async toggleFavorite(cardId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.currentUser) {
          resolve({ success: false, message: 'Non connecté' });
          return;
        }
        
        const existingFav = offlineFavorites.find(f => 
          f.user_id === this.currentUser._id && f.card_id === cardId
        );
        
        if (existingFav) {
          // Supprimer des favoris
          const index = offlineFavorites.indexOf(existingFav);
          offlineFavorites.splice(index, 1);
          resolve({
            success: true,
            action: 'removed',
            message: 'Retiré des favoris'
          });
        } else {
          // Ajouter aux favoris
          offlineFavorites.push({
            _id: 'fav_' + Date.now(),
            user_id: this.currentUser._id,
            card_id: cardId,
            createdAt: new Date().toISOString()
          });
          resolve({
            success: true,
            action: 'added',
            message: 'Ajouté aux favoris'
          });
        }
      }, 200);
    });
  }

  // Gestion des utilisateurs (Admin)
  async getUsers() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
          resolve({ success: false, message: 'Accès non autorisé' });
          return;
        }
        
        resolve({
          success: true,
          users: offlineUsers
        });
      }, 300);
    });
  }

  async getStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!this.currentUser || this.currentUser.role !== 'admin') {
          resolve({ success: false, message: 'Accès non autorisé' });
          return;
        }
        
        resolve({
          success: true,
          stats: offlineStats
        });
      }, 200);
    });
  }

  // Utilitaires
  getCurrentUser() {
    return this.currentUser;
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  getOfflineConfig() {
    return offlineConfig;
  }

  // Simuler une vérification de santé
  async healthCheck() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          status: 'OK',
          mode: 'offline',
          timestamp: new Date().toISOString(),
          database: {
            isConnected: true,
            readyState: 1,
            status: 'offline_mode'
          },
          environment: 'demo'
        });
      }, 100);
    });
  }

  // Cache management methods
  getCachedData() {
    try {
      const cached = localStorage.getItem('offline_cache');
      return cached ? JSON.parse(cached) : {
        cards: offlineCards,
        users: offlineUsers,
        favorites: offlineFavorites,
        stats: offlineStats
      };
    } catch (error) {
      return {
        cards: offlineCards,
        users: offlineUsers,
        favorites: offlineFavorites,
        stats: offlineStats
      };
    }
  }

  async cacheCurrentData() {
    try {
      const dataToCache = {
        cards: offlineCards,
        users: offlineUsers,
        favorites: offlineFavorites,
        stats: offlineStats,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('offline_cache', JSON.stringify(dataToCache));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async syncData() {
    try {
      // Simulate data sync
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const syncedData = {
        cards: offlineCards,
        users: offlineUsers,
        favorites: offlineFavorites,
        stats: offlineStats
      };
      
      // Update cache
      localStorage.setItem('offline_cache', JSON.stringify({
        ...syncedData,
        timestamp: new Date().toISOString()
      }));
      
      // Update config
      const config = { ...offlineConfig, lastSync: new Date().toISOString() };
      localStorage.setItem('offline_config', JSON.stringify(config));
      
      return { success: true, data: syncedData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  clearCache() {
    try {
      localStorage.removeItem('offline_cache');
      localStorage.removeItem('offline_config');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

// Instance singleton
const offlineService = new OfflineService();
export default offlineService;

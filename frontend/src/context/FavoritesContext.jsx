import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { t } from '../utils/translations';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(t('common.contextError'));
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState({});

  // Charger les favoris depuis localStorage au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('allFavorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        setFavorites({});
      }
    }
  }, []);

  // Sauvegarder les favoris dans localStorage
  const saveFavorites = (newFavorites) => {
    localStorage.setItem('allFavorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const toggleFavorite = useCallback((cardId) => {
    setFavorites(prev => {
      const userId = user?.id || user?.email || 'anonymous';
      const userFavorites = prev[userId] || [];
      
      let newUserFavorites;
      const isLiked = userFavorites.includes(cardId);
      
      if (isLiked) {
        newUserFavorites = userFavorites.filter(id => id !== cardId);
      } else {
        newUserFavorites = [...userFavorites, cardId];
      }
      
      const newFavorites = {
        ...prev,
        [userId]: newUserFavorites
      };
      
      // Sauvegarder dans localStorage
      localStorage.setItem('allFavorites', JSON.stringify(newFavorites));
      
      // Déclencher un événement personnalisé pour les mises à jour temps réel
      window.dispatchEvent(new CustomEvent('favoriteToggled', {
        detail: { cardId, userId, isLiked: !isLiked, timestamp: new Date() }
      }));
      
      return newFavorites;
    });
  }, [user]);

  // Ajouter une carte aux favoris
  const addToFavorites = (cardId) => {
    if (!user) return false;
    toggleFavorite(cardId);
    return true;
  };

  // Retirer une carte des favoris
  const removeFromFavorites = (cardId) => {
    if (!user) return false;
    toggleFavorite(cardId);
    return true;
  };

  // Verify si une carte est en favori
  const isFavorite = (cardId) => {
    if (!user) return false;
    const userId = user?.id || user?.email || 'anonymous';
    const userFavorites = favorites[userId] || [];
    return userFavorites.includes(cardId);
  };

  // Obtenir toutes les cartes favorites
  const getFavoriteCards = (allCards) => {
    if (!user || !allCards) return [];
    const userId = user?.id || user?.email || 'anonymous';
    const userFavorites = favorites[userId] || [];
    return allCards.filter(card => userFavorites.includes(card.id || card._id));
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCards,
    favoritesCount: user ? (favorites[user?.id || user?.email || 'anonymous'] || []).length : 0
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;

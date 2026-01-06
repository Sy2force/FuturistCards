import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState({});

  // Load favorites from localStorage on startup
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedFavorites = localStorage.getItem('allFavorites');
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          setFavorites({});
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to localStorage
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
      
      // Save to localStorage
      localStorage.setItem('allFavorites', JSON.stringify(newFavorites));
      
      // Trigger custom event for real-time updates
      window.dispatchEvent(new CustomEvent('favoriteToggled', {
        detail: { cardId, userId, isLiked: !isLiked, timestamp: new Date() }
      }));
      
      return newFavorites;
    });
  }, [user]);

  // Add card to favorites
  const addToFavorites = (cardId) => {
    if (!user) return false;
    toggleFavorite(cardId);
    return true;
  };

  // Remove card from favorites
  const removeFromFavorites = (cardId) => {
    if (!user) return false;
    toggleFavorite(cardId);
    return true;
  };

  // Check if card is favorite
  const isFavorite = (cardId) => {
    if (!user) return false;
    const userId = user?.id || user?.email || 'anonymous';
    const userFavorites = favorites[userId] || [];
    return userFavorites.includes(cardId);
  };

  // Get all favorite cards
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

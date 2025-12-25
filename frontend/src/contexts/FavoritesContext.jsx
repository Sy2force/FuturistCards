import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { cardService } from '../services/cardService';
import { safeGetItem, safeSetItem } from '../utils/safeStorage';

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedFavorites = safeGetItem(`favorites_${user.id}`) || [];
      setFavorites(savedFavorites);
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (user && favorites.length >= 0) {
      safeSetItem(`favorites_${user.id}`, favorites);
    }
  }, [favorites, user]);

  const toggleFavorite = async (cardId) => {
    if (!user) return { success: false, error: 'Utilisateur non connecté' };

    try {
      setLoading(true);
      
      const isFavorite = favorites.includes(cardId);
      
      // Optimistic update
      if (isFavorite) {
        setFavorites(prev => prev.filter(id => id !== cardId));
      } else {
        setFavorites(prev => [...prev, cardId]);
      }

      // API call
      const result = await cardService.toggleFavorite(cardId);
      
      if (!result.success) {
        // Revert optimistic update on failure
        if (isFavorite) {
          setFavorites(prev => [...prev, cardId]);
        } else {
          setFavorites(prev => prev.filter(id => id !== cardId));
        }
        return result;
      }

      return { success: true, isFavorite: !isFavorite };
    } catch (error) {
      // Revert optimistic update on error
      const isFavorite = favorites.includes(cardId);
      if (isFavorite) {
        setFavorites(prev => [...prev, cardId]);
      } else {
        setFavorites(prev => prev.filter(id => id !== cardId));
      }
      
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (cardId) => {
    return favorites.includes(cardId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  const clearFavorites = () => {
    setFavorites([]);
    if (user) {
      safeSetItem(`favorites_${user.id}`, []);
    }
  };

  const addFavorite = (cardId) => {
    if (!favorites.includes(cardId)) {
      setFavorites(prev => [...prev, cardId]);
    }
  };

  const removeFavorite = (cardId) => {
    setFavorites(prev => prev.filter(id => id !== cardId));
  };

  const value = {
    favorites,
    loading,
    toggleFavorite,
    isFavorite,
    getFavoritesCount,
    clearFavorites,
    addFavorite,
    removeFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

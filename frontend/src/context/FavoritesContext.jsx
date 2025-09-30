import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris depuis localStorage au démarrage
  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (error) {
          console.error('Error loading favorites:', error);
          setFavorites([]);
        }
      }
    } else {
      setFavorites([]);
    }
  }, [user]);

  // Sauvegarder les favoris dans localStorage
  const saveFavorites = (newFavorites) => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    }
  };

  // Ajouter une carte aux favoris
  const addToFavorites = (cardId) => {
    if (!user) return false;
    
    if (!favorites.includes(cardId)) {
      const newFavorites = [...favorites, cardId];
      saveFavorites(newFavorites);
      return true;
    }
    return false;
  };

  // Retirer une carte des favoris
  const removeFromFavorites = (cardId) => {
    if (!user) return false;
    
    const newFavorites = favorites.filter(id => id !== cardId);
    saveFavorites(newFavorites);
    return true;
  };

  // Basculer le statut favori d'une carte
  const toggleFavorite = (cardId) => {
    if (!user) return false;
    
    if (favorites.includes(cardId)) {
      return removeFromFavorites(cardId);
    } else {
      return addToFavorites(cardId);
    }
  };

  // Vérifier si une carte est en favori
  const isFavorite = (cardId) => {
    return user ? favorites.includes(cardId) : false;
  };

  // Obtenir toutes les cartes favorites
  const getFavoriteCards = (allCards) => {
    if (!user || !allCards) return [];
    return allCards.filter(card => favorites.includes(card.id));
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoriteCards,
    favoritesCount: favorites.length
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;

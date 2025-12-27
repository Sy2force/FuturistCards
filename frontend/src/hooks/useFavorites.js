import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = (cardId) => {
    setLoading(true);
    try {
      const newFavorites = favorites.includes(cardId)
        ? favorites.filter(id => id !== cardId)
        : [...favorites, cardId];
      
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      // Error toggling favorite - silently handle
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (cardId) => favorites.includes(cardId);

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite
  };
};

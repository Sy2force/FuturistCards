import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personnalisé pour gérer le localStorage avec synchronisation React
 * Gère automatiquement la sérialisation/désérialisation JSON
 */
export const useLocalStorage = (key, initialValue = null) => {
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Récupère la valeur depuis localStorage
      const item = window.localStorage.getItem(key);
      // Parse la valeur JSON ou retourne initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Silently handle localStorage errors in production
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`Error reading localStorage key "${key}":`, error);
      }
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = useCallback((value) => {
    try {
      // Permet de passer une fonction comme pour useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Sauvegarde dans l'état
      setStoredValue(valueToStore);
      
      // Sauvegarde dans localStorage
      if (valueToStore === null || valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      
      // Dispatch un événement personnalisé pour synchroniser entre onglets
      window.dispatchEvent(new CustomEvent('localStorage-change', {
        detail: { key, value: valueToStore }
      }));
    } catch (error) {
      // Silently handle localStorage errors in production
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue]);

  // Fonction pour supprimer la valeur
  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
      
      window.dispatchEvent(new CustomEvent('localStorage-change', {
        detail: { key, value: null }
      }));
    } catch (error) {
      // Silently handle localStorage errors in production
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    }
  }, [key]);

  // Écoute les changements depuis d'autres onglets
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== JSON.stringify(storedValue)) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : null);
        } catch (error) {
          // Silently handle localStorage parsing errors in production
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error(`Error parsing localStorage change for key "${key}":`, error);
          }
        }
      }
    };

    // Écoute les événements personnalisés pour la synchronisation
    const handleCustomChange = (e) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorage-change', handleCustomChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorage-change', handleCustomChange);
    };
  }, [key, storedValue]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook spécialisé pour gérer les favoris dans localStorage
 */
export const useFavorites = () => {
  const [favorites, setFavorites, removeFavorites] = useLocalStorage('favorites', []);

  const addFavorite = useCallback((cardId) => {
    setFavorites(prev => {
      const newFavorites = Array.isArray(prev) ? prev : [];
      if (!newFavorites.includes(cardId)) {
        return [...newFavorites, cardId];
      }
      return newFavorites;
    });
  }, [setFavorites]);

  const removeFavorite = useCallback((cardId) => {
    setFavorites(prev => {
      const currentFavorites = Array.isArray(prev) ? prev : [];
      return currentFavorites.filter(id => id !== cardId);
    });
  }, [setFavorites]);

  const toggleFavorite = useCallback((cardId) => {
    const currentFavorites = Array.isArray(favorites) ? favorites : [];
    if (currentFavorites.includes(cardId)) {
      removeFavorite(cardId);
      return false;
    } else {
      addFavorite(cardId);
      return true;
    }
  }, [favorites, addFavorite, removeFavorite]);

  const isFavorite = useCallback((cardId) => {
    const currentFavorites = Array.isArray(favorites) ? favorites : [];
    return currentFavorites.includes(cardId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    removeFavorites();
  }, [removeFavorites]);

  return {
    favorites: Array.isArray(favorites) ? favorites : [],
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: Array.isArray(favorites) ? favorites.length : 0
  };
};

/**
 * Hook pour gérer les préférences utilisateur
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    language: 'fr',
    cardViewMode: 'grid', // 'grid' | 'list'
    cardsPerPage: 12,
    notifications: true,
    autoSave: true
  });

  const updatePreference = useCallback((key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  }, [setPreferences]);

  const resetPreferences = useCallback(() => {
    setPreferences({
      theme: 'light',
      language: 'fr',
      cardViewMode: 'grid',
      cardsPerPage: 12,
      notifications: true,
      autoSave: true
    });
  }, [setPreferences]);

  return {
    preferences,
    updatePreference,
    resetPreferences,
    
    // Helpers pour les préférences communes
    theme: preferences.theme,
    language: preferences.language,
    setTheme: (theme) => updatePreference('theme', theme),
    setLanguage: (lang) => updatePreference('language', lang),
    setCardViewMode: (mode) => updatePreference('cardViewMode', mode),
    setCardsPerPage: (count) => updatePreference('cardsPerPage', count)
  };
};

/**
 * Hook pour gérer l'historique de recherche
 */
export const useSearchHistory = (maxItems = 10) => {
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const addSearch = useCallback((query) => {
    if (!query || query.trim().length < 2) return;
    
    const normalizedQuery = query.trim().toLowerCase();
    
    setSearchHistory(prev => {
      const history = Array.isArray(prev) ? prev : [];
      // Supprime l'entrée existante si elle existe
      const filtered = history.filter(item => item !== normalizedQuery);
      // Ajoute en première position
      const newHistory = [normalizedQuery, ...filtered];
      // Limite le nombre d'éléments
      return newHistory.slice(0, maxItems);
    });
  }, [setSearchHistory, maxItems]);

  const removeSearch = useCallback((query) => {
    setSearchHistory(prev => {
      const history = Array.isArray(prev) ? prev : [];
      return history.filter(item => item !== query);
    });
  }, [setSearchHistory]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
  }, [setSearchHistory]);

  return {
    searchHistory: Array.isArray(searchHistory) ? searchHistory : [],
    addSearch,
    removeSearch,
    clearHistory
  };
};

export default useLocalStorage;

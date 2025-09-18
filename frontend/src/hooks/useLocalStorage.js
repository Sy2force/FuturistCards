import { useState } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - The localStorage key
 * @param {any} initialValue - The initial value if key doesn't exist
 * @returns {[any, function]} - [value, setValue]
 */
const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook for managing user preferences in localStorage
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'dark',
    language: 'fr',
    notifications: {
      email: true,
      push: true,
      marketing: false
    },
    privacy: {
      profileVisible: true,
      showEmail: false,
      showPhone: false
    },
    display: {
      cardsPerPage: 12,
      viewMode: 'grid', // 'grid' | 'list'
      sortBy: 'recent' // 'recent' | 'popular' | 'alphabetical'
    }
  });

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: typeof value === 'object' ? { ...prev[key], ...value } : value
    }));
  };

  const resetPreferences = () => {
    setPreferences({
      theme: 'dark',
      language: 'fr',
      notifications: {
        email: true,
        push: true,
        marketing: false
      },
      privacy: {
        profileVisible: true,
        showEmail: false,
        showPhone: false
      },
      display: {
        cardsPerPage: 12,
        viewMode: 'grid',
        sortBy: 'recent'
      }
    });
  };

  return {
    preferences,
    setPreferences,
    updatePreference,
    resetPreferences
  };
};

/**
 * Hook for managing search history
 */
export const useSearchHistory = (maxItems = 10) => {
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const addSearch = (searchTerm) => {
    if (!searchTerm || searchTerm.trim().length === 0) return;

    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== searchTerm.toLowerCase());
      const newHistory = [searchTerm, ...filtered];
      return newHistory.slice(0, maxItems);
    });
  };

  const removeSearch = (searchTerm) => {
    setSearchHistory(prev => prev.filter(item => item !== searchTerm));
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  return {
    searchHistory,
    addSearch,
    removeSearch,
    clearHistory
  };
};

/**
 * Hook for managing recently viewed cards
 */
export const useRecentlyViewed = (maxItems = 20) => {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage('recentlyViewed', []);

  const addRecentCard = (card) => {
    if (!card || !card._id) return;

    const cardData = {
      _id: card._id,
      title: card.title,
      subtitle: card.subtitle,
      image: card.image,
      viewedAt: new Date().toISOString()
    };

    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item._id !== card._id);
      const newRecent = [cardData, ...filtered];
      return newRecent.slice(0, maxItems);
    });
  };

  const removeRecentCard = (cardId) => {
    setRecentlyViewed(prev => prev.filter(item => item._id !== cardId));
  };

  const clearRecent = () => {
    setRecentlyViewed([]);
  };

  return {
    recentlyViewed,
    addRecentCard,
    removeRecentCard,
    clearRecent
  };
};

/**
 * Hook for managing form drafts
 */
export const useFormDraft = (formName) => {
  const [draft, setDraft] = useLocalStorage(`formDraft_${formName}`, null);

  const saveDraft = (formData) => {
    const draftData = {
      data: formData,
      savedAt: new Date().toISOString()
    };
    setDraft(draftData);
  };

  const loadDraft = () => {
    return draft?.data || null;
  };

  const clearDraft = () => {
    setDraft(null);
  };

  const hasDraft = () => {
    return draft !== null && draft.data !== null;
  };

  const getDraftAge = () => {
    if (!draft?.savedAt) return null;
    return new Date() - new Date(draft.savedAt);
  };

  return {
    draft,
    saveDraft,
    loadDraft,
    clearDraft,
    hasDraft,
    getDraftAge
  };
};

/**
 * Hook for managing app settings
 */
export const useAppSettings = () => {
  const [settings, setSettings] = useLocalStorage('appSettings', {
    autoSave: true,
    confirmDelete: true,
    showTutorial: true,
    debugMode: false,
    animationsEnabled: true,
    soundEnabled: false
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    setSettings({
      autoSave: true,
      confirmDelete: true,
      showTutorial: true,
      debugMode: false,
      animationsEnabled: true,
      soundEnabled: false
    });
  };

  return {
    settings,
    updateSetting,
    resetSettings
  };
};

export { useLocalStorage };
export default useLocalStorage;

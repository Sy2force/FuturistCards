import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CardsStatsContext = createContext();

export const useCardsStats = () => {
  const context = useContext(CardsStatsContext);
  if (!context) {
    throw new Error('useCardsStats must be used within a CardsStatsProvider');
  }
  return context;
};

export const CardsStatsProvider = ({ children }) => {
  const [cardsStats, setCardsStats] = useState({});
  const [globalStats, setGlobalStats] = useState({
    totalLikes: 0,
    totalViews: 0,
    totalCards: 0
  });

  // Initialize card stats starting at zero
  const initializeCardStats = useCallback((cardId) => {
    if (!cardsStats[cardId]) {
      setCardsStats(prev => ({
        ...prev,
        [cardId]: {
          likes: 0,
          views: 0,
          isLiked: false
        }
      }));
    }
  }, [cardsStats]);

  // Initialize multiple cards starting at zero
  const initializeMultipleCards = useCallback((cardIds) => {
    const newCards = cardIds.filter(id => !cardsStats[id]);
    if (newCards.length === 0) return;

    const newStats = {};
    newCards.forEach(cardId => {
      newStats[cardId] = {
        likes: 0,
        views: 0,
        isLiked: false
      };
    });

    setCardsStats(prev => ({
      ...prev,
      ...newStats
    }));

    setGlobalStats(prev => ({
      ...prev,
      totalCards: prev.totalCards + newCards.length
    }));
  }, [cardsStats]);

  // Toggle like for a card
  const toggleLike = useCallback((cardId) => {
    setCardsStats(prev => {
      const currentStats = prev[cardId] || { likes: 0, views: 0, isLiked: false };
      const newIsLiked = !currentStats.isLiked;
      const likesChange = newIsLiked ? 1 : -1;
      
      // Update global stats
      setGlobalStats(prevGlobal => ({
        ...prevGlobal,
        totalLikes: Math.max(0, prevGlobal.totalLikes + likesChange)
      }));

      const newStats = {
        ...currentStats,
        likes: Math.max(0, currentStats.likes + likesChange),
        isLiked: newIsLiked
      };

      // Broadcast the change to other tabs/windows
      localStorage.setItem('cardsStats_update', JSON.stringify({
        cardId,
        timestamp: Date.now(),
        action: 'toggleLike',
        newStats
      }));

      return {
        ...prev,
        [cardId]: newStats
      };
    });
  }, []);

  // Increment views for a card
  const incrementViews = useCallback(async (cardId) => {
    setCardsStats(prev => {
      const currentStats = prev[cardId] || { likes: 0, views: 0, isLiked: false };
      
      // Update global stats
      setGlobalStats(prevGlobal => ({
        ...prevGlobal,
        totalViews: prevGlobal.totalViews + 1
      }));

      return {
        ...prev,
        [cardId]: {
          ...currentStats,
          views: currentStats.views + 1
        }
      };
    });

    // Broadcast the change to other tabs/windows
    localStorage.setItem('cardsStats_update', JSON.stringify({
      cardId,
      timestamp: Date.now(),
      action: 'incrementViews'
    }));
  }, []);

  // Get stats for a specific card
  const getCardStats = useCallback((cardId) => {
    return cardsStats[cardId] || { likes: 0, views: 0, isLiked: false };
  }, [cardsStats]);

  // Get all liked cards
  const getLikedCards = useCallback(() => {
    return Object.keys(cardsStats).filter(cardId => cardsStats[cardId].isLiked);
  }, [cardsStats]);

  // Listen for changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cardsStats_update') {
        const update = JSON.parse(e.newValue);
        if (update.action === 'toggleLike') {
          toggleLike(update.cardId);
        } else if (update.action === 'incrementViews') {
          incrementViews(update.cardId);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [toggleLike, incrementViews]);

  // Reset and initialize fresh stats on first load
  useEffect(() => {
    // Clear any existing data to start fresh
    localStorage.removeItem('cardsStats');
    localStorage.removeItem('globalStats');
    localStorage.removeItem('cardsStats_update');
    
    // Initialize with clean state
    setCardsStats({});
    setGlobalStats({
      totalLikes: 0,
      totalViews: 0,
      totalCards: 0
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('cardsStats', JSON.stringify(cardsStats));
  }, [cardsStats]);

  useEffect(() => {
    localStorage.setItem('globalStats', JSON.stringify(globalStats));
  }, [globalStats]);

  const value = {
    cardsStats,
    globalStats,
    initializeCardStats,
    initializeMultipleCards,
    toggleLike,
    incrementViews,
    getCardStats,
    getLikedCards,
  };

  return (
    <CardsStatsContext.Provider value={value}>
      {children}
    </CardsStatsContext.Provider>
  );
};

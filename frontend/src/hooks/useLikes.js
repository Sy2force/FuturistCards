import { useState, useEffect, useCallback } from 'react';
import { likesService } from '../services/likesService';
import { useAuth } from './useAuth';

export const useLikes = (cardId = null) => {
  const { user } = useAuth();
  const [likesState, setLikesState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize likes state for a card
  const initializeLikeState = useCallback(async (id) => {
    if (!id || likesState[id]) return;

    setLoading(true);
    const result = await likesService.getLikeStatus(id);
    
    if (result.success) {
      setLikesState(prev => ({
        ...prev,
        [id]: {
          isLiked: result.data.isLiked,
          likesCount: result.data.likesCount,
          loading: false
        }
      }));
    } else {
      // Only set default state if API call fails
      setLikesState(prev => ({
        ...prev,
        [id]: {
          isLiked: false,
          likesCount: 0,
          loading: false
        }
      }));
      setError(result.error);
    }
    setLoading(false);
  }, [likesState]);

  // Toggle like for a card
  const toggleLike = useCallback(async (id) => {
    if (!user) {
      setError('You must be logged in to like cards');
      return { success: false, error: 'Authentication required' };
    }

    if (!id) {
      setError('Card ID is required');
      return { success: false, error: 'Invalid card ID' };
    }

    // Optimistic update
    setLikesState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        loading: true
      }
    }));

    try {
      const result = await likesService.toggleLike(id);
      
      if (result.success) {
        // Update state with server response
        setLikesState(prev => ({
          ...prev,
          [id]: {
            isLiked: result.data.isLiked,
            likesCount: result.data.likesCount,
            loading: false
          }
        }));
        
        setError(null);
        return { success: true, data: result.data };
      } else {
        // Revert optimistic update on error
        setLikesState(prev => ({
          ...prev,
          [id]: {
            ...prev[id],
            loading: false
          }
        }));
        
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      // Revert optimistic update on error
      setLikesState(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          loading: false
        }
      }));
      
      const errorMsg = 'Failed to toggle like';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, [user]);

  // Get like state for a specific card
  const getLikeState = useCallback((id) => {
    return likesState[id] || {
      isLiked: false,
      likesCount: 0,
      loading: false
    };
  }, [likesState]);

  // Initialize multiple cards at once
  const initializeMultipleCards = useCallback(async (cardIds) => {
    if (!cardIds || cardIds.length === 0) return;

    const newCards = cardIds.filter(id => !likesState[id]);
    if (newCards.length === 0) return;

    setLoading(true);
    
    // Initialize all new cards as loading
    const loadingStates = {};
    newCards.forEach(id => {
      loadingStates[id] = { isLiked: false, likesCount: 0, loading: true };
    });
    
    setLikesState(prev => ({
      ...prev,
      ...loadingStates
    }));

    // Fetch likes status for all cards
    const promises = newCards.map(id => likesService.getLikeStatus(id));
    const results = await Promise.allSettled(promises);

    const finalStates = {};
    results.forEach((result, index) => {
      const cardId = newCards[index];
      if (result.status === 'fulfilled' && result.value.success) {
        finalStates[cardId] = {
          isLiked: result.value.data.isLiked,
          likesCount: result.value.data.likesCount,
          loading: false
        };
      } else {
        // Only set default state if API call fails
        finalStates[cardId] = { isLiked: false, likesCount: 0, loading: false };
        console.warn(`Failed to load like status for card ${cardId}:`, result.reason || result.value?.error);
      }
    });

    setLikesState(prev => ({
      ...prev,
      ...finalStates
    }));
    
    setLoading(false);
  }, [likesState]);

  // Update likes count for a card (for real-time updates)
  const updateLikesCount = useCallback((id, newCount) => {
    setLikesState(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        likesCount: newCount
      }
    }));
  }, []);

  // Get my liked cards
  const [myLikes, setMyLikes] = useState({ likedCards: [], loading: false, error: null });
  
  const fetchMyLikes = useCallback(async () => {
    if (!user) return;

    setMyLikes(prev => ({ ...prev, loading: true }));
    
    const result = await likesService.getMyLikes();
    
    if (result.success) {
      setMyLikes({
        likedCards: result.data.likedCards,
        loading: false,
        error: null
      });
    } else {
      setMyLikes({
        likedCards: [],
        loading: false,
        error: result.error
      });
    }
  }, [user]);

  // Initialize single card on mount if cardId provided
  useEffect(() => {
    if (cardId) {
      initializeLikeState(cardId);
    }
  }, [cardId, initializeLikeState]);

  // Clear error after some time
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return {
    // State
    getLikeState,
    loading,
    error,
    myLikes,
    
    // Actions
    toggleLike,
    initializeLikeState,
    initializeMultipleCards,
    updateLikesCount,
    fetchMyLikes,
    
    // Utilities
    clearError: () => setError(null)
  };
};

export default useLikes;

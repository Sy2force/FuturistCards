import { useState, useEffect } from 'react';
import api from '../api/axios';
import { toast } from 'react-hot-toast';

const useCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all cards
  const fetchCards = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/cards', { params });
      
      if (response.data.success) {
        setCards(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch cards');
      }
    } catch (error) {
      console.error('❌ Load error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to load cards');
      toast.error('Erreur lors du chargement des cartes');
    } finally {
      setLoading(false);
    }
  };

  // Create a new card
  const addCard = async (cardData) => {
    try {
      const response = await api.post('/cards', cardData);
      
      if (response.data.success) {
        setCards(prev => [response.data.data, ...prev]);
        toast.success('Carte créée avec succès !');
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to create card');
      }
    } catch (error) {
      console.error('❌ Create error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create card';
      toast.error(`Erreur: ${errorMessage}`);
      throw error;
    }
  };

  // Delete a card
  const deleteCard = async (cardId) => {
    try {
      const response = await api.delete(`/cards/${cardId}`);
      
      if (response.data.success) {
        setCards(prev => prev.filter(card => card._id !== cardId));
        toast.success('Carte supprimée avec succès !');
      } else {
        throw new Error(response.data.message || 'Failed to delete card');
      }
    } catch (error) {
      console.error('❌ Delete error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete card';
      toast.error(`Erreur: ${errorMessage}`);
      throw error;
    }
  };

  // Update a card
  const updateCard = async (cardId, cardData) => {
    try {
      const response = await api.put(`/cards/${cardId}`, cardData);
      
      if (response.data.success) {
        setCards(prev => prev.map(card => 
          card._id === cardId ? response.data.data : card
        ));
        toast.success('Carte mise à jour avec succès !');
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update card');
      }
    } catch (error) {
      console.error('❌ Update error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update card';
      toast.error(`Erreur: ${errorMessage}`);
      throw error;
    }
  };

  // Toggle like on a card
  const toggleLike = async (cardId) => {
    try {
      const response = await api.post(`/cards/${cardId}/like`);
      
      if (response.data.success) {
        setCards(prev => prev.map(card => {
          if (card._id === cardId) {
            return {
              ...card,
              likesCount: response.data.data.likesCount,
              isLiked: response.data.data.liked
            };
          }
          return card;
        }));
        
        toast.success(response.data.data.liked ? 'Carte ajoutée aux favoris !' : 'Carte retirée des favoris');
      } else {
        throw new Error(response.data.message || 'Failed to toggle like');
      }
    } catch (error) {
      console.error('❌ Toggle like error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to toggle like';
      toast.error(`Erreur: ${errorMessage}`);
    }
  };

  // Search cards
  const searchCards = async (query, options = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = { q: query, ...options };
      const response = await api.get('/cards/search', { params });
      
      if (response.data.success) {
        setCards(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to search cards');
      }
    } catch (error) {
      console.error('❌ Search error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to search cards');
      toast.error('Erreur lors de la recherche');
    } finally {
      setLoading(false);
    }
  };

  // Get nearby cards
  const getNearbyCards = async (longitude, latitude, maxDistance = 10000) => {
    try {
      setLoading(true);
      setError(null);
      
      const params = { longitude, latitude, maxDistance };
      const response = await api.get('/cards/nearby', { params });
      
      if (response.data.success) {
        setCards(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to get nearby cards');
      }
    } catch (error) {
      console.error('❌ Nearby cards error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to get nearby cards');
      toast.error('Erreur lors de la recherche de cartes à proximité');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchCards();
  }, []);

  return {
    cards,
    loading,
    error,
    fetchCards,
    addCard,
    deleteCard,
    updateCard,
    toggleLike,
    searchCards,
    getNearbyCards,
    refetch: fetchCards
  };
};

export default useCards;

import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../services/api';
import {
  PlusIcon,
  EyeIcon,
  HeartIcon,
  TrashIcon,
  PencilIcon,
  ShareIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import GlassCard from '../../components/ui/GlassCard';
import GlassButton from '../../components/ui/GlassButton';

const MyCardsPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, cardId: null, cardName: '' });

  const fetchMyCards = useCallback(async () => {
    try {
      setLoading(true);
      // Load first from localStorage
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      
      try {
        const response = await apiService.getMyCards();
        const serverCards = response.data.cards || [];
        setCards([...localCards, ...serverCards]);
      } catch (apiError) {
        // If server unavailable, use only local cards + demo
        const mockCards = [
          {
            _id: 'demo-1',
            title: 'title',
            subtitle: 'subtitle',
            company: 'company',
            description: 'description',
            image: null,
            views: 245,
            likes: 18,
            createdAt: '2024-01-15T10:30:00Z',
            backgroundColor: '#1e293b',
            textColor: '#ffffff',
            accentColor: '#3b82f6',
            isDemo: true
          },
          {
            _id: 'demo-2',
            title: 'title',
            subtitle: 'subtitle',
            company: 'company',
            description: 'description',
            image: null,
            views: 189,
            likes: 24,
            createdAt: '2024-01-10T14:20:00Z',
            backgroundColor: '#7c3aed',
            textColor: '#ffffff',
            accentColor: '#f59e0b',
            isDemo: true
          }
        ];
        setCards([...localCards, ...mockCards]);
      }
    } catch (error) {
      setError('load Error');
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const handleDeleteCard = async (cardId) => {
    try {
      // Delete from server if not demo card
      const card = cards.find(c => c._id === cardId);
      if (!card?.isDemo) {
        try {
          await apiService.deleteCard(cardId);
        } catch (apiError) {
          // Server delete failed, continuing with local delete
        }
      }
      
      // Delete from localStorage
      const localCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const updatedLocalCards = localCards.filter(card => card.id !== cardId);
      localStorage.setItem('userCards', JSON.stringify(updatedLocalCards));
      
      // Update state
      setCards(cards.filter(card => card._id !== cardId));
      setDeleteModal({ isOpen: false, cardId: null, cardName: '' });
    } catch (error) {
      // Error handled silently in production
    }
  };

  const openDeleteModal = (card) => {
    setDeleteModal({
      isOpen: true,
      cardId: card._id,
      cardName: card.title || card.name
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, cardId: null, cardName: '' });
  };

  const handleEditCard = (cardId) => {
    navigate(`/cards/${cardId}/edit`);
  };

  const handleShareCard = (card) => {
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: `${window.location.origin}/cards/${card._id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/cards/${card._id}`);
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards]);

  // Refresh cards when component becomes visible (user returns from creating a card)
  useEffect(() => {
    const handleFocus = () => {
      fetchMyCards();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchMyCards]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{'title'} - FuturistCards</title>
        <meta name="description" content={'subtitle'} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  {'title'}
                </h1>
                <p className="text-gray-300">
                  {'subtitle'}
                </p>
              </div>
              <Link to="/create-card">
                <GlassButton className="flex items-center">
                  <PlusIcon className="h-5 w-5 ml-2" />
                  {'create New'}
                </GlassButton>
              </Link>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{'total Cards'}</p>
                  <p className="text-3xl font-bold text-white">{cards.length}</p>
                </div>
                <ChartBarIcon className="h-8 w-8 text-blue-400" />
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{'total Views'}</p>
                  <p className="text-3xl font-bold text-white">
                    {cards.reduce((sum, card) => sum + (card.views || 0), 0)}
                  </p>
                </div>
                <EyeIcon className="h-8 w-8 text-green-400" />
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{'total Likes'}</p>
                  <p className="text-3xl font-bold text-white">
                    {cards.reduce((sum, card) => sum + (card.likes || 0), 0)}
                  </p>
                </div>
                <HeartIcon className="h-8 w-8 text-red-400" />
              </div>
            </GlassCard>
            
            <GlassCard className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{'active Cards'}</p>
                  <p className="text-3xl font-bold text-white">
                    {cards.filter(card => card.status === 'active').length}
                  </p>
                </div>
                <CalendarIcon className="h-8 w-8 text-purple-400" />
              </div>
            </GlassCard>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6"
            >
              {error}
            </motion.div>
          )}

          {cards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center py-16"
            >
              <GlassCard className="p-12 max-w-md mx-auto">
                <PlusIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {'no Cards'}
                </h3>
                <p className="text-gray-300 mb-8">
                  {'create First'}
                </p>
                <Link to="/create-card">
                  <GlassButton className="flex items-center mx-auto">
                    <PlusIcon className="h-5 w-5 ml-2" />
                    {'create First'}
                  </GlassButton>
                </Link>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {cards.map((card, index) => (
                <motion.div
                  key={card._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <GlassCard className="p-6 hover:scale-105 transition-all duration-300">
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                          {card.category}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleShareCard(card)}
                            className="text-gray-400 hover:text-blue-300 transition-colors"
                          >
                            <ShareIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-blue-300 text-sm mb-3">
                        {card.subtitle}
                      </p>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {card.description}
                      </p>
                      
                      <div className="flex justify-between items-center text-sm text-gray-400 mb-6">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <EyeIcon className="h-4 w-4 ml-1" />
                            {card.views}
                          </span>
                          <span className="flex items-center">
                            <HeartIcon className="h-4 w-4 ml-1" />
                            {card.likes}
                          </span>
                        </div>
                        <span>{new Date(card.createdAt).toLocaleDateString('he-IL')}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEditCard(card._id)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        title={'edit Card'}
                        disabled={card.isDemo}
                      >
                        <PencilIcon className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                        title={'share Card'}
                      >
                        <ShareIcon className="w-4 h-4" />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openDeleteModal(card)}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        title={'delete Card'}
                        disabled={card.isDemo}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 rounded-2xl p-6 max-w-md w-full border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <ExclamationTriangleIcon className="w-8 h-8 text-red-500 ml-3" />
                <h3 className="text-xl font-bold text-white">{'delete Confirm'}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">
                {t('myCards.deleteMessage', { cardName: deleteModal.cardName })}
                <br />
                <span className="text-red-400 text-sm">{'delete Warning'}</span>
              </p>
              
              <div className="flex space-x-3 space-x-reverse">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDeleteCard(deleteModal.cardId)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {'Delete'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeDeleteModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  {'Cancel'}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyCardsPage;

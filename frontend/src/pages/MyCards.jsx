import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { cards as cardsAPI } from '../api/cards';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  PlusIcon,
  TrashIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const MyCards = () => {
  const { user } = useAuth();
  // const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stats, setStats] = useState({
    totalCards: 0,
    totalViews: 0,
    totalLikes: 0,
    thisMonth: 0
  });

  // Load user cards
  useEffect(() => {
    if (user) {
      loadMyCards();
    }
  }, [user]);

  const loadMyCards = async () => {
    try {
      setLoading(true);
      const response = await cardsAPI.getMy();
      setCards(response.cards || []);
      
      // Calculate stats
      const totalViews = response.cards?.reduce((sum, card) => sum + (card.views || 0), 0) || 0;
      const totalLikes = response.cards?.reduce((sum, card) => sum + (card.likesCount || 0), 0) || 0;
      const thisMonth = response.cards?.filter(card => {
        const cardDate = new Date(card.createdAt);
        const now = new Date();
        return cardDate.getMonth() === now.getMonth() && cardDate.getFullYear() === now.getFullYear();
      }).length || 0;
      
      setStats({
        totalCards: response.cards?.length || 0,
        totalViews,
        totalLikes,
        thisMonth
      });
    } catch (error) {
      toast.error('Erreur lors du chargement de vos cartes');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async () => {
    if (!selectedCard) return;

    try {
      await cardsAPI.delete(selectedCard._id);
      setCards(prev => prev.filter(card => card._id !== selectedCard._id));
      setShowDeleteModal(false);
      setSelectedCard(null);
      toast.success('Carte supprimée avec succès');
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalCards: prev.totalCards - 1,
        totalViews: prev.totalViews - (selectedCard.views || 0),
        totalLikes: prev.totalLikes - (selectedCard.likesCount || 0)
      }));
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const openDeleteModal = (card) => {
    setSelectedCard(card);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedCard(null);
    setShowDeleteModal(false);
  };

  const handleShare = async (card) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: card.title,
          text: card.description,
          url: `${window.location.origin}/cards/${card._id}`
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      const url = `${window.location.origin}/cards/${card._id}`;
      await navigator.clipboard.writeText(url);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner preset="page" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Mes Cartes de Visite
          </h1>
          <p className="text-white/70 text-lg">
            Gérez et suivez vos cartes de visite numériques
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Total Cartes</p>
                <p className="text-2xl font-bold text-white">{stats.totalCards}</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Vues Totales</p>
                <p className="text-2xl font-bold text-white">{stats.totalViews}</p>
              </div>
              <EyeIcon className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Likes Totaux</p>
                <p className="text-2xl font-bold text-white">{stats.totalLikes}</p>
              </div>
              <HeartIcon className="w-8 h-8 text-red-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Ce Mois</p>
                <p className="text-2xl font-bold text-white">{stats.thisMonth}</p>
              </div>
              <PlusIcon className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </motion.div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-white">
              {cards.length} carte{cards.length > 1 ? 's' : ''}
            </h2>
          </div>
          
          <Link
            to="/create-card"
            className="inline-flex items-center gap-2 bg-blue-500/30 hover:bg-blue-500/40 border border-blue-500/50 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105"
          >
            <PlusIcon className="w-5 h-5" />
            Créer une Carte
          </Link>
        </motion.div>

        {/* Cards Grid */}
        {cards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 max-w-md mx-auto">
              <PlusIcon className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Aucune carte créée
              </h3>
              <p className="text-white/60 mb-6">
                Commencez par créer votre première carte de visite numérique
              </p>
              <Link
                to="/create-card"
                className="inline-flex items-center gap-2 bg-blue-500/30 hover:bg-blue-500/40 border border-blue-500/50 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105"
              >
                <PlusIcon className="w-5 h-5" />
                Créer ma première carte
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group"
              >
                {/* Card Image */}
                <div className="relative h-48 overflow-hidden">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/60">
                        {card.title?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      card.isActive 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {card.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 truncate">
                    {card.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">
                    {card.subtitle || card.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/60">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{card.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIcon className="w-4 h-4" />
                      <span>{card.likesCount || 0}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/cards/${card._id}`}
                      className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg px-3 py-2 text-center text-blue-400 text-sm font-medium transition-colors"
                    >
                      Voir
                    </Link>
                    <Link
                      to={`/edit-card/${card._id}`}
                      className="flex-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg px-3 py-2 text-center text-green-400 text-sm font-medium transition-colors"
                    >
                      Modifier
                    </Link>
                    <button
                      onClick={() => handleShare(card)}
                      className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg p-2 text-purple-400 transition-colors"
                    >
                      <ShareIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(card)}
                      className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg p-2 text-red-400 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Delete Modal */}
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={closeDeleteModal}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold text-white mb-4">
                  Supprimer la carte
                </h3>
                <p className="text-white/70 mb-6">
                  Êtes-vous sûr de vouloir supprimer la carte "{selectedCard?.title}" ? Cette action est irréversible.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closeDeleteModal}
                    className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/30 rounded-lg px-4 py-2 text-gray-300 font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteCard}
                    disabled={loading}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg px-4 py-2 text-red-400 font-medium transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Suppression...' : 'Supprimer'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyCards;

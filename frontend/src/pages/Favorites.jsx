import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { favorites as favoritesAPI } from '../api/favorites';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  HeartIcon,
  EyeIcon,
  ShareIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [removingFavorite, setRemovingFavorite] = useState(null);

  // Load favorites
  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await favoritesAPI.getAll();
      setFavorites(response.favorites || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des favoris');
    } finally {
      setLoading(false);
    }
  };

  // Remove from favorites
  const handleRemoveFavorite = async (cardId) => {
    try {
      setRemovingFavorite(cardId);
      await favoritesAPI.remove(cardId);
      setFavorites(prev => prev.filter(fav => fav.card._id !== cardId));
      toast.success('Retiré des favoris');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    } finally {
      setRemovingFavorite(null);
    }
  };

  // Share card
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
      const url = `${window.location.origin}/cards/${card._id}`;
      await navigator.clipboard.writeText(url);
      toast.success('Lien copié dans le presse-papiers');
    }
  };

  // Filter and sort favorites
  const filteredFavorites = favorites
    .filter(fav => {
      const card = fav.card;
      const matchesSearch = !searchTerm || 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'alphabetical':
          return a.card.title.localeCompare(b.card.title);
        case 'category':
          return a.card.category.localeCompare(b.card.category);
        case 'recent':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // Get unique categories
  const categories = [...new Set(favorites.map(fav => fav.card.category))].filter(Boolean);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Login Required
          </h2>
          <p className="text-white/70 mb-6">
            You must be logged in to view your favorites.
          </p>
          <Link to="/login" className="inline-block bg-blue-500/30 hover:bg-blue-500/40 border border-blue-500/50 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

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
            Mes Favoris
          </h1>
          <p className="text-white/70 text-lg">
            Retrouvez toutes vos cartes de visite préférées
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Rechercher dans vos favoris..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            >
              <option value="all">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            >
              <option value="recent">Plus récents</option>
              <option value="alphabetical">Alphabétique</option>
              <option value="category">Par catégorie</option>
            </select>
          </div>
          
          {/* Results count */}
          <div className="mt-4 text-white/60 text-sm">
            {filteredFavorites.length} favori{filteredFavorites.length > 1 ? 's' : ''} trouvé{filteredFavorites.length > 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Favorites Grid */}
        {filteredFavorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 max-w-md mx-auto">
              <HeartIcon className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {searchTerm || selectedCategory !== 'all' ? 'Aucun résultat' : 'Aucun favori'}
              </h3>
              <p className="text-white/60 mb-6">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'Essayez de modifier vos critères de recherche'
                  : 'Commencez par ajouter des cartes à vos favoris'
                }
              </p>
              {!searchTerm && selectedCategory === 'all' && (
                <Link
                  to="/cards"
                  className="inline-flex items-center gap-2 bg-blue-500/30 hover:bg-blue-500/40 border border-blue-500/50 rounded-xl px-6 py-3 text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  <StarIcon className="w-5 h-5" />
                  Découvrir des cartes
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredFavorites.map((favorite, index) => {
              const card = favorite.card;
              return (
                <motion.div
                  key={favorite._id}
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
                      <div className="w-full h-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white/60">
                          {card.title?.charAt(0) || '?'}
                        </span>
                      </div>
                    )}
                    
                    {/* Favorite Badge */}
                    <div className="absolute top-3 left-3">
                      <div className="bg-red-500/20 border border-red-500/30 rounded-full p-2">
                        <HeartSolidIcon className="w-4 h-4 text-red-400" />
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-xs font-medium text-white">
                        {card.category}
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
                    
                    {/* Added date */}
                    <p className="text-xs text-white/40 mb-4">
                      Ajouté le {new Date(favorite.createdAt).toLocaleDateString('fr-FR')}
                    </p>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/cards/${card._id}`}
                        className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg px-3 py-2 text-center text-blue-400 text-sm font-medium transition-colors"
                      >
                        Voir
                      </Link>
                      <button
                        onClick={() => handleShare(card)}
                        className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg p-2 text-purple-400 transition-colors"
                      >
                        <ShareIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveFavorite(card._id)}
                        disabled={removingFavorite === card._id}
                        className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg p-2 text-red-400 transition-colors disabled:opacity-50"
                      >
                        {removingFavorite === card._id ? (
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                          <TrashIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Favorites;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  EyeIcon,
  Squares2X2Icon,
  ListBulletIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { favoriteService } from '../api/favoriteService';
import toast from 'react-hot-toast';

const FavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'technology', label: 'Technologie' },
    { value: 'business', label: 'Business' },
    { value: 'creative', label: 'Créatif' },
    { value: 'healthcare', label: 'Santé' },
    { value: 'education', label: 'Éducation' },
    { value: 'other', label: 'Autre' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Plus récents' },
    { value: 'oldest', label: 'Plus anciens' },
    { value: 'alphabetical', label: 'Alphabétique' },
    { value: 'category', label: 'Par catégorie' }
  ];

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const response = await favoriteService.getFavorites();
      setFavorites(response.data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast.error('Erreur lors du chargement des favoris');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (cardId) => {
    try {
      await favoriteService.removeFavorite(cardId);
      setFavorites(favorites.filter(fav => fav.card._id !== cardId));
      toast.success('Retiré des favoris');
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleClearAllFavorites = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) return;
    
    try {
      await favoriteService.clearAllFavorites();
      setFavorites([]);
      toast.success('Tous les favoris ont été supprimés');
    } catch (error) {
      console.error('Error clearing favorites:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  // Filter and sort favorites
  const filteredAndSortedFavorites = favorites
    .filter(favorite => {
      const card = favorite.card;
      const matchesSearch = card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           card.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return a.card.title.localeCompare(b.card.title);
        case 'category':
          return a.card.category.localeCompare(b.card.category);
        default:
          return 0;
      }
    });

  const FavoriteCard = ({ favorite }) => {
    const card = favorite.card;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -5 }}
        className="card-glass hover-lift group cursor-pointer relative"
      >
        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveFavorite(card._id);
          }}
          className="absolute top-3 right-3 z-10 p-2 bg-red-500/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/30"
        >
          <TrashIcon className="w-4 h-4 text-white" />
        </button>

        {/* Favorite Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div className="p-2 bg-red-500/30 backdrop-blur-sm rounded-full">
            <HeartSolidIcon className="w-4 h-4 text-red-500" />
          </div>
        </div>

        {/* Card Image */}
        <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
          <img
            src={card.image?.url || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={card.image?.alt || card.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-xs text-white font-medium">
              {categories.find(cat => cat.value === card.category)?.label || 'Autre'}
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
              {card.title}
            </h3>
            <p className="text-blue-300 text-sm font-medium">
              {card.subtitle}
            </p>
          </div>

          <p className="text-white/70 text-sm line-clamp-2">
            {card.description}
          </p>

          {/* Contact Info */}
          <div className="space-y-2">
            {card.email && (
              <p className="text-white/60 text-sm flex items-center gap-2">
                <span>📧</span> {card.email}
              </p>
            )}
            {card.phone && (
              <p className="text-white/60 text-sm flex items-center gap-2">
                <span>📱</span> {card.phone}
              </p>
            )}
          </div>

          {/* Stats and Date */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <HeartIcon className="w-4 h-4" />
                {card.likes || 0}
              </span>
              <span className="flex items-center gap-1">
                <EyeIcon className="w-4 h-4" />
                {card.views || 0}
              </span>
            </div>
            <span className="text-xs text-white/40">
              Ajouté le {new Date(favorite.createdAt).toLocaleDateString('fr-FR')}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  const ListView = ({ favorites }) => (
    <div className="space-y-4">
      {favorites.map(favorite => {
        const card = favorite.card;
        return (
          <motion.div
            key={favorite._id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card-glass p-6 hover-lift group cursor-pointer"
          >
            <div className="flex gap-6">
              {/* Image */}
              <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img
                  src={card.image?.url || 'https://via.placeholder.com/200x150?text=No+Image'}
                  alt={card.image?.alt || card.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <HeartSolidIcon className="w-4 h-4 text-red-500" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{card.title}</h3>
                    <p className="text-blue-300 text-sm">{card.subtitle}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(card._id);
                    }}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-5 h-5 text-red-400" />
                  </button>
                </div>

                <p className="text-white/70 text-sm line-clamp-2">{card.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span>{card.email}</span>
                    <span>{card.phone}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/60">
                    <span className="flex items-center gap-1">
                      <HeartIcon className="w-4 h-4" />
                      {card.likes || 0}
                    </span>
                    <span>Ajouté le {new Date(favorite.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card p-12 text-center max-w-md">
          <HeartIcon className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">
            Login Required
          </h2>
          <p className="text-white/60 mb-6">
            You must be logged in to view your favorites.
          </p>
          <button className="btn-glass btn-primary">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4 flex items-center justify-center gap-3">
              <HeartSolidIcon className="w-10 h-10 text-red-500" />
              Mes Favoris
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Retrouvez toutes les cartes de visite que vous avez sauvegardées
            </p>
          </motion.div>

          {/* Controls */}
          <div className="glass-card p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Rechercher dans mes favoris..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>

              {/* Filters and Controls */}
              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input min-w-[180px]"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-input min-w-[150px]"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* View Mode Toggle */}
                <div className="flex bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-blue-500/30 text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <Squares2X2Icon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-blue-500/30 text-white' 
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <ListBulletIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Clear All Button */}
                {favorites.length > 0 && (
                  <button
                    onClick={handleClearAllFavorites}
                    className="btn-glass btn-danger flex items-center gap-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Tout supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-white/60">
            {filteredAndSortedFavorites.length} favori{filteredAndSortedFavorites.length !== 1 ? 's' : ''}
            {searchTerm && ` trouvé${filteredAndSortedFavorites.length !== 1 ? 's' : ''}`}
          </p>
          {favorites.length > 0 && (
            <p className="text-white/40 text-sm">
              Total: {favorites.length} favori{favorites.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Favorites Grid/List */}
        <AnimatePresence mode="wait">
          {filteredAndSortedFavorites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="glass-card p-12">
                <div className="w-24 h-24 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
                  <HeartIcon className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchTerm || selectedCategory !== 'all' 
                    ? 'Aucun favori trouvé' 
                    : 'Aucun favori pour le moment'
                  }
                </h3>
                <p className="text-white/60 mb-6">
                  {searchTerm || selectedCategory !== 'all'
                    ? 'Essayez de modifier vos critères de recherche.'
                    : 'Commencez à explorer les cartes et ajoutez vos préférées à vos favoris.'
                  }
                </p>
                <button className="btn-glass btn-primary">
                  Explorer les cartes
                </button>
              </div>
            </motion.div>
          ) : viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {filteredAndSortedFavorites.map(favorite => (
                  <FavoriteCard key={favorite._id} favorite={favorite} />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ListView favorites={filteredAndSortedFavorites} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FavoritesPage;

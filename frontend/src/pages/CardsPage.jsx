import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useRoleTheme } from '../context/ThemeProvider';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { PlusIcon, FunnelIcon, MagnifyingGlassIcon, HeartIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import LikeButton from '../components/ui/LikeButton';
import apiService from '../services/api';
import toast from 'react-hot-toast';

const CardsPage = () => {
  const { isDark } = useRoleTheme();
  const { user } = useAuth();
  
  // Set document title
  const { favorites, toggleFavorite, loading: favLoading } = useFavorites();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      setLoading(true);
      // Fetch cards from API
      const response = await apiService.getCards();
      // Handle both array response and object with cards property
      const cardsData = Array.isArray(response) ? response : (response.cards || []);
      setCards(cardsData);
    } catch (error) {
      console.error('Error loading cards:', error);
      // Error handled silently in production
    } finally {
      setLoading(false);
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'mostViewed':
        return b.views - a.views;
      case 'mostLiked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  const categories = [
    { value: 'all', label: 'all' },
    { value: 'technology', label: 'technology' },
    { value: 'design', label: 'design' },
    { value: 'marketing', label: 'marketing' },
    { value: 'business', label: 'business' },
    { value: 'finance', label: 'finance' },
    { value: 'medical', label: 'medical' },
    { value: 'education', label: 'education' },
    { value: 'legal', label: 'legal' }
  ];

  const handleFavoriteToggle = async (cardId) => {
    await toggleFavorite(cardId);
  };

  const isFavorite = (cardId) => {
    return favorites.some(fav => fav._id === cardId || fav.cardId === cardId);
  };

  const handleDeleteCard = async (cardId) => {
    if (!user || user.role !== 'admin') return;
    if (!window.confirm('Delete this card?')) return;
    try {
      await apiService.deleteCard(cardId);
      setCards(prev => prev.filter(c => c._id !== cardId));
      toast.success('Card deleted');
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  return (
    <>
      <Helmet>
        <title>Business Cards - FuturistCards</title>
        <meta name="description" content="Discover amazing digital business cards" />
      </Helmet>
      
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-6 text-white">
            Discover Cards
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Explore our collection of professional digital business cards
          </p>
          
          {/* Create New Card Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/cards/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <PlusIcon className="w-5 h-5 ml-2" />
              Create New Card
            </Link>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          {/* Search Bar and Filter Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-3 rounded-xl border bg-black/20 border-white/20 text-white placeholder-gray-400 focus:bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
                data-testid="cards-search"
              />
            </div>

            {/* Filter Toggle & Stats */}
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-400">
{filteredCards.length} cards found
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border bg-black/20 border-white/20 text-white hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <FunnelIcon className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Expandable Filters */}
          <motion.div
            initial={false}
            animate={{
              height: showFilters ? 'auto' : 0,
              opacity: showFilters ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-xl border bg-black/30 border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-black/20 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border bg-black/20 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="mostViewed">Most Viewed</option>
                    <option value="mostLiked">Most Liked</option>
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {(searchTerm || selectedCategory !== 'all' || sortBy !== 'newest') && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSortBy('newest');
                    }}
                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 xl:gap-10" 
            data-testid="cards-grid"
          >
            {filteredCards.map((card, index) => (
              <motion.div
                key={card._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="relative group bg-black/20 border-white/20 rounded-2xl border backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                data-testid={`card-${card._id}`}
              >
                {/* Card Image/Avatar */}
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {card.image ? (
                      <img 
                        src={card.image} 
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-4xl font-bold text-white">
                          {card.title?.charAt(0) || 'C'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Like Button Overlay */}
                  <div className="absolute top-3 right-3">
                    <LikeButton 
                      cardId={card._id}
                      size="sm"
                      showCount={false}
                      className="backdrop-blur-sm"
                      onLikeChange={(data) => {
                        // Update local card data if needed
                        setCards(prev => prev.map(c => 
                          c._id === card._id 
                            ? { ...c, likes: data.likesCount }
                            : c
                        ));
                      }}
                    />
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-black/20 backdrop-blur-sm text-white">
                      {categories.find(cat => cat.value === card.category)?.label || card.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <Link to={`/cards/${card._id}`} className="block p-6">
                  {/* Title and Subtitle */}
                  <div className="mb-3">
                    <h3 className="font-bold text-lg mb-1 text-white line-clamp-1">
                      {card.title}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-1">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Company */}
                  {card.company && (
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs font-bold text-white">
                          {card.company.charAt(0)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-blue-400 line-clamp-1">
                        {card.company}
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  {card.description && (
                    <p className="text-sm text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                </Link>

                {/* Stats Footer */}
                <div className="px-6 pb-6 flex items-center justify-between text-sm border-t border-white/20 text-gray-400">
                  <div className="flex items-center pt-4">
                    <EyeIcon className="w-4 h-4 mr-1 text-green-500" />
                    <span className="font-medium">{card.views || 0}</span>
                    <span className="mx-1">•</span>
                    <HeartIcon className="w-4 h-4 mr-1 text-red-500" />
                    <span className="font-medium">{card.likes || 0}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-4">
                    {user?.role === 'admin' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteCard(card._id); }}
                        className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30"
                        title="Delete"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </motion.button>
                    )}
                    <Link to={`/cards/${card._id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
                      >
                        View Card
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && filteredCards.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6 text-gray-600">
              {searchTerm || selectedCategory !== 'all' ? '🔍' : '📇'}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">
{searchTerm || selectedCategory !== 'all' ? 'No Results Found' : 'No Cards Available'}
            </h3>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
{searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search terms or filters' 
                : 'Be the first to create a digital business card'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {(searchTerm || selectedCategory !== 'all') && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSortBy('newest');
                  }}
                  className="px-6 py-3 rounded-lg font-medium transition-colors bg-white/10 text-gray-300 hover:bg-white/20"
                >
                  Clear Filters
                </motion.button>
              )}
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/cards/create"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                >
                  <PlusIcon className="w-5 h-5 ml-2" />
                  Create New Card
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Loading State - Enhanced */}
        {loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col justify-center items-center py-16"
          >
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-r-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="mt-6 text-lg font-medium text-gray-300">
Loading cards...
            </p>
            <div className="flex space-x-1 mt-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </>
  );
};

export default CardsPage;

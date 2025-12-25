<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../context/FavoritesContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, EyeIcon } from '@heroicons/react/24/solid';
import Card from '../components/cards/Card';
=======
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';
import { useCardsStats } from '../contexts/CardsStatsContext';
import { useFavorites } from '../contexts/FavoritesContext';
import LikeButton from '../components/ui/LikeButton';
import api from '../api/api';
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd

const FavoritesPage = () => {
  const { user } = useAuth();
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  const { stats, getCardStats, initializeMultipleCards } = useCardsStats();
  const { favorites } = useFavorites();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, likes, alphabetical

  // Fetch cards data for favorites
  const fetchCards = useCallback(async () => {
    if (!user || favorites.length === 0) {
      setCards([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.get('/cards');
      const allCards = response.data.cards || [];
      
      // Filter cards that are in favorites
      const favoriteCards = allCards.filter(card => favorites.includes(card._id));
      setCards(favoriteCards);
      
      // Initialize stats for all favorite cards
      if (favoriteCards.length > 0) {
        initializeMultipleCards(favoriteCards.map(card => card._id));
      }
    } catch (error) {
      // Error fetching cards - using mock data
      setError(t('errorLoadingFavorites'));
      // Mock data for development
      const mockCards = [
        {
          _id: 'fav1',
          title: 'Restaurant Green Garden',
          subtitle: 'Cuisine Gastronomique',
          description: 'Une expérience culinaire exceptionnelle avec des ingrédients frais et locaux.',
          phone: '+33 1 98 76 54 32',
          email: 'contact@greengarden.fr',
          web: 'https://greengarden.fr',
          image: { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop', alt: 'Restaurant Green Garden' },
          address: { city: 'Lyon', country: 'France', street: 'Avenue du Jardin', houseNumber: '456' },
          views: 0,
          createdAt: new Date().toISOString(),
          isDemo: false
        },
        {
          _id: 'fav2',
          title: 'Tech Solutions Inc',
          subtitle: 'Développement Logiciel',
          description: 'Solutions technologiques innovantes pour entreprises.',
          phone: '+33 1 23 45 67 89',
          email: 'hello@techsolutions.fr',
          web: 'https://techsolutions.fr',
          image: { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop', alt: 'Tech Solutions Pro' },
          address: { city: 'Paris', country: 'France', street: 'Rue de la Tech', houseNumber: '123' },
          createdAt: '2024-01-10T14:20:00Z',
          category: 'technology'
        }
      ];
      // Only show mock cards that are actually in favorites
      const filteredMockCards = mockCards.filter(card => favorites.includes(card._id));
      setCards(filteredMockCards);
      if (filteredMockCards.length > 0) {
        initializeMultipleCards(filteredMockCards.map(card => card._id));
      }
    } finally {
      setLoading(false);
    }
  }, [user, favorites, t, initializeMultipleCards]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  useEffect(() => {
    // Favorites are handled by LikeButton component
    // The cards will be automatically filtered out when favoriteIds changes
  });


  // Filter and sort favorites
  const filteredCards = cards.filter(card => {
    if (!searchTerm) return true;
    const searchLower = searchTerm.toLowerCase();
    return (
      card.title.toLowerCase().includes(searchLower) ||
      card.subtitle.toLowerCase().includes(searchLower) ||
      card.description.toLowerCase().includes(searchLower)
    );
  }).sort((a, b) => {
    switch (sortBy) {
      case 'likes': {
        const aLikes = stats[a._id]?.likes || 0;
        const bLikes = stats[b._id]?.likes || 0;
        return bLikes - aLikes;
      }
      case 'views': {
        const aViews = stats[a._id]?.views || 0;
        const bViews = stats[b._id]?.views || 0;
        return bViews - aViews;
      }
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const clearAllFavorites = async () => {
    if (window.confirm(t('confirmClearAllFavorites'))) {
      try {
        await api.delete('/favorites/clear-all');
        setCards([]);
      } catch (error) {
        // Clear locally for demo
        setCards([]);
      }
    }
  };

  if (!user) {
    return (
<<<<<<< HEAD
      <>
        <Helmet>
          <title>Connexion requise - FuturistCards</title>
        </Helmet>
        <motion.div 
          className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-center max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1 }}
            >
              <HeartSolidIcon className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Connexion requise
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Vous devez être connecté pour voir vos favoris.
            </p>
            <motion.div className="space-y-4">
              <Link 
                to="/login"
                className="block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200"
              >
                Se connecter
              </Link>
              <Link 
                to="/register"
                className="block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-8 py-3 rounded-xl font-medium transition-all duration-200"
              >
                S&apos;inscrire
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </>
=======
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'} ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className={`${isDark ? 'glass-effect' : 'bg-white/80 backdrop-blur-lg'} rounded-2xl p-8 shadow-3d border ${isDark ? 'border-white/20' : 'border-gray-200/50'} w-full max-w-md animate-fade-in text-center`}>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('accessRestricted')}</h2>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('loginToViewFavorites')}</p>
          <div className="mt-6">
            <Link to="/login" className="btn-primary">
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'dark-gradient' : 'glass-gradient'} flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-white' : 'text-gray-700'}`}>{t('loadingFavorites')}</p>
        </div>
      </div>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
    );
  }

  return (
<<<<<<< HEAD
    <>
      <Helmet>
        <title>Mes Favoris - FuturistCards</title>
        <meta name="description" content="Gérez vos cartes de visite favorites sur FuturistCards." />
      </Helmet>

      <motion.div 
        className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl mb-6">
              <HeartSolidIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Mes Favoris
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Retrouvez et gérez toutes vos cartes de visite préférées en un seul endroit.
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.div 
            className="mb-8"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/cards')}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Retour aux cartes
            </motion.button>
          </motion.div>

          {loading ? (
            <motion.div 
              className="flex justify-center items-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Chargement de vos favoris...</span>
            </motion.div>
          ) : favorites.length === 0 ? (
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl border border-gray-200 dark:border-gray-700 text-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💖
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Aucun favori
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Commencez à explorer les cartes et ajoutez vos préférées à vos favoris.
              </p>
              <motion.div className="space-y-4">
                <Link 
                  to="/cards"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <EyeIcon className="w-5 h-5 inline mr-2" />
                  Explorer les cartes
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-blue-600 dark:text-blue-400">{favorites.length}</span> {favorites.length === 1 ? 'favoriteCard' : 'favoriteCards'}
                </p>
=======
    <div className={`min-h-screen py-12 px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'} ${isRTL ? 'rtl' : 'ltr'}`} data-testid="favorites-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('myFavorites')}</h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{t('favoriteCardsDesc')}</p>
          
          {/* Statistics */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className={`px-4 py-2 ${isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'} rounded-full text-sm font-semibold`}>
              {filteredCards.length} {t('favoriteCardsCount')}
            </span>
            {cards.length > 0 && (
              <button
                onClick={clearAllFavorites}
                className={`px-4 py-2 ${isDark ? 'bg-red-800/30 text-red-400 hover:bg-red-700/40' : 'bg-red-200 text-red-700 hover:bg-red-300'} rounded-full text-sm font-semibold transition-all duration-200`}
                title={t('clearAllFavorites')}
              >
                {t('clearAll')}
              </button>
            )}
          </div>
        </div>

        {/* Search and Filter Controls */}
        {cards.length > 0 && (
          <div className={`${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-6 border mb-8`}>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('searchFavorites')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full px-4 py-3 pl-10 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                  />
                  <svg className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
              </div>
              
              {/* Sort */}
              <div className="md:w-48">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full px-4 py-3 ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                >
                  <option value="recent">{t('sortByRecent')}</option>
                  <option value="likes">{t('sortByLikes')}</option>
                  <option value="alphabetical">{t('sortByAlphabetical')}</option>
                </select>
              </div>
            </div>
            
            {/* Results count */}
            {searchTerm && (
              <div className="mt-4 text-center">
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {filteredCards.length} {t('resultsFound')} &ldquo;{searchTerm}&rdquo;
                </span>
              </div>
            )}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className={`${isDark ? 'bg-red-900/20 border-red-700/30 text-red-300' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded mb-6 text-center`}>
            {error}
          </div>
        )}

        {/* Favorites Grid */}
        {filteredCards.length === 0 && cards.length > 0 ? (
          <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-12 shadow-3d border animate-fade-in text-center`}>
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 warning-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('noSearchResults')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                {t('noSearchResultsDesc')} &ldquo;{searchTerm}&rdquo;
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn-primary"
              >
                {t('clearSearch')}
              </button>
            </div>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-12 shadow-3d border animate-fade-in text-center`}>
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 danger-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('noFavoriteCards')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                {t('noFavoritesDescription')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/cards"
                  className="btn-primary"
                >
                  {t('exploreCards')}
                </Link>
                <Link 
                  to="/"
                  className={`px-6 py-3 ${isDark ? 'glass-effect border-white/20 text-white hover:bg-white/10' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'} rounded-lg font-semibold border transition-all duration-300 hover:shadow-md`}
                >
                  {t('backToHome')}
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map(card => (
              <div
                key={card._id}
                className={`${isDark ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white/80 border-gray-200 hover:bg-white'} backdrop-blur-md rounded-xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
                data-testid={`favorite-card-${card._id}`}
              >
                {/* Card Image */}
                {card.image?.url && (
                  <div className="mb-4 relative overflow-hidden rounded-lg">
                    <img
                      src={card.image.url}
                      alt={card.image.alt || card.title}
                      className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}

                {/* Card Content */}
                <div className="mb-4">
                  <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {card.titleKey ? t(`sampleCardTitles.${card.titleKey}`) : card.title}
                  </h3>
                  <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {card.subtitleKey ? t(`sampleCardSubtitles.${card.subtitleKey}`) : card.subtitle}
                  </p>
                  <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {card.descriptionKey ? t(`sampleCardDescriptions.${card.descriptionKey}`) : card.description}
                  </p>
                </div>

                {/* Card Stats */}
                <div className={`flex justify-center items-center space-x-4 mb-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <LikeButton 
                    cardId={card._id}
                    size="sm"
                    className="ml-2"
                  />
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {getCardStats(card._id).views || 0} {t('views')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center space-x-2">
                  <Link
                    to={`/cards/${card._id}`}
                    className="btn-primary flex-1 text-sm text-center"
                    data-testid={`view-favorite-${card._id}`}
                  >
                    {t('viewCard')}
                  </Link>
                  <LikeButton 
                    cardId={card._id}
                    size="sm"
                    className="ml-2"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12">
          <div className={`${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 border transition-all duration-300 hover:shadow-lg`}>
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-6 text-center`}>{t('howToAddFavorites')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('step1Title')}</h4>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('browseCards')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 danger-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('step2Title')}</h4>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('clickHeart')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 success-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('step3Title')}</h4>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('findThemHere')}</p>
              </div>
            </div>
            
            {/* Quick actions */}
            {filteredCards.length === 0 ? (
              <div className="mt-8 text-center">
                <Link 
                  to="/cards"
                  className="btn-danger inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  {t('startAddingFavorites')}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;

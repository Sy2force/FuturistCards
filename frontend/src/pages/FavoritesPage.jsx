import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useRoleTheme } from '../context/ThemeProvider';
import { useTranslation } from "../hooks/useTranslation";
import { useFavorites } from '../context/FavoritesContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, EyeIcon } from '@heroicons/react/24/solid';
import LikeButton from '../components/ui/LikeButton';

const FavoritesPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { isDark } = useRoleTheme();
  const { favorites } = useFavorites();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const navigate = useNavigate();

  // Mock function for card stats
  const getCardStats = () => ({
    likes: Math.floor(Math.random() * 50),
    views: Math.floor(Math.random() * 200)
  });

  // Fetch cards data for favorites
  const fetchCards = useCallback(async () => {
    if (!user || favorites.length === 0) {
      setCards([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Mock data for favorites
      const mockCards = [
        {
          _id: '1',
          title: t('mockData.favorites.card1.title'),
          description: t('mockData.favorites.card1.description'),
          image: { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', alt: t('mockData.favorites.card1.imageAlt') },
          likes: 45,
          views: 234,
          category: t('categories.technology')
        },
        {
          _id: '2', 
          title: t('mockData.favorites.card2.title'),
          description: t('mockData.favorites.card2.description'),
          image: { url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop', alt: t('mockData.favorites.card2.imageAlt') },
          likes: 32,
          views: 156,
          category: t('categories.creative')
        }
      ];
      
      setCards(mockCards);
    } catch (error) {
      // Error fetching favorites - handled by UI
      setError(t('favorites.loadError'));
    } finally {
      setLoading(false);
    }
  }, [user, favorites]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  // Filter and sort cards
  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCards = [...filteredCards].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return (b.likes || 0) - (a.likes || 0);
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'recent':
      default:
        return 0;
    }
  });

  const handleBackClick = () => {
    navigate('/cards');
  };

  // Show login prompt if user not authenticated
  if (!user) {
    return (
      <>
        <Helmet>
          <title>{t('auth.loginRequired')} - {t('common.siteName')}</title>
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
              {t('unauthorized.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t('unauthorized.description')}
            </p>
            <motion.div className="space-y-4">
              <Link 
                to="/login"
                className="block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200"
              >
                {t('unauthorized.login')}
              </Link>
              <Link 
                to="/register"
                className="block bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 px-8 py-3 rounded-xl font-medium transition-all duration-200"
              >
                {t('navbar.register')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('favorites.title')} - {t('common.siteName')}</title>
        <meta name="description" content={t('favorites.metaDescription')} />
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
              onClick={handleBackClick}
              className={`flex items-center px-4 py-2 rounded-lg ${isDark ? 'glass-effect border-white/20 text-white hover:bg-white/10' : 'bg-white/80 backdrop-blur-lg border-gray-200/50 text-gray-700 hover:bg-white'} border transition-all duration-300 hover:shadow-lg`}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
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
              <span className="ml-3 text-gray-600 dark:text-gray-400">{t('favorites.loading')}</span>
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
                {t('favorites.noFavorites')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {t('favorites.noFavoritesDescription')}
              </p>
              <motion.div className="space-y-4">
                <Link 
                  to="/cards"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <EyeIcon className="w-5 h-5 inline mr-2" />
                  {t('favorites.exploreCards')}
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-blue-600 dark:text-blue-400">{favorites.length}</span> {favorites.length === 1 ? 'carte favorite' : 'cartes favorites'}
                  </p>
                </div>
                
                {/* Sort */}
                <div className="md:w-48 mb-6">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="recent">{t('favorites.sortRecent')}</option>
                    <option value="likes">{t('favorites.sortPopular')}</option>
                    <option value="alphabetical">{t('favorites.sortAlphabetical')}</option>
                  </select>
                </div>
                
                {/* Results count */}
                {searchTerm && (
                  <div className="mt-4 text-center">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {filteredCards.length} résultats trouvés pour &ldquo;{searchTerm}&rdquo;
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Error message */}
              {error && (
                <div className={`${isDark ? 'bg-red-900/20 border-red-700/30 text-red-300' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded mb-6 text-center`}>
                  {error}
                </div>
              )}

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedCards.map(card => (
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
                        {card.title}
                      </h3>
                      <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {card.description}
                      </p>
                    </div>

                    {/* Card Stats */}
                    <div className={`flex justify-center items-center space-x-4 mb-4 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      <LikeButton 
                        cardId={card._id}
                        size="sm"
                      />
                      <span className="flex items-center">
                        <EyeIcon className="w-4 h-4 mr-1" />
                        {getCardStats(card._id).views || 0} vues
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center space-x-2">
                      <Link
                        to={`/cards/${card._id}`}
                        className="btn-primary flex-1 text-sm text-center"
                      >
                        Voir détails
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
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default FavoritesPage;

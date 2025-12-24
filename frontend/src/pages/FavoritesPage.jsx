import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLikes } from '../hooks/useLikes';
import { LikeButton } from '../components/ui/LikeButton';
import api from '../api/api';

const FavoritesPage = () => {
  const { user } = useAuth();
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  const { initializeLikesForCards } = useLikes();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent'); // recent, likes, alphabetical

  // Fetch favorites
  const fetchFavorites = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await api.get('/favorites');
      const favoritesData = response.data.favorites || [];
      setFavorites(favoritesData);
      
      // Initialize likes for all favorite cards
      if (favoritesData.length > 0) {
        initializeLikesForCards(favoritesData);
      }
    } catch (error) {
      // Error fetching favorites - using mock data
      setError(t('errorLoadingFavorites'));
      // Mock data for development
      const mockFavorites = [
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
          likes: 28,
          views: 156,
          createdAt: new Date().toISOString(),
          isDemo: false
        },
        {
          _id: 'fav2',
          title: 'Tech Solutions Inc',
          subtitle: 'Développement Logiciel',
          description: 'Solutions technologiques innovantes pour entreprises.',
          phone: '+33 1 23 45 67 89',
          email: 'contact@techsolutions.fr',
          web: 'https://techsolutions.fr',
          image: { url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop', alt: 'Tech Solutions' },
          address: { city: 'Paris', country: 'France', street: 'Rue de la Tech', houseNumber: '123' },
          likes: 15,
          views: 89,
          createdAt: new Date().toISOString(),
          isDemo: false
        },
        {
          _id: 'fav3',
          title: 'Boutique Mode Élégance',
          subtitle: 'Mode & Accessoires',
          description: 'Collections exclusives de mode féminine et masculine.',
          phone: '+33 1 55 44 33 22',
          email: 'info@elegance-mode.fr',
          web: 'https://elegance-mode.fr',
          image: { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop', alt: 'Boutique Mode' },
          address: { city: 'Cannes', country: 'France', street: 'Boulevard de la Croisette', houseNumber: '789' },
          likes: 42,
          views: 234,
          createdAt: new Date().toISOString(),
          isDemo: false
        }
      ];
      setFavorites(mockFavorites);
      initializeLikesForCards(mockFavorites);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (cardId) => {
    try {
      await api.delete(`/favorites/${cardId}`);
      setFavorites(favorites.filter(card => card._id !== cardId));
    } catch (error) {
      // Error removing favorite - remove from local state anyway for demo
      setFavorites(favorites.filter(card => card._id !== cardId));
    }
  };

  // Filter and sort favorites
  const filteredAndSortedFavorites = favorites
    .filter(card => {
      if (!searchTerm) return true;
      const searchLower = searchTerm.toLowerCase();
      return (
        card.title?.toLowerCase().includes(searchLower) ||
        card.subtitle?.toLowerCase().includes(searchLower) ||
        card.description?.toLowerCase().includes(searchLower) ||
        card.address?.city?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        case 'alphabetical':
          return (a.title || '').localeCompare(b.title || '');
        case 'recent':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  const clearAllFavorites = async () => {
    if (window.confirm(t('confirmClearAllFavorites'))) {
      try {
        await api.delete('/favorites/clear-all');
        setFavorites([]);
      } catch (error) {
        // Clear locally for demo
        setFavorites([]);
      }
    }
  };

  if (!user) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'} ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className={`${isDark ? 'glass-effect' : 'bg-white/80 backdrop-blur-lg'} rounded-2xl p-8 shadow-3d border ${isDark ? 'border-white/20' : 'border-gray-200/50'} w-full max-w-md animate-fade-in text-center`}>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('accessRestricted')}</h2>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('loginToViewFavorites')}</p>
          <div className="mt-6">
            <Link to="/login" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
              {t('login')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'} flex items-center justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-white' : 'text-gray-700'}`}>{t('loadingFavorites')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-12 px-4 ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'} ${isRTL ? 'rtl' : 'ltr'}`} data-testid="favorites-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('myFavorites')}</h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>{t('favoriteCardsDesc')}</p>
          
          {/* Statistics */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className={`px-4 py-2 ${isDark ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-800'} rounded-full text-sm font-semibold`}>
              {filteredAndSortedFavorites.length} {t('favoriteCardsCount')}
            </span>
            {favorites.length > 0 && (
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
        {favorites.length > 0 && (
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
                  {filteredAndSortedFavorites.length} {t('resultsFound')} "{searchTerm}"
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
        {filteredAndSortedFavorites.length === 0 && favorites.length > 0 ? (
          <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-12 shadow-3d border animate-fade-in text-center`}>
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('noSearchResults')}</h2>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                {t('noSearchResultsDesc')} "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                {t('clearSearch')}
              </button>
            </div>
          </div>
        ) : filteredAndSortedFavorites.length === 0 ? (
          <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-12 shadow-3d border animate-fade-in text-center`}>
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
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
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
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
            {filteredAndSortedFavorites.map((card) => (
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
                    initialLikesCount={card.likes || 0}
                  />
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {card.views || 0} {t('views')}
                  </span>
                  {card.address?.city && (
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {card.address.city}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center space-x-2">
                  <Link
                    to={`/cards/${card._id}`}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm text-center rounded-lg transition-all duration-200 hover:shadow-md"
                    data-testid={`view-favorite-${card._id}`}
                  >
                    {t('viewCard')}
                  </Link>
                  <button
                    onClick={() => handleRemoveFavorite(card._id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm rounded-lg transition-all duration-200 hover:shadow-md"
                    data-testid={`remove-favorite-${card._id}`}
                    title={t('removeFromFavorites')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
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
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('step1Title')}</h4>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('browseCards')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('step2Title')}</h4>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('clickHeart')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('step3Title')}</h4>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('findThemHere')}</p>
              </div>
            </div>
            
            {/* Quick actions */}
            {filteredAndSortedFavorites.length === 0 && (
              <div className="mt-8 text-center">
                <Link 
                  to="/cards"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  {t('startAddingFavorites')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;

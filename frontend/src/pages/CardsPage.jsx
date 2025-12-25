import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';
import { useCardsStats } from '../contexts/CardsStatsContext';
import { useDebounce } from '../hooks/useDebounce';
import LikeButton from '../components/ui/LikeButton';
import CardModal from '../components/cards/CardModal';
import CardFilters from '../components/cards/CardFilters';
import CardStats from '../components/cards/CardStats';

const CardsPage = () => {
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  // const navigate = useNavigate(); // Unused for now
  const { stats, initializeMultipleCards, incrementViews } = useCardsStats();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const response = await axios.get(`${API_URL}/cards`);
        
        if (response.data.success) {
          const fetchedCards = response.data.cards || [];
          setCards(fetchedCards);
          // Initialize likes for all cards
          initializeMultipleCards(fetchedCards.map(card => card._id));
        } else {
          throw new Error(response.data.message || t('cards.errorLoadingCards'));
        }
      } catch (err) {
        setError(err.message || t('cards.connectionError'));
        // Fallback vers les données mock avec traductions complètes
        const mockCards = [
          {
            _id: 'demo-tech-1',
            titleKey: 'technology',
            subtitleKey: 'technology',
            descriptionKey: 'technology',
            emailKey: 'technology_email',
            phoneKey: 'technology_phone',
            addressKey: 'technology',
            category: 'technology',
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo-design-2',
            titleKey: 'design',
            subtitleKey: 'design',
            descriptionKey: 'design',
            emailKey: 'design_email',
            phoneKey: 'design_phone',
            addressKey: 'design',
            category: 'design',
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo-marketing-3',
            titleKey: 'marketing',
            subtitleKey: 'marketing',
            descriptionKey: 'marketing',
            emailKey: 'marketing_email',
            phoneKey: 'marketing_phone',
            addressKey: 'marketing',
            category: 'marketing',
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo-business-4',
            titleKey: 'business',
            subtitleKey: 'business',
            descriptionKey: 'business',
            emailKey: 'business_email',
            phoneKey: 'business_phone',
            addressKey: 'business',
            category: 'business',
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo-finance-5',
            titleKey: 'finance',
            subtitleKey: 'finance',
            descriptionKey: 'finance',
            emailKey: 'finance_email',
            phoneKey: 'finance_phone',
            addressKey: 'finance',
            category: 'finance',
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo-medical-6',
            titleKey: 'medical',
            subtitleKey: 'medical',
            descriptionKey: 'medical',
            emailKey: 'medical_email',
            phoneKey: 'medical_phone',
            addressKey: 'medical',
            category: 'medical',
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo-education-7',
            titleKey: 'education',
            subtitleKey: 'education',
            descriptionKey: 'education',
            emailKey: 'education_email',
            phoneKey: 'education_phone',
            addressKey: 'education',
            category: 'education',
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString()
          },
          {
            _id: 'demo-legal-8',
            titleKey: 'legal',
            subtitleKey: 'legal',
            descriptionKey: 'legal',
            emailKey: 'legal_email',
            phoneKey: 'legal_phone',
            addressKey: 'legal',
            category: 'legal',
            likes: 0,
            views: 0,
            createdAt: new Date().toISOString()
          }
        ];
        setCards(mockCards);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [initializeMultipleCards, t]);

  // Categories for filtering
  const categories = [
    { value: 'all', label: t('cards.allCategories') },
    { value: 'technology', label: t('cardCategories.technology') },
    { value: 'design', label: t('cardCategories.design') },
    { value: 'marketing', label: t('cardCategories.marketing') },
    { value: 'business', label: t('cardCategories.business') },
    { value: 'finance', label: t('cardCategories.finance') },
    { value: 'medical', label: t('cardCategories.medical') },
    { value: 'education', label: t('cardCategories.education') },
    { value: 'legal', label: t('cardCategories.legal') }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: t('cards.newest') },
    { value: 'oldest', label: t('cards.oldest') },
    { value: 'mostLiked', label: t('cards.mostLiked') },
    { value: 'mostViewed', label: t('cards.mostViewed') }
  ];

  // Filter and sort cards
  const filteredAndSortedCards = useMemo(() => {
    let filtered = cards;

    // Filter by search term
    if (debouncedSearchTerm) {
      filtered = filtered.filter(card => {
        const title = card.titleKey ? t(`sampleCardTitles.${card.titleKey}`) : card.title || '';
        const subtitle = card.subtitleKey ? t(`sampleCardSubtitles.${card.subtitleKey}`) : card.subtitle || '';
        const description = card.descriptionKey ? t(`sampleCardDescriptions.${card.descriptionKey}`) : card.description || '';
        const email = card.emailKey ? t(`sampleCardContacts.${card.emailKey}`) : card.email || '';
        
        const searchText = `${title} ${subtitle} ${description} ${email}`.toLowerCase();
        return searchText.includes(debouncedSearchTerm.toLowerCase());
      });
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(card => card.category === selectedCategory);
    }

    // Sort cards using real-time stats
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
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
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return filtered;
  }, [cards, debouncedSearchTerm, selectedCategory, sortBy, t, stats]);

  const handleCardClick = (card) => {
    // Increment views when card is clicked
    incrementViews(card._id);
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('cards.loadingCards')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-8 px-4 ${isRTL ? 'rtl' : 'ltr'}`} data-testid="cards-page">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            {t('cards.title')}
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            {t('cards.discoverCards')}
          </p>
          
          {error && (
            <div className={`mt-4 p-3 ${isDark ? 'bg-red-900/20 border-red-700/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700'} border rounded-lg`}>
              {error}
            </div>
          )}
          
          {!error && cards.length > 0 && (
            <div className={`mt-4 p-3 ${isDark ? 'bg-yellow-900/20 border-yellow-700/30 text-yellow-300' : 'bg-yellow-50 border-yellow-200 text-yellow-700'} border rounded-lg`}>
              {t('cards.offlineMode')}
            </div>
          )}
        </div>

        {/* Filters Component */}
        <CardFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          resultsCount={filteredAndSortedCards.length}
          categories={categories}
          sortOptions={sortOptions}
        />

        {/* Cards Grid/List */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
        } data-testid="cards-grid">
          {filteredAndSortedCards.map((card) => (
            <div
              key={card._id}
              className={`${
                viewMode === 'grid' 
                  ? `${isDark ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'} rounded-2xl border shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden backdrop-blur-md cursor-pointer`
                  : `${isDark ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'} rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-md cursor-pointer flex hover:-translate-y-1`
              }`}
              data-testid="card-item"
              onClick={() => handleCardClick(card)}
            >
{viewMode === 'grid' ? (
                // Grid View
                <>
                  <div className={`h-48 ${
                    card.category === 'technology' ? 'primary-gradient' :
                    card.category === 'design' ? 'secondary-gradient' :
                    card.category === 'marketing' ? 'success-gradient' :
                    card.category === 'business' ? 'warning-gradient' :
                    card.category === 'finance' ? 'warning-gradient' :
                    card.category === 'medical' ? 'danger-gradient' :
                    card.category === 'education' ? 'secondary-gradient' :
                    card.category === 'legal' ? 'dark-gradient' :
                    'primary-gradient'
                  } flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="text-center relative z-10">
                      <div className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                        <span className="text-2xl font-bold text-white drop-shadow-md">
                          {(card.titleKey ? t(`sampleCardTitles.${card.titleKey}`) : card.title)?.charAt(0) || 'C'}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {card.titleKey ? t(`sampleCardTitles.${card.titleKey}`) : card.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {card.subtitleKey ? t(`sampleCardSubtitles.${card.subtitleKey}`) : card.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-3`}>
                      {card.descriptionKey ? t(`sampleCardDescriptions.${card.descriptionKey}`) : card.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {(card.emailKey || card.email) && (
                        <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span className="w-4 h-4 mr-2">📧</span>
                          {card.emailKey ? t(`sampleCardContacts.${card.emailKey}`) : card.email}
                        </div>
                      )}
                      {(card.phoneKey || card.phone) && (
                        <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span className="w-4 h-4 mr-2">📞</span>
                          {card.phoneKey ? t(`sampleCardContacts.${card.phoneKey}`) : card.phone}
                        </div>
                      )}
                      {(card.addressKey || card.address) && (
                        <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          <span className="w-4 h-4 mr-2">📍</span>
                          {card.addressKey ? t(`sampleCardAddresses.${card.addressKey}`) : 
                           (typeof card.address === 'string' ? card.address : `${card.address?.city}, ${card.address?.country}`)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        card.category === 'technology' ? (isDark ? 'bg-blue-900/30 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700') :
                        card.category === 'design' ? (isDark ? 'bg-purple-900/30 text-purple-300 border border-purple-700' : 'bg-purple-100 text-purple-700') :
                        card.category === 'marketing' ? (isDark ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-100 text-green-700') :
                        card.category === 'business' ? (isDark ? 'bg-orange-900/30 text-orange-300 border border-orange-700' : 'bg-orange-100 text-orange-700') :
                        card.category === 'finance' ? (isDark ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700' : 'bg-yellow-100 text-yellow-700') :
                        card.category === 'medical' ? (isDark ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-100 text-red-700') :
                        card.category === 'education' ? (isDark ? 'bg-indigo-900/30 text-indigo-300 border border-indigo-700' : 'bg-indigo-100 text-indigo-700') :
                        card.category === 'legal' ? (isDark ? 'bg-gray-700/50 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-700') :
                        (isDark ? 'bg-blue-900/30 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700')
                      }`}>
                        {card.category ? t(`cardCategories.${card.category}`) : card.category}
                      </span>
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="flex items-center">
                          <span className="mr-1">👁</span>
                          {card.views || 0}
                        </span>
                        <div onClick={(e) => e.stopPropagation()}>
                          <LikeButton 
                            cardId={card._id} 
                            size="sm" 
                            initialLikesCount={card.likes || 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // List View
                <>
                  <div className={`w-32 h-32 ${
                    card.category === 'technology' ? 'primary-gradient' :
                    card.category === 'design' ? 'secondary-gradient' :
                    card.category === 'marketing' ? 'success-gradient' :
                    card.category === 'business' ? 'warning-gradient' :
                    card.category === 'finance' ? 'warning-gradient' :
                    card.category === 'medical' ? 'danger-gradient' :
                    card.category === 'education' ? 'secondary-gradient' :
                    card.category === 'legal' ? 'dark-gradient' :
                    'primary-gradient'
                  } flex items-center justify-center flex-shrink-0`}>
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {card.title?.charAt(0) || 'C'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>
                          {card.titleKey ? t(`sampleCardTitles.${card.titleKey}`) : card.title}
                        </h3>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2`}>
                          {card.subtitleKey ? t(`sampleCardSubtitles.${card.subtitleKey}`) : card.subtitle}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ml-4 ${
                        card.category === 'technology' ? (isDark ? 'bg-blue-900/30 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700') :
                        card.category === 'design' ? (isDark ? 'bg-purple-900/30 text-purple-300 border border-purple-700' : 'bg-purple-100 text-purple-700') :
                        card.category === 'marketing' ? (isDark ? 'bg-green-900/30 text-green-300 border border-green-700' : 'bg-green-100 text-green-700') :
                        card.category === 'business' ? (isDark ? 'bg-orange-900/30 text-orange-300 border border-orange-700' : 'bg-orange-100 text-orange-700') :
                        card.category === 'finance' ? (isDark ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-700' : 'bg-yellow-100 text-yellow-700') :
                        card.category === 'medical' ? (isDark ? 'bg-red-900/30 text-red-300 border border-red-700' : 'bg-red-100 text-red-700') :
                        card.category === 'education' ? (isDark ? 'bg-indigo-900/30 text-indigo-300 border border-indigo-700' : 'bg-indigo-100 text-indigo-700') :
                        card.category === 'legal' ? (isDark ? 'bg-gray-700/50 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-700') :
                        (isDark ? 'bg-blue-900/30 text-blue-300 border border-blue-700' : 'bg-blue-100 text-blue-700')
                      }`}>
                        {card.category ? t(`cardCategories.${card.category}`) : card.category}
                      </span>
                    </div>
                    
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
                      {card.descriptionKey ? t(`sampleCardDescriptions.${card.descriptionKey}`) : card.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        {(card.emailKey || card.email) && (
                          <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span className="w-4 h-4 mr-1">📧</span>
                            {card.emailKey ? t(`sampleCardContacts.${card.emailKey}`) : card.email}
                          </div>
                        )}
                        {(card.phoneKey || card.phone) && (
                          <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            <span className="w-4 h-4 mr-1">📞</span>
                            {card.phoneKey ? t(`sampleCardContacts.${card.phoneKey}`) : card.phone}
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        <span className="flex items-center">
                          <span className="mr-1">👁</span>
                          {card.views || 0}
                        </span>
                        <div onClick={(e) => e.stopPropagation()}>
                          <LikeButton 
                            cardId={card._id} 
                            size="sm" 
                            initialLikesCount={card.likes || 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {filteredAndSortedCards.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            {searchTerm || selectedCategory !== 'all' ? (
              <>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('common.noResults')}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                  {t('common.tryDifferentSearch')}
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {t('common.clearFilters')}
                </button>
              </>
            ) : (
              <>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('cards.noCardsAvailable')}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                  {t('cards.cardsWillAppear')}
                </p>
                <a
                  href="/create-card"
                  className="btn-primary inline-flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t('cards.createFirstCard')}
                </a>
              </>
            )}
          </div>
        )}

        {/* Stats Section */}
        {filteredAndSortedCards.length > 0 && (
          <CardStats cards={filteredAndSortedCards} categories={categories} />
        )}

        {/* Card Modal */}
        <CardModal 
          card={selectedCard} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      </div>
    </div>
  );
};

export default CardsPage;

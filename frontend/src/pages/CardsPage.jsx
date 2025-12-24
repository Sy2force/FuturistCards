import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { sampleCards } from '../data/sampleCards';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLikes } from '../hooks/useLikes';
import LikeButton from '../components/ui/LikeButton';

const CardsPage = () => {
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { initializeMultipleCards } = useLikes();

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
          throw new Error(response.data.message || t('errorLoadingCards'));
        }
      } catch (err) {
        setError(err.message || t('connectionError'));
        // Fallback vers les données mock
        setCards(sampleCards);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('loadingCards')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4 ${isRTL ? 'rtl' : 'ltr'}`} data-testid="cards-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            {t('allCards')}
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            {t('discoverCards')}
          </p>
          
          {error && (
            <div className={`mt-4 p-3 ${isDark ? 'bg-red-900/20 border-red-700/30 text-red-300' : 'bg-red-50 border-red-200 text-red-700'} border rounded-lg`}>
              {error}
            </div>
          )}
          
          {!error && cards.length > 0 && cards === sampleCards && (
            <div className={`mt-4 p-3 ${isDark ? 'bg-yellow-900/20 border-yellow-700/30 text-yellow-300' : 'bg-yellow-50 border-yellow-200 text-yellow-700'} border rounded-lg`}>
              {t('offlineMode')}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card._id}
              className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
              data-testid="card-item"
              onClick={() => navigate(`/card/${card._id}`)}
            >
              <div className="h-48 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl font-bold text-white">
                      {card.title?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {t(`sampleCardTitles.${card.titleKey}`) || card.title}
                  </h3>
                  <p className="text-blue-100 text-sm">
                    {t(`sampleCardSubtitles.${card.subtitleKey}`) || card.subtitle}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
                  {t(`sampleCardDescriptions.${card.descriptionKey}`) || card.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {card.email && (
                    <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="w-4 h-4 mr-2">📧</span>
                      {t(`sampleCardContacts.${card.emailKey}`) || card.email}
                    </div>
                  )}
                  {card.phone && (
                    <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="w-4 h-4 mr-2">📞</span>
                      {t(`sampleCardContacts.${card.phoneKey}`) || card.phone}
                    </div>
                  )}
                  {card.address && (
                    <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="w-4 h-4 mr-2">📍</span>
                      {t(`sampleCardAddresses.${card.addressKey}`) || `${card.address.city}, ${card.address.country}`}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {t(`cardCategories.${card.category}`) || card.category}
                  </span>
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'} text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <span className="flex items-center">
                      <span className="mr-1">👁</span>
                      {card.views || 0} {t('views')}
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
            </div>
          ))}
        </div>

        {cards.length === 0 && !loading && (
          <div className="col-span-full text-center py-12">
            <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('noCardsAvailable')}</h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('cardsWillAppear')}</p>
            <Link 
              to="/create-card" 
              className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              data-testid="create-card-link"
            >
              {t('createFirstCard')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsPage;

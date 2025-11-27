import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { cardService } from '../services/cardService';

const SearchPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const initialQuery = searchParams.get('q') || '';

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Update URL with search query
      setSearchParams({ q: query });
      
      const response = await cardService.searchCards(query);
      setCards(response.cards || []);
    } catch (error) {
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, [setSearchParams]);

  // Search on mount if query exists
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🔍 {t('searchCards')}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('searchDescription')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar 
            onSearch={handleSearch}
            initialValue={initialQuery}
            placeholder={t('searchPlaceholder')}
          />
        </div>

        {/* Results Section */}
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {!loading && hasSearched && (
            <>
              {/* Results Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {t('searchResults')}
                  {searchParams.get('q') && (
                    <span className="text-blue-600 ml-2">
                      {t('searchFor')} "{searchParams.get('q')}"
                    </span>
                  )}
                </h2>
                <span className="text-gray-500">
                  {cards.length} {t('cardsFound', { count: cards.length })}
                </span>
              </div>

              {/* Results Grid */}
              {cards.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {cards.map((card) => (
                    <Card 
                      key={card._id} 
                      card={card}
                      showActions={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    {t('noResults')}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {t('searchTips')}
                  </p>
                  <div className="space-y-2 text-sm text-gray-400">
                    <p>💡 {t('searchAdvice')}:</p>
                    <p>• {t('useSimpleKeywords')}</p>
                    <p>• {t('tryCompanyName')}</p>
                    <p>• {t('searchBySector')}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Welcome Message */}
          {!hasSearched && !loading && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {t('readyToDiscover')}
              </h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                {t('searchInstructions')}
              </p>
              
              {/* Popular Searches */}
              <div className="max-w-lg mx-auto">
                <p className="text-sm text-gray-400 mb-3">{t('popularSearches')}:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[t('technology'), t('marketing'), t('design'), t('consultant'), t('restaurant')].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleSearch(tag)}
                      className="px-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-600 hover:text-blue-600 border border-gray-200 hover:border-blue-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

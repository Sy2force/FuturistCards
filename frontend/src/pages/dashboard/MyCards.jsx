import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from "../../hooks/useTranslation";
import apiService from '../../services/api';

const MyCardsPage = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiService.getMyCards();
      setCards(response.data.cards || []);
    } catch (error) {
      setError(t('myCards.loadError'));
      // Mock data for development
      const mockCards = [
        {
          _id: '1',
          title: t('myCards.sampleTitle'),
          subtitle: t('categories.developer'),
          description: t('myCards.sampleDescription'),
          email: user?.email || 'test@example.com'
        }
      ];
      setCards(mockCards);
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const handleDeleteCard = async (cardId) => {
    try {
      await apiService.deleteCard(cardId);
      setCards(cards.filter(card => card._id !== cardId));
      toast.success(t('cardDeletedSuccess'));
    } catch (error) {
      toast.error(t('deleteError'));
    }
  };

  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 py-8" dir="rtl" lang="he">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('myCards.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t('myCards.subtitle')}
            </p>
            
            <Link
              to="/cards/create"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {t('createCard.title')}
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {cards.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                {t('myCards.noCards')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('myCards.createFirst')}
              </p>
              <Link
                to="/cards/create"
                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                {t('createCard.title')}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
              {cards.map((card) => (
                <div
                  key={card._id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {card.subtitle}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {card.description}
                    </p>
                    <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => navigate(`/cards/edit/${card._id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        {t('common.edit')}
                      </button>
                      <button
                        onClick={() => handleDeleteCard(card._id)}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                      >
                        {t('common.delete')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
    </div>
  );
};

export default MyCardsPage;

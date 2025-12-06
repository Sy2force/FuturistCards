import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/Card';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const CardsPageSimple = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await api.getCards();
        
        if (response.success) {
          // Handle nested data structure from API
          const cardsData = response.data?.cards || response.data || [];
          setCards(cardsData);
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des cartes');
        }
      } catch (error) {
        toast.error('Erreur lors du chargement des cartes');
        setCards([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCards();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('loadingCards')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {t('allCards')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            {t('discoverCards')}
          </p>
        </div>

        {/* Statistiques */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {cards.length} {t('cardsAvailable')}
          </p>
        </div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="cards-grid">
          {cards.map(card => (
            <Card 
              key={card._id} 
              card={card} 
              showActions={false}
            />
          ))}
        </div>

        {/* Call to action pour les utilisateurs non connectés */}
        {!user && (
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                {t('joinCardPro')}
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                {t('createAccountAccess')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
                  {t('signUp')}
                </Link>
                <Link to="/login" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors">
                  {t('signIn')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsPageSimple;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';

const CardsPageSimple = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  // Données mock simples
  const mockCards = [
    {
      _id: '1',
      title: 'Sarah Cohen',
      subtitle: 'Senior Full-Stack Developer',
      description: 'React, Node.js & MongoDB specialist with 7+ years experience',
      email: 'sarah.cohen@techcorp.com',
      phone: '+972-50-123-4567',
      category: 'technology',
      image: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }
    },
    {
      _id: '2', 
      title: 'David Levy',
      subtitle: 'Creative Director',
      description: 'Brand identity & digital design expert',
      email: 'david.levy@designstudio.com',
      phone: '+972-54-987-6543',
      category: 'creative',
      image: { url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }
    },
    {
      _id: '3',
      title: 'Rachel Ben-David',
      subtitle: 'Business Strategy Consultant',
      description: 'Growth strategy & market expansion specialist',
      email: 'rachel@strategyconsult.co.il', 
      phone: '+972-52-111-2233',
      category: 'business',
      image: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
    }
  ];

  useEffect(() => {
    // Simulation du chargement
    setTimeout(() => {
      setCards(mockCards);
      setLoading(false);
    }, 1000);
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
            {t('discoverCardsCollection')}
          </p>
        </div>

        {/* Statistiques */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8 shadow-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {cards.length} {t('cardsAvailable')}
          </p>
        </div>

        {/* Grille des cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => (
            <div key={card._id} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {card.title}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                  {card.subtitle}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {card.description}
                </p>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📧 {card.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📞 {card.phone}
                </p>
                <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  {card.category}
                </span>
              </div>

              <div className="flex gap-2">
                <Link 
                  to={`/cards/${card._id}`}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center transition-colors"
                >
                  {t('viewDetails')}
                </Link>
                {user && (
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    ❤️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to action pour les utilisateurs non connectés */}
        {!user && (
          <div className="mt-16 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                {t('joinFuturistCards')}
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

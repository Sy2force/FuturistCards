import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import { PencilIcon, TrashIcon, EyeIcon, HeartIcon } from '@heroicons/react/24/outline';

const MyCardsPageSimple = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Retrieve user cards from localStorage
  useEffect(() => {
    const fetchMyCards = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // Get cards from localStorage
        const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
        setCards(userCards);
      } catch (err) {
        console.error('Error retrieving cards:', err);
        setError('Unable to load your cards');
        toast.error('Error loading cards');
      } finally {
        setLoading(false);
      }
    };

    fetchMyCards();
  }, [user]);

  // Delete a card
  const handleDeleteCard = async (cardId) => {
    if (!window.confirm(t('confirmDeleteCard') || 'Are you sure you want to delete this card?')) {
      return;
    }

    try {
      // Remove from localStorage
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const updatedCards = userCards.filter(card => card._id !== cardId);
      localStorage.setItem('userCards', JSON.stringify(updatedCards));
      
      setCards(updatedCards);
      toast.success(t('cardDeletedSuccessfully') || 'Card deleted successfully');
    } catch (err) {
      console.error('Error during deletion:', err);
      toast.error(t('errorDeletingCard') || 'Error deleting card');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('loginRequired')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('mustBeLoggedInCards')}
          </p>
          <Link 
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {t('signIn')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            {t('myCards')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('manageBusinessCards')}
          </p>
        </div>

        <div className="mb-6">
          <Link 
            to="/create-card"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            + {t('createNewCard')}
          </Link>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t('loading') || 'Chargement...'}</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 shadow-lg text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
              {t('error') || 'Erreur'}
            </h2>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {t('noCardsCreated')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('startByCreatingFirstCard')}
            </p>
            <Link 
              to="/create-card"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium"
            >
              {t('createMyFirstCard')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Image de la carte */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  {card.image && card.image !== 'https://via.placeholder.com/300x200' ? (
                    <img 
                      src={card.image} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-4xl font-bold">
                        {card.title?.charAt(0) || '?'}
                      </div>
                    </div>
                  )}
                  
                  {/* Badge catégorie */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {card.category}
                    </span>
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {card.position} {card.company && `• ${card.company}`}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm mb-4 line-clamp-2">
                    {card.description}
                  </p>
                  
                  {/* Statistiques */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="h-4 w-4" />
                      <span>{card.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HeartIcon className="h-4 w-4" />
                      <span>{card.likes || 0}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/cards/${card._id}`}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors"
                    >
                      {t('view') || 'Voir'}
                    </Link>
                    <Link
                      to={`/edit-card/${card._id}`}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-colors"
                      title={t('edit') || 'Modifier'}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteCard(card._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                      title={t('delete') || 'Supprimer'}
                    >
                      <TrashIcon className="h-4 w-4" />
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

export default MyCardsPageSimple;

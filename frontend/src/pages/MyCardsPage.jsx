import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { PlusIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import Card from '../components/Card';
import api from '../services/api';

const MyCardsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Retrieve user cards from API or localStorage
  useEffect(() => {
    const fetchMyCards = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        
        // Récupérer via l'API MongoDB backend
        const response = await api.getUserCards();
        if (response.success) {
          setCards(response.data);
        } else {
          throw new Error(response.message || 'Erreur lors du chargement des cartes');
        }
      } catch (err) {
        setError(t('myCardsPage.errorLoadingCards'));
        toast.error(t('myCardsPage.errorLoadingCards'));
      } finally {
        setLoading(false);
      }
    };

    fetchMyCards();
  }, [user, t]);

  // Delete a card
  const handleDeleteCard = async (cardId) => {
    try {
      // Tenter d'abord de supprimer via l'API backend
      try {
        await api.delete(`/cards/${cardId}`);
      } catch (backendError) {
        toast.error(t('myCardsPage.errorDeleting'));
        
        setCards(cards.filter(card => (card._id || card.id) !== cardId));
        toast.success(t('myCardsPage.cardDeletedSuccessDev'));
      }
    } catch (err) {
      toast.error(t('myCardsPage.errorDeleting'));
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-center mb-2">{t('myCardsPage.title')}</h1>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t('myCardsPage.loginRequired')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('myCardsPage.loginRequiredDescription')}
          </p>
          <Link 
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {t('myCardsPage.signIn')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('myCardsPage.pageTitle')}</title>
        <meta name="description" content={t('myCardsPage.pageDescription')} />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-neutral-50 dark:bg-gray-900 py-8 px-4"
      >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-4" data-testid="my-cards-heading">
            {t('myCardsPage.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('myCardsPage.manageCardsDescription')}
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/create-card"
              className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              {t('myCardsPage.createNewCard')}
            </Link>
          </motion.div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center glass-light dark:glass-dark"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">{t('myCardsPage.loading')}</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-error-50 dark:bg-error-900/20 rounded-2xl p-8 shadow-xl text-center glass-light dark:glass-dark"
          >
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-error-800 dark:text-error-200 mb-2">
              {t('myCardsPage.loadingError')}
            </h2>
            <p className="text-error-600 dark:text-error-400">{error}</p>
          </motion.div>
        ) : cards.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center glass-light dark:glass-dark"
          >
            <ClipboardDocumentListIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t('myCardsPage.noCardsYet')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('myCardsPage.createFirstCardDescription')}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/create-card"
                className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
{t('myCardsPage.createNewCard')}
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-testid="cards-grid"
          >
            {cards.map((card, index) => (
              <motion.div
                key={card._id || card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card
                  card={card}
                  showActions={true}
                  onEdit={() => navigate(`/edit-card/${card._id}`)}
                  onDelete={() => handleDeleteCard(card._id)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      </motion.div>
    </>
  );
};

export default MyCardsPage;

<<<<<<< HEAD:frontend/src/pages/dashboard/MyCards.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { PlusIcon, ClipboardDocumentListIcon, BriefcaseIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Card from '../../components/cards/Card';
import { api } from '../../services/api';
=======
import { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';
import { useLikes } from '../hooks/useLikes';
import LikeButton from '../components/ui/LikeButton';
import api from '../api/api';
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/MyCardsPage.jsx

const MyCardsPage = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { initializeMultipleCards } = useLikes();

  const fetchMyCards = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/cards/my-cards');
      // Trier les cartes par date de création (plus récentes en premier)
      const sortedCards = (response.data.cards || []).sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCards(sortedCards);
      // Initialize likes for all cards
      initializeMultipleCards(sortedCards.map(card => card._id));
    } catch (error) {
      // Error handled - using mock data
      setError(t('errorLoadingYourCards'));
      // Mode mock pour le développement - avec dates différentes pour tester le tri
      const mockCards = [
        {
          _id: '1',
          title: 'Ma Nouvelle Carte',
          subtitle: 'Développeur Full-Stack',
          description: 'Carte créée récemment - doit apparaître en premier',
          phone: '+33 6 12 34 56 78',
          email: user?.email || 'contact@example.com',
          website: 'https://monsite.com',
          address: { city: 'Paris', country: 'France' },
          image: { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', alt: 'Avatar développeur' },
          likes: 15,
          bizNumber: '123456789',
          createdAt: new Date().toISOString() // Date actuelle
        },
        {
          _id: '2',
          title: 'Carte Design Ancienne',
          subtitle: 'Designer UI/UX',
          description: 'Carte plus ancienne - doit apparaître après',
          phone: '+33 6 98 76 54 32',
          email: user?.email || 'design@example.com',
          website: 'https://portfolio.com',
          address: { city: 'Lyon', country: 'France' },
          image: { url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face', alt: 'Avatar designer' },
          likes: 8,
          bizNumber: '987654321',
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Hier
        },
        {
          _id: '3',
          title: 'Ma Première Carte',
          subtitle: 'Entrepreneur',
          description: 'La toute première carte créée - doit apparaître en dernier',
          phone: '+33 6 11 22 33 44',
          email: user?.email || 'entrepreneur@example.com',
          website: 'https://startup.com',
          address: { city: 'Nice', country: 'France' },
          image: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', alt: 'Avatar entrepreneur' },
          likes: 3,
          bizNumber: '555666777',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // Il y a 7 jours
        }
      ];
      
      // Trier les cartes mock aussi par date (plus récentes en premier)
      const sortedMockCards = mockCards.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      );
      
      setCards(sortedMockCards);
      // Initialize likes for mock cards too
      initializeMultipleCards(sortedMockCards.map(card => card._id));
    } finally {
      setLoading(false);
    }
  }, [user?.email, t, initializeMultipleCards]);

<<<<<<< HEAD:frontend/src/pages/dashboard/MyCards.jsx
  // Quick card creation for all users
  const handleQuickCardSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs requis
    if (!quickCardData.title || !quickCardData.email) {
      toast.error('Le nom et l\'email sont requis');
=======
  useEffect(() => {
    fetchMyCards();
  }, [fetchMyCards]);

  // Protection de route
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'business' && user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  const handleDeleteCard = async (cardId) => {
    if (!window.confirm(t('confirmDelete'))) {
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/MyCardsPage.jsx
      return;
    }

    try {
      await api.delete(`/cards/${cardId}`);
      setCards(cards.filter(card => card._id !== cardId));
      setError(null); // Clear any previous errors
    } catch (error) {
      // Error handled in state
      setError(t('errorDeleting'));
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'dark-gradient' : 'glass-gradient'} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className={`${isDark ? 'text-white' : 'text-gray-700'}`}>{t('loadingYourCards')}</p>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD:frontend/src/pages/dashboard/MyCards.jsx
    <>
      <Helmet>
        <title>Mes Cartes - CardPro</title>
        <meta name="description" content="Gérez vos cartes de visite professionnelles" />
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent mb-4" data-testid="my-cards-heading">
            Mes Cartes
=======
    <div className={`min-h-screen ${isDark ? 'dark-gradient' : 'glass-gradient'} py-12`} data-testid="my-cards-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
            {t('myBusinessCards')}
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/MyCardsPage.jsx
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            {t('manageCards')}
          </p>
          
          {/* Badge de rôle */}
          <div className="flex justify-center mb-6">
            <span className={`px-4 py-2 ${isDark ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-800'} rounded-full text-sm font-semibold`}>
              {user?.role === 'admin' ? t('accountAdmin') : t('accountBusiness')}
            </span>
          </div>

          {/* Bouton créer une carte */}
          <Link
            to="/cards/create"
            className="btn-primary inline-flex items-center"
            data-testid="create-card-button"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {t('createNewCard')}
          </Link>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className={`${isDark ? 'bg-red-900/20 border-red-700/30 text-red-300' : 'bg-red-100 border-red-400 text-red-700'} border px-4 py-3 rounded mb-6`}>
            {error}
          </div>
        )}

        {/* Liste des cartes */}
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {t('noCardsCreated')}
            </h3>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              {t('noCardsYet')}
            </p>
            <Link
              to="/cards/create"
              className="btn-primary inline-flex items-center"
            >
              {t('createFirstCardAction')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card._id}
                className={`${isDark ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white/80 border-gray-200 hover:bg-white'} backdrop-blur-md rounded-xl p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                data-testid={`card-${card._id}`}
              >
                {/* Image de la carte */}
                {card.image?.url && (
                  <div className="mb-4">
                    <img
                      src={card.image.url}
                      alt={card.image.alt || card.title}
                      className="w-16 h-16 rounded-full mx-auto object-cover"
                    />
                  </div>
                )}

                {/* Informations de la carte */}
                <div className="text-center mb-4">
                  <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {card.titleKey ? t(`sampleCardTitles.${card.titleKey}`) : card.title}
                  </h3>
                  <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {card.subtitleKey ? t(`sampleCardSubtitles.${card.subtitleKey}`) : card.subtitle}
                  </p>
                  <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {card.descriptionKey ? t(`sampleCardDescriptions.${card.descriptionKey}`) : card.description}
                  </p>
                </div>
<<<<<<< HEAD:frontend/src/pages/dashboard/MyCards.jsx
              </div>
              <button
                onClick={() => setShowQuickForm(!showQuickForm)}
                className={`p-2 hover:bg-opacity-10 rounded-lg transition-colors ${
                  user?.isBusiness 
                    ? 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900' 
                    : 'text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900'
                }`}
              >
                {showQuickForm ? (
                  <XMarkIcon className="w-5 h-5" />
                ) : (
                  <PlusIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            {showQuickForm && (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handleQuickCardSubmit}
                className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                  Création Rapide de Carte
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nom complet *"
                    value={quickCardData.title}
                    onChange={(e) => handleQuickFormChange('title', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                  
                  <input
                    type="email"
                    placeholder="Email *"
                    value={quickCardData.email}
                    onChange={(e) => handleQuickFormChange('email', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                  
                  <input
                    type="text"
                    placeholder="Titre/Poste"
                    value={quickCardData.subtitle}
                    onChange={(e) => handleQuickFormChange('subtitle', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={quickCardData.phone}
                    onChange={(e) => handleQuickFormChange('phone', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  
                  <input
                    type="text"
                    placeholder="Entreprise"
                    value={quickCardData.company}
                    onChange={(e) => handleQuickFormChange('company', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  
                  <input
                    type="text"
                    placeholder="Poste spécifique"
                    value={quickCardData.position}
                    onChange={(e) => handleQuickFormChange('position', e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <div className="flex gap-3 mt-6">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors text-white ${
                      user?.isBusiness 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    <PlusIcon className="w-4 h-4 mr-2 inline" />
                    Créer la carte
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowQuickForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4 mr-2 inline" />
                    Annuler
                  </motion.button>
                </div>
              </motion.form>
            )}
          </motion.div>
          
          {/* Interface pour création avancée */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl mb-6">
            <div className="flex items-center mb-4">
              {user?.isBusiness ? (
                <BriefcaseIcon className="w-6 h-6 text-blue-500 mr-2" />
              ) : (
                <UserIcon className="w-6 h-6 text-green-500 mr-2" />
              )}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.isBusiness ? 'Espace Professionnel' : 'Espace Personnel'}
              </h2>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/create-card"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Créer une nouvelle carte
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl text-center glass-light dark:glass-dark"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Chargement...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-error-50 dark:bg-error-900/20 rounded-2xl p-8 shadow-xl text-center glass-light dark:glass-dark"
          >
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-error-800 dark:text-error-200 mb-2">
              Erreur de chargement
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
              Aucune carte pour le moment
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Créez votre première carte de visite professionnelle
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/create-card"
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Créer une nouvelle carte
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
=======

                {/* Statistiques */}
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
                  <span>
                    {t('createdOn')} {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex justify-center space-x-2">
                  <Link
                    to={`/cards/${card._id}`}
                    className="btn-primary px-4 py-2 text-sm"
                    data-testid={`view-card-${card._id}`}
                  >
                    {t('view')}
                  </Link>
                  <Link
                    to={`/cards/${card._id}/edit`}
                    className="btn-secondary px-4 py-2 text-sm"
                    data-testid={`edit-card-${card._id}`}
                  >
                    {t('edit')}
                  </Link>
                  <button
                    onClick={() => handleDeleteCard(card._id)}
                    className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 hover:shadow-md"
                    data-testid={`delete-card-${card._id}`}
                  >
                    {t('delete')}
                  </button>
                </div>
              </div>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/MyCardsPage.jsx
            ))}
          </div>
        )}

        {/* Statistiques utilisateur */}
        {cards.length > 0 && (
          <div className={`mt-12 ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-gray-200'} backdrop-blur-md rounded-xl p-6 border`}>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 text-center`}>
              {t('cardStatistics')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {cards.length}
                </div>
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('cardsCreated')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {cards.reduce((total, card) => total + (card.likes || 0), 0)}
                </div>
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('totalLikes')}</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {Math.round(cards.reduce((total, card) => total + (card.likes || 0), 0) / cards.length) || 0}
                </div>
                <div className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('averageLikes')}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCardsPage;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../context/FavoritesContext';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, EyeIcon } from '@heroicons/react/24/solid';
import Card from '../components/cards/Card';

const FavoritesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getFavoriteCards, favorites: favoriteIds } = useFavorites();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Charger toutes les cartes et les favoris
  useEffect(() => {
    if (user) {
      // Charger toutes les cartes depuis localStorage
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      
      // Obtenir les cartes favorites
      const favoriteCards = getFavoriteCards(userCards);
      setFavorites(favoriteCards);
    }
    setLoading(false);
  }, [user, favoriteIds, getFavoriteCards]);

  // Force re-render when favorites change
  useEffect(() => {
    if (user && favoriteIds) {
      const userCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      const favoriteCards = getFavoriteCards(userCards);
      setFavorites(favoriteCards);
    }
  }, [favoriteIds, user, getFavoriteCards]);


  if (!user) {
    return (
      <>
        <Helmet>
          <title>Connexion requise - FuturistCards</title>
        </Helmet>
        <motion.div 
          className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-center max-w-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ scale: 1.1 }}
            >
              <HeartSolidIcon className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Connexion requise
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Vous devez être connecté pour voir vos favoris.
            </p>
            <motion.div className="space-y-4">
              <Link 
                to="/login"
                className="block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200"
              >
                Se connecter
              </Link>
              <Link 
                to="/register"
                className="block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-8 py-3 rounded-xl font-medium transition-all duration-200"
              >
                S&apos;inscrire
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Mes Favoris - FuturistCards</title>
        <meta name="description" content="Gérez vos cartes de visite favorites sur FuturistCards." />
      </Helmet>

      <motion.div 
        className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl mb-6">
              <HeartSolidIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
              Mes Favoris
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Retrouvez et gérez toutes vos cartes de visite préférées en un seul endroit.
            </p>
          </motion.div>

          {/* Back Button */}
          <motion.div 
            className="mb-8"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/cards')}
              className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Retour aux cartes
            </motion.button>
          </motion.div>

          {loading ? (
            <motion.div 
              className="flex justify-center items-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Chargement de vos favoris...</span>
            </motion.div>
          ) : favorites.length === 0 ? (
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-xl border border-gray-200 dark:border-gray-700 text-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💖
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Aucun favori
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Commencez à explorer les cartes et ajoutez vos préférées à vos favoris.
              </p>
              <motion.div className="space-y-4">
                <Link 
                  to="/cards"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200"
                >
                  <EyeIcon className="w-5 h-5 inline mr-2" />
                  Explorer les cartes
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="mb-6">
                <p className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-blue-600 dark:text-blue-400">{favorites.length}</span> {favorites.length === 1 ? 'favoriteCard' : 'favoriteCards'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((card, index) => (
                  <motion.div
                    key={card.id || card._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <Card
                      card={card}
                      showActions={false}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default FavoritesPage;

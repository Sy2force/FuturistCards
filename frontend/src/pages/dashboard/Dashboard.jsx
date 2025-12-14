import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  CreditCardIcon, 
  UserIcon,
  ChartBarIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';
import { api } from '../../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalCards: 0,
    favorites: 0,
    views: 0
  });
  const [recentCards, setRecentCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Récupérer les cartes utilisateur
      const cardsResponse = await api.get('/cards/user');
      const userCards = cardsResponse.data.cards || [];
      
      setStats({
        totalCards: userCards.length,
        favorites: 0, // À implémenter
        views: userCards.reduce((total, card) => total + (card.views || 0), 0)
      });
      
      setRecentCards(userCards.slice(0, 3)); // 3 dernières cartes
    } catch (error) {
      // Erreur dashboard - continue avec données par défaut
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenue, {user?.name} ! 👋
          </h1>
          <p className="text-purple-200">
            Gérez vos cartes professionnelles depuis votre tableau de bord
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={itemVariants}
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Mes Cartes</p>
                <p className="text-3xl font-bold text-white">{stats.totalCards}</p>
              </div>
              <CreditCardIcon className="h-12 w-12 text-purple-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Favoris</p>
                <p className="text-3xl font-bold text-white">{stats.favorites}</p>
              </div>
              <HeartIcon className="h-12 w-12 text-red-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Vues Totales</p>
                <p className="text-3xl font-bold text-white">{stats.views}</p>
              </div>
              <ChartBarIcon className="h-12 w-12 text-green-400" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" variants={itemVariants}>
          <Link 
            to="/create-card" 
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group"
          >
            <PlusIcon className="h-12 w-12 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Créer une Carte</h3>
            <p className="text-sm text-purple-200">Nouvelle carte pro</p>
          </Link>

          <Link 
            to="/my-cards" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group"
          >
            <CreditCardIcon className="h-12 w-12 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Mes Cartes</h3>
            <p className="text-sm text-blue-200">{stats.totalCards} cartes</p>
          </Link>

          <Link 
            to="/profile" 
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group"
          >
            <UserIcon className="h-12 w-12 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Profil</h3>
            <p className="text-sm text-green-200">Paramètres</p>
          </Link>

          <Link 
            to="/cards" 
            className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center group"
          >
            <ChartBarIcon className="h-12 w-12 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Explorer</h3>
            <p className="text-sm text-orange-200">Toutes les cartes</p>
          </Link>
        </motion.div>

        {/* Recent Cards */}
        {recentCards.length > 0 && (
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold text-white mb-6">Cartes Récentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCards.map((card) => (
                <Link
                  key={card._id}
                  to={`/cards/${card._id}`}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                >
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300">
                    {card.title || card.name}
                  </h3>
                  <p className="text-purple-200 text-sm mb-2">{card.profession}</p>
                  <p className="text-purple-300 text-xs">
                    {card.email}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;

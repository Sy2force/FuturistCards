// UserDashboard - Tableau de bord personnalisé pour les utilisateurs connectés
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  CreditCardIcon,
  HeartIcon,
  ChartBarIcon,
  EyeIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import ButtonGlass from '../common/ButtonGlass';
import LoadingSpinner from '../common/LoadingSpinner';
import QuickActionsWithModal from '../QuickActionsWithModal';

const UserDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    myCards: 0,
    favorites: 0,
    totalViews: 0,
    totalLikes: 0,
    dashboardDataLoaded: false
  });
  const [recentCards, setRecentCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Charger les statistiques de l'utilisateur (mode mock)
      const mockCards = [
        {
          _id: '1',
          title: 'Ma Carte Pro',
          subtitle: 'Développeur Full-Stack',
          description: 'Spécialisé en React et Node.js',
          views: 45,
          likes: 12,
          createdAt: new Date().toISOString()
        },
        {
          _id: '2', 
          title: 'Carte Créative',
          subtitle: 'Designer UI/UX',
          description: 'Création d\'interfaces modernes',
          views: 32,
          likes: 8,
          createdAt: new Date().toISOString()
        }
      ];

      const myCards = mockCards;
      const favorites = [];

      // Calculer les statistiques
      const totalViews = myCards.reduce((sum, card) => sum + (card.views || 0), 0);
      const totalLikes = myCards.reduce((sum, card) => sum + (card.likes || 0), 0);

      setStats({
        myCards: myCards.length,
        favorites: favorites.length,
        totalViews,
        totalLikes
      });

      // Prendre les 3 cartes les plus récentes
      setRecentCards(myCards.slice(0, 3));
      
    } catch (error) {
      // Error loading dashboard data
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Using QuickActionsWithModal component instead of local quickActions array

  return (
    <div className="space-y-8">
      {/* Message de bienvenue personnalisé */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-3xl p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Bonjour, {user?.firstName || user?.name || 'Utilisateur'} ! 👋
            </h2>
            <p className="text-gray-700 dark:text-gray-200">
              Voici un aperçu de votre activité sur FuturistCards
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {(user?.firstName || user?.name || user?.email)?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <CreditCardIcon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.myCards}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mes Cartes</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.favorites}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Favoris</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <EyeIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalViews}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Vues</div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalLikes}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Likes</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions rapides avec modales */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Actions Rapides</h3>
        <QuickActionsWithModal />
      </motion.div>

      {/* Cartes récentes */}
      {recentCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Mes Cartes Récentes</h3>
            <Link to="/my-cards">
              <ButtonGlass variant="secondary" size="sm">
                Voir tout
              </ButtonGlass>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentCards.map((card, index) => (
              <motion.div
                key={card._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6 hover:bg-gray-200 dark:hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {card.title?.charAt(0) || 'C'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{card.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{card.subtitle}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{card.views || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <HeartIcon className="w-4 h-4" />
                      <span>{card.likes || 0}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{new Date(card.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Conseils et aide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-3xl p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">💡 Conseil du jour</h3>
        <p className="text-gray-700 dark:text-gray-200 mb-6">
          {stats.myCards === 0 
            ? "Créez votre première carte de visite pour commencer à partager vos informations professionnelles !"
            : stats.myCards < 3
            ? "Créez plusieurs cartes pour différents contextes : professionnel, personnel, créatif..."
            : "Pensez à mettre à jour régulièrement vos cartes avec vos dernières réalisations et informations de contact."
          }
        </p>
        <div className="flex flex-wrap gap-3">
          {stats.myCards === 0 && (
            <Link to="/create-card">
              <ButtonGlass>
                <PlusIcon className="w-4 h-4 mr-2" />
                Créer ma première carte
              </ButtonGlass>
            </Link>
          )}
          <Link to="/cards">
            <ButtonGlass variant="secondary">
              Découvrir d'autres cartes
            </ButtonGlass>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;

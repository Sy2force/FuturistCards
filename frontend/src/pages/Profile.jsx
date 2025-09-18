import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { cards as cardsAPI } from '../api/cards';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CameraIcon,
  ChartBarIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const Profile = () => {
  const { user } = useAuth();
  const [userCards, setUserCards] = useState([]);
  const [stats, setStats] = useState({
    totalCards: 0,
    totalViews: 0,
    totalLikes: 0,
    joinDate: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const response = await cardsAPI.getMyCards();
      const cards = response.cards || [];
      setUserCards(cards.slice(0, 3)); // Show only first 3 cards
      
      // Calculate stats
      const totalViews = cards.reduce((sum, card) => sum + (card.views || 0), 0);
      const totalLikes = cards.reduce((sum, card) => sum + (card.likes || 0), 0);
      
      setStats({
        totalCards: cards.length,
        totalViews,
        totalLikes,
        joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'N/A'
      });
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner preset="page" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Accès non autorisé</h2>
          <p>Veuillez vous connecter pour voir votre profil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Mon Profil
          </h1>
          <p className="text-white/70 text-lg">
            Consultez vos informations et vos statistiques
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  {user.image?.url ? (
                    <img
                      src={user.image.url}
                      alt={user.image.alt || 'Avatar'}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-12 h-12 text-white" />
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-white/70 capitalize">
                  {user.role === 'business' ? 'Professionnel' : user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80">
                  <EnvelopeIcon className="w-5 h-5" />
                  <span className="text-sm">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 text-white/80">
                    <PhoneIcon className="w-5 h-5" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-white/80">
                  <UserIcon className="w-5 h-5" />
                  <span className="text-sm">Membre depuis {stats.joinDate}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats and Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Statistics */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ChartBarIcon className="w-6 h-6" />
                Statistiques
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                    <CameraIcon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stats.totalCards}</div>
                  <div className="text-white/70 text-sm">Cartes créées</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
                    <EyeIcon className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stats.totalViews}</div>
                  <div className="text-white/70 text-sm">Vues totales</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-3 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center">
                    <HeartIcon className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stats.totalLikes}</div>
                  <div className="text-white/70 text-sm">J'aime reçus</div>
                </div>
              </div>
            </div>

            {/* Recent Cards */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CameraIcon className="w-6 h-6" />
                  Mes Dernières Cartes
                </h3>
                <a
                  href="/my-cards"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                >
                  Voir toutes
                </a>
              </div>
              
              {userCards.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userCards.map((card) => (
                    <motion.div
                      key={card._id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all cursor-pointer"
                      onClick={() => window.location.href = `/card/${card._id}`}
                    >
                      {card.image?.url && (
                        <img
                          src={card.image.url}
                          alt={card.image.alt}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <h4 className="text-white font-semibold mb-1 truncate">
                        {card.title}
                      </h4>
                      <p className="text-white/70 text-sm mb-2 truncate">
                        {card.subtitle}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/50">
                        <span className="bg-blue-500/20 px-2 py-1 rounded">
                          {card.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <EyeIcon className="w-3 h-3" />
                            {card.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <HeartIcon className="w-3 h-3" />
                            {card.likes || 0}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CameraIcon className="w-16 h-16 mx-auto mb-4 text-white/30" />
                  <h4 className="text-white/70 text-lg mb-2">Aucune carte créée</h4>
                  <p className="text-white/50 mb-4">Commencez par créer votre première carte de visite</p>
                  <a
                    href="/create-card"
                    className="inline-flex items-center px-6 py-3 bg-blue-500/30 hover:bg-blue-500/40 border border-blue-500/50 rounded-xl text-white font-medium transition-all duration-300 hover:scale-105"
                  >
                    Créer une carte
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

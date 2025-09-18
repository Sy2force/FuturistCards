import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { users as usersAPI } from '../api/users';
import { cards as cardsAPI } from '../api/cards';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import {
  CreditCardIcon,
  ChartBarIcon,
  TrashIcon,
  EyeIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { UsersIcon } from '@heroicons/react/24/solid';

const AdminCRM = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    totalViews: 0,
    activeUsers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadAdminData();
    }
  }, [user, activeTab]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      
      if (activeTab === 'dashboard' || activeTab === 'users') {
        const usersResponse = await usersAPI.getAllUsers();
        const usersData = usersResponse.users || [];
        setUsers(usersData);
        
        setStats(prev => ({
          ...prev,
          totalUsers: usersData.length,
          activeUsers: usersData.filter(u => u.isActive !== false).length
        }));
      }
      
      if (activeTab === 'dashboard' || activeTab === 'cards') {
        const cardsResponse = await cardsAPI.getAllCards();
        const cardsData = cardsResponse.cards || [];
        setCards(cardsData);
        
        const totalViews = cardsData.reduce((sum, card) => sum + (card.views || 0), 0);
        setStats(prev => ({
          ...prev,
          totalCards: cardsData.length,
          totalViews
        }));
      }
    } catch (error) {
      toast.error('Erreur lors du chargement des données admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await usersAPI.deleteUser(userId);
        toast.success('Utilisateur supprimé');
        loadAdminData();
      } catch (error) {
        toast.error('Erreur lors de la suppression');
      }
    }
  };

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
          <ShieldCheckIcon className="w-16 h-16 mx-auto mb-4 text-red-400" />
          <h2 className="text-2xl font-bold text-white mb-4">Accès Refusé</h2>
          <p className="text-white/70">Vous n'avez pas les permissions pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <LoadingSpinner preset="page" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Tableau de Bord Admin
            </h1>
            <p className="text-white/70 text-lg">
              Gérez les utilisateurs et surveillez l'activité de la plateforme
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
              {['dashboard', 'users', 'cards'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab === 'dashboard' ? 'Tableau de Bord' : tab === 'users' ? 'Utilisateurs' : 'Cartes'}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
                  <UsersIcon className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stats.totalUsers}</div>
                <div className="text-white/70">Utilisateurs Total</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center justify-center">
                  <CreditCardIcon className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stats.totalCards}</div>
                <div className="text-white/70">Cartes Total</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 border border-purple-500/30 rounded-xl flex items-center justify-center">
                  <EyeIcon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stats.totalViews}</div>
                <div className="text-white/70">Vues Total</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-center justify-center">
                  <ChartBarIcon className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stats.activeUsers}</div>
                <div className="text-white/70">Utilisateurs Actifs</div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <UsersIcon className="w-6 h-6" />
                  Gestion des Utilisateurs ({users.length})
                </h2>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Utilisateur</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Email</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Rôle</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Statut</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Inscription</th>
                      <th className="text-left py-3 px-4 text-white/80 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((userData) => (
                      <tr key={userData._id} className="border-b border-white/10 hover:bg-white/5">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">
                                {userData.firstName?.[0] || 'U'}{userData.lastName?.[0] || ''}
                              </span>
                            </div>
                            <div>
                              <div className="text-white font-medium">
                                {userData.firstName} {userData.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-white/70">{userData.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            userData.role === 'admin' ? 'bg-red-500/20 text-red-300' :
                            userData.role === 'business' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-gray-500/20 text-gray-300'
                          }`}>
                            {userData.role === 'admin' ? 'Admin' : userData.role === 'business' ? 'Business' : 'User'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            userData.isActive !== false ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                          }`}>
                            {userData.isActive !== false ? 'Actif' : 'Inactif'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-white/70">
                          {new Date(userData.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDeleteUser(userData._id)}
                              className="p-2 text-red-400 hover:text-red-300 transition-colors rounded-lg hover:bg-red-500/10"
                              title="Supprimer"
                            >
                              <ShieldCheckIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Cards Tab */}
          {activeTab === 'cards' && (
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CreditCardIcon className="w-6 h-6" />
                  Gestion des Cartes ({cards.length})
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                  <div key={card._id} className="bg-white/5 border border-white/10 rounded-xl p-4">
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
                    <div className="flex items-center justify-between text-xs text-white/50 mb-3">
                      <span className="bg-blue-500/20 px-2 py-1 rounded">
                        {card.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          <EyeIcon className="w-3 h-3" />
                          {card.views || 0}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-white/50">
                      Par: {card.user_id?.firstName || 'Utilisateur'} {card.user_id?.lastName || ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminCRM;

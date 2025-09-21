import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  CreditCardIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ButtonGlass from '../components/common/ButtonGlass';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [cards, setCards] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCards: 0,
    totalBusinessUsers: 0,
    totalAdmins: 0,
    totalFavorites: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      toast.error('Access denied. Admin only.');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      // Mock data for demonstration
      const mockUsers = [
        {
          _id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: 'business',
          createdAt: '2024-01-15T00:00:00.000Z',
          lastLogin: '2024-02-01T00:00:00.000Z'
        },
        {
          _id: '2',
          firstName: 'Sarah',
          lastName: 'Smith',
          email: 'sarah@example.com',
          role: 'user',
          createdAt: '2024-01-20T00:00:00.000Z',
          lastLogin: '2024-02-02T00:00:00.000Z'
        },
        {
          _id: '3',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@futuristcards.com',
          role: 'admin',
          createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
          isActive: true
        },
        {
          _id: 'user-4',
          firstName: 'Business',
          lastName: 'Owner',
          email: 'business@example.com',
          role: 'business',
          createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
          isActive: false
        }
      ];

      const mockCards = JSON.parse(localStorage.getItem('userCards') || '[]');
      
      setUsers(mockUsers);
      setCards(mockCards);
      
      // Calculate stats
      const totalUsers = mockUsers.length;
      const totalCards = mockCards.length;
      const totalBusinessUsers = mockUsers.filter(u => u.role === 'business').length;
      const totalAdmins = mockUsers.filter(u => u.role === 'admin').length;
      
      setStats({
        totalUsers,
        totalCards,
        totalBusinessUsers,
        totalAdmins,
        totalFavorites: Math.floor(totalCards * 0.3)
      });
      
    } catch (error) {
      toast.error('Error loading admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;
    
    try {
      setUsers(prev => prev.filter(u => u._id !== userId));
      toast.success('Utilisateur supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      setUsers(prev => prev.map(u => 
        u._id === userId ? { ...u, role: newRole } : u
      ));
      setShowRoleModal(false);
      setSelectedUser(null);
      toast.success('Rôle modifié avec succès');
    } catch (error) {
      toast.error('Erreur lors de la modification du rôle');
    }
  };

  // const handleDeleteCard = (cardId) => {
  //   if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) return;
  //   
  //   try {
  //     const updatedCards = cards.filter(c => c._id !== cardId);
  //     setCards(updatedCards);
  //     localStorage.setItem('userCards', JSON.stringify(updatedCards));
  //     toast.success('Carte supprimée avec succès');
  //   } catch (error) {
  //     // Error deleting card
  //     toast.error('Erreur lors de la suppression');
  //   }
  // };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'business': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'user': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'business': return 'Business';
      case 'user': return 'Utilisateur';
      default: return role;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🛠️ Administration CRM
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Gestion des utilisateurs et paramètres de la plateforme
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Utilisateurs</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalUsers}</p>
              </div>
              <UserGroupIcon className="w-12 h-12 text-blue-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Cartes</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalCards}</p>
              </div>
              <CreditCardIcon className="w-12 h-12 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Comptes Business</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalBusinessUsers}</p>
              </div>
              <BuildingOfficeIcon className="w-12 h-12 text-purple-400" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Favoris</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.totalFavorites}</p>
              </div>
              <HeartIcon className="w-12 h-12 text-red-400" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <div className="flex space-x-1 bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-xl p-1">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'users'
                  ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <UsersIcon className="w-4 h-4" />
              <span>Utilisateurs</span>
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'cards'
                  ? 'bg-blue-500/20 text-blue-400 shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <CreditCardIcon className="w-4 h-4" />
              <span>Cartes</span>
            </button>
          </div>
        </motion.div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-300 dark:border-white/10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Gestion des Utilisateurs
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 dark:bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Inscription
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.firstName} {user.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 dark:text-gray-300">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(user.role)}`}>
                          {getRoleLabel(user.role)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <ButtonGlass
                            onClick={() => {
                              setSelectedUser(user);
                              setShowRoleModal(true);
                            }}
                            size="sm"
                            variant="secondary"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </ButtonGlass>
                          {user.role !== 'admin' && (
                            <ButtonGlass
                              onClick={() => handleDeleteUser(user._id)}
                              size="sm"
                              variant="danger"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </ButtonGlass>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Cards Tab */}
        {activeTab === 'cards' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-gray-300 dark:border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-300 dark:border-white/10">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Gestion des Cartes
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50 dark:bg-white/5">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Carte
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Propriétaire
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Création
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-white/10">
                  {cards.map((card) => {
                    const owner = users.find(u => u._id === card.userId);
                    return (
                      <tr key={card._id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {card.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {owner ? `${owner.firstName} ${owner.lastName}` : 'Utilisateur inconnu'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {new Date(card.createdAt).toLocaleDateString('fr-FR')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <ButtonGlass
                              onClick={() => navigate(`/card/${card._id}`)}
                              size="sm"
                              variant="secondary"
                            >
                              <EyeIcon className="w-4 h-4" />
                            </ButtonGlass>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Role Change Modal */}
        {showRoleModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Modifier le rôle de {selectedUser.firstName} {selectedUser.lastName}
              </h3>
              
              <div className="space-y-3 mb-6">
                {['user', 'business', 'admin'].map(role => (
                  <button
                    key={role}
                    onClick={() => handleChangeRole(selectedUser._id, role)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-300 ${
                      selectedUser.role === role
                        ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                        : 'bg-white/5 border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{getRoleLabel(role)}</span>
                      {selectedUser.role === role && (
                        <span className="w-5 h-5 text-green-500">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex space-x-3">
                <ButtonGlass
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Annuler
                </ButtonGlass>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

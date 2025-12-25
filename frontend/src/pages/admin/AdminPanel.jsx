<<<<<<< HEAD:frontend/src/pages/admin/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { api } from '../../services/api';
import { 
  UsersIcon, 
  ShieldCheckIcon,
  BuildingOfficeIcon,
  UserIcon,
  TrashIcon,
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getAllUsers();
        if (response.data.success) {
          toast.success('Rôle utilisateur mis à jour');
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        }
      } catch (error) {
        toast.error('Erreur lImpossible de charger les utilisateurs');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.isAdmin) {
      fetchUsers();
    }
  }, [user]);

  // Filter users based on search and role filter
  useEffect(() => {
    let filtered = users.filter(user => {
      const matchesSearch = 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = filterRole === 'all' || user.role === filterRole;
      
      return matchesSearch && matchesRole;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, filterRole, users]);

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleConfig = {
      user: { 
        icon: UserIcon, 
        color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200', 
        label: 'user' 
      },
      business: { 
        icon: UsersIcon, 
        color: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200', 
        label: 'Business' 
      },
      admin: { 
        icon: ShieldCheckIcon, 
        color: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200', 
        label: 'administrator' 
      }
    };

    const config = roleConfig[role];
    if (!config) return null;

    const IconComponent = config.icon;
=======
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';

const AdminPage = () => {
  const { user, loading } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/AdminPage.jsx

  if (loading) {
    return (
<<<<<<< HEAD:frontend/src/pages/admin/AdminPanel.jsx
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const isActive = status === 'active';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-1.5 ${isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
        {isActive ? 'active' : 'inactive'}
      </span>
    );
  };

  // const handleEditUser = (user) => {
  //   setSelectedUser(user);
  //   setShowEditModal(true);
  // };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  // const handleSaveUser = (updatedUser) => {
  //   setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  //   setShowEditModal(false);
  //   setSelectedUser(null);
  // };

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl"
        >
          <ShieldCheckIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accès refusé
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Privilèges administrateur requis pour accéder à cette page.
          </p>
        </motion.div>
=======
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'dark-gradient' : 'glass-gradient'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/AdminPage.jsx
      </div>
    );
  }

<<<<<<< HEAD:frontend/src/pages/admin/AdminPanel.jsx
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Chargement des utilisateurs...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Panneau d&apos;administration - CardPro</title>
        <meta name="description" content="Gérer les utilisateurs, les rôles et les paramètres" />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-neutral-50 dark:bg-gray-900 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                  <ShieldCheckIcon className="w-8 h-8 text-blue-500 mr-3" />
                  Panneau d&apos;administration
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Gérer les utilisateurs, les rôles et les paramètres
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Ajouter un utilisateur
              </motion.button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { 
                  label: 'Total des utilisateurs', 
                  value: users.length, 
                  icon: UsersIcon, 
                  color: 'text-blue-500',
                  bg: 'bg-blue-50 dark:bg-blue-900/20'
                },
                { 
                  label: 'businessUsers', 
                  value: users.filter(u => u.role === 'business').length, 
                  icon: BuildingOfficeIcon, 
                  color: 'text-green-500',
                  bg: 'bg-green-50 dark:bg-green-900/20'
                },
                { 
                  label: 'regularUsers', 
                  value: users.filter(u => u.role === 'user').length, 
                  icon: UserIcon, 
                  color: 'text-indigo-500',
                  bg: 'bg-indigo-50 dark:bg-indigo-900/20'
                },
                { 
                  label: 'admins', 
                  value: users.filter(u => u.role === 'admin').length, 
                  icon: ShieldCheckIcon, 
                  color: 'text-red-500',
                  bg: 'bg-red-50 dark:bg-red-900/20'
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </p>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Utilisateurs totaux</h3>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Filters and Search */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher par nom, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">Tous les rôles</option>
                  <option value="user">Utilisateurs</option>
                  <option value="business">Professionnels</option>
                  <option value="admin">Administrateurs</option>
                </select>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Exporter
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Users Table */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Utilisateur
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Dernière connexion
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredUsers.map((userData, index) => (
                    <motion.tr
                      key={userData.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                              <span className="text-white font-medium text-sm">
                                {userData.firstName[0]}{userData.lastName[0]}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {userData.firstName} {userData.lastName}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {userData.company} • {userData.position}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white flex items-center mb-1">
                          <EnvelopeIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {userData.email}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                          {userData.phone}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <RoleBadge role={userData.role} />
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={userData.status} />
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {userData.lastLogin}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {/* Edit user functionality */}}
                            className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
                            aria-label="Edit user"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </motion.button>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteUser(userData.id)}
                            className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                            aria-label="Delete user"
                            disabled={userData.role === 'admin' && userData.email === user.email}
                          >
                            <TrashIcon className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
=======
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className={`min-h-screen py-12 px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'}`} data-testid="admin-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">{t('admin.administration')}</h1>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            {t('admin.adminPanelDescription')}
          </p>
        </div>
        <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border animate-fade-in hover-lift text-center`}>
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('admin.adminSpace')}</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              {t('admin.adminSpaceDescription')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('admin.userManagement')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{t('admin.userManagementDescription')}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {t('admin.inDevelopment')}
                  </span>
                </div>
              </div>
              
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('admin.cardModeration')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{t('admin.cardModerationDescription')}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {t('admin.inDevelopment')}
                  </span>
                </div>
              </div>
              
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('admin.statistics')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{t('admin.statisticsDescription')}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {t('admin.inDevelopment')}
                  </span>
                </div>
              </div>
              
              <div className={`${isDark ? 'glass-effect border-white/10' : 'bg-gray-50/80 border-gray-200/50'} rounded-xl p-6 border`}>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-2`}>{t('admin.configuration')}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{t('admin.configurationDescription')}</p>
                <div className="mt-4">
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                    {t('admin.inDevelopment')}
                  </span>
                </div>
              </div>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/AdminPage.jsx
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => alert('Fonctionnalité en développement')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('admin.viewSystemLogs')}
              </button>
              <button 
                onClick={() => window.location.href = '/cards'}
                className={`px-6 py-3 ${isDark ? 'bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50' : 'bg-white/20 border-white/30 text-white hover:bg-white/30'} border rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm`}
              >
                {t('admin.viewAllCards')}
              </button>
            </div>
          </div>
        </div>

        {/* Informations système */}
        <div className={`mt-8 ${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-6 shadow-3d border animate-fade-in`} style={{animationDelay: '0.2s'}}>
          <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('admin.systemInformation')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('admin.version')}:</span>
              <span className={`${isDark ? 'text-white' : 'text-gray-800'} ml-2`}>1.0.0</span>
            </div>
            <div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('admin.environment')}:</span>
              <span className={`${isDark ? 'text-white' : 'text-gray-800'} ml-2`}>{t('admin.development')}</span>
            </div>
            <div>
              <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{t('profile.status')}:</span>
              <span className="text-green-400 ml-2">{t('admin.operational')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

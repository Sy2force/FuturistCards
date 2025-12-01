import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import api from '../services/api';
import { 
  UsersIcon, 
  UserGroupIcon, 
  ShieldCheckIcon,
  BuildingOfficeIcon,
  UserIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckBadgeIcon,
  XMarkIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.getAllUsers();
        if (response.data.success) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Erreur lors du chargement des utilisateurs');
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
        label: t('user') 
      },
      business: { 
        icon: UsersIcon, 
        color: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200', 
        label: t('business') 
      },
      admin: { 
        icon: ShieldCheckIcon, 
        color: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200', 
        label: t('administrator') 
      }
    };

    const config = roleConfig[role];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
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
        {isActive ? t('active') : t('inactive')}
      </span>
    );
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm(t('confirmDeleteUser'))) {
      setUsers(prev => prev.filter(u => u.id !== userId));
    }
  };

  const handleSaveUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setShowEditModal(false);
    setSelectedUser(null);
  };

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
            {t('accessDenied')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('adminPrivilegesRequired')}
          </p>
        </motion.div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-gray-900">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{t('loadingUsers')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('adminPanel')} - CardPro</title>
        <meta name="description" content={t('adminPanelDescription')} />
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
                  <ShieldCheckIcon className="w-8 h-8 text-primary-500 mr-3" />
                  {t('adminPanel')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {t('manageUsersRolesSettings')}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-md transition-all"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                {t('addUser')}
              </motion.button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { 
                  label: t('totalUsers'), 
                  value: users.length, 
                  icon: UsersIcon, 
                  color: 'text-blue-500',
                  bg: 'bg-blue-50 dark:bg-blue-900/20'
                },
                { 
                  label: t('businessUsers'), 
                  value: users.filter(u => u.role === 'business').length, 
                  icon: BuildingOfficeIcon, 
                  color: 'text-green-500',
                  bg: 'bg-green-50 dark:bg-green-900/20'
                },
                { 
                  label: t('regularUsers'), 
                  value: users.filter(u => u.role === 'user').length, 
                  icon: UserIcon, 
                  color: 'text-indigo-500',
                  bg: 'bg-indigo-50 dark:bg-indigo-900/20'
                },
                { 
                  label: t('admins'), 
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
                    placeholder={t('searchUsersPlaceholder')}
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
                  <option value="all">{t('allRoles')}</option>
                  <option value="user">{t('users')}</option>
                  <option value="business">{t('business')}</option>
                  <option value="admin">{t('admins')}</option>
                </select>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  {t('export')}
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
                      {t('user')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('contact')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('role')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('status')}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('lastLogin')}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {t('actions')}
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
                            onClick={() => handleEditUser(userData)}
                            className="p-2 text-primary-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all"
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
            </div>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">{t('noUsersFound')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminPage;

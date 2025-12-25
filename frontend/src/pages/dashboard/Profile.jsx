<<<<<<< HEAD:frontend/src/pages/dashboard/Profile.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validateRequired, validateLength } from '../../utils/validation';
import { 
  UserIcon, 
  UsersIcon, 
  ShieldCheckIcon, 
  CameraIcon, 
  PencilIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  BuildingOfficeIcon,
  GlobeAltIcon,
  DocumentCheckIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { UserIcon as UserSolidIcon } from '@heroicons/react/24/solid';
=======
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';
import { useLikes } from '../hooks/useLikes';
import EditProfileModal from '../components/profile/EditProfileModal';
import ChangePasswordModal from '../components/profile/ChangePasswordModal';
import api from '../api/api';
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/ProfilePage.jsx

const ProfilePage = () => {
  const { user, loading, updateProfile } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();
  const { getUserLikedCards } = useLikes();
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userStats, setUserStats] = useState({
    totalCards: 0,
    totalLikes: 0,
    totalViews: 0,
    favoriteCards: 0,
    likedCards: []
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;
      
      try {
        setLoadingStats(true);
        
        // Fetch user cards
        const cardsResponse = await api.get('/cards/my-cards');
        const userCards = cardsResponse.data.cards || [];
        
        // Fetch user favorites
        const favoritesResponse = await api.get('/favorites');
        const favorites = favoritesResponse.data.favorites || [];

        // Get liked cards
        const likedCards = getUserLikedCards();
        
        setUserStats({
          totalCards: userCards.length,
          totalLikes: userCards.reduce((sum, card) => sum + (card.likes || 0), 0),
          totalViews: userCards.reduce((sum, card) => sum + (card.views || 0), 0),
          favoriteCards: favorites.length,
          likedCards: likedCards
        });
      } catch (error) {
        setUserStats({
          totalCards: 0,
          totalLikes: 0,
          totalViews: 0,
          favoriteCards: 0,
          likedCards: []
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserStats();
  }, [user, getUserLikedCards]);

  if (loading) {
    return (
<<<<<<< HEAD:frontend/src/pages/dashboard/Profile.jsx
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="inline-flex items-center"
      >
        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${config.color} shadow-sm`}>
          <IconComponent className="w-4 h-4 mr-2" />
          {config.label}
        </span>
      </motion.div>
    );
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    const firstNameValidation = validateRequired(formData.firstName, 'firstNameField');
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.error;
    } else {
      const lengthValidation = validateLength(formData.firstName, 2, 50, 'firstNameField');
      if (!lengthValidation.isValid) {
        newErrors.firstName = lengthValidation.error;
      }
    }

    const lastNameValidation = validateRequired(formData.lastName, 'lastNameField');
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.error;
    } else {
      const lengthValidation = validateLength(formData.lastName, 2, 50, 'lastNameField');
      if (!lengthValidation.isValid) {
        newErrors.lastName = lengthValidation.error;
      }
    }

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      // Error is handled by the API service and toast notifications
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form to user data
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      company: user?.company || '',
      position: user?.position || '',
      website: user?.website || '',
      bio: user?.bio || ''
    });
    setErrors({});
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accès refusé
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vous devez être connecté pour accéder à cette page.
          </p>
        </div>
=======
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/ProfilePage.jsx
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSaveProfile = async (profileData) => {
    await updateProfile(profileData);
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'primary-gradient';
      case 'business':
        return 'primary-gradient';
      default:
        return 'secondary-gradient';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'business':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2h6v2H7V6zm6 4H7v2h6v-2z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
<<<<<<< HEAD:frontend/src/pages/dashboard/Profile.jsx
    <>
      <Helmet>
        <title>Profil - FuturistCards</title>
        <meta name="description" content="Gérez votre profil et vos informations personnelles sur FuturistCards." />
      </Helmet>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-neutral-50 dark:bg-gray-900 py-8"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            {/* Dynamic header based on user role */}
            <div className={`h-32 ${
              user?.role === 'business' 
                ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700' 
                : user?.role === 'admin'
                ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700'
                : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700'
            }`}></div>
            
            <div className="relative px-6 pb-6">
              {/* Profile Avatar */}
              <div className="relative -mt-16 mb-4">
                <motion.div 
                  className="relative inline-block"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center ${
                    user?.role === 'business' 
                      ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                      : user?.role === 'admin'
                      ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                      : 'bg-gradient-to-br from-green-400 to-green-600'
                  }`}>
                    <UserSolidIcon className="w-16 h-16 text-white" />
                  </div>
                  
                  {isEditing && (
                    <motion.label 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg"
                    >
                      <CameraIcon className="w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        aria-label="Upload profile picture"
                      />
                    </motion.label>
                  )}
                </motion.div>
              </div>

              {/* User Information Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 space-y-4 sm:space-y-0">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2" data-testid="profile-heading">
                    {user?.firstName || 'User'} {user?.lastName || 'Name'}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {user?.position || 'Position'} {user?.company && `at ${user.company}`}
                  </p>
                  <RoleBadge role={user?.role} />
                </motion.div>
                
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                  className={`flex items-center px-4 py-2 text-white rounded-lg transition-all duration-200 shadow-md ${
                    user?.role === 'business' 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : user?.role === 'admin'
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                  aria-label={isEditing ? 'Cancel editing' : 'Edit profile'}
                >
                  {isEditing ? (
                    <><XMarkIcon className="w-4 h-4 mr-2" /> Annuler</>
                  ) : (
                    <><PencilIcon className="w-4 h-4 mr-2" /> Modifier le profil</>
                  )}
                </motion.button>
              </div>

              {/* Edit Form */}
              {isEditing ? (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Prénom
                      </label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        className={`w-full px-4 py-3 border ${errors.firstName ? 'border-error-500' : 'border-neutral-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
                        placeholder="Entrez votre prénom"
                        aria-invalid={errors.firstName ? 'true' : 'false'}
                      />
                      {errors.firstName && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-error-600 dark:text-error-400"
                        >
                          {errors.firstName}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Last Name */}
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Nom
                      </label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        className={`w-full px-4 py-3 border ${errors.lastName ? 'border-error-500' : 'border-neutral-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
                        placeholder="Entrez votre nom"
                        aria-invalid={errors.lastName ? 'true' : 'false'}
                      />
                      {errors.lastName && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-error-600 dark:text-error-400"
                        >
                          {errors.lastName}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Email */}
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <EnvelopeIcon className="w-4 h-4 mr-2" />
                        Email
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className={`w-full px-4 py-3 border ${errors.email ? 'border-error-500' : 'border-neutral-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
                        placeholder="Entrez votre email"
                        aria-invalid={errors.email ? 'true' : 'false'}
                      />
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-error-600 dark:text-error-400"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Phone */}
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <PhoneIcon className="w-4 h-4 mr-2" />
                        Téléphone
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        className={`w-full px-4 py-3 border ${errors.phone ? 'border-error-500' : 'border-neutral-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all`}
                        placeholder="050-1234567"
                        aria-invalid={errors.phone ? 'true' : 'false'}
                      />
                      {errors.phone && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-error-600 dark:text-error-400"
                        >
                          {errors.phone}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Company */}
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <BuildingOfficeIcon className="w-4 h-4 mr-2" />
                        Entreprise
                      </label>
                      <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Entrez votre entreprise"
                      />
                    </motion.div>

                    {/* Position */}
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Poste
                      </label>
                      <input
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="Entrez votre poste"
                      />
                    </motion.div>

                    {/* Website */}
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="md:col-span-2">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <GlobeAltIcon className="w-4 h-4 mr-2" />
                        Site web
                      </label>
                      <input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        type="url"
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="https://your-website.com"
                      />
                    </motion.div>

                    {/* Bio */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        À propos de vous
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        placeholder="Parlez-nous de vous..."
                      />
                    </motion.div>
                  </div>

                  {/* Action Buttons */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ delay: 0.5 }}
                    className="flex justify-end space-x-4 pt-6 border-t border-neutral-200 dark:border-gray-700"
                  >
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                      className="flex items-center px-6 py-3 border border-neutral-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-neutral-50 dark:hover:bg-gray-700 transition-all"
                      disabled={isLoading}
                    >
                      <XMarkIcon className="w-4 h-4 mr-2" />
                      Annuler
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center px-6 py-3 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${
                        user?.role === 'business' 
                          ? 'bg-blue-500 hover:bg-blue-600' 
                          : user?.role === 'admin'
                          ? 'bg-purple-500 hover:bg-purple-600'
                          : 'bg-green-500 hover:bg-green-600'
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {'saving'}
                        </>
                      ) : (
                        <>
                          <DocumentCheckIcon className="w-4 h-4 mr-2" />
                          {'saveChanges'}
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              ) : (
                /* Profile Display */
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <EnvelopeIcon className={`w-5 h-5 mr-2 ${
                        user?.role === 'business' ? 'text-blue-500' : 
                        user?.role === 'admin' ? 'text-purple-500' : 'text-green-500'
                      }`} />
                      {user?.role === 'business' ? 'Informations Professionnelles' : 'Informations Personnelles'}
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">Email</span>
                          <p className="text-gray-900 dark:text-white font-medium">{user?.email}</p>
                        </div>
                      </div>
                      {user?.phone && (
                        <div className="flex items-center space-x-3">
                          <PhoneIcon className="w-4 h-4 text-gray-400" />
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Phone</span>
                            <p className="text-gray-900 dark:text-white font-medium">{user.phone}</p>
                          </div>
                        </div>
                      )}
                      {user?.website && (
                        <div className="flex items-center space-x-3">
                          <GlobeAltIcon className="w-4 h-4 text-gray-400" />
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Website</span>
                            <a 
                              href={user.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                            >
                              {user.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                  
                  {user?.role === 'business' && (
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        <BuildingOfficeIcon className="w-5 h-5 mr-2 text-blue-500" />
                        Détails de l&apos;Entreprise
                      </h3>
                    <div className="space-y-4">
                      {user?.company && (
                        <div className="flex items-center space-x-3">
                          <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Company</span>
                            <p className="text-gray-900 dark:text-white font-medium">{user.company}</p>
                          </div>
                        </div>
                      )}
                      {user?.position && (
                        <div className="flex items-center space-x-3">
                          <UserIcon className="w-4 h-4 text-gray-400" />
                          <div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Position</span>
                            <p className="text-gray-900 dark:text-white font-medium">{user.position}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    </motion.div>
                  )}
                  
                  {user?.bio && (
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }} 
                      animate={{ y: 0, opacity: 1 }} 
                      transition={{ delay: 0.3 }}
                      className="md:col-span-2"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        About
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-neutral-50 dark:bg-gray-700 p-4 rounded-lg">
                        {user.bio}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
=======
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4`} data-testid="profile-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('profile.myProfile')}</h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('profile.managePersonalInfo')}</p>
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd:frontend/src/pages/ProfilePage.jsx
        </div>

        {/* User Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-container">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-600'} font-medium`}>{t('myCards.title')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loadingStats ? '...' : userStats.totalCards}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? 'bg-blue-800/50' : 'bg-blue-200'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-blue-300' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card-container">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-600'} font-medium`}>{t('profile.totalLikes')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loadingStats ? '...' : userStats.totalLikes}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? 'bg-red-800/50' : 'bg-red-200'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-red-300' : 'text-red-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card-container">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-600'} font-medium`}>{t('profile.totalViews')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loadingStats ? '...' : userStats.totalViews}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? 'bg-green-800/50' : 'bg-green-200'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-green-300' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="card-container">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${isDark ? 'text-purple-300' : 'text-purple-600'} font-medium`}>{t('profile.favoriteCards')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {loadingStats ? '...' : userStats.favoriteCards}
                </p>
              </div>
              <div className={`p-3 rounded-full ${isDark ? 'bg-purple-800/50' : 'bg-purple-200'}`}>
                <svg className={`w-6 h-6 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg border`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('profile.personalInformation')}</h3>
              <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 ${getRoleBadgeColor(user.role)} text-white`}>
                {getRoleIcon(user.role)}
                {user.role === 'admin' ? t('auth.adminAccount') : user.role === 'business' ? t('auth.businessAccount') : t('auth.userAccount')}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('profile.firstName')}</label>
                <div className={`${isDark ? 'bg-gray-700/50 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-3 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  {user.firstName || t('profile.notProvided')}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('profile.lastName')}</label>
                <div className={`${isDark ? 'bg-gray-700/50 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-3 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  {user.lastName || t('profile.notProvided')}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('profile.email')}</label>
                <div className={`${isDark ? 'bg-gray-700/50 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-3 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  {user.email}
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>{t('profile.memberSince')}</label>
                <div className={`${isDark ? 'bg-gray-700/50 text-white' : 'bg-gray-50 text-gray-900'} rounded-lg p-3 border ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : t('profile.notAvailable')}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={() => setShowEditModal(true)}
                className={`w-full ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center`}
                data-testid="edit-profile-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t('profile.editProfile')}
              </button>
              <button
                onClick={() => setShowPasswordModal(true)}
                className={`w-full ${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center`}
                data-testid="change-password-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t('profile.changePassword')}
              </button>
            </div>
          </div>
          
          {/* Account Activity */}
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-gray-200'} backdrop-blur-sm rounded-2xl p-8 shadow-lg border`}>
            <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>{t('profile.accountActivity')}</h3>
            
            <div className="space-y-6">
              {/* Quick Actions */}
              <div>
                <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{t('profile.quickActions')}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <a href="/my-cards" className={`${isDark ? 'bg-blue-900/30 border-blue-700/30 text-blue-300 hover:bg-blue-800/40' : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'} border rounded-lg p-3 text-center text-sm font-medium transition-colors duration-200`}>
                    {t('myCards.title')}
                  </a>
                  <a href="/favorites" className={`${isDark ? 'bg-red-900/30 border-red-700/30 text-red-300 hover:bg-red-800/40' : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'} border rounded-lg p-3 text-center text-sm font-medium transition-colors duration-200`}>
                    {t('favorites.title')}
                  </a>
                  {user.role === 'business' && (
                    <a href="/create-card" className={`${isDark ? 'bg-green-900/30 border-green-700/30 text-green-300 hover:bg-green-800/40' : 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'} border rounded-lg p-3 text-center text-sm font-medium transition-colors duration-200`}>
                      {t('profile.createCard')}
                    </a>
                  )}
                  {user.role === 'admin' && (
                    <a href="/admin" className={`${isDark ? 'bg-purple-900/30 border-purple-700/30 text-purple-300 hover:bg-purple-800/40' : 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'} border rounded-lg p-3 text-center text-sm font-medium transition-colors duration-200`}>
                      {t('profile.admin')}
                    </a>
                  )}
                </div>
              </div>
              
              {/* Account Status */}
              <div>
                <h4 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-3`}>{t('profile.accountStatus')}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('profile.status')}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'}`}>
                      {t('profile.active')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('profile.accountType')}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)} text-white`}>
                      {user.role === 'admin' ? t('profile.administrator') : user.role === 'business' ? t('profile.business') : t('profile.user')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('profile.lastLogin')}</span>
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('fr-FR') : t('profile.today')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        user={user}
        onSave={handleSaveProfile}
      />
      
      <ChangePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSave={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default ProfilePage;

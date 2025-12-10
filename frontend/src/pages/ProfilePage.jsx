import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validateRequired, validateLength } from '../utils/validation';
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

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    position: user?.position || '',
    website: user?.website || '',
    bio: user?.bio || ''
  });
  const [errors, setErrors] = useState({});

  // Role badge component with enhanced styling
  const RoleBadge = ({ role }) => {
    const roleConfig = {
      user: { 
        icon: UserIcon, 
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border border-green-200 dark:border-green-700', 
        label: 'Utilisateur Personnel',
        bgGradient: 'from-green-400 to-green-600'
      },
      business: { 
        icon: UsersIcon, 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-700', 
        label: 'Compte Professionnel',
        bgGradient: 'from-blue-400 to-blue-600'
      },
      admin: { 
        icon: ShieldCheckIcon, 
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-700', 
        label: 'Administrateur',
        bgGradient: 'from-purple-400 to-purple-600'
      }
    };

    const config = roleConfig[role];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
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
    e.preventDefaul;
    
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
            {'accessDenied'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {'mustBeLoggedIn'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{'Profil'} - CardPro</title>
        <meta name="description" content={'profileDescription'} />
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
                      className="absolute bottom-0 right-0 bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-full cursor-pointer shadow-lg"
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
                    <><XMarkIcon className="w-4 h-4 mr-2" /> {'Annuler'}</>
                  ) : (
                    <><PencilIcon className="w-4 h-4 mr-2" /> {'editProfile'}</>
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
                        {'firstName'}
                      </label>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        type="text"
                        className={`w-full px-4 py-3 border ${errors.firstName ? 'border-error-500' : 'border-neutral-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all`}
                        placeholder={'enterFirstName'}
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
                        {'lastName'}
                      </label>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        type="text"
                        className={`w-full px-4 py-3 border ${errors.lastName ? 'border-error-500' : 'border-neutral-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all`}
                        placeholder={'enterLastName'}
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
                        {'Email'}
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className={`w-full px-4 py-3 border ${errors.email ? 'border-error-500' : 'border-neutral-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all`}
                        placeholder={'Entrez votre email'}
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
                        {'Téléphone'}
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        className={`w-full px-4 py-3 border ${errors.phone ? 'border-error-500' : 'border-neutral-300 dark:border-gray-600'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all`}
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
                        {'Entreprise'}
                      </label>
                      <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all"
                        placeholder={'Entrez votre entreprise'}
                      />
                    </motion.div>

                    {/* Position */}
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <UserIcon className="w-4 h-4 mr-2" />
                        {'Poste'}
                      </label>
                      <input
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        type="text"
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all"
                        placeholder={'Entrez votre poste'}
                      />
                    </motion.div>

                    {/* Website */}
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="md:col-span-2">
                      <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <GlobeAltIcon className="w-4 h-4 mr-2" />
                        {'Site web'}
                      </label>
                      <input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        type="url"
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all"
                        placeholder="https://your-website.com"
                      />
                    </motion.div>

                    {/* Bio */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {'aboutYou'}
                      </label>
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-neutral-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                        placeholder={'tellAboutYourself'}
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
                      {'Annuler'}
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
                              className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
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
                        Détails de l'Entreprise
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
        </div>
      </motion.div>
    </>
  );
};

export default ProfilePage;

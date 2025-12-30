import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useTranslation } from "../../hooks/useTranslation";
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { useRoleTheme } from '../../context/ThemeProvider';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { isDark } = useRoleTheme();
  const { t } = useTranslation();
  
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
  
  const [userStats] = useState({
    totalCards: 3,
    totalLikes: 47,
    totalViews: 156,
    favoriteCards: 8
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        position: user.position || '',
        website: user.website || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Accès refusé
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vous devez être connecté pour accéder à cette page.
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = t('validation.firstNameRequired');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('validation.lastNameRequired');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.invalidEmail');
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
      // Error handled
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
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

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin': return t('profile.roles.admin');
      case 'business': return t('profile.roles.business');
      default: return t('profile.roles.user');
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-500';
      case 'business': return 'bg-blue-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-12 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} data-testid="profile-page" dir="rtl">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('profile.title')}
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('profile.subtitle')}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">{t('dashboard.myCards')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userStats.totalCards}
                </p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <span className="text-2xl">📇</span>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">{t('profile.totalLikes')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userStats.totalLikes}
                </p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">{t('profile.totalViews')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userStats.totalViews}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">{t('dashboard.favorites')}</p>
                <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {userStats.favoriteCards}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-xl overflow-hidden`}>
          {/* Header with gradient */}
          <div className={`h-32 ${
            user?.role === 'business' 
              ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700' 
              : user?.role === 'admin'
              ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700'
              : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700'
          }`}></div>
          
          <div className="relative px-6 pb-6">
            {/* Profile Avatar */}
            <div className="relative -mt-16 mb-6">
              <div className={`w-32 h-32 rounded-full border-4 border-white ${isDark ? 'border-gray-800' : ''} flex items-center justify-center ${
                user?.role === 'business' 
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600' 
                  : user?.role === 'admin'
                  ? 'bg-gradient-to-br from-purple-400 to-purple-600'
                  : 'bg-gradient-to-br from-green-400 to-green-600'
              }`}>
                <span className="text-white text-4xl font-bold">
                  {user?.firstName?.charAt(0) || 'U'}{user?.lastName?.charAt(0) || ''}
                </span>
              </div>
            </div>

            {/* User Info Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6">
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`} data-testid="profile-heading">
                  {user?.firstName || t('auth.firstName')} {user?.lastName || t('profile.lastName')}
                </h1>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                  {user?.position || t('profile.position')} {user?.company && t('profile.atCompany', { company: user.company })}
                </p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getRoleColor(user?.role)}`}>
                  {getRoleLabel(user?.role)}
                </span>
              </div>
              
              <button
                onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                className={`flex items-center px-4 py-2 text-white rounded-lg transition-all duration-200 shadow-md ${getRoleColor(user?.role)} hover:opacity-90`}
              >
                {isEditing ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('common.cancel')}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {t('common.edit')}
                  </>
                )}
              </button>
            </div>

            {/* Edit Form or Display */}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <svg className="w-4 h-4 inline mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('profile.firstName')}
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      type="text"
                      className={`w-full px-4 py-3 border ${errors.firstName ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder={t('profile.firstNamePlaceholder')}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <svg className="w-4 h-4 inline mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {t('profile.lastName')}
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      type="text"
                      className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder={t('profile.lastNamePlaceholder')}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <svg className="w-4 h-4 inline mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {t('profile.email')}
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder={t('profile.emailPlaceholder')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <svg className="w-4 h-4 inline mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
                      </svg>
                      {t('profile.phone')}
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder={t('profile.phonePlaceholder')}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <svg className="w-4 h-4 inline mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {t('profile.company')}
                    </label>
                    <input
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      type="text"
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder={t('profile.companyPlaceholder')}
                    />
                  </div>

                  {/* Position */}
                  <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <svg className="w-4 h-4 inline mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                      </svg>
                      Poste
                    </label>
                    <input
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      type="text"
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder={t('profile.positionPlaceholder')}
                    />
                  </div>

                  {/* Website */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      <svg className="w-4 h-4 inline mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Site web
                    </label>
                    <input
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      type="url"
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder={t('profile.websitePlaceholder')}
                    />
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                      📝 À propos de vous
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600' : 'border-gray-300'} rounded-lg ${isDark ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
                      placeholder={t('profile.bioPlaceholder')}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className={`px-6 py-3 border ${isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} rounded-lg transition-all`}
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {t('common.cancel')}
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-3 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md ${getRoleColor(user?.role)} hover:opacity-90`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                        {t('common.saving')}
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Enregistrer
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Profile Display */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                    <svg className="w-5 h-5 inline mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Informations de Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <span className="mr-2">{t('common.email')}</span>
                      <div>
                        <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('common.email')}</span>
                        <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user?.email}</p>
                      </div>
                    </div>
                    {user?.phone && (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
                        </svg>
                        <div>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('common.phone')}</span>
                          <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user.phone}</p>
                        </div>
                      </div>
                    )}
                    {user?.website && (
                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9" />
                        </svg>
                        <div>
                          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('common.website')}</span>
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
                </div>
                
                {(user?.company || user?.position) && (
                  <div>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4 flex items-center`}>
                      <svg className="w-5 h-5 inline mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      Informations Professionnelles
                    </h3>
                    <div className="space-y-4">
                      {user?.company && (
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <div>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('profile.company')}</span>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user.company}</p>
                          </div>
                        </div>
                      )}
                      {user?.position && (
                        <div className="flex items-center space-x-3">
                          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6m8 0H8" />
                          </svg>
                          <div>
                            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('profile.position')}</span>
                            <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user.position}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {user?.bio && (
                  <div className="md:col-span-2">
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
                      📝 À propos
                    </h3>
                    <p className={`${isDark ? 'text-gray-300 bg-gray-700' : 'text-gray-700 bg-gray-50'} leading-relaxed p-4 rounded-lg`}>
                      {user.bio}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

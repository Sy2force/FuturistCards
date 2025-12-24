import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, clearError } = useAuth();
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default role
  });
  const [validationError, setValidationError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    clearError();
    setValidationError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setValidationError(t('required'));
      return false;
    }

    if (formData.password.length < 8) {
      setValidationError(t('passwordTooShort'));
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setValidationError(t('passwordsNotMatch'));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSuccess('');
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      const result = await register(userData);
      
      if (result.success) {
        setSuccess(t('registerSuccess'));
        setTimeout(() => {
          navigate('/cards');
        }, 1500);
      }
    } catch (err) {
      // Erreur gérée par AuthContext
    }
  };

  const displayError = validationError || error;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'} flex flex-col justify-center py-12 px-4 ${isRTL ? 'rtl' : 'ltr'}`} data-testid="register-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-white'} mb-4 animate-float`}>
            {t('registerPageTitle')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-indigo-200'}`}>
            {t('registerPageSubtitle')}
          </p>
        </div>

        <div className={`${isDark ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700' : 'bg-white/10 backdrop-blur-lg border border-white/20'} rounded-2xl p-8 shadow-2xl w-full max-w-md`}>
          {displayError && (
            <div className={`mb-6 p-4 ${isDark ? 'bg-red-900/30 border border-red-700/50' : 'bg-red-500/20 border border-red-400/30'} rounded-lg backdrop-blur-sm`}>
              <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-200'} font-medium`}>{displayError}</p>
            </div>
          )}

          {success && (
            <div className={`mb-6 p-4 ${isDark ? 'bg-green-900/30 border border-green-700/50' : 'bg-green-500/20 border border-green-400/30'} rounded-lg backdrop-blur-sm`}>
              <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-200'} font-medium`}>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" data-testid="register-form">
            <div>
              <label htmlFor="firstName" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('firstName')}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('firstNamePlaceholder')}
                required
                data-testid="firstName-input"
              />
            </div>

            <div>
              <label htmlFor="lastName" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('lastName')}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('lastNamePlaceholder')}
                required
                data-testid="lastName-input"
              />
            </div>

            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('emailPlaceholder')}
                required
                data-testid="email-input"
              />
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('passwordPlaceholder')}
                required
                data-testid="password-input"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('confirmPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                placeholder={t('confirmPasswordPlaceholder')}
                required
                data-testid="confirmPassword-input"
              />
            </div>

            <div>
              <label htmlFor="role" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('accountType')}
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                data-testid="role-select"
              >
                <option value="user" className="bg-gray-800 text-white">{t('userAccount')}</option>
                <option value="business" className="bg-gray-800 text-white">{t('businessAccount')}</option>
                <option value="admin" className="bg-gray-800 text-white">{t('adminAccount')}</option>
              </select>
              <p className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-white/70'}`}>
                {formData.role === 'user' && t('userAccountDesc')}
                {formData.role === 'business' && t('businessAccountDesc')}
                {formData.role === 'admin' && t('adminAccountDesc')}
              </p>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full ${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 focus:ring-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 focus:ring-blue-400'} text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105`}
                disabled={loading}
                data-testid="register-submit-button"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  t('registerSubmit')
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-white/80'}`}>
              {t('haveAccount')} {' '}
              <Link 
                to="/login" 
                className={`font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-300 hover:text-blue-200'} transition-colors`}
                data-testid="login-link"
              >
                {t('login')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

// Booking.com style icons
const EmailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.12 1.39 3.12 3.1V8h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v12z"/>
  </svg>
);


const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuth();
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    clearError();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    try {
      setSuccess('');
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        setSuccess(t('loginSuccess'));
        // Navigation immédiate vers /cards pour tous les rôles (pour les tests Playwright)
        window.location.href = '/cards';
      }
    } catch (err) {
      // Erreur gérée par AuthContext
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'} flex flex-col justify-center py-12 px-4 ${isRTL ? 'rtl' : 'ltr'}`} data-testid="login-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-white'} mb-4 animate-float`}>
            {t('loginPageTitle')}
          </h2>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-indigo-200'}`}>
            {t('loginPageSubtitle')}
          </p>
        </div>

        <div className={`${isDark ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700' : 'bg-white/10 backdrop-blur-lg border border-white/20'} rounded-2xl p-8 shadow-2xl w-full max-w-md`}>
          {error && (
            <div className={`mb-6 p-4 ${isDark ? 'bg-red-900/30 border border-red-700/50' : 'bg-red-500/20 border border-red-400/30'} rounded-lg backdrop-blur-sm`}>
              <p className={`text-sm ${isDark ? 'text-red-300' : 'text-red-200'} font-medium`}>{error}</p>
            </div>
          )}

          {success && (
            <div className={`mb-6 p-4 ${isDark ? 'bg-green-900/30 border border-green-700/50' : 'bg-green-500/20 border border-green-400/30'} rounded-lg backdrop-blur-sm`}>
              <p className={`text-sm ${isDark ? 'text-green-300' : 'text-green-200'} font-medium`}>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" data-testid="login-form">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('email')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDark ? 'text-gray-400' : 'text-white/60'}`}>
                  <EmailIcon />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                  placeholder={t('emailPlaceholder')}
                  required
                  data-testid="login-email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${isDark ? 'text-gray-200' : 'text-white'} mb-2`}>
                {t('password')}
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${isDark ? 'text-gray-400' : 'text-white/60'}`}>
                  <LockIcon />
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border ${isDark ? 'border-gray-600 bg-gray-700/50 text-white placeholder-gray-400 hover:bg-gray-600/50 focus:ring-blue-500' : 'border-white/30 bg-white/10 text-white placeholder-white/60 hover:bg-white/20 focus:ring-blue-400'} rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                  placeholder={t('passwordPlaceholder')}
                  required
                  data-testid="login-password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password}
                className={`w-full ${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800' : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'} text-white py-3 px-4 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105`}
                data-testid="login-submit"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  t('loginSubmit')
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-white/80'}`}>
              {t('noAccount')} {' '}
              <Link to="/register" data-testid="register-link" className={`font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-300 hover:text-blue-200'} transition-colors`}>
                {t('register')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

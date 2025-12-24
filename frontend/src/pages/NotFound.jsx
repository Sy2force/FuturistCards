import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

const NotFound = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50'} flex items-center justify-center px-4`}>
      <div className="text-center max-w-md mx-auto">
        <div className={`${isDark ? 'bg-white/5 backdrop-blur-sm border-white/10' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 border`}>
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-white">404</span>
          </div>
          <h2 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('pageNotFound')}</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            {t('pageNotFoundDescription')}
          </p>
          
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 hover-lift hover-glow shadow-3d"
            >
              {t('backToHome')}
            </Link>
            
            <Link
              to="/cards"
              className={`block px-6 py-3 border ${isDark ? 'border-gray-600 hover:border-blue-400 text-white hover:text-blue-400' : 'border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600'} rounded-lg font-semibold transition-all duration-300 hover-lift`}
            >
              {t('viewCards')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

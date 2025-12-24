import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

const UnauthorizedPage = () => {
  const { t, dir } = useI18n();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`} data-testid="unauthorized-page" dir={dir}>
      <div className="text-center max-w-md mx-auto p-8">
        <div className={`${isDark ? 'bg-gray-800/80 backdrop-blur-lg border border-gray-700' : 'bg-white/80 backdrop-blur-lg border border-white/20'} rounded-xl shadow-xl p-8`}>
          <div className="text-6xl mb-4">🔒</div>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('unauthorized.title')}</h2>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            {t('unauthorized.message')}
          </p>
          <div className="space-y-3">
            <Link
              to="/cards"
              className={`block px-6 py-3 ${isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105`}
              data-testid="back-to-cards"
            >
              {t('unauthorized.backToCards')}
            </Link>
            <Link
              to="/"
              className={`block px-6 py-3 ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'} rounded-lg font-semibold transition-all duration-200 transform hover:scale-105`}
              data-testid="back-to-home"
            >
              {t('unauthorized.backToHome')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

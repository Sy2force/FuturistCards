import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

const AboutPage = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-12 px-4`} data-testid="about-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('aboutTitle')}</h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('aboutDescription')}</p>
        </div>

        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-2xl p-8 shadow-md border backdrop-blur-sm`}>
          <div className="prose max-w-none">
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
              {t('revolutionizeContacts')}
            </p>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
              {t('modernPlatform')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{t('fastCreation')}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('createInMinutes')}</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{t('easySharing')}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('accessibleEverywhere')}</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{t('secure')}</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{t('dataProtected')}</p>
              </div>
            </div>

            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
              {t('professionalDescription')}
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">{t('readyToStart')}</h3>
            <p className="text-blue-100 mb-6">{t('joinThousands')}</p>
            <Link 
              to={user ? "/create-card" : "/register"}
              data-testid="about-cta-button"
              className="inline-block px-8 py-3 bg-white text-blue-600 hover:bg-gray-50 rounded-lg font-semibold shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl"
            >
              {user ? t('createCard') : t('createMyAccount')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

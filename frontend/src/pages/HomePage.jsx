import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../contexts/I18nContext';
import { useTheme } from '../contexts/ThemeContext';

const HomePage = () => {
  const { user } = useAuth();
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} ${isRTL ? 'rtl' : 'ltr'}`} data-testid="home-page">
      
      {/* Hero Section - Booking.com style */}
      <section data-testid="home-hero" className={`relative py-16 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center px-4 py-2 ${isDark ? 'bg-blue-900/30 border-blue-400/30 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-600'} rounded-full text-sm font-semibold mb-8 backdrop-blur-sm`}>
              ✨ {t('heroTagline')}
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 leading-tight animate-float`}>
              {t('homeTitle')}
              <span className={`block text-2xl md:text-3xl mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} font-normal`}>
                {t('homeSubtitle')}
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto mb-8 leading-relaxed`}>
              {t('homeDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={user ? "/cards" : "/register"}
                data-testid="cta-primary"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105 inline-flex items-center gap-2"
              >
                {user ? t('myCards') : t('createAccount')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                to="/cards"
                data-testid="cta-secondary"
                className={`px-8 py-4 border-2 ${isDark ? 'border-gray-600 hover:border-blue-400 text-gray-300 hover:text-blue-400' : 'border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600'} rounded-lg font-semibold transition-all duration-200 hover:shadow-md backdrop-blur-sm`}
              >
                {t('exploreCards')}
              </Link>
            </div>
            
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-8`}>
              {t('heroFeatures')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Booking.com style */}
      <section data-testid="home-features" className={`py-16 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {t('whyChooseUs')}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              {t('whyChooseUsDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div data-testid="feature-card-1" className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm hover:scale-105`}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('fastCreation')}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('fastCreationDescription')}
              </p>
            </div>

            <div data-testid="feature-card-2" className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm hover:scale-105`}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('easySharing')}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('easySharingDescription')}
              </p>
            </div>

            <div data-testid="feature-card-3" className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm hover:scale-105`}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('secure')}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('secureDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Booking.com style */}
      <section data-testid="home-cta" className="py-16 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-pulse-glow">
            {t('readyToCreate')}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('joinProfessionals')}
          </p>
          <Link
            to={user ? "/create-card" : "/register"}
            data-testid="cta-register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
          >
            {user ? t('createCard') : t('startNow')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';
import { useCardsStats } from '../contexts/CardsStatsContext';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { user } = useAuth();
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  const { globalStats } = useCardsStats();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} ${isRTL ? 'rtl' : 'ltr'}`} data-testid="home-page">
      
      {/* Hero Section */}
      <section className={`relative py-16 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`} data-testid="home-hero">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className={`inline-flex items-center px-4 py-2 ${isDark ? 'bg-blue-900/30 border-blue-400/30 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-600'} rounded-full text-sm font-semibold mb-8 backdrop-blur-sm`}>
              ✨ {t('home.heroTagline')}
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6 leading-tight animate-float`}>
              {t('home.title')}
              <span className={`block text-2xl md:text-3xl mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'} font-normal`}>
                {t('home.subtitle')}
              </span>
            </h1>
            
            <p className={`text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto mb-8 leading-relaxed`}>
              {t('home.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to={user ? "/cards" : "/register"}
                data-testid="home-cta-primary"
                className="btn-primary inline-flex items-center gap-2"
              >
                {user ? t('home.exploreCards') : t('home.createAccount')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link
                to="/cards"
                data-testid="home-cta-secondary"
                className={`px-8 py-4 border-2 ${isDark ? 'border-gray-600 hover:border-blue-400 text-gray-300 hover:text-blue-400' : 'border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600'} rounded-lg font-semibold transition-all duration-200 hover:shadow-md backdrop-blur-sm`}
              >
                {t('home.exploreCards')}
              </Link>
            </div>
            
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
              {t('home.heroFeatures')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section data-testid="home-features" className={`py-16 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {t('home.whyChooseUs')}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              {t('home.whyChooseUsDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div data-testid="feature-card-1" className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm hover:scale-105`}>
              <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('home.fastCreation')}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('home.fastCreationDescription')}
              </p>
            </div>

            <div data-testid="feature-card-2" className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm hover:scale-105`}>
              <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('home.easySharing')}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('home.easySharingDescription')}
              </p>
            </div>

            <div data-testid="feature-card-3" className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm hover:scale-105`}>
              <div className="w-12 h-12 primary-gradient rounded-lg flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('home.secure')}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('home.secureDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`} data-testid="home-stats">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {t('home.liveStats')}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              {t('home.liveStatsDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`${isDark ? 'card-container border-blue-400/30' : 'card-container border-blue-200'} rounded-xl p-8 text-center border backdrop-blur-sm hover:scale-105 transition-all duration-300`}
            >
              <div className="w-16 h-16 primary-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className={`text-3xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                {globalStats.totalCards || 0}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
                {t('home.totalCards')}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${isDark ? 'card-container border-red-400/30' : 'card-container border-red-200'} rounded-xl p-8 text-center border backdrop-blur-sm hover:scale-105 transition-all duration-300`}
            >
              <div className="w-16 h-16 danger-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className={`text-3xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'} mb-2`}>
                {globalStats.totalLikes || 0}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
                {t('home.totalLikes')}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${isDark ? 'card-container border-green-400/30' : 'card-container border-green-200'} rounded-xl p-8 text-center border backdrop-blur-sm hover:scale-105 transition-all duration-300`}
            >
              <div className="w-16 h-16 success-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'} mb-2`}>
                {globalStats.totalViews || 0}
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
                {t('home.totalViews')}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`} data-testid="home-testimonials">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {t('home.testimonials')}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              {t('home.testimonialsDescription')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 primary-gradient rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('home.testimonials.author1')}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home.testimonials.role1')}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                &ldquo;{t('home.testimonial1')}&rdquo;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 success-gradient rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  J
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('home.testimonials.author2')}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home.testimonials.role2')}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                &ldquo;{t('home.testimonial2')}&rdquo;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-200 border backdrop-blur-sm`}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 danger-gradient rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('home.testimonials.author3')}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t('home.testimonials.role3')}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 italic">
                &ldquo;{t('home.testimonial3')}&rdquo;
              </p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={`py-16 px-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`} data-testid="home-faq">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>
              {t('home.faq')}
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
              {t('home.faqDescription')}
            </p>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-xl p-6 border`}
            >
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                {t('home.faq1Question')}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('home.faq1Answer')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-xl p-6 border`}
            >
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                {t('home.faq2Question')}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('home.faq2Answer')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${isDark ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-xl p-6 border`}
            >
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>
                {t('home.faq3Question')}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('home.faq3Answer')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section data-testid="home-cta" className="py-16 px-4 primary-gradient">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-pulse-glow">
            {t('home.readyToCreate')}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('home.joinProfessionals')}
          </p>
          <Link
            to={user ? "/create-card" : "/register"}
            data-testid="cta-register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 hover:scale-105"
          >
            {user ? t('navbar.createCard') : t('home.startNow')}
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

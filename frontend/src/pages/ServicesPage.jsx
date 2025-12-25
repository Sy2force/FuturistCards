import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';

const ServicesPage = () => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { isDark } = useTheme();
  const services = [
    {
      id: 1,
      titleKey: 'digitalBusinessCard',
      descriptionKey: 'digitalCardDescription',
      icon: "M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z",
      featuresKeys: ['customDesign', 'qrCodeIntegrated', 'instantSharing', 'analyticsIncluded'],
      priceKey: 'free'
    },
    {
      id: 2,
      titleKey: 'premiumCard',
      descriptionKey: 'premiumCardDescription',
      icon: "M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z",
      featuresKeys: ['premiumTemplates', 'customBranding', 'advancedStats', 'prioritySupport'],
      priceKey: 'premiumPrice'
    },
    {
      id: 3,
      titleKey: 'enterpriseSolution',
      descriptionKey: 'enterpriseDescription',
      icon: "M16 4C18.2 4 20 5.8 20 8V16C20 18.2 18.2 20 16 20H8C5.8 20 4 18.2 4 16V8C4 5.8 5.8 4 8 4H16ZM16 6H8C6.9 6 6 6.9 6 8V16C6 17.1 6.9 18 8 18H16C17.1 18 18 17.1 18 16V8C18 6.9 17.1 6 16 6Z",
      featuresKeys: ['teamManagement', 'customApi', 'crmIntegrations', 'trainingIncluded'],
      priceKey: 'onQuote'
    }
  ];

  return (
    <div className={`min-h-screen py-12 px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'}`} data-testid="services-page">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            {t('ourServices')}
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto mb-8`}>
            {t('servicesDescription')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div 
              key={service.id}
              data-testid={`service-card-${service.id}`}
              className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl shadow-3d hover-lift border p-8 animate-fade-in`}
              style={{animationDelay: `${service.id * 0.1}s`}}
            >
              <div className="w-16 h-16 gradient-primary rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d={service.icon} />
                </svg>
              </div>
              
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t(service.titleKey)}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 leading-relaxed`}>{t(service.descriptionKey)}</p>
              
              <ul className="space-y-3 mb-8">
                {service.featuresKeys.map((featureKey, index) => (
                  <li key={index} className={`flex items-center ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t(featureKey)}
                  </li>
                ))}
              </ul>
              
              <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-6`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold gradient-text">{t(service.priceKey)}</span>
                </div>
                <Link
                  to={user ? "/create-card" : "/register"}
                  data-testid={`service-cta-${service.id}`}
                  className="w-full block text-center px-6 py-3 gradient-primary hover-lift hover-glow text-white rounded-lg font-medium shadow-3d transition-all duration-300"
                >
                  {user ? t('createCard') : t('getStarted')}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border mb-16 animate-fade-in`} style={{animationDelay: '0.4s'}}>
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>{t('frequentlyAskedQuestions')}</h2>
            <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('faqDescription')}</p>
          </div>

          <div className="space-y-6">
            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>{t('howToCreateFirstCard')}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {t('createCardAnswer')}
              </p>
            </div>

            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>{t('canCustomizeDesign')}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {t('customizeDesignAnswer')}
              </p>
            </div>

            <div className={`${isDark ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-3`}>{t('howToShareCard')}</h3>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                {t('shareCardAnswer')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="gradient-primary rounded-2xl p-8 shadow-3d text-center animate-fade-in" style={{animationDelay: '0.5s'}}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('readyToStart')}
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('createFirstCardMinutes')}
          </p>
          <Link
            to={user ? "/create-card" : "/register"}
            data-testid="services-main-cta"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-50 rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {user ? t('createMyCard') : t('createFreeCard')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;

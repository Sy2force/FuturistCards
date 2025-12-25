import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../hooks/useI18n';
import { useTheme } from '../contexts/ThemeContext';

const ContactPage = () => {
  const { t } = useI18n();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Non fonctionnel - juste pour la démo
    // Message de remerciement envoyé
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${isDark ? 'dark-gradient' : 'glass-gradient'}`} data-testid="contact-page">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">{t('contactUs')}</h1>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{t('hereToHelp')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border animate-fade-in hover-lift`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-6`}>{t('sendMessage')}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('fullName')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  data-testid="contact-name"
                  className={`w-full px-4 py-3 ${isDark ? 'glass-effect text-white placeholder-gray-400 border-white/20' : 'bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-300'} rounded-lg border focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300`}
                  placeholder={t('yourFullName')}
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('emailAddress')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="contact-email"
                  className={`w-full px-4 py-3 ${isDark ? 'glass-effect text-white placeholder-gray-400 border-white/20' : 'bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-300'} rounded-lg border focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300`}
                  placeholder={t('yourEmail')}
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  data-testid="contact-message"
                  className={`w-full px-4 py-3 ${isDark ? 'glass-effect text-white placeholder-gray-400 border-white/20' : 'bg-gray-50 text-gray-800 placeholder-gray-500 border-gray-300'} rounded-lg border focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 resize-none transition-all duration-300`}
                  placeholder={t('describeRequest')}
                />
              </div>

              <button
                type="submit"
                data-testid="contact-submit"
                className="w-full py-3 px-6 gradient-primary hover-lift hover-glow text-white rounded-lg font-semibold shadow-3d transition-all duration-300"
              >
                {t('sendMessageButton')}
              </button>
            </form>
          </div>

          {/* Informations de contact */}
          <div className="space-y-8">
            <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border animate-fade-in hover-lift`} style={{animationDelay: '0.1s'}}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('contactInformation')}</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-800'} font-medium`}>{t('email')}</p>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('contactEmail')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-800'} font-medium`}>{t('hours')}</p>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('businessHours')}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className={`${isDark ? 'text-white' : 'text-gray-800'} font-medium`}>{t('location')}</p>
                    <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t('parisLocation')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isDark ? 'glass-effect border-white/20' : 'bg-white/80 backdrop-blur-lg border-gray-200/50'} rounded-2xl p-8 shadow-3d border animate-fade-in hover-lift`} style={{animationDelay: '0.2s'}}>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'} mb-4`}>{t('technicalSupport')}</h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {t('supportDescription')}
              </p>
              <div className="flex space-x-4">
                <Link to="/about" className="px-4 py-2 gradient-secondary hover-lift text-white rounded-lg font-medium inline-block text-center transition-all duration-300">
                  {t('faq')}
                </Link>
                <Link to="/terms" className={`px-4 py-2 ${isDark ? 'glass-effect border-white/20 text-white' : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'} hover-lift rounded-lg font-medium border inline-block text-center transition-all duration-300`}>
                  {t('documentation')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

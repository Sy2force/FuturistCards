import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const AboutPageSimple = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            {t('aboutFuturistCards')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('modernPlatformDescription')}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Mission */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('ourMission')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('missionDescription')}
            </p>
          </div>

          {/* Fonctionnalités */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t('features')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="text-blue-500 text-2xl">🎨</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('modernDesign')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('elegantResponsiveInterface')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-green-500 text-2xl">🔒</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('secure')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('jwtAuthValidation')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-purple-500 text-2xl">⚡</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('performant')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('modernReactTechnology')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="text-orange-500 text-2xl">📱</div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t('mobileFirst')}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {t('optimizedAllDevices')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t('technologiesUsed')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl mb-2">⚛️</div>
                <p className="font-medium text-gray-900 dark:text-gray-100">React 18</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">🟢</div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Node.js</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl mb-2">🍃</div>
                <p className="font-medium text-gray-900 dark:text-gray-100">MongoDB</p>
              </div>
              <div className="text-center p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                <div className="text-2xl mb-2">🎨</div>
                <p className="font-medium text-gray-900 dark:text-gray-100">Tailwind</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('contact')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('contactDescription')}
            </p>
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">
                📧 {t('email')} : contact@futuristcards.com
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                🌐 {t('website')} : www.futuristcards.com
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              {t('readyToStart')}
            </h2>
            <p className="mb-6 opacity-90">
              {t('joinThousandsProfessionals')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                {t('createAccount')}
              </Link>
              <Link 
                to="/cards" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t('exploreCards')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageSimple;

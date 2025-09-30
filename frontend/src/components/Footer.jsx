import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              FuturistCards
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('modernPlatformDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link to="/cards" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  {t('cards')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  {t('about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('contact')}
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                {t('email')}: contact@futuristcards.com
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {t('phone')}: +33 1 23 45 67 89
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 FuturistCards. {t('allRightsReserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

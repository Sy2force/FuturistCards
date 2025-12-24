import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';

const Footer = () => {
  const { t } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-dark dark:bg-gray-900 border-t border-white/10 dark:border-gray-700 py-12 shadow-3d">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-400 dark:text-gray-300 mb-2">
            © {currentYear} FuturistCards. {t('allRightsReserved')}.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400 dark:text-gray-300">
            <Link 
              to="/about" 
              className="hover:text-white dark:hover:text-blue-400 hover-lift transition-colors"
              data-testid="footer-link-about"
            >
              {t('about')}
            </Link>
            <span>•</span>
            <Link 
              to="/contact" 
              className="hover:text-white dark:hover:text-blue-400 hover-lift transition-colors"
              data-testid="footer-link-contact"
            >
              {t('contact')}
            </Link>
            <span>•</span>
            <Link 
              to="/privacy" 
              className="hover:text-white dark:hover:text-blue-400 hover-lift transition-colors"
              data-testid="footer-link-privacy"
            >
              {t('privacy')}
            </Link>
            <span>•</span>
            <Link 
              to="/terms" 
              className="hover:text-white dark:hover:text-blue-400 hover-lift transition-colors"
              data-testid="footer-link-terms"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

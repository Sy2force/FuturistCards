import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              CardPro
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {'modernPlatformDescription'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {'quickLinks'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  {'Accueil'}
                </Link>
              </li>
              <li>
                <Link to="/cards" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  {'Cartes'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                  {'À propos'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {'contact'}
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                {'Email'}: contact@futuristcards.com
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {'Téléphone'}: +33 1 23 45 67 89
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <a 
                  href="https://www.linkedin.com/in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 CardPro. {'allRightsReserved'}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

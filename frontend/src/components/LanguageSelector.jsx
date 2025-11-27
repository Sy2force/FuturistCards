import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'he', name: 'עברית', flag: '🇮🇱' }
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
    // Set document direction for RTL languages
    document.documentElement.dir = languageCode === 'he' ? 'rtl' : 'ltr';
  };

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        data-testid="language-selector"
      >
        <GlobeAltIcon className="w-4 h-4" />
        <span className="text-sm font-medium">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
        </span>
      </motion.button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1">
          {languages.map((language) => (
            <motion.button
              key={language.code}
              whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              onClick={() => changeLanguage(language.code)}
              className={`w-full text-left px-4 py-2 text-sm flex items-center space-x-2 transition-colors ${
                i18n.language === language.code
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              data-testid={`language-option-${language.code}`}
            >
              <span className="text-base">{language.flag}</span>
              <span>{language.name}</span>
              {i18n.language === language.code && (
                <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;

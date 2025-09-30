import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSelector = () => {
  // Get language context
  const { language, changeLanguage, availableLanguages, currentLanguageInfo } = useLanguage();
  // Toggle dropdown state
  const [isOpen, setIsOpen] = useState(false);

  // Handle language selection
  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Main dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        aria-label="Select language"
      >
        {/* Globe icon */}
        <GlobeAltIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        {/* Country flag */}
        <span className="text-lg">{currentLanguageInfo.flag}</span>
        {/* Language name */}
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {currentLanguageInfo.nativeName}
        </span>
        {/* Dropdown arrow */}
        <ChevronDownIcon className={`h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform ${
          isOpen ? 'rotate-180' : ''
        }`} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          {/* Dropdown panel */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-20">
            <div className="py-1">
              {/* Language options */}
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    language === lang.code 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {/* Flag emoji */}
                  <span className="text-lg">{lang.flag}</span>
                  {/* Language name */}
                  <span className="text-sm font-medium">{lang.nativeName}</span>
                  {/* Selected indicator */}
                  {language === lang.code && (
                    <span className="ml-auto text-blue-600 dark:text-blue-400">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;

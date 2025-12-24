import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';

const LanguageSelector = () => {
  const { language, changeLanguage, isRTL, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'he', name: 'עברית', flag: '🇮🇱', nativeName: 'עברית' }
  ];

  const currentLang = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Beautiful dropdown button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105
          bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40
          border-2 border-white/20 backdrop-blur-sm
          ${isOpen ? 'ring-2 ring-emerald-300' : ''}
        `}
        data-testid="language-selector"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={t('changeLanguage')}
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="font-medium text-sm">{currentLang.nativeName}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full blur-md opacity-75 -z-10 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className={`
          absolute top-full mt-2 ${isRTL ? 'right-0' : 'left-0'} 
          bg-white/95 dark:bg-gray-800/95 backdrop-blur-md 
          border border-gray-200/50 dark:border-gray-700/50 
          rounded-xl shadow-xl shadow-black/10 dark:shadow-black/30
          min-w-[160px] z-50 overflow-hidden
        `}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 text-left transition-all duration-200
                hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                ${language === lang.code 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300' 
                  : 'text-gray-700 dark:text-gray-300'
                }
                ${isRTL ? 'flex-row-reverse text-right' : ''}
              `}
              role="option"
              aria-selected={language === lang.code}
            >
              <span className="text-lg">{lang.flag}</span>
              <div className="flex-1">
                <div className="font-medium text-sm">{lang.nativeName}</div>
                <div className="text-xs opacity-75">{lang.name}</div>
              </div>
              {language === lang.code && (
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSelector;

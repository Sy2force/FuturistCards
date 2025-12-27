import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly for immediate availability
import frTranslation from '../locales/fr/translation.json';
import enTranslation from '../locales/en/translation.json';
import heTranslation from '../locales/he/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    lng: 'fr',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    resources: {
      fr: {
        translation: frTranslation
      },
      en: {
        translation: enTranslation
      },
      he: {
        translation: heTranslation
      }
    },
  });

export default i18n;

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === 'he' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return {
    t,
    language: i18n.language,
    changeLanguage,
    isRTL: i18n.language === 'he',
    languages: ['en', 'fr', 'he']
  };
};

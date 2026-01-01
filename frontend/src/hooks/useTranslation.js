// Translation hook using static translations
import { t } from '../utils/translations';

export const useTranslation = () => {
  return {
    t,
    i18n: {
      language: 'he',
      dir: () => 'rtl',
      changeLanguage: () => Promise.resolve()
    }
  };
};

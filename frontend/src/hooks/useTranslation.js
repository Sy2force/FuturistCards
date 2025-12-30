// Hook de traduction simplifié - Hébreu uniquement
import { t } from '../utils/translations';

export const useTranslation = () => {
  return {
    t: t,
    i18n: {
      language: 'he',
      dir: () => 'rtl'
    }
  };
};

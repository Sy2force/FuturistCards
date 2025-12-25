import { createContext, useContext, useState, useEffect } from 'react';
import { safeGetItem, safeSetItem } from '../utils/safeStorage';

const I18nContext = createContext();

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    cards: 'Cartes',
    about: 'À propos',
    contact: 'Contact',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    profile: 'Profil',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    create: 'Créer',
    
    // Home page
    homeTitle: 'Cartes de Visite Futuristes',
    homeSubtitle: 'Créez et partagez vos cartes professionnelles',
    
    // Cards
    myCards: 'Mes Cartes',
    createCard: 'Créer une Carte',
    favorites: 'Favoris',
    
    // Auth
    email: 'Email',
    password: 'Mot de passe',
    loginTitle: 'Connexion'
  },
  en: {
    // Navigation
    home: 'Home',
    cards: 'Cards',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    
    // Home page
    homeTitle: 'Futuristic Business Cards',
    homeSubtitle: 'Create and share your professional cards',
    
    // Cards
    myCards: 'My Cards',
    createCard: 'Create Card',
    favorites: 'Favorites',
    
    // Auth
    email: 'Email',
    password: 'Password',
    loginTitle: 'Login'
  },
  he: {
    // Navigation
    home: 'בית',
    cards: 'כרטיסים',
    about: 'אודות',
    contact: 'צור קשר',
    login: 'התחברות',
    register: 'הרשמה',
    logout: 'התנתקות',
    profile: 'פרופיל',
    
    // Common
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    save: 'שמור',
    cancel: 'ביטול',
    delete: 'מחק',
    edit: 'ערוך',
    create: 'צור',
    
    // Home page
    homeTitle: 'כרטיסי ביקור עתידניים',
    homeSubtitle: 'צור ושתף את הכרטיסים המקצועיים שלך',
    
    // Cards
    myCards: 'הכרטיסים שלי',
    createCard: 'צור כרטיס',
    favorites: 'מועדפים',
    
    // Auth
    email: 'אימייל',
    password: 'סיסמה',
    loginTitle: 'התחברות'
  }
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return safeGetItem('language') || 'fr';
  });

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    safeSetItem('language', lang);
  };

  const dir = language === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  const value = {
    language,
    changeLanguage,
    t,
    dir,
    isRTL: language === 'he'
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
};

import React, { createContext, useContext, useState } from 'react';

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
    profile: 'Profil',
    favorites: 'Favoris',
    createCard: 'Créer une carte',
    myCards: 'Mes cartes',
    admin: 'Admin',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    
    // Common
    loading: 'Chargement...',
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    view: 'Voir',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    
    // Likes system
    likes: {
      like: 'J\'aime',
      unlike: 'Je n\'aime plus',
      likes: 'j\'aimes',
      likeThisCard: 'Aimer cette carte',
      unlikeThisCard: 'Retirer j\'aime',
      totalLikes: 'Total j\'aimes'
    }
  },
  
  en: {
    // Navigation
    home: 'Home',
    cards: 'Cards',
    about: 'About',
    profile: 'Profile',
    favorites: 'Favorites',
    createCard: 'Create Card',
    myCards: 'My Cards',
    admin: 'Admin',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Common
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    
    // Likes system
    likes: {
      like: 'Like',
      unlike: 'Unlike',
      likes: 'likes',
      likeThisCard: 'Like this card',
      unlikeThisCard: 'Remove like',
      totalLikes: 'Total likes'
    }
  },
  
  he: {
    // Navigation
    home: 'בית',
    cards: 'כרטיסים',
    about: 'אודות',
    profile: 'פרופיל',
    favorites: 'מועדפים',
    createCard: 'צור כרטיס',
    myCards: 'הכרטיסים שלי',
    admin: 'מנהל',
    login: 'התחברות',
    register: 'הרשמה',
    logout: 'התנתקות',
    
    // Common
    loading: 'טוען...',
    save: 'שמור',
    cancel: 'ביטול',
    delete: 'מחק',
    edit: 'ערוך',
    view: 'צפה',
    back: 'חזור',
    next: 'הבא',
    previous: 'הקודם',
    search: 'חפש',
    filter: 'סנן',
    sort: 'מיין',
    
    // Likes system
    likes: {
      like: 'אהבתי',
      unlike: 'בטל אהבתי',
      likes: 'אהבות',
      likeThisCard: 'אהבתי את הכרטיס הזה',
      unlikeThisCard: 'בטל אהבתי',
      totalLikes: 'סך אהבות'
    }
  }
};

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');
  
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  };
  
  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };
  
  return (
    <I18nContext.Provider value={{ t, language, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

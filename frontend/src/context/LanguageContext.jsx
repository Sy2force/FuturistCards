import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// Translations
const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    cards: 'Cartes',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    profile: 'Profil',
    settings: 'Paramètres',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    delete: 'Supprimer',
    edit: 'Modifier',
    create: 'Créer',
    search: 'Rechercher',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    
    // Cards
    newCard: 'Nouvelle Carte',
    createCard: 'Créer une carte',
    editCard: 'Modifier la carte',
    cardTitle: 'Titre',
    cardSubtitle: 'Sous-titre',
    cardDescription: 'Description',
    phone: 'Téléphone',
    email: 'Email',
    website: 'Site Web',
    address: 'Adresse',
    category: 'Catégorie',
    
    // Auth
    firstName: 'Prénom',
    lastName: 'Nom',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    accountType: 'Type de compte',
    user: 'Utilisateur',
    business: 'Entreprise',
    
    // Messages
    welcomeBack: 'Bon retour',
    cardCreated: 'Carte créée avec succès',
    cardUpdated: 'Carte mise à jour',
    cardDeleted: 'Carte supprimée',
    loginSuccess: 'Connexion réussie',
    logoutSuccess: 'Déconnexion réussie',
    
    // Features
    chat: 'Chat',
    messages: 'Messages',
    notifications: 'Notifications',
    location: 'Localisation',
    favorites: 'Favoris',
    likes: 'J\'aime',
    views: 'Vues',
    
    // Themes
    lightTheme: 'Thème Clair',
    darkTheme: 'Thème Sombre',
    language: 'Langue'
  },
  
  en: {
    // Navigation
    home: 'Home',
    cards: 'Cards',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    settings: 'Settings',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Cards
    newCard: 'New Card',
    createCard: 'Create Card',
    editCard: 'Edit Card',
    cardTitle: 'Title',
    cardSubtitle: 'Subtitle',
    cardDescription: 'Description',
    phone: 'Phone',
    email: 'Email',
    website: 'Website',
    address: 'Address',
    category: 'Category',
    
    // Auth
    firstName: 'First Name',
    lastName: 'Last Name',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    accountType: 'Account Type',
    user: 'User',
    business: 'Business',
    
    // Messages
    welcomeBack: 'Welcome Back',
    cardCreated: 'Card created successfully',
    cardUpdated: 'Card updated',
    cardDeleted: 'Card deleted',
    loginSuccess: 'Login successful',
    logoutSuccess: 'Logout successful',
    
    // Features
    chat: 'Chat',
    messages: 'Messages',
    notifications: 'Notifications',
    location: 'Location',
    favorites: 'Favorites',
    likes: 'Likes',
    views: 'Views',
    
    // Themes
    lightTheme: 'Light Theme',
    darkTheme: 'Dark Theme',
    language: 'Language'
  },
  
  he: {
    // Navigation
    home: 'בית',
    cards: 'כרטיסים',
    login: 'התחברות',
    register: 'הרשמה',
    logout: 'התנתקות',
    profile: 'פרופיל',
    settings: 'הגדרות',
    
    // Common
    save: 'שמור',
    cancel: 'בטל',
    delete: 'מחק',
    edit: 'ערוך',
    create: 'צור',
    search: 'חפש',
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    
    // Cards
    newCard: 'כרטיס חדש',
    createCard: 'צור כרטיס',
    editCard: 'ערוך כרטיס',
    cardTitle: 'כותרת',
    cardSubtitle: 'כותרת משנה',
    cardDescription: 'תיאור',
    phone: 'טלפון',
    email: 'אימייל',
    website: 'אתר אינטרנט',
    address: 'כתובת',
    category: 'קטגוריה',
    
    // Auth
    firstName: 'שם פרטי',
    lastName: 'שם משפחה',
    password: 'סיסמה',
    confirmPassword: 'אשר סיסמה',
    accountType: 'סוג חשבון',
    user: 'משתמש',
    business: 'עסק',
    
    // Messages
    welcomeBack: 'ברוך שובך',
    cardCreated: 'הכרטיס נוצר בהצלחה',
    cardUpdated: 'הכרטיס עודכן',
    cardDeleted: 'הכרטיס נמחק',
    loginSuccess: 'התחברות הצליחה',
    logoutSuccess: 'התנתקות הצליחה',
    
    // Features
    chat: 'צ\'אט',
    messages: 'הודעות',
    notifications: 'התראות',
    location: 'מיקום',
    favorites: 'מועדפים',
    likes: 'לייקים',
    views: 'צפיות',
    
    // Themes
    lightTheme: 'ערכת נושא בהירה',
    darkTheme: 'ערכת נושא כהה',
    language: 'שפה'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Apply RTL for Hebrew
  useEffect(() => {
    const root = document.documentElement;
    if (language === 'he') {
      root.setAttribute('dir', 'rtl');
      root.classList.add('rtl');
    } else {
      root.setAttribute('dir', 'ltr');
      root.classList.remove('rtl');
    }
    
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    isRTL: language === 'he'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

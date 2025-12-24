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
    
    // HomePage
    heroTagline: 'Plateforme de cartes de visite numériques',
    homeTitle: 'FuturistCards',
    homeSubtitle: 'L\'avenir des cartes de visite',
    homeDescription: 'Créez, partagez et gérez vos cartes de visite professionnelles en ligne avec style et simplicité.',
    createAccount: 'Créer un compte',
    exploreCards: 'Explorer les cartes',
    heroFeatures: '✨ Création rapide • 🔗 Partage facile • 🔒 Sécurisé',
    whyChooseUs: 'Pourquoi nous choisir ?',
    whyChooseUsDescription: 'Découvrez les avantages de notre plateforme moderne',
    fastCreation: 'Création rapide',
    fastCreationDescription: 'Créez votre carte de visite professionnelle en quelques minutes seulement.',
    easySharing: 'Partage facile',
    easySharingDescription: 'Partagez vos informations instantanément via QR code ou lien direct.',
    secure: 'Sécurisé',
    secureDescription: 'Vos données sont protégées avec les dernières technologies de sécurité.',
    readyToCreate: 'Prêt à créer votre carte ?',
    joinProfessionals: 'Rejoignez des milliers de professionnels qui utilisent déjà FuturistCards.',
    startNow: 'Commencer maintenant',
    
    // AboutPage
    aboutTitle: 'À propos de FuturistCards',
    aboutDescription: 'Nous révolutionnons la façon dont les professionnels partagent leurs informations de contact.',
    digitalFuture: 'L\'avenir numérique',
    revolutionizeContacts: 'Nous révolutionnons la façon dont les professionnels partagent leurs informations de contact avec une approche moderne et innovante.',
    modernPlatform: 'Notre plateforme moderne offre une expérience utilisateur exceptionnelle avec des fonctionnalités avancées et un design élégant.',
    createInMinutes: 'Créez votre carte professionnelle en quelques minutes',
    accessibleEverywhere: 'Accessible partout, sur tous les appareils',
    professionalDescription: 'Rejoignez une communauté de professionnels qui font confiance à FuturistCards pour leurs besoins de networking et de partage d\'informations.',
    readyToStart: 'Prêt à commencer ?',
    joinThousands: 'Rejoignez des milliers de professionnels satisfaits',
    createMyAccount: 'Créer mon compte',
    
    // CardsPage
    allCards: 'Toutes les cartes',
    discoverCards: 'Découvrir les cartes',
    exploreCollection: 'Explorez notre collection',
    offlineMode: 'Mode hors ligne',
    noCardsAvailable: 'Aucune carte disponible',
    loadingCards: 'Chargement des cartes...',
    errorLoadingCards: 'Erreur lors du chargement des cartes',
    connectionError: 'Erreur de connexion',
    searchCards: 'Rechercher des cartes...',
    filterByCategory: 'Filtrer par catégorie',
    allCategories: 'Toutes les catégories',
    viewCard: 'Voir la carte',
    cardDetails: 'Détails de la carte',
    
    // FavoritesPage
    favoritesTitle: 'Mes Favoris',
    favoritesSubtitle: 'Cartes que vous avez aimées',
    noFavorites: 'Aucun favori pour le moment',
    noFavoritesDescription: 'Commencez à aimer des cartes pour les voir ici',
    searchFavorites: 'Rechercher dans vos favoris...',
    sortBy: 'Trier par',
    sortRecent: 'Plus récents',
    sortLikes: 'Plus aimés',
    sortAlphabetical: 'Alphabétique',
    removeFavorite: 'Retirer des favoris',
    clearAllFavorites: 'Vider tous les favoris',
    confirmClearAllFavorites: 'Êtes-vous sûr de vouloir supprimer tous vos favoris ?',
    errorLoadingFavorites: 'Erreur lors du chargement des favoris',
    
    // MyCardsPage
    myCardsTitle: 'Mes Cartes',
    myCardsSubtitle: 'Gérez vos cartes de visite',
    noCardsYet: 'Aucune carte créée',
    noCardsDescription: 'Créez votre première carte de visite professionnelle',
    createFirstCard: 'Créer ma première carte',
    editCard: 'Modifier la carte',
    deleteCard: 'Supprimer la carte',
    confirmDeleteCard: 'Êtes-vous sûr de vouloir supprimer cette carte ?',
    cardDeleted: 'Carte supprimée avec succès',
    errorLoadingYourCards: 'Erreur lors du chargement de vos cartes',
    errorDeletingCard: 'Erreur lors de la suppression de la carte',
    myBusinessCards: 'Mes Cartes de Visite',
    manageCards: 'Gérez vos cartes de visite professionnelles',
    accountAdmin: 'Administrateur',
    accountBusiness: 'Entreprise',
    createNewCard: 'Créer une nouvelle carte',
    noCardsCreated: 'Aucune carte créée',
    createFirstCardAction: 'Créer ma première carte',
    loadingYourCards: 'Chargement de vos cartes...',
    confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette carte ?',
    errorDeleting: 'Erreur lors de la suppression',
    views: 'vues',
    createdOn: 'Créé le',
    cardStatistics: 'Statistiques des cartes',
    cardsCreated: 'Cartes créées',
    averageLikes: 'Moyenne j\'aimes',
    
    // ProfilePage
    profileTitle: 'Mon Profil',
    profileSubtitle: 'Gérez vos informations personnelles',
    personalInfo: 'Informations personnelles',
    accountSettings: 'Paramètres du compte',
    changePassword: 'Changer le mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmNewPassword: 'Confirmer le nouveau mot de passe',
    updateProfile: 'Mettre à jour le profil',
    profileUpdated: 'Profil mis à jour avec succès',
    errorUpdatingProfile: 'Erreur lors de la mise à jour du profil',
    
    // AdminPage
    adminTitle: 'Administration',
    adminSubtitle: 'Gestion des utilisateurs et cartes',
    totalUsers: 'Utilisateurs totaux',
    totalCards: 'Cartes totales',
    totalLikes: 'J\'aimes totaux',
    recentActivity: 'Activité récente',
    userManagement: 'Gestion des utilisateurs',
    cardManagement: 'Gestion des cartes',
    viewAllUsers: 'Voir tous les utilisateurs',
    viewAllCards: 'Voir toutes les cartes',
    deleteUser: 'Supprimer l\'utilisateur',
    changeUserRole: 'Changer le rôle',
    confirmDeleteUser: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
    userDeleted: 'Utilisateur supprimé avec succès',
    roleChanged: 'Rôle modifié avec succès',
    
    // Common
    hello: 'Bonjour',
    welcome: 'Bienvenue',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    cancel: 'Annuler',
    save: 'Enregistrer',
    delete: 'Supprimer',
    edit: 'Modifier',
    view: 'Voir',
    back: 'Retour',
    next: 'Suivant',
    previous: 'Précédent',
    close: 'Fermer',
    open: 'Ouvrir',
    yes: 'Oui',
    no: 'Non',
    ok: 'OK',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    changeLanguage: 'Changer de langue',
    
    // Error Boundary
    errorOccurred: 'Une erreur est survenue',
    errorMessage: 'Une erreur s\'est produite. Veuillez rafraîchir la page.',
    errorDetails: 'Détails de l\'erreur (dev only)',
    refreshPage: 'Rafraîchir la page',
    
    // Auth
    auth: {
      loginRequired: 'Connexion requise',
      email: 'Email',
      password: 'Mot de passe',
      emailPlaceholder: 'Votre adresse email',
      passwordPlaceholder: 'Votre mot de passe',
      loginTitle: 'Connexion',
      loginSubtitle: 'Connectez-vous à votre compte',
      loginButton: 'Se connecter',
      noAccount: 'Pas de compte ?',
      createAccount: 'Créer un compte',
      forgotPassword: 'Mot de passe oublié ?',
      loginSuccess: 'Connexion réussie',
      loginError: 'Erreur de connexion',
      invalidCredentials: 'Identifiants invalides',
      registerTitle: 'Inscription',
      registerSubtitle: 'Créez votre compte',
      firstName: 'Prénom',
      lastName: 'Nom',
      firstNamePlaceholder: 'Votre prénom',
      lastNamePlaceholder: 'Votre nom',
      confirmPassword: 'Confirmer le mot de passe',
      confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
      registerButton: 'S\'inscrire',
      alreadyHaveAccount: 'Déjà un compte ?',
      accountType: 'Type de compte',
      userAccount: 'Utilisateur',
      businessAccount: 'Entreprise',
      adminAccount: 'Administrateur'
    },
    
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
    
    // HomePage
    heroTagline: 'Digital Business Cards Platform',
    homeTitle: 'FuturistCards',
    homeSubtitle: 'The Future of Business Cards',
    homeDescription: 'Create, share and manage your professional business cards online with style and simplicity.',
    createAccount: 'Create Account',
    exploreCards: 'Explore Cards',
    heroFeatures: '✨ Fast Creation • 🔗 Easy Sharing • 🔒 Secure',
    whyChooseUs: 'Why Choose Us?',
    whyChooseUsDescription: 'Discover the advantages of our modern platform',
    fastCreation: 'Fast Creation',
    fastCreationDescription: 'Create your professional business card in just a few minutes.',
    easySharing: 'Easy Sharing',
    easySharingDescription: 'Share your information instantly via QR code or direct link.',
    secure: 'Secure',
    secureDescription: 'Your data is protected with the latest security technologies.',
    readyToCreate: 'Ready to create your card?',
    joinProfessionals: 'Join thousands of professionals already using FuturistCards.',
    startNow: 'Start Now',
    
    // AboutPage
    aboutTitle: 'About FuturistCards',
    aboutDescription: 'We revolutionize the way professionals share their contact information.',
    digitalFuture: 'Digital Future',
    revolutionizeContacts: 'We revolutionize the way professionals share their contact information with a modern and innovative approach.',
    modernPlatform: 'Our modern platform offers an exceptional user experience with advanced features and elegant design.',
    createInMinutes: 'Create your professional card in minutes',
    accessibleEverywhere: 'Accessible everywhere, on all devices',
    professionalDescription: 'Join a community of professionals who trust FuturistCards for their networking and information sharing needs.',
    readyToStart: 'Ready to get started?',
    joinThousands: 'Join thousands of satisfied professionals',
    createMyAccount: 'Create My Account',
    
    // CardsPage
    allCards: 'All Cards',
    discoverCards: 'Discover Cards',
    exploreCollection: 'Explore our collection',
    offlineMode: 'Offline Mode',
    noCardsAvailable: 'No cards available',
    loadingCards: 'Loading cards...',
    errorLoadingCards: 'Error loading cards',
    connectionError: 'Connection error',
    searchCards: 'Search cards...',
    filterByCategory: 'Filter by category',
    allCategories: 'All categories',
    viewCard: 'View card',
    cardDetails: 'Card details',
    
    // FavoritesPage
    favoritesTitle: 'My Favorites',
    favoritesSubtitle: 'Cards you have liked',
    noFavorites: 'No favorites yet',
    noFavoritesDescription: 'Start liking cards to see them here',
    searchFavorites: 'Search your favorites...',
    sortBy: 'Sort by',
    sortRecent: 'Most recent',
    sortLikes: 'Most liked',
    sortAlphabetical: 'Alphabetical',
    removeFavorite: 'Remove from favorites',
    clearAllFavorites: 'Clear all favorites',
    confirmClearAllFavorites: 'Are you sure you want to remove all your favorites?',
    errorLoadingFavorites: 'Error loading favorites',
    
    // MyCardsPage
    myCardsTitle: 'My Cards',
    myCardsSubtitle: 'Manage your business cards',
    noCardsYet: 'No cards created yet',
    noCardsDescription: 'Create your first professional business card',
    createFirstCard: 'Create my first card',
    editCard: 'Edit card',
    deleteCard: 'Delete card',
    confirmDeleteCard: 'Are you sure you want to delete this card?',
    cardDeleted: 'Card deleted successfully',
    errorLoadingYourCards: 'Error loading your cards',
    errorDeletingCard: 'Error deleting card',
    myBusinessCards: 'My Business Cards',
    manageCards: 'Manage your professional business cards',
    accountAdmin: 'Administrator',
    accountBusiness: 'Business',
    createNewCard: 'Create New Card',
    noCardsCreated: 'No cards created yet',
    createFirstCardAction: 'Create my first card',
    loadingYourCards: 'Loading your cards...',
    confirmDelete: 'Are you sure you want to delete this card?',
    errorDeleting: 'Error deleting card',
    views: 'views',
    createdOn: 'Created on',
    cardStatistics: 'Card Statistics',
    cardsCreated: 'Cards Created',
    averageLikes: 'Average Likes',
    
    // ProfilePage
    profileTitle: 'My Profile',
    profileSubtitle: 'Manage your personal information',
    personalInfo: 'Personal information',
    accountSettings: 'Account settings',
    changePassword: 'Change password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmNewPassword: 'Confirm new password',
    updateProfile: 'Update profile',
    profileUpdated: 'Profile updated successfully',
    errorUpdatingProfile: 'Error updating profile',
    
    // AdminPage
    adminTitle: 'Administration',
    adminSubtitle: 'User and card management',
    totalUsers: 'Total users',
    totalCards: 'Total cards',
    totalLikes: 'Total likes',
    recentActivity: 'Recent activity',
    userManagement: 'User management',
    cardManagement: 'Card management',
    viewAllUsers: 'View all users',
    viewAllCards: 'View all cards',
    deleteUser: 'Delete user',
    changeUserRole: 'Change role',
    confirmDeleteUser: 'Are you sure you want to delete this user?',
    userDeleted: 'User deleted successfully',
    roleChanged: 'Role changed successfully',
    
    // Common
    hello: 'Hello',
    welcome: 'Welcome',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    close: 'Close',
    open: 'Open',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    changeLanguage: 'Change Language',
    
    // Error Boundary
    errorOccurred: 'An error occurred',
    errorMessage: 'An error has occurred. Please refresh the page.',
    errorDetails: 'Error details (dev only)',
    refreshPage: 'Refresh page',
    
    // Auth
    auth: {
      loginRequired: 'Login required',
      email: 'Email',
      password: 'Password',
      emailPlaceholder: 'Your email address',
      passwordPlaceholder: 'Your password',
      loginTitle: 'Login',
      loginSubtitle: 'Sign in to your account',
      loginButton: 'Sign In',
      noAccount: 'No account?',
      createAccount: 'Create account',
      forgotPassword: 'Forgot password?',
      loginSuccess: 'Login successful',
      loginError: 'Login error',
      invalidCredentials: 'Invalid credentials',
      registerTitle: 'Register',
      registerSubtitle: 'Create your account',
      firstName: 'First Name',
      lastName: 'Last Name',
      firstNamePlaceholder: 'Your first name',
      lastNamePlaceholder: 'Your last name',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      registerButton: 'Sign Up',
      alreadyHaveAccount: 'Already have an account?',
      accountType: 'Account Type',
      userAccount: 'User',
      businessAccount: 'Business',
      adminAccount: 'Administrator'
    },
    
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
    
    // HomePage
    heroTagline: 'פלטפורמת כרטיסי ביקור דיגיטליים',
    homeTitle: 'FuturistCards',
    homeSubtitle: 'עתיד כרטיסי הביקור',
    homeDescription: 'צרו, שתפו ונהלו את כרטיסי הביקור המקצועיים שלכם באינטרנט בסטייל ובפשטות.',
    createAccount: 'צור חשבון',
    exploreCards: 'חקור כרטיסים',
    heroFeatures: '✨ יצירה מהירה • 🔗 שיתוף קל • 🔒 מאובטח',
    whyChooseUs: 'למה לבחור בנו?',
    whyChooseUsDescription: 'גלו את היתרונות של הפלטפורמה המודרנית שלנו',
    fastCreation: 'יצירה מהירה',
    fastCreationDescription: 'צרו את כרטיס הביקור המקצועי שלכם תוך דקות ספורות.',
    easySharing: 'שיתוף קל',
    easySharingDescription: 'שתפו את המידע שלכם מיידית באמצעות QR קוד או קישור ישיר.',
    secure: 'מאובטח',
    secureDescription: 'הנתונים שלכם מוגנים בטכנולוגיות האבטחה החדישות ביותר.',
    readyToCreate: 'מוכנים ליצור את הכרטיס שלכם?',
    joinProfessionals: 'הצטרפו לאלפי אנשי מקצוע שכבר משתמשים ב-FuturistCards.',
    startNow: 'התחל עכשיו',
    
    // AboutPage
    aboutTitle: 'אודות FuturistCards',
    aboutDescription: 'אנחנו מחוללים מהפכה באופן שבו אנשי מקצוע משתפים את פרטי הקשר שלהם.',
    digitalFuture: 'עתיד דיגיטלי',
    revolutionizeContacts: 'אנחנו מחוללים מהפכה באופן שבו אנשי מקצוע משתפים את פרטי הקשר שלהם עם גישה מודרנית וחדשנית.',
    modernPlatform: 'הפלטפורמה המודרנית שלנו מציעה חוויית משתמש יוצאת דופן עם תכונות מתקדמות ועיצוב אלגנטי.',
    createInMinutes: 'צרו את הכרטיס המקצועי שלכם תוך דקות',
    accessibleEverywhere: 'נגיש בכל מקום, על כל המכשירים',
    professionalDescription: 'הצטרפו לקהילה של אנשי מקצוע הסומכים על FuturistCards לצרכי הנטוורקינג ושיתוף המידע שלהם.',
    readyToStart: 'מוכנים להתחיל?',
    joinThousands: 'הצטרפו לאלפי אנשי מקצוע מרוצים',
    createMyAccount: 'צור את החשבון שלי',
    
    // CardsPage
    allCards: 'כל הכרטיסים',
    discoverCards: 'גלו כרטיסים',
    exploreCollection: 'חקרו את האוסף שלנו',
    offlineMode: 'מצב לא מקוון',
    noCardsAvailable: 'אין כרטיסים זמינים',
    loadingCards: 'טוען כרטיסים...',
    errorLoadingCards: 'שגיאה בטעינת הכרטיסים',
    connectionError: 'שגיאת חיבור',
    searchCards: 'חפש כרטיסים...',
    filterByCategory: 'סנן לפי קטגוריה',
    allCategories: 'כל הקטגוריות',
    viewCard: 'צפה בכרטיס',
    cardDetails: 'פרטי הכרטיס',
    
    // FavoritesPage
    favoritesTitle: 'המועדפים שלי',
    favoritesSubtitle: 'כרטיסים שאהבתם',
    noFavorites: 'אין מועדפים עדיין',
    noFavoritesDescription: 'התחילו לאהוב כרטיסים כדי לראות אותם כאן',
    searchFavorites: 'חפש במועדפים שלך...',
    sortBy: 'מיין לפי',
    sortRecent: 'הכי חדשים',
    sortLikes: 'הכי אהובים',
    sortAlphabetical: 'אלפביתי',
    removeFavorite: 'הסר מהמועדפים',
    clearAllFavorites: 'נקה את כל המועדפים',
    confirmClearAllFavorites: 'האם אתה בטוח שברצונך להסיר את כל המועדפים?',
    errorLoadingFavorites: 'שגיאה בטעינת המועדפים',
    
    // MyCardsPage
    myCardsTitle: 'הכרטיסים שלי',
    myCardsSubtitle: 'נהל את כרטיסי הביקור שלך',
    noCardsYet: 'עדיין לא נוצרו כרטיסים',
    noCardsDescription: 'צור את כרטיס הביקור המקצועי הראשון שלך',
    createFirstCard: 'צור את הכרטיס הראשון שלי',
    editCard: 'ערוך כרטיס',
    deleteCard: 'מחק כרטיס',
    confirmDeleteCard: 'האם אתה בטוח שברצונך למחוק את הכרטיס הזה?',
    cardDeleted: 'הכרטיס נמחק בהצלחה',
    errorLoadingYourCards: 'שגיאה בטעינת הכרטיסים שלך',
    errorDeletingCard: 'שגיאה במחיקת הכרטיס',
    myBusinessCards: 'כרטיסי הביקור שלי',
    manageCards: 'נהל את כרטיסי הביקור המקצועיים שלך',
    accountAdmin: 'מנהל',
    accountBusiness: 'עסק',
    createNewCard: 'צור כרטיס חדש',
    noCardsCreated: 'עדיין לא נוצרו כרטיסים',
    createFirstCardAction: 'צור את הכרטיס הראשון שלי',
    loadingYourCards: 'טוען את הכרטיסים שלך...',
    confirmDelete: 'האם אתה בטוח שברצונך למחוק את הכרטיס הזה?',
    errorDeleting: 'שגיאה במחיקה',
    views: 'צפיות',
    createdOn: 'נוצר ב',
    cardStatistics: 'סטטיסטיקות כרטיסים',
    cardsCreated: 'כרטיסים שנוצרו',
    averageLikes: 'ממוצע אהבות',
    
    // ProfilePage
    profileTitle: 'הפרופיל שלי',
    profileSubtitle: 'נהל את המידע האישי שלך',
    personalInfo: 'מידע אישי',
    accountSettings: 'הגדרות חשבון',
    changePassword: 'שנה סיסמה',
    currentPassword: 'סיסמה נוכחית',
    newPassword: 'סיסמה חדשה',
    confirmNewPassword: 'אשר סיסמה חדשה',
    updateProfile: 'עדכן פרופיל',
    profileUpdated: 'הפרופיל עודכן בהצלחה',
    errorUpdatingProfile: 'שגיאה בעדכון הפרופיל',
    
    // AdminPage
    adminTitle: 'ניהול',
    adminSubtitle: 'ניהול משתמשים וכרטיסים',
    totalUsers: 'סך המשתמשים',
    totalCards: 'סך הכרטיסים',
    totalLikes: 'סך האהבות',
    recentActivity: 'פעילות אחרונה',
    userManagement: 'ניהול משתמשים',
    cardManagement: 'ניהול כרטיסים',
    viewAllUsers: 'צפה בכל המשתמשים',
    viewAllCards: 'צפה בכל הכרטיסים',
    deleteUser: 'מחק משתמש',
    changeUserRole: 'שנה תפקיד',
    confirmDeleteUser: 'האם אתה בטוח שברצונך למחוק את המשתמש הזה?',
    userDeleted: 'המשתמש נמחק בהצלחה',
    roleChanged: 'התפקיד שונה בהצלחה',
    
    // Common
    hello: 'שלום',
    welcome: 'ברוכים הבאים',
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    cancel: 'ביטול',
    save: 'שמור',
    delete: 'מחק',
    edit: 'ערוך',
    view: 'צפה',
    back: 'חזור',
    next: 'הבא',
    previous: 'הקודם',
    close: 'סגור',
    open: 'פתח',
    yes: 'כן',
    no: 'לא',
    ok: 'אישור',
    search: 'חפש',
    filter: 'סנן',
    sort: 'מיין',
    changeLanguage: 'שנה שפה',
    
    // Error Boundary
    errorOccurred: 'אירעה שגיאה',
    errorMessage: 'אירעה שגיאה. אנא רענן את הדף.',
    errorDetails: 'פרטי השגיאה (פיתוח בלבד)',
    refreshPage: 'רענן דף',
    
    // Auth
    auth: {
      loginRequired: 'נדרשת התחברות',
      email: 'אימייל',
      password: 'סיסמה',
      emailPlaceholder: 'כתובת האימייל שלך',
      passwordPlaceholder: 'הסיסמה שלך',
      loginTitle: 'התחברות',
      loginSubtitle: 'התחבר לחשבון שלך',
      loginButton: 'התחבר',
      noAccount: 'אין לך חשבון?',
      createAccount: 'צור חשבון',
      forgotPassword: 'שכחת סיסמה?',
      loginSuccess: 'התחברות הצליחה',
      loginError: 'שגיאת התחברות',
      invalidCredentials: 'פרטי התחברות שגויים',
      registerTitle: 'הרשמה',
      registerSubtitle: 'צור את החשבון שלך',
      firstName: 'שם פרטי',
      lastName: 'שם משפחה',
      firstNamePlaceholder: 'השם הפרטי שלך',
      lastNamePlaceholder: 'שם המשפחה שלך',
      confirmPassword: 'אשר סיסמה',
      confirmPasswordPlaceholder: 'אשר את הסיסמה שלך',
      registerButton: 'הירשם',
      alreadyHaveAccount: 'כבר יש לך חשבון?',
      accountType: 'סוג חשבון',
      userAccount: 'משתמש',
      businessAccount: 'עסק',
      adminAccount: 'מנהל'
    },
    
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
  
  const isRTL = language === 'he';
  
  return (
    <I18nContext.Provider value={{ t, language, changeLanguage, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Traductions
const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    cards: 'Cartes',
    create: 'Créer',
    myCards: 'Mes Cartes',
    favorites: 'Favoris',
    profile: 'Profil',
    about: 'À propos',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    search: 'Recherche',
    admin: 'Administration',
    
    // HomePage
    welcomeTitle: 'FuturistCards',
    welcomeSubtitle: 'Révolutionnez Votre Networking Professionnel',
    modernCards: 'Design Innovant',
    modernCardsDesc: 'Interface élégante et responsive pour tous vos appareils',
    reactTech: 'Technologie Avancée',
    reactTechDesc: 'Plateforme construite avec React 18 et les dernières innovations',
    security: 'Sécurité Maximale',
    securityDesc: 'Protection JWT robuste avec validation complète des données',
    exploreCards: 'Découvrir les Cartes',
    aboutUs: 'En Savoir Plus',
    appLoaded: 'Plateforme prête à révolutionner votre networking !',
    homeHeroDescription: 'Créez, partagez et gérez vos cartes de visite professionnelles dans l\'ère numérique avec notre plateforme révolutionnaire.',
    getStartedNow: 'Commencer Maintenant',
    learnMore: 'En Savoir Plus',
    
    // Profile
    personalInfo: 'Informations personnelles',
    professionalInfo: 'Informations professionnelles',
    firstName: 'Prénom',
    lastName: 'Nom',
    email: 'Email',
    phone: 'Téléphone',
    company: 'Entreprise',
    position: 'Poste',
    website: 'Site web',
    bio: 'Biographie',
    edit: 'Modifier',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    accessDenied: 'Accès refusé',
    mustBeLoggedIn: 'Vous devez être connecté pour accéder à votre profil.',
    aboutSection: 'À propos',
    profileImageAlt: 'Photo de profil',
    tellUsAboutYou: 'Parlez-nous de vous...',
    
    // Auth Pages
    welcomeBack: 'Bon retour !',
    loginToAccount: 'Connectez-vous à votre compte',
    accessYourAccount: 'Accédez à votre espace professionnel',
    passwordPlaceholder: 'Entrez votre mot de passe',
    loggingIn: 'Connexion en cours...',
    noAccount: 'Pas encore de compte ?',
    demoAccount: 'Compte de Démonstration',
    loginError: 'Erreur de connexion',
    registration: 'Inscription',
    createYourAccount: 'Créez votre compte professionnel',
    dontHaveAccount: "Vous n'avez pas de compte ?",
    signUpHere: 'Inscrivez-vous ici',
    createAccount: 'Créer un compte',
    joinFuturistCards: 'Rejoignez FuturistCards',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    signInHere: 'Connectez-vous ici',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    firstNamePlaceholder: 'Entrez votre prénom',
    lastNamePlaceholder: 'Entrez votre nom de famille',
    emailAddress: 'Adresse email',
    emailPlaceholder: 'votre.email@exemple.com',
    accountType: 'Type de compte',
    professional: 'Professionnel',
    passwordMinLength: 'Minimum 6 caractères',
    confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
    registering: 'Inscription en cours...',
    passwordsDoNotMatch: 'Les mots de passe ne correspondent pas',
    registrationError: 'Erreur lors de l\'inscription',
    role: 'Rôle',
    user: 'Utilisateur',
    business: 'Entreprise',
    admin: 'Administrateur',
    selectRole: 'Sélectionnez votre rôle',
    
    // Cards Pages
    searchPlaceholder: 'Rechercher...',
    addToFavorites: 'Favoris',
    allCards: 'Toutes les Cartes',
    discoverCardsCollection: 'Découvrez notre collection de cartes de visite professionnelles créées par notre communauté d\'experts.',
    loadingCards: 'Chargement des cartes...',
    cardsAvailable: 'cartes disponibles',
    viewDetails: 'Voir les détails',
    createAccountAccess: 'Créez un compte pour accéder à toutes les fonctionnalités et créer vos propres cartes professionnelles.',
    signUp: 'S\'inscrire',
    signIn: 'Se connecter',
    noCardsFound: 'Aucune carte trouvée',
    noCardsMessage: 'Il n\'y a pas encore de cartes disponibles.',
    createFirstCard: 'Créez la première carte',
    cardDetails: 'Détails de la carte',
    contactInfo: 'Informations de contact',
    similarCards: 'Cartes similaires',
    backToCards: 'Retour aux cartes',
    
    // Create/Edit Card
    createCard: 'Créer une carte',
    editCard: 'Modifier la carte',
    cardTitle: 'Titre de la carte',
    description: 'Description',
    cardImage: 'Image de la carte',
    uploadImage: 'Télécharger une image',
    createNewCard: 'Créer une nouvelle carte',
    fillCardInformation: 'Créez votre carte de visite professionnelle en quelques étapes simples',
    restrictedAccess: 'Accès restreint',
    businessAccountRequired: 'Vous devez avoir un compte professionnel pour créer des cartes.',
    createBusinessAccount: 'Créer un compte professionnel',
    cardCreatedSuccessfully: "Carte créée avec succès !",
    cardDeletedSuccessfully: "Carte supprimée avec succès !",
    confirmDeleteCard: "Êtes-vous sûr de vouloir supprimer cette carte ?",
    errorDeletingCard: "Erreur lors de la suppression de la carte",
    loading: "Chargement...",
    error: "Erreur",
    view: "Voir",
    edit: "Modifier",
    delete: "Supprimer",
    imageTooLarge: 'Image trop volumineuse (max 5MB)',
    enterAddress: '123 Rue de la Paix, 75001 Paris, France',
    creating: 'Création...',
    
    // My Cards
    myCardsTitle: 'Mes Cartes',
    loginRequired: 'Connexion Requise',
    mustBeLoggedInCards: 'Vous devez être connecté pour accéder à vos cartes professionnelles.',
    manageBusinessCards: 'Gérez et organisez toutes vos cartes de visite professionnelles en un seul endroit.',
    noCardsCreated: 'Aucune Carte Créée',
    startByCreatingFirstCard: 'Commencez votre parcours professionnel en créant votre première carte de visite numérique.',
    createMyFirstCard: 'Créer Ma Première Carte',
    noMyCards: 'Vous n\'avez pas encore créé de cartes.',
    createNewCard: 'Créer une nouvelle carte',
    
    // Favorites
    favoritesTitle: 'Mes Favoris',
    noFavorites: 'Vous n\'avez pas encore de cartes favorites.',
    browseCarts: 'Parcourir les cartes',
    mustBeLoggedInFavorites: 'Vous devez être connecté pour voir vos favoris.',
    
    // About Page
    aboutTitle: 'À propos de FuturistCards',
    aboutFuturistCards: 'À propos de FuturistCards',
    aboutDescription: 'FuturistCards est une plateforme moderne de cartes de visite digitales qui révolutionne la façon dont nous partageons nos informations professionnelles.',
    modernPlatformDescription: 'Une plateforme révolutionnaire qui transforme la façon dont les professionnels partagent et gèrent leurs informations de contact dans l\'ère numérique.',
    ourMission: 'Notre Mission',
    missionDescription: 'Créer une expérience de networking moderne et efficace grâce à la technologie, en permettant aux professionnels de se connecter de manière innovante et durable.',
    features: 'Fonctionnalités Clés',
    modernInterface: 'Interface moderne',
    modernDesign: 'Design Moderne',
    modernInterfaceDesc: 'Design responsive et intuitif',
    elegantResponsiveInterface: 'Interface élégante et responsive adaptée à tous les appareils',
    secureAuth: 'Authentification sécurisée',
    secure: 'Sécurisé',
    secureAuthDesc: 'Protection JWT et validation',
    jwtAuthValidation: 'Authentification JWT robuste avec validation complète des données',
    multiLanguage: 'Multi-langues',
    multiLanguageDesc: 'Support français, anglais et hébreu',
    performant: 'Performant',
    modernReactTechnology: 'Construit avec React 18 et les dernières technologies web',
    mobileFirst: 'Mobile First',
    optimizedAllDevices: 'Optimisé pour tous les appareils, du mobile au desktop',
    technologies: 'Technologies utilisées',
    technologiesUsed: 'Technologies Utilisées',
    contactUs: 'Nous contacter',
    contactDescription: 'Vous avez des questions ou souhaitez en savoir plus ? N\'hésitez pas à nous contacter.',
    readyToStart: 'Prêt à Commencer ?',
    joinThousandsProfessionals: 'Rejoignez des milliers de professionnels qui utilisent déjà FuturistCards pour révolutionner leur networking.',
    getStarted: 'Commencer',
    
    // Error Page
    pageNotFound: 'Page non trouvée',
    errorMessage: 'Désolé, la page que vous recherchez n\'existe pas.',
    backToHome: 'Retour à l\'accueil',
    popularPages: 'Pages populaires',
    
    // Footer
    quickLinks: 'Liens rapides',
    allCards: 'Toutes les cartes',
    contact: 'Contact',
    footerDescription: 'FuturistCards est une plateforme moderne de cartes de visite digitales.',
    rightsReserved: ' 2025 FuturistCards - Projet HackerU React',
    
    // Common
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    delete: 'Supprimer',
    confirm: 'Confirmer',
    close: 'Fermer',
    open: 'Ouvrir',
    next: 'Suivant',
    previous: 'Précédent',
    submit: 'Soumettre',
    reset: 'Réinitialiser',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    view: 'Voir',
    download: 'Télécharger',
    share: 'Partager',
    copy: 'Copier',
    paste: 'Coller',
    cut: 'Couper',
    undo: 'Annuler',
    redo: 'Refaire',
    selectAll: 'Tout sélectionner',
    deselectAll: 'Tout désélectionner',
    
    // Messages
    saveSuccess: 'Sauvegardé avec succès',
    saveError: 'Erreur lors de la sauvegarde',
    deleteSuccess: 'Supprimé avec succès',
    deleteError: 'Erreur lors de la suppression',
    updateSuccess: 'Mis à jour avec succès',
    updateError: 'Erreur lors de la mise à jour',
    
    // Roles
    administrator: 'Administrateur',
    businessUser: 'Utilisateur Entreprise',
    regularUser: 'Utilisateur',
    
    // Time
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    tomorrow: 'Demain',
    thisWeek: 'Cette semaine',
    lastWeek: 'La semaine dernière',
    thisMonth: 'Ce mois',
    lastMonth: 'Le mois dernier',
    
    // Status
    active: 'Actif',
    inactive: 'Inactif',
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    draft: 'Brouillon',
    published: 'Publié',
    
    // Actions
    add: 'Ajouter',
    remove: 'Retirer',
    update: 'Mettre à jour',
    refresh: 'Actualiser',
    reload: 'Recharger',
    print: 'Imprimer',
    export: 'Exporter',
    import: 'Importer',
    backup: 'Sauvegarder',
    restore: 'Restaurer',
    
    // Form fields
    title: 'Titre',
    subtitle: 'Sous-titre',
    category: 'Catégorie',
    address: 'Adresse',
    city: 'Ville',
    country: 'Pays',
    zipCode: 'Code postal',
    
    // Categories
    technology: 'Technologie',
    business: 'Business',
    creative: 'Créatif',
    healthcare: 'Santé',
    education: 'Éducation',
    finance: 'Finance',
    marketing: 'Marketing',
    consulting: 'Conseil',
    other: 'Autre',
    
    // Placeholders
    enterTitle: 'Entrez le titre...',
    enterSubtitle: 'Entrez le sous-titre...',
    enterDescription: 'Décrivez votre activité, vos compétences...',
    enterEmail: 'votre@email.com',
    enterPhone: '+33 1 23 45 67 89',
    enterWebsite: 'https://votre-site.com',
    
    // Messages d'erreur
    requiredField: 'Ce champ est requis',
    invalidEmail: 'Format d\'email invalide',
    passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
    passwordsNotMatch: 'Les mots de passe ne correspondent pas',
    
    // Messages de succès
    profileUpdated: 'Profil mis à jour avec succès',
    cardCreated: 'Carte créée avec succès',
    cardUpdated: 'Carte mise à jour avec succès',
    cardDeleted: 'Carte supprimée avec succès',
    
    // Interface elements
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    language: 'Langue',
    theme: 'Thème',
    settings: 'Paramètres',
    notifications: 'Notifications',
    
    // Card actions
    viewCard: 'Voir la carte',
    editCard: 'Modifier la carte',
    deleteCard: 'Supprimer la carte',
    shareCard: 'Partager la carte',
    downloadCard: 'Télécharger la carte',
    
    // Social links
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    facebook: 'Facebook',
    instagram: 'Instagram',
    github: 'GitHub',
    youtube: 'YouTube'
  },
  en: {
    // Navigation
    home: 'Home',
    cards: 'Cards',
    create: 'Create',
    myCards: 'My Cards',
    favorites: 'Favorites',
    profile: 'Profile',
    about: 'About',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    search: 'Search',
    admin: 'Administration',
    
    // HomePage
    welcomeTitle: 'FuturistCards',
    welcomeSubtitle: 'Revolutionize Your Professional Networking',
    modernCards: 'Innovative Design',
    modernCardsDesc: 'Elegant and responsive interface for all your devices',
    reactTech: 'Advanced Technology',
    reactTechDesc: 'Platform built with React 18 and the latest innovations',
    security: 'Maximum Security',
    securityDesc: 'Robust JWT protection with complete data validation',
    exploreCards: 'Discover Cards',
    aboutUs: 'Learn More',
    appLoaded: 'Platform ready to revolutionize your networking!',
    homeHeroDescription: 'Create, share and manage your professional business cards in the digital era with our revolutionary platform.',
    getStartedNow: 'Get Started Now',
    learnMore: 'Learn More',
    
    // Profile
    personalInfo: 'Personal Information',
    professionalInfo: 'Professional Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company',
    position: 'Position',
    website: 'Website',
    bio: 'Biography',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    accessDenied: 'Access Denied',
    mustBeLoggedIn: 'You must be logged in to access your profile.',
    aboutSection: 'About',
    profileImageAlt: 'Profile Picture',
    tellUsAboutYou: 'Tell us about yourself...',
    
    // Auth Pages
    welcomeBack: 'Welcome Back!',
    loginToAccount: 'Sign in to your account',
    accessYourAccount: 'Access your professional space',
    passwordPlaceholder: 'Enter your password',
    loggingIn: 'Signing in...',
    noAccount: 'Don\'t have an account yet?',
    demoAccount: 'Demo Account',
    loginError: 'Login failed',
    registration: 'Registration',
    createYourAccount: 'Create your professional account',
    dontHaveAccount: "Don't have an account?",
    signUpHere: 'Sign up here',
    createAccount: 'Create Account',
    joinFuturistCards: 'Join FuturistCards',
    alreadyHaveAccount: 'Already have an account?',
    signInHere: 'Sign in here',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstNamePlaceholder: 'Enter your first name',
    lastNamePlaceholder: 'Enter your last name',
    emailAddress: 'Email Address',
    emailPlaceholder: 'your.email@example.com',
    accountType: 'Account Type',
    professional: 'Professional',
    passwordMinLength: 'Minimum 6 characters',
    confirmPasswordPlaceholder: 'Confirm your password',
    registering: 'Creating account...',
    passwordsDoNotMatch: 'Passwords do not match',
    registrationError: 'Registration failed',
    role: 'Role',
    user: 'User',
    business: 'Business',
    admin: 'Administrator',
    selectRole: 'Select your role',
    
    // Cards Pages
    searchPlaceholder: 'Search...',
    addToFavorites: 'Favorites',
    allCards: 'All Cards',
    discoverCardsCollection: 'Discover our collection of professional business cards created by our community of experts.',
    loadingCards: 'Loading cards...',
    cardsAvailable: 'cards available',
    viewDetails: 'View Details',
    createAccountAccess: 'Create an account to access all features and create your own professional cards.',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    noCardsFound: 'No cards found',
    noCardsMessage: 'There are no cards available yet.',
    createFirstCard: 'Create the first card',
    cardDetails: 'Card Details',
    contactInfo: 'Contact Information',
    similarCards: 'Similar Cards',
    backToCards: 'Back to Cards',
    
    // Create/Edit Card
    createCard: 'Create Card',
    editCard: 'Edit Card',
    cardTitle: 'Card Title',
    description: 'Description',
    cardImage: 'Card Image',
    uploadImage: 'Upload Image',
    createNewCard: 'Create New Card',
    fillCardInformation: 'Create your professional business card in a few simple steps',
    restrictedAccess: 'Restricted Access',
    businessAccountRequired: 'You must have a business account to create cards.',
    createBusinessAccount: 'Create Business Account',
    cardCreatedSuccessfully: "Card created successfully!",
    cardDeletedSuccessfully: "Card deleted successfully!",
    confirmDeleteCard: "Are you sure you want to delete this card?",
    errorDeletingCard: "Error deleting card",
    loading: "Loading...",
    error: "Error",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    imageTooLarge: 'Image too large (max 5MB)',
    enterAddress: '123 Peace Street, 75001 Paris, France',
    creating: 'Creating...',
    
    // My Cards
    myCardsTitle: 'My Cards',
    loginRequired: 'Login Required',
    mustBeLoggedInCards: 'You must be logged in to access your professional cards.',
    manageBusinessCards: 'Manage and organize all your professional business cards in one place.',
    noCardsCreated: 'No Cards Created',
    startByCreatingFirstCard: 'Start your professional journey by creating your first digital business card.',
    createMyFirstCard: 'Create My First Card',
    noMyCards: 'You haven\'t created any cards yet.',
    createNewCard: 'Create New Card',
    
    // Favorites
    favoritesTitle: 'My Favorites',
    noFavorites: 'You don\'t have any favorite cards yet.',
    browseCarts: 'Browse Cards',
    mustBeLoggedInFavorites: 'You must be logged in to see your favorites.',
    
    // About Page
    aboutTitle: 'About FuturistCards',
    aboutFuturistCards: 'About FuturistCards',
    aboutDescription: 'FuturistCards is a modern digital business card platform that revolutionizes how we share professional information.',
    modernPlatformDescription: 'A revolutionary platform that transforms how professionals share and manage their contact information in the digital era.',
    ourMission: 'Our Mission',
    missionDescription: 'Creating a modern and efficient networking experience through technology, enabling professionals to connect in innovative and sustainable ways.',
    features: 'Key Features',
    modernInterface: 'Modern interface',
    modernDesign: 'Modern Design',
    modernInterfaceDesc: 'Responsive and intuitive design',
    elegantResponsiveInterface: 'Elegant and responsive interface adapted to all devices',
    secureAuth: 'Secure authentication',
    secure: 'Secure',
    secureAuthDesc: 'JWT protection and validation',
    jwtAuthValidation: 'Robust JWT authentication with complete data validation',
    multiLanguage: 'Multi-language',
    multiLanguageDesc: 'Support for French, English and Hebrew',
    performant: 'Performant',
    modernReactTechnology: 'Built with React 18 and the latest web technologies',
    mobileFirst: 'Mobile First',
    optimizedAllDevices: 'Optimized for all devices, from mobile to desktop',
    technologies: 'Technologies used',
    technologiesUsed: 'Technologies Used',
    contactUs: 'Contact us',
    contactDescription: 'Have questions or want to learn more? Feel free to contact us.',
    readyToStart: 'Ready to Get Started?',
    joinThousandsProfessionals: 'Join thousands of professionals already using FuturistCards to revolutionize their networking.',
    getStarted: 'Get started',
    
    // Error Page
    pageNotFound: 'Page Not Found',
    errorMessage: 'Sorry, the page you are looking for does not exist.',
    backToHome: 'Back to Home',
    popularPages: 'Popular Pages',
    
    // Footer
    quickLinks: 'Quick Links',
    allCards: 'All Cards',
    contact: 'Contact',
    footerDescription: 'FuturistCards is a modern digital business card platform.',
    rightsReserved: ' 2025 FuturistCards - HackerU React Project',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    delete: 'Delete',
    confirm: 'Confirm',
    close: 'Close',
    open: 'Open',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    view: 'View',
    download: 'Download',
    share: 'Share',
    copy: 'Copy',
    paste: 'Paste',
    cut: 'Cut',
    undo: 'Undo',
    redo: 'Redo',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    
    // Messages
    saveSuccess: 'Saved successfully',
    saveError: 'Error saving',
    deleteSuccess: 'Deleted successfully',
    deleteError: 'Error deleting',
    updateSuccess: 'Updated successfully',
    updateError: 'Error updating',
    
    // Roles
    administrator: 'Administrator',
    businessUser: 'Business User',
    regularUser: 'User',
    
    // Time
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    lastWeek: 'Last Week',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    draft: 'Draft',
    published: 'Published',
    
    // Actions
    add: 'Add',
    remove: 'Remove',
    update: 'Update',
    refresh: 'Refresh',
    reload: 'Reload',
    print: 'Print',
    export: 'Export',
    import: 'Import',
    backup: 'Backup',
    restore: 'Restore',
    
    // Form fields
    title: 'Title',
    subtitle: 'Subtitle',
    category: 'Category',
    address: 'Address',
    city: 'City',
    country: 'Country',
    zipCode: 'ZIP Code',
    
    // Categories
    technology: 'Technology',
    business: 'Business',
    creative: 'Creative',
    healthcare: 'Healthcare',
    education: 'Education',
    finance: 'Finance',
    marketing: 'Marketing',
    consulting: 'Consulting',
    other: 'Other',
    
    // Placeholders
    enterTitle: 'Enter title...',
    enterSubtitle: 'Enter subtitle...',
    enterDescription: 'Describe your activity, skills...',
    enterEmail: 'your@email.com',
    enterPhone: '+1 234 567 8900',
    enterWebsite: 'https://your-website.com',
    
    // Error messages
    requiredField: 'This field is required',
    invalidEmail: 'Invalid email format',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordsNotMatch: 'Passwords do not match',
    
    // Success messages
    profileUpdated: 'Profile updated successfully',
    cardCreated: 'Card created successfully',
    cardUpdated: 'Card updated successfully',
    cardDeleted: 'Card deleted successfully',
    
    // Interface elements
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    theme: 'Theme',
    settings: 'Settings',
    notifications: 'Notifications',
    
    // Card actions
    viewCard: 'View Card',
    editCard: 'Edit Card',
    deleteCard: 'Delete Card',
    shareCard: 'Share Card',
    downloadCard: 'Download Card',
    
    // Social links
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    facebook: 'Facebook',
    instagram: 'Instagram',
    github: 'GitHub',
    youtube: 'YouTube'
  },
  he: {
    // Navigation
    home: 'בית',
    cards: 'כרטיסים',
    create: 'צור',
    myCards: 'הכרטיסים שלי',
    favorites: 'מועדפים',
    profile: 'פרופיל',
    about: 'אודות',
    login: 'התחברות',
    register: 'הרשמה',
    logout: 'התנתקות',
    search: 'חיפוש',
    admin: 'ניהול',
    
    // HomePage
    welcomeTitle: 'FuturistCards',
    welcomeSubtitle: 'מהפכו את הרשתות המקצועיות שלכם',
    modernCards: 'עיצוב חדשני',
    modernCardsDesc: 'ממשק אלגנטי ורספונסיבי לכל המכשירים שלכם',
    reactTech: 'טכנולוגיה מתקדמת',
    reactTechDesc: 'פלטפורמה בנויה עם React 18 והחידושים האחרונים',
    security: 'אבטחה מקסימלית',
    securityDesc: 'הגנת JWT חזקה עם אימות מלא של נתונים',
    exploreCards: 'גלו כרטיסים',
    aboutUs: 'למדו עוד',
    appLoaded: 'הפלטפורמה מוכנה לחולל מהפכה ברשתות שלכם!',
    homeHeroDescription: 'צרו, שתפו ונהלו את כרטיסי הביקור המקצועיים שלכם בעידן הדיגיטלי עם הפלטפורמה המהפכנית שלנו.',
    getStartedNow: 'התחילו עכשיו',
    learnMore: 'למדו עוד',
    
    // Profile
    personalInfo: 'מידע אישי',
    professionalInfo: 'מידע מקצועי',
    firstName: 'שם פרטי',
    lastName: 'שם משפחה',
    email: 'אימייל',
    phone: 'טלפון',
    company: 'חברה',
    position: 'תפקיד',
    website: 'אתר אינטרנט',
    bio: 'ביוגרפיה',
    edit: 'ערוך',
    save: 'שמור',
    cancel: 'בטל',
    accessDenied: 'גישה נדחתה',
    mustBeLoggedIn: 'עליך להיות מחובר כדי לגשת לפרופיל שלך.',
    aboutSection: 'אודות',
    profileImageAlt: 'תמונת פרופיל',
    tellUsAboutYou: 'ספר לנו על עצמך...',
    
    // Auth Pages
    welcomeBack: 'ברוך שובך!',
    loginToAccount: 'התחבר לחשבון שלך',
    accessYourAccount: 'גש לאזור המקצועי שלך',
    passwordPlaceholder: 'הכנס את הסיסמה',
    loggingIn: 'מתחבר...',
    noAccount: 'אין לך עדיין חשבון?',
    demoAccount: 'חשבון הדגמה',
    loginError: 'שגיאה בהתחברות',
    registration: 'הרשמה',
    createYourAccount: 'צור את החשבון המקצועי שלך',
    dontHaveAccount: 'אין לך חשבון?',
    signUpHere: 'הירשם כאן',
    createAccount: 'צור חשבון',
    joinFuturistCards: 'הצטרף ל-FuturistCards',
    alreadyHaveAccount: 'כבר יש לך חשבון?',
    signInHere: 'התחבר כאן',
    password: 'סיסמה',
    confirmPassword: 'אשר סיסמה',
    firstNamePlaceholder: 'הכנס את שמך הפרטי',
    lastNamePlaceholder: 'הכנס את שם המשפחה',
    emailAddress: 'כתובת אימייל',
    emailPlaceholder: 'your.email@example.co.il',
    accountType: 'סוג חשבון',
    professional: 'מקצועי',
    passwordMinLength: 'מינימום 6 תווים',
    confirmPasswordPlaceholder: 'אשר את הסיסמה',
    registering: 'יוצר חשבון...',
    passwordsDoNotMatch: 'הסיסמאות לא תואמות',
    registrationError: 'שגיאה בהרשמה',
    role: 'תפקיד',
    user: 'משתמש',
    business: 'עסק',
    admin: 'מנהל',
    selectRole: 'בחר את התפקיד שלך',
    
    // Cards Pages
    searchPlaceholder: 'חיפוש...',
    addToFavorites: 'מועדפים',
    allCards: 'כל הכרטיסים',
    discoverCardsCollection: 'גלה את אוסף כרטיסי הביקור המקצועיים שנוצרו על ידי קהילת המומחים שלנו.',
    loadingCards: 'טוען כרטיסים...',
    cardsAvailable: 'כרטיסים זמינים',
    viewDetails: 'צפה בפרטים',
    createAccountAccess: 'צור חשבון כדי לגשת לכל התכונות וליצור כרטיסים מקצועיים משלך.',
    signUp: 'הירשם',
    signIn: 'התחבר',
    noCardsFound: 'לא נמצאו כרטיסים',
    noCardsMessage: 'אין עדיין כרטיסים זמינים.',
    createFirstCard: 'צור את הכרטיס הראשון',
    cardDetails: 'פרטי הכרטיס',
    contactInfo: 'פרטי קשר',
    similarCards: 'כרטיסים דומים',
    backToCards: 'חזור לכרטיסים',
    
    // Create/Edit Card
    createCard: 'צור כרטיס',
    editCard: 'ערוך כרטיס',
    cardTitle: 'כותרת הכרטיס',
    description: 'תיאור',
    cardImage: 'תמונת הכרטיס',
    uploadImage: 'העלה תמונה',
    createNewCard: 'צור כרטיס חדש',
    fillCardInformation: 'צור את כרטיס הביקור המקצועי שלך בכמה צעדים פשוטים',
    restrictedAccess: 'גישה מוגבלת',
    businessAccountRequired: 'עליך להיות בעל חשבון עסקי כדי ליצור כרטיסים.',
    createBusinessAccount: 'צור חשבון עסקי',
    cardCreatedSuccessfully: 'הכרטיס נוצר בהצלחה!',
    cardDeletedSuccessfully: 'הכרטיס נמחק בהצלחה!',
    confirmDeleteCard: 'האם אתה בטוח שברצונך למחוק את הכרטיס הזה?',
    errorDeletingCard: 'שגיאה במחיקת הכרטיס',
    loading: 'טוען...',
    error: 'שגיאה',
    view: 'צפה',
    edit: 'ערוך',
    delete: 'מחק',
    imageTooLarge: 'התמונה גדולה מדי (מקסימום 5MB)',
    enterAddress: 'רחוב השלום 123, 75001 פריז, צרפת',
    creating: 'יוצר...',
    
    // My Cards
    myCardsTitle: 'הכרטיסים שלי',
    loginRequired: 'נדרשת התחברות',
    mustBeLoggedInCards: 'עליך להיות מחובר כדי לגשת לכרטיסים המקצועיים שלך.',
    manageBusinessCards: 'נהל וארגן את כל כרטיסי הביקור המקצועיים שלך במקום אחד.',
    noCardsCreated: 'לא נוצרו כרטיסים',
    startByCreatingFirstCard: 'התחל את המסע המקצועי שלך ביצירת כרטיס הביקור הדיגיטלי הראשון שלך.',
    createMyFirstCard: 'צור את הכרטיס הראשון שלי',
    noMyCards: 'לא יצרת עדיין כרטיסים.',
    createNewCard: 'צור כרטיס חדש',
    
    // Favorites
    favoritesTitle: 'המועדפים שלי',
    noFavorites: 'אין לך עדיין כרטיסים מועדפים.',
    browseCarts: 'עיין בכרטיסים',
    mustBeLoggedInFavorites: 'עליך להיות מחובר כדי לראות את המועדפים שלך.',
    
    // About Page
    aboutTitle: 'אודות FuturistCards',
    aboutFuturistCards: 'אודות FuturistCards',
    aboutDescription: 'FuturistCards היא פלטפורמה מודרנית לכרטיסי ביקור דיגיטליים המהפכת את הדרך שבה אנו חולקים מידע מקצועי.',
    modernPlatformDescription: 'פלטפורמה מהפכנית הממירה את הדרך שבה אנשי מקצוע חולקים ומנהלים את פרטי הקשר שלהם בעידן הדיגיטלי.',
    ourMission: 'המשימה שלנו',
    missionDescription: 'יצירת חוויית רשתות מודרנית ויעילה באמצעות טכנולוגיה, המאפשרת לאנשי מקצוע להתחבר בדרכים חדשניות ובנות קיימא.',
    features: 'תכונות מרכזיות',
    modernInterface: 'ממשק מודרני',
    modernDesign: 'עיצוב מודרני',
    modernInterfaceDesc: 'עיצוב רספונסיבי ואינטואיטיבי',
    elegantResponsiveInterface: 'ממשק אלגנטי ורספונסיבי המותאם לכל המכשירים',
    secureAuth: 'אימות מאובטח',
    secure: 'מאובטח',
    secureAuthDesc: 'הגנת JWT ואימות',
    jwtAuthValidation: 'אימות JWT חזק עם אימות מלא של נתונים',
    multiLanguage: 'רב לשוני',
    multiLanguageDesc: 'תמיכה בצרפתית, אנגלית ועברית',
    performant: 'ביצועים גבוהים',
    modernReactTechnology: 'בנוי עם React 18 והטכנולוגיות החדשות ביותר',
    mobileFirst: 'נייד קודם',
    optimizedAllDevices: 'מותאם לכל המכשירים, מנייד ועד שולחן עבודה',
    technologies: 'טכנולוגיות בשימוש',
    technologiesUsed: 'טכנולוגיות בשימוש',
    contactUs: 'צור קשר',
    contactDescription: 'יש לך שאלות או רוצה לדעת יותר? אל תהסס לפנות אלינו.',
    readyToStart: 'מוכן להתחיל?',
    joinThousandsProfessionals: 'הצטרף לאלפי אנשי מקצוע שכבר משתמשים ב-FuturistCards כדי לחולל מהפכה ברשתות שלהם.',
    getStarted: 'התחל',
    
    // Error Page
    pageNotFound: 'הדף לא נמצא',
    errorMessage: 'מצטערים, הדף שאתה מחפש לא קיים.',
    backToHome: 'חזור לבית',
    popularPages: 'דפים פופולריים',
    
    // Footer
    quickLinks: 'קישורים מהירים',
    allCards: 'כל הכרטיסים',
    contact: 'צור קשר',
    footerDescription: 'FuturistCards היא פלטפורמה מודרנית לכרטיסי ביקור דיגיטליים.',
    rightsReserved: '© 2025 FuturistCards - פרויקט HackerU React',
    
    // Common
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    delete: 'מחק',
    confirm: 'אשר',
    close: 'סגור',
    open: 'פתח',
    next: 'הבא',
    previous: 'הקודם',
    submit: 'שלח',
    reset: 'איפוס',
    search: 'חיפוש',
    filter: 'סנן',
    sort: 'מיין',
    view: 'הצג',
    download: 'הורד',
    share: 'שתף',
    copy: 'העתק',
    paste: 'הדבק',
    cut: 'גזור',
    undo: 'בטל',
    redo: 'בצע שוב',
    selectAll: 'בחר הכל',
    deselectAll: 'בטל בחירת הכל',
    
    // Messages
    saveSuccess: 'נשמר בהצלחה',
    saveError: 'שגיאה בשמירה',
    deleteSuccess: 'נמחק בהצלחה',
    deleteError: 'שגיאה במחיקה',
    updateSuccess: 'עודכן בהצלחה',
    updateError: 'שגיאה בעדכון',
    
    // Roles
    administrator: 'מנהל',
    businessUser: 'משתמש עסקי',
    regularUser: 'משתמש',
    
    // Time
    today: 'היום',
    yesterday: 'אתמול',
    tomorrow: 'מחר',
    thisWeek: 'השבוע',
    lastWeek: 'השבוע שעבר',
    thisMonth: 'החודש',
    lastMonth: 'החודש שעבר',
    
    // Status
    active: 'פעיל',
    inactive: 'לא פעיל',
    pending: 'ממתין',
    approved: 'מאושר',
    rejected: 'נדחה',
    draft: 'טיוטה',
    published: 'פורסם',
    
    // Actions
    add: 'הוסף',
    remove: 'הסר',
    update: 'עדכן',
    refresh: 'רענן',
    reload: 'טען מחדש',
    print: 'הדפס',
    export: 'ייצא',
    import: 'ייבא',
    backup: 'גבה',
    restore: 'שחזר',
    
    // Form fields
    title: 'כותרת',
    subtitle: 'כותרת משנה',
    category: 'קטגוריה',
    address: 'כתובת',
    city: 'עיר',
    country: 'מדינה',
    zipCode: 'מיקוד',
    
    // Categories
    technology: 'טכנולוגיה',
    business: 'עסקים',
    creative: 'יצירתי',
    healthcare: 'בריאות',
    education: 'חינוך',
    finance: 'פיננסים',
    marketing: 'שיווק',
    consulting: 'ייעוץ',
    other: 'אחר',
    
    // Placeholders
    enterTitle: 'הכנס כותרת...',
    enterSubtitle: 'הכנס כותרת משנה...',
    enterDescription: 'תאר את הפעילות שלך, כישורים...',
    enterEmail: 'your@email.com',
    enterPhone: '+972-50-123-4567',
    enterWebsite: 'https://your-website.co.il',
    
    // Error messages
    requiredField: 'שדה זה נדרש',
    invalidEmail: 'פורמט אימייל לא תקין',
    passwordTooShort: 'הסיסמה חייבת להכיל לפחות 6 תווים',
    passwordsNotMatch: 'הסיסמאות לא תואמות',
    
    // Success messages
    profileUpdated: 'הפרופיל עודכן בהצלחה',
    cardCreated: 'הכרטיס נוצר בהצלחה',
    cardUpdated: 'הכרטיס עודכן בהצלחה',
    cardDeleted: 'הכרטיס נמחק בהצלחה',
    
    // Interface elements
    darkMode: 'מצב כהה',
    lightMode: 'מצב בהיר',
    language: 'שפה',
    theme: 'ערכת נושא',
    settings: 'הגדרות',
    notifications: 'התראות',
    
    // Card actions
    viewCard: 'הצג כרטיס',
    editCard: 'ערוך כרטיס',
    deleteCard: 'מחק כרטיס',
    shareCard: 'שתף כרטיס',
    downloadCard: 'הורד כרטיס',
    
    // Social links
    linkedin: 'לינקדאין',
    twitter: 'טוויטר',
    facebook: 'פייסבוק',
    instagram: 'אינסטגרם',
    github: 'גיטהאב',
    youtube: 'יוטיוב'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Mettre à jour la direction du texte pour l'hébreu
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.fr[key] || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    isRTL: language === 'he',
    availableLanguages: [
      { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
      { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
      { code: 'he', name: 'עברית', flag: '🇮🇱', nativeName: 'עברית' }
    ],
    currentLanguageInfo: {
      code: language,
      name: language === 'fr' ? 'Français' : language === 'en' ? 'English' : 'עברית',
      flag: language === 'fr' ? '🇫🇷' : language === 'en' ? '🇺🇸' : '🇮🇱',
      isRTL: language === 'he'
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;

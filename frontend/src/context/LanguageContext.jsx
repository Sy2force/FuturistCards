import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    cards: 'Cartes',
    myCards: 'Mes Cartes',
    favorites: 'Favoris',
    profile: 'Profil',
    about: 'À propos',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    
    // Actions
    createCard: 'Créer une Carte',
    editCard: 'Modifier la Carte',
    deleteCard: 'Supprimer la Carte',
    saveCard: 'Sauvegarder',
    cancel: 'Annuler',
    search: 'Rechercher',
    filter: 'Filtrer',
    sort: 'Trier',
    
    // Common actions
    common: {
      cancel: 'Annuler',
      goToPage: 'Aller à la page',
      close: 'Fermer',
      save: 'Sauvegarder',
      edit: 'Modifier',
      delete: 'Supprimer',
      view: 'Voir',
      contact: 'Contact'
    },
    
    // Formulaires
    title: 'Titre',
    subtitle: 'Sous-titre',
    description: 'Description',
    company: 'Entreprise',
    position: 'Poste',
    email: 'Email',
    phone: 'Téléphone',
    website: 'Site Web',
    address: 'Adresse',
    category: 'Catégorie',
    tags: 'Tags',
    image: 'Image',
    
    // Messages
    welcome: 'Bienvenue',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    noResults: 'Aucun résultat trouvé',
    
    // Catégories
    technology: 'Technologie',
    business: 'Business',
    creative: 'Créatif',
    healthcare: 'Santé',
    education: 'Éducation',
    finance: 'Finance',
    marketing: 'Marketing',
    consulting: 'Conseil',
    
    // Theme
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    
    // Languages
    french: 'Français',
    english: 'English',
    arabic: 'العربية',
    hebrew: 'עברית',
    
    // HomePage
    digitalBusinessCards: 'Cartes de Visite Numériques',
    reimagined: 'Réinventées',
    heroDescription: 'Créez des cartes de visite interactives et époustouflantes avec notre plateforme futuriste. Partagez votre identité professionnelle avec style et créez des connexions durables.',
    getStarted: 'Commencer',
    browseCards: 'Parcourir les Cartes',
    digitalCardsCreated: 'Cartes Numériques Créées',
    activeUsers: 'Utilisateurs Actifs',
    cardViews: 'Vues de Cartes',
    featuredCards: 'Cartes en Vedette',
    discoverCards: 'Découvrez d\'incroyables cartes de visite créées par notre communauté',
    viewAllCards: 'Voir Toutes les Cartes',
    readyToCreate: 'Prêt à Créer Votre Carte Numérique ?',
    joinProfessionals: 'Rejoignez des milliers de professionnels qui ont déjà transformé leur expérience de réseautage',
    startCreating: 'Commencer à Créer',
    
    // AboutPage
    aboutFuturistCards: 'À propos de FuturistCards',
    aboutDescription: 'Une plateforme révolutionnaire pour créer et partager des cartes de visite numériques avec un design futuriste et des fonctionnalités puissantes.',
    digitalBusinessCardsFeature: 'Cartes de Visite Numériques',
    digitalBusinessCardsDesc: 'Créez de superbes cartes de visite numériques avec un design glassmorphique moderne',
    secureAuth: 'Authentification Sécurisée',
    secureAuthDesc: 'Authentification basée sur JWT avec contrôle d\'accès basé sur les rôles',
    multipleUserRoles: 'Rôles Utilisateur Multiples',
    multipleUserRolesDesc: 'Rôles Utilisateur, Business et Admin avec différentes permissions',
    modernDesign: 'Design Moderne',
    modernDesignDesc: 'Belle interface glassmorphique inspirée de Tesla et Apple',
    globalReach: 'Portée Mondiale',
    globalReachDesc: 'Partagez vos cartes de visite avec n\'importe qui, n\'importe où',
    smartFeatures: 'Fonctionnalités Intelligentes',
    smartFeaturesDesc: 'Recherche, filtres, favoris et analyses pour vos cartes',
    ourMission: 'Notre Mission',
    missionDescription: 'Nous croyons en la transformation de la façon dont les professionnels se connectent et partagent leurs informations. FuturistCards combine une technologie de pointe avec un design élégant pour créer une expérience de réseautage fluide pour l\'ère numérique.',
    satisfactionRate: 'Taux de Satisfaction',
    builtWithModernTech: 'Construit avec une Technologie Moderne'
  },
  en: {
    // Navigation
    home: 'Home',
    cards: 'Cards',
    about: 'About',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    myCards: 'My Cards',
    favorites: 'Favorites',
    createCard: 'Create Card',
    
    // Cards Page
    allCards: 'All Cards',
    searchPlaceholder: 'Search by name, company, description...',
    allCategories: 'All Categories',
    newest: 'Newest',
    oldest: 'Oldest',
    nameAZ: 'Name A-Z',
    companyAZ: 'Company A-Z',
    noCardsFound: 'No cards found',
    modifyFilters: 'Try modifying your search criteria',
    resetFilters: 'Reset filters',
    
    // Card Actions
    contact: 'Contact',
    like: 'Like',
    share: 'Share',
    views: 'views',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    
    // Auth
    email: 'Email',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    company: 'Company',
    accountType: 'Account Type',
    user: 'User',
    business: 'Business',
    admin: 'Administrator',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    forgotPassword: 'Forgot password?',
    rememberMe: 'Remember me',
    
    // Theme
    darkMode: 'Dark mode',
    lightMode: 'Light mode',
    
    // Languages
    french: 'Français',
    english: 'English',
    arabic: 'العربية',
    hebrew: 'עברית',
    
    // HomePage
    digitalBusinessCards: 'Digital Business Cards',
    reimagined: 'Reimagined',
    heroDescription: 'Create stunning, interactive business cards with our futuristic platform. Share your professional identity with style and make lasting connections.',
    getStarted: 'Get Started',
    browseCards: 'Browse Cards',
    digitalCardsCreated: 'Digital Cards Created',
    activeUsers: 'Active Users',
    cardViews: 'Card Views',
    featuredCards: 'Featured Cards',
    discoverCards: 'Discover amazing business cards created by our community',
    viewAllCards: 'View All Cards',
    readyToCreate: 'Ready to Create Your Digital Card?',
    joinProfessionals: 'Join thousands of professionals who have already transformed their networking experience',
    startCreating: 'Start Creating',
    
    // AboutPage
    aboutFuturistCards: 'About FuturistCards',
    aboutDescription: 'A revolutionary platform for creating and sharing digital business cards with a futuristic design and powerful features.',
    digitalBusinessCardsFeature: 'Digital Business Cards',
    digitalBusinessCardsDesc: 'Create stunning digital business cards with modern glassmorphic design',
    secureAuth: 'Secure Authentication',
    secureAuthDesc: 'JWT-based authentication with role-based access control',
    multipleUserRoles: 'Multiple User Roles',
    multipleUserRolesDesc: 'User, Business, and Admin roles with different permissions',
    modernDesign: 'Modern Design',
    modernDesignDesc: 'Beautiful glassmorphic UI inspired by Tesla and Apple',
    globalReach: 'Global Reach',
    globalReachDesc: 'Share your business cards with anyone, anywhere',
    smartFeatures: 'Smart Features',
    smartFeaturesDesc: 'Search, filter, favorites, and analytics for your cards',
    ourMission: 'Our Mission',
    missionDescription: 'We believe in transforming the way professionals connect and share their information. FuturistCards combines cutting-edge technology with elegant design to create a seamless networking experience for the digital age.',
    satisfactionRate: 'Satisfaction Rate',
    builtWithModernTech: 'Built with Modern Technology'
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    cards: 'البطاقات',
    about: 'حول',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    myCards: 'بطاقاتي',
    favorites: 'المفضلة',
    createCard: 'إنشاء بطاقة',
    
    // Cards Page
    allCards: 'جميع البطاقات',
    searchPlaceholder: 'البحث بالاسم، الشركة، الوصف...',
    allCategories: 'جميع الفئات',
    newest: 'الأحدث',
    oldest: 'الأقدم',
    nameAZ: 'الاسم أ-ي',
    companyAZ: 'الشركة أ-ي',
    noCardsFound: 'لم يتم العثور على بطاقات',
    modifyFilters: 'جرب تعديل معايير البحث',
    resetFilters: 'إعادة تعيين المرشحات',
    
    // Card Actions
    contact: 'اتصال',
    like: 'إعجاب',
    share: 'مشاركة',
    views: 'مشاهدات',
    
    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    
    // Theme
    darkMode: 'الوضع المظلم',
    lightMode: 'الوضع الفاتح',
    
    // Languages
    french: 'Français',
    english: 'English',
    arabic: 'العربية',
    hebrew: 'עברית',
    
    // HomePage
    digitalBusinessCards: 'بطاقات العمل الرقمية',
    reimagined: 'معاد تصورها',
    heroDescription: 'أنشئ بطاقات عمل تفاعلية مذهلة باستخدام منصتنا المستقبلية. شارك هويتك المهنية بأناقة وأنشئ اتصالات دائمة.',
    getStarted: 'ابدأ الآن',
    browseCards: 'تصفح البطاقات',
    digitalCardsCreated: 'البطاقات الرقمية المُنشأة',
    activeUsers: 'المستخدمون النشطون',
    cardViews: 'مشاهدات البطاقات',
    featuredCards: 'البطاقات المميزة',
    discoverCards: 'اكتشف بطاقات عمل مذهلة أنشأها مجتمعنا',
    viewAllCards: 'عرض جميع البطاقات',
    readyToCreate: 'مستعد لإنشاء بطاقتك الرقمية؟',
    joinProfessionals: 'انضم إلى آلاف المهنيين الذين حولوا بالفعل تجربة التواصل الخاصة بهم',
    startCreating: 'ابدأ الإنشاء',
    
    // AboutPage
    aboutFuturistCards: 'حول FuturistCards',
    aboutDescription: 'منصة ثورية لإنشاء ومشاركة بطاقات العمل الرقمية بتصميم مستقبلي وميزات قوية.',
    digitalBusinessCardsFeature: 'بطاقات العمل الرقمية',
    digitalBusinessCardsDesc: 'أنشئ بطاقات عمل رقمية مذهلة بتصميم زجاجي حديث',
    secureAuth: 'المصادقة الآمنة',
    secureAuthDesc: 'مصادقة قائمة على JWT مع التحكم في الوصول القائم على الأدوار',
    multipleUserRoles: 'أدوار المستخدمين المتعددة',
    multipleUserRolesDesc: 'أدوار المستخدم والأعمال والإدارة بصلاحيات مختلفة',
    modernDesign: 'التصميم الحديث',
    modernDesignDesc: 'واجهة زجاجية جميلة مستوحاة من Tesla و Apple',
    globalReach: 'الوصول العالمي',
    globalReachDesc: 'شارك بطاقات عملك مع أي شخص، في أي مكان',
    smartFeatures: 'الميزات الذكية',
    smartFeaturesDesc: 'البحث والتصفية والمفضلة والتحليلات لبطاقاتك',
    ourMission: 'مهمتنا',
    missionDescription: 'نحن نؤمن بتحويل الطريقة التي يتواصل بها المهنيون ويشاركون معلوماتهم. يجمع FuturistCards بين التكنولوجيا المتطورة والتصميم الأنيق لخلق تجربة شبكات سلسة للعصر الرقمي.',
    satisfactionRate: 'معدل الرضا',
    builtWithModernTech: 'مبني بتقنية حديثة'
  },
  he: {
    // Navigation
    home: 'בית',
    cards: 'כרטיסים',
    about: 'אודות',
    login: 'התחברות',
    register: 'הרשמה',
    logout: 'התנתקות',
    profile: 'פרופיל',
    myCards: 'הכרטיסים שלי',
    favorites: 'מועדפים',
    createCard: 'צור כרטיס',
    
    // Cards Page
    allCards: 'כל הכרטיסים',
    searchPlaceholder: 'חפש לפי שם, חברה, תיאור...',
    allCategories: 'כל הקטגוריות',
    newest: 'החדשים ביותר',
    oldest: 'הישנים ביותר',
    nameAZ: 'שם א-ת',
    companyAZ: 'חברה א-ת',
    noCardsFound: 'לא נמצאו כרטיסים',
    modifyFilters: 'נסה לשנות את קריטריוני החיפוש',
    resetFilters: 'איפוס מסננים',
    
    // Card Actions
    contact: 'צור קשר',
    like: 'אהבתי',
    share: 'שתף',
    views: 'צפיות',
    
    // Common
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    cancel: 'ביטול',
    save: 'שמור',
    delete: 'מחק',
    edit: 'ערוך',
    
    // Theme
    darkMode: 'מצב כהה',
    lightMode: 'מצב בהיר',
    
    // Languages
    french: 'Français',
    english: 'English',
    arabic: 'العربية',
    hebrew: 'עברית',
    
    // HomePage
    digitalBusinessCards: 'כרטיסי ביקור דיגיטליים',
    reimagined: 'מחדש',
    heroDescription: 'צור כרטיסי ביקור אינטראקטיביים מדהימים עם הפלטפורמה העתידנית שלנו. שתף את הזהות המקצועית שלך בסטייל וצור קשרים מתמשכים.',
    getStarted: 'התחל',
    browseCards: 'עיין בכרטיסים',
    digitalCardsCreated: 'כרטיסים דיגיטליים שנוצרו',
    activeUsers: 'משתמשים פעילים',
    cardViews: 'צפיות בכרטיסים',
    featuredCards: 'כרטיסים מומלצים',
    discoverCards: 'גלה כרטיסי ביקור מדהימים שנוצרו על ידי הקהילה שלנו',
    viewAllCards: 'צפה בכל הכרטיסים',
    readyToCreate: 'מוכן ליצור את הכרטיס הדיגיטלי שלך?',
    joinProfessionals: 'הצטרף לאלפי אנשי מקצוע שכבר שינו את חוויית הרשתות שלהם',
    startCreating: 'התחל ליצור',
    
    // AboutPage
    aboutFuturistCards: 'אודות FuturistCards',
    aboutDescription: 'פלטפורמה מהפכנית ליצירה ושיתוף כרטיסי ביקור דיגיטליים עם עיצוב עתידני ותכונות חזקות.',
    digitalBusinessCardsFeature: 'כרטיסי ביקור דיגיטליים',
    digitalBusinessCardsDesc: 'צור כרטיסי ביקור דיגיטליים מדהימים עם עיצוב זכוכית מודרני',
    secureAuth: 'אימות מאובטח',
    secureAuthDesc: 'אימות מבוסס JWT עם בקרת גישה מבוססת תפקידים',
    multipleUserRoles: 'תפקידי משתמש מרובים',
    multipleUserRolesDesc: 'תפקידי משתמש, עסק ומנהל עם הרשאות שונות',
    modernDesign: 'עיצוב מודרני',
    modernDesignDesc: 'ממשק זכוכית יפה בהשראת Tesla ו-Apple',
    globalReach: 'הגעה גלובלית',
    globalReachDesc: 'שתף את כרטיסי הביקור שלך עם כל אחד, בכל מקום',
    smartFeatures: 'תכונות חכמות',
    smartFeaturesDesc: 'חיפוש, סינון, מועדפים וניתוחים עבור הכרטיסים שלך',
    ourMission: 'המשימה שלנו',
    missionDescription: 'אנחנו מאמינים בשינוי הדרך שבה אנשי מקצוע מתחברים ומשתפים את המידע שלהם. FuturistCards משלב טכנולוגיה מתקדמת עם עיצוב אלגנטי כדי ליצור חוויית רשתות חלקה לעידן הדיגיטלי.',
    satisfactionRate: 'שיעור שביעות רצון',
    builtWithModernTech: 'נבנה עם טכנולוגיה מודרנית'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = (language === 'ar' || language === 'he') ? 'rtl' : 'ltr';
  }, [language]);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  };

  const value = {
    language,
    changeLanguage,
    t,
    isRTL: language === 'ar' || language === 'he'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;

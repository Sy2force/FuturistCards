// Hebrew translations for FuturistCards
const translations = {
  // Home Page
  home: {
    title: 'כרטיסי ביקור דיגיטליים מתקדמים',
    subtitle: 'צור כרטיסי ביקור דיגיטליים מקצועיים בקלות ובמהירות',
    welcomeBack: 'ברוך השב',
    loggedInSubtitle: 'מוכן ליצור כרטיס ביקור חדש או לנהל את הכרטיסים הקיימים שלך?',
    badge: 'הפלטפורמה המובילה',
    buttons: {
      createAdvanced: 'צור כרטיס מתקדם',
      dashboard: 'לוח בקרה',
      browse: 'עיין בכרטיסים',
      getStarted: 'התחל עכשיו',
      learnMore: 'למד עוד',
      createCard: 'צור כרטיס'
    },
    features: {
      fast: {
        title: 'מהיר וקל',
        description: 'צור כרטיס ביקור מקצועי תוך דקות ספורות'
      },
      beautiful: {
        title: 'עיצוב מושלם',
        description: 'תבניות מעוצבות ומותאמות אישית לכל עסק'
      },
      secure: {
        title: 'בטוח ומאובטח',
        description: 'הנתונים שלך מוגנים ברמת האבטחה הגבוהה ביותר'
      },
      global: {
        title: 'נגיש בכל מקום',
        description: 'כרטיסים דיגיטליים הנגישים מכל מקום בעולם'
      }
    },
    stats: {
      users: 'משתמשים',
      cards: 'כרטיסים',
      uptime: 'זמינות',
      rating: 'דירוג'
    },
    testimonials: {
      john: {
        name: 'יוחנן דוד',
        role: 'מנהל שיווק',
        content: 'הפלטפורמה הכי טובה שהשתמשתי בה ליצירת כרטיסי ביקור דיגיטליים'
      },
      sarah: {
        name: 'שרה כהן',
        role: 'יזמת',
        content: 'חסכתי המון זמן וכסף בזכות הכרטיסים הדיגיטליים'
      },
      mike: {
        name: 'מיכאל לוי',
        role: 'מפתח',
        content: 'ממשק משתמש מעולה וקל לשימוש'
      }
    },
    status: {
      connectedApiKey: 'מחובר למפתח API',
      advancedTools: 'כלים מתקדמים',
      fullAnalytics: 'אנליטיקה מלאה'
    }
  },

  // Validation messages
  validation: {
    required: 'שדה זה הוא חובה',
    email: 'כתובת אימייל לא תקינה',
    emailRequired: 'אימייל נדרש',
    emailInvalid: 'כתובת אימייל לא תקינה',
    firstNameRequired: 'שם פרטי נדרש',
    lastNameRequired: 'שם משפחה נדרש',
    minLength: 'מינימום {{min}} תווים',
    maxLength: 'מקסימום {{max}} תווים',
    passwordMismatch: 'הסיסמאות לא תואמות',
    invalidEmail: 'כתובת אימייל לא תקינה',
    phoneFormat: 'פורמט טלפון לא תקין',
    password: 'הסיסמה חייבת להכיל לפחות 8 תווים',
    confirmPassword: 'הסיסמאות אינן תואמות',
    phone: 'מספר טלפון לא תקין',
    loginSuccess: 'התחברת בהצלחה!'
  },

  // Error handling
  error: {
    title: '404 - הדף לא נמצא',
    description: 'הדף שחיפשת לא קיים או הוסר',
    goHome: 'חזור לדף הבית',
    tryAgain: 'נסה שוב'
  },

  // Navigation
  nav: {
    home: 'בית',
    cards: 'כרטיסים',
    myCards: 'הכרטיסים שלי',
    createCard: 'צור כרטיס',
    favorites: 'מועדפים',
    profile: 'פרופיל',
    admin: 'ניהול',
    about: 'אודות',
    login: 'התחבר',
    register: 'הירשם',
    logout: 'התנתק',
    darkMode: 'מצב כהה',
    lightMode: 'מצב בהיר',
    language: 'שפה',
    backToMyCards: 'חזור לכרטיסים',
    backToCards: 'חזור לגלריה'
  },
  
  // Navigation (legacy support)
  navigation: {
    home: 'בית',
    cards: 'כרטיסים',
    myCards: 'הכרטיסים שלי',
    createCard: 'צור כרטיס',
    favorites: 'מועדפים',
    profile: 'פרופיל',
    admin: 'ניהול',
    about: 'אודות',
    login: 'התחבר',
    register: 'הירשם',
    logout: 'התנתק',
    darkMode: 'מצב כהה',
    lightMode: 'מצב בהיר',
    language: 'שפה',
    backToMyCards: 'חזור לכרטיסים',
    backToCards: 'חזור לגלריה'
  },

  // Common UI elements
  common: {
    loading: 'טוען...',
    error: 'שגיאה',
    success: 'הצלחה',
    save: 'שמור',
    cancel: 'בטל',
    delete: 'מחק',
    edit: 'ערוך',
    view: 'צפה',
    search: 'חיפוש',
    filter: 'סנן',
    sort: 'מיין',
    next: 'הבא',
    previous: 'הקודם',
    close: 'סגור',
    open: 'פתח',
    yes: 'כן',
    no: 'לא',
    confirm: 'אשר',
    back: 'חזור',
    continue: 'המשך',
    submit: 'שלח',
    reset: 'אפס',
    clear: 'נקה',
    select: 'בחר',
    upload: 'העלה',
    download: 'הורד',
    share: 'שתף',
    copy: 'העתק',
    print: 'הדפס',
    refresh: 'רענן',
    retry: 'נסה שוב',
    undo: 'בטל פעולה',
    redo: 'חזור על פעולה',
    siteName: 'FuturistCards',
    title: 'FuturistCards - כרטיסי ביקור דיגיטליים',
    description: 'הפלטפורמה המובילה ליצירת כרטיסי ביקור דיגיטליים מתקדמים',
    address: 'כתובת',
    unexpectedError: 'אירעה שגיאה בלתי צפויה',
    errorDetails: 'פרטי השגיאה',
    refreshPage: 'רענן דף',
    goBack: 'חזור אחורה',
    notLoggedIn: 'לא מחובר למערכת',
    accessDenied: 'גישה נדחתה',
    contextError: 'שגיאה בהקשר הרכיב',
    firstNameRequired: 'שם פרטי נדרש',
    lastNameRequired: 'שם משפחה נדרש',
    updateError: 'שגיאה בעדכון',
    currentPasswordRequired: 'סיסמה נוכחית נדרשת',
    newPasswordRequired: 'סיסמה חדשה נדרשת',
    passwordTooShort: 'הסיסמה חייבת להכיל לפחות 8 תווים',
    passwordRequirements: 'הסיסמה חייבת להכיל אות גדולה, אות קטנה, מספר ותו מיוחד',
    confirmPasswordRequired: 'אישור סיסמה נדרש',
    passwordsNotMatch: 'הסיסמאות אינן תואמות',
    passwordChangeError: 'שגיאה בשינוי הסיסמה',
    changePassword: 'שנה סיסמה',
    currentPassword: 'סיסמה נוכחית',
    newPassword: 'סיסמה חדשה',
    confirmPassword: 'אישור סיסמה',
    changing: 'משנה...',
    currentPasswordPlaceholder: 'הכנס את הסיסמה הנוכחית',
    newPasswordPlaceholder: 'הכנס סיסמה חדשה',
    confirmPasswordPlaceholder: 'אשר את הסיסמה החדשה',
    passwordRequirementsText: 'לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד'
  },

  // Roles
  roles: {
    admin: 'מנהל',
    business: 'עסק',
    user: 'משתמש'
  },


  // Authentication
  auth: {
    login: 'התחברות',
    register: 'הרשמה',
    logout: 'התנתקות',
    email: 'אימייל',
    password: 'סיסמה',
    confirmPassword: 'אישור סיסמה',
    firstName: 'שם פרטי',
    lastName: 'שם משפחה',
    phone: 'טלפון',
    role: 'תפקיד',
    loginButton: 'התחבר',
    registerButton: 'הירשם',
    forgotPassword: 'שכחת סיסמה?',
    rememberMe: 'זכור אותי',
    alreadyHaveAccount: 'יש לך כבר חשבון?',
    dontHaveAccount: 'אין לך חשבון?',
    loginSuccess: 'התחברת בהצלחה',
    registerSuccess: 'נרשמת בהצלחה',
    loginError: 'שגיאה בהתחברות',
    registerError: 'שגיאה בהרשמה',
    logoutSuccess: 'התנתקת בהצלחה',
    invalidCredentials: 'פרטי התחברות שגויים',
    userExists: 'משתמש כבר קיים',
    userNotFound: 'משתמש לא נמצא',
    emailPlaceholder: 'הכנס כתובת אימייל',
    firstNamePlaceholder: 'הכנס שם פרטי',
    lastNamePlaceholder: 'הכנס שם משפחה',
    phonePlaceholder: 'הכנס מספר טלפון',
    passwordPlaceholder: 'הכנס סיסמה',
    confirmPasswordPlaceholder: 'אשר סיסמה',
    loginImageAlt: 'תמונת התחברות',
    registerImageAlt: 'תמונת הרשמה',
    userAccount: 'חשבון משתמש',
    businessAccount: 'חשבון עסקי',
    signIn: 'התחבר',
    optional: 'אופציונלי',
    loginRequired: 'נדרשת התחברות',
    loginToAccount: 'התחבר לחשבון שלך',
    signUp: 'הירשם',
    noAccount: 'אין לך חשבון?',
    welcomeBackFuture: 'ברוך הבא לעתיד',
    loginDescription: 'התחבר לחשבון שלך וגלה את העולם הדיגיטלי של כרטיסי הביקור'
  },

  // Cards
  cards: {
    title: 'כרטיסי ביקור',
    subtitle: 'גלה כרטיסי ביקור דיגיטליים מקצועיים',
    noCards: 'לא נמצאו כרטיסים',
    loadError: 'שגיאה בטעינת הכרטיסים',
    searchPlaceholder: 'חפש כרטיסים...',
    filterByCategory: 'סנן לפי קטגוריה',
    sortBy: 'מיין לפי',
    tryDifferentSearch: 'נסה חיפוש אחר או סנן שונה',
    beFirstToCreate: 'היה הראשון ליצור כרטיס!',
    gallery: {
      title: 'גלריית כרטיסים',
      subtitle: 'חקור כרטיסי ביקור דיגיטליים מקצועיים'
    },
    sortOptions: {
      newest: 'החדשים ביותר',
      oldest: 'הישנים ביותר',
      popular: 'פופולריים',
      alphabetical: 'אלפביתי'
    },
    categories: {
      all: 'הכל',
      technology: 'טכנולוגיה',
      design: 'עיצוב',
      marketing: 'שיווק',
      business: 'עסקים',
      finance: 'כספים',
      medical: 'רפואה',
      education: 'חינוך',
      legal: 'משפטים'
    },
    viewCard: 'צפה בכרטיס',
    likeCard: 'לייק',
    shareCard: 'שתף',
    reportCard: 'דווח',
    views: 'צפיות',
    likes: 'לייקים',
    created: 'נוצר',
    updated: 'עודכן',
    clearFilters: 'נקה מסננים',
    notFound: 'כרטיס לא נמצא',
    updatedDemo: 'הכרטיס עודכן בהצלחה (מצב הדגמה)',
    deletedDemo: 'הכרטיס נמחק בהצלחה (מצב הדגמה)'
  },

  // Card Details
  cardDetails: {
    metaDescription: 'כרטיס ביקור דיגיטלי של {{name}} - {{subtitle}} ב-{{company}}',
    loadError: 'שגיאה בטעינת הכרטיס',
    notFound: 'הכרטיס לא נמצא',
    contact: 'צור קשר',
    call: 'התקשר',
    sendEmail: 'שלח אימייל',
    visitWebsite: 'בקר באתר',
    getDirections: 'קבל הוראות נסיעה',
    shareCard: 'שתף כרטיס',
    addToFavorites: 'הוסף למועדפים',
    removeFromFavorites: 'הסר מהמועדפים',
    cardShared: 'הכרטיס שותף בהצלחה',
    shareError: 'שגיאה בשיתוף הכרטיס'
  },

  // Create Card
  createCard: {
    title: 'צור כרטיס ביקור חדש',
    subtitle: 'צור כרטיס ביקור דיגיטלי מקצועי',
    basicInfo: 'מידע בסיסי',
    contactInfo: 'פרטי קשר',
    businessInfo: 'מידע עסקי',
    imagePreview: 'תצוגה מקדימה של תמונה',
    profileImage: 'תמונת פרופיל',
    fullNamePreview: 'השם שלך',
    jobTitlePreview: 'התפקיד שלך',
    preview: 'תצוגה מקדימה',
    design: 'עיצוב',
    name: 'שם',
    jobTitle: 'תואר',
    company: 'חברה',
    description: 'תיאור',
    email: 'אימייל',
    phone: 'טלפון',
    website: 'אתר',
    address: 'כתובת',
    metaDescription: 'צור כרטיס ביקור דיגיטלי מקצועי עם FuturistCards',
    category: 'קטגוריה',
    image: 'תמונה',
    logo: 'לוגו',
    color: 'צבע',
    template: 'תבנית',
    createButton: 'צור כרטיס',
    saveButton: 'שמור כרטיס',
    resetButton: 'אפס טופס',
    createSuccess: 'הכרטיס נוצר בהצלחה',
    createError: 'שגיאה ביצירת הכרטיס',
    updateSuccess: 'הכרטיס עודכן בהצלחה',
    updateError: 'שגיאה בעדכון הכרטיס',
    placeholders: {
      name: 'הכנס את שמך המלא',
      title: 'למשל: מפתח תוכנה בכיר',
      company: 'שם החברה',
      description: 'תאר את עצמך ואת השירותים שלך',
      email: 'your.email@example.com',
      phone: '050-123-4567',
      website: 'https://www.example.com',
      address: 'רחוב, עיר, מדינה'
    }
  },

  // Favorites
  favorites: {
    title: 'המועדפים שלי',
    metaDescription: 'הכרטיסים המועדפים עליך במקום אחד',
    noFavorites: 'אין לך כרטיסים מועדפים עדיין',
    noFavoritesDescription: 'התחל לחקור כרטיסים ולחץ על הלב כדי להוסיף אותם למועדפים שלך',
    exploreCards: 'חקור כרטיסים',
    loading: 'טוען מועדפים...',
    loadError: 'שגיאה בטעינת המועדפים',
    sortRecent: 'לפי תאריך',
    sortPopular: 'לפי פופולריות',
    sortAlphabetical: 'לפי א-ב',
    cardCount: 'כרטיסים מועדפים',
    searchResults: '{{count}} תוצאות נמצאו עבור "{{term}}"',
    views: 'צפיות',
    viewDetails: 'צפה בפרטים',
    removeFromFavorites: 'הסר מהמועדפים',
    added: 'נוסף למועדפים',
    removed: 'הוסר מהמועדפים'
  },

  // My Cards
  myCards: {
    title: 'הכרטיסים שלי',
    subtitle: 'נהל את כרטיסי הביקור שלך',
    noCards: 'אין לך כרטיסים עדיין',
    noCardsDescription: 'צור את הכרטיס הראשון שלך כדי להתחיל',
    createFirst: 'צור כרטיס ראשון',
    loading: 'טוען כרטיסים...',
    loadError: 'שגיאה בטעינת הכרטיסים',
    deleteConfirm: 'האם אתה בטוח שברצונך למחוק כרטיס זה?',
    deleteSuccess: 'הכרטיס נמחק בהצלחה',
    deleteError: 'שגיאה במחיקת הכרטיס',
    editCard: 'ערוך כרטיס',
    viewCard: 'צפה בכרטיס',
    shareCard: 'שתף כרטיס',
    duplicateCard: 'שכפל כרטיס',
    cardStats: 'סטטיסטיקות כרטיס'
  },

  // Profile
  profile: {
    title: 'פרופיל',
    subtitle: 'נהל את הפרופיל שלך',
    personalInfo: 'מידע אישי',
    avatarAlt: 'תמונת פרופיל',
    noName: 'ללא שם',
    member: 'חבר מאז',
    company: 'חברה',
    position: 'תפקיד',
    bio: 'אודות',
    addressPlaceholder: 'הכנס כתובת',
    companyPlaceholder: 'הכנס שם חברה',
    positionPlaceholder: 'הכנס תפקיד',
    bioPlaceholder: 'ספר על עצמך...',
    saveChanges: 'שמור שינויים',
    updateSuccess: 'הפרופיל עודכן בהצלחה',
    updateError: 'שגיאה בעדכון הפרופיל',
    roles: {
      admin: 'מנהל',
      business: 'עסק', 
      user: 'משתמש'
    }
  },

  // About Page
  about: {
    title: 'אודות FuturistCards',
    description: 'הפלטפורמה המובילה ליצירת כרטיסי ביקור דיגיטליים מתקדמים',
    leadingPlatform: 'הפלטפורמה המובילה',
    ourMission: 'המשימה שלנו',
    missionDescription: 'אנו מחויבים לספק פתרונות דיגיטליים מתקדמים ליצירת כרטיסי ביקור מקצועיים',
    platformDescription: 'FuturistCards היא פלטפורמה חדשנית המאפשרת ליצור כרטיסי ביקור דיגיטליים מקצועיים בקלות ובמהירות',
    ourVision: 'החזון שלנו',
    visionDescription: 'להפוך את כרטיסי הביקור הדיגיטליים לסטנדרט בעולם העסקי המודרני',
    readyToStart: 'מוכן להתחיל?',
    joinThousands: 'הצטרף לאלפי משתמשים המשתמשים בפלטפורמה שלנו',
    createMyCard: 'צור את הכרטיס שלי',
    createAccount: 'צור חשבון',
    discoverCards: 'גלה כרטיסים',
    completelyFree: 'חינם לחלוטין',
    secureAndSafe: 'בטוח ומאובטח',
    fiveStarRating: 'דירוג 5 כוכבים',
    features: {
      fast: {
        title: 'מהיר וקל',
        description: 'צור כרטיס ביקור מקצועי תוך דקות ספורות'
      },
      share: {
        title: 'שתף בקלות',
        description: 'שתף את הכרטיס שלך בכל הפלטפורמות הדיגיטליות'
      },
      secure: {
        title: 'בטוח ומאובטח',
        description: 'הנתונים שלך מוגנים ברמת האבטחה הגבוהה ביותר'
      }
    },
    stats: {
      users: 'משתמשים',
      cards: 'כרטיסים',
      satisfaction: 'שביעות רצון',
      support: 'תמיכה'
    }
  },



  // Dashboard
  dashboard: {
    title: 'לוח בקרה',
    welcome: 'ברוך הבא',
    stats: {
      totalCards: 'סה"כ כרטיסים',
      totalViews: 'סה"כ צפיות',
      totalLikes: 'סה"כ לייקים',
      monthlyViews: 'צפיות חודשיות'
    },
    recentCards: 'כרטיסים אחרונים',
    recentActivity: 'פעילות אחרונה',
    activity: {
      cardCreated: 'כרטיס נוצר',
      cardViewed: 'כרטיס נצפה',
      favoriteAdded: 'נוסף למועדפים'
    },
    time: {
      now: 'עכשיו',
      minutesAgo: 'לפני {{minutes}} דקות',
      hoursAgo: 'לפני {{hours}} שעות',
      yesterday: 'אתמול'
    }
  },

  // Contact
  contact: {
    title: 'צור קשר',
    subtitle: 'נשמח לשמוע ממך',
    form: {
      name: 'שם מלא',
      email: 'אימייל',
      subject: 'נושא',
      message: 'הודעה',
      send: 'שלח הודעה',
      sending: 'שולח...',
      success: 'ההודעה נשלחה בהצלחה!'
    },
    info: {
      email: 'אימייל',
      phone: 'טלפון',
      address: 'כתובת'
    },
    validation: {
      nameRequired: 'שם נדרש',
      emailRequired: 'אימייל נדרש',
      emailInvalid: 'כתובת אימייל לא תקינה',
      subjectRequired: 'נושא נדרש',
      messageRequired: 'הודעה נדרשת',
      messageMinLength: 'ההודעה חייבת להכיל לפחות 10 תווים'
    }
  },

  // Admin
  admin: {
    title: 'ניהול מערכת',
    subtitle: 'ניהול מערכת ומשתמשים',
    welcome: 'ברוך הבא {{name}}',
    refreshData: 'רענן נתונים',
    today: 'היום',
    connected: 'מחובר',
    disconnected: 'מנותק',
    users: 'משתמשים',
    cards: 'כרטיסים',
    reports: 'דוחות',
    cardNoName: 'כרטיס ללא שם',
    user: 'משתמש',
    anonymousUser: 'משתמש אנונימי',
    registeredUser: 'משתמש רשום',
    quickActions: 'פעולות מהירות',
    refreshStats: 'רענן סטטיסטיקות',
    systemStatus: 'סטטוס המערכת',
    roles: {
      admin: 'מנהל',
      business: 'עסק',
      user: 'משתמש'
    },
    stats: {
      totalUsers: 'סה"כ משתמשים',
      totalCards: 'סה"כ כרטיסים',
      totalLikes: 'סה"כ לייקים',
      activeUsers: 'משתמשים פעילים'
    },
    charts: {
      usersRealTime: 'משתמשים בזמן אמת',
      cardsRealTime: 'כרטיסים בזמן אמת',
      likesRealTime: 'לייקים בזמן אמת',
      viewsRealTime: 'צפיות בזמן אמת',
      activeUsers: 'משתמשים פעילים'
    },
    tabs: {
      overview: 'סקירה כללית',
      realtime: 'זמן אמת',
      users: 'משתמשים',
      cards: 'כרטיסים',
      reports: 'דוחות'
    },
    simulation: {
      simulateNewUser: 'הדמה משתמש חדש',
      simulateNewCard: 'הדמה כרטיס חדש',
      simulateNewLike: 'הדמה לייק חדש',
      newUserMessage: 'משתמש חדש נרשם למערכת',
      newUser: 'משתמש חדש',
      newCardMessage: 'כרטיס חדש נוצר',
      cardCreator: 'יוצר כרטיס',
      newLikeMessage: 'כרטיס קיבל לייק חדש',
      fan: 'מעריץ'
    },
    metrics: {
      uptime: 'זמינות',
      responseTime: 'זמן תגובה',
      serverUsage: 'שימוש בשרת',
      databaseUsage: 'שימוש במסד נתונים'
    }
  },

  // Mock Data
  mockData: {
    myCards: {
      card1: {
        title: 'יוחנן כהן',
        subtitle: 'מפתח Full Stack',
        company: 'TechCorp',
        description: 'מפתח מנוסה עם התמחות ב-React ו-Node.js'
      },
      card2: {
        title: 'שרה לוי',
        subtitle: 'מעצבת UI/UX',
        company: 'DesignStudio',
        description: 'מעצבת יצירתית עם ניסיון בעיצוב ממשקי משתמש'
      }
    }
  },


  // Edit Card
  editCard: {
    title: 'עריכת כרטיס ביקור',
    subtitle: 'ערוך ועדכן את כרטיס הביקור שלך',
    preview: 'תצוגה מקדימה',
    profileImage: 'תמונת פרופיל',
    yourName: 'השם שלך',
    yourTitle: 'התואר שלך',
    yourCompany: 'החברה שלך',
    yourDescription: 'התיאור שלך',
    previewAlt: 'תצוגה מקדימה של הכרטיס',
    addImage: 'הוסף תמונה',
    fullName: 'שם מלא',
    fullNamePlaceholder: 'הכנס שם מלא',
    imageTooLarge: 'התמונה גדולה מדי (מקסימום 5MB)',
    cardNotFound: 'כרטיס לא נמצא',
    updateSuccess: 'הכרטיס עודכן בהצלחה',
    updateError: 'שגיאה בעדכון הכרטיס',
    accessDenied: 'גישה נדחתה',
    businessAccountRequired: 'נדרש חשבון עסקי',
    backToMyCards: 'חזור לכרטיסים שלי',
    cardNotFoundTitle: 'כרטיס לא נמצא',
    cardNotFoundMessage: 'הכרטיס שחיפשת לא קיים או שנמחק',
    colors: {
      darkBlue: 'כחול כהה',
      purple: 'סגול',
      green: 'ירוק',
      red: 'אדום',
      turquoise: 'טורקיז',
      pink: 'ורוד'
    },
    stats: {
      totalCards: 'סה"כ כרטיסים',
      totalViews: 'סה"כ צפיות',
      totalLikes: 'סה"כ לייקים',
      averageRating: 'דירוג ממוצע'
    }
  },


  // Unauthorized
  unauthorized: {
    title: 'גישה לא מורשית',
    message: 'אין לך הרשאה לגשת לדף זה',
    loginRequired: 'נדרשת התחברות למערכת',
    goHome: 'חזור לדף הבית',
    login: 'התחבר'
  },

  // Services
  services: {
    title: 'השירותים שלנו',
    subtitle: 'פתרונות דיגיטליים מתקדמים לעסק שלך',
    sparkle: '✨',
    badge: 'השירותים המתקדמים ביותר',
    personalizedTitle: 'שלום',
    loggedInSubtitle: 'גלה את השירותים המתקדמים שלנו המותאמים במיוחד עבורך',
    closeModal: 'סגור',
    cta: {
      getQuote: 'קבל הצעת מחיר',
      viewPortfolio: 'צפה בתיק העבודות'
    },
    modal: {
      startingPrice: 'מחיר התחלתי',
      deliveryTime: 'זמן אספקה',
      call: 'התקשר',
      email: 'שלח מייל',
      startProject: 'התחל פרויקט'
    },
    hero: {
      subtitle: 'פתרונות דיגיטליים מתקדמים לעסק שלך'
    },
    benefits: {
      quality: {
        title: 'איכות מעולה',
        description: 'אנו מתחייבים לאיכות הגבוהה ביותר בכל פרויקט'
      },
      speed: {
        title: 'מהירות ביצוע',
        description: 'פרויקטים מסופקים במועד ובמהירות מקסימלית'
      },
      support: {
        title: 'תמיכה מלאה',
        description: 'תמיכה טכנית מלאה לאחר מסירת הפרויקט'
      }
    },
    categories: {
      all: 'הכל',
      development: 'פיתוח',
      mobile: 'מובייל',
      design: 'עיצוב',
      ecommerce: 'מסחר אלקטרוני',
      marketing: 'שיווק',
      security: 'אבטחה'
    },
    card: {
      startingPrice: 'מחיר התחלתי',
      reviews: 'ביקורות',
      clients: 'לקוחות',
      moreDetails: 'פרטים נוספים',
      orderNow: 'הזמן עכשיו',
      additionalFeatures: 'תכונות נוספות'
    },
    webDevelopment: {
      title: 'פיתוח אתרים',
      description: 'אתרים מקצועיים ומותאמים אישית',
      startingPrice: '₪2,500',
      deliveryTime: '2-4 שבועות',
      price: '₪2,500 - ₪15,000',
      duration: '2-4 שבועות',
      features: {
        react: 'פיתוח React',
        node: 'שרת Node.js',
        database: 'מסד נתונים',
        api: 'API מותאם'
      }
    },
    mobileApp: {
      title: 'אפליקציות מובייל',
      description: 'אפליקציות iOS ו-Android מתקדמות',
      startingPrice: '₪8,000',
      deliveryTime: '6-12 שבועות',
      price: '₪8,000 - ₪50,000',
      duration: '6-12 שבועות',
      features: {
        reactNative: 'React Native',
        flutter: 'Flutter',
        platforms: 'iOS ו-Android',
        deploy: 'פרסום בחנויות'
      }
    },
    uiuxDesign: {
      title: 'עיצוב UI/UX',
      description: 'עיצוב ממשק משתמש מקצועי',
      startingPrice: '₪1,800',
      deliveryTime: '1-3 שבועות',
      price: '₪1,800 - ₪8,000',
      duration: '1-3 שבועות',
      features: {
        figma: 'עיצוב ב-Figma',
        prototyping: 'אבטיפוס אינטראקטיבי',
        designSystem: 'מערכת עיצוב',
        userTesting: 'בדיקות משתמש'
      }
    },
    ecommerce: {
      title: 'חנויות אונליין',
      description: 'פלטפורמות מכירה מתקדמות',
      startingPrice: '₪4,500',
      deliveryTime: '3-6 שבועות',
      price: '₪4,500 - ₪25,000',
      duration: '3-6 שבועות',
      features: {
        shopify: 'פלטפורמת Shopify',
        payment: 'מערכת תשלומים',
        stock: 'ניהול מלאי',
        analytics: 'אנליטיקה מתקדמת'
      }
    },
    digitalMarketing: {
      title: 'שיווק דיגיטלי',
      description: 'קמפיינים ממוקדים ויעילים',
      startingPrice: '₪1,200',
      deliveryTime: '1-2 שבועות',
      price: '₪1,200 - ₪10,000',
      duration: '1-2 שבועות',
      features: {
        seo: 'קידום אתרים (SEO)',
        social: 'שיווק ברשתות חברתיות',
        content: 'יצירת תוכן',
        analytics: 'מדידה וניתוח'
      }
    },
    cybersecurity: {
      title: 'אבטחת מידע',
      description: 'הגנה מתקדמת על הנתונים שלך',
      startingPrice: '₪3,000',
      deliveryTime: '2-4 שבועות',
      price: '₪3,000 - ₪20,000',
      duration: '2-4 שבועות',
      features: {
        audit: 'ביקורת אבטחה',
        ssl: 'הצפנת SSL',
        backup: 'גיבוי מאובטח',
        monitoring: 'ניטור 24/7'
      }
    }
  },

  // Packs
  packs: {
    title: 'תוכניות מחיר',
    subtitle: 'בחר את התוכנית המתאימה לך',
    popular: 'פופולרי',
    perMonth: 'לחודש',
    billing: {
      monthly: 'חיוב חודשי',
      yearly: 'חיוב שנתי',
      billedYearly: 'חיוב שנתי',
      save: 'חסוך'
    },
    cta: {
      choosePlan: 'בחר תוכנית'
    },
    basic: {
      name: 'בסיסי',
      description: 'מושלם להתחלה',
      features: {
        cards: 'כרטיסי ביקור',
        storage: 'שטח אחסון',
        analytics: 'אנליטיקה בסיסית',
        support: 'תמיכה',
        customDomain: 'דומיין מותאם',
        api: 'גישה ל-API',
        whiteLabel: 'מיתוג לבן',
        priority: 'תמיכה מועדפת'
      }
    },
    pro: {
      name: 'מקצועי',
      description: 'לעסקים קטנים ובינוניים',
      features: {
        cards: 'כרטיסי ביקור',
        storage: 'שטח אחסון',
        analytics: 'אנליטיקה מתקדמת',
        support: 'תמיכה',
        customDomain: 'דומיין מותאם',
        api: 'גישה ל-API',
        whiteLabel: 'מיתוג לבן',
        priority: 'תמיכה מועדפת'
      }
    },
    enterprise: {
      name: 'ארגוני',
      description: 'לארגונים גדולים',
      features: {
        cards: 'כרטיסי ביקור',
        storage: 'שטח אחסון',
        analytics: 'אנליטיקה מלאה',
        support: 'תמיכה',
        customDomain: 'דומיין מותאם',
        api: 'גישה ל-API',
        whiteLabel: 'מיתוג לבן',
        priority: 'תמיכה מועדפת'
      }
    },
    storage: {
      oneGB: '1GB',
      tenGB: '10GB',
      hundredGB: '100GB'
    },
    supportTypes: {
      email: 'אימייל',
      chatEmail: 'צ\'אט ואימייל',
      phoneSupport: 'תמיכה טלפונית 24/7'
    },
    limits: {
      unlimited: 'ללא הגבלה',
      fiveGB: '5GB',
      tenGB: '10GB',
      twentyFiveGB: '25GB'
    }
  },


  // Mini Card Form
  miniCardForm: {
    validation: {
      titleRequired: 'כותרת נדרשת',
      descriptionRequired: 'תיאור נדרש',
      descriptionMin: 'התיאור חייב להכיל לפחות 10 תווים',
      emailRequired: 'אימייל נדרש',
      emailInvalid: 'כתובת אימייל לא תקינה',
      phoneRequired: 'טלפון נדרש',
      websiteInvalid: 'כתובת אתר לא תקינה'
    }
  }
};

// Helper function to get translation
export const t = (key, params = {}) => {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      // Translation key not found - return key as fallback
      return key;
    }
  }
  
  if (typeof value === 'string' && params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => params[param] || match);
  }
  
  return value || key;
};

export default translations;

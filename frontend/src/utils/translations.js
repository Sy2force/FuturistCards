// Hebrew translations for FuturistCards
const translations = {
  // Validation messages
  validation: {
    required: 'שדה זה הוא חובה',
    email: 'כתובת אימייל לא תקינה',
    minLength: 'אורך מינימלי: {{min}} תווים',
    maxLength: 'אורך מקסימלי: {{max}} תווים',
    phone: 'מספר טלפון לא תקין',
    url: 'כתובת URL לא תקינה',
    password: 'הסיסמה חייבת להכיל לפחות 8 תווים, אות גדולה, אות קטנה, ספרה וסימן מיוחד',
    passwordMatch: 'הסיסמאות אינן תואמות',
    businessOnly: 'פעולה זו זמינה רק למשתמשי עסק',
    adminOnly: 'פעולה זו זמינה רק למנהלים'
  },

  // Navigation
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
    contextError: 'שגיאה בהקשר הרכיב'
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
    roles: {
      user: 'משתמש',
      business: 'עסק',
      admin: 'מנהל'
    }
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
    updated: 'עודכן'
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
    removeFromFavorites: 'הסר מהמועדפים'
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
    updateError: 'שגיאה בעדכון הפרופיל'
  },

  // Edit Card
  editCard: {
    pageTitle: 'עריכת כרטיס',
    pageDescription: 'ערוך את כרטיס הביקור שלך',
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
      activeCards: 'כרטיסים פעילים'
    }
  },

  // Unauthorized
  unauthorized: {
    title: 'נדרשת התחברות',
    description: 'כדי לצפות במועדפים שלך, עליך להתחבר תחילה',
    login: 'התחבר'
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

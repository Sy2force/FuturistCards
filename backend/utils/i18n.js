/**
 * Backend i18n system for Hebrew translations
 * All API responses will be in Hebrew
 */

const hebrewTranslations = {
  // Authentication messages
  auth: {
    nameRequired: 'השם חייב להכיל לפחות 2 תווים',
    emailExists: 'כתובת האימייל הזו כבר בשימוש',
    accountCreated: 'החשבון נוצר בהצלחה',
    registrationError: 'שגיאה ברישום',
    invalidCredentials: 'אימייל או סיסמה שגויים',
    loginSuccess: 'התחברות הצליחה',
    loginError: 'שגיאת התחברות',
    logoutSuccess: 'התנתקות הצליחה',
    profileUpdated: 'הפרופיל עודכן',
    updateError: 'שגיאה בעדכון',
    wrongCurrentPassword: 'הסיסמה הנוכחית שגויה',
    passwordChanged: 'הסיסמה שונתה בהצלחה',
    passwordChangeError: 'שגיאה בשינוי הסיסמה'
  },

  // General server messages
  server: {
    serverError: 'שגיאת שרת',
    accessDenied: 'הגישה נדחתה',
    adminRequired: 'נדרש הרשאת מנהל',
    businessRequired: 'רק חשבונות עסקיים יכולים ליצור כרטיסים',
    notFound: 'לא נמצא',
    invalidData: 'נתונים לא תקינים'
  },

  // User management
  users: {
    userNotFound: 'המשתמש לא נמצא',
    userUpdated: 'המשתמש עודכן בהצלחה',
    userDeleted: 'המשתמש נמחק בהצלחה',
    cannotDeleteSelf: 'לא ניתן למחוק את החשבון שלך',
    profileUpdated: 'הפרופיל עודכן בהצלחה (מצב דמו)',
    demoLoginSuccess: 'התחברות דמו הצליחה',
    demoLoginError: 'שגיאה בהתחברות דמו',
    demoBusinessLoginSuccess: 'התחברות דמו עסקי הצליחה',
    demoBusinessLoginError: 'שגיאה בהתחברות דמו עסקי',
    statsError: 'שגיאה בטעינת הסטטיסטיקות',
    usersError: 'שגיאה בטעינת המשתמשים'
  },

  // Card management
  cards: {
    cardNotFound: 'הכרטיס לא נמצא',
    cardCreated: 'הכרטיס נוצר בהצלחה',
    cardUpdated: 'הכרטיס עודכן בהצלחה',
    cardDeleted: 'הכרטיס נמחק בהצלחה',
    cardDeletedMock: 'הכרטיס נמחק בהצלחה (מצב דמו)',
    cardsError: 'שגיאה בטעינת הכרטיסים',
    createError: 'שגיאה ביצירת הכרטיס',
    updateError: 'שגיאה בעדכון הכרטיס',
    deleteError: 'שגיאה במחיקת הכרטיס',
    unauthorized: 'אין לך הרשאה לבצע פעולה זו'
  },

  // Favorites
  favorites: {
    addedToFavorites: 'הכרטיס נוסף למועדפים (מצב דמו)',
    removedFromFavorites: 'הכרטיس הוסר מהמועדפים (מצב דמו)',
    favoritesError: 'שגיאה בטעינת המועדפים'
  },

  // Likes
  likes: {
    cardLiked: 'הכרטיס קיבל לייק בהצלחה',
    cardUnliked: 'הלייק הוסר בהצלחה',
    likeError: 'שגיאה בעדכון הלייק',
    likeStatusError: 'שגיאה בטעינת סטטוס הלייק'
  },

  // Admin actions
  admin: {
    invalidRole: 'תפקיד לא תקין. חייב להיות user, business או admin',
    roleUpdated: 'התפקיד עודכן בהצלחה',
    roleUpdatedMock: 'התפקיד עודכן בהצלחה (מצב דמו)'
  },

  // Validation messages
  validation: {
    required: 'שדה חובה',
    emailInvalid: 'כתובת אימייל לא תקינה',
    passwordTooShort: 'הסיסמה חייבת להכיל לפחות 6 תווים',
    phoneInvalid: 'מספר טלפון לא תקין'
  }
};

/**
 * Get translated message
 * @param {string} key - Translation key (e.g., 'auth.loginSuccess')
 * @param {string} fallback - Fallback message if key not found
 * @returns {string} Translated message in Hebrew
 */
const t = (key, fallback = 'שגיאה כללית') => {
  const keys = key.split('.');
  let result = hebrewTranslations;
  
  for (const k of keys) {
    if (result && typeof result === 'object' && result[k]) {
      result = result[k];
    } else {
      return fallback;
    }
  }
  
  return typeof result === 'string' ? result : fallback;
};

module.exports = {
  t,
  hebrewTranslations
};

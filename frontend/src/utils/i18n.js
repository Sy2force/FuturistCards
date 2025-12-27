import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        cards: 'Cards',
        about: 'About',
        login: 'Login',
        register: 'Register',
        logout: 'Logout'
      },
      auth: {
        loginTitle: 'Login',
        registerTitle: 'Register',
        registerSubtitle: 'Create your account',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        phone: 'Phone',
        accountType: 'Account Type',
        userAccount: 'User Account',
        businessAccount: 'Business Account',
        adminAccount: 'Admin Account',
        loginButton: 'Login',
        firstNamePlaceholder: 'Enter your first name',
        lastNamePlaceholder: 'Enter your last name',
        emailPlaceholder: 'Enter your email',
        passwordPlaceholder: 'Enter your password',
        confirmPasswordPlaceholder: 'Confirm your password',
        phonePlaceholder: 'Enter your phone number'
      },
      validation: {
        required: 'All fields are required',
        invalidEmail: 'Invalid email format',
        invalidPhone: 'Invalid phone format',
        passwordRequirements: 'Password must be 8+ chars with uppercase, lowercase, number and special character',
        passwordsNotMatch: 'Passwords do not match',
        registerSuccess: 'Registration successful!',
        registerSubmit: 'Register',
        haveAccount: 'Already have an account?',
        optional: 'optional',
        userAccountDesc: 'Browse and favorite cards',
        businessAccountDesc: 'Create and manage your business cards',
        adminAccountDesc: 'Full system administration access'
      },
      footer: {
        description: 'Create and share your professional digital business cards',
        quickLinks: 'Quick Links',
        support: 'Support',
        help: 'Help',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookies'
      },
      common: {
        contact: 'Contact',
        allRightsReserved: 'All rights reserved'
      },
      unauthorized: {
        title: 'Access Denied',
        message: 'You do not have permission to access this page.',
        backToCards: 'Back to Cards',
        backToHome: 'Back to Home'
      }
    }
  },
  fr: {
    translation: {
      navbar: {
        home: 'Accueil',
        cards: 'Cartes',
        about: 'À propos',
        login: 'Connexion',
        register: 'Inscription',
        logout: 'Déconnexion'
      },
      auth: {
        loginTitle: 'Connexion',
        registerTitle: 'Inscription',
        registerSubtitle: 'Créez votre compte',
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        phone: 'Téléphone',
        accountType: 'Type de compte',
        userAccount: 'Compte Utilisateur',
        businessAccount: 'Compte Business',
        adminAccount: 'Compte Admin',
        loginButton: 'Se connecter',
        firstNamePlaceholder: 'Entrez votre prénom',
        lastNamePlaceholder: 'Entrez votre nom',
        emailPlaceholder: 'Entrez votre email',
        passwordPlaceholder: 'Entrez votre mot de passe',
        confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
        phonePlaceholder: 'Entrez votre numéro de téléphone'
      },
      validation: {
        required: 'Tous les champs sont requis',
        invalidEmail: 'Format email invalide',
        invalidPhone: 'Format téléphone invalide',
        passwordRequirements: 'Le mot de passe doit contenir 8+ caractères avec majuscule, minuscule, chiffre et caractère spécial',
        passwordsNotMatch: 'Les mots de passe ne correspondent pas',
        registerSuccess: 'Inscription réussie !',
        registerSubmit: 'S\'inscrire',
        haveAccount: 'Vous avez déjà un compte ?',
        optional: 'optionnel',
        userAccountDesc: 'Parcourir et ajouter des cartes aux favoris',
        businessAccountDesc: 'Créer et gérer vos cartes de visite',
        adminAccountDesc: 'Accès complet à l\'administration système'
      },
      footer: {
        description: 'Créez et partagez vos cartes de visite numériques professionnelles',
        quickLinks: 'Liens Rapides',
        support: 'Support',
        help: 'Aide',
        privacy: 'Politique de confidentialité',
        terms: 'Conditions d\'utilisation',
        cookies: 'Cookies'
      },
      common: {
        contact: 'Contact',
        allRightsReserved: 'Tous droits réservés'
      },
      unauthorized: {
        title: 'Accès refusé',
        message: 'Vous n\'avez pas la permission d\'accéder à cette page.',
        backToCards: 'Retour aux cartes',
        backToHome: 'Retour à l\'accueil'
      }
    }
  },
  he: {
    translation: {
      navbar: {
        home: 'בית',
        cards: 'כרטיסים',
        about: 'אודות',
        login: 'התחברות',
        register: 'הרשמה',
        logout: 'התנתקות'
      },
      auth: {
        loginTitle: 'התחברות',
        registerTitle: 'הרשמה',
        registerSubtitle: 'צור את החשבון שלך',
        firstName: 'שם פרטי',
        lastName: 'שם משפחה',
        email: 'אימייל',
        password: 'סיסמה',
        confirmPassword: 'אשר סיסמה',
        phone: 'טלפון',
        accountType: 'סוג חשבון',
        userAccount: 'חשבון משתמש',
        businessAccount: 'חשבון עסקי',
        adminAccount: 'חשבון מנהל',
        loginButton: 'התחבר',
        firstNamePlaceholder: 'הכנס את השם הפרטי שלך',
        lastNamePlaceholder: 'הכנס את שם המשפחה שלך',
        emailPlaceholder: 'הכנס את האימייל שלך',
        passwordPlaceholder: 'הכנס את הסיסמה שלך',
        confirmPasswordPlaceholder: 'אשר את הסיסמה שלך',
        phonePlaceholder: 'הכנס את מספר הטלפון שלך'
      },
      validation: {
        required: 'כל השדות נדרשים',
        invalidEmail: 'פורמט אימייל לא תקין',
        invalidPhone: 'פורמט טלפון לא תקין',
        passwordRequirements: 'הסיסמה חייבת להכיל 8+ תווים עם אות גדולה, קטנה, מספר ותו מיוחד',
        passwordsNotMatch: 'הסיסמאות אינן תואמות',
        registerSuccess: 'הרשמה בוצעה בהצלחה!',
        registerSubmit: 'הירשם',
        haveAccount: 'יש לך כבר חשבון?',
        optional: 'אופציונלי',
        userAccountDesc: 'עיון והוספת כרטיסים למועדפים',
        businessAccountDesc: 'יצירה וניהול כרטיסי הביקור העסקיים שלך',
        adminAccountDesc: 'גישה מלאה לניהול המערכת'
      },
      footer: {
        description: 'צור ושתף את כרטיסי הביקור הדיגיטליים המקצועיים שלך',
        quickLinks: 'קישורים מהירים',
        support: 'תמיכה',
        help: 'עזרה',
        privacy: 'מדיניות פרטיות',
        terms: 'תנאי שירות',
        cookies: 'עוגיות'
      },
      common: {
        contact: 'צור קשר',
        allRightsReserved: 'כל הזכויות שמורות'
      },
      unauthorized: {
        title: 'גישה נדחתה',
        message: 'אין לך הרשאה לגשת לעמוד זה.',
        backToCards: 'חזור לכרטיסים',
        backToHome: 'חזור לבית'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

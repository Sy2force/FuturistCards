import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Simple translations - English only for now
const resources = {
  en: {
    translation: {
      // Common
      'common.loading': 'Loading...',
      'common.error': 'An error occurred',
      'common.save': 'Save',
      'common.cancel': 'Cancel',
      'common.delete': 'Delete',
      'common.edit': 'Edit',
      'common.view': 'View',
      'common.search': 'Search',
      'common.filter': 'Filter',
      'common.all': 'All',
      
      // Navigation
      'nav.home': 'Home',
      'nav.cards': 'Cards',
      'nav.favorites': 'Favorites',
      'nav.profile': 'Profile',
      'nav.login': 'Login',
      'nav.register': 'Register',
      'nav.logout': 'Logout',
      
      // Cards
      'cards.title': 'Business Cards',
      'cards.create': 'Create Card',
      'cards.myCards': 'My Cards',
      'cards.noCards': 'No cards found',
      'cards.views': 'views',
      'cards.likes': 'likes',
      
      // Favorites
      'favorites.title': 'My Favorites',
      'favorites.empty': 'No favorites yet',
      'favorites.searchResults': '{{count}} results for "{{term}}"',
      
      // Create Card
      'createCard.title': 'Create New Card',
      'createCard.name': 'Full Name',
      'createCard.jobTitle': 'Job Title',
      'createCard.company': 'Company',
      'createCard.email': 'Email',
      'createCard.phone': 'Phone',
      'createCard.website': 'Website',
      'createCard.address': 'Address',
      'createCard.description': 'Description',
      'createCard.submit': 'Create Card',
      'createCard.success': 'Card created successfully!',
      
      // Contact
      'contact.title': 'Contact Us',
      'contact.name': 'Your Name',
      'contact.email': 'Your Email',
      'contact.subject': 'Subject',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.success': 'Message sent successfully!',
      
      // Services
      'services.title': 'Our Services',
      'services.subtitle': 'Professional digital business card solutions',
      
      // Admin
      'admin.title': 'Admin Dashboard',
      'admin.users': 'Users',
      'admin.cards': 'Cards',
      'admin.analytics': 'Analytics',
      
      // Auth
      'auth.login': 'Login',
      'auth.register': 'Register',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.firstName': 'First Name',
      'auth.lastName': 'Last Name',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;

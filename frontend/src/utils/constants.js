/**
 * Application constants and configuration
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://futuristcards.onrender.com/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
};

// Storage Keys
export const STORAGE_KEYS = {
  USER: 'futuristcards_user',
  TOKEN: 'token',
  THEME: 'futuristcards_theme',
  FAVORITES: 'futuristcards_favorites',
  LAST_SYNC: 'futuristcards_last_sync'
};

// User Roles
export const USER_ROLES = {
  USER: 'user',
  BUSINESS: 'business',
  ADMIN: 'admin'
};

// Role Permissions
export const PERMISSIONS = {
  [USER_ROLES.USER]: {
    canViewCards: true,
    canLikeCards: true,
    canFavoriteCards: true,
    canCreateCards: false,
    canEditCards: false,
    canDeleteCards: false,
    canAccessAdmin: false
  },
  [USER_ROLES.BUSINESS]: {
    canViewCards: true,
    canLikeCards: true,
    canFavoriteCards: true,
    canCreateCards: true,
    canEditCards: true,
    canDeleteCards: true,
    canAccessAdmin: false
  },
  [USER_ROLES.ADMIN]: {
    canViewCards: true,
    canLikeCards: true,
    canFavoriteCards: true,
    canCreateCards: true,
    canEditCards: true,
    canDeleteCards: true,
    canAccessAdmin: true,
    canManageUsers: true,
    canModerateCards: true
  }
};

// Card Categories
export const CARD_CATEGORIES = {
  TECHNOLOGY: 'technology',
  BUSINESS: 'business',
  HEALTHCARE: 'healthcare',
  EDUCATION: 'education',
  CREATIVE: 'creative',
  LEGAL: 'legal',
  FINANCE: 'finance',
  RESTAURANT: 'restaurant',
  FITNESS: 'fitness',
  BEAUTY: 'beauty',
  REAL_ESTATE: 'real_estate',
  AUTOMOTIVE: 'automotive'
};

// Supported Languages
export const LANGUAGES = {
  EN: 'en',
  FR: 'fr',
  HE: 'he'
};

// Language Options for UI (English only)
export const LANGUAGE_OPTIONS = [
  { code: LANGUAGES.EN, name: 'English', flag: '🇺🇸' }
];

// Theme Options
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
};

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

// Form Validation Limits
export const VALIDATION_LIMITS = {
  NAME: { MIN: 2, MAX: 50 },
  TITLE: { MIN: 2, MAX: 256 },
  SUBTITLE: { MIN: 2, MAX: 256 },
  DESCRIPTION: { MIN: 2, MAX: 1024 },
  PASSWORD: { MIN: 8, MAX: 128 },
  PHONE: { MIN: 10, MAX: 15 },
  EMAIL: { MAX: 254 },
  URL: { MAX: 2048 }
};

// Default Card Image
export const DEFAULT_CARD_IMAGE = {
  URL: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  ALT: 'Default business card image'
};

// Social Media Platforms
export const SOCIAL_PLATFORMS = {
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  GITHUB: 'github',
  WEBSITE: 'website'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  CARD_CREATED: 'Card created successfully!',
  CARD_UPDATED: 'Card updated successfully!',
  CARD_DELETED: 'Card deleted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  REGISTRATION_SUCCESS: 'Registration successful!'
};

// Loading States
export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error'
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,
  DEFAULT_PAGE: 1
};

// Search Configuration
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300, // milliseconds
  MAX_RESULTS: 100
};

// File Upload Configuration
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp', '.gif']
};

// Cache Configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 5 * 60 * 1000, // 5 minutes
  CARDS_TTL: 10 * 60 * 1000, // 10 minutes
  USER_TTL: 30 * 60 * 1000, // 30 minutes
  MAX_CACHE_SIZE: 100 // number of items
};

// Demo Account Credentials
export const DEMO_ACCOUNTS = {
  USER: {
    email: 'user@demo.com',
    password: 'Demo1234!',
    role: USER_ROLES.USER
  },
  BUSINESS: {
    email: 'business@demo.com',
    password: 'Demo1234!',
    role: USER_ROLES.BUSINESS
  },
  ADMIN: {
    email: 'admin@demo.com',
    password: 'Demo1234!',
    role: USER_ROLES.ADMIN
  }
};

// Feature Flags
export const FEATURE_FLAGS = {
  OFFLINE_MODE: true,
  DARK_MODE: true,
  MULTI_LANGUAGE: true,
  SOCIAL_SHARING: true,
  ANALYTICS: false,
  BETA_FEATURES: false
};

// External Links
export const EXTERNAL_LINKS = {
  GITHUB: 'https://github.com/shayacoca/FuturistCards',
  DOCUMENTATION: 'https://futuristcards.vercel.app/docs',
  SUPPORT: 'mailto:support@futuristcards.com',
  PRIVACY: '/privacy',
  TERMS: '/terms'
};

export default {
  API_CONFIG,
  STORAGE_KEYS,
  USER_ROLES,
  PERMISSIONS,
  CARD_CATEGORIES,
  LANGUAGES,
  LANGUAGE_OPTIONS,
  THEMES,
  BREAKPOINTS,
  ANIMATION_DURATION,
  VALIDATION_LIMITS,
  DEFAULT_CARD_IMAGE,
  SOCIAL_PLATFORMS,
  HTTP_STATUS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_STATES,
  PAGINATION,
  SEARCH_CONFIG,
  FILE_UPLOAD,
  CACHE_CONFIG,
  DEMO_ACCOUNTS,
  FEATURE_FLAGS,
  EXTERNAL_LINKS
};

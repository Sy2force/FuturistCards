const rateLimit = require('express-rate-limit');

// General API rate limiter
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per windowMs
  message: {
    error: 'Trop de requêtes, veuillez réessayer plus tard',
    retryAfter: Math.ceil(15 * 60 / 60) + ' minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Max 5 login attempts per windowMs
  message: {
    error: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes',
    retryAfter: Math.ceil(15 * 60 / 60) + ' minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Registration rate limiter (disabled for testing)
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 1000, // Allow many registrations for testing
  message: {
    error: 'Trop de tentatives d\'inscription, veuillez réessayer dans 1 heure',
    retryAfter: Math.ceil(60 * 60 / 60) + ' minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Card creation rate limiter
const cardLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Max 20 cards per hour
  message: {
    error: 'Limite de création de cartes atteinte, veuillez réessayer plus tard',
    retryAfter: Math.ceil(60 * 60 / 60) + ' minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Anonymous card creation rate limiter (more restrictive)
const anonymousCardLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // Max 3 anonymous cards per minute
  message: {
    error: 'Limite de création anonyme atteinte, veuillez réessayer dans 1 minute',
    retryAfter: '1 minute'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  generalLimiter,
  authLimiter,
  registerLimiter,
  cardLimiter,
  anonymousCardLimiter
};

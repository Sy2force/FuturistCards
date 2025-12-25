<<<<<<< HEAD
// Enhanced validation with security checks

const sanitizeString = (str) => {
  return str ? str.trim().replace(/<[^>]*>?/gm, '') : '';
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return strongPasswordRegex.test(password);
};

const validateRegistration = (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Sanitize inputs
  const sanitizedName = sanitizeString(name);
  const sanitizedEmail = sanitizeString(email);

  if (!sanitizedName || sanitizedName.length < 2 || sanitizedName.length > 100) {
    return res.status(400).json({ message: 'Le nom doit faire entre 2 et 100 caractères' });
  }

  if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ message: 'Format d\'email invalide' });
  }

  if (!password || !isStrongPassword(password)) {
    return res.status(400).json({ 
      message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre' 
    });
  }

  // Validate role if provided
  if (role && !['user', 'business', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Rôle invalide' });
  }

  // Update req.body with sanitized values
  req.body.name = sanitizedName;
  req.body.email = sanitizedEmail.toLowerCase();

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  const sanitizedEmail = sanitizeString(email);

  if (!sanitizedEmail || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  if (!isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ message: 'Format d\'email invalide' });
  }

  // Update req.body with sanitized email
  req.body.email = sanitizedEmail.toLowerCase();

  next();
};

const validateCard = (req, res, next) => {
  const { title, email, phone, website, address, company, description } = req.body;

  // Sanitize all string inputs
  const sanitizedTitle = sanitizeString(title);
  const sanitizedEmail = sanitizeString(email);
  const sanitizedPhone = sanitizeString(phone);
  const sanitizedWebsite = sanitizeString(website);
  const sanitizedAddress = sanitizeString(address);
  const sanitizedCompany = sanitizeString(company);
  const sanitizedDescription = sanitizeString(description);

  if (!sanitizedTitle || sanitizedTitle.length < 1 || sanitizedTitle.length > 200) {
    return res.status(400).json({ message: 'Le nom doit faire entre 1 et 200 caractères' });
  }

  if (sanitizedEmail && !isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ message: 'Format d\'email invalide' });
  }

  // Validate phone if provided
  if (sanitizedPhone && !/^[\d\s\-\+\(\)\.]{10,20}$/.test(sanitizedPhone)) {
    return res.status(400).json({ message: 'Format de téléphone invalide' });
  }

  // Validate website if provided
  if (sanitizedWebsite && !sanitizedWebsite.match(/^https?:\/\/.+/)) {
    return res.status(400).json({ message: 'L\'URL du site web doit commencer par http:// ou https://' });
  }

  // Length limits for other fields
  if (sanitizedCompany && sanitizedCompany.length > 200) {
    return res.status(400).json({ message: 'Le nom de l\'entreprise ne peut pas dépasser 200 caractères' });
  }

  if (sanitizedAddress && sanitizedAddress.length > 500) {
    return res.status(400).json({ message: 'L\'adresse ne peut pas dépasser 500 caractères' });
  }

  if (sanitizedDescription && sanitizedDescription.length > 1000) {
    return res.status(400).json({ message: 'La description ne peut pas dépasser 1000 caractères' });
  }

  // Update req.body with sanitized values
  req.body.title = sanitizedTitle;
  req.body.email = sanitizedEmail ? sanitizedEmail.toLowerCase() : '';
  req.body.phone = sanitizedPhone || '';
  req.body.website = sanitizedWebsite || '';
  req.body.address = sanitizedAddress || '';
  req.body.company = sanitizedCompany || '';
  req.body.description = sanitizedDescription || '';

=======
const Joi = require('joi');

// User registration validation schema
const registerSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.min': 'First name must be at least 2 characters',
      'string.max': 'First name cannot exceed 30 characters',
      'any.required': 'First name is required'
    }),
  lastName: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages({
      'string.min': 'Last name must be at least 2 characters',
      'string.max': 'Last name cannot exceed 30 characters',
      'any.required': 'Last name is required'
    }),
  email: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'Email must be at least 3 characters',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.min': 'Password must be at least 4 characters',
      'any.required': 'Password is required'
    }),
  phone: Joi.string()
    .pattern(/^[\+]?[0-9]{9,15}$/)
    .allow('')
    .optional()
    .messages({
      'string.pattern.base': 'Please enter a valid phone number'
    }),
  role: Joi.string()
    .valid('user', 'business', 'admin')
    .default('user')
    .messages({
      'any.only': 'Role must be user, business, or admin'
    }),
  address: Joi.object({
    country: Joi.string().allow('').optional(),
    city: Joi.string().allow('').optional(),
    street: Joi.string().allow('').optional(),
    houseNumber: Joi.number().allow(null).optional(),
    zip: Joi.string().allow('').optional()
  }).optional(),
  image: Joi.object({
    url: Joi.string().uri().optional(),
    alt: Joi.string().max(100).optional()
  }).optional()
});

// User login validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.min': 'Email must be at least 3 characters',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});

// Business card validation schema
const cardSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.min': 'Title must be at least 2 characters',
      'string.max': 'Title cannot exceed 100 characters',
      'any.required': 'Title is required'
    }),
  subtitle: Joi.string()
    .max(200)
    .allow('')
    .messages({
      'string.max': 'Subtitle cannot exceed 200 characters'
    }),
  description: Joi.string()
    .min(10)
    .max(1000)
    .required()
    .messages({
      'string.min': 'Description must be at least 10 characters',
      'string.max': 'Description cannot exceed 1000 characters',
      'any.required': 'Description is required'
    }),
  phone: Joi.string()
    .pattern(/^[\+]?[1-9][\d]{0,15}$/)
    .allow('')
    .messages({
      'string.pattern.base': 'Please enter a valid phone number'
    }),
  email: Joi.string()
    .email()
    .allow('')
    .messages({
      'string.email': 'Please enter a valid email address'
    }),
  web: Joi.string()
    .uri()
    .allow('')
    .messages({
      'string.uri': 'Please enter a valid URL'
    }),
  image: Joi.object({
    url: Joi.string().uri().required(),
    alt: Joi.string().max(100).required()
  }).allow(null),
  address: Joi.object({
    state: Joi.string().allow(''),
    country: Joi.string().allow(''),
    city: Joi.string().allow(''),
    street: Joi.string().allow(''),
    houseNumber: Joi.number().allow(null),
    zip: Joi.string().allow('')
  }).allow(null)
});

// Registration data validation middleware
const validateRegistration = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

// Login data validation middleware
const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  next();
};

// Card data validation middleware
const validateCard = (req, res, next) => {
  const { error } = cardSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateCard
};

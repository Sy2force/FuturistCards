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
  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateCard
};

import Joi from 'joi';

// Schéma de validation pour l'inscription
export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    }),
  phone: Joi.string().pattern(/^0[2-9]\d{8}$/).required(),
  isBusiness: Joi.boolean()
});

// Schéma de validation pour la connexion
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Schéma de validation pour une carte
export const cardSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  company: Joi.string().min(2).max(100).required(),
  position: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^0[2-9]\d{8}$/).required(),
  website: Joi.string().uri().optional(),
  address: Joi.string().min(5).max(200).required(),
  image: Joi.string().uri().optional()
});

// Middleware de validation
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }
    next();
  };
};

const { body, validationResult } = require('express-validator');

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Validation pour l'inscription
const validateRegistration = [
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le prénom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage('Le prénom ne peut contenir que des lettres, espaces, apostrophes et tirets'),
  
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage('Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Veuillez fournir un email valide'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Le mot de passe doit contenir au moins 6 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Numéro de téléphone invalide'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le nom de l\'entreprise ne peut pas dépasser 100 caractères'),
  
  body('position')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le poste ne peut pas dépasser 100 caractères'),
  
  handleValidationErrors
];

// Validation pour la connexion
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Veuillez fournir un email valide'),
  
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis'),
  
  handleValidationErrors
];

// Validation pour la création/mise à jour de carte
const validateCard = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Le titre est requis et ne peut pas dépasser 100 caractères'),
  
  body('subtitle')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le sous-titre ne peut pas dépasser 100 caractères'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La description ne peut pas dépasser 500 caractères'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Veuillez fournir un email valide'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Numéro de téléphone invalide'),
  
  body('website')
    .optional()
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('URL du site web invalide'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le nom de l\'entreprise ne peut pas dépasser 100 caractères'),
  
  body('position')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le poste ne peut pas dépasser 100 caractères'),
  
  body('address.street')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('La rue ne peut pas dépasser 100 caractères'),
  
  body('address.city')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('La ville ne peut pas dépasser 50 caractères'),
  
  body('address.state')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('L\'état ne peut pas dépasser 50 caractères'),
  
  body('address.zipCode')
    .optional()
    .trim()
    .isLength({ max: 10 })
    .withMessage('Le code postal ne peut pas dépasser 10 caractères'),
  
  body('address.country')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Le pays ne peut pas dépasser 50 caractères'),
  
  body('image')
    .optional()
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('URL de l\'image invalide'),
  
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic doit être un booléen'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Les tags doivent être un tableau'),
  
  body('tags.*')
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage('Chaque tag ne peut pas dépasser 30 caractères'),
  
  body('theme.primaryColor')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Couleur primaire invalide (format hex requis)'),
  
  body('theme.secondaryColor')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Couleur secondaire invalide (format hex requis)'),
  
  body('theme.textColor')
    .optional()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Couleur de texte invalide (format hex requis)'),
  
  handleValidationErrors
];

// Validation pour la mise à jour du profil
const validateProfileUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le prénom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage('Le prénom ne peut contenir que des lettres, espaces, apostrophes et tirets'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Le nom doit contenir entre 2 et 50 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)
    .withMessage('Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets'),
  
  body('phone')
    .optional()
    .isMobilePhone('any')
    .withMessage('Numéro de téléphone invalide'),
  
  body('company')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le nom de l\'entreprise ne peut pas dépasser 100 caractères'),
  
  body('position')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Le poste ne peut pas dépasser 100 caractères'),
  
  body('website')
    .optional()
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('URL du site web invalide'),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('La bio ne peut pas dépasser 500 caractères'),
  
  body('avatar')
    .optional()
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('URL de l\'avatar invalide'),
  
  handleValidationErrors
];

// Validation pour le changement de mot de passe
const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Le mot de passe actuel est requis'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Le nouveau mot de passe doit contenir au moins 6 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Le nouveau mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre'),
  
  handleValidationErrors
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateCard,
  validateProfileUpdate,
  validatePasswordChange,
  handleValidationErrors
};

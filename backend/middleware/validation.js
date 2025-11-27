import Joi from 'joi';

// Middleware pour validation Joi
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Données invalides',
        errors: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// Schémas de validation pour l'authentification
export const authSchemas = {
  register: Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le prénom doit contenir au moins 2 caractères',
      'string.max': 'Le prénom ne peut pas dépasser 50 caractères',
      'any.required': 'Le prénom est requis'
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères',
      'any.required': 'Le nom est requis'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Format d\'email invalide',
      'any.required': 'L\'email est requis'
    }),
    password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).required().messages({
      'string.min': 'Le mot de passe doit contenir au moins 8 caractères',
      'string.pattern.base': 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre',
      'any.required': 'Le mot de passe est requis'
    }),
    phone: Joi.string().pattern(/^(\+972-?|0)[2-9]\d{1,2}-?\d{3}-?\d{4}$/).optional().messages({
      'string.pattern.base': 'Format de téléphone israélien invalide'
    }),
    isBusiness: Joi.boolean().default(false),
    website: Joi.string().uri().optional().messages({
      'string.uri': 'Format d\'URL invalide'
    }),
    description: Joi.string().max(500).optional().messages({
      'string.max': 'La description ne peut pas dépasser 500 caractères'
    })
  }),

  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Format d\'email invalide',
      'any.required': 'L\'email est requis'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Le mot de passe est requis'
    })
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required().messages({
      'any.required': 'Le mot de passe actuel est requis'
    }),
    newPassword: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/).required().messages({
      'string.min': 'Le nouveau mot de passe doit contenir au moins 8 caractères',
      'string.pattern.base': 'Le nouveau mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre',
      'any.required': 'Le nouveau mot de passe est requis'
    })
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().min(2).max(50).optional().messages({
      'string.min': 'Le prénom doit contenir au moins 2 caractères',
      'string.max': 'Le prénom ne peut pas dépasser 50 caractères'
    }),
    lastName: Joi.string().min(2).max(50).optional().messages({
      'string.min': 'Le nom doit contenir au moins 2 caractères',
      'string.max': 'Le nom ne peut pas dépasser 50 caractères'
    }),
    phone: Joi.string().pattern(/^(\+972-?|0)[2-9]\d{1,2}-?\d{3}-?\d{4}$/).optional().messages({
      'string.pattern.base': 'Format de téléphone israélien invalide'
    }),
    website: Joi.string().uri().optional().allow('').messages({
      'string.uri': 'Format d\'URL invalide'
    }),
    description: Joi.string().max(500).optional().allow('').messages({
      'string.max': 'La description ne peut pas dépasser 500 caractères'
    })
  }),

  changeRole: Joi.object({
    role: Joi.string().valid('user', 'business', 'admin').required().messages({
      'any.only': 'Rôle invalide. Doit être: user, business ou admin',
      'any.required': 'Le rôle est requis'
    })
  })
};

// Schémas de validation pour les cartes
export const cardSchemas = {
  createCard: Joi.object({
    title: Joi.string().min(2).max(100).required().messages({
      'string.min': 'Le titre doit contenir au moins 2 caractères',
      'string.max': 'Le titre ne peut pas dépasser 100 caractères',
      'any.required': 'Le titre est requis'
    }),
    subtitle: Joi.string().max(100).optional().allow('').messages({
      'string.max': 'Le sous-titre ne peut pas dépasser 100 caractères'
    }),
    description: Joi.string().min(10).max(1000).required().messages({
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 1000 caractères',
      'any.required': 'La description est requise'
    }),
    phone: Joi.string().pattern(/^(\+972-?|0)[2-9]\d{1,2}-?\d{3}-?\d{4}$/).required().messages({
      'string.pattern.base': 'Format de téléphone israélien invalide',
      'any.required': 'Le téléphone est requis'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Format d\'email invalide',
      'any.required': 'L\'email est requis'
    }),
    website: Joi.string().uri().optional().allow('').messages({
      'string.uri': 'Format d\'URL invalide'
    }),
    image: Joi.object({
      url: Joi.string().uri().optional().messages({
        'string.uri': 'Format d\'URL d\'image invalide'
      }),
      alt: Joi.string().max(100).optional().messages({
        'string.max': 'Le texte alternatif ne peut pas dépasser 100 caractères'
      })
    }).optional(),
    address: Joi.object({
      state: Joi.string().optional(),
      country: Joi.string().required().messages({
        'any.required': 'Le pays est requis'
      }),
      city: Joi.string().required().messages({
        'any.required': 'La ville est requise'
      }),
      street: Joi.string().required().messages({
        'any.required': 'La rue est requise'
      }),
      houseNumber: Joi.string().required().messages({
        'any.required': 'Le numéro de rue est requis'
      }),
      zip: Joi.string().optional()
    }).required().messages({
      'any.required': 'L\'adresse est requise'
    }),
    category: Joi.string().valid('technology', 'business', 'creative', 'healthcare', 'education', 'finance', 'marketing', 'consulting', 'other').required().messages({
      'any.only': 'Catégorie invalide',
      'any.required': 'La catégorie est requise'
    }),
    skills: Joi.array().items(Joi.string().max(50)).max(10).optional().messages({
      'array.max': 'Maximum 10 compétences autorisées',
      'string.max': 'Chaque compétence ne peut pas dépasser 50 caractères'
    })
  }),

  updateCard: Joi.object({
    title: Joi.string().min(2).max(100).optional().messages({
      'string.min': 'Le titre doit contenir au moins 2 caractères',
      'string.max': 'Le titre ne peut pas dépasser 100 caractères'
    }),
    subtitle: Joi.string().max(100).optional().allow('').messages({
      'string.max': 'Le sous-titre ne peut pas dépasser 100 caractères'
    }),
    description: Joi.string().min(10).max(1000).optional().messages({
      'string.min': 'La description doit contenir au moins 10 caractères',
      'string.max': 'La description ne peut pas dépasser 1000 caractères'
    }),
    phone: Joi.string().pattern(/^(\+972-?|0)[2-9]\d{1,2}-?\d{3}-?\d{4}$/).optional().messages({
      'string.pattern.base': 'Format de téléphone israélien invalide'
    }),
    email: Joi.string().email().optional().messages({
      'string.email': 'Format d\'email invalide'
    }),
    website: Joi.string().uri().optional().allow('').messages({
      'string.uri': 'Format d\'URL invalide'
    }),
    image: Joi.object({
      url: Joi.string().uri().optional().messages({
        'string.uri': 'Format d\'URL d\'image invalide'
      }),
      alt: Joi.string().max(100).optional().messages({
        'string.max': 'Le texte alternatif ne peut pas dépasser 100 caractères'
      })
    }).optional(),
    address: Joi.object({
      state: Joi.string().optional(),
      country: Joi.string().optional(),
      city: Joi.string().optional(),
      street: Joi.string().optional(),
      houseNumber: Joi.number().integer().min(1).optional().messages({
        'number.min': 'Le numéro de rue doit être positif'
      }),
      zip: Joi.string().optional()
    }).optional(),
    category: Joi.string().valid('technology', 'business', 'creative', 'healthcare', 'education', 'finance', 'marketing', 'consulting', 'other').optional().messages({
      'any.only': 'Catégorie invalide'
    }),
    skills: Joi.array().items(Joi.string().max(50)).max(10).optional().messages({
      'array.max': 'Maximum 10 compétences autorisées',
      'string.max': 'Chaque compétence ne peut pas dépasser 50 caractères'
    })
  }),

  updateBizNumber: Joi.object({
    bizNumber: Joi.string().length(7).pattern(/^\d{7}$/).required().messages({
      'string.length': 'Le numéro d\'entreprise doit contenir exactement 7 chiffres',
      'string.pattern.base': 'Le numéro d\'entreprise doit être composé uniquement de chiffres',
      'any.required': 'Le numéro d\'entreprise est requis'
    })
  })
};

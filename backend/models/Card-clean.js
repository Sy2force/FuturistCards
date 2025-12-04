const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  // Informations de base
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: [100, 'Le sous-titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La description ne peut pas dépasser 500 caractères']
  },
  
  // Informations de contact
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Veuillez fournir un email valide'
    ]
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Le numéro de téléphone ne peut pas dépasser 20 caractères']
  },
  website: {
    type: String,
    trim: true,
    maxlength: [200, 'L\'URL du site web ne peut pas dépasser 200 caractères']
  },
  
  // Informations professionnelles
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères']
  },
  position: {
    type: String,
    trim: true,
    maxlength: [100, 'Le poste ne peut pas dépasser 100 caractères']
  },
  
  // Adresse
  address: {
    street: {
      type: String,
      trim: true,
      maxlength: [100, 'La rue ne peut pas dépasser 100 caractères']
    },
    city: {
      type: String,
      trim: true,
      maxlength: [50, 'La ville ne peut pas dépasser 50 caractères']
    },
    state: {
      type: String,
      trim: true,
      maxlength: [50, 'L\'état ne peut pas dépasser 50 caractères']
    },
    zipCode: {
      type: String,
      trim: true,
      maxlength: [10, 'Le code postal ne peut pas dépasser 10 caractères']
    },
    country: {
      type: String,
      trim: true,
      maxlength: [50, 'Le pays ne peut pas dépasser 50 caractères'],
      default: 'France'
    }
  },
  
  // Image/Avatar
  image: {
    type: String,
    default: null
  },
  
  // Propriétaire de la carte
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'utilisateur propriétaire est requis']
  },
  
  // Statut et visibilité
  isPublic: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Statistiques
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Métadonnées
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Un tag ne peut pas dépasser 30 caractères']
  }],
  
  // Couleurs et style
  theme: {
    primaryColor: {
      type: String,
      default: '#3B82F6',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Couleur primaire invalide']
    },
    secondaryColor: {
      type: String,
      default: '#1F2937',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Couleur secondaire invalide']
    },
    textColor: {
      type: String,
      default: '#FFFFFF',
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Couleur de texte invalide']
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour optimiser les recherches
cardSchema.index({ user: 1 });
cardSchema.index({ isPublic: 1, isActive: 1 });
cardSchema.index({ email: 1 });
cardSchema.index({ company: 1 });
cardSchema.index({ tags: 1 });
cardSchema.index({ createdAt: -1 });

// Virtual pour le nombre de likes
cardSchema.virtual('likesCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual pour l'adresse complète
cardSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  if (!addr) return '';
  
  const parts = [
    addr.street,
    addr.city,
    addr.state,
    addr.zipCode,
    addr.country
  ].filter(Boolean);
  
  return parts.join(', ');
});

// Méthode pour incrémenter les vues
cardSchema.methods.incrementViews = function() {
  this.views = (this.views || 0) + 1;
  return this.save();
};

// Méthode pour ajouter/retirer un like
cardSchema.methods.toggleLike = function(userId) {
  const existingLike = this.likes.find(like => like.user.toString() === userId.toString());
  
  if (existingLike) {
    // Retirer le like
    this.likes = this.likes.filter(like => like.user.toString() !== userId.toString());
  } else {
    // Ajouter le like
    this.likes.push({ user: userId });
  }
  
  return this.save();
};

// Méthode pour vérifier si un utilisateur a liké
cardSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.user.toString() === userId.toString());
};

// Méthode pour obtenir les données publiques de la carte
cardSchema.methods.getPublicData = function() {
  return {
    id: this._id,
    title: this.title,
    subtitle: this.subtitle,
    description: this.description,
    email: this.email,
    phone: this.phone,
    website: this.website,
    company: this.company,
    position: this.position,
    address: this.address,
    fullAddress: this.fullAddress,
    image: this.image,
    theme: this.theme,
    views: this.views,
    likesCount: this.likesCount,
    tags: this.tags,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Méthode statique pour rechercher des cartes
cardSchema.statics.search = function(query, options = {}) {
  const searchRegex = new RegExp(query, 'i');
  const searchQuery = {
    isPublic: true,
    isActive: true,
    $or: [
      { title: searchRegex },
      { subtitle: searchRegex },
      { description: searchRegex },
      { company: searchRegex },
      { position: searchRegex },
      { tags: { $in: [searchRegex] } }
    ]
  };
  
  return this.find(searchQuery)
    .populate('user', 'firstName lastName avatar')
    .sort({ createdAt: -1 })
    .limit(options.limit || 20)
    .skip(options.skip || 0);
};

// Méthode statique pour obtenir les cartes populaires
cardSchema.statics.getPopular = function(limit = 10) {
  return this.find({ isPublic: true, isActive: true })
    .populate('user', 'firstName lastName avatar')
    .sort({ views: -1, 'likes.length': -1 })
    .limit(limit);
};

module.exports = mongoose.model('Card', cardSchema);

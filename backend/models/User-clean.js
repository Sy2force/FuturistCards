const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true,
    maxlength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
  },
  lastName: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [50, 'Le nom ne peut pas dépasser 50 caractères']
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Veuillez fournir un email valide'
    ]
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères'],
    select: false
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Le numéro de téléphone ne peut pas dépasser 20 caractères']
  },
  role: {
    type: String,
    enum: ['user', 'business', 'admin'],
    default: 'user'
  },
  isBusiness: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: null
  },
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
  website: {
    type: String,
    trim: true,
    maxlength: [200, 'L\'URL du site web ne peut pas dépasser 200 caractères']
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'La bio ne peut pas dépasser 500 caractères']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  favoriteCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Card'
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index pour optimiser les recherches
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Virtual pour le nom complet
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Middleware pre-save pour hasher le mot de passe
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Méthode d'instance pour vérifier le mot de passe
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware pour mettre à jour les statuts selon le rôle
userSchema.pre('save', function(next) {
  if (this.role === 'admin') {
    this.isAdmin = true;
    this.isBusiness = true;
  } else if (this.role === 'business') {
    this.isBusiness = true;
    this.isAdmin = false;
  } else {
    this.isBusiness = false;
    this.isAdmin = false;
  }
  next();
});

// Méthode pour obtenir les données publiques de l'utilisateur
userSchema.methods.getPublicProfile = function() {
  return {
    id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    fullName: this.fullName,
    email: this.email,
    phone: this.phone,
    role: this.role,
    isBusiness: this.isBusiness,
    isAdmin: this.isAdmin,
    avatar: this.avatar,
    company: this.company,
    position: this.position,
    website: this.website,
    bio: this.bio,
    createdAt: this.createdAt
  };
};

// Méthode statique pour trouver par email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model('User', userSchema);

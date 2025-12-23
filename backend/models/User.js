const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false
    },
    role: {
      type: String,
      enum: ['user', 'business', 'admin'],
      default: 'user'
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isBusiness: {
      type: Boolean,
      default: false
    },
    phone: {
      type: String,
      trim: true
    },
    image: {
      url: {
        type: String,
        default: ''
      },
      alt: {
        type: String,
        default: 'User profile image'
      }
    },
    address: {
      state: String,
      country: String,
      city: String,
      street: String,
      houseNumber: String,
      zip: String
    },
    favoriteCards: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    loginCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Pre-save middleware to set admin/business flags based on role
userSchema.pre('save', function(next) {
  if (this.role === 'admin') {
    this.isAdmin = true;
    this.isBusiness = true;
  } else if (this.role === 'business') {
    this.isBusiness = true;
    this.isAdmin = false;
  } else {
    this.isAdmin = false;
    this.isBusiness = false;
  }
  next();
});

// Method to increment login count
userSchema.methods.recordLogin = function() {
  this.loginCount += 1;
  this.lastLogin = new Date();
  return this.save();
};

// Method to add favorite card
userSchema.methods.addFavorite = function(cardId) {
  if (!this.favoriteCards.includes(cardId)) {
    this.favoriteCards.push(cardId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove favorite card
userSchema.methods.removeFavorite = function(cardId) {
  this.favoriteCards = this.favoriteCards.filter(id => !id.equals(cardId));
  return this.save();
};

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    // Profile information
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: [50, 'Middle name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },

    // User preferences for UI customization
    preferences: {
      color: {
        type: String,
        default: '#0ea5e9',
        validate: {
          validator: function (v) {
            return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
          },
          message: 'Color must be a valid hex color',
        },
      },
      theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'dark',
      },
      font: {
        type: String,
        enum: ['Inter', 'Orbitron', 'Roboto', 'Poppins', 'Montserrat'],
        default: 'Inter',
      },
      layout: {
        type: String,
        enum: ['grid', 'table', 'compact'],
        default: 'grid',
      },
      avatarUrl: {
        type: String,
        default: '',
        validate: {
          validator: function (v) {
            if (!v) return true; // Allow empty string
            return (
              /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v) ||
              /^data:image\//.test(v)
            );
          },
          message: 'Avatar URL must be a valid image URL or base64 data',
        },
      },
      animations: {
        type: Boolean,
        default: true,
      },
      language: {
        type: String,
        enum: ['en', 'fr', 'es', 'de'],
        default: 'en',
      },
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          if (!v) return true; // Allow empty phone
          return /^(\+972-?|0)[2-9]\d{1,2}-?\d{3}-?\d{4}$/.test(v);
        },
        message: 'Please provide a valid phone number',
      },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    image: {
      url: {
        type: String,
        default:
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        validate: {
          validator: function (v) {
            return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
          },
          message: 'Please provide a valid image URL',
        },
      },
      alt: {
        type: String,
        default: 'User profile image',
      },
    },
    address: {
      state: {
        type: String,
        maxlength: [50, 'State cannot exceed 50 characters'],
      },
      country: {
        type: String,
        default: 'Israel',
        maxlength: [50, 'Country cannot exceed 50 characters'],
      },
      city: {
        type: String,
        maxlength: [50, 'City cannot exceed 50 characters'],
      },
      street: {
        type: String,
        maxlength: [100, 'Street cannot exceed 100 characters'],
      },
      houseNumber: {
        type: String,
        maxlength: [10, 'House number cannot exceed 10 characters'],
      },
      zip: {
        type: String,
        maxlength: [10, 'ZIP code cannot exceed 10 characters'],
      },
    },
    isBusiness: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'business', 'admin'],
      default: 'user',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    favoriteCards: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
      },
    ],
    refreshToken: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    loginCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full name
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Set role to business if isBusiness is true
userSchema.pre('save', function (next) {
  if (this.isBusiness && this.role === 'user') {
    this.role = 'business';
  }
  next();
});

// Index for better query performance
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password.startsWith('$2a$')) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Password hashing error:', error);
    next(error);
  }
});

// Pre-save middleware to set role based on flags
userSchema.pre('save', function (next) {
  if (this.isAdmin) {
    this.role = 'admin';
  } else if (this.isBusiness) {
    this.role = 'business';
  } else {
    this.role = 'user';
  }
  next();
});

// Instance method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Instance method to get public profile
userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.refreshToken;
  delete userObject.__v;
  return userObject;
};

// Static method to find by email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

module.exports = mongoose.model('User', userSchema);

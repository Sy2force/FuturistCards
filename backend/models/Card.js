const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Card title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  subtitle: {
    type: String,
    required: [true, 'Card subtitle is required'],
    trim: true,
    maxlength: [150, 'Subtitle cannot exceed 150 characters']
  },
  description: {
    type: String,
    required: [true, 'Card description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },

  // Category
  category: {
    type: String,
    enum: ['technology', 'business', 'creative', 'healthcare', 'education', 'finance', 'marketing', 'consulting', 'other'],
    default: 'business'
  },

  // Contact Information
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^0[2-9]\d{7,8}$/.test(v);
      },
      message: 'Please provide a valid Israeli phone number'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  website: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^https?:\/\/.+\..+/.test(v);
      },
      message: 'Please provide a valid website URL'
    }
  },

  // Social Links
  socialLinks: {
    linkedin: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?linkedin\.com\//.test(v);
        },
        message: 'Please provide a valid LinkedIn URL'
      }
    },
    twitter: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?twitter\.com\//.test(v);
        },
        message: 'Please provide a valid Twitter URL'
      }
    },
    instagram: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?instagram\.com\//.test(v);
        },
        message: 'Please provide a valid Instagram URL'
      }
    },
    facebook: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?facebook\.com\//.test(v);
        },
        message: 'Please provide a valid Facebook URL'
      }
    },
    github: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?github\.com\//.test(v);
        },
        message: 'Please provide a valid GitHub URL'
      }
    },
    youtube: {
      type: String,
      validate: {
        validator: function(v) {
          if (!v) return true;
          return /^https?:\/\/(www\.)?youtube\.com\//.test(v);
        },
        message: 'Please provide a valid YouTube URL'
      }
    }
  },

  // Image
  image: {
    url: {
      type: String,
      default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      validate: {
        validator: function(v) {
          if (!v) return true;
          // Allow any valid URL or base64 data
          return /^(https?:\/\/.+|data:image\/)/i.test(v);
        },
        message: 'Please provide a valid image URL or base64 data'
      }
    },
    alt: {
      type: String,
      default: 'Business card image'
    }
  },

  // Address
  address: {
    state: {
      type: String,
      maxlength: [50, 'State cannot exceed 50 characters']
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      default: 'Israel',
      maxlength: [50, 'Country cannot exceed 50 characters']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      maxlength: [50, 'City cannot exceed 50 characters']
    },
    street: {
      type: String,
      required: [true, 'Street is required'],
      maxlength: [100, 'Street cannot exceed 100 characters']
    },
    houseNumber: {
      type: String,
      required: [true, 'House number is required'],
      maxlength: [10, 'House number cannot exceed 10 characters']
    },
    zip: {
      type: String,
      maxlength: [10, 'ZIP code cannot exceed 10 characters']
    }
  },

  // Tags for better searchability
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Tag cannot exceed 30 characters']
  }],

  // Business Number (for business cards)
  bizNumber: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true;
        return /^\d{7}$/.test(v);
      },
      message: 'Business number must be exactly 7 digits'
    }
  },

  // User Reference
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Engagement Metrics
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },

  // Card Status and Visibility
  isActive: {
    type: Boolean,
    default: true
  },
  isPublic: {
    type: Boolean,
    default: true
  },

  // SEO and Metadata
  slug: {
    type: String
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full address
cardSchema.virtual('fullAddress').get(function() {
  return `${this.address.street} ${this.address.houseNumber}, ${this.address.city}, ${this.address.country}`;
});

// Virtual for likes count
cardSchema.virtual('likesCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for card URL slug
cardSchema.virtual('cardUrl').get(function() {
  return `/cards/${this.slug || this._id}`;
});

// Indexes for better performance
cardSchema.index({ user_id: 1 });
cardSchema.index({ bizNumber: 1 });
cardSchema.index({ 'address.city': 1 });
cardSchema.index({ category: 1 });
cardSchema.index({ tags: 1 });
cardSchema.index({ isActive: 1, isPublic: 1 });
cardSchema.index({ createdAt: -1 });
cardSchema.index({ views: -1 });
cardSchema.index({ likesCount: -1 });
cardSchema.index({ slug: 1 });

// Text search index
cardSchema.index({
  title: 'text',
  subtitle: 'text',
  description: 'text',
  tags: 'text'
});

// Pre-save middleware to generate business number and slug
cardSchema.pre('save', function(next) {
  if (this.isNew && !this.bizNumber) {
    // Generate a unique 7-digit business number
    this.bizNumber = Math.floor(1000000 + Math.random() * 9000000).toString();
  }

  // Generate slug from title if not provided
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }

  // Generate meta description from description if not provided
  if (this.isModified('description') && !this.metaDescription) {
    this.metaDescription = this.description.substring(0, 157) + '...';
  }

  next();
});

// Pre-save middleware to ensure unique slug
cardSchema.pre('save', async function(next) {
  if (this.isModified('slug') && this.slug) {
    const existingCard = await this.constructor.findOne({ 
      slug: this.slug, 
      _id: { $ne: this._id } 
    });
    
    if (existingCard) {
      this.slug = this.slug + '-' + Date.now();
    }
  }
  next();
});

// Instance method to check if user liked this card
cardSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.toString() === userId.toString());
};

// Instance method to toggle like
cardSchema.methods.toggleLike = async function(userId) {
  // Handle both ObjectId and string IDs (for mock users)
  let userObjectId;
  try {
    userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;
  } catch (error) {
    userObjectId = userId; // Use as string for mock users
  }
  
  const likeIndex = this.likes.findIndex(like => like.toString() === userId.toString());
  
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userObjectId);
  }
  
  return await this.save();
};

// Instance method to increment views
cardSchema.methods.incrementViews = async function() {
  this.views += 1;
  return await this.save();
};

// Instance method to get public data
cardSchema.methods.getPublicData = function() {
  const cardObject = this.toObject();
  return {
    _id: cardObject._id,
    title: cardObject.title,
    subtitle: cardObject.subtitle,
    description: cardObject.description,
    category: cardObject.category,
    image: cardObject.image,
    email: cardObject.email,
    phone: cardObject.phone,
    website: cardObject.website,
    socialLinks: cardObject.socialLinks,
    address: cardObject.address,
    tags: cardObject.tags,
    likes: cardObject.likesCount,
    views: cardObject.views,
    createdAt: cardObject.createdAt,
    updatedAt: cardObject.updatedAt,
    slug: cardObject.slug,
    cardUrl: cardObject.cardUrl
  };
};

// Static method to find cards by user
cardSchema.statics.findByUser = function(userId) {
  return this.find({ user_id: userId, isActive: true })
    .populate('user_id', 'firstName lastName email')
    .sort({ createdAt: -1 });
};

// Static method to find public cards
cardSchema.statics.findPublicCards = function(options = {}) {
  const query = { isActive: true, isPublic: true };
  
  if (options.category && options.category !== 'all') {
    query.category = options.category;
  }
  
  if (options.search) {
    query.$text = { $search: options.search };
  }
  
  if (options.tags && options.tags.length > 0) {
    query.tags = { $in: options.tags };
  }

  let queryBuilder = this.find(query)
    .populate('user_id', 'firstName lastName')
    .select('-__v');

  // Sorting
  switch (options.sortBy) {
    case 'popular':
      queryBuilder = queryBuilder.sort({ likesCount: -1, views: -1 });
      break;
    case 'views':
      queryBuilder = queryBuilder.sort({ views: -1 });
      break;
    case 'oldest':
      queryBuilder = queryBuilder.sort({ createdAt: 1 });
      break;
    case 'alphabetical':
      queryBuilder = queryBuilder.sort({ title: 1 });
      break;
    default: // 'recent'
      queryBuilder = queryBuilder.sort({ createdAt: -1 });
  }

  // Pagination
  if (options.page && options.limit) {
    const skip = (options.page - 1) * options.limit;
    queryBuilder = queryBuilder.skip(skip).limit(options.limit);
  }

  return queryBuilder;
};

// Static method to search cards
cardSchema.statics.searchCards = function(searchTerm, options = {}) {
  const query = {
    isActive: true,
    isPublic: true,
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { subtitle: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  };

  if (options.category && options.category !== 'all') {
    query.category = options.category;
  }

  return this.find(query)
    .populate('user_id', 'firstName lastName')
    .sort({ createdAt: -1 })
    .limit(options.limit || 20);
};

// Static method to get popular cards
cardSchema.statics.getPopularCards = function(limit = 10) {
  return this.find({ isActive: true, isPublic: true })
    .populate('user_id', 'firstName lastName')
    .sort({ likesCount: -1, views: -1 })
    .limit(limit);
};

// Static method to get cards by category
cardSchema.statics.getCardsByCategory = function(category, limit = 20) {
  return this.find({ 
    category: category, 
    isActive: true, 
    isPublic: true 
  })
    .populate('user_id', 'firstName lastName')
    .sort({ createdAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Card', cardSchema);

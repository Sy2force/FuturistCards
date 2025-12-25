const mongoose = require('mongoose');

<<<<<<< HEAD
const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isPublic: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

=======
const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    subtitle: {
      type: String,
      required: [true, 'Subtitle is required'],
      trim: true,
      maxlength: [100, 'Subtitle cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
      match: [/^[\+]?[0-9\-\(\)\s]{10,}$/, 'Please provide a valid phone number']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
    },
    web: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, 'Please provide a valid website URL']
    },
    image: {
      url: {
        type: String,
        default: 'https://via.placeholder.com/400x200/1a1a2e/16213e?text=Business+Card'
      },
      alt: {
        type: String,
        default: 'Business card image'
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
    bizNumber: {
      type: String,
      unique: true,
      sparse: true
    },
    likes: {
      type: Number,
      default: 0,
      min: 0
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    category: {
      type: String,
      enum: ['technology', 'healthcare', 'finance', 'education', 'retail', 'restaurant', 'real-estate', 'other'],
      default: 'other'
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    views: {
      type: Number,
      default: 0
    },
    lastViewed: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Indexes for better query performance
cardSchema.index({ user_id: 1 });
cardSchema.index({ category: 1 });
cardSchema.index({ isActive: 1 });
cardSchema.index({ likes: -1 });
cardSchema.index({ createdAt: -1 });
cardSchema.index({ title: 'text', subtitle: 'text', description: 'text' });

// Pre-save middleware to generate bizNumber if not provided
cardSchema.pre('save', async function(next) {
  if (!this.bizNumber && this.isNew) {
    // Generate a unique business number
    let bizNumber;
    let isUnique = false;
    
    while (!isUnique) {
      bizNumber = Math.floor(1000000 + Math.random() * 9000000).toString();
      const existingCard = await this.constructor.findOne({ bizNumber });
      if (!existingCard) {
        isUnique = true;
      }
    }
    
    this.bizNumber = bizNumber;
  }
  next();
});

// Method to increment views
cardSchema.methods.incrementViews = function() {
  this.views += 1;
  this.lastViewed = new Date();
  return this.save();
};

// Method to increment likes
cardSchema.methods.incrementLikes = function() {
  this.likes += 1;
  return this.save();
};

// Method to decrement likes
cardSchema.methods.decrementLikes = function() {
  if (this.likes > 0) {
    this.likes -= 1;
  }
  return this.save();
};

// Static method to search cards
cardSchema.statics.searchCards = function(query, filters = {}) {
  const searchQuery = {
    isActive: true,
    ...filters
  };

  if (query) {
    searchQuery.$text = { $search: query };
  }

  return this.find(searchQuery)
    .populate('user_id', 'firstName lastName email')
    .sort({ createdAt: -1 });
};

// Static method to get popular cards
cardSchema.statics.getPopularCards = function(limit = 10) {
  return this.find({ isActive: true })
    .populate('user_id', 'firstName lastName email')
    .sort({ likes: -1, views: -1 })
    .limit(limit);
};

// Static method to get recent cards
cardSchema.statics.getRecentCards = function(limit = 10) {
  return this.find({ isActive: true })
    .populate('user_id', 'firstName lastName email')
    .sort({ createdAt: -1 })
    .limit(limit);
};

>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
module.exports = mongoose.model('Card', cardSchema);

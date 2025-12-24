const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    card_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
      required: [true, 'Card ID is required']
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Compound unique index to ensure one like per user per card
likeSchema.index({ user_id: 1, card_id: 1 }, { unique: true });

// Index for efficient queries
likeSchema.index({ card_id: 1 });
likeSchema.index({ user_id: 1 });

// Static method to toggle like (mock mode compatible)
likeSchema.statics.toggleLike = async function(userId, cardId) {
  try {
    // In mock mode, simulate like toggle
    if (process.env.NODE_ENV === 'development' && !mongoose.connection.readyState) {
      // Mock mode - simulate toggle
      const mockLikeState = global.mockLikes || new Map();
      const likeKey = `${userId}_${cardId}`;
      const isCurrentlyLiked = mockLikeState.get(likeKey) || false;
      
      if (isCurrentlyLiked) {
        mockLikeState.delete(likeKey);
        return { isLiked: false, action: 'unliked' };
      } else {
        mockLikeState.set(likeKey, true);
        global.mockLikes = mockLikeState;
        return { isLiked: true, action: 'liked' };
      }
    }

    // Check if like already exists
    const existingLike = await this.findOne({ user_id: userId, card_id: cardId });
    
    if (existingLike) {
      // Unlike: remove the like
      await this.deleteOne({ _id: existingLike._id });
      
      // Decrement likes count on card
      const Card = mongoose.model('Card');
      await Card.findByIdAndUpdate(cardId, { $inc: { likes: -1 } });
      
      return { isLiked: false, action: 'unliked' };
    } else {
      // Like: create new like
      await this.create({ user_id: userId, card_id: cardId });
      
      // Increment likes count on card
      const Card = mongoose.model('Card');
      await Card.findByIdAndUpdate(cardId, { $inc: { likes: 1 } });
      
      return { isLiked: true, action: 'liked' };
    }
  } catch (error) {
    throw new Error(`Error toggling like: ${error.message}`);
  }
};

// Static method to get like status for user (mock mode compatible)
likeSchema.statics.isLikedByUser = async function(userId, cardId) {
  if (!userId) return false;
  
  // In mock mode, check mock likes
  if (process.env.NODE_ENV === 'development' && !mongoose.connection.readyState) {
    const mockLikeState = global.mockLikes || new Map();
    const likeKey = `${userId}_${cardId}`;
    return mockLikeState.get(likeKey) || false;
  }
  
  const like = await this.findOne({ user_id: userId, card_id: cardId });
  return !!like;
};

// Static method to get likes count for card
likeSchema.statics.getLikesCount = async function(cardId) {
  return await this.countDocuments({ card_id: cardId });
};

// Static method to get user's likes (mock mode compatible)
likeSchema.statics.getUserLikes = async function(userId, limit = 10) {
  if (!userId) return [];
  
  // In mock mode, return empty array for now
  if (process.env.NODE_ENV === 'development' && !mongoose.connection.readyState) {
    return [];
  }
  
  return await this.find({ user_id: userId })
    .populate('card_id')
    .sort({ likedAt: -1 })
    .limit(limit);
};

module.exports = mongoose.model('Like', likeSchema);

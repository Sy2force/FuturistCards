const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card',
      required: [true, 'Card is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user can only favorite a card once
favoriteSchema.index({ user: 1, card: 1 }, { unique: true });

// Index for better query performance
favoriteSchema.index({ user: 1 });
favoriteSchema.index({ card: 1 });

// Static method to toggle favorite
favoriteSchema.statics.toggleFavorite = async function (userId, cardId) {
  try {
    const existingFavorite = await this.findOne({ user: userId, card: cardId });

    if (existingFavorite) {
      await this.deleteOne({ user: userId, card: cardId });
      return { action: 'removed', favorite: null };
    } else {
      const newFavorite = await this.create({ user: userId, card: cardId });
      return { action: 'added', favorite: newFavorite };
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
    throw new Error('Error toggling favorite: ' + error.message);
  }
};

// Static method to get user's favorites
favoriteSchema.statics.getUserFavorites = function (userId) {
  return this.find({ user: userId })
    .populate({
      path: 'card',
      populate: {
        path: 'user_id',
        select: 'firstName lastName email',
      },
    })
    .sort({ createdAt: -1 });
};

// Static method to check if card is favorited by user
favoriteSchema.statics.isFavorited = function (userId, cardId) {
  return this.exists({ user: userId, card: cardId });
};

// Static method to get favorite count for a card
favoriteSchema.statics.getFavoriteCount = function (cardId) {
  return this.countDocuments({ card: cardId });
};

module.exports = mongoose.model('Favorite', favoriteSchema);

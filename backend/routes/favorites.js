const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { t } = require('../utils/i18n');

// Get user favorites
router.get('/', protect, async (req, res) => {
  try {
    // Mock favorites data
    const favorites = [
      {
        _id: 'fav_1',
        userId: req.user.id,
        cardId: 'test_card_1',
        createdAt: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      count: favorites.length,
      favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('server.serverError')
    });
  }
});

// Add card to favorites
router.post('/:cardId', protect, async (req, res) => {
  try {
    const { cardId } = req.params;

    // Mock favorite creation
    const favorite = {
      _id: `fav_${Date.now()}`,
      userId: req.user.id,
      cardId,
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: t('favorites.addedToFavorites'),
      favorite
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('server.serverError')
    });
  }
});

// Remove card from favorites
router.delete('/:cardId', protect, async (req, res) => {
  try {
    const { cardId } = req.params;

    res.json({
      success: true,
      message: t('favorites.removedFromFavorites')
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: t('server.serverError')
    });
  }
});

module.exports = router;

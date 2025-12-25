const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

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
      message: 'Server error'
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
      message: 'Card added to favorites (mock mode)',
      favorite
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Remove card from favorites
router.delete('/:cardId', protect, async (req, res) => {
  try {
    const { cardId } = req.params;

    res.json({
      success: true,
      message: 'Card removed from favorites (mock mode)'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;

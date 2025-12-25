const express = require('express');
const {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getMyCards,
  toggleLike,
  toggleFavorite,
  getFavorites,
  checkFavorite,
  searchCards,
  getPopularCards
} = require('../controllers/cardController');
const { protect, business, admin, optionalAuth } = require('../middleware/authMiddleware');
const { validateCard } = require('../middleware/validation');
const { sampleCards } = require('../data/sampleCards');
const Card = require('../models/Card');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// Routes publiques
router.get('/', getAllCards);
router.get('/search', searchCards);
router.get('/popular', getPopularCards);

// Route seed pour insérer les 12 cartes de démonstration
router.post('/seed', asyncHandler(async (req, res) => {
  try {
    await Card.deleteMany();
    const inserted = await Card.insertMany(sampleCards);
    res.status(201).json({ 
      success: true, 
      count: inserted.length,
      message: `${inserted.length} cartes de démonstration insérées avec succès`
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Erreur lors de l\'insertion des cartes de démonstration',
      details: error.message
    });
  }
}));

// Routes protégées - IMPORTANT: routes spécifiques AVANT routes avec paramètres
router.get('/my-cards', protect, getMyCards);
router.get('/user', protect, getMyCards);
router.get('/favorites', protect, getFavorites);
router.post('/', protect, business, validateCard, createCard);
router.put('/:id', protect, business, validateCard, updateCard);
router.delete('/:id', protect, business, deleteCard);
router.post('/:id/like', protect, toggleLike);
router.post('/:id/favorite', protect, toggleFavorite);
router.get('/:id/favorite', protect, checkFavorite);

// Route avec paramètre - DOIT être en dernier
router.get('/:id', optionalAuth, getCardById);

module.exports = router;

const express = require('express');
const { body } = require('express-validator');
const {
  getPlatformAnalytics,
  getUserAnalytics,
  trackCardView,
  getCardAnalytics
} = require('../controllers/analyticsController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules for tracking card view
const trackViewValidation = [
  body('cardId')
    .notEmpty()
    .withMessage('Card ID is required')
    .isMongoId()
    .withMessage('Invalid card ID format')
];

// Protected routes
router.get('/platform', protect, requireAdmin, getPlatformAnalytics);
router.get('/user/:userId', protect, getUserAnalytics);
router.get('/card/:cardId', protect, getCardAnalytics);

// Public routes
router.post('/track/view', trackViewValidation, trackCardView);

module.exports = router;

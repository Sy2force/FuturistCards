const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Card = require('../models/Card');
const { protect, requireBusiness } = require('../middleware/authMiddleware');
const { mockCards } = require('../utils/mockData');
const {
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
  toggleLike,
  getNearbyCards,
  searchCards,
  getCategories
} = require('../controllers/cardController');

// Validation rules for card creation/update
const cardValidation = [
  body('title')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Title must be between 2 and 100 characters'),
  body('subtitle')
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage('Subtitle must be between 2 and 150 characters'),
  body('description')
    .trim()
    .isLength({ min: 2, max: 1000 })
    .withMessage('Description must be between 2 and 1000 characters'),
  body('phone')
    .matches(/^0[2-9]\d{7,8}$/)
    .withMessage('Please provide a valid Israeli phone number'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
  body('image.url')
    .optional(),
  body('image.alt')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Image alt text must be between 2 and 100 characters'),
  body('address.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('address.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('address.street')
    .trim()
    .notEmpty()
    .withMessage('Street is required'),
  body('address.houseNumber')
    .trim()
    .notEmpty()
    .withMessage('House number is required'),
  body('category')
    .optional()
    .isIn(['technology', 'business', 'creative', 'healthcare', 'education', 'finance', 'marketing', 'consulting', 'other'])
    .withMessage('Please select a valid category'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Each tag must be between 1 and 30 characters'),
  body('socialLinks.linkedin')
    .optional()
    .matches(/^https?:\/\/(www\.)?linkedin\.com\//)
    .withMessage('Please provide a valid LinkedIn URL'),
  body('socialLinks.twitter')
    .optional()
    .matches(/^https?:\/\/(www\.)?twitter\.com\//)
    .withMessage('Please provide a valid Twitter URL'),
  body('socialLinks.instagram')
    .optional()
    .matches(/^https?:\/\/(www\.)?instagram\.com\//)
    .withMessage('Please provide a valid Instagram URL'),
  body('socialLinks.facebook')
    .optional()
    .matches(/^https?:\/\/(www\.)?facebook\.com\//)
    .withMessage('Please provide a valid Facebook URL'),
  body('socialLinks.github')
    .optional()
    .matches(/^https?:\/\/(www\.)?github\.com\//)
    .withMessage('Please provide a valid GitHub URL'),
  body('socialLinks.youtube')
    .optional()
    .matches(/^https?:\/\/(www\.)?youtube\.com\//)
    .withMessage('Please provide a valid YouTube URL')
];

// Public routes
router.get('/categories', getCategories);
router.get('/nearby', getNearbyCards);
router.get('/search', searchCards);
router.get('/', getCards);
router.get('/:id', getCard);

// Protected routes (fix middleware names)
router.post('/:id/like', protect, toggleLike);
router.post('/', protect, requireBusiness, cardValidation, createCard);
router.put('/:id', protect, cardValidation, updateCard);
router.delete('/:id', protect, deleteCard);

module.exports = router;

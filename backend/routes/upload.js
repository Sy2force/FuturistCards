const express = require('express');
const { body } = require('express-validator');
const {
  uploadImage,
  deleteImage,
  getImageInfo,
  optimizeImage
} = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules for image upload
const uploadValidation = [
  body('image')
    .notEmpty()
    .withMessage('Image data is required'),
  body('type')
    .optional()
    .isIn(['base64', 'url'])
    .withMessage('Type must be either "base64" or "url"')
];

// Validation rules for image deletion
const deleteValidation = [
  body('imageUrl')
    .notEmpty()
    .withMessage('Image URL is required')
    .isURL()
    .withMessage('Please provide a valid image URL')
];

// Validation rules for image optimization
const optimizeValidation = [
  body('imageUrl')
    .notEmpty()
    .withMessage('Image URL is required')
    .isURL()
    .withMessage('Please provide a valid image URL'),
  body('width')
    .optional()
    .isInt({ min: 50, max: 2000 })
    .withMessage('Width must be between 50 and 2000 pixels'),
  body('height')
    .optional()
    .isInt({ min: 50, max: 2000 })
    .withMessage('Height must be between 50 and 2000 pixels'),
  body('quality')
    .optional()
    .isInt({ min: 10, max: 100 })
    .withMessage('Quality must be between 10 and 100')
];

// Protected routes
router.post('/image', protect, uploadValidation, uploadImage);
router.delete('/image', protect, deleteValidation, deleteImage);
router.post('/image/optimize', protect, optimizeValidation, optimizeImage);

// Public routes
router.get('/image/info', getImageInfo);

module.exports = router;

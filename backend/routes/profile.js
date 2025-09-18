const express = require('express');
const { body } = require('express-validator');
const {
  getProfile,
  updateProfile,
  updateAvatar,
  changePassword,
  deleteAccount,
  getPublicProfile
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules for profile update
const profileValidation = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('phone')
    .optional()
    .matches(/^0[2-9]\d{7,8}$/)
    .withMessage('Please provide a valid Israeli phone number'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('website')
    .optional()
    .isURL()
    .withMessage('Please provide a valid website URL'),
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
    .withMessage('Please provide a valid GitHub URL')
];

// Password change validation
const passwordValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number')
];

// Avatar validation
const avatarValidation = [
  body('avatar')
    .matches(/^(https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$|data:image\/)/i)
    .withMessage('Please provide a valid image URL or base64 data')
];

// Delete account validation
const deleteValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password is required to delete account')
];

// Protected routes
router.get('/', protect, getProfile);
router.put('/', protect, profileValidation, updateProfile);
router.put('/avatar', protect, avatarValidation, updateAvatar);
router.put('/password', protect, passwordValidation, changePassword);
router.delete('/', protect, deleteValidation, deleteAccount);

// Public routes
router.get('/:userId', getPublicProfile);

module.exports = router;

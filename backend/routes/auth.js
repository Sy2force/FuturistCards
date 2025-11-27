import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect, authorize, requireAdmin } from '../middleware/authMiddleware.js';
import { validate, authSchemas } from '../middleware/validation.js';

const router = express.Router();

// ================================
// AUTHENTICATION ROUTES
// ================================

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validate(authSchemas.register), register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validate(authSchemas.login), login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', protect, getMe);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', protect, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// ================================
// ADMIN DASHBOARD ROUTES
// ================================

// @route   GET /api/auth/admin/stats
// @desc    Get system statistics for admin dashboard
// @access  Admin only
router.get('/admin/stats', protect, requireAdmin, async (req, res) => {
  try {
    // Mock statistics for development
    const stats = {
      users: {
        total: 156,
        active: 142,
        newThisMonth: 23,
        roles: {
          user: 134,
          business: 18,
          admin: 4
        }
      },
      cards: {
        total: 487,
        active: 456,
        public: 423,
        newThisMonth: 67,
        categories: {
          Technology: 189,
          Design: 124,
          Marketing: 89,
          Business: 85
        }
      },
      activity: {
        totalViews: 12456,
        totalLikes: 3421,
        averageViewsPerCard: 25.6,
        popularCards: [
          { id: '1', title: 'Senior React Developer', views: 234 },
          { id: '2', title: 'UX/UI Designer Expert', views: 198 },
          { id: '3', title: 'DevOps Architect', views: 187 }
        ]
      }
    };

    res.json({
      success: true,
      stats
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

// @route   GET /api/auth/admin/health
// @desc    Get system health status
// @access  Admin only
router.get('/admin/health', protect, requireAdmin, async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        api: 'running',
        authentication: 'active'
      },
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };

    res.json({
      success: true,
      health
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking system health'
    });
  }
});

export default router;

import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import mongoose from 'mongoose';

// Helper function to create mock user for development
const createMockUser = () => ({
  id: '507f1f77bcf86cd799439015',
  userId: '507f1f77bcf86cd799439015',
  _id: '507f1f77bcf86cd799439015',
  email: 'business@test.com',
  firstName: 'Business',
  lastName: 'User',
  role: 'business',
  isActive: true,
  isBusiness: true,
  isAdmin: false
});

// JWT authentication middleware with mock fallback for development
const protect = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid Authorization header found');
      // Fallback: create mock user for development
      req.user = createMockUser();
      return next();
    }

    const token = authHeader.replace('Bearer ', '');
    console.log('Token received:', token.substring(0, 20) + '...');

    try {
      // Attempt to verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified successfully:', decoded);
      
      // Look for user in database
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        console.log('User not found in database, using mock user');
        req.user = createMockUser();
        return next();
      }
      
      req.user = user;
      console.log('User authenticated:', user.email);
      next();
    } catch (jwtError) {
      console.log('JWT verification failed:', jwtError.message);
      // Fallback: use mock user
      req.user = createMockUser();
      next();
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    // In case of error, use mock user
    req.user = createMockUser();
    next();
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
};

// Check if user is business or admin
const requireBusiness = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }

  if (!req.user.isBusiness && !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Business account required',
    });
  }
  next();
};

// Check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized',
    });
  }

  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required',
    });
  }
  next();
};

// Alias for protect to maintain consistency
const authMiddleware = protect;

export { protect, authMiddleware, authorize, requireBusiness, requireAdmin };

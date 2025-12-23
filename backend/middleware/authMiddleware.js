const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // Vérifier si le token est présent dans les headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token'
      });
    }

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

      // Mode mock pour développement
      if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
        // Récupérer l'utilisateur mock depuis le module global
        const mockUsers = global.mockUsers || new Map();
        const mockUser = mockUsers.get(decoded.id);
        
        if (mockUser) {
          req.user = {
            id: decoded.id,
            role: mockUser.role,
            isAdmin: mockUser.isAdmin,
            isBusiness: mockUser.isBusiness,
            firstName: mockUser.firstName,
            lastName: mockUser.lastName,
            email: mockUser.email
          };
        } else {
          req.user = {
            id: decoded.id,
            role: 'user',
            isAdmin: false,
            isBusiness: false
          };
        }
        return next();
      }

      // Récupérer l'utilisateur depuis la base de données
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found'
        });
      }

      next();
    } catch (error) {
      // Erreur de vérification du token
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  } catch (error) {
    // Erreur du middleware d'authentification
    return res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Middleware pour vérifier les rôles admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized as admin'
    });
  }
};

// Middleware pour vérifier les rôles business
const business = (req, res, next) => {
  if (req.user && (req.user.isBusiness || req.user.isAdmin)) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized as business user'
    });
  }
};

// Optional auth middleware - doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');

        // Mode mock pour développement
        if (process.env.NODE_ENV === 'development' || !process.env.MONGODB_URI) {
          req.user = {
            id: decoded.id,
            role: 'user',
            isAdmin: false,
            isBusiness: false
          };
        } else {
          req.user = await User.findById(decoded.id).select('-password');
        }
      } catch (error) {
        // Token invalid, but continue without user
        req.user = null;
      }
    }

    next();
  } catch (error) {
    // Erreur du middleware d'authentification optionnel
    next();
  }
};

module.exports = { protect, admin, business, optionalAuth };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

// middleware pour protéger les routes
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // récupérer le token
      token = req.headers.authorization.split(' ')[1];

      // Seulement en mode développement
      if (process.env.NODE_ENV === 'development' && token === 'test-token') {
        req.user = { id: 'test-user-id', role: 'business' };
        return next();
      }

      // vérifier le token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // récupérer l'utilisateur
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Token invalide' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ 
        message: 'Token invalide ou expiré',
        error: process.env.NODE_ENV === 'development' ? error.message : 'Invalid token'
      });
    }
  } else {
    res.status(401).json({ message: 'Pas de token, accès refusé' });
  }
};

// middleware optionnel (pas obligé d'être connecté)
const optionalAuth = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      if (process.env.NODE_ENV === 'development' && token === 'test-token') {
        req.user = { id: 'test-user-id', role: 'business' };
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      // pas grave si le token est invalide pour optionalAuth
    }
  }
  
  next();
};

// middleware pour les admins seulement
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Accès admin requis' });
  }
};

// middleware pour business et admin
const businessOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'business' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Compte business ou admin requis' });
  }
};

module.exports = {
  protect,
  optionalAuth,
  adminOnly,
  businessOrAdmin
};

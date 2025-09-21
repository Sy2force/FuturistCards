const Card = require('../models/Card');

// Middleware pour vérifier les rôles requis
const roleGuard = (allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Accès non autorisé - utilisateur non authentifié',
        });
      }

      const userRole = req.user.role || 'user';
      
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: 'Accès refusé - permissions insuffisantes',
        });
      }

      next();
    } catch (error) {
      console.error('Role guard error:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la vérification des permissions',
      });
    }
  };
};

// Check if user owns the resource or is admin
const checkOwnership = (Model, paramName = 'id') => {
  return async (req, res, next) => {
    try {
      const resource = await Model.findById(req.params[paramName]);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found',
        });
      }

      // Admin can access everything
      if (req.user.role === 'admin') {
        req.resource = resource;
        return next();
      }

      // Check ownership
      const resourceUserId = resource.user_id || resource.user || resource._id;
      if (resourceUserId.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to access this resource',
        });
      }

      req.resource = resource;
      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during ownership check',
      });
    }
  };
};

// Check if user can edit card (owner or admin)
const canEditCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found',
      });
    }

    // Admin can edit any card
    if (req.user.role === 'admin') {
      req.card = card;
      return next();
    }

    // User can only edit their own cards
    if (card.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this card',
      });
    }

    req.card = card;
    next();
  } catch (error) {
    console.error('Card edit permission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error checking card permissions',
    });
  }
};

// Check if user can delete card (owner or admin)
const canDeleteCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.params.id);

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found',
      });
    }

    // Admin can delete any card
    if (req.user.role === 'admin') {
      req.card = card;
      return next();
    }

    // User can only delete their own cards
    if (card.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this card',
      });
    }

    req.card = card;
    next();
  } catch (error) {
    console.error('Card delete permission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error checking card permissions',
    });
  }
};

module.exports = {
  roleGuard,
  checkOwnership,
  canEditCard,
  canDeleteCard,
};

/**
 * Middleware avancé pour la gestion des rôles utilisateur
 * Permet de protéger les routes selon les permissions requises
 */

/**
 * Middleware pour vérifier qu'un utilisateur a un rôle spécifique
 * @param {string|Array} allowedRoles - Rôle(s) autorisé(s) (user, business, admin)
 * @returns {Function} Middleware Express
 */
const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      // Vérifier que l'utilisateur est authentifié
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentification requise'
        });
      }

      // Normaliser allowedRoles en array
      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      
      // Vérifier si l'utilisateur a un des rôles autorisés
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Accès refusé. Rôles requis: ${roles.join(', ')}. Votre rôle: ${req.user.role}`
        });
      }

      next();
    } catch (error) {
      console.error('Erreur dans requireRole middleware:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la vérification des permissions'
      });
    }
  };
};

/**
 * Middleware pour vérifier que l'utilisateur est propriétaire d'une ressource
 * @param {string} resourceField - Champ contenant l'ID du propriétaire (ex: 'owner', 'userId')
 * @returns {Function} Middleware Express
 */
const requireOwnership = (resourceField = 'owner') => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentification requise'
        });
      }

      // Les admins peuvent accéder à toutes les ressources
      if (req.user.role === 'admin') {
        return next();
      }

      // Vérifier la propriété de la ressource
      const resourceOwnerId = req.resource?.[resourceField]?.toString();
      const userId = req.user.id?.toString();

      if (resourceOwnerId !== userId) {
        return res.status(403).json({
          success: false,
          message: 'Vous ne pouvez accéder qu\'à vos propres ressources'
        });
      }

      next();
    } catch (error) {
      console.error('Erreur dans requireOwnership middleware:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la vérification de propriété'
      });
    }
  };
};

/**
 * Middleware combiné pour vérifier rôle ET propriété
 * @param {string|Array} allowedRoles - Rôles autorisés
 * @param {string} resourceField - Champ du propriétaire
 * @returns {Function} Middleware Express
 */
const requireRoleOrOwnership = (allowedRoles, resourceField = 'owner') => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentification requise'
        });
      }

      const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      
      // Vérifier si l'utilisateur a un rôle autorisé
      if (roles.includes(req.user.role)) {
        return next();
      }

      // Sinon, vérifier la propriété
      const resourceOwnerId = req.resource?.[resourceField]?.toString();
      const userId = req.user.id?.toString();

      if (resourceOwnerId === userId) {
        return next();
      }

      return res.status(403).json({
        success: false,
        message: `Accès refusé. Rôles requis: ${roles.join(', ')} ou être propriétaire de la ressource`
      });
    } catch (error) {
      console.error('Erreur dans requireRoleOrOwnership middleware:', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la vérification des permissions'
      });
    }
  };
};

export { requireRole, requireOwnership, requireRoleOrOwnership };
export default requireRole;

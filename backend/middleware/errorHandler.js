<<<<<<< HEAD
// gestion des erreurs globales

=======
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

<<<<<<< HEAD
  // erreur de validation MongoDB
=======
  // Log error en mode développement seulement (supprimé pour production)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({
      success: false,
      message: message
    });
  }

  // erreur de duplication (email déjà utilisé)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} déjà utilisé`;
    return res.status(400).json({
      success: false,
      message: message
    });
  }

  // erreur JWT
  if (err.name === 'JsonWebTokenError') {
<<<<<<< HEAD
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }

  // erreur par défaut
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Erreur serveur'
=======
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  });
};

module.exports = { errorHandler };

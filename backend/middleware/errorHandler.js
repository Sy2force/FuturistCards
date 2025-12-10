// gestion des erreurs globales

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // erreur de validation MongoDB
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
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }

  // erreur par défaut
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Erreur serveur'
  });
};

module.exports = { errorHandler };

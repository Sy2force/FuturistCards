const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error('Erreur capturée par le middleware:', err);

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      message: `Erreur de validation: ${message}`,
      statusCode: 400
    };
  }

  // Erreur de duplication Mongoose (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    error = {
      message: `${field} '${value}' existe déjà`,
      statusCode: 400
    };
  }

  // Erreur ObjectId invalide
  if (err.name === 'CastError') {
    error = {
      message: 'Ressource non trouvée',
      statusCode: 404
    };
  }

  // Erreur JWT
  if (err.name === 'JsonWebTokenError') {
    error = {
      message: 'Token invalide',
      statusCode: 401
    };
  }

  // Token expiré
  if (err.name === 'TokenExpiredError') {
    error = {
      message: 'Token expiré',
      statusCode: 401
    };
  }

  // Erreur de syntaxe JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    error = {
      message: 'Format JSON invalide',
      statusCode: 400
    };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { errorHandler };

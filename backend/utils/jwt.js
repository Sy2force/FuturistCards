const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');

// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );
};

// Verify JWT token
const verifyToken = (token) => {
  return jwt.verify(token, jwtConfig.secret);
};

module.exports = {
  generateToken,
  verifyToken
};

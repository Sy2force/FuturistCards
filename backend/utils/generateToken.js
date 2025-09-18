const jwt = require('jsonwebtoken');

/**
 * Génération de tokens JWT
 */

const generateToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET || 'fallback_secret_key_2025',
        { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );
};

const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'fallback_secret_key_2025',
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );
};

const generateRefreshToken = (userId) => {
    return jwt.sign(
        { userId },
        process.env.JWT_REFRESH_SECRET || 'fallback_refresh_secret_2025',
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
};

const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};

module.exports = {
    generateToken,
    generateAccessToken,
    generateRefreshToken,
    verifyToken
};

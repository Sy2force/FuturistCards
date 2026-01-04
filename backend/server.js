require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");

// mes routes
const authRoutes = require("./routes/authRoutes");
const cardRoutes = require("./routes/cardRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const userRoutes = require("./routes/userRoutes");

const { 
  generalLimiter, 
  authLimiter, 
  apiLimiter 
} = require('./middleware/rateLimiter');
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5001;

// URLs autorisées pour CORS
const allowedOrigins = [
  // Production
  'https://futuristcards.vercel.app',
  
  // Local development
  'http://localhost:3010',
  'http://127.0.0.1:3010',
  
  // Vercel preview deployments and all possible Vercel domains
  /^https:\/\/futuristcards.*\.vercel\.app$/,
  /^https:\/\/.*futuristcards.*\.vercel\.app$/,
  /^https:\/\/.*\.vercel\.app$/
];

const corsOptions = {
  origin: function (origin, callback) {
    // pas d'origin = ok (Postman etc)
    if (!origin) return callback(null, true);
    
    // Log origin for debugging
    console.log('CORS Origin:', origin);
    
    // Verify si l'origin est autorisée
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    console.log('CORS Allowed:', isAllowed);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS Rejected:', origin);
      callback(null, false); // Properly reject unauthorized origins
    }
  },
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin'
  ]
};

app.use(cors(corsOptions));

// Enhanced security headers
const securityHeaders = require('./middleware/securityHeaders');
app.use(securityHeaders);

app.use(compression());

// Apply rate limiting
app.use('/api', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// pour parser le JSON
app.use(express.json({ strict: false }));
app.use(express.urlencoded({ extended: true }));

// log des requêtes (dev seulement)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    // Request logging for development
    next();
  });
}

// mes routes API
app.use('/api', require('./routes/healthRoutes'));
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));

// gestion des erreurs
app.use(errorHandler);

async function startServer() {
  // MongoDB connection with enhanced error handling
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
  
  if (mongoURI) {
    try {
      // MongoDB connection attempt
      
      const mongoOptions = {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        connectTimeoutMS: 30000,
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority',
        authSource: 'admin'
      };

      await mongoose.connect(mongoURI, mongoOptions);
      // MongoDB connected successfully
    } catch (err) {
      console.error('❌ MongoDB Connection Error:', err.message);
      console.error('🔍 Error details:', err);
      // Server continues in fallback mode
      // Don't exit - continue without MongoDB
    }
  } else {
    // No MongoDB URI - fallback mode
  }

  // Start server regardless of MongoDB connection
  app.listen(PORT, () => {
    // Server started on port ${PORT}
  });
}

// For Vercel serverless deployment
if (process.env.VERCEL) {
  // Don't start server in Vercel environment
  module.exports = app;
} else if (require.main === module) {
  startServer();
}

module.exports = app;

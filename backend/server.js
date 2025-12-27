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
  registerLimiter, 
  cardLimiter 
} = require('./middleware/rateLimiter');
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3002;

// URLs autorisées pour CORS
const allowedOrigins = [
  // Production
  'https://futuristcards.vercel.app',
  
  // Local development
  'http://localhost:3010',
  'http://127.0.0.1:3010',
  
  // Vercel preview deployments
  /^https:\/\/futuristcards-.*\.vercel\.app$/,
  /^https:\/\/.*--futuristcards\.vercel\.app$/
];

const corsOptions = {
  origin: function (origin, callback) {
    // pas d'origin = ok (Postman etc)
    if (!origin) return callback(null, true);
    
    // vérifier si l'origin est autorisée
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Accès refusé par CORS'), false);
    }
  },
  credentials: true,
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
app.use('/api/auth/register', registerLimiter);
app.use('/api/cards', cardLimiter);

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
  // Connexion MongoDB avec gestion d'erreur robuste
  const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (mongoURI) {
    try {
      console.log('🔄 Connecting to MongoDB...');
      const mongoOptions = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        retryWrites: true,
        w: 'majority'
      };

      await mongoose.connect(mongoURI, mongoOptions);
      console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
      console.error('❌ MongoDB Connection Error:', err.message);
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  } else {
    console.error('❌ MONGODB_URI environment variable not found');
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = app;

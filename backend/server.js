require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
<<<<<<< HEAD

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
=======
const { connectDB, getConnectionStatus } = require('./config/db');
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd

const app = express();
const PORT = process.env.PORT || 5001;

<<<<<<< HEAD
// URLs autorisées pour CORS
const allowedOrigins = [
  // prod
  'https://cardpro-frontend.vercel.app',
  'https://card-pro-wzcf-i5jo4z49s-projet-607a8e5b.vercel.app',
  'https://card-pro-git-main-projet-607a8e5b.vercel.app',
  
  // local dev
=======
// Security middleware with comprehensive headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// Rate limiting - configurable for production
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes default
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 100 requests default
  message: {
    success: false,
    message: 'Trop de requêtes, veuillez réessayer plus tard'
  },
  standardHeaders: true,
  legacyHeaders: false
});

if (process.env.NODE_ENV === 'production') {
  app.use('/api/', limiter);
}

// CORS configuration
/**
 * CORS configuration for frontend-backend communication
 * Supports both development (localhost:3010) and production URLs
 */
const allowedOrigins = [
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  'http://localhost:3000',
  'http://localhost:3010',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3010',
<<<<<<< HEAD
  'http://127.0.0.1:3012',
  'http://127.0.0.1:3015',
  'http://127.0.0.1:5173',
  
  // patterns pour les nouveaux deployments Vercel
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
  /^https:\/\/[a-z0-9-]+-[a-z0-9]+-projet-607a8e5b\.vercel\.app$/,
  /^https:\/\/cardpro-frontend-[a-z0-9]+-projet-607a8e5b\.vercel\.app$/,
  /^https:\/\/card-pro-.*\.vercel\.app$/,
  /^https:\/\/.*--cardpro-frontend-.*\.vercel\.app$/,
  
  'https://card-pro-wzcf.vercel.app'
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
=======
  process.env.CLIENT_URL || 'https://futuristcards.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Handle preflight requests
app.options('*', cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Dev logging middleware for request tracking
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    // Request logging handled by morgan in development
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
    next();
  });
}

<<<<<<< HEAD
// endpoint pour vérifier si tout va bien
app.get("/api/health", (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;
  res.json({ 
    success: true, 
    mongodb: mongoConnected ? "connected" : "disconnected"
  });
});

// mes routes API
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/users', userRoutes);

// gestion des erreurs
app.use(errorHandler);

async function startServer() {
  // Connexion MongoDB avec gestion d'erreur robuste
  if (process.env.MONGO_URI) {
    try {
      const mongoOptions = {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
        retryWrites: true,
        w: 'majority'
      };

      await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    } catch (err) {
      console.error('Erreur MongoDB:', err.message);
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  } else {
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    // Serveur démarré avec succès
  });
=======
/**
 * Health check endpoint for monitoring server and database status
 */
app.get('/api/health', (req, res) => {
  const dbStatus = getConnectionStatus();
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Import and setup routes after middleware
const authRoutes = require("./routes/authRoutes");
const cardRoutes = require("./routes/cardRoutes");
const adminRoutes = require("./routes/adminRoutes");
const likesRoutes = require("./routes/likes");
const usersRoutes = require("./routes/users");
const favoritesRoutes = require("./routes/favorites");

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/likes', likesRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/favorites', favoritesRoutes);

// Routes configured: /api/auth, /api/cards, /api/likes

async function startServer() {
  try {
    // Connect to MongoDB with improved error handling
    // Démarrage du serveur FuturistCards
    
    await connectDB();
    
    // Start server regardless of MongoDB connection status
    const server = app.listen(PORT, () => {
      // Server running on port ${PORT}
      // Health check available at /api/health
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      // SIGTERM received, shutting down server
      server.close(() => {
        // Server shut down gracefully
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      // SIGINT received, shutting down server
      server.close(() => {
        // Server shut down gracefully
        process.exit(0);
      });
    });

    return server;
  } catch (error) {
    // Critical startup error - server cannot continue
    process.exit(1);
  }
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
}

if (require.main === module) {
  startServer();
}

module.exports = app;

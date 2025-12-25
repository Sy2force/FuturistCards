require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { connectDB, getConnectionStatus } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

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
  'http://localhost:3000',
  'http://localhost:3010',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3010',
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
    next();
  });
}

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
}

if (require.main === module) {
  startServer();
}

module.exports = app;

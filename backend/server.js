require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { connectDB, getConnectionStatus } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Security middleware
app.use(helmet());

// Rate limiting - disabled in development for tests
if (process.env.NODE_ENV === 'production') {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use(limiter);
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
app.use(express.json());
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
const likesRoutes = require("./routes/likes");

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/likes', likesRoutes);

// Log routes for debugging
console.log('✅ Routes configured: /api/auth, /api/cards, /api/likes');

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

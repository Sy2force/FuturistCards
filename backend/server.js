import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import logger, { requestLogger } from './middleware/logger.js';
import { securityMiddleware } from './middleware/accountSecurity.js';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cardRoutes from './routes/cards.js';
import favoriteRoutes from './routes/favorites.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment-specific configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
dotenv.config({ 
  path: `.env.${NODE_ENV}` 
});

// Fallback to .env if environment-specific file doesn't exist
if (!process.env.PORT) {
  dotenv.config();
}
// Error handler middleware inline (HackerU simplification)
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error using our logger system
  logger.error(`Application Error: ${err.message}`, req, err);

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
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

const app = express();

// Connect to MongoDB
connectDB();

// Compression middleware - must be early in the pipeline
app.use(compression({
  level: 6,
  threshold: 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Security middleware
app.use(helmet({
  contentSecurityPolicy: NODE_ENV === 'production' ? {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  } : false,
  hsts: NODE_ENV === 'production' ? {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  } : false,
  crossOriginEmbedderPolicy: false
}));

// CORS configuration - Optimized for Vercel + local development
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3010', 
  'http://localhost:3001',
  'https://cardpro-2.vercel.app',
  'https://futurist-cards.vercel.app',
  'https://cardpro-frontend.vercel.app'
];

// Add dynamic CORS_ORIGIN from environment
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(...process.env.CORS_ORIGIN.split(','));
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowedOrigins or matches pattern
    if (allowedOrigins.includes(origin) || 
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.onrender.com')) {
      return callback(null, true);
    }
    
    // Allow localhost on any port in development
    if (NODE_ENV === 'development' && origin.includes('localhost')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
}));

// Request logging
app.use(requestLogger); // Notre système de logs personnalisé
if (NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Rate limiting - simple pour projet étudiant
const simpleLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

if (NODE_ENV !== 'test') {
  app.use(simpleLimiter);
}

// Body parsing middleware with size limits (MUST be before security middleware)
app.use(express.json({ 
  limit: NODE_ENV === 'production' ? '10mb' : '50mb' 
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: NODE_ENV === 'production' ? '10mb' : '50mb' 
}));

// Security middleware for login attempts
app.use(securityMiddleware);

// Static files removed - backend should only serve API endpoints

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/favorites', favoriteRoutes);

// Health check endpoints
app.get('/api/health', (req, res) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;
    const mongoStatus = isMongoConnected ? 'Connected' : 'Disconnected';
    
    console.log(`🏥 Health check - MongoDB: ${mongoStatus} (readyState: ${mongoose.connection.readyState})`);
    
    if (isMongoConnected) {
      console.log('✅ Mongo connecté - Health check OK');
      res.status(200).json({
        success: true,
        mongodb: true,
        status: 'OK',
        message: 'Server is running',
        database: {
          status: mongoStatus,
          name: mongoose.connection.name || 'cardpro',
          host: mongoose.connection.host || 'N/A'
        },
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });
    } else {
      console.log('❌ Mongo déconnecté - Health check FAIL');
      res.status(503).json({
        success: false,
        mongodb: false,
        status: 'ERROR',
        message: 'Database connection failed',
        error: 'Could not connect to MongoDB',
        database: {
          status: mongoStatus,
          readyState: mongoose.connection.readyState
        },
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('❌ Health check error:', error);
    res.status(500).json({
      success: false,
      mongodb: false,
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Root health check for quick monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "API online (root)",
    timestamp: new Date().toISOString()
  });
});

// API-only backend - no catch-all handler needed

// Global error handler (must be last middleware)
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health endpoint: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import logger, { requestLogger, errorLogger } from './middleware/logger.js';
import { securityMiddleware } from './middleware/accountSecurity.js';

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
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cardRoutes from './routes/cards.js';
import favoriteRoutes from './routes/favorites.js';
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

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3010', 'http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
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

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/favorites', favoriteRoutes);

// Health check endpoints
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    database: {
      status: mongoStatus,
      name: mongoose.connection.name || 'N/A'
    },
    timestamp: new Date().toISOString()
  });
});

// Root health check for quick monitoring
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    message: "API online (root)",
    timestamp: new Date().toISOString()
  });
});

// Catch all handler: send back React's index.html file for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Error handling middleware
app.use(errorLogger);
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server running on port ${PORT}`);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

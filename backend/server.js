import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import logger, { requestLogger } from './middleware/logger.js';
import { securityMiddleware } from './middleware/accountSecurity.js';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import cardRoutes from './routes/cards.js';
import favoriteRoutes from './routes/favorites.js';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment configuration with explicit path
const envPath = join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log('✅ Variables .env chargées depuis:', envPath);
} else {
  console.log('⚠️ Fichier .env non trouvé, utilisation des variables d\'environnement du système');
}

// Environment variables with defaults
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 10000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Validation des variables critiques
if (!JWT_SECRET) {
  console.error('❌ ERREUR: JWT_SECRET n\'est pas défini dans les variables d\'environnement');
  process.exit(1);
}

if (!MONGO_URI) {
  console.error('❌ ERREUR: MONGO_URI n\'est pas défini dans les variables d\'environnement');
  console.log('💡 Utilisation de MongoDB local par défaut');
}

// Affichage de la configuration au démarrage
console.log('\n🔧 === Configuration du serveur ===');
console.log(`📍 Environnement: ${NODE_ENV}`);
console.log(`📍 Port: ${PORT}`);
console.log(`📍 MongoDB URI: ${MONGO_URI ? MONGO_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@') : 'Non défini'}`);
console.log(`📍 CORS Origin: ${CORS_ORIGIN}`);
console.log(`📍 JWT Secret: ${JWT_SECRET ? '✅ Défini' : '❌ Non défini'}`);
console.log('===================================\n');
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

// CORS configuration dynamique depuis .env
const configureCORS = () => {
  // Parse CORS origins from environment
  const corsOrigins = CORS_ORIGIN === '*' ? '*' : CORS_ORIGIN.split(',').map(origin => origin.trim());
  
  // Default allowed origins for development
  const defaultOrigins = [
    'http://localhost:3000',
    'http://localhost:3010',
    'http://localhost:3011',
    'http://localhost:5173' // Vite default
  ];
  
  // Combine origins if not using wildcard
  const allowedOrigins = corsOrigins === '*' ? '*' : [...defaultOrigins, ...corsOrigins];
  
  console.log('🔒 CORS configuré avec:', allowedOrigins === '*' ? 'Toutes les origines (*)' : allowedOrigins);
  
  if (allowedOrigins === '*') {
    // Allow all origins (development/testing)
    return cors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
      optionsSuccessStatus: 200
    });
  } else {
    // Strict origin checking for production
    return cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);
        
        // Check if origin is allowed
        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }
        
        // Allow any Vercel deployment in production
        if (NODE_ENV === 'production' && origin.endsWith('.vercel.app')) {
          return callback(null, true);
        }
        
        // Allow localhost on any port in development
        if (NODE_ENV === 'development' && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
          return callback(null, true);
        }
        
        console.log(`⚠️ CORS bloqué pour: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
      optionsSuccessStatus: 200
    });
  }
};

app.use(configureCORS());

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

// Health check endpoint amélioré
app.get('/api/health', async (req, res) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;
    const mongoStatus = isMongoConnected ? 'Connected' : 'Disconnected';
    
    // Test de ping MongoDB pour vérifier la connexion réelle
    let pingSuccess = false;
    if (isMongoConnected) {
      try {
        await mongoose.connection.db.admin().ping();
        pingSuccess = true;
      } catch (pingError) {
        console.error('❌ MongoDB ping failed:', pingError.message);
      }
    }
    
    const healthData = {
      success: isMongoConnected && pingSuccess,
      status: isMongoConnected && pingSuccess ? 'OK' : 'DEGRADED',
      message: 'Server is running',
      environment: NODE_ENV,
      mongodb: {
        connected: isMongoConnected,
        ping: pingSuccess,
        status: mongoStatus,
        readyState: mongoose.connection.readyState,
        name: mongoose.connection.name || 'cardpro',
        host: mongoose.connection.host || 'N/A'
      },
      server: {
        port: PORT,
        uptime: Math.floor(process.uptime()),
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
        }
      },
      timestamp: new Date().toISOString()
    };
    
    if (isMongoConnected && pingSuccess) {
      res.status(200).json(healthData);
    } else {
      res.status(503).json(healthData);
    }
  } catch (error) {
    console.error('❌ Health check error:', error);
    res.status(500).json({
      success: false,
      status: 'ERROR',
      message: 'Health check failed',
      error: error.message,
      environment: NODE_ENV,
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

// Démarrage du serveur
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('\n✨ === Serveur démarré avec succès ===');
  console.log(`🚀 Port: ${PORT}`);
  console.log(`🌍 URL: http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/api/health`);
  console.log(`📊 Endpoints disponibles:`);
  console.log(`   - GET  /api/health`);
  console.log(`   - POST /api/auth/register`);
  console.log(`   - POST /api/auth/login`);
  console.log(`   - GET  /api/cards`);
  console.log(`   - GET  /api/favorites`);
  console.log('=====================================\n');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️ SIGTERM signal reçu: fermeture du serveur HTTP...');
  server.close(() => {
    console.log('✅ Serveur HTTP fermé');
    mongoose.connection.close(false, () => {
      console.log('✅ Connexion MongoDB fermée');
      process.exit(0);
    });
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('❌ Unhandled promise rejection:', err);
  // Ne pas faire exit(1) en production pour éviter de crash le serveur
  if (NODE_ENV === 'development') {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  // Fermeture gracieuse
  server.close(() => {
    process.exit(1);
  });
});

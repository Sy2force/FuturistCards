require('dotenv').config({ 
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' 
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler-clean');

// Import routes
const authRoutes = require('./routes/authRoutes-clean');
const cardRoutes = require('./routes/cardRoutes-clean');
const favoriteRoutes = require('./routes/favoriteRoutes-clean');

const app = express();

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:3000', 'http://localhost:3010', 'http://localhost:4173'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Non autorisé par la politique CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Total-Count']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const mongoConnected = mongoose.connection.readyState === 1;
  
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoConnected ? 'connected' : 'disconnected',
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/favorites', favoriteRoutes);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} non trouvée`
  });
});

// Global error handler
app.use(errorHandler);

// Database connection and server startup
const startServer = async () => {
  try {
    // Connect to MongoDB
    if (process.env.MONGO_URI) {
      await connectDB();
      console.log('✅ Base de données connectée');
    } else {
      console.warn('⚠️ MONGO_URI non défini - Mode développement sans base de données');
    }

    const PORT = process.env.PORT || 5001;
    
    // Start server only if not in Vercel environment
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`🚀 Serveur démarré sur le port ${PORT}`);
        console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
        console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔐 CORS Origins: ${allowedOrigins.join(', ')}`);
      });
    }

  } catch (error) {
    console.error('❌ Erreur lors du démarrage du serveur:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM reçu, arrêt gracieux du serveur...');
  const mongoose = require('mongoose');
  mongoose.connection.close(() => {
    console.log('🔌 Connexion MongoDB fermée');
    process.exit(0);
  });
});

// Start the server
if (require.main === module) {
  startServer();
}

// Export for Vercel
module.exports = app;

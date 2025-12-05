require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

// Import routes
const authRoutes = require("./routes/authRoutes-clean");
const cardRoutes = require("./routes/cardRoutes-clean");
const favoriteRoutes = require("./routes/favoriteRoutes-clean");

// Import middleware
const { errorHandler } = require("./middleware/errorHandler-clean");

const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration - Production Ready
const allowedOrigins = [
  'https://cardpro-frontend.vercel.app',
  'https://card-pro-wzcf-i5jo4z49s-projet-607a8e5b.vercel.app',
  'http://localhost:3000',
  'http://localhost:3010',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3010',
  'http://127.0.0.1:5173',
  // Universal Vercel patterns for any new deployments
  /^https:\/\/[a-z0-9-]+\.vercel\.app$/,
  /^https:\/\/[a-z0-9-]+-[a-z0-9]+-projet-607a8e5b\.vercel\.app$/,
  /^https:\/\/cardpro-frontend-[a-z0-9]+-projet-607a8e5b\.vercel\.app$/
];

// CORS configuration with security logging
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or matches regex patterns
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      console.log(`✅ CORS: Origin autorisée - ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ CORS: Tentative d'accès non autorisée depuis - ${origin}`);
      console.log(`📋 Origins autorisées:`, allowedOrigins);
      callback(new Error('Accès refusé par la politique CORS'), false);
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

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false
}));

app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    error: "Too many requests from this IP, please try again later."
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} ${req.method} ${req.path} - Origin: ${req.get('Origin') || 'N/A'}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  const mongoConnected = mongoose.connection.readyState === 1;
  res.json({ 
    success: true, 
    mongodb: mongoConnected ? "connected" : "disconnected"
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/favorites', favoriteRoutes);

// Error handling middleware
app.use(errorHandler);

async function startServer() {
  // Connect to MongoDB
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB connecté");
    } catch (err) {
      console.error("❌ Erreur MongoDB:", err.message);
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  } else {
    console.error("❌ MONGO_URI manquant");
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🔐 CORS Origins autorisées:`);
    allowedOrigins.forEach(origin => console.log(`   - ${origin}`));
  });
}

if (require.main === module) {
  startServer();
}

module.exports = app;

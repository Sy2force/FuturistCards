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
  // Production Vercel URLs
  'https://cardpro-frontend-31zfshlmq-projet-607a8e5b.vercel.app',
  'https://cardpro-frontend.vercel.app',
  'https://card-pro-wzcf-i5jo4z49s-projet-607a8e5b.vercel.app',
  // Vercel preview deployments pattern
  /^https:\/\/cardpro-frontend-[a-z0-9]+-projet-607a8e5b\.vercel\.app$/,
  /^https:\/\/card-pro-[a-z0-9]+-projet-607a8e5b\.vercel\.app$/,
  // Development origins
  'http://localhost:3000',
  'http://localhost:3010',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3010',
  'http://127.0.0.1:5173'
];

// Dynamic CORS configuration with logging
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed origin (string or regex)
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
      console.log(`❌ CORS: Origin refusée - ${origin}`);
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
    'Origin',
    'Cache-Control',
    'X-File-Name'
  ],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  maxAge: 86400 // 24 hours
};

app.use(cors(corsOptions));

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

app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT || 100,
  message: {
    error: "Too many requests from this IP, please try again later."
  }
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ 
  limit: '10mb',
  type: ['application/json', 'text/plain']
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb',
  parameterLimit: 50000
}));

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
    message: "Server is healthy",
    environment: process.env.NODE_ENV || 'development',
    mongodb: mongoConnected ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
    version: "1.0.0"
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
      console.log("✅ Base de données connectée");
    } catch (err) {
      console.error("❌ Erreur MongoDB:", err.message);
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      } else {
        console.log("⚠️  Mode développement: Serveur démarré sans MongoDB");
      }
    }
  } else {
    console.error("❌ MONGO_URI manquant");
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.log("⚠️  Mode développement: Serveur démarré sans MongoDB");
    }
  }

  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔐 CORS Origins configurées:`);
    allowedOrigins.forEach(origin => console.log(`   - ${origin}`));
    console.log(`📡 Backend URL: https://cardpro-21dj.onrender.com`);
  });
}

// Pour Vercel Functions, on exporte l'app
// Pour Render/local, on démarre le serveur
if (require.main === module) {
  // Mode Render ou local - démarre le serveur
  startServer();
}

module.exports = app;

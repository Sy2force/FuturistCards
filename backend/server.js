require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

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
const PORT = process.env.PORT || 5001;

// URLs autorisées pour CORS
const allowedOrigins = [
  // prod
  'https://cardpro-frontend.vercel.app',
  'https://card-pro-wzcf-i5jo4z49s-projet-607a8e5b.vercel.app',
  'https://card-pro-git-main-projet-607a8e5b.vercel.app',
  
  // local dev
  'http://localhost:3000',
  'http://localhost:3010',
  'http://localhost:3012',
  'http://localhost:3015',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3010',
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
    next();
  });
}

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
  if (process.env.NODE_ENV !== 'production') {
    console.log('🚀 Démarrage du serveur CardPro...');
    console.log('🔧 PORT:', PORT);
    console.log('🔧 NODE_ENV:', process.env.NODE_ENV);
    console.log('🔧 MONGO_URI:', process.env.MONGO_URI ? 'Configuré' : 'Non configuré');
  }

  // connexion MongoDB
  if (process.env.MONGO_URI) {
    try {
      if (process.env.NODE_ENV !== 'production') {
        console.log('📡 Connexion à MongoDB...');
      }
      await mongoose.connect(process.env.MONGO_URI);
      if (process.env.NODE_ENV !== 'production') {
        console.log('✅ MongoDB connecté avec succès');
      }
    } catch (err) {
      console.error('❌ Erreur MongoDB:', err.message);
      if (process.env.NODE_ENV === 'production') {
        process.exit(1);
      }
    }
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.log('⚠️  MONGO_URI non configuré - mode développement');
    }
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }

  app.listen(PORT, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`🎯 Serveur CardPro démarré sur http://localhost:${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
      console.log('✨ Serveur prêt à recevoir les requêtes');
    }
  });
}

if (require.main === module) {
  startServer();
}

module.exports = app;

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

// sécurité
app.use(helmet({
  crossOriginEmbedderPolicy: false
}));

app.use(compression());

// limite les requêtes (anti-spam)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: {
    error: "Trop de requêtes, ralentis un peu!"
  }
});
app.use('/api/', limiter);

// pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log des requêtes (dev seulement)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} ${req.method} ${req.path} - Origin: ${req.get('Origin') || 'N/A'}`);
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

// gestion des erreurs
app.use(errorHandler);

async function startServer() {
  // connexion MongoDB
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
    console.log(`🚀 Serveur sur le port ${PORT}`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = app;

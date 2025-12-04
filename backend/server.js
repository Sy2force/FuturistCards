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

// CORS Configuration
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['*'];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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
      process.exit(1);
    }
  } else {
    console.error("❌ MONGO_URI manquant");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔐 CORS Origins: ${process.env.CORS_ORIGIN || '*'}`);
  });
}

// Pour Vercel Functions, on exporte l'app
// Pour Render/local, on démarre le serveur
if (require.main === module) {
  // Mode Render ou local - démarre le serveur
  startServer();
}

module.exports = app;

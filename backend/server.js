import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import dotenv from 'dotenv';

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
import userRoutes from './routes/users.js';
import errorHandler from './middleware/errorHandler.js';

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
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Request logging
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

// Body parsing middleware with size limits
app.use(express.json({ 
  limit: NODE_ENV === 'production' ? '10mb' : '50mb' 
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: NODE_ENV === 'production' ? '10mb' : '50mb' 
}));

// Static files (removed uploads for HackerU compliance)

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/users', userRoutes);

// Health check endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
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

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'FuturistCards API',
    version: '1.0.0',
    endpoints: ['/api/auth', '/api/users', '/api/cards', '/api/dashboard', '/api/favorites', '/api/admin']
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
});

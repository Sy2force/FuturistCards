# FuturistCards Backend

Node.js/Express API server for the FuturistCards digital business card platform.

## Overview

The backend provides a RESTful API for user authentication, business card management, and favorites functionality. Built with Express.js and MongoDB, featuring JWT authentication and role-based access control.

## Technology Stack

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing and security
- **Helmet** - Security middleware for HTTP headers
- **CORS** - Cross-origin resource sharing
- **Joi** - Data validation library

## Project Structure

```
backend/
├── config/
│   └── db.js                   # MongoDB connection configuration
├── controllers/
│   ├── authController.js       # Authentication logic
│   ├── cardController.js       # Business card CRUD operations
│   ├── favoriteController.js   # Favorites management
│   └── userController.js       # User management
├── middleware/
│   ├── authMiddleware.js       # JWT token verification
│   ├── requireRole.js          # Role-based access control
│   ├── errorHandler.js         # Global error handling
│   └── validation.js           # Request validation
├── models/
│   ├── User.js                 # User schema and model
│   ├── Card.js                 # Business card schema
│   └── Favorite.js             # User favorites schema
├── routes/
│   ├── auth.js                 # Authentication endpoints
│   ├── cards.js                # Card management endpoints
│   ├── favorites.js            # Favorites endpoints
│   └── users.js                # User management endpoints
├── utils/
│   ├── generateToken.js        # JWT token generation
│   ├── validateInput.js        # Input validation helpers
│   └── constants.js            # Application constants
├── data/
│   └── seedUsers.js            # Database seeding script
├── tests/
│   ├── auth.test.js            # Authentication tests
│   ├── cards.test.js           # Card management tests
│   └── setup.js                # Test configuration
├── .env.example                # Environment variables template
├── package.json                # Dependencies and scripts
└── server.js                   # Main application entry point
```

## Installation

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env

# Start development server
npm run dev

# Start production server
npm start
```

## Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/futuristcards

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Security
BCRYPT_ROUNDS=12

# CORS
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET `/api/auth/profile`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  }
}
```

### Card Routes (`/api/cards`)

#### GET `/api/cards`
Get all public business cards with optional search and pagination.

**Query Parameters:**
- `search` - Search term for name, company, or title
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by business category

**Response:**
```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "card_id",
        "firstName": "John",
        "lastName": "Doe",
        "title": "Software Engineer",
        "company": "Tech Corp",
        "email": "john@techcorp.com",
        "phone": "+1234567890",
        "website": "https://johndoe.com",
        "address": "123 Main St, City, State",
        "image": "profile_image_url",
        "createdBy": "user_id",
        "createdAt": "2023-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalCards": 50,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### POST `/api/cards`
Create a new business card (requires business or admin role).

**Headers:**
```
Authorization: Bearer jwt_token_here
Content-Type: application/json
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "title": "Software Engineer",
  "company": "Tech Corp",
  "email": "john@techcorp.com",
  "phone": "+1234567890",
  "website": "https://johndoe.com",
  "address": "123 Main St, City, State",
  "description": "Experienced software engineer specializing in web development",
  "image": "base64_image_data_or_url"
}
```

#### GET `/api/cards/my-cards`
Get current user's business cards (requires authentication).

#### PUT `/api/cards/:id`
Update a business card (requires ownership or admin role).

#### DELETE `/api/cards/:id`
Delete a business card (requires ownership or admin role).

#### GET `/api/cards/:id`
Get specific business card details.

### Favorites Routes (`/api/favorites`)

#### GET `/api/favorites`
Get user's favorite cards (requires authentication).

#### POST `/api/favorites/:cardId`
Add card to favorites (requires authentication).

#### DELETE `/api/favorites/:cardId`
Remove card from favorites (requires authentication).

## Database Models

### User Model
```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { 
    type: String, 
    enum: ['user', 'business', 'admin'], 
    default: 'user' 
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Card Model
```javascript
{
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  title: { type: String, required: true },
  company: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String },
  address: { type: String },
  description: { type: String },
  image: { type: String },
  category: { type: String },
  isPublic: { type: Boolean, default: true },
  createdBy: { type: ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Favorite Model
```javascript
{
  user: { type: ObjectId, ref: 'User', required: true },
  card: { type: ObjectId, ref: 'Card', required: true },
  createdAt: { type: Date, default: Date.now }
}
```

## Authentication & Authorization

### JWT Token Structure
```javascript
{
  id: "user_id",
  email: "user@example.com",
  role: "user",
  iat: 1640995200,
  exp: 1643587200
}
```

### Role-based Access Control

**User Roles:**
- **user** - Can browse cards, add to favorites
- **business** - Can create, edit, delete own cards + user permissions
- **admin** - Full access to all resources

**Middleware Usage:**
```javascript
// Require authentication
router.get('/profile', authMiddleware, getProfile);

// Require specific role
router.post('/cards', authMiddleware, requireRole(['business', 'admin']), createCard);

// Require ownership or admin
router.put('/cards/:id', authMiddleware, requireOwnership(Card), updateCard);
```

## Validation

### Input Validation with Joi
```javascript
const cardValidation = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  title: Joi.string().min(2).max(100).required(),
  company: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^\+?[\d\s\-\(\)]+$/).required(),
  website: Joi.string().uri().optional(),
  address: Joi.string().max(200).optional(),
  description: Joi.string().max(500).optional()
});
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email must be a valid email address"
      }
    ]
  }
}
```

## Security Features

### Password Security
- **bcrypt** hashing with configurable rounds
- **Minimum password requirements** (8 characters, mixed case, numbers)
- **Password reset** functionality with secure tokens

### HTTP Security
- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Rate limiting** to prevent abuse
- **Input sanitization** to prevent injection attacks

### JWT Security
- **Secure secret key** generation and storage
- **Token expiration** with configurable duration
- **Token blacklisting** for logout functionality
- **Refresh token** support for extended sessions

## Error Handling

### Global Error Handler
```javascript
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};
```

## Testing

### Test Setup
```bash
# Install test dependencies
npm install --save-dev jest supertest mongodb-memory-server

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Structure
```javascript
describe('Auth Controller', () => {
  beforeEach(async () => {
    // Setup test database
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        password: 'password123'
      };

      const res = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe(userData.email);
    });
  });
});
```

## Development Scripts

```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate test coverage report
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run seed         # Seed database with sample data
```

## Database Seeding

### Seed Users
```bash
npm run seed
```

Creates test users:
- **user@test.com** (password: Test1234!) - Regular user
- **business@test.com** (password: Test1234!) - Business user
- **admin@test.com** (password: Test1234!) - Admin user

## Deployment

### Production Configuration
```javascript
// server.js
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/futuristcards';

if (process.env.NODE_ENV === 'production') {
  // Production-specific middleware
  app.use(helmet());
  app.use(compression());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  }));
}
```

### Environment Setup
```bash
# Production environment variables
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/futuristcards
JWT_SECRET=your-production-jwt-secret
FRONTEND_URL=https://sy2force.github.io
```

### Hosting Platforms
- **Heroku** - Easy deployment with MongoDB Atlas
- **Vercel** - Serverless functions with edge deployment
- **Railway** - Simple deployment with built-in database
- **DigitalOcean App Platform** - Managed container deployment

## Monitoring & Logging

### Request Logging
```javascript
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}
```

### Error Tracking
- **Sentry** integration for error monitoring
- **Winston** for structured logging
- **Health check** endpoints for uptime monitoring

## Performance Optimization

### Database Optimization
- **Indexes** on frequently queried fields
- **Aggregation pipelines** for complex queries
- **Connection pooling** for efficient database connections
- **Query optimization** with explain plans

### Caching
- **Redis** for session storage and caching
- **Memory caching** for frequently accessed data
- **CDN** for static asset delivery

## API Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);
```

## Contributing

1. Follow RESTful API conventions
2. Write comprehensive tests for new endpoints
3. Document API changes in this README
4. Use consistent error handling patterns
5. Validate all input data
6. Follow security best practices

## Troubleshooting

### Common Issues

**Database Connection Failed**
```bash
# Check MongoDB service
sudo systemctl status mongod

# Check connection string
echo $MONGO_URI
```

**JWT Token Issues**
```bash
# Verify JWT secret is set
echo $JWT_SECRET

# Check token expiration
node -e "console.log(require('jsonwebtoken').decode('your_token_here'))"
```

**Port Already in Use**
```bash
# Find process using port 5001
lsof -i :5001

# Kill process
kill -9 <PID>
```

---

**Backend Version**: 1.0.0  
**Node Version**: 16+  
**MongoDB Version**: 4.4+

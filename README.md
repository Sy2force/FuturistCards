# FuturistCards

A modern digital business card platform built with React 18 and Node.js for creating, managing, and sharing professional business cards with a stunning glassmorphism design.

## Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Setup & Installation](#-setup--installation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Additional Docs](#-additional-docs)
- [Author](#-author)
- [License](#-license)

## 📌 Project Overview

FuturistCards is a full-stack web application designed for the HackerU 2025 React final exam. It allows professionals to create beautiful digital business cards with advanced features like search, favorites, analytics, and admin management.

The platform features a modern glassmorphism UI design with smooth animations, responsive layout, and comprehensive security measures including JWT authentication and role-based access control.

## 🚀 Features

- **Modern Authentication**: Secure JWT-based login with refresh tokens
- **Business Card Management**: Full CRUD operations for digital business cards
- **Advanced Search**: Text search with category and location filtering
- **Social Features**: Favorites system, likes, and card sharing
- **Admin Dashboard**: Complete platform management tools
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Analytics**: View tracking and engagement metrics
- **Multi-language Support**: English, French, and Hebrew with RTL support
- **Image Upload**: Profile pictures and card images with validation
- **Role-based Access**: User, Business, and Admin permission levels

## 🔧 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and Context API
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-validator** - Input validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy (production)

## 🛠️ Folder Structure

```
FuturistCards/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── context/         # React contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── api/             # API service functions
│   │   └── tests/           # Test files
│   ├── .env.example         # Frontend environment variables
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   └── package.json         # Frontend dependencies
│
├── backend/                  # Node.js API server
│   ├── controllers/         # Route handlers
│   ├── routes/              # API endpoints
│   ├── models/              # MongoDB schemas
│   ├── middleware/          # Authentication & security
│   ├── utils/               # Helper functions
│   ├── .env.example         # Backend environment variables
│   ├── server.js            # Main server file
│   └── package.json         # Backend dependencies
│
├── database/                 # Database configuration
│   ├── connections/         # Database connection setup
│   ├── mongo-init.js        # MongoDB initialization
│   └── seed-database.js     # Sample data seeding
│
├── config/                   # Configuration files
│   ├── docker-compose.yml   # Docker orchestration
│   ├── Dockerfile           # Container build instructions
│   └── nginx.conf           # Nginx configuration
│
├── scripts/                  # Automation scripts
│   ├── start-dev.sh         # Start development servers
│   ├── deploy.sh            # Production deployment
│   └── free-port.sh         # Free up development ports
│
├── documentation/            # Project documentation
│   ├── PROJECT_SUMMARY.md   # Technical project summary
│   ├── DEPLOYMENT_GUIDE.md  # Production deployment guide
│   ├── MONGODB_SETUP.md     # Database setup instructions
│   ├── QUICK_START_GUIDE.md # Fast setup guide
│   ├── DEMO_ACCOUNTS.md     # Test account credentials
│   ├── FINAL_CHECKLIST.md   # Project completion checklist
│   └── FINAL_SUMMARY.md     # Final project summary
│
└── README.md                 # This file
```

## 📦 Setup & Installation

### Prerequisites
- Node.js 16+ and npm
- MongoDB (local installation or Atlas account)
- Git

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd FuturistCards
```

2. **Install dependencies**
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

3. **Environment setup**
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit the .env files with your configuration
```

4. **Start development servers**
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Start both frontend and backend
./scripts/start-dev.sh
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- Health Check: http://localhost:5001/api/health

### Manual Setup

**Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secrets
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

### Environment Variables

**Backend (.env):**
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/futuristcards
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret-key
CORS_ORIGIN=http://localhost:3000
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5001/api
VITE_APP_NAME=FuturistCards
VITE_APP_VERSION=1.0.0
```

### Demo Accounts

```
Administrator:
Email: admin@futuristcards.com
Password: AdminPass123!

Business User:
Email: john.doe@example.com
Password: Password123!

Regular User:
Email: test@example.com
Password: TestPass123!
```

## 🧪 Testing

### Unit Tests
```bash
cd frontend
npm run test
```

### End-to-End Tests
```bash
cd frontend
npm run test:e2e
```

### API Testing
All endpoints have been manually tested including:
- User registration and authentication
- CRUD operations for business cards
- Favorites system functionality
- Search and filtering features
- Image upload capabilities
- Error handling scenarios

## 🖥️ Deployment

### Docker Deployment (Recommended)

1. **Copy configuration files**
```bash
cp config/docker-compose.yml .
cp backend/.env.example .env.production
```

2. **Configure production environment**
```bash
# Edit .env.production with production values
nano .env.production
```

3. **Deploy with Docker**
```bash
docker-compose up --build -d
```

### Manual Deployment

**Frontend (Vercel/Netlify):**
```bash
cd frontend
npm run build
# Deploy the dist/ folder to your hosting provider
```

**Backend (Render/Railway/Heroku):**
```bash
cd backend
# Set environment variables in your hosting platform
# Deploy the backend folder
```

### Production Environment Setup

- Set up MongoDB Atlas for production database
- Configure environment variables for production
- Set up SSL certificates for HTTPS
- Configure reverse proxy with Nginx (if using VPS)

## 🧠 Additional Docs

For detailed information about specific aspects of the project, check out these additional documentation files:

- **[PROJECT_SUMMARY.md](documentation/PROJECT_SUMMARY.md)** - Complete technical overview and architecture details
- **[DEPLOYMENT_GUIDE.md](documentation/DEPLOYMENT_GUIDE.md)** - Comprehensive production deployment instructions
- **[MONGODB_SETUP.md](documentation/MONGODB_SETUP.md)** - Database configuration and setup guide
- **[QUICK_START_GUIDE.md](documentation/QUICK_START_GUIDE.md)** - Fast setup instructions for development
- **[DEMO_ACCOUNTS.md](documentation/DEMO_ACCOUNTS.md)** - Test account credentials and usage
- **[FINAL_CHECKLIST.md](documentation/FINAL_CHECKLIST.md)** - Project completion verification checklist
- **[FINAL_SUMMARY.md](documentation/FINAL_SUMMARY.md)** - Final project delivery summary

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/verify` - Verify token validity
- `POST /api/auth/logout` - User logout

### Business Cards
- `GET /api/cards` - Get all cards (with pagination and filters)
- `POST /api/cards` - Create new card (Business users only)
- `GET /api/cards/:id` - Get specific card details
- `PUT /api/cards/:id` - Update card (owner only)
- `DELETE /api/cards/:id` - Delete card (owner/admin only)
- `POST /api/cards/:id/like` - Toggle card like

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/avatar` - Upload user avatar
- `PUT /api/users/password` - Change password
- `DELETE /api/users/profile` - Delete user account

### Favorites
- `GET /api/favorites` - Get user favorites
- `POST /api/favorites/:cardId` - Add card to favorites
- `DELETE /api/favorites/:cardId` - Remove from favorites
- `GET /api/favorites/stats` - Get favorites statistics

### Admin (Admin users only)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/cards` - Get all cards
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/analytics/*` - Platform analytics

## Performance

- **Frontend Bundle**: 330KB → 112KB gzipped
- **Build Time**: ~2 seconds
- **Lighthouse Score**: 95+ (Performance, SEO, Accessibility)
- **API Response Time**: <100ms average
- **Database Query Time**: <50ms with proper indexing

## Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt (12 rounds)
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Role-based access control
- XSS and injection protection

## 👤 Author

**HackerU Student**  
Final React Exam Project 2025

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for HackerU 2025 React Final Exam**

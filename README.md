# 🚀 FuturistCards - Digital Business Card Platform

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Sy2force/FuturistCards)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)
[![Production Ready](https://img.shields.io/badge/status-production%20ready-brightgreen.svg)]()

> Modern full-stack platform for creating and managing digital business cards with glassmorphism design and complete multilingual support (FR/EN/HE).

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Technologies](#️-technologies)
- [🚀 Installation](#-installation)
- [📁 Structure](#-project-structure)
- [🔧 Scripts](#-scripts)
- [🧪 Testing](#-testing)
- [🌐 Deployment](#-deployment)
- [👥 Test Accounts](#-test-accounts)
- [📚 API](#-api-endpoints)
- [📄 License](#-license)

## 🎯 Overview

Modern full-stack application for creating, managing and sharing digital business cards featuring:
- Glassmorphism design inspired by modern UI trends
- Multilingual support (FR/EN/HE) with RTL
- Secure JWT authentication
- Responsive and accessible interface

## ✨ Features

### 🔐 Authentication
- Secure JWT registration and login
- User roles (User, Business, Admin)
- Profile and password management

### 💼 Business Cards
- Create and edit cards (Business users only)
- Favorites system
- Search and filtering
- Real-time preview

### 👨‍💼 Administration
- User management
- Content moderation
- System statistics

### 🌍 Multilingual
- French, English, Hebrew
- RTL interface for Hebrew
- Automatic language detection

## 🛠️ Technologies

### Frontend
- **React 18** + **Vite** - Modern interface
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Router v6** - SPA navigation
- **Axios** - HTTP client
- **React i18next** - Internationalization

### Backend
- **Node.js** + **Express** - REST API
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password security
- **Helmet** + **CORS** - HTTP security

### DevOps
- **Playwright** - E2E testing
- **ESLint** - Code quality
- **Render** - Backend hosting
- **Vercel** - Frontend hosting

## 🚀 Installation

### Prerequisites
- Node.js >= 16.0.0
- MongoDB (local or Atlas)

### Quick Setup

```bash
# Clone the project
git clone https://github.com/Sy2force/FuturistCards.git
cd FuturistCards

# Backend
cd backend
npm install
cp .env.example .env  # Configure variables
npm run dev

# Frontend (new terminal)
cd ../frontend
npm install
cp .env.example .env  # Configure variables
npm run dev
```

### Environment Variables

**Backend (.env)**
```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/futuristcards
JWT_SECRET=your-jwt-secret-key
CLIENT_URL=http://localhost:3010
```

**Frontend (.env)**
```env
VITE_API_BASE_URL=http://localhost:5001/api
VITE_APP_NAME=FuturistCards
```

## 📁 Project Structure

```
FuturistCards/
├── backend/                 # Node.js/Express API
│   ├── controllers/        # Business logic
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Middlewares
│   └── server.js          # Entry point
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Application pages
│   │   ├── context/       # React contexts
│   │   ├── hooks/         # Custom hooks
│   │   └── services/      # API services
│   └── tests/             # Playwright tests
├── render.yaml           # Render config
├── vercel.json           # Vercel config
└── README.md
```

## 🔧 Scripts

### Backend
```bash
npm start          # Production
npm run dev        # Development
npm test           # Tests
```

### Frontend
```bash
npm run dev        # Development
npm run build      # Production build
npm test           # Playwright tests
npm run test:headed # Tests with UI
npm run lint       # Linting
```

## 🧪 Testing

E2E tests with Playwright covering:
- Complete authentication
- Navigation and routing
- Card CRUD operations
- Favorites system
- Responsive interface

```bash
cd frontend
npm test                    # Headless tests
npm run test:headed        # Tests with browser
npm run test:ui            # Graphical interface
```

## 🌐 Deployment

### Production
- **Backend**: Render (render.yaml)
- **Frontend**: Vercel (vercel.json)
- Automatic deployment on GitHub push

### Production URLs
- Frontend: https://futuristcards.vercel.app
- Backend: https://futuristcards-backend.onrender.com

## 👥 Test Accounts

```
User     : user@test.com / Test123!
Business : business@test.com / Test123!
Admin    : admin@test.com / Test123!
```

## 📚 API Endpoints

### Auth
```
POST /api/auth/register     # Registration
POST /api/auth/login        # Login
GET  /api/auth/profile      # Profile
```

### Cards
```
GET    /api/cards           # List cards
POST   /api/cards           # Create (Business)
PUT    /api/cards/:id       # Update
DELETE /api/cards/:id       # Delete
```

### Favorites
```
GET    /api/favorites       # My favorites
POST   /api/favorites/:id   # Add
DELETE /api/favorites/:id   # Remove
```

### Admin
```
GET /api/admin/users        # User management
GET /api/admin/stats        # Statistics
```

## 📄 License

MIT License - see [LICENSE](LICENSE)

---

**Author**: Professional Developer  
**GitHub**: [@Sy2force](https://github.com/Sy2force)

<div align="center">
  <p>Made with ❤️ - © 2024 FuturistCards</p>
</div>

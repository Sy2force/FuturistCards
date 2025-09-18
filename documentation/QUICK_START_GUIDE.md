# Quick Start Guide - FuturistCards

## Prerequisites
- Node.js 18+ and npm 8+
- MongoDB Atlas account (or local MongoDB)
- Git

## Fast Setup (5 minutes)

### 1. Clone and Install
```bash
git clone <repository-url>
cd FuturistCards
npm run install:all
```

### 2. Environment Setup
```bash
# Backend
cp backend/.env.example backend/.env
# Frontend  
cp frontend/.env.example frontend/.env
```

### 3. Configure Database
Edit `backend/.env` and set your MongoDB URI:
```
MONGODB_URI=mongodb+srv://your-user:your-password@cluster.mongodb.net/futuristcards
```

### 4. Start Development
```bash
npm run dev
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## Test Accounts
- **Admin**: admin@futuristcards.com / AdminPass123!
- **Business**: john.doe@example.com / Password123!
- **User**: test@example.com / TestPass123!

## Troubleshooting
- Port conflicts: Run `./free-port.sh` if available
- Database issues: Check MongoDB Atlas connection string
- Build errors: Clear node_modules and reinstall

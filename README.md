# FuturistCards

A modern digital business card platform built with React and Node.js.

## About

FuturistCards lets you create, share, and manage digital business cards. Features include user authentication, card customization, favorites, and an admin dashboard.

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB
- **Auth**: JWT with role-based access (User, Business, Admin)
- **Hosting**: Vercel (frontend), Render (backend)

## Getting Started

### Requirements

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repo
git clone https://github.com/Sy2force/FuturistCards.git
cd FuturistCards

# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install
```

### Environment Variables

Create `.env` files based on the examples:

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:5001/api
```

**Backend** (`backend/.env`):
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5001
```

### Run Development

```bash
# Start backend (terminal 1)
cd backend
npm run dev

# Start frontend (terminal 2)
cd frontend
npm run dev
```

Open http://localhost:3000 in your browser.

## Features

- **Authentication**: Register, login, JWT tokens
- **Cards**: Create, edit, delete, share business cards
- **Favorites**: Save cards you like
- **Search**: Filter cards by category or keyword
- **Admin Panel**: Manage users and cards
- **Multi-language**: English, French, Hebrew (RTL support)
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Auto-refresh data every 15-30 seconds

## Project Structure

```
FuturistCards/
├── frontend/          # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── hooks/
│   └── public/
├── backend/           # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
└── README.md
```

## API Endpoints

### Auth
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Cards
```
GET    /api/cards
POST   /api/cards
PUT    /api/cards/:id
DELETE /api/cards/:id
```

### Favorites
```
GET    /api/favorites
POST   /api/favorites/:id
DELETE /api/favorites/:id
```

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repo
2. Set root directory to `frontend`
3. Add environment variables
4. Deploy

### Backend (Render)
1. Create a new Web Service
2. Connect your repo
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

## Live Demo

- **App**: https://frontend-olive-omega-14.vercel.app
- **API**: https://futuristcards.onrender.com

## License

MIT

## Author

Shaï Acoca - [@Sy2force](https://github.com/Sy2force)

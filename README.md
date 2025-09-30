# FuturistCards

A comprehensive digital business card platform that allows users to create, manage, and share professional business cards online. Built with modern web technologies and featuring a glassmorphism design with multilingual support.

**Live Demo:** https://sy2force.github.io/Project-react/

## Project Overview

FuturistCards is a full-stack web application that digitizes the traditional business card experience. Users can create beautiful, interactive business cards, browse cards from other professionals, and manage their networking contacts all in one place.

### Key Features

**Card Management:**
- Create professional business cards with custom information
- Upload profile images and company logos
- Edit and update card details in real-time
- Delete cards with confirmation prompts
- View card statistics and engagement metrics

**User Experience:**
- Responsive design optimized for all devices
- Dark and light theme toggle with smooth transitions
- Multilingual support (English, French, Hebrew) with RTL support
- Advanced search and filtering capabilities
- Favorites system for saving important contacts
- Glassmorphism UI design with modern animations

**Authentication & Security:**
- JWT-based authentication system
- Role-based access control (User, Business, Admin)
- Protected routes and API endpoints
- Mock authentication for development and demo purposes
- Secure password handling with bcrypt

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animation library for smooth transitions
- **React Router v6** - Client-side routing with protected routes
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Toast notifications for user feedback

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing library
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and quality assurance
- **Prettier** - Code formatting
- **Playwright** - End-to-end testing framework
- **Jest** - Unit testing framework

## Project Structure

```
FuturistCards/
├── frontend/                    # React application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Card.jsx       # Business card component
│   │   │   ├── Footer.jsx     # Application footer
│   │   │   ├── Header.jsx     # Navigation header
│   │   │   └── ...
│   │   ├── pages/             # Main application pages
│   │   │   ├── HomePage.jsx   # Landing page
│   │   │   ├── CardsPage.jsx  # Card gallery
│   │   │   ├── CreateCardPage.jsx
│   │   │   ├── MyCardsPage.jsx
│   │   │   └── ...
│   │   ├── context/           # React Context providers
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── LanguageContext.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service functions
│   │   │   └── api.js         # Axios configuration
│   │   └── utils/             # Utility functions
│   ├── package.json
│   └── vite.config.js
├── backend/                     # Node.js API server
│   ├── config/                 # Configuration files
│   │   └── db.js              # Database connection
│   ├── controllers/            # Business logic
│   │   ├── authController.js   # Authentication logic
│   │   ├── cardController.js   # Card CRUD operations
│   │   └── favoriteController.js
│   ├── middleware/             # Express middleware
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── requireRole.js      # Role-based access
│   │   └── errorHandler.js     # Error handling
│   ├── models/                 # MongoDB schemas
│   │   ├── User.js            # User model
│   │   ├── Card.js            # Business card model
│   │   └── Favorite.js        # Favorites model
│   ├── routes/                 # API endpoints
│   │   ├── auth.js            # Authentication routes
│   │   ├── cards.js           # Card management routes
│   │   └── favorites.js       # Favorites routes
│   ├── utils/                  # Utility functions
│   ├── package.json
│   └── server.js              # Main server file
├── scripts/                     # Utility scripts
│   ├── reset-clean.sh         # Environment cleanup
│   └── free-port.sh           # Port management
└── README.md                   # This file
```

## Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- MongoDB (for production use)
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sy2force/Project-react.git
   cd Project-react
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration
   
   # Start development server
   npm run dev
   # Server runs on http://localhost:5001
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start development server
   npm run dev
   # Application runs on http://localhost:3000
   ```

### Environment Variables

**Backend (.env)**
```env
PORT=5001
MONGO_URI=mongodb://localhost:27017/futuristcards
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5001/api
```

## Usage Guide

### Authentication System

The application uses a mock authentication system for development and demonstration:

- **Login**: Use any valid email address
- **Password**: Minimum 6 characters required
- **Role Assignment**:
  - Emails containing "admin" → Admin privileges
  - Emails containing "business" or "company" → Business user (can create cards)
  - All other emails → Regular user (browse and favorite only)

### Creating Business Cards

1. Log in with a business or admin account
2. Navigate to "Create Card" in the navigation menu
3. Fill in the required information:
   - Full name and title
   - Company name and description
   - Contact information (phone, email, website)
   - Business address
   - Upload profile image (optional)
4. Save the card to make it publicly available

### Managing Cards

- **View Cards**: Browse all public cards on the main gallery page
- **Search**: Use the search bar to find specific people or companies
- **Favorites**: Click the heart icon to save cards to your favorites
- **My Cards**: View and manage all your created cards
- **Edit**: Update card information at any time
- **Delete**: Remove cards with confirmation prompt

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

### Card Management Endpoints
- `GET /api/cards` - Get all public cards
- `GET /api/cards/my-cards` - Get current user's cards
- `POST /api/cards` - Create new business card
- `PUT /api/cards/:id` - Update existing card
- `DELETE /api/cards/:id` - Delete card
- `GET /api/cards/:id` - Get specific card details

### Favorites Endpoints
- `GET /api/favorites` - Get user's favorite cards
- `POST /api/favorites/:cardId` - Add card to favorites
- `DELETE /api/favorites/:cardId` - Remove card from favorites

## Testing

### Frontend Testing
```bash
cd frontend
npm run test        # Run unit tests
npm run test:e2e    # Run end-to-end tests with Playwright
```

### Backend Testing
```bash
cd backend
npm test           # Run API tests
npm run test:watch # Run tests in watch mode
```

## Deployment

### Production Build
```bash
# Build frontend for production
cd frontend
npm run build

# The built files will be in the dist/ directory
```

### GitHub Pages Deployment
The frontend is automatically deployed to GitHub Pages:
- **Live URL**: https://sy2force.github.io/Project-react/
- **Branch**: gh-pages (auto-deployed)

### Backend Deployment
The backend can be deployed to any Node.js hosting service:
- Heroku
- Vercel
- Railway
- DigitalOcean App Platform

## Development Workflow

1. **Feature Development**
   - Create feature branch from main
   - Implement changes in both frontend and backend
   - Test locally with both servers running
   - Commit changes with descriptive messages

2. **Code Quality**
   - Run ESLint for code linting
   - Use Prettier for consistent formatting
   - Write unit tests for new features
   - Run E2E tests before deployment

3. **Deployment Process**
   - Build frontend for production
   - Test production build locally
   - Deploy backend to hosting service
   - Deploy frontend to GitHub Pages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Code splitting with React.lazy()
- Image optimization and lazy loading
- Bundle size optimization with Vite
- Efficient state management with React Context
- Memoization of expensive computations
- Responsive images with multiple sizes

## Security Features

- JWT token authentication with expiration
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection for API endpoints
- Rate limiting to prevent abuse
- Secure HTTP headers with Helmet.js
- Protected routes on both frontend and backend

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add new feature'`)
7. Push to the branch (`git push origin feature/new-feature`)
8. Open a Pull Request

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill processes on ports 3000 and 5001
./scripts/free-port.sh
```

**Database Connection Issues**
- Ensure MongoDB is running locally
- Check MONGO_URI in backend .env file
- Verify network connectivity

**Build Errors**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

**Authentication Issues**
- Clear browser localStorage
- Check JWT_SECRET in backend .env
- Verify API_URL in frontend .env

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React team for the excellent framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations
- MongoDB team for the flexible database
- All open-source contributors

---

**Project Status**: Production Ready  
**Last Updated**: September 2025  
**Version**: 1.0.0

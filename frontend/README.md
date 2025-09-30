# FuturistCards Frontend

React-based frontend application for the FuturistCards digital business card platform.

## Overview

The frontend is built with React 18 and Vite, featuring a modern glassmorphism design with multilingual support and responsive layout. It provides a complete user interface for creating, managing, and browsing digital business cards.

## Technology Stack

- **React 18** - Component-based UI framework with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation and transition library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API requests
- **React Hot Toast** - Toast notification system

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Card.jsx            # Business card display component
│   ├── Footer.jsx          # Application footer
│   ├── Header.jsx          # Navigation header
│   ├── LanguageSelector.jsx # Language switching dropdown
│   ├── LanguageToggle.jsx  # Compact language switcher
│   └── ...
├── pages/                  # Main application pages
│   ├── HomePage.jsx        # Landing page with hero section
│   ├── CardsPage.jsx       # Card gallery and browsing
│   ├── CreateCardPage.jsx  # Card creation form
│   ├── MyCardsPage.jsx     # User's card management
│   ├── FavoritesPage.jsx   # Saved favorite cards
│   ├── AboutPage.jsx       # About the platform
│   └── LoginPage.jsx       # Authentication page
├── context/                # React Context providers
│   ├── AuthContext.jsx     # User authentication state
│   ├── ThemeContext.jsx    # Dark/light theme management
│   └── LanguageContext.jsx # Internationalization
├── hooks/                  # Custom React hooks
│   ├── useAuth.js          # Authentication utilities
│   ├── useTheme.js         # Theme management
│   └── useLanguage.js      # Language switching
├── services/               # API communication
│   └── api.js              # Axios configuration and interceptors
├── utils/                  # Utility functions
│   ├── constants.js        # Application constants
│   └── helpers.js          # Helper functions
└── styles/                 # CSS and styling
    ├── globals.css         # Global styles and Tailwind imports
    └── themes.css          # Theme-specific variables
```

## Key Features

### User Interface
- **Responsive Design** - Mobile-first approach with breakpoints for tablet and desktop
- **Glassmorphism UI** - Modern glass-effect design with backdrop blur
- **Dark/Light Themes** - Toggle between themes with smooth transitions
- **Smooth Animations** - Framer Motion animations for page transitions and interactions

### Internationalization
- **Multi-language Support** - English, French, and Hebrew
- **RTL Support** - Right-to-left text direction for Hebrew
- **Dynamic Language Switching** - Change language without page reload
- **Browser Language Detection** - Automatic language selection based on browser settings

### Authentication
- **Mock Authentication** - Simplified login system for development
- **Role-based Access** - Different permissions for User, Business, and Admin roles
- **Protected Routes** - Automatic redirection for unauthorized access
- **Persistent Sessions** - JWT tokens stored in localStorage

### Card Management
- **Card Creation** - Form-based card creation with image upload
- **Card Gallery** - Grid layout with search and filter capabilities
- **Favorites System** - Save and organize favorite cards
- **Real-time Updates** - Instant UI updates for CRUD operations

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5001/api
```

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm test             # Run unit tests
npm run test:e2e     # Run Playwright E2E tests
```

## Component Architecture

### Context Providers
The application uses React Context for global state management:

- **AuthContext** - Manages user authentication, login/logout, and user data
- **ThemeContext** - Handles dark/light theme switching and persistence
- **LanguageContext** - Manages language selection and translations

### Custom Hooks
Reusable hooks for common functionality:

- **useAuth** - Authentication utilities and user state
- **useTheme** - Theme management and CSS variable updates
- **useLanguage** - Language switching and translation helpers

### Page Components
Main application pages with routing:

- **HomePage** - Landing page with hero section and feature highlights
- **CardsPage** - Card gallery with search, filter, and pagination
- **CreateCardPage** - Form for creating new business cards
- **MyCardsPage** - User's card management dashboard
- **FavoritesPage** - Saved favorite cards collection

## Styling System

### Tailwind CSS Configuration
- **Custom Theme** - Extended color palette and spacing
- **Dark Mode** - Class-based dark mode implementation
- **Responsive Breakpoints** - Mobile-first responsive design
- **Custom Components** - Reusable component classes

### CSS Variables
Dynamic theme variables for consistent styling:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --accent-primary: #3b82f6;
  --accent-secondary: #8b5cf6;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
}
```

## API Integration

### Axios Configuration
Centralized API configuration with interceptors:

```javascript
// Request interceptor for authentication
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    return Promise.reject(error);
  }
);
```

### Service Functions
Organized API calls by feature:

```javascript
// Authentication services
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile')
};

// Card services
export const cardService = {
  getCards: () => api.get('/cards'),
  createCard: (cardData) => api.post('/cards', cardData),
  updateCard: (id, cardData) => api.put(`/cards/${id}`, cardData),
  deleteCard: (id) => api.delete(`/cards/${id}`)
};
```

## Testing

### Unit Testing
- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing utilities
- **Test Coverage** - Comprehensive test coverage for components and utilities

### End-to-End Testing
- **Playwright** - Browser automation for E2E tests
- **Test Scenarios** - User workflows and critical paths
- **Cross-browser Testing** - Chrome, Firefox, Safari, and Edge

### Testing Commands
```bash
npm test                    # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Generate coverage report
npm run test:e2e           # Run E2E tests
npm run test:e2e:headed    # Run E2E tests with browser UI
```

## Performance Optimizations

### Code Splitting
- **React.lazy()** - Dynamic imports for route-based code splitting
- **Suspense** - Loading states for lazy-loaded components
- **Bundle Analysis** - Webpack bundle analyzer for optimization

### Image Optimization
- **Lazy Loading** - Images loaded on scroll
- **WebP Support** - Modern image format with fallbacks
- **Responsive Images** - Multiple sizes for different screen densities

### Caching Strategies
- **Service Worker** - Cache static assets and API responses
- **localStorage** - Persist user preferences and data
- **Memory Optimization** - Efficient component re-rendering

## Deployment

### Build Process
```bash
npm run build
```

The build process:
1. Compiles TypeScript/JavaScript
2. Processes CSS with PostCSS and Tailwind
3. Optimizes images and assets
4. Generates service worker
5. Creates production-ready bundle

### GitHub Pages Deployment
Automatic deployment to GitHub Pages:
- **Build Trigger** - Push to main branch
- **Base Path** - Configured for `/Project-react/` subdirectory
- **Asset Optimization** - Minified CSS and JavaScript
- **Cache Headers** - Optimized caching for static assets

### Environment-specific Builds
- **Development** - Source maps, hot reload, debug tools
- **Production** - Minified, optimized, no debug tools
- **Staging** - Production build with additional logging

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** iOS 14+
- **Chrome Mobile** Android 90+

## Accessibility

- **WCAG 2.1 AA** - Compliance with accessibility standards
- **Keyboard Navigation** - Full keyboard accessibility
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Color Contrast** - High contrast ratios for text and backgrounds
- **Focus Management** - Visible focus indicators and logical tab order

## Contributing

1. Follow the existing code style and conventions
2. Write unit tests for new components
3. Update documentation for new features
4. Test across different browsers and devices
5. Ensure accessibility compliance

## Troubleshooting

### Common Issues

**Development Server Won't Start**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Check for TypeScript errors
npm run type-check

# Clear Vite cache
rm -rf node_modules/.vite
```

**Styling Issues**
```bash
# Rebuild Tailwind CSS
npm run build:css
```

**API Connection Issues**
- Check VITE_API_URL in .env file
- Verify backend server is running
- Check browser network tab for CORS errors

---

**Frontend Version**: 1.0.0  
**React Version**: 18.2.0  
**Node Version**: 16+

import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import axios from 'axios';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
// import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import OfflineBanner from './components/common/OfflineBanner';

// Page components
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';
import AdminPage from './pages/AdminPage';
import CardDetailsPage from './pages/CardDetailsPage';
import CardCreatePage from './pages/CardCreatePage';
import CardEditPage from './pages/CardEditPage';
import MyCardsPage from './pages/MyCardsPage';
import ServicesPage from './pages/ServicesPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFound from './pages/NotFound';
// Offline demo page removed - functionality integrated into main app

import './styles/design-system.css';

// Context providers
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider } from './contexts/I18nContext';
import { CardsStatsProvider } from './contexts/CardsStatsContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { OfflineModeProvider } from './hooks/useOfflineMode';
import { setupNavigationProtection } from './utils/userStorage';

/**
 * Initialize theme settings on app startup
 * Supports both dark/light mode with localStorage persistence
 */
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('darkMode');
  const savedCustomTheme = localStorage.getItem('futuristcards_theme');
  
  let isDark = true; // Par défaut mode sombre
  
  if (savedTheme !== null) {
    isDark = JSON.parse(savedTheme);
  } else if (savedCustomTheme !== null) {
    isDark = savedCustomTheme === 'dark';
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  // Appliquer les deux systèmes de thème
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  
  // Synchroniser les deux localStorage
  localStorage.setItem('darkMode', JSON.stringify(isDark));
  localStorage.setItem('futuristcards_theme', isDark ? 'dark' : 'light');
};

/**
 * Main layout wrapper component
 * Provides consistent structure with Navbar, main content, and Footer
 */
function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <OfflineBanner />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

/**
 * Router configuration with protected routes
 * Uses React Router v7 future flags for compatibility
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'demo', element: <HomePage /> },
      { path: 'cards', element: <CardsPage /> },
      { path: 'cards/create', element: <ProtectedRoute requireBusiness={true}><CardCreatePage /></ProtectedRoute> },
      { path: 'create-card', element: <ProtectedRoute requireBusiness={true}><CardCreatePage /></ProtectedRoute> },
      { path: 'my-cards', element: <ProtectedRoute requireBusiness={true}><MyCardsPage /></ProtectedRoute> },
      { path: 'card/:id', element: <CardDetailsPage /> },
      { path: 'cards/:id/edit', element: <ProtectedRoute><CardEditPage /></ProtectedRoute> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'login', element: <ProtectedRoute requireAuth={false}><LoginPage /></ProtectedRoute> },
      { path: 'register', element: <ProtectedRoute requireAuth={false}><RegisterPage /></ProtectedRoute> },
      { path: 'profile', element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: 'favorites', element: <ProtectedRoute><FavoritesPage /></ProtectedRoute> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'admin', element: <ProtectedRoute requireAdmin={true}><AdminPage /></ProtectedRoute> },
      { path: 'unauthorized', element: <UnauthorizedPage /> },
      { path: '*', element: <NotFound /> }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }
});

function App() {
  useEffect(() => {
    initializeTheme();
    setupNavigationProtection();
    
    // Health check backend
    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';
    axios.get(`${API_URL.replace('/api', '')}/api/health`)
      .catch(() => {
        // Backend non disponible - mode dégradé
      });
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <I18nProvider>
          <CardsStatsProvider>
            <FavoritesProvider>
              <OfflineModeProvider>
                <RouterProvider router={router} />
              </OfflineModeProvider>
            </FavoritesProvider>
          </CardsStatsProvider>
        </I18nProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

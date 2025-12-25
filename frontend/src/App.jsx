<<<<<<< HEAD
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import SkipLink from './components/common/SkipLink';

// Public Pages
import LazyRoute from './components/LazyRoute'

// Lazy loaded pages for better performance
const Landing = () => LazyRoute({ importFunc: () => import('./pages/public/Landing') })
const About = () => LazyRoute({ importFunc: () => import('./pages/public/About') })
const Login = () => LazyRoute({ importFunc: () => import('./pages/public/Login') })
const Register = () => LazyRoute({ importFunc: () => import('./pages/public/Register') })
const Cards = () => LazyRoute({ importFunc: () => import('./pages/public/Cards') })
const CardDetailsPage = () => LazyRoute({ importFunc: () => import('./pages/CardDetailsPage') })

// Dashboard Pages
const Dashboard = () => LazyRoute({ importFunc: () => import('./pages/dashboard/Dashboard') })
const CreateCard = () => LazyRoute({ importFunc: () => import('./pages/dashboard/CreateCard') })
const MyCards = () => LazyRoute({ importFunc: () => import('./pages/dashboard/MyCards') })
const Profile = () => LazyRoute({ importFunc: () => import('./pages/dashboard/Profile') })

// Admin Pages
const AdminPanel = () => LazyRoute({ importFunc: () => import('./pages/admin/AdminPanel') })

// Other Pages
const EditCardPage = () => LazyRoute({ importFunc: () => import('./pages/EditCardPage') })
const FavoritesPage = () => LazyRoute({ importFunc: () => import('./pages/FavoritesPage') })
const ErrorPage = () => LazyRoute({ importFunc: () => import('./pages/ErrorPage') });

// Components
import ProtectedRoute from './components/ProtectedRoute';

function AppRoutes() {
  const location = useLocation();

  useEffect(() => {
    // Analytics tracking would go here in production
    // Track page navigation for metrics
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SkipLink />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Routes>
          {/* PUBLIC MINI-SITE ROUTES */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/cards/:id" element={<CardDetailsPage />} />
          
          {/* DASHBOARD PRO ROUTES */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-card" 
            element={
              <ProtectedRoute requiredRole="business">
                <CreateCard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-cards" 
            element={
              <ProtectedRoute requiredRole="business">
                <MyCards />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* ADMIN ROUTES */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          
          {/* OTHER ROUTES */}
          <Route 
            path="/edit-card/:id" 
            element={
              <ProtectedRoute requiredRole="business">
                <EditCardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
=======
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
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
      </main>
      <Footer />
    </div>
  );
}
<<<<<<< HEAD
=======

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
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd

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
<<<<<<< HEAD
    <>
      <Helmet>
        <title>FuturistCards - Cartes de visite digitales</title>
        <meta name="description" content="Créez et partagez vos cartes de visite digitales professionnelles" />
      </Helmet>
      <AppRoutes />
    </>
=======
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
>>>>>>> 1ca665d3f5f764417ada1cdd89a898f39ac3dccd
  );
}

export default App;

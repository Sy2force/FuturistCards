import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useRoleTheme } from './context/ThemeProvider';
import { motion } from 'framer-motion';
import DebugInfo from './components/debug/DebugInfo';

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy loading pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CardsPage = lazy(() => import('./pages/CardsPage'));
const CardDetailsPage = lazy(() => import('./pages/CardDetailsPage'));
const EditCardPage = lazy(() => import('./pages/EditCardPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PacksPage = lazy(() => import('./pages/PacksPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AnalyticsPage = lazy(() => import('./pages/admin/AnalyticsPage'));
const ManageUsersPage = lazy(() => import('./pages/admin/ManageUsersPage'));
const LogsPage = lazy(() => import('./pages/admin/LogsPage'));
const MyCardsPage = lazy(() => import('./pages/dashboard/MyCards'));
const CreateCardPage = lazy(() => import('./pages/CreateCardPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const UnauthorizedPage = lazy(() => import('./pages/UnauthorizedPage'));

// Loading component
const LoadingSpinner = () => {
  const { currentTheme } = useRoleTheme();
  
  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <motion.div
        className="flex flex-col items-center space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="w-16 h-16 border-4 border-t-transparent rounded-full"
          style={{ borderColor: currentTheme.colors.primary }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          data-testid="loading-spinner"
        />
        <motion.p 
          className="text-lg font-medium"
          style={{ color: currentTheme.colors.text.secondary }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
};

function App() {
  const { currentTheme } = useRoleTheme();
  
  // Force title update on app load
  useEffect(() => {
    document.title = 'FuturistCards | Digital Business Cards';
  }, []);
  
  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: currentTheme.colors.background }}
    >
      <Helmet>
        <title>FuturistCards | Digital Business Cards</title>
        <meta name="description" content="Create professional digital business cards" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={currentTheme.colors.primary} />
      </Helmet>

      <Navbar />

      <Suspense fallback={<LoadingSpinner />}>
        <main className="flex-1 pt-16">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cards" element={<CardsPage />} />
            <Route path="/cards/:id" element={<CardDetailsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/packs" element={<PacksPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Protected Routes - Authenticated Users */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes - User Role */}
            <Route path="/favorites" element={
              <ProtectedRoute requiredRoles={['user', 'business', 'admin']}>
                <FavoritesPage />
              </ProtectedRoute>
            } />
            
            {/* Protected Routes - Business/Admin */}
            <Route path="/my-cards" element={
              <ProtectedRoute requiredRoles={['business', 'admin']}>
                <MyCardsPage />
              </ProtectedRoute>
            } />
            <Route path="/cards/new" element={
              <ProtectedRoute requiredRoles={['business', 'admin']}>
                <CreateCardPage />
              </ProtectedRoute>
            } />
            <Route path="/create-card" element={
              <ProtectedRoute requiredRoles={['business', 'admin']}>
                <CreateCardPage />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/my-cards" element={
              <ProtectedRoute requiredRoles={['business', 'admin']}>
                <MyCardsPage />
              </ProtectedRoute>
            } />
            <Route path="/cards/:id/edit" element={
              <ProtectedRoute requiredRoles={['business', 'admin']}>
                <EditCardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AdminPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <AnalyticsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <ManageUsersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/logs" element={
              <ProtectedRoute requiredRoles={['admin']}>
                <LogsPage />
              </ProtectedRoute>
            } />
            
            {/* Error Routes */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>

      <Footer />

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: currentTheme.colors.surface,
            color: currentTheme.colors.text.primary,
            border: `1px solid ${currentTheme.colors.border}`,
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: {
              primary: currentTheme.colors.success,
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: currentTheme.colors.error,
              secondary: '#ffffff',
            },
          },
        }}
      />
      
      <DebugInfo />
    </div>
  );
}

export default App;

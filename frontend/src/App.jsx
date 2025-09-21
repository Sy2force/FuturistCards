import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CardsPage from './pages/CardsPage';
import CardDetailsPage from './pages/CardDetailsPage';
import MyCardsPage from './pages/MyCardsPage';
import CreateCardPage from './pages/CreateCardPage';
import EditCardPage from './pages/EditCardPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import ProtectedRoute from './components/ProtectedRoute';

// App principal avec ErrorBoundary et structure de routes corrigée
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ErrorBoundary>
            {/* Structure de routes avec MainLayout comme parent */}
            <Routes>
              <Route path="/" element={<MainLayout />}>
                {/* Routes publiques */}
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="cards" element={<CardsPage />} />
                <Route path="card/:id" element={<CardDetailsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact/:id" element={<ContactPage />} />
                
                {/* Routes protégées - Business et Admin */}
                <Route path="my-cards" element={
                  <ProtectedRoute roles={['business', 'admin']}>
                    <MyCardsPage />
                  </ProtectedRoute>
                } />
                <Route path="create-card" element={
                  <ProtectedRoute roles={['business', 'admin']}>
                    <CreateCardPage />
                  </ProtectedRoute>
                } />
                <Route path="edit-card/:id" element={
                  <ProtectedRoute roles={['business', 'admin']}>
                    <EditCardPage />
                  </ProtectedRoute>
                } />
                
                {/* Routes protégées - Tous utilisateurs connectés */}
                <Route path="favorites" element={
                  <ProtectedRoute>
                    <FavoritesPage />
                  </ProtectedRoute>
                } />
                <Route path="profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                
                {/* Routes protégées - Admin uniquement */}
                <Route path="admin" element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminPage />
                  </ProtectedRoute>
                } />
                
                {/* Page 404 - doit être la dernière route */}
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext-clean';
import ProtectedRoute from './components/auth/ProtectedRoute-clean';
import Navbar from './components/layout/Navbar-clean';
import Footer from './components/layout/Footer-clean';

// Pages
import HomePage from './pages/HomePage-clean';
import LoginPage from './pages/LoginPage-clean';
import RegisterPage from './pages/RegisterPage-clean';
import DashboardPage from './pages/DashboardPage-clean';
import CardsPage from './pages/CardsPage-clean';
import CardDetailPage from './pages/CardDetailPage-clean';
import CreateCardPage from './pages/CreateCardPage-clean';
import EditCardPage from './pages/EditCardPage-clean';
import ProfilePage from './pages/ProfilePage-clean';
import FavoritesPage from './pages/FavoritesPage-clean';
import NotFoundPage from './pages/NotFoundPage-clean';

// Styles
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/cards" element={<CardsPage />} />
              <Route path="/cards/:id" element={<CardDetailPage />} />
              
              {/* Routes protégées */}
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
              
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              } />
              
              <Route path="/create-card" element={
                <ProtectedRoute>
                  <CreateCardPage />
                </ProtectedRoute>
              } />
              
              <Route path="/cards/:id/edit" element={
                <ProtectedRoute>
                  <EditCardPage />
                </ProtectedRoute>
              } />
              
              {/* Redirection et 404 */}
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import all pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CardsPage from './pages/CardsPage';
import MyCardsPage from './pages/MyCardsPage';
import FavoritesPage from './pages/FavoritesPage';
import CreateCardPage from './pages/CreateCardPage';
import EditCardPage from './pages/EditCardPage';
import CardDetailsPage from './pages/CardDetailsPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import NotFound from './components/NotFound';


function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <Router>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/cards" element={<CardsPage />} />
                    <Route path="/cards/:id" element={<CardDetailsPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/my-cards" element={<MyCardsPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/create-card" element={<CreateCardPage />} />
                    <Route path="/edit-card/:id" element={<EditCardPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </FavoritesProvider>
        </AuthProvider>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(17, 24, 39, 0.9)',
              color: '#fff',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }
          }}
        />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

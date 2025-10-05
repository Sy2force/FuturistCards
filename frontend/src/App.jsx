import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CardsPage from './pages/CardsPage';
import CardDetailsPage from './pages/CardDetailsPage';
import CreateCardPage from './pages/CreateCardPage';
import EditCardPage from './pages/EditCardPage';
import MyCardsPage from './pages/MyCardsPage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <Router basename="/Project-react">
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cards" element={<CardsPage />} />
                    <Route path="/cards/:id" element={<CardDetailsPage />} />
                    <Route path="/create-card" element={<CreateCardPage />} />
                    <Route path="/edit-card/:id" element={<EditCardPage />} />
                    <Route path="/my-cards" element={<MyCardsPage />} />
                    <Route path="/favorites" element={<FavoritesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;

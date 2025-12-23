import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  // Déterminer le data-testid unique basé sur le rôle
  const testId = !user
    ? "navbar-visitor"
    : user.role === "admin"
    ? "navbar-admin"
    : user.role === "business"
    ? "navbar-business"
    : "navbar-user";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg" data-testid={testId}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-200"
            aria-label="Accueil FuturistCards"
            data-testid="navbar-logo"
          >
            <span className="text-2xl font-bold">FuturistCards</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label="Page d'accueil"
              data-testid="navbar-home"
            >
              Accueil
            </Link>
            <Link
              to="/cards"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/cards') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label="Voir toutes les cartes"
              data-testid="navbar-cards"
            >
              Cartes
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/about') 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
              aria-label="À propos de FuturistCards"
              data-testid="navbar-about"
            >
              À propos
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Liens communs à tous les utilisateurs connectés */}
                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/profile') 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  aria-label="Mon profil"
                  data-testid="navbar-profile"
                >
                  Profil
                </Link>
                <Link
                  to="/favorites"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/favorites') 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  aria-label="Mes favoris"
                  data-testid="navbar-favorites"
                >
                  Favoris
                </Link>

                {/* Liens spécifiques aux utilisateurs Business */}
                {(user.role === 'business' || user.role === 'admin') && (
                  <Link
                    to="/cards/create"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive('/cards/create') 
                        ? 'bg-green-600 text-white' 
                        : 'text-green-700 hover:text-green-600 hover:bg-green-50'
                    }`}
                    aria-label="Créer une carte"
                    data-testid="navbar-create-card"
                  >
                    Créer une carte
                  </Link>
                )}

                {/* Liens spécifiques aux utilisateurs Business */}
                {(user.role === 'business' || user.role === 'admin') && (
                  <Link
                    to="/my-cards"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive('/my-cards') 
                        ? 'bg-purple-600 text-white' 
                        : 'text-purple-700 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                    aria-label="Mes cartes"
                    data-testid="navbar-my-cards"
                  >
                    Mes cartes
                  </Link>
                )}

                {/* Liens spécifiques aux Administrateurs */}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive('/admin') 
                        ? 'bg-red-600 text-white' 
                        : 'text-red-700 hover:text-red-600 hover:bg-red-50'
                    }`}
                    aria-label="Administration"
                    data-testid="navbar-admin-link"
                  >
                    Admin
                  </Link>
                )}

                {/* Badge de rôle et nom utilisateur */}
                <div className="flex items-center space-x-2">
                  <span 
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'business' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}
                    data-testid="user-badge"
                  >
                    {user.role === 'admin' ? 'Admin' : 
                     user.role === 'business' ? 'Business' : 'User'}
                  </span>
                  <span className="text-gray-600 text-sm">Bonjour, {user.firstName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-200 shadow-md"
                  aria-label="Se déconnecter"
                  data-testid="navbar-logout"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 text-gray-700 hover:text-blue-600 rounded-md text-sm font-medium border border-gray-300 hover:border-blue-500 transition-colors duration-200"
                  aria-label="Se connecter"
                  data-testid="navbar-login"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200 shadow-md"
                  aria-label="S'inscrire"
                  data-testid="navbar-register"
                >
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors duration-200"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            data-testid="navbar-mobile-toggle"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/cards"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/cards') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              Cartes
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/about') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              À propos
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/profile') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  Profil
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive('/favorites') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  Favoris
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive('/admin') ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                <div className="px-4 py-2 text-gray-600 text-sm border-t border-gray-200 mt-2 pt-4">
                  Bonjour, {user.firstName}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 mt-2 pt-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-center border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 rounded-md text-sm font-medium transition-colors duration-200 mb-2"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center text-sm font-medium transition-colors duration-200"
                  >
                    Inscription
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

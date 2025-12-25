import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useI18n } from '../../hooks/useI18n';
import { useTheme } from '../../contexts/ThemeContext';
import LanguageSelector from '../common/LanguageSelector';
import ThemeToggle from '../common/ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    // Rediriger vers la page de connexion après déconnexion
    navigate('/login');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-lg border-b shadow-xl ${isRTL ? 'rtl' : 'ltr'}`} data-testid="navbar" style={{backdropFilter: 'blur(20px)'}}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex justify-between items-center h-20 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link 
            to="/" 
            className={`flex items-center ${isDark ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'} transition-colors duration-200`}
            aria-label={t('homeLabel')}
            data-testid="navbar-logo"
          >
            <span className="text-2xl font-bold primary-gradient bg-clip-text text-transparent">{t('appName')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Liens publics toujours visibles */}
            <Link
              to="/"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'primary-gradient text-white shadow-lg' 
                  : `${isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`
              }`}
              aria-label={t('navbar.home')}
              data-testid="nav-home"
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/cards"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/cards') 
                  ? 'primary-gradient text-white shadow-lg' 
                  : `${isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`
              }`}
              aria-label={t('navbar.cards')}
              data-testid="navbar-cards"
            >
              {t('navbar.cards')}
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/about') 
                  ? 'primary-gradient text-white shadow-lg' 
                  : `${isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`
              }`}
              aria-label={t('navbar.about')}
              data-testid="nav-about"
            >
              {t('navbar.about')}
            </Link>

            {/* Liens utilisateur connecté dans l'ordre demandé */}
            {user && (
              <>
                {/* Créer carte - pour business et admin */}
                {(user.role === 'business' || user.role === 'admin') && (
                  <Link
                    to="/cards/create"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive('/cards/create') 
                        ? 'success-gradient text-white shadow-lg' 
                        : `${isDark ? 'text-green-300 hover:text-green-200 hover:bg-green-900/20' : 'text-green-700 hover:text-green-600 hover:bg-green-50'}`
                    }`}
                    aria-label={t('navbar.createCard')}
                    data-testid="navbar-link-create-card"
                  >
                    {t('navbar.createCard')}
                  </Link>
                )}

                {/* Mes cartes - pour business et admin */}
                {(user.role === 'business' || user.role === 'admin') && (
                  <Link
                    to="/my-cards"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive('/my-cards') 
                        ? 'secondary-gradient text-white shadow-lg' 
                        : `${isDark ? 'text-purple-300 hover:text-purple-200 hover:bg-purple-900/20' : 'text-purple-700 hover:text-purple-600 hover:bg-purple-50'}`
                    }`}
                    aria-label={t('navbar.myCards')}
                    data-testid="navbar-link-my-cards"
                  >
                    {t('navbar.myCards')}
                  </Link>
                )}

                {/* Favoris - pour tous les utilisateurs connectés */}
                <Link
                  to="/favorites"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/favorites') 
                      ? 'danger-gradient text-white shadow-lg' 
                      : `${isDark ? 'text-red-300 hover:text-red-200 hover:bg-red-900/20' : 'text-red-700 hover:text-red-600 hover:bg-red-50'}`
                  }`}
                  aria-label={t('navbar.favorites')}
                  data-testid="navbar-link-favorites"
                >
                  {t('navbar.favorites')}
                </Link>

                {/* Profil - pour tous les utilisateurs connectés */}
                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/profile') 
                      ? 'primary-gradient text-white shadow-lg' 
                      : `${isDark ? 'text-gray-300 hover:text-blue-400 hover:bg-gray-700' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`
                  }`}
                  aria-label={t('navbar.profile')}
                  data-testid="navbar-link-profile"
                >
                  {t('navbar.profile')}
                </Link>
              </>
            )}
          </div>

          {/* Auth Section */}
          <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
            <ThemeToggle />
            <LanguageSelector />
            {user ? (
              <div className="flex items-center space-x-3">
                {/* Lien Admin pour les administrateurs */}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive('/admin') 
                        ? 'danger-gradient text-white shadow-lg' 
                        : `${isDark ? 'text-red-400 hover:text-red-300 hover:bg-red-900/20' : 'text-red-700 hover:text-red-600 hover:bg-red-50'}`
                    }`}
                    aria-label={t('navbar.admin')}
                    data-testid="navbar-link-admin"
                  >
                    {t('navbar.admin')}
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
                  <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>{t('hello')}, {user.firstName}</span>
                </div>
                
                {/* Bouton de déconnexion */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium transition-colors duration-200 shadow-md"
                  aria-label={t('logout')}
                  data-testid="logout-button"
                >
                  {t('navbar.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-6 py-2 ${isDark ? 'text-gray-300 hover:text-blue-400 border-gray-600 hover:border-blue-400' : 'text-gray-700 hover:text-blue-600 border-gray-300 hover:border-blue-500'} rounded-md text-sm font-medium border transition-all duration-200 hover:shadow-md`}
                  aria-label={t('login')}
                  data-testid="nav-login"
                >
                  {t('navbar.login')}
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                  aria-label={t('register')}
                  data-testid="nav-register"
                >
                  {t('navbar.register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} p-2 rounded-md transition-colors duration-200`}
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
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
          <div className={`md:hidden py-4 space-y-2 border-t ${isDark ? 'border-gray-700 bg-gray-900/95' : 'border-gray-200 bg-white/95'} backdrop-blur-lg`}>
            {/* Navigation Links dans l'ordre demandé */}
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/') ? 'primary-gradient text-white shadow-lg' : `${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`
              }`}
            >
              {t('navbar.home')}
            </Link>
            <Link
              to="/cards"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/cards') ? 'primary-gradient text-white shadow-lg' : `${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`
              }`}
            >
              {t('navbar.cards')}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className={`block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/about') ? 'primary-gradient text-white shadow-lg' : `${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`
              }`}
            >
              {t('navbar.about')}
            </Link>

            {user ? (
              <>
                {/* Mes cartes - pour business et admin */}
                {(user.role === 'business' || user.role === 'admin') && (
                  <Link
                    to="/my-cards"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive('/my-cards') ? 'secondary-gradient text-white shadow-lg' : `${isDark ? 'text-purple-300 hover:bg-purple-900/20 hover:text-purple-200' : 'text-purple-700 hover:bg-purple-50 hover:text-purple-600'}`
                    }`}
                  >
                    {t('navbar.myCards')}
                  </Link>
                )}

                {/* Favoris */}
                <Link
                  to="/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/favorites') ? 'danger-gradient text-white shadow-lg' : `${isDark ? 'text-red-300 hover:bg-red-900/20 hover:text-red-200' : 'text-red-700 hover:bg-red-50 hover:text-red-600'}`
                  }`}
                >
                  {t('navbar.favorites')}
                </Link>

                {/* Profil */}
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive('/profile') ? 'primary-gradient text-white shadow-lg' : `${isDark ? 'text-gray-300 hover:bg-gray-700 hover:text-blue-400' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`
                  }`}
                >
                  {t('navbar.profile')}
                </Link>

                {/* Admin - pour les administrateurs */}
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive('/admin') ? 'danger-gradient text-white shadow-lg' : `${isDark ? 'text-red-400 hover:bg-red-900/20 hover:text-red-300' : 'text-red-700 hover:bg-red-50 hover:text-red-600'}`
                    }`}
                  >
                    {t('navbar.admin')}
                  </Link>
                )}

                {/* Séparateur avant les contrôles */}
                <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-4`}></div>

                {/* Mobile Theme and Language Controls */}
                <div className={`flex items-center justify-center space-x-4 px-4 py-2 mb-4`}>
                  <ThemeToggle />
                  <LanguageSelector />
                </div>

                {/* Informations utilisateur */}
                <div className={`px-4 py-2 ${isDark ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-200'} text-sm border-t pt-4`}>
                  {t('hello')}, {user.firstName}
                </div>

                {/* Bouton de déconnexion */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 danger-gradient hover:opacity-90 text-white rounded-md text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {t('navbar.logout')}
                </button>
              </>
            ) : (
              <>
                {/* Séparateur avant les contrôles pour visiteurs */}
                <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} my-4`}></div>

                {/* Mobile Theme and Language Controls pour visiteurs */}
                <div className={`flex items-center justify-center space-x-4 px-4 py-2 mb-4`}>
                  <ThemeToggle />
                  <LanguageSelector />
                </div>

                <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 text-center border ${isDark ? 'border-gray-600 hover:border-blue-400 text-gray-300 hover:text-blue-400' : 'border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600'} rounded-md text-sm font-medium transition-all duration-200 mb-2 hover:shadow-md`}
                  >
                    {t('login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary block text-center"
                  >
                    {t('register')}
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

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from "../../hooks/useTranslation";
import { useRoleTheme, useTheme } from '../../context/ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

// Icons
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DarkModeIcon = ({ isDark }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {isDark ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    )}
  </svg>
);

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { currentTheme } = useRoleTheme();
  const { t } = useTranslation();
  
  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="glass-button p-2 rounded-md transition-colors duration-200"
      style={{ color: currentTheme.colors.text.primary }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      data-testid="dark-mode-toggle"
      aria-label={t('theme.toggle')}
    >
      <DarkModeIcon isDark={theme === 'dark'} />
    </motion.button>
  );
};

const Navbar = ({ onCreateCard }) => {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const { currentTheme, isDark, toggleDarkMode } = useRoleTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Force re-render when user state changes for tests
  useEffect(() => {
    const handleUserChange = () => {
      setForceUpdate(prev => prev + 1);
    };
    window.addEventListener('userChanged', handleUserChange);
    return () => window.removeEventListener('userChanged', handleUserChange);
  }, []);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/login');
  };

  // Navigation links configuration - different for logged in vs logged out users
  const publicLinks = [
    { path: '/', key: 'home', label: t('navbar.home') },
    { path: '/about', key: 'about', label: t('navbar.about') },
    { path: '/services', key: 'services', label: t('navbar.services') },
    { path: '/contact', key: 'contact', label: t('navbar.contact') },
  ];

  const authenticatedLinks = [
    { path: '/', key: 'home', label: t('navbar.home') },
    { path: '/cards', key: 'cards', label: t('navbar.cards') },
    { path: '/my-cards', key: 'my-cards', label: t('navbar.myCards'), roles: ['business', 'admin'] },
    { path: '/create-card', key: 'create-card', label: 'צור כרטיס', roles: ['business', 'admin'] },
    { path: '/favorites', key: 'favorites', label: t('navbar.favorites') },
    { path: '/dashboard', key: 'dashboard', label: t('navbar.dashboard') },
    { path: '/admin', key: 'admin', label: t('navbar.admin'), roles: ['admin'] },
  ];

  // Get appropriate links based on authentication status
  const getNavigationLinks = () => {
    if (!user) {
      return publicLinks;
    }
    return authenticatedLinks.filter(link => 
      !link.roles || link.roles.includes(user.role)
    );
  };

  const getNavbarTestId = () => {
    if (!user) {
      return 'navbar-visitor';
    }
    return `navbar-${user.role}`;
  };

  const shouldShowLink = (link) => {
    if (link.public) return true;
    if (!user || !link.roles) return false;
    return link.roles.includes(user.role);
  };

  return (
    <nav 
      className="glass-card fixed top-0 left-0 right-0 z-50 border-b shadow-xl"
      style={{ 
        backdropFilter: 'blur(20px)',
        backgroundColor: currentTheme.colors.surface,
        borderColor: currentTheme.colors.border
      }}
      data-testid={getNavbarTestId()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 flex-row-reverse gap-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link 
              to="/" 
              className="flex items-center gap-2 transition-colors duration-200"
              style={{ color: currentTheme.colors.text.primary }}
              aria-label={t('navbar.home')}
              data-testid="navbar-logo"
            >
              {/* Logo Icon */}
              <div className="relative">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                  }}
                >
                  {/* Futuristic Card Icon */}
                  <svg 
                    className="w-5 h-5 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                    />
                  </svg>
                </div>
              </div>
              
              {/* Site Title */}
              <div className="flex flex-col">
                <span 
                  className="text-xl font-bold leading-tight whitespace-nowrap tracking-wide"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: currentTheme.colors.primary,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                  data-testid="site-title"
                >
                  FuturistCards
                </span>
                <span 
                  className="text-xs opacity-75 text-center"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  כרטיסי ביקור דיגיטליים
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="flex items-center w-full max-w-5xl gap-1">
              {/* Navigation Links */}
              {getNavigationLinks().map((link) => (
                <motion.div key={link.key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                  <Link
                    to={link.path}
                    className="glass-button px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full text-center block whitespace-nowrap"
                    style={{
                      backgroundColor: isActive(link.path) ? currentTheme.colors.primary : 'transparent',
                      color: isActive(link.path) ? '#ffffff' : currentTheme.colors.text.primary
                    }}
                    data-testid={`link-${link.key}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-reverse space-x-3">
            {/* Dark Mode Toggle */}
            <ThemeToggle />


            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-3">
                {/* מחוון סטטוס משתמש */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">{t('home.status.connected')}</span>
                  </div>
                  <span 
                    className="px-2 py-1 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: currentTheme.colors.primary + '20',
                      color: currentTheme.colors.primary
                    }}
                    data-testid="user-role-badge"
                  >
                    {user.role === 'admin' ? t('roles.admin') : 
                     user.role === 'business' ? t('roles.business') : t('roles.user')}
                  </span>
                  <span 
                    className="text-sm hidden lg:inline"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    {t('navbar.hello')}, {user.firstName}
                  </span>
                </div>
                
                {/* Logout Button */}
                <motion.button
                  onClick={handleLogout}
                  className="glass-button px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid="link-logout"
                >
                  {t('navbar.logout')}
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="glass-button px-4 py-2 rounded-md text-sm font-medium border transition-all duration-200"
                  style={{
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text.primary
                  }}
                  data-testid="link-login"
                >
                  {t('navbar.login')}
                </Link>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="glass-button px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                      color: '#ffffff'
                    }}
                    data-testid="link-register"
                  >
                    {t('navbar.register')}
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass-button p-2 rounded-md transition-colors duration-200"
              style={{ color: currentTheme.colors.text.primary }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              data-testid="mobile-menu-toggle"
              aria-label={t('navbar.toggleMenu')}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t"
              style={{ borderColor: currentTheme.colors.border }}
              data-testid="mobile-nav"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/* Mobile Navigation Links */}
                {getNavigationLinks().map((link) => (
                  <Link
                    key={link.key}
                    to={link.path}
                    className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                    style={{
                      backgroundColor: isActive(link.path) ? currentTheme.colors.primary : 'transparent',
                      color: isActive(link.path) ? '#ffffff' : currentTheme.colors.text.primary
                    }}
                    data-testid={`mobile-link-${link.key}`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                <div className="pt-4 border-t" style={{ borderColor: currentTheme.colors.border }}>
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-3 py-2">
                        <span 
                          className="text-sm"
                          style={{ color: currentTheme.colors.text.secondary }}
                        >
                          {t('navbar.hello')}, {user.firstName}
                        </span>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                        style={{
                          backgroundColor: '#ef4444',
                          color: '#ffffff'
                        }}
                        data-testid="mobile-link-logout"
                      >
                        {t('navbar.logout')}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="block px-3 py-2 rounded-md text-base font-medium border transition-all duration-200"
                        style={{
                          borderColor: currentTheme.colors.border,
                          color: currentTheme.colors.text.primary
                        }}
                        data-testid="mobile-link-login"
                      >
                        {t('navbar.login')}
                      </Link>
                      <Link
                        to="/register"
                        className="block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
                        style={{
                          background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`,
                          color: '#ffffff'
                        }}
                        data-testid="mobile-link-register"
                      >
                        {t('navbar.register')}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggle from '../common/ThemeToggle';
import LanguageSelector from '../common/LanguageSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  HomeIcon,
  RectangleStackIcon,
  InformationCircleIcon,
  CreditCardIcon,
  HeartIcon,
  PlusCircleIcon,
  UserIcon,
  Cog8ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Fermer les menus déroulants au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      // Silently handle logout errors
    }
  };

  const navItems = [
    { path: '/', label: t('home') || 'Accueil', icon: HomeIcon },
    { path: '/cards', label: t('cards') || 'Cartes', icon: RectangleStackIcon },
    { path: '/about', label: t('about') || 'À propos', icon: InformationCircleIcon }
  ];

  const authItems = [
    { path: '/my-cards', label: t('myCards') || 'Mes Cartes', icon: CreditCardIcon, requiresAuth: true, requiresBusiness: true },
    { path: '/favorites', label: t('favorites') || 'Favoris', icon: HeartIcon, requiresAuth: true },
    { path: '/create-card', label: t('createCard') || 'Créer', icon: PlusCircleIcon, requiresAuth: true, requiresBusiness: true },
    { path: '/profile', label: t('profile') || 'Profil', icon: UserIcon, requiresAuth: true },
    { path: '/admin', label: 'Admin', icon: Cog8ToothIcon, requiresAuth: true, requiresAdmin: true }
  ];

  const isActive = path => location.pathname === path;

  const canAccess = item => {
    if (!item.requiresAuth && !item.requiresBusiness && !item.requiresAdmin) return true;
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.requiresBusiness && user?.role !== 'business' && user?.role !== 'admin') return false;
    if (item.requiresAdmin && user?.role !== 'admin') return false;
    return true;
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSearchResults(query.length > 0);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cards?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setShowSearchResults(false);
    }
  };

  const handleQuickSearch = (query) => {
    navigate(`/cards?search=${encodeURIComponent(query)}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-900 dark:text-white font-bold text-xl"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-inter gradient-text-primary">FuturistCards</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t('searchPlaceholder') || 'Rechercher des cartes, compétences, entreprises...'}
                className="w-full pl-10 pr-4 py-2 bg-white/15 backdrop-blur-md border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 hover:bg-white/20"
              />
              <AnimatePresence>
                {showSearchResults && searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="text-sm text-gray-700 mb-3">
                        {t('search') || 'Recherche'}: <strong className="text-blue-600">{searchQuery}</strong>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => handleQuickSearch(searchQuery)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <MagnifyingGlassIcon className="h-4 w-4" />
                          <span>{t('searchFor') || 'Rechercher'} "{searchQuery}"</span>
                        </button>
                        {['Développeur', 'Designer', 'Marketing', 'Finance'].filter(tag => 
                          tag.toLowerCase().includes(searchQuery.toLowerCase())
                        ).map(suggestion => (
                          <button
                            key={suggestion}
                            onClick={() => handleQuickSearch(suggestion)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Main nav items */}
            <div className="flex items-center space-x-1">
              {navItems.map(item => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'text-blue-400 bg-blue-400/20 shadow-lg backdrop-blur-sm'
                        : 'text-gray-700 dark:text-white/80 hover:text-white hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-md'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Navigation */}
            {isAuthenticated && (
              <div className="flex items-center space-x-1 border-l border-white/20 pl-4">
                {authItems.filter(canAccess).slice(0, 3).map(item => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActive(item.path)
                          ? 'text-blue-400 bg-blue-400/20 shadow-lg backdrop-blur-sm'
                          : 'text-gray-700 dark:text-white/80 hover:text-white hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-md'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="hidden lg:block">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* Theme and Language Controls */}
            <div className="flex items-center space-x-2 border-l border-white/20 pl-4">
              <div className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300">
                <ThemeToggle />
              </div>
              <div className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300">
                <LanguageSelector />
              </div>
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative border-l border-white/20 pl-4" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-3 py-2 hover:bg-white/20 rounded-xl transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {(user?.firstName || user?.name || user?.email)?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-white text-sm font-medium">
                      {user?.firstName || user?.name || user?.email?.split('@')[0]}
                    </div>
                    <div className="text-white/60 text-xs capitalize">
                      {user?.role || 'User'}
                    </div>
                  </div>
                </button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {(user?.firstName || user?.name || user?.email)?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="text-gray-900 font-medium">
                              {user?.firstName} {user?.lastName || ''}
                            </div>
                            <div className="text-gray-500 text-sm">{user?.email}</div>
                            <div className="text-blue-600 text-xs capitalize font-medium">
                              {user?.role || 'User'}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        {authItems.filter(canAccess).map(item => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setIsUserMenuOpen(false)}
                              className={`flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors ${
                                isActive(item.path) ? 'bg-blue-100 text-blue-700' : ''
                              }`}
                            >
                              <IconComponent className="h-5 w-5" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                        
                        <div className="border-t border-gray-200 mt-2 pt-2">
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsUserMenuOpen(false);
                            }}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                            <span>{t('logout') || 'Se déconnecter'}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3 border-l border-white/20 pl-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white/80 hover:text-white hover:bg-white/20 text-sm font-medium rounded-xl transition-all duration-300"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-purple-700 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {t('register')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300">
              <ThemeToggle />
            </div>
            <div className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300">
              <LanguageSelector />
            </div>
            <motion.button
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-white/80 hover:text-white hover:bg-white/20 focus:outline-none rounded-xl transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {!isMenuOpen ? (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white/10 backdrop-blur-xl rounded-2xl mt-4 mb-4 overflow-hidden border border-white/20 shadow-xl"
            >
              <div className="p-4 space-y-2">
                {/* Mobile Search */}
                <div className="mb-4">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-white/60" />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder={t('search') || 'Rechercher...'}
                      className="w-full pl-10 pr-4 py-3 bg-white/15 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    />
                  </form>
                </div>

                {/* Public Navigation */}
                <div className="space-y-1">
                  {navItems.map(item => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                          isActive(item.path)
                            ? 'text-blue-400 bg-blue-400/20 shadow-lg'
                            : 'text-white/80 hover:text-white hover:bg-white/20'
                        }`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Auth Navigation */}
                {isAuthenticated && (
                  <div className="border-t border-white/20 pt-4 mt-4">
                    <div className="space-y-1">
                      {authItems.filter(canAccess).map(item => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                              isActive(item.path)
                                ? 'text-blue-400 bg-blue-400/20 shadow-lg'
                                : 'text-white/80 hover:text-white hover:bg-white/20'
                            }`}
                          >
                            <IconComponent className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Mobile User Section */}
                {isAuthenticated ? (
                  <div className="border-t border-white/20 pt-4 mt-4">
                    <div className="flex items-center space-x-3 px-4 py-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">
                          {(user?.firstName || user?.name || user?.email)?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">
                          {user?.firstName} {user?.lastName || ''}
                        </div>
                        <div className="text-white/60 text-sm capitalize">
                          {user?.role || 'User'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/20 transition-all duration-300"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      <span>{t('logout') || 'Se déconnecter'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="border-t border-white/20 pt-4 mt-4 space-y-2">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/20 text-center font-medium rounded-xl transition-all duration-300"
                    >
                      {t('login') || 'Se connecter'}
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="block px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    >
                      {t('register') || 'S\'inscrire'}
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

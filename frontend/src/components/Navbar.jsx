import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Bars3Icon,
  XMarkIcon,
  UserIcon, 
  UsersIcon, 
  ShieldCheckIcon, 
  PlusIcon, 
  HeartIcon, 
  CogIcon,
  Squares2X2Icon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleConfig = {
      user: { icon: UserIcon, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', label: 'User' },
      business: { icon: UsersIcon, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', label: 'Business' },
      admin: { icon: ShieldCheckIcon, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', label: 'Admin' }
    };

    const config = roleConfig[role];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
      <motion.span 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </motion.span>
    );
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { to: '/cards', label: 'Cartes', icon: Squares2X2Icon, public: true, testId: 'nav-cards' }
    ];

    if (!user) {
      return [
        ...baseItems,
        { to: '/about', label: 'À propos', icon: UserIcon, public: true, testId: 'nav-about' }
      ];
    }

    const userItems = [
      ...baseItems,
      { to: '/my-cards', label: 'myCardsNav', icon: Squares2X2Icon, testId: 'nav-my-cards' },
      { to: '/favorites', label: 'Favoris', icon: HeartIcon, testId: 'nav-favorites' },
      { to: '/profile', label: 'Profil', icon: CogIcon, testId: 'nav-profile' }
    ];

    if (user.role === 'business' || user.role === 'admin') {
      userItems.splice(1, 0, { to: '/create-card', label: 'Créer', icon: PlusIcon, testId: 'nav-create-card' });
    }

    if (user.role === 'admin') {
      userItems.splice(-1, 0, { to: '/admin', label: 'Admin Panel', icon: UserGroupIcon, testId: 'nav-admin' });
    }

    userItems.push({ to: '/about', label: 'À propos', icon: UserIcon, public: true, testId: 'nav-about' });

    return userItems;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center" data-testid="nav-home">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                CardPro
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            
            {/* Dynamic Navigation Items */}
            {getNavigationItems().map((item) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.to}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={item.to} 
                    data-testid={item.testId}
                    className="relative flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm"
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
            
            {/* User section with role badge */}
            {user ? (
              <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                <RoleBadge role={user.role} />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  data-testid="nav-logout"
                  className="relative text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm"
                >
                  {'Déconnexion'}
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200 dark:border-gray-700">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" data-testid="nav-login" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm">
                    {'Connexion'}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" data-testid="nav-register" className="relative bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 hover:shadow-lg transition-all duration-200 font-medium text-sm">
                    {'Inscription'}
                  </Link>
                </motion.div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="mobile-menu-button"
              className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-2">
              
              {/* User info with role badge for mobile */}
              {user && (
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email}
                    </span>
                    <RoleBadge role={user.role} />
                  </div>
                </div>
              )}
              
              {/* Dynamic Navigation Items for Mobile */}
              {getNavigationItems().map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.to}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to={item.to} 
                      data-testid={item.testId}
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Auth section for mobile */}
              {user ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 font-medium"
                >
                  <UserIcon className="w-5 h-5 mr-3" />
                  {'Déconnexion'}
                </motion.button>
              ) : (
                <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/login" 
                      className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserIcon className="w-5 h-5 mr-3" />
                      {'Connexion'}
                    </Link>
                  </motion.div>
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Link 
                      to="/register" 
                      className="flex items-center px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UsersIcon className="w-5 h-5 mr-3" />
                      {'Inscription'}
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

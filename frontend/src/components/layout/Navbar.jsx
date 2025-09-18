import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import ButtonGlass from '../common/ButtonGlass';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/cards', label: 'Cards' },
    { path: '/about', label: 'About' },
  ];

  const authLinks = [
    { path: '/my-cards', label: 'My Cards' },
    { path: '/favorites', label: 'Favorites' },
    { path: '/profile', label: 'Profile' },
  ];

  const businessLinks = [
    { path: '/create-card', label: 'Create Card' },
  ];

  const adminLinks = [
    { path: '/admin', label: 'Admin CRM' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-lg flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">F</span>
            </motion.div>
            <span className="font-display font-bold text-xl gradient-text">
              FuturistCards
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated && (
              <>
                {authLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}

                {user?.isBusiness && businessLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}

                {user?.isAdmin && adminLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 glass rounded-lg hover:bg-white/10"
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </motion.button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.image?.url || '/default-avatar.png'}
                    alt={user?.image?.alt || 'User avatar'}
                    className="w-8 h-8 rounded-full border-2 border-primary-400/50"
                  />
                  <span className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <ButtonGlass
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </ButtonGlass>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <ButtonGlass variant="ghost" size="sm">
                    Login
                  </ButtonGlass>
                </Link>
                <Link to="/register">
                  <ButtonGlass variant="primary" size="sm">
                    Register
                  </ButtonGlass>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 glass rounded-lg"
            data-testid="mobile-menu-button"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white mb-1 origin-center transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-white mb-1 transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-white origin-center transition-all"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-menu"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="mobile-menu-panel"
              data-testid="mobile-menu"
            >
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-bold text-lg gradient-text">
                    Menu
                  </span>
                  <button
                    onClick={toggleTheme}
                    className="p-2 glass rounded-lg hover:bg-white/10"
                  >
                    {theme === 'dark' ? '🌙' : '☀️'}
                  </button>
                </div>

                {publicLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}

                {isAuthenticated && (
                  <>
                    <hr className="border-white/20" />
                    {authLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                      >
                        {link.label}
                      </Link>
                    ))}

                    {user?.isBusiness && businessLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                      >
                        {link.label}
                      </Link>
                    ))}

                    {user?.isAdmin && adminLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                      >
                        {link.label}
                      </Link>
                    ))}

                    <hr className="border-white/20" />
                    <div className="flex items-center space-x-3 p-4 glass rounded-lg">
                      <img
                        src={user?.image?.url || '/default-avatar.png'}
                        alt={user?.image?.alt || 'User avatar'}
                        className="w-10 h-10 rounded-full border-2 border-primary-400/50"
                      />
                      <div>
                        <p className="font-medium">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-white/60">{user?.email}</p>
                      </div>
                    </div>
                    <ButtonGlass
                      variant="danger"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      Logout
                    </ButtonGlass>
                  </>
                )}

                {!isAuthenticated && (
                  <>
                    <hr className="border-white/20" />
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <ButtonGlass variant="ghost" className="w-full">
                        Login
                      </ButtonGlass>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <ButtonGlass variant="primary" className="w-full">
                        Register
                      </ButtonGlass>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from './SearchBar';
import DarkModeToggle from './DarkModeToggle';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                FuturistCards
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="w-64 mr-2">
              <SearchBar />
            </div>
            
            <Link to="/cards" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm">
              {t('cards')}
            </Link>
            
            {user ? (
              <>
                {(user.role === 'business' || user.role === 'admin') && (
                  <Link to="/create-card" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm">
                    {t('create')}
                  </Link>
                )}
                
                <Link to="/my-cards" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm">
                  {t('myCards')}
                </Link>
                
                <Link to="/favorites" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm">
                  {t('favorites')}
                </Link>
                
                <Link to="/profile" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm">
                  {t('profile')}
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="relative text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm">
                  {t('login')}
                </Link>
                <Link to="/register" className="relative bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:shadow-lg transition-all duration-200 font-medium text-sm">
                  {t('register')}
                </Link>
              </>
            )}
            
            <Link to="/about" className="relative text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm">
              {t('about')}
            </Link>
            
            <div className="ml-2 flex items-center space-x-2">
              <LanguageSelector />
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <DarkModeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2 p-2 rounded-md text-gray-700 dark:text-gray-300"
            >
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <SearchBar />
              
              <Link to="/cards" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium">
                {t('cards')}
              </Link>
              
              {user ? (
                <>
                  {(user.role === 'business' || user.role === 'admin') && (
                    <Link to="/create-card" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium">
                      {t('create')}
                    </Link>
                  )}
                  
                  <Link to="/my-cards" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium">
                    {t('myCards')}
                  </Link>
                  
                  <Link to="/favorites" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium">
                    {t('favorites')}
                  </Link>
                  
                  <Link to="/profile" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium">
                    {t('profile')}
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 font-medium"
                  >
                    {t('logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium">
                    {t('login')}
                  </Link>
                  <Link to="/register" className="block px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-all duration-200 font-medium text-center">
                    {t('register')}
                  </Link>
                </>
              )}
              
              <Link to="/about" className="block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 font-medium">
                {t('about')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

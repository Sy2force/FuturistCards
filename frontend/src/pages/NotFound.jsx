import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRoleTheme } from '../context/ThemeProvider';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const NotFound = () => {
  const { currentTheme } = useRoleTheme();
  
  // Set document title
  useDocumentTitle('Page Not Found | FuturistCards');
  
  return (
    <div className="min-h-screen glass-gradient flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-md mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="glass-card p-8">
          <motion.div 
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: currentTheme.colors.primary }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <span className="text-3xl font-bold text-white">404</span>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-semibold mb-4"
            style={{ color: currentTheme.colors.text.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {'title'}
          </motion.h2>
          
          <motion.p 
            className="mb-8"
            style={{ color: currentTheme.colors.text.secondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {'description'}
          </motion.p>
          
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              to="/"
              className="glass-button glass-button-primary inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {'Back'}
            </Link>
            
            <Link
              to="/cards"
              className="glass-button glass-button-secondary block px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {'Business Cards'}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

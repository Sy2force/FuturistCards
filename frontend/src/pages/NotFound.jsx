import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRoleTheme } from '../context/ThemeProvider';

const NotFound = () => {
  const { currentTheme } = useRoleTheme();
  
  // Set document title
  React.useEffect(() => {
    document.title = 'Page Not Found - FuturistCards';
  }, []);

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
            style={{ backgroundColor: currentTheme?.colors?.primary || '#6366f1' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <span className="text-3xl font-bold text-white">404</span>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-semibold mb-4"
            style={{ color: currentTheme?.colors?.text?.primary || '#ffffff' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Page Not Found
          </motion.h2>
          
          <motion.p 
            className="mb-8"
            style={{ color: currentTheme?.colors?.text?.secondary || '#a0aec0' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            The page you're looking for doesn't exist or has been moved.
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
              Back to Home
            </Link>
            
            <Link
              to="/cards"
              className="glass-button glass-button-secondary block px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              Browse Cards
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;

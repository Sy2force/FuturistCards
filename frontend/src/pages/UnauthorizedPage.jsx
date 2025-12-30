import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "../hooks/useTranslation";
import { motion } from 'framer-motion';
import { useRoleTheme } from '../context/ThemeProvider';

const UnauthorizedPage = () => {
  const { t } = useTranslation();
  const { currentTheme } = useRoleTheme();

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
            style={{ backgroundColor: currentTheme.colors.accent }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <svg 
              className="w-12 h-12 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-semibold mb-4"
            style={{ color: currentTheme.colors.text.primary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {t('unauthorized.title')}
          </motion.h2>
          
          <motion.p 
            className="mb-8"
            style={{ color: currentTheme.colors.text.secondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {t('unauthorized.description')}
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
              {t('unauthorized.goHome')}
            </Link>
            
            <Link
              to="/login"
              className="glass-button glass-button-secondary block px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              {t('unauthorized.login')}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UnauthorizedPage;

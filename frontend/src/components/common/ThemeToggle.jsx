import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={`relative p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
        isDark 
          ? 'bg-gradient-to-r from-accent to-purple-600 text-white shadow-purple-500/25' 
          : 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-indigo-500/25'
      }`}
      title={isDark ? 'Mode Clair' : 'Mode Sombre'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center justify-center"
      >
        <span className="text-xl">
          {isDark ? '☀️' : '🌙'}
        </span>
      </motion.div>
      
      {/* Effet de glow */}
      <div className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
        isDark 
          ? 'bg-gradient-to-r from-accent to-purple-600' 
          : 'bg-gradient-to-r from-primary to-indigo-600'
      }`} />
    </motion.button>
  );
};

export default ThemeToggle;

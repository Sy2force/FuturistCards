import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-all duration-300 shadow-md"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      data-testid="theme-toggle"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: theme === 'dark' ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === 'dark' ? 0 : 360,
          scale: theme === 'dark' ? 1.2 : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === 'dark' ? (
          <SunIcon className="h-5 w-5 text-warning-500" />
        ) : (
          <MoonIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;

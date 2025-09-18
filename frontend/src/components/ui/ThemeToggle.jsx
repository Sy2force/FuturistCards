import React from 'react';
import { AnimatePresence } from 'framer-motion';

const ThemeToggle = ({ theme, onChange }) => {
  return (
    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg border border-white/10">
      <button
        onClick={() => onChange('dark')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          theme === 'dark' 
            ? 'bg-primary-500/30 border border-primary-400/50 text-white' 
            : 'bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20'
        }`}
      >
        <span className="text-lg">🌙</span>
        <span className="font-medium">Dark</span>
      </button>
      
      <button
        onClick={() => onChange('light')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
          theme === 'light' 
            ? 'bg-primary-500/30 border border-primary-400/50 text-white' 
            : 'bg-white/10 border border-white/20 text-white/70 hover:text-white hover:bg-white/20'
        }`}
      >
        <span className="text-lg">☀️</span>
        <span className="font-medium">Light</span>
      </button>
    </div>
  );
};

export default ThemeToggle;

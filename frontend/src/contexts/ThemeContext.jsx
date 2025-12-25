import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const savedCustomTheme = localStorage.getItem('futuristcards_theme');
    
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    } else if (savedCustomTheme !== null) {
      return savedCustomTheme === 'dark';
    } else {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    
    // Save to localStorage (both formats for compatibility)
    localStorage.setItem('darkMode', JSON.stringify(newTheme));
    localStorage.setItem('futuristcards_theme', newTheme ? 'dark' : 'light');
  };

  // Apply theme on mount and when changed
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(isDark));
    localStorage.setItem('futuristcards_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

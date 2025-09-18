import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ThemeContext = createContext();

const initialState = {
  theme: 'dark', // default to dark theme
  animations: true,
  reducedMotion: false,
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };
    case 'TOGGLE_ANIMATIONS':
      return {
        ...state,
        animations: !state.animations,
      };
    case 'SET_REDUCED_MOTION':
      return {
        ...state,
        reducedMotion: action.payload,
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedAnimations = localStorage.getItem('animations');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (savedTheme) {
      dispatch({ type: 'SET_THEME', payload: savedTheme });
    }

    if (savedAnimations !== null) {
      dispatch({ type: 'TOGGLE_ANIMATIONS' });
    }

    if (prefersReducedMotion) {
      dispatch({ type: 'SET_REDUCED_MOTION', payload: true });
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  // Apply animation preferences
  useEffect(() => {
    const root = document.documentElement;
    
    if (!state.animations || state.reducedMotion) {
      root.style.setProperty('--animation-duration', '0s');
      root.style.setProperty('--transition-duration', '0s');
    } else {
      root.style.removeProperty('--animation-duration');
      root.style.removeProperty('--transition-duration');
    }

    localStorage.setItem('animations', state.animations.toString());
  }, [state.animations, state.reducedMotion]);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setTheme = (theme) => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const toggleAnimations = () => {
    dispatch({ type: 'TOGGLE_ANIMATIONS' });
  };

  const value = {
    ...state,
    toggleTheme,
    setTheme,
    toggleAnimations,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

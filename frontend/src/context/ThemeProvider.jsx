import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';

// Safe check for window object
const isBrowser = typeof window !== 'undefined';

const RoleThemeContext = createContext();

export const useRoleTheme = () => {
  const context = useContext(RoleThemeContext);
  if (!context) {
    throw new Error('useRoleTheme must be used within a RoleThemeProvider');
  }
  return context;
};

// Export useTheme from next-themes for components that need basic theme functionality
export { useTheme };

// Theme configurations for different roles
const themes = {
  user: {
    name: 'user',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#06b6d4',
      background: '#f8fafc',
      surface: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(59, 130, 246, 0.2)',
      text: {
        primary: '#1e293b',
        secondary: '#64748b',
        muted: '#94a3b8'
      },
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  business: {
    name: 'business',
    colors: {
      primary: '#7c3aed',
      secondary: '#5b21b6',
      accent: '#a855f7',
      background: '#faf5ff',
      surface: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(124, 58, 237, 0.2)',
      text: {
        primary: '#1e1b4b',
        secondary: '#6366f1',
        muted: '#a5b4fc'
      },
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  admin: {
    name: 'admin',
    colors: {
      primary: '#dc2626',
      secondary: '#991b1b',
      accent: '#f97316',
      background: '#fef2f2',
      surface: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(220, 38, 38, 0.2)',
      text: {
        primary: '#7f1d1d',
        secondary: '#dc2626',
        muted: '#fca5a5'
      },
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  },
  default: {
    name: 'default',
    colors: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      accent: '#8b5cf6',
      background: '#ffffff',
      surface: 'rgba(255, 255, 255, 0.8)',
      border: 'rgba(99, 102, 241, 0.2)',
      text: {
        primary: '#111827',
        secondary: '#6b7280',
        muted: '#9ca3af'
      },
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    }
  }
};

// Dark mode variants
const darkThemes = {
  user: {
    name: 'user-dark',
    colors: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      accent: '#06b6d4',
      background: '#0f172a',
      surface: 'rgba(30, 41, 59, 0.8)',
      border: 'rgba(96, 165, 250, 0.2)',
      text: {
        primary: '#f1f5f9',
        secondary: '#cbd5e1',
        muted: '#64748b'
      },
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171'
    }
  },
  business: {
    name: 'business-dark',
    colors: {
      primary: '#a78bfa',
      secondary: '#8b5cf6',
      accent: '#c084fc',
      background: '#1e1b4b',
      surface: 'rgba(30, 27, 75, 0.8)',
      border: 'rgba(167, 139, 250, 0.2)',
      text: {
        primary: '#f8fafc',
        secondary: '#c7d2fe',
        muted: '#a5b4fc'
      },
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171'
    }
  },
  admin: {
    name: 'admin-dark',
    colors: {
      primary: '#f87171',
      secondary: '#ef4444',
      accent: '#fb923c',
      background: '#7f1d1d',
      surface: 'rgba(127, 29, 29, 0.8)',
      border: 'rgba(248, 113, 113, 0.2)',
      text: {
        primary: '#fef2f2',
        secondary: '#fecaca',
        muted: '#fca5a5'
      },
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171'
    }
  },
  default: {
    name: 'default-dark',
    colors: {
      primary: '#818cf8',
      secondary: '#6366f1',
      accent: '#a855f7',
      background: '#111827',
      surface: 'rgba(31, 41, 55, 0.8)',
      border: 'rgba(129, 140, 248, 0.2)',
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        muted: '#9ca3af'
      },
      success: '#34d399',
      warning: '#fbbf24',
      error: '#f87171'
    }
  }
};

// Role Theme Provider that works with next-themes
const RoleThemeProvider = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState('default');

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get user role from AuthContext if available
  useEffect(() => {
    // For now, use default role to avoid circular dependencies
    // Role-based theming will be handled by passing userRole as prop
    setUserRole('default');
  }, []);

  const isDark = mounted ? theme === 'dark' : false;

  const getUserRole = () => {
    return userRole || 'default';
  };

  const currentTheme = isDark 
    ? darkThemes[getUserRole()] || darkThemes.default
    : themes[getUserRole()] || themes.default;

  const toggleDarkMode = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Load saved theme from localStorage
  useEffect(() => {
    if (isBrowser) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    }
  }, []);

  // Apply CSS variables to document root
  useEffect(() => {
    if (!mounted || !isBrowser) return;
    
    const root = document.documentElement;
    const colors = currentTheme.colors;
    
    // Apply theme colors as CSS variables
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-text-primary', colors.text.primary);
    root.style.setProperty('--color-text-secondary', colors.text.secondary);
    root.style.setProperty('--color-text-muted', colors.text.muted);
    root.style.setProperty('--color-success', colors.success);
    root.style.setProperty('--color-warning', colors.warning);
    root.style.setProperty('--color-error', colors.error);
  }, [currentTheme, mounted]);

  const value = {
    currentTheme,
    isDark,
    toggleDarkMode,
    userRole: getUserRole(),
    themes: isDark ? darkThemes : themes,
    mounted
  };

  return (
    <RoleThemeContext.Provider value={value}>
      {children}
    </RoleThemeContext.Provider>
  );
};

// Main Theme Provider component
export const ThemeProvider = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="futuristcards-theme"
      disableTransitionOnChange={false}
    >
      <RoleThemeProvider>
        {children}
      </RoleThemeProvider>
    </NextThemesProvider>
  );
};

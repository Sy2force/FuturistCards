/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Mode clair - couleurs vives et contrastées
        light: {
          bg: '#ffffff',
          surface: '#f8fafc',
          card: '#ffffff',
          text: '#1e293b',
          textSecondary: '#475569',
          border: 'rgba(30, 41, 59, 0.15)',
          accent: '#3b82f6',
          accentHover: '#2563eb',
        },
        
        // Mode sombre - couleurs chaudes et contrastées
        dark: {
          bg: '#0a0a0a',
          surface: '#1a1a1a',
          card: 'rgba(255, 255, 255, 0.08)',
          text: '#ffffff',
          textSecondary: '#e2e8f0',
          border: 'rgba(255, 255, 255, 0.12)',
          accent: '#f59e0b',
          accentHover: '#d97706',
        },
        
        // Couleurs système améliorées
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          light: '#8B5CF6',
          dark: '#a78bfa',
        },
        accent: {
          light: '#06B6D4',
          dark: '#22d3ee',
        },
        success: {
          light: '#10B981',
          dark: '#34d399',
        },
        warning: {
          light: '#F59E0B',
          dark: '#fbbf24',
        },
        error: {
          light: '#EF4444',
          dark: '#f87171',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'theme-transition': 'themeTransition 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        themeTransition: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  // Production optimizations
  safelist: [
    'bg-gradient-to-br',
    'from-slate-900',
    'via-purple-900',
    'to-slate-900',
    'backdrop-blur-sm',
    'backdrop-blur-md',
    'backdrop-blur-lg',
  ],
}

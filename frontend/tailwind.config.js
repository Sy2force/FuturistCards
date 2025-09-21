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
        // Mode clair - éclairage optimal
        lightBg: '#f8fafc',
        lightText: '#1e293b',
        lightCard: '#ffffff',
        lightBorder: 'rgba(30, 41, 59, 0.12)',
        
        // Mode sombre - contraste équilibré  
        darkBg: '#0f172a',
        darkText: '#f1f5f9',
        darkCard: 'rgba(248, 250, 252, 0.05)',
        darkBorder: 'rgba(248, 250, 252, 0.1)',
        
        // Couleurs système
        primary: '#3B82F6',
        secondary: '#8B5CF6',
        accent: '#06B6D4',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
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
        themeTransition: {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

import { useTheme } from '../../contexts/ThemeContext';
import { useI18n } from '../../hooks/useI18n';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-3 rounded-full transition-all duration-300 transform hover:scale-110
        ${isDark 
          ? 'warning-gradient text-white shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40' 
          : 'primary-gradient text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40'
        }
        border-2 border-white/20 backdrop-blur-sm
      `}
      aria-label={isDark ? t('common.lightMode') : t('common.darkMode')}
      data-testid="theme-toggle"
      title={isDark ? t('common.lightMode') : t('common.darkMode')}
    >
      <div className="relative">
        {isDark ? (
          // Sun icon for light mode - Beautiful animated sun
          <svg className="w-6 h-6 animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
          </svg>
        ) : (
          // Moon icon for dark mode - Beautiful crescent moon
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
          </svg>
        )}
        
        {/* Glow effect */}
        <div className={`
          absolute inset-0 rounded-full blur-md opacity-75 -z-10
          ${isDark 
            ? 'warning-gradient' 
            : 'primary-gradient'
          }
        `}></div>
      </div>
      
      {/* Tooltip text */}
      <span className="sr-only">
        {isDark ? t('common.switchToLight') : t('common.switchToDark')}
      </span>
    </button>
  );
};

export default ThemeToggle;

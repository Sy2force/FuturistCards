import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "../../hooks/useTranslation";

const SearchBar = ({ 
  onSearch, 
  placeholder, 
  className = "", 
  showFilters = false,
  onFilterToggle,
  suggestions = [],
  showSuggestions = false,
  debounceMs = 300
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);
  const suggestionRef = useRef(null);
  
  const defaultPlaceholder = placeholder || t('search.placeholder');

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
      onSearch(searchTerm);
    }, debounceMs);
    
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchTerm, onSearch, debounceMs]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (showSuggestions && value.length > 0) {
      setShowSuggestionsList(true);
    } else {
      setShowSuggestionsList(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowSuggestionsList(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestionsList(false);
    onSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestionsList(false);
      inputRef.current?.blur();
    }
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon 
            className={`h-5 w-5 transition-colors duration-200 ${
              isFocused 
                ? 'text-blue-500' 
                : 'text-gray-400 dark:text-gray-500'
            }`} 
          />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (showSuggestions && searchTerm.length > 0) {
              setShowSuggestionsList(true);
            }
          }}
          onBlur={() => {
            setIsFocused(false);
            // Delay hiding suggestions to allow for clicks
            setTimeout(() => setShowSuggestionsList(false), 150);
          }}
          onKeyDown={handleKeyDown}
          className={`
            w-full pl-10 ${showFilters ? 'pr-20' : 'pr-10'} py-2 
            bg-white dark:bg-gray-800 
            border border-gray-300 dark:border-gray-600 
            rounded-lg
            text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${isFocused ? 'shadow-md' : 'shadow-sm'}
          `}
          placeholder={defaultPlaceholder}
          autoComplete="off"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center">
          {showFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onFilterToggle}
              className="mr-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title={t('search.filters')}
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
            </motion.button>
          )}
          
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="mr-3 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              title={t('search.clear')}
            >
              <XMarkIcon className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </div>
      
      {/* Search Status */}
      {searchTerm && !showSuggestionsList && (
        <motion.div 
          className="absolute top-full left-0 right-0 mt-1 text-xs text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {t('search.searching')}: &quot;{searchTerm}&quot;
        </motion.div>
      )}
      
      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestionsList && filteredSuggestions.length > 0 && (
          <motion.div
            ref={suggestionRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-center">
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">{suggestion}</span>
                </div>
              </motion.button>
            ))}
            
            {searchTerm && !filteredSuggestions.some(s => s.toLowerCase() === searchTerm.toLowerCase()) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700"
              >
                {t('search.pressEnter')}: &quot;{searchTerm}&quot;
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

SearchBar.defaultProps = {
  showFilters: false,
  suggestions: [],
  showSuggestions: false,
  debounceMs: 300,
  onFilterToggle: () => {},
  onSearch: () => {}
};

export default SearchBar;

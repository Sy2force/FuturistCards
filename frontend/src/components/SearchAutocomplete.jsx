import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { debounce } from 'lodash';

const SearchAutocomplete = ({
  placeholder = "Rechercher des cartes...",
  onSearch,
  onSuggestionSelect,
  className = "",
  disabled = false
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const inputRef = useRef(null);
  const suggestionRefs = useRef([]);

  // Sample data for suggestions (in real app, this would come from API)
  const sampleSuggestions = [
    { type: 'category', value: 'technology', label: 'Technologie', count: 45 },
    { type: 'category', value: 'creative', label: 'Créatif', count: 32 },
    { type: 'category', value: 'marketing', label: 'Marketing', count: 28 },
    { type: 'category', value: 'consulting', label: 'Conseil', count: 15 },
    { type: 'tag', value: 'react', label: 'React', count: 23 },
    { type: 'tag', value: 'nodejs', label: 'Node.js', count: 18 },
    { type: 'tag', value: 'design', label: 'Design', count: 35 },
    { type: 'tag', value: 'ui', label: 'UI', count: 29 },
    { type: 'tag', value: 'ux', label: 'UX', count: 27 },
    { type: 'tag', value: 'javascript', label: 'JavaScript', count: 31 },
    { type: 'location', value: 'tel-aviv', label: 'Tel Aviv', count: 67 },
    { type: 'location', value: 'jerusalem', label: 'Jérusalem', count: 43 },
    { type: 'location', value: 'haifa', label: 'Haïfa', count: 25 },
    { type: 'person', value: 'john-doe', label: 'John Doe', count: 1 },
    { type: 'person', value: 'sarah-cohen', label: 'Sarah Cohen', count: 1 },
    { type: 'person', value: 'david-levi', label: 'David Levi', count: 1 }
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('futuristcards_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const filtered = sampleSuggestions.filter(item =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.value.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 8);
        
        setSuggestions(filtered);
        setLoading(false);
      }, 200);
    }, 300),
    []
  );

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (value.trim()) {
      setIsOpen(true);
      debouncedSearch(value);
    } else {
      setIsOpen(false);
      setSuggestions([]);
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    if (query.trim()) {
      setIsOpen(true);
    } else if (recentSearches.length > 0) {
      setSuggestions(recentSearches.slice(0, 5));
      setIsOpen(true);
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    // Delay to allow clicking on suggestions
    setTimeout(() => {
      setIsOpen(false);
      setSelectedIndex(-1);
    }, 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.label);
    setIsOpen(false);
    setSelectedIndex(-1);
    
    // Add to recent searches
    addToRecentSearches(suggestion);
    
    // Call callbacks
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    }
    if (onSearch) {
      onSearch(suggestion.label, suggestion);
    }
  };

  // Handle search submit
  const handleSearch = () => {
    if (!query.trim()) return;
    
    const searchItem = {
      type: 'search',
      value: query.toLowerCase().replace(/\s+/g, '-'),
      label: query,
      count: 0
    };
    
    addToRecentSearches(searchItem);
    setIsOpen(false);
    
    if (onSearch) {
      onSearch(query, searchItem);
    }
  };

  // Add to recent searches
  const addToRecentSearches = (item) => {
    const updated = [
      item,
      ...recentSearches.filter(search => search.value !== item.value)
    ].slice(0, 10);
    
    setRecentSearches(updated);
    localStorage.setItem('futuristcards_recent_searches', JSON.stringify(updated));
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('futuristcards_recent_searches');
  };

  // Get suggestion icon
  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'category':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      case 'tag':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        );
      case 'location':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'person':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'search':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 pl-12 pr-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
        />
        
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
          </div>
        )}

        {/* Clear Button */}
        {query && !loading && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && (suggestions.length > 0 || (!query && recentSearches.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto"
          >
            {/* Recent Searches Header */}
            {!query && recentSearches.length > 0 && (
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                <span className="text-white/70 text-sm font-medium">Recherches récentes</span>
                <button
                  onClick={clearRecentSearches}
                  className="text-white/50 hover:text-white/80 text-sm transition-colors"
                >
                  Effacer
                </button>
              </div>
            )}

            {/* Suggestions List */}
            <div className="py-2">
              {(query ? suggestions : recentSearches.slice(0, 5)).map((suggestion, index) => (
                <motion.button
                  key={`${suggestion.type}-${suggestion.value}`}
                  ref={el => suggestionRefs.current[index] = el}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-white/10 transition-colors text-left ${
                    selectedIndex === index ? 'bg-white/10' : ''
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="text-white/60">
                    {getSuggestionIcon(suggestion.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">
                      {suggestion.label}
                    </div>
                    {suggestion.count > 0 && (
                      <div className="text-white/50 text-sm">
                        {suggestion.count} résultat{suggestion.count > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  <div className="text-white/40 text-xs uppercase tracking-wider">
                    {suggestion.type === 'search' ? 'récent' : suggestion.type}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* No Results */}
            {query && suggestions.length === 0 && !loading && (
              <div className="px-4 py-6 text-center text-white/50">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>Aucune suggestion trouvée</p>
                <p className="text-sm mt-1">Appuyez sur Entrée pour rechercher "{query}"</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchAutocomplete;

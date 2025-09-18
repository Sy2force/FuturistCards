import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  ClockIcon,
  TagIcon,
  MapPinIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const SearchSystem = ({ onSearch, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    dateRange: '',
    sortBy: 'newest'
  });
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Debounced search
    const timer = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
        generateSuggestions();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;

    // Add to recent searches
    const newRecentSearches = [
      query,
      ...recentSearches.filter(s => s !== query)
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));

    // Trigger search
    onSearch?.(query, filters);
  };

  const generateSuggestions = () => {
    // Mock suggestions based on query
    const mockSuggestions = [
      { type: 'category', text: 'Technology', icon: TagIcon },
      { type: 'location', text: 'Tel Aviv', icon: MapPinIcon },
      { type: 'user', text: 'Business Cards', icon: UserIcon },
      { type: 'recent', text: query, icon: ClockIcon }
    ];
    setSuggestions(mockSuggestions);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    onSearch?.('', filters);
  };

  const categories = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Food & Beverage', 'Real Estate', 'Legal', 'Consulting', 'Marketing'
  ];

  const locations = [
    'Tel Aviv', 'Jerusalem', 'Haifa', 'Eilat', 'Netanya', 'Ashdod'
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <motion.div
          className={`
            glass border border-white/20 rounded-2xl p-4 transition-all duration-300
            ${isOpen ? 'border-blue-400/50 shadow-lg shadow-blue-400/20' : ''}
          `}
        >
          <div className="flex items-center space-x-3">
            <MagnifyingGlassIcon className="h-6 w-6 text-white/60" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder="Rechercher des cartes, entreprises, catégories..."
              className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-lg"
            />
            {query && (
              <button
                onClick={clearSearch}
                className="text-white/60 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Search Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 glass border border-white/20 rounded-2xl p-4 backdrop-blur-md z-50"
            >
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-white/80 text-sm font-medium mb-2">Suggestions</h3>
                  <div className="space-y-1">
                    {suggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setQuery(suggestion.text);
                            setIsOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-colors text-left"
                        >
                          <Icon className="h-4 w-4 text-white/60" />
                          <span className="text-white/80">{suggestion.text}</span>
                          <span className="text-white/40 text-xs ml-auto capitalize">
                            {suggestion.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-white/80 text-sm font-medium mb-2">Recherches récentes</h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(search);
                          setIsOpen(false);
                        }}
                        className="px-3 py-1 bg-white/10 rounded-full text-white/80 text-sm hover:bg-white/20 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Catégorie
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="" className="bg-gray-800">Toutes</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat} className="bg-gray-800">{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Localisation
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="" className="bg-gray-800">Toutes</option>
                    {locations.map(loc => (
                      <option key={loc} value={loc} className="bg-gray-800">{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Trier par
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="newest" className="bg-gray-800">Plus récent</option>
                    <option value="oldest" className="bg-gray-800">Plus ancien</option>
                    <option value="popular" className="bg-gray-800">Plus populaire</option>
                    <option value="alphabetical" className="bg-gray-800">Alphabétique</option>
                  </select>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchSystem;

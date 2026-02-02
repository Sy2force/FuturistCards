import { useState, useEffect, useCallback } from 'react';

// Search configuration
const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300
};

const CardSearch = ({ onSearch, initialQuery = '', initialFilters = {}, resultsCount = 0 }) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'newest',
    ...initialFilters
  });
  const [isExpanded, setIsExpanded] = useState(false);

  // Search with debounce delay
  const debouncedSearch = useCallback((searchQuery, searchFilters) => {
    const timeoutId = setTimeout(() => {
      onSearch?.(searchQuery, searchFilters);
    }, SEARCH_CONFIG.DEBOUNCE_DELAY);
    return () => clearTimeout(timeoutId);
  }, [onSearch]);

  useEffect(() => {
    if (query.length >= SEARCH_CONFIG.MIN_QUERY_LENGTH || query.length === 0) {
      debouncedSearch(query, filters);
    }
  }, [query, filters, debouncedSearch]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setQuery('');
    setFilters({
      category: '',
      sortBy: 'newest'
    });
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Categories for filtering
  const categories = [
    { value: '', label: 'all Categories' },
    { value: 'business', label: 'business' },
    { value: 'personal', label: 'personal' },
    { value: 'creative', label: 'creative' },
    { value: 'professional', label: 'professional' },
    { value: 'networking', label: 'networking' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'newest' },
    { value: 'oldest', label: 'oldest' },
    { value: 'name', label: 'name' },
    { value: 'popular', label: 'popular' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      {/* Main Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        {/* Search Input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search cards..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Quick Sort */}
        <div className="flex gap-2">
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Advanced Filters Toggle */}
          <button
            onClick={toggleExpanded}
            className={`px-4 py-2 rounded-md border transition-colors ${
              isExpanded 
                ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
          >
            <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {'category'}
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
              >
                {'clear'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(query || filters.category || filters.sortBy !== 'newest') && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
            {'active Filters'}:
          </span>
          {query && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
              &ldquo;{query}&rdquo;
              <button
                onClick={() => setQuery('')}
                className="hover:text-blue-600 dark:hover:text-blue-300"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
              {categories.find(c => c.value === filters.category)?.label}
              <button
                onClick={() => handleFilterChange('category', '')}
                className="hover:text-green-600 dark:hover:text-green-300"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </span>
          )}
          {filters.sortBy !== 'newest' && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
              {sortOptions.find(s => s.value === filters.sortBy)?.label}
              <button
                onClick={() => handleFilterChange('sortBy', 'newest')}
                className="hover:text-purple-600 dark:hover:text-purple-300"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </span>
          )}
        </div>
      )}

      {/* Results Count */}
      {resultsCount > 0 && (
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Found {resultsCount} result{resultsCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default CardSearch;

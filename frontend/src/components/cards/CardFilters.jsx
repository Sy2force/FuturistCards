import { useI18n } from '../../hooks/useI18n';
import { useTheme } from '../../contexts/ThemeContext';

const CardFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy,
  viewMode,
  setViewMode,
  resultsCount,
  categories,
  sortOptions
}) => {
  const { t, isRTL } = useI18n();
  const { isDark } = useTheme();

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('newest');
  };

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || sortBy !== 'newest';

  return (
    <div className={`mb-8 ${isDark ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm rounded-xl p-6 border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Main Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            🔍 {t('common.search')}
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder={t('cards.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} rounded-lg border ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
            />
            <div className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2`}>
              <svg className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 ${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            📂 {t('cards.filterByCategory')}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            🔄 {t('cards.sortBy')}
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${
              isDark 
                ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors`}
          >
            <option value=''>{t('filters.allCategories')}</option>
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Summary and Controls */}
      <div className={`pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div className="flex items-center gap-4">
          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <span className="font-medium">{resultsCount}</span> {t('cards.totalCards')}
            {searchTerm && (
              <span className="ml-2">
                • {t('common.searchResults')} &ldquo;<span className="font-medium">{searchTerm}</span>&rdquo;
              </span>
            )}
          </div>
          
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className={`text-sm px-3 py-1 rounded-full transition-colors ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {t('common.clearFilters')}
            </button>
          )}
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Vue:
          </span>
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
              }`}
              title={t('common.gridView')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
              }`}
              title={t('common.listView')}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filter Tags */}
      {categories.length > 1 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
            {t('cards.quickFilters')}:
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.slice(1, 6).map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-500 text-white'
                    : isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardFilters;

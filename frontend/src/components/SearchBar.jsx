import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cards?search=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="relative"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('searchPlaceholder')}
        data-testid="search-input"
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-300"
        whileFocus={{ scale: 1.01 }}
      />
      <motion.div
        className="absolute left-3 top-1/2 transform -translate-y-1/2"
        animate={{ rotate: query ? 360 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </motion.div>
    </motion.form>
  );
};

export default SearchBar;

import React from 'react';
import { motion } from 'framer-motion';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ButtonGlass from './ButtonGlass';

const FilterBar = ({
  filters = {},
  onFilterChange,
  onClearFilters,
  options = {},
  className = ''
}) => {
  const {
    categories = [],
    roles = [],
    statuses = [],
    dateRanges = []
  } = options;

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilter = (key) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFilterChange(newFilters);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <FunnelIcon className="h-5 w-5 text-white/70" />
          <h3 className="text-white font-medium">Filtres</h3>
        </div>
        
        {hasActiveFilters && (
          <ButtonGlass
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300"
          >
            <XMarkIcon className="h-4 w-4 mr-1" />
            Effacer tout
          </ButtonGlass>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Filtre par catégorie */}
        {categories.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Catégorie
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="">Toutes les catégories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value} className="bg-slate-800">
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtre par rôle */}
        {roles.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Rôle
            </label>
            <select
              value={filters.role || ''}
              onChange={(e) => handleFilterChange('role', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="">Tous les rôles</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value} className="bg-slate-800">
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtre par statut */}
        {statuses.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Statut
            </label>
            <select
              value={filters.status || ''}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="">Tous les statuts</option>
              {statuses.map((status) => (
                <option key={status.value} value={status.value} className="bg-slate-800">
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filtre par période */}
        {dateRanges.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Période
            </label>
            <select
              value={filters.dateRange || ''}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            >
              <option value="">Toutes les périodes</option>
              {dateRanges.map((range) => (
                <option key={range.value} value={range.value} className="bg-slate-800">
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Filtres actifs */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              
              let label = value;
              
              // Trouver le label correspondant dans les options
              if (key === 'category') {
                const category = categories.find(c => c.value === value);
                label = category ? category.label : value;
              } else if (key === 'role') {
                const role = roles.find(r => r.value === value);
                label = role ? role.label : value;
              } else if (key === 'status') {
                const status = statuses.find(s => s.value === value);
                label = status ? status.label : value;
              } else if (key === 'dateRange') {
                const range = dateRanges.find(r => r.value === value);
                label = range ? range.label : value;
              }

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center space-x-1 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm"
                >
                  <span>{label}</span>
                  <button
                    onClick={() => clearFilter(key)}
                    className="hover:text-blue-200 transition-colors"
                  >
                    <XMarkIcon className="h-3 w-3" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FilterBar;

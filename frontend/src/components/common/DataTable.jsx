import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import ButtonGlass from './ButtonGlass';
import LoadingSpinner from '../ui/LoadingSpinner';

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  sortable = true,
  actions = [],
  onRowClick,
  className = '',
  emptyMessage = 'Aucune donnée disponible'
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [expandedRows] = useState(new Set());

  // Fonction de tri
  const handleSort = (key) => {
    if (!sortable) return;

    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Données triées
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Basculer l'expansion d'une ligne
  // const toggleRowExpansion = (rowId) => {
  //   const newExpanded = new Set(expandedRows);
  //   if (newExpanded.has(rowId)) {
  //     newExpanded.delete(rowId);
  //   } else {
  //     newExpanded.add(rowId);
  //   }
  //   setExpandedRows(newExpanded);
  // };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
        <LoadingSpinner size="lg" text="Chargement des données..." />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
        <p className="text-white/70">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-4 text-left text-sm font-medium text-white/70 ${
                    sortable && column.sortable !== false ? 'cursor-pointer hover:text-white' : ''
                  }`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.title}</span>
                    {sortable && column.sortable !== false && (
                      <div className="flex flex-col">
                        <ChevronUpIcon 
                          className={`h-3 w-3 ${
                            sortConfig.key === column.key && sortConfig.direction === 'asc'
                              ? 'text-blue-400'
                              : 'text-white/30'
                          }`}
                        />
                        <ChevronDownIcon 
                          className={`h-3 w-3 -mt-1 ${
                            sortConfig.key === column.key && sortConfig.direction === 'desc'
                              ? 'text-blue-400'
                              : 'text-white/30'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-6 py-4 text-right text-sm font-medium text-white/70">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <React.Fragment key={row.id || index}>
                <motion.tr
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 text-sm text-white">
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {actions.map((action, actionIndex) => (
                          <ButtonGlass
                            key={actionIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              action.onClick(row);
                            }}
                            variant="ghost"
                            size="sm"
                            className={action.className || ''}
                            disabled={action.disabled && action.disabled(row)}
                          >
                            {action.icon && <action.icon className="h-4 w-4" />}
                            {action.label && <span className="ml-1">{action.label}</span>}
                          </ButtonGlass>
                        ))}
                      </div>
                    </td>
                  )}
                </motion.tr>
                
                {/* Ligne étendue (optionnelle) */}
                {expandedRows.has(row.id) && row.expandedContent && (
                  <tr>
                    <td colSpan={columns.length + (actions.length > 0 ? 1 : 0)} className="px-6 py-4 bg-white/5">
                      {row.expandedContent}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

// Composant de cellule avec statut
export const StatusCell = ({ status, labels = {} }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'published':
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
      case 'draft':
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'blocked':
      case 'rejected':
      case 'deleted':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const label = labels[status] || status;

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      {label}
    </span>
  );
};

// Composant de cellule avec avatar
export const AvatarCell = ({ user, showEmail = false }) => {
  const initials = user.firstName && user.lastName 
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user.email ? user.email[0].toUpperCase() : '?';

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        {user.avatar ? (
          <img className="h-8 w-8 rounded-full" src={user.avatar} alt="" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-medium">
            {initials}
          </div>
        )}
      </div>
      <div>
        <div className="text-sm font-medium text-white">
          {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}
        </div>
        {showEmail && user.firstName && user.lastName && (
          <div className="text-sm text-white/70">{user.email}</div>
        )}
      </div>
    </div>
  );
};

// Composant de cellule avec date formatée
export const DateCell = ({ date, format = 'short' }) => {
  if (!date) return <span className="text-white/50">-</span>;

  const dateObj = new Date(date);
  const now = new Date();
  const diffTime = Math.abs(now - dateObj);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let formattedDate;
  if (format === 'relative') {
    if (diffDays === 0) {
      formattedDate = "Aujourd'hui";
    } else if (diffDays === 1) {
      formattedDate = 'Hier';
    } else if (diffDays < 7) {
      formattedDate = `Il y a ${diffDays} jours`;
    } else {
      formattedDate = dateObj.toLocaleDateString('fr-FR');
    }
  } else if (format === 'full') {
    formattedDate = dateObj.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } else {
    formattedDate = dateObj.toLocaleDateString('fr-FR');
  }

  return (
    <span className="text-white/90" title={dateObj.toLocaleString('fr-FR')}>
      {formattedDate}
    </span>
  );
};

export default DataTable;

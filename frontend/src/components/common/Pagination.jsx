import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import ButtonGlass from './ButtonGlass';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showInfo = true,
  totalItems = 0,
  itemsPerPage = 10,
  className = ''
}) => {
  // Calculer les pages à afficher
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      {/* Informations sur les éléments */}
      {showInfo && (
        <div className="text-sm text-white/70">
          Affichage de {startItem} à {endItem} sur {totalItems} résultats
        </div>
      )}

      {/* Navigation de pagination */}
      <div className="flex items-center space-x-2">
        {/* Bouton Précédent */}
        <ButtonGlass
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="ghost"
          size="sm"
          className="px-3 py-2"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Précédent</span>
        </ButtonGlass>

        {/* Numéros de page */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-white/50">...</span>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(page)}
                  className={`
                    px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${page === currentPage
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30 shadow-lg shadow-blue-500/20'
                      : 'text-white/70 hover:text-white hover:bg-white/10 border border-transparent'
                    }
                  `}
                >
                  {page}
                </motion.button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bouton Suivant */}
        <ButtonGlass
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="ghost"
          size="sm"
          className="px-3 py-2"
        >
          <span className="hidden sm:inline mr-1">Suivant</span>
          <ChevronRightIcon className="h-4 w-4" />
        </ButtonGlass>
      </div>
    </motion.div>
  );
};

// Composant de pagination simple pour les cas basiques
export const SimplePagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4">
      <ButtonGlass
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="ghost"
        size="sm"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </ButtonGlass>
      
      <span className="text-white/70 text-sm">
        Page {currentPage} sur {totalPages}
      </span>
      
      <ButtonGlass
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="ghost"
        size="sm"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </ButtonGlass>
    </div>
  );
};

export default Pagination;

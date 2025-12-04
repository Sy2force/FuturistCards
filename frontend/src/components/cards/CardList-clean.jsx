import React, { useState, useEffect } from 'react';
import { cardsAPI } from '../../services/api-clean';
import LoadingSpinner from '../common/LoadingSpinner-clean';
import ErrorMessage from '../common/ErrorMessage-clean';
import CardItem from './CardItem-clean';

const CardList = ({ searchQuery = '', showMyCards = false }) => {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchCards();
  }, [searchQuery, showMyCards, pagination.page]);

  const fetchCards = async () => {
    setIsLoading(true);
    setError('');

    try {
      let response;
      const params = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (searchQuery) {
        response = await cardsAPI.search(searchQuery, params);
      } else if (showMyCards) {
        response = await cardsAPI.getMy(params);
      } else {
        response = await cardsAPI.getAll(params);
      }

      setCards(response.data.cards || []);
      if (response.data.pagination) {
        setPagination(prev => ({
          ...prev,
          ...response.data.pagination,
        }));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleCardUpdate = (updatedCard) => {
    setCards(prev => 
      prev.map(card => 
        card.id === updatedCard.id ? updatedCard : card
      )
    );
  };

  const handleCardDelete = (deletedCardId) => {
    setCards(prev => prev.filter(card => card.id !== deletedCardId));
  };

  if (isLoading && cards.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onClose={() => setError('')}
        className="mb-6"
      />
    );
  }

  if (cards.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-gray-400">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          {searchQuery ? 'Aucun résultat trouvé' : 'Aucune carte disponible'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          {searchQuery 
            ? 'Essayez avec d\'autres mots-clés'
            : showMyCards 
              ? 'Commencez par créer votre première carte'
              : 'Aucune carte publique n\'est disponible pour le moment'
          }
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Grille des cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            onUpdate={handleCardUpdate}
            onDelete={handleCardDelete}
            showActions={showMyCards}
          />
        ))}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="mt-8 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            {/* Bouton précédent */}
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1 || isLoading}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Précédent</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Numéros de page */}
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={isLoading}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  page === pagination.page
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {page}
              </button>
            ))}

            {/* Bouton suivant */}
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages || isLoading}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Suivant</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}

      {/* Indicateur de chargement pour pagination */}
      {isLoading && cards.length > 0 && (
        <div className="mt-4 flex justify-center">
          <LoadingSpinner size="small" />
        </div>
      )}
    </div>
  );
};

export default CardList;

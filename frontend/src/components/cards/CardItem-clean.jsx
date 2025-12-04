import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cardsAPI, favoritesAPI } from '../../services/api-clean';
import { useAuth } from '../../context/AuthContext-clean';

const CardItem = ({ card, onUpdate, onDelete, showActions = false }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likesCount, setLikesCount] = useState(card.likesCount || 0);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useAuth();

  const handleLike = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || isLoading) return;

    setIsLoading(true);
    try {
      const response = await cardsAPI.toggleLike(card.id);
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error('Erreur lors du like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!isAuthenticated || isLoading) return;

    setIsLoading(true);
    try {
      if (isFavorite) {
        await favoritesAPI.remove(card.id);
        setIsFavorite(false);
      } else {
        await favoritesAPI.add(card.id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout aux favoris:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette carte ?')) {
      return;
    }

    try {
      await cardsAPI.delete(card.id);
      onDelete(card.id);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* Image de la carte */}
      {card.image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Contenu de la carte */}
      <div className="p-4">
        {/* En-tête */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {card.title}
            </h3>
            {card.subtitle && (
              <p className="text-sm text-gray-600 truncate">
                {card.subtitle}
              </p>
            )}
          </div>
          
          {/* Actions rapides */}
          <div className="flex items-center space-x-1 ml-2">
            {isAuthenticated && !showActions && (
              <>
                <button
                  onClick={handleLike}
                  disabled={isLoading}
                  className={`p-1 rounded-full transition-colors ${
                    isLiked
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-red-500'
                  } disabled:opacity-50`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleFavorite}
                  disabled={isLoading}
                  className={`p-1 rounded-full transition-colors ${
                    isFavorite
                      ? 'text-yellow-500 hover:text-yellow-600'
                      : 'text-gray-400 hover:text-yellow-500'
                  } disabled:opacity-50`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Informations de contact */}
        <div className="space-y-1 mb-3">
          {card.email && (
            <p className="text-sm text-gray-600 truncate">
              📧 {card.email}
            </p>
          )}
          {card.phone && (
            <p className="text-sm text-gray-600 truncate">
              📱 {card.phone}
            </p>
          )}
          {card.company && (
            <p className="text-sm text-gray-600 truncate">
              🏢 {card.company}
            </p>
          )}
          {card.position && (
            <p className="text-sm text-gray-600 truncate">
              💼 {card.position}
            </p>
          )}
        </div>

        {/* Description */}
        {card.description && (
          <p className="text-sm text-gray-700 line-clamp-2 mb-3">
            {card.description}
          </p>
        )}

        {/* Tags */}
        {card.tags && card.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {card.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {card.tags.length > 3 && (
              <span className="text-xs text-gray-500">
                +{card.tags.length - 3} autres
              </span>
            )}
          </div>
        )}

        {/* Statistiques */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              {card.views || 0}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              {likesCount}
            </span>
          </div>
          <span>
            {new Date(card.createdAt).toLocaleDateString('fr-FR')}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Link
            to={`/cards/${card.id}`}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Voir détails
          </Link>

          {showActions && (
            <div className="flex items-center space-x-2">
              <Link
                to={`/cards/${card.id}/edit`}
                className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Modifier
              </Link>
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardItem;

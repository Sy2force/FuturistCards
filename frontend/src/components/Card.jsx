import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, PencilIcon, TrashIcon, CameraIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '../context/FavoritesContext';

const Card = ({ 
  card, 
  onDelete, 
  onEdit, 
  showActions = false 
}) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/cards/${card._id}`}>
        <img 
          src={card.image || 'https://via.placeholder.com/300x200'} 
          alt={card.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {card.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {card.company} • {card.position}
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm line-clamp-2">
          {card.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => toggleFavorite(card.id || card._id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            {isFavorite(card.id || card._id) ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
            <span className="text-sm">Favoris</span>
          </button>
          
          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(card._id)}
                className="p-1 text-blue-500 hover:bg-blue-100 rounded transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(card._id)}
                className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;

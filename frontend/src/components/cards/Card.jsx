// import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import LikeButton from '../ui/LikeButton';

const Card = ({ 
  card, 
  onDelete, 
  onEdit, 
  showActions = false 
}) => {
  const { toggleFavorite: _toggleFavorite, isFavorite: _isFavorite } = useFavorites();
  
  return (
    <article
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
      role="article"
      aria-labelledby={`card-title-${card._id}`}
      aria-describedby={`card-description-${card._id}`}
    >
      <div className="relative overflow-hidden">
        <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
          {(card.image?.url || card.image) ? (
            <img 
              src={card.image?.url || card.image} 
              alt={card.image?.alt || card.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110 cursor-pointer"
              onClick={() => {/* Image preview */}}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div 
            className={`absolute inset-0 flex items-center justify-center cursor-pointer ${(card.image?.url || card.image) ? 'hidden' : 'flex'}`}
            onClick={() => {/* Image preview */}}
          >
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{card.title}</p>
              <p className="text-gray-400 dark:text-gray-500 text-xs">{card.category ? card.category || card.category : 'Category'}</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/90 dark:bg-gray-800/90 p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1" data-testid="card-title">
            {card.title}
          </h3>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-2">
            <svg className="w-4 h-4 inline mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="mr-2">{card.subtitle || 'position'}</span>
            <span className="text-gray-400">•</span>
            <svg className="w-4 h-4 inline ml-2 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{card.category ? card.category || card.category : 'Category'}</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {card.description}
          </p>
        </div>
        
        {/* Contact Info Icons */}
        <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500 dark:text-gray-400">
          {card.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 inline mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate max-w-[80px]">{card.email}</span>
            </div>
          )}
          {card.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 inline mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
              </svg>
              <span>{card.phone}</span>
            </div>
          )}
          {card.website && (
            <div className="flex items-center">
              <svg className="w-4 h-4 inline mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="truncate max-w-[60px]">Website</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <LikeButton 
            cardId={card.id || card._id}
            size="md"
            showCount={true}
            className="flex-1"
          />
          
          {showActions && (onEdit || onDelete) && (
            <div className="flex space-x-2">
              {onEdit && (
                <button
                  onClick={() => onEdit(card._id || card.id)}
                  data-testid="edit-card-btn"
                  className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 shadow-sm hover:scale-110"
                  aria-label="Edit Card"
                >
                  <span className="text-lg">✏️</span>
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(card._id || card.id)}
                  data-testid="delete-card-btn"
                  className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 shadow-sm hover:scale-110"
                  aria-label="Delete Card"
                >
                  <span className="text-lg">🗑️</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card preview - Removed unused component */}
    </article>
  );
};

export default Card;

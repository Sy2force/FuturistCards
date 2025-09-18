import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import { useApiCall } from '../../hooks/useAxios';
import api from '../../api/axios';
import ButtonGlass from './ButtonGlass';

const Card = ({ 
  card, 
  showActions = true, 
  onFavoriteToggle,
  onLike,
  className = ""
}) => {
  const { user } = useAuth();
  const { execute } = useApiCall();
  const [isFavorite, setIsFavorite] = useState(false);
  const [likesCount, setLikesCount] = useState(card.likesCount || 0);
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    setLoading(true);
    const result = await execute(async () => {
      const response = await api.post(`/favorites/toggle/${card._id}`);
      return response.data;
    });

    if (result.success) {
      setIsFavorite(!isFavorite);
      onFavoriteToggle?.(card._id, !isFavorite);
    }
    setLoading(false);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) return;
    
    const result = await execute(async () => {
      const response = await api.post(`/cards/${card._id}/like`);
      return response.data;
    });

    if (result.success) {
      setLikesCount(prev => prev + 1);
      onLike?.(card._id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`business-card group ${className}`}
      data-testid="card-item"
    >
      <Link to={`/cards/${card._id}`} className="block h-full">
        {/* Card Image */}
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
          <img
            src={card.image?.url || '/default-card-image.jpg'}
            alt={card.image?.alt || card.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Favorite Button */}
          {user && showActions && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteToggle}
              disabled={loading}
              className={`
                absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm border transition-colors
                ${isFavorite 
                  ? 'bg-red-500/20 border-red-400/30 text-red-300' 
                  : 'bg-white/10 border-white/20 text-white/70 hover:text-red-300'
                }
              `}
            >
              {isFavorite ? '❤️' : '🤍'}
            </motion.button>
          )}
          
          {/* Card Title Overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-semibold text-lg truncate">
              {card.title}
            </h3>
            <p className="text-white/80 text-sm truncate">
              {card.subtitle}
            </p>
          </div>
        </div>

        {/* Card Content */}
        <div className="space-y-3">
          {/* Location & Category */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-white/70">
              <span className="mr-1">📍</span>
              <span className="truncate">
                {card.address?.city}, {card.address?.country}
              </span>
            </div>
            <div className="flex items-center text-white/70">
              <span className="mr-1">🏷️</span>
              <span className="truncate">{card.category}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm line-clamp-2 leading-relaxed">
            {card.description}
          </p>

          {/* Tags */}
          {card.tags && card.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {card.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-primary-500/20 text-primary-300 rounded border border-primary-400/30"
                >
                  {tag}
                </span>
              ))}
              {card.tags.length > 3 && (
                <span className="px-2 py-1 text-xs bg-white/10 text-white/50 rounded">
                  +{card.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center space-x-4 text-xs text-white/50">
              <span className="flex items-center">
                ❤️ {likesCount}
              </span>
              <span className="flex items-center">
                👁️ {card.viewsCount || 0}
              </span>
            </div>
            <div className="text-xs text-white/50">
              {new Date(card.createdAt).toLocaleDateString()}
            </div>
          </div>

          {/* Actions */}
          {user && showActions && (
            <div className="flex items-center space-x-2 pt-3">
              <ButtonGlass
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="flex-1"
              >
                👍 Like
              </ButtonGlass>
              <ButtonGlass
                variant="primary"
                size="sm"
                className="flex-1"
              >
                View Details
              </ButtonGlass>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;

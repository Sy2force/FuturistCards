import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
// import cardsAPI from '../../services/cards'; // Unused - using localStorage instead

const Card = ({
  card,
  showActions = true,
  onFavoriteToggle,
  onLike,
  className = '',
}) => {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [likesCount, setLikesCount] = useState(card.likesCount || 0);
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    try {
      setLoading(true);
      
      // Mode mock - gérer les favoris localement
      const favorites = JSON.parse(localStorage.getItem('userFavorites') || '[]');
      const isCurrentlyFavorite = favorites.includes(card._id);
      
      if (isCurrentlyFavorite) {
        const updatedFavorites = favorites.filter(id => id !== card._id);
        localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
      } else {
        favorites.push(card._id);
        localStorage.setItem('userFavorites', JSON.stringify(favorites));
      }
      
      setIsFavorite(!isFavorite);
      onFavoriteToggle?.(card._id, !isFavorite);
    } catch (error) {
      // Error updating favorites
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return;

    try {
      setLikesCount(prev => prev + 1);
      onLike?.(card._id);
    } catch (error) {
      // Favorite toggled
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={`
        relative rounded-2xl p-6 backdrop-blur-md transition-all duration-300 group cursor-pointer
        shadow-xl hover:shadow-2xl transform hover:scale-105
        ${isDark 
          ? 'bg-darkCard text-textLight border border-white/10 hover:border-accent/30 hover:shadow-accent/20' 
          : 'bg-lightCard text-textDark border border-gray-200 hover:border-primary/30 hover:shadow-primary/20'
        }
        ${className}
      `}
      data-testid="card-item"
    >
      <Link to={`/card/${card._id}`} className="block h-full">
        {/* Card Image */}
        <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
          <motion.img
            src={card.image || 'https://picsum.photos/400/300?random=6'}
            alt={card.title}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onError={(e) => {
              e.target.src = 'https://picsum.photos/400/300?random=6';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Professional Badge */}
          {card.category && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30 backdrop-blur-sm">
                {card.category}
              </span>
            </div>
          )}

          {/* Favorite Button */}
          {user && showActions && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteToggle}
              disabled={loading}
              className={`
                absolute top-3 right-3 p-3 rounded-full backdrop-blur-md border transition-all duration-200
                ${
                  isFavorite
                    ? 'bg-red-500/30 border-red-400/50 text-red-200 shadow-lg shadow-red-500/20'
                    : 'bg-white/10 border-white/30 text-white/80 hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-200'
                }
                ${loading ? 'animate-pulse' : ''}
              `}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <span className="text-sm">{isFavorite ? '❤️' : '🤍'}</span>
              )}
            </motion.button>
          )}

          {/* Card Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-white font-bold text-xl mb-1 truncate drop-shadow-lg">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="text-white/90 text-sm truncate drop-shadow-md">
                  {card.subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Card Content */}
        <div className="space-y-4">
          {/* Contact Info */}
          <div className="flex items-center justify-between">
            {card.email && (
              <div className="flex items-center text-white/80 text-sm">
                <span className="mr-2">✉️</span>
                <span className="truncate">{card.email}</span>
              </div>
            )}
            {card.phone && (
              <div className="flex items-center text-white/80 text-sm">
                <span className="mr-2">📞</span>
                <span className="truncate">{card.phone}</span>
              </div>
            )}
          </div>

          {/* Location */}
          {card.address && (
            <div className="flex items-center text-white/70 text-sm">
              <span className="mr-2">📍</span>
              <span className="truncate">
                {card.address?.city || card.address}, {card.address?.country || ''}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-white/70 text-sm line-clamp-3 leading-relaxed">
            {card.description}
          </p>

          {/* Skills/Experience */}
          {(card.skills || card.experience) && (
            <div className="space-y-2">
              {card.skills && (
                <div className="text-xs">
                  <span className="text-blue-300 font-medium">Compétences: </span>
                  <span className="text-white/60">{card.skills}</span>
                </div>
              )}
              {card.experience && (
                <div className="text-xs">
                  <span className="text-green-300 font-medium">Expérience: </span>
                  <span className="text-white/60">{card.experience}</span>
                </div>
              )}
            </div>
          )}

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

          {/* Professional Links */}
          {(card.linkedin || card.github || card.portfolio) && (
            <div className="flex items-center space-x-3 py-2">
              {card.linkedin && (
                <motion.a
                  href={card.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm">💼</span>
                </motion.a>
              )}
              {card.github && (
                <motion.a
                  href={card.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm">🐙</span>
                </motion.a>
              )}
              {card.portfolio && (
                <motion.a
                  href={card.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-sm">🌐</span>
                </motion.a>
              )}
            </div>
          )}

          {/* Stats & Date */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-4 text-xs text-white/60">
              <motion.span 
                className="flex items-center cursor-pointer hover:text-red-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                onClick={handleLike}
              >
                ❤️ {likesCount}
              </motion.span>
              <span className="flex items-center">
                👁️ {card.viewsCount || 0}
              </span>
              {card.availability && (
                <span className="flex items-center text-green-400">
                  🟢 {card.availability}
                </span>
              )}
            </div>
            <div className="text-xs text-white/50">
              {new Date(card.createdAt || Date.now()).toLocaleDateString('fr-FR')}
            </div>
          </div>

          {/* Action Buttons */}
          {user && showActions && (
            <div className="flex items-center space-x-2 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLike}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 text-sm font-medium"
              >
                👍 J'aime
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 text-green-300 rounded-lg hover:from-green-500/30 hover:to-blue-500/30 transition-all duration-200 text-sm font-medium text-center cursor-pointer"
              >
                👁️ Voir détails
              </motion.div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;

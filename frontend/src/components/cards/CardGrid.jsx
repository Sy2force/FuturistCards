import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

const CardGrid = ({ cards, onToggleFavorite, favorites = [], loading = false, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  // Animation config for card grid container
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6">
        {[...Array(20)].map((_, i) => (
          <div key={`skeleton-${i}`} className="animate-pulse">
            <div className="glass rounded-2xl overflow-hidden h-[420px]">
              <div className="h-48 bg-gray-200 dark:bg-white/10"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-white/10 rounded"></div>
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-white/10 rounded w-1/2"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-6 bg-gray-200 dark:bg-white/10 rounded w-16"></div>
                  <div className="h-8 bg-gray-200 dark:bg-white/10 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="glass rounded-2xl p-12 max-w-md mx-auto">
          <span className="w-16 h-16 mx-auto mb-4 text-gray-500 dark:text-white/60 flex items-center justify-center text-4xl">💼</span>
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Aucune carte trouvée</h3>
          <p className="text-gray-600 dark:text-white/60">Essayez de modifier vos filtres ou créez votre première carte</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={`grid gap-4 ${
        viewMode === 'list' 
          ? 'grid-cols-1' 
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
      }`}
    >
      {cards.map((card) => {
        const isFavorite = favorites.includes(card._id) || card.isLiked;
        const rating = card.rating || 4.5;
        
        return (
          <motion.div
            key={card._id}
            variants={cardVariant}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className={`group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md border border-white/20 rounded-2xl hover:border-white/30 transition-all duration-300 cursor-pointer overflow-hidden ${
              viewMode === 'list' 
                ? 'flex flex-row p-4 h-32' 
                : 'flex flex-col p-3'
            }`}
            onClick={() => navigate(`/contact/${card._id}`)}
          >
            {/* Header with image */}
            <div className={`relative overflow-hidden ${
              viewMode === 'list' 
                ? 'w-24 h-24 rounded-xl flex-shrink-0' 
                : 'h-32 rounded-t-xl'
            }`}>
              <img
                src={card.image || 'https://picsum.photos/400/300?random=4'}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://picsum.photos/400/300?random=4';
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                  {card.category || 'Business'}
                </span>
              </div>
              
              {/* Rating */}
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30">
                <span className="w-4 h-4 text-gray-400">💼</span>
                <span className="text-white text-xs font-medium">{rating}</span>
              </div>
              
              {/* Views Counter */}
              <div className="absolute bottom-3 left-3">
                <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full flex items-center gap-1">
                  <EyeIcon className="w-3 h-3" />
                  {card.views || 0}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className={`flex-1 flex flex-col ${
              viewMode === 'list' ? 'ml-4 justify-center' : 'p-3'
            }`}>
              {/* Title */}
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-primary-300 transition-colors leading-tight">
                {card.title}
              </h3>
              
              {/* Company Info */}
              {card.businessInfo && (
                <div className="mb-3">
                  <p className="text-blue-600 dark:text-primary-300 font-semibold text-sm">
                    {card.businessInfo.companyName}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {card.businessInfo.jobTitle}
                  </p>
                </div>
              )}
              
              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-xs mb-3 line-clamp-2 flex-1 leading-relaxed">
                {card.description}
              </p>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={`star-${card._id}-${i}`}
                    className={`w-3 h-3 ${
                      i < Math.floor(rating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-400 dark:text-gray-600'
                    }`
                  }
                  >⭐</span>
                ))}
                <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">({rating})</span>
              </div>
              
              {/* Tags */}
              {card.tags && card.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {card.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-gray-200 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-300 dark:border-white/10"
                    >
                      #{tag}
                    </span>
                  ))}
                  {card.tags.length > 2 && (
                    <span className="text-gray-500 dark:text-gray-400 text-xs">+{card.tags.length - 2}</span>
                  )}
                </div>
              )}
              
              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-300 dark:border-white/10">
                {/* Like Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    const handleCardClick = () => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleFavorite?.(card._id);
                    }
                    handleCardClick();
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-200 dark:bg-white/5 hover:bg-gray-300 dark:hover:bg-white/10 rounded-lg border border-gray-300 dark:border-white/10 transition-all group/like"
                >
                  {isFavorite ? (
                    <HeartSolid className="w-3.5 h-3.5 text-red-400 group-hover/like:scale-110 transition-transform" />
                  ) : (
                    <HeartIcon className="w-3.5 h-3.5 text-red-400 group-hover/like:scale-110 transition-transform" />
                  )}
                  <span className="text-gray-700 dark:text-white text-xs">{card.likes || 0}</span>
                </motion.button>
                
                {/* Contact Button */}
                <Link to={`/contact/${card._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 text-xs font-medium rounded-lg border border-primary-400/30 transition-all"
                  >
                    Contact
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default CardGrid;

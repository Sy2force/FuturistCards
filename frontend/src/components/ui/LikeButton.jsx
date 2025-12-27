import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../hooks/useAuth';
import { useI18n } from '../../hooks/useI18n';
import { useFavorites } from '../../context/FavoritesContext';

const LikeButton = ({ 
  cardId, 
  size = 'md', 
  showCount = true, 
  className = '',
  onLikeChange = null
}) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50));
  const [isAnimating, setIsAnimating] = useState(false);
  const [showError, setShowError] = useState(false);

  const isCardFavorite = isFavorite(cardId);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setIsAnimating(true);
    try {
      const willBeLiked = !isLiked;
      setIsLiked(willBeLiked);
      setLikeCount(prev => willBeLiked ? prev + 1 : prev - 1);
      
      // Toggle favorite
      await toggleFavorite(cardId);
      
      if (onLikeChange) {
        onLikeChange({ isLiked: willBeLiked, likesCount: likeCount });
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsAnimating(false);
    }
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      icon: 'w-4 h-4',
      text: 'text-xs',
      padding: 'p-1',
      gap: 'gap-1'
    },
    md: {
      icon: 'w-5 h-5',
      text: 'text-sm',
      padding: 'p-2',
      gap: 'gap-2'
    },
    lg: {
      icon: 'w-6 h-6',
      text: 'text-base',
      padding: 'p-3',
      gap: 'gap-2'
    }
  };

  const config = sizeConfig[size];

  return (
    <div className={`relative inline-flex items-center ${className}`} data-testid="like-button">
      <motion.button
        onClick={handleLikeClick}
        disabled={loading}
        className={`
          flex items-center ${config.gap} ${config.padding}
          rounded-full transition-all duration-200
          ${isLiked 
            ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30' 
            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          }
          ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}
          ${!user ? 'cursor-pointer' : ''}
          ${className}
        `}
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
        initial={false}
        title={!user ? t('auth.loginRequired') : (isLiked ? t('likes.unlike') : t('likes.like'))}
        data-testid="like-button-action"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              className={`${config.icon} border-2 border-current border-t-transparent rounded-full`}
            />
          ) : (
            <motion.div
              key="heart"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isLiked ? (
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  <HeartSolidIcon className={`${config.icon} text-red-500`} />
                </motion.div>
              ) : (
                <HeartIcon className={config.icon} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {showCount && (
          <motion.span
            key={likesCount}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`${config.text} font-medium tabular-nums`}
          >
            {likesCount}
          </motion.span>
        )}
      </motion.button>

      {/* Error Tooltip */}
      <AnimatePresence>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
          >
            <div className="bg-red-600 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
              {!user ? t('auth.loginRequired') : t('common.error')}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-red-600"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hearts animation on like */}
      <AnimatePresence>
        {isLiked && (
          <motion.div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  scale: 0, 
                  x: 0, 
                  y: 0,
                  rotate: 0 
                }}
                animate={{ 
                  opacity: 0, 
                  scale: [0, 1, 0.5], 
                  x: (i - 1) * 20, 
                  y: -30 - i * 10,
                  rotate: (i - 1) * 45
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute left-1/2 top-1/2"
              >
                <HeartSolidIcon className="w-3 h-3 text-red-400" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LikeButton;
export { LikeButton };

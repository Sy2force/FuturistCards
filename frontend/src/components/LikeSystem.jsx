import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const LikeSystem = ({ cardId, initialLikes = 0, initialIsLiked = false, onLikeChange }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLikers, setShowLikers] = useState(false);
  const [recentLikers, setRecentLikers] = useState([]);

  // Mock recent likers data
  const mockLikers = [
    { id: 1, name: 'Sarah Cohen', avatar: '👩‍💼' },
    { id: 2, name: 'David Levi', avatar: '👨‍💻' },
    { id: 3, name: 'Rachel Mizrahi', avatar: '👩‍🎨' },
    { id: 4, name: 'Michael Ben-David', avatar: '👨‍💼' },
    { id: 5, name: 'Yael Goldstein', avatar: '👩‍🔬' }
  ];

  useEffect(() => {
    setLikes(initialLikes);
    setIsLiked(initialIsLiked);
  }, [initialLikes, initialIsLiked]);

  const handleLike = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const newIsLiked = !isLiked;
    const newLikes = newIsLiked ? likes + 1 : likes - 1;

    setIsLiked(newIsLiked);
    setLikes(newLikes);

    // Update recent likers
    if (newIsLiked) {
      const randomLiker = mockLikers[Math.floor(Math.random() * mockLikers.length)];
      setRecentLikers(prev => [randomLiker, ...prev.slice(0, 4)]);
    }

    try {
      await onLikeChange?.(cardId, newIsLiked);
    } catch (error) {
      // Revert on error
      setIsLiked(!newIsLiked);
      setLikes(newIsLiked ? likes : likes + 1);
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <motion.button
          onClick={handleLike}
          disabled={isAnimating}
          className="flex items-center space-x-1 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <AnimatePresence mode="wait">
              {isLiked ? (
                <motion.div
                  key="liked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <HeartSolidIcon className="h-5 w-5 text-red-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="unliked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <HeartIcon className="h-5 w-5 text-white/60 group-hover:text-red-400 transition-colors" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Like animation particles */}
            {isAnimating && isLiked && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-500 rounded-full"
                    initial={{ 
                      scale: 0, 
                      x: 0, 
                      y: 0,
                      opacity: 1 
                    }}
                    animate={{ 
                      scale: [0, 1, 0],
                      x: Math.cos(i * 60 * Math.PI / 180) * 20,
                      y: Math.sin(i * 60 * Math.PI / 180) * 20,
                      opacity: [1, 1, 0]
                    }}
                    transition={{ 
                      duration: 0.6,
                      delay: i * 0.1,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.span
            key={likes}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-sm font-medium text-white/80"
          >
            {likes}
          </motion.span>
        </motion.button>

        {/* Show recent likers on hover */}
        {likes > 0 && (
          <div 
            className="relative"
            onMouseEnter={() => setShowLikers(true)}
            onMouseLeave={() => setShowLikers(false)}
          >
            <div className="flex -space-x-2">
              {recentLikers.slice(0, 3).map((liker, index) => (
                <motion.div
                  key={liker.id}
                  initial={{ scale: 0, x: -10 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xs border-2 border-gray-800"
                >
                  {liker.avatar}
                </motion.div>
              ))}
              {likes > 3 && (
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs border-2 border-gray-800 text-white/60">
                  +{likes - 3}
                </div>
              )}
            </div>

            {/* Likers tooltip */}
            <AnimatePresence>
              {showLikers && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  className="absolute bottom-full left-0 mb-2 p-3 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-white/20 min-w-48 z-10"
                >
                  <div className="text-white/80 text-xs font-medium mb-2">
                    Aimé par {likes} personne{likes > 1 ? 's' : ''}
                  </div>
                  <div className="space-y-1">
                    {recentLikers.slice(0, 5).map((liker) => (
                      <div key={liker.id} className="flex items-center space-x-2">
                        <span className="text-sm">{liker.avatar}</span>
                        <span className="text-white/70 text-xs">{liker.name}</span>
                      </div>
                    ))}
                    {likes > 5 && (
                      <div className="text-white/50 text-xs">
                        et {likes - 5} autre{likes - 5 > 1 ? 's' : ''}...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikeSystem;

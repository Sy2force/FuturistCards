import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const API_URL = 'https://futuristcards.onrender.com/api';

const LikeButton = ({ 
  cardId, 
  initialLikes = [],
  size = 'md', 
  showCount = true, 
  className = '',
  onLikeChange = null
}) => {
  const { user } = useAuth();
  const [likes, setLikes] = useState(Array.isArray(initialLikes) ? initialLikes : []);
  const [loading, setLoading] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  const isLiked = user && likes.some(like => 
    like === user._id || 
    like === user.id || 
    like._id === user._id ||
    like.user === user._id
  );

  const likeCount = likes.length;

  useEffect(() => {
    if (Array.isArray(initialLikes)) {
      setLikes(initialLikes);
    }
  }, [initialLikes]);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please login to like cards');
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch(`${API_URL}/cards/${cardId}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        const newLikes = data.likes || [];
        setLikes(newLikes);
        
        const nowLiked = newLikes.some(like => 
          like === user._id || 
          like === user.id || 
          like._id === user._id
        );

        if (nowLiked) {
          setShowParticles(true);
          setTimeout(() => setShowParticles(false), 1000);
          toast.success('Liked!', { duration: 1500 });
        } else {
          toast('Unliked', { duration: 1500 });
        }

        if (onLikeChange) {
          onLikeChange({ isLiked: nowLiked, likesCount: newLikes.length, likes: newLikes });
        }
      } else {
        const willBeLiked = !isLiked;
        const newLikes = willBeLiked 
          ? [...likes, user._id]
          : likes.filter(l => l !== user._id && l._id !== user._id);
        
        setLikes(newLikes);
        
        if (willBeLiked) {
          setShowParticles(true);
          setTimeout(() => setShowParticles(false), 1000);
          toast.success('Liked!', { duration: 1500 });
        } else {
          toast('Unliked', { duration: 1500 });
        }
      }
    } catch (error) {
      const willBeLiked = !isLiked;
      const newLikes = willBeLiked 
        ? [...likes, user._id]
        : likes.filter(l => l !== user._id && l._id !== user._id);
      
      setLikes(newLikes);
      
      if (willBeLiked) {
        setShowParticles(true);
        setTimeout(() => setShowParticles(false), 1000);
      }
    } finally {
      setLoading(false);
    }
  };

  const sizeConfig = {
    sm: { icon: 'w-5 h-5', text: 'text-sm', padding: 'px-3 py-1.5', gap: 'gap-1.5' },
    md: { icon: 'w-6 h-6', text: 'text-base', padding: 'px-4 py-2', gap: 'gap-2' },
    lg: { icon: 'w-7 h-7', text: 'text-lg', padding: 'px-5 py-2.5', gap: 'gap-2' }
  };

  const config = sizeConfig[size];

  return (
    <div className={`relative inline-flex items-center ${className}`} data-testid="like-button">
      <motion.button
        onClick={handleLikeClick}
        disabled={loading}
        className={`
          flex items-center ${config.gap} ${config.padding}
          rounded-full font-semibold transition-all duration-300
          backdrop-blur-sm border-2 shadow-lg
          ${isLiked 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 border-red-400 text-white shadow-red-500/30' 
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40'
          }
          ${loading ? 'opacity-70 cursor-wait' : 'hover:scale-110 active:scale-95'}
        `}
        whileHover={{ scale: loading ? 1 : 1.1 }}
        whileTap={{ scale: loading ? 1 : 0.9 }}
        title={!user ? 'Login to like' : (isLiked ? 'Unlike' : 'Like')}
        data-testid="like-button-action"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className={`${config.icon} border-2 border-current border-t-transparent rounded-full`}
            />
          ) : (
            <motion.div
              key="heart"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {isLiked ? (
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.4, ease: "easeOut" }}>
                  <HeartSolidIcon className={`${config.icon} drop-shadow-lg`} />
                </motion.div>
              ) : (
                <HeartIcon className={`${config.icon} stroke-2`} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {showCount && (
          <motion.span
            key={likeCount}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`${config.text} font-bold tabular-nums`}
          >
            {likeCount}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {showParticles && (
          <motion.div className="absolute inset-0 pointer-events-none overflow-visible">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [1, 1, 0], 
                  scale: [0, 1.2, 0.8], 
                  x: (i % 2 === 0 ? 1 : -1) * (15 + i * 8), 
                  y: -40 - i * 12,
                  rotate: (i % 2 === 0 ? 1 : -1) * (20 + i * 15)
                }}
                transition={{ duration: 1, delay: i * 0.08, ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <HeartSolidIcon className={`w-4 h-4 ${i % 3 === 0 ? 'text-red-400' : i % 3 === 1 ? 'text-pink-400' : 'text-rose-300'}`} />
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

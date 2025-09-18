import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress = 0, 
  variant = 'primary',
  size = 'md',
  showLabel = false,
  label = '',
  animated = true,
  className = ''
}) => {
  const variants = {
    primary: 'from-primary-500 to-primary-400',
    secondary: 'from-secondary-500 to-secondary-400',
    success: 'from-green-500 to-green-400',
    warning: 'from-yellow-500 to-yellow-400',
    danger: 'from-red-500 to-red-400'
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/70">
            {label || 'Progress'}
          </span>
          <span className="text-sm text-white font-medium">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      
      <div className={`
        w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm
        ${sizes[size]}
      `}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ 
            duration: animated ? 0.8 : 0,
            ease: "easeOut"
          }}
          className={`
            h-full bg-gradient-to-r ${variants[variant]} rounded-full
            relative overflow-hidden
          `}
        >
          {animated && (
            <motion.div
              animate={{
                x: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;

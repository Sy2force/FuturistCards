import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ 
  variant = 'card', 
  count = 1, 
  className = '',
  animate = true 
}) => {
  const shimmerVariants = {
    loading: {
      backgroundPosition: '-200px 0'
    },
    loaded: {
      backgroundPosition: '200px 0'
    }
  };

  const shimmerTransition = {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear'
  };

  const baseClasses = `
    bg-gradient-to-r from-white/5 via-white/10 to-white/5 
    bg-[length:200px_100%] rounded-lg
    ${animate ? 'animate-pulse' : ''}
  `;

  const renderSkeleton = () => {
    switch (variant) {
      case 'card':
        return (
          <div className={`business-card ${className}`}>
            {/* Image skeleton */}
            <motion.div
              variants={animate ? shimmerVariants : {}}
              initial="loading"
              animate="loaded"
              transition={shimmerTransition}
              className={`${baseClasses} h-48 mb-4`}
            />
            
            {/* Content skeleton */}
            <div className="space-y-3">
              <motion.div
                variants={animate ? shimmerVariants : {}}
                initial="loading"
                animate="loaded"
                transition={{ ...shimmerTransition, delay: 0.1 }}
                className={`${baseClasses} h-4 w-3/4`}
              />
              <motion.div
                variants={animate ? shimmerVariants : {}}
                initial="loading"
                animate="loaded"
                transition={{ ...shimmerTransition, delay: 0.2 }}
                className={`${baseClasses} h-3 w-1/2`}
              />
              <motion.div
                variants={animate ? shimmerVariants : {}}
                initial="loading"
                animate="loaded"
                transition={{ ...shimmerTransition, delay: 0.3 }}
                className={`${baseClasses} h-3 w-full`}
              />
              <motion.div
                variants={animate ? shimmerVariants : {}}
                initial="loading"
                animate="loaded"
                transition={{ ...shimmerTransition, delay: 0.4 }}
                className={`${baseClasses} h-3 w-4/5`}
              />
              
              {/* Tags skeleton */}
              <div className="flex space-x-2 pt-2">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    variants={animate ? shimmerVariants : {}}
                    initial="loading"
                    animate="loaded"
                    transition={{ ...shimmerTransition, delay: 0.5 + i * 0.1 }}
                    className={`${baseClasses} h-6 w-16`}
                  />
                ))}
              </div>
              
              {/* Actions skeleton */}
              <div className="flex space-x-2 pt-3">
                <motion.div
                  variants={animate ? shimmerVariants : {}}
                  initial="loading"
                  animate="loaded"
                  transition={{ ...shimmerTransition, delay: 0.8 }}
                  className={`${baseClasses} h-8 flex-1`}
                />
                <motion.div
                  variants={animate ? shimmerVariants : {}}
                  initial="loading"
                  animate="loaded"
                  transition={{ ...shimmerTransition, delay: 0.9 }}
                  className={`${baseClasses} h-8 flex-1`}
                />
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className={`space-y-4 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 glass-morphism rounded-lg">
                <motion.div
                  variants={animate ? shimmerVariants : {}}
                  initial="loading"
                  animate="loaded"
                  transition={{ ...shimmerTransition, delay: index * 0.1 }}
                  className={`${baseClasses} w-12 h-12 rounded-full flex-shrink-0`}
                />
                <div className="flex-1 space-y-2">
                  <motion.div
                    variants={animate ? shimmerVariants : {}}
                    initial="loading"
                    animate="loaded"
                    transition={{ ...shimmerTransition, delay: index * 0.1 + 0.1 }}
                    className={`${baseClasses} h-4 w-3/4`}
                  />
                  <motion.div
                    variants={animate ? shimmerVariants : {}}
                    initial="loading"
                    animate="loaded"
                    transition={{ ...shimmerTransition, delay: index * 0.1 + 0.2 }}
                    className={`${baseClasses} h-3 w-1/2`}
                  />
                </div>
                <motion.div
                  variants={animate ? shimmerVariants : {}}
                  initial="loading"
                  animate="loaded"
                  transition={{ ...shimmerTransition, delay: index * 0.1 + 0.3 }}
                  className={`${baseClasses} w-20 h-8 rounded`}
                />
              </div>
            ))}
          </div>
        );

      case 'profile':
        return (
          <div className={`glass-morphism rounded-lg p-6 ${className}`}>
            <div className="flex items-center space-x-4 mb-6">
              <motion.div
                variants={animate ? shimmerVariants : {}}
                initial="loading"
                animate="loaded"
                transition={shimmerTransition}
                className={`${baseClasses} w-20 h-20 rounded-full`}
              />
              <div className="space-y-2">
                <motion.div
                  variants={animate ? shimmerVariants : {}}
                  initial="loading"
                  animate="loaded"
                  transition={{ ...shimmerTransition, delay: 0.1 }}
                  className={`${baseClasses} h-6 w-40`}
                />
                <motion.div
                  variants={animate ? shimmerVariants : {}}
                  initial="loading"
                  animate="loaded"
                  transition={{ ...shimmerTransition, delay: 0.2 }}
                  className={`${baseClasses} h-4 w-32`}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <motion.div
                    variants={animate ? shimmerVariants : {}}
                    initial="loading"
                    animate="loaded"
                    transition={{ ...shimmerTransition, delay: 0.3 + i * 0.1 }}
                    className={`${baseClasses} h-4 w-24`}
                  />
                  <motion.div
                    variants={animate ? shimmerVariants : {}}
                    initial="loading"
                    animate="loaded"
                    transition={{ ...shimmerTransition, delay: 0.4 + i * 0.1 }}
                    className={`${baseClasses} h-10 w-full rounded`}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 'table':
        return (
          <div className={`glass-morphism rounded-lg overflow-hidden ${className}`}>
            {/* Table header */}
            <div className="flex items-center space-x-4 p-4 border-b border-white/10">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  variants={animate ? shimmerVariants : {}}
                  initial="loading"
                  animate="loaded"
                  transition={{ ...shimmerTransition, delay: i * 0.1 }}
                  className={`${baseClasses} h-4 flex-1`}
                />
              ))}
            </div>
            
            {/* Table rows */}
            {Array.from({ length: count }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center space-x-4 p-4 border-b border-white/5">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    variants={animate ? shimmerVariants : {}}
                    initial="loading"
                    animate="loaded"
                    transition={{ ...shimmerTransition, delay: rowIndex * 0.1 + i * 0.05 }}
                    className={`${baseClasses} h-4 flex-1`}
                  />
                ))}
              </div>
            ))}
          </div>
        );

      case 'text':
        return (
          <div className={`space-y-2 ${className}`}>
            {Array.from({ length: count }).map((_, index) => (
              <motion.div
                key={index}
                variants={animate ? shimmerVariants : {}}
                initial="loading"
                animate="loaded"
                transition={{ ...shimmerTransition, delay: index * 0.1 }}
                className={`${baseClasses} h-4 w-full`}
                style={{ width: `${Math.random() * 40 + 60}%` }}
              />
            ))}
          </div>
        );

      default:
        return (
          <motion.div
            variants={animate ? shimmerVariants : {}}
            initial="loading"
            animate="loaded"
            transition={shimmerTransition}
            className={`${baseClasses} h-20 w-full ${className}`}
          />
        );
    }
  };

  if (count === 1) {
    return renderSkeleton();
  }

  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;

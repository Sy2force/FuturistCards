import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  text = 'Chargement...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    blue: 'border-blue-400',
    purple: 'border-purple-400',
    green: 'border-green-400',
    red: 'border-red-400',
    white: 'border-white'
  };

  const spinnerClass = `animate-spin rounded-full border-2 border-transparent ${colorClasses[color]} border-t-current ${sizeClasses[size]}`;

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative"
      >
        <div className={spinnerClass}></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full border-2 border-transparent ${colorClasses[color]} border-r-current opacity-30`}
        ></motion.div>
      </motion.div>
      
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-sm font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

// Preset components for common use cases
export const PageLoader = ({ text = 'Chargement de la page...' }) => (
  <LoadingSpinner size="lg" color="blue" text={text} fullScreen />
);

export const ButtonLoader = ({ size = 'sm', color = 'white' }) => (
  <LoadingSpinner size={size} color={color} text="" />
);

export const CardLoader = () => (
  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-pulse">
    <div className="flex items-center justify-center h-32">
      <LoadingSpinner size="md" color="purple" text="Chargement..." />
    </div>
  </div>
);

export const InlineLoader = ({ text = 'Chargement...' }) => (
  <div className="flex items-center space-x-2">
    <LoadingSpinner size="sm" color="blue" text="" />
    <span className="text-white/70 text-sm">{text}</span>
  </div>
);

export default LoadingSpinner;

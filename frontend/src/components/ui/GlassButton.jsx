import React from 'react';
import { motion } from 'framer-motion';

const GlassButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = `
    relative overflow-hidden rounded-xl font-semibold
    transition-all duration-300 transform
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-blue-500/80 to-purple-600/80 
      hover:from-blue-600/90 hover:to-purple-700/90
      text-white border border-white/20
      focus:ring-blue-500/50
    `,
    secondary: `
      bg-white/10 backdrop-blur-md border border-white/30
      hover:bg-white/20 text-white
      focus:ring-white/50
    `,
    outline: `
      bg-transparent border-2 border-white/50
      hover:bg-white/10 text-white
      focus:ring-white/50
    `,
    ghost: `
      bg-transparent hover:bg-white/10 
      text-white border-none
      focus:ring-white/50
    `
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  return (
    <motion.button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default GlassButton;

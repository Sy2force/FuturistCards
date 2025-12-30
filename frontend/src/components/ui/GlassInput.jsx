import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const GlassInput = forwardRef(({ 
  label,
  error,
  icon: Icon,
  className = '',
  type = 'text',
  placeholder,
  ...props 
}, ref) => {
  const baseClasses = `
    w-full px-4 py-3 rounded-xl
    bg-white/10 backdrop-blur-md border border-white/30
    text-white placeholder-white/60
    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
    transition-all duration-300
  `;

  const errorClasses = error ? 'border-red-500/50 focus:ring-red-500/50' : '';

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-white/80">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-white/60" />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={`${baseClasses} ${errorClasses} ${Icon ? 'pl-10' : ''} ${className}`}
          placeholder={placeholder}
          {...props}
        />
      </div>
      
      {error && (
        <motion.p 
          className="text-red-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
});

GlassInput.displayName = 'GlassInput';

export default GlassInput;

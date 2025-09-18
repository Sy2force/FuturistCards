import React from 'react';
import { motion } from 'framer-motion';

const GlassContainer = ({ 
  children, 
  className = '', 
  variant = 'default',
  animate = true,
  hover = true,
  ...props 
}) => {
  const variants = {
    default: 'glass rounded-2xl p-6',
    card: 'glass-card',
    compact: 'glass rounded-lg p-4',
    large: 'glass rounded-3xl p-8',
  };

  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  } : {};

  const hoverProps = hover ? {
    whileHover: { scale: 1.02, y: -5 },
    transition: { duration: 0.2 }
  } : {};

  const combinedClassName = `${variants[variant]} ${className}`;

  if (animate) {
    return (
      <motion.div
        className={combinedClassName}
        {...motionProps}
        {...hoverProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default GlassContainer;

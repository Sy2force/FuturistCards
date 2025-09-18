import React from 'react';
import { motion } from 'framer-motion';

const ButtonGlass = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  animate = true,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    danger: 'glass-button border-red-400/30 hover:border-red-400/50 hover:bg-red-400/10 text-red-300',
    success: 'glass-button border-green-400/30 hover:border-green-400/50 hover:bg-green-400/10 text-green-300',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const baseClassName = `${variants[variant]} ${sizes[size]} ${className}`;
  const finalClassName = disabled || loading 
    ? `${baseClassName} opacity-50 cursor-not-allowed` 
    : baseClassName;

  const motionProps = animate ? {
    whileHover: disabled || loading ? {} : { scale: 1.05 },
    whileTap: disabled || loading ? {} : { scale: 0.95 },
    transition: { duration: 0.2 }
  } : {};

  const handleClick = (e) => {
    if (disabled || loading) return;
    onClick?.(e);
  };

  const ButtonContent = () => (
    <>
      {loading && (
        <div className="flex items-center justify-center mr-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {children}
    </>
  );

  if (animate) {
    return (
      <motion.button
        type={type}
        className={finalClassName}
        onClick={handleClick}
        disabled={disabled || loading}
        {...motionProps}
        {...props}
      >
        <ButtonContent />
      </motion.button>
    );
  }

  return (
    <button
      type={type}
      className={finalClassName}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      <ButtonContent />
    </button>
  );
};

export default ButtonGlass;

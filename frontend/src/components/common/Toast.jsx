import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const Toast = ({ 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose,
  position = 'top-right'
}) => {
  const { reducedMotion } = useTheme();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const typeStyles = {
    success: {
      bg: 'bg-green-500/20',
      border: 'border-green-400/30',
      text: 'text-green-300',
      icon: '✅'
    },
    error: {
      bg: 'bg-red-500/20',
      border: 'border-red-400/30',
      text: 'text-red-300',
      icon: '❌'
    },
    warning: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-400/30',
      text: 'text-yellow-300',
      icon: '⚠️'
    },
    info: {
      bg: 'bg-blue-500/20',
      border: 'border-blue-400/30',
      text: 'text-blue-300',
      icon: 'ℹ️'
    }
  };

  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2'
  };

  const slideVariants = {
    hidden: {
      opacity: 0,
      x: position.includes('right') ? 100 : position.includes('left') ? -100 : 0,
      y: position.includes('top') ? -20 : position.includes('bottom') ? 20 : 0,
      scale: reducedMotion ? 1 : 0.95
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      x: position.includes('right') ? 100 : position.includes('left') ? -100 : 0,
      y: position.includes('top') ? -20 : position.includes('bottom') ? 20 : 0,
      scale: reducedMotion ? 1 : 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const style = typeStyles[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed z-50 ${positionStyles[position]} max-w-sm w-full`}
        >
          <div className={`
            ${style.bg} ${style.border} ${style.text}
            backdrop-blur-md border rounded-lg p-4 shadow-lg
            glass-morphism
          `}>
            <div className="flex items-start space-x-3">
              <span className="text-lg flex-shrink-0 mt-0.5">
                {style.icon}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium leading-relaxed">
                  {message}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="flex-shrink-0 text-white/50 hover:text-white/80 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast Container Component
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;

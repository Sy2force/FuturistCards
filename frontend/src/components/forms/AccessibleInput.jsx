import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const AccessibleInput = forwardRef(({
  id,
  label,
  type = 'text',
  error,
  required = false,
  description,
  className = '',
  labelClassName = '',
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${inputId}-error` : undefined;
  const descriptionId = description ? `${inputId}-description` : undefined;

  return (
    <div className={`space-y-2 ${className}`}>
      <label 
        htmlFor={inputId}
        className={`block text-sm font-medium text-white ${labelClassName}`}
      >
        {label}
        {required && (
          <span className="text-red-400 ml-1" aria-label="requis">*</span>
        )}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-gray-300">
          {description}
        </p>
      )}
      
      <motion.input
        ref={ref}
        id={inputId}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
        className={`
          w-full px-4 py-3 rounded-lg border transition-all duration-200
          bg-white/10 text-white placeholder-gray-300
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error 
            ? 'border-red-400 focus:ring-red-500' 
            : 'border-white/20 hover:border-white/30'
          }
        `}
        {...props}
      />
      
      {error && (
        <motion.p
          id={errorId}
          role="alert"
          aria-live="polite"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-400 flex items-center gap-2"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
});

AccessibleInput.displayName = 'AccessibleInput';

export default AccessibleInput;

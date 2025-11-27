// Composants de formulaire HackerU avec feedback visuel rouge/vert
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  UserIcon,
  LockClosedIcon,
  PhoneIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { 
  getFieldClasses, 
  getErrorClasses, 
  getSuccessClasses,
  getSubmitButtonClasses 
} from '../utils/validation';

// Composant Input avec validation et feedback visuel HackerU
export const FormInput = ({ 
  type = 'text',
  name,
  label,
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  placeholder,
  icon: Icon,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const isPassword = type === 'password';
  const isDirty = touched && value !== '';
  const hasError = touched && error;
  const isValid = touched && !error && value !== '';
  
  const inputType = isPassword && showPassword ? 'text' : type;
  
  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Label avec indicateur obligatoire */}
      <label 
        htmlFor={name}
        className="block text-sm font-semibold text-hackeru-gray-700 dark:text-hackeru-gray-300"
      >
        {label}
        {required && (
          <span className="text-hackeru-error-500 ml-1" aria-label="Champ obligatoire">*</span>
        )}
      </label>
      
      {/* Container de l'input avec icônes */}
      <div className="relative">
        {/* Icône de gauche */}
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon 
              className={`h-5 w-5 transition-colors ${
                hasError 
                  ? 'text-hackeru-error-400' 
                  : isValid 
                    ? 'text-hackeru-success-400'
                    : isFocused 
                      ? 'text-hackeru-primary-500'
                      : 'text-hackeru-gray-400'
              }`} 
            />
          </div>
        )}
        
        {/* Input principal */}
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          data-testid={`input-${name}`}
          className={`${getFieldClasses(isValid, hasError, isDirty)} ${
            Icon ? 'pl-10' : ''
          } ${isPassword ? 'pr-10' : ''}`}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
          {...props}
        />
        
        {/* Bouton toggle mot de passe */}
        {isPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-hackeru-gray-400 hover:text-hackeru-gray-600" />
            ) : (
              <EyeIcon className="h-5 w-5 text-hackeru-gray-400 hover:text-hackeru-gray-600" />
            )}
          </button>
        )}
        
        {/* Icône de validation à droite */}
        {!isPassword && isDirty && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {hasError ? (
              <ExclamationCircleIcon className="h-5 w-5 text-hackeru-error-400" />
            ) : isValid ? (
              <CheckCircleIcon className="h-5 w-5 text-hackeru-success-400" />
            ) : null}
          </div>
        )}
      </div>
      
      {/* Messages d'erreur et de succès */}
      {hasError && (
        <motion.p
          id={`${name}-error`}
          className={getErrorClasses()}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
      
      {isValid && !hasError && (
        <motion.p
          className={getSuccessClasses()}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✓ Validé
        </motion.p>
      )}
    </motion.div>
  );
};

// Bouton de soumission HackerU avec états disabled/loading
export const SubmitButton = ({ 
  children, 
  isValid, 
  isLoading, 
  type = 'submit',
  onClick,
  ...props 
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={!isValid || isLoading}
      data-testid="submit-button"
      className={getSubmitButtonClasses(isValid, isLoading)}
      whileHover={isValid && !isLoading ? { scale: 1.02 } : {}}
      whileTap={isValid && !isLoading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      aria-disabled={!isValid || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <motion.div
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          Chargement...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

// Composant de formulaire avec validation en temps réel
export const FormContainer = ({ children, onSubmit, className = '' }) => {
  return (
    <motion.form
      onSubmit={onSubmit}
      data-testid="form-container"
      className={`space-y-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.form>
  );
};

// Composants spécialisés pour les champs HackerU
export const EmailInput = (props) => (
  <FormInput
    type="email"
    icon={EnvelopeIcon}
    placeholder="exemple@email.com"
    {...props}
  />
);

export const PasswordInput = (props) => (
  <FormInput
    type="password"
    icon={LockClosedIcon}
    placeholder="••••••••"
    {...props}
  />
);

export const NameInput = (props) => (
  <FormInput
    type="text"
    icon={UserIcon}
    {...props}
  />
);

export const TextInput = (props) => (
  <FormInput
    type="text"
    icon={UserIcon}
    {...props}
  />
);

export const PhoneInput = (props) => (
  <FormInput
    type="tel"
    icon={PhoneIcon}
    placeholder="050-0000000"
    {...props}
  />
);

export const CompanyInput = (props) => (
  <FormInput
    type="text"
    icon={BuildingOfficeIcon}
    {...props}
  />
);

export const SelectInput = ({ 
  label, 
  error, 
  touched, 
  options = [], 
  className = '', 
  ...props 
}) => {
  const fieldClasses = getFieldClasses(error, touched);
  const errorClasses = getErrorClasses();
  
  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          data-testid={`select-${props.name}`}
          className={`${fieldClasses} ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && touched && (
        <motion.p 
          className={errorClasses}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <ExclamationCircleIcon className="w-4 h-4 inline mr-1" />
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

// Composant de message d'aide pour les critères de validation
export const ValidationHelp = ({ criteria, title = "Critères requis :" }) => {
  return (
    <motion.div
      className="mt-3 p-3 bg-hackeru-gray-50 dark:bg-hackeru-gray-800 rounded-lg border border-hackeru-gray-200 dark:border-hackeru-gray-700"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm font-medium text-hackeru-gray-700 dark:text-hackeru-gray-300 mb-2">
        {title}
      </p>
      <ul className="text-xs text-hackeru-gray-600 dark:text-hackeru-gray-400 space-y-1">
        {criteria.map((criterion, index) => (
          <li key={index} className="flex items-center">
            <span className="w-1 h-1 bg-hackeru-primary-500 rounded-full mr-2" />
            {criterion}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FormInput;

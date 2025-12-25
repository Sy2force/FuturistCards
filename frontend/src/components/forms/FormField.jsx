import { forwardRef } from 'react';
// import { useTranslation } from 'react-i18next';

const FormField = forwardRef(({ 
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  className = '',
  rows = 3,
  options = [],
  ...props
}, ref) => {
  // const { t } = useTranslation(); // Unused for now
  
  const baseInputClasses = `
    block w-full px-3 py-2 border rounded-lg shadow-sm
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-white
    placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed
    ${error 
      ? 'border-red-300 dark:border-red-600 focus:ring-red-500' 
      : 'border-gray-300 dark:border-gray-600'
    }
    ${className}
  `;

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            required={required}
            disabled={disabled}
            className={baseInputClasses}
            {...props}
          />
        );
      
      case 'select':
        return (
          <select
            ref={ref}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            disabled={disabled}
            className={baseInputClasses}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              ref={ref}
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              onBlur={onBlur}
              required={required}
              disabled={disabled}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:cursor-not-allowed"
              {...props}
            />
            {label && (
              <label htmlFor={name} className="ml-2 block text-sm text-gray-900 dark:text-white">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}
          </div>
        );
      
      case 'radio':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  ref={ref}
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                  onBlur={onBlur}
                  required={required}
                  disabled={disabled}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 disabled:cursor-not-allowed"
                  {...props}
                />
                <label className="ml-2 block text-sm text-gray-900 dark:text-white">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      default:
        return (
          <input
            ref={ref}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={baseInputClasses}
            {...props}
          />
        );
    }
  };

  if (type === 'checkbox') {
    return (
      <div className="mb-4">
        {renderInput()}
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="mb-4">
      {label && type !== 'checkbox' && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {renderInput()}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;

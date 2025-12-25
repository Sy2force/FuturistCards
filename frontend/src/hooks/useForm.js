import { useState, useCallback } from 'react';
import { validateField, validateForm } from '../utils/validation';

/**
 * Custom hook for form state management with validation
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules for each field
 * @param {Function} onSubmit - Submit handler function
 * @returns {Object} Form state and handlers
 */
const useForm = (initialValues = {}, validationRules = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  }, [errors]);

  // Handle input blur (for validation)
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    if (validationRules[name]) {
      const error = validateField(name, values[name], validationRules[name]);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [values, validationRules]);

  // Validate all fields
  const validate = useCallback(() => {
    const formErrors = validateForm(values, validationRules);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  }, [values, validationRules]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    if (e) {
      e.preventDefault();
    }

    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate form
    if (!validate()) {
      return;
    }

    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        // Handle submission errors
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validationRules, onSubmit, validate]);

  // Reset form
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set form values
  const setFormValues = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  // Set form errors
  const setFormErrors = useCallback((newErrors) => {
    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));
  }, []);

  // Check if form is valid
  const isValid = Object.keys(errors).every(key => !errors[key]);

  // Check if form has been modified
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    validate,
    reset,
    setFormValues,
    setFormErrors,
    setValues,
    setErrors
  };
};

export default useForm;

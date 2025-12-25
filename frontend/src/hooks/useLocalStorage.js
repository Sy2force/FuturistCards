import { useState, useEffect } from 'react';
import { safeGetItem, safeSetItem, safeRemoveItem } from '../utils/safeStorage';

/**
 * Custom hook for localStorage with SSR safety and automatic JSON parsing
 */
const useLocalStorage = (key, initialValue) => {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = safeGetItem(key);
      // Parse stored json or if none return initialValue
      return item !== null ? item : initialValue;
    } catch (error) {
      // If error also return initialValue
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (valueToStore === undefined || valueToStore === null) {
        safeRemoveItem(key);
      } else {
        safeSetItem(key, valueToStore);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      // Error reading localStorage key
    }
  };

  // Remove value from localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      safeRemoveItem(key);
    } catch (error) {
      // Error removing localStorage key
    }
  };

  // Listen for changes to this key in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          setStoredValue(e.newValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;

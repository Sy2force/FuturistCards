/**
 * Safe localStorage wrapper with SSR protection
 * Prevents errors when localStorage is not available
 */

const isBrowser = typeof window !== 'undefined';

export const safeGetItem = (key) => {
  if (!isBrowser) return null;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

export const safeSetItem = (key, value) => {
  if (!isBrowser) return false;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

export const safeRemoveItem = (key) => {
  if (!isBrowser) return false;
  
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

export const safeClear = () => {
  if (!isBrowser) return false;
  
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

export default {
  getItem: safeGetItem,
  setItem: safeSetItem,
  removeItem: safeRemoveItem,
  clear: safeClear
};

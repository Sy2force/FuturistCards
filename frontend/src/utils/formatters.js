/**
 * Utility functions for formatting data
 */

/**
 * Format date to readable string
 */
export const formatDate = (date, locale = 'en-US') => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    return '';
  }
};

/**
 * Format date with time
 */
export const formatDateTime = (date, locale = 'en-US') => {
  if (!date) return '';
  
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return '';
  }
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date, locale = 'en-US') => {
  if (!date) return '';
  
  try {
    const now = new Date();
    const dateObj = new Date(date);
    const diffInSeconds = Math.floor((now - dateObj) / 1000);
    
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  } catch (error) {
    return formatDate(date, locale);
  }
};

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format based on length
  if (digits.length === 10) {
    // US format: (123) 456-7890
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  } else if (digits.length === 11 && digits[0] === '1') {
    // US with country code: +1 (123) 456-7890
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  } else if (digits.length > 7) {
    // International format: +XX XXX XXX XXXX
    return `+${digits.slice(0, -10)} ${digits.slice(-10, -7)} ${digits.slice(-7, -4)} ${digits.slice(-4)}`;
  }
  
  return phone; // Return original if can't format
};

/**
 * Format file size in bytes to human readable
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Format number with thousands separator
 */
export const formatNumber = (number, locale = 'en-US') => {
  if (number === null || number === undefined) return '';
  
  return new Intl.NumberFormat(locale).format(number);
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount === null || amount === undefined) return '';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1, locale = 'en-US') => {
  if (value === null || value === undefined) return '';
  
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value / 100);
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  
  return text.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Format card title for display
 */
export const formatCardTitle = (title) => {
  if (!title) return '';
  return capitalizeWords(title);
};

/**
 * Format user name for display
 */
export const formatUserName = (firstName, lastName) => {
  const first = firstName?.trim() || '';
  const last = lastName?.trim() || '';
  
  if (first && last) {
    return `${capitalizeWords(first)} ${capitalizeWords(last)}`;
  } else if (first) {
    return capitalizeWords(first);
  } else if (last) {
    return capitalizeWords(last);
  }
  
  return 'Anonymous User';
};

/**
 * Format address for display
 */
export const formatAddress = (address) => {
  if (!address) return '';
  
  const parts = [];
  
  if (address.houseNumber && address.street) {
    parts.push(`${address.houseNumber} ${address.street}`);
  } else if (address.street) {
    parts.push(address.street);
  }
  
  if (address.city) {
    parts.push(address.city);
  }
  
  if (address.state) {
    parts.push(address.state);
  }
  
  if (address.zip) {
    parts.push(address.zip);
  }
  
  if (address.country) {
    parts.push(address.country);
  }
  
  return parts.join(', ');
};

/**
 * Format URL for display (remove protocol)
 */
export const formatDisplayUrl = (url) => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + urlObj.pathname + urlObj.search;
  } catch (error) {
    return url.replace(/^https?:\/\//, '');
  }
};

/**
 * Format role for display
 */
export const formatRole = (role) => {
  if (!role) return '';
  
  const roleMap = {
    'user': 'User',
    'business': 'Business',
    'admin': 'Administrator'
  };
  
  return roleMap[role.toLowerCase()] || capitalizeWords(role);
};

export default {
  formatDate,
  formatDateTime,
  formatRelativeTime,
  formatPhoneNumber,
  formatFileSize,
  formatNumber,
  formatCurrency,
  formatPercentage,
  truncateText,
  capitalizeWords,
  formatCardTitle,
  formatUserName,
  formatAddress,
  formatDisplayUrl,
  formatRole
};

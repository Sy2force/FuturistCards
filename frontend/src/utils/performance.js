// Performance monitoring utilities
export const measurePerformance = (name, fn) => {
  return async (...args) => {
    const start = performance.now();
    const result = await fn(...args);
    const end = performance.now();
    
    if (import.meta.env.DEV) {
      console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  };
};

// Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window === 'undefined') return;
  
  // Track Core Web Vitals
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Only log in development
      if (import.meta.env.DEV) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      }
    });
  });
  
  try {
    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
  } catch (e) {
    // Fallback for older browsers
    if (import.meta.env.DEV) {
      console.log('Performance Observer not supported');
    }
  }
};

// Memory usage tracking
export const trackMemoryUsage = () => {
  if (typeof window === 'undefined' || !performance.memory) return;
  
  if (import.meta.env.DEV) {
    const memory = performance.memory;
    console.log('Memory Usage:', {
      used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`
    });
  }
};

// Image lazy loading utility
export const createImageObserver = (callback) => {
  if (typeof window === 'undefined') return null;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '50px' }
  );
  
  return observer;
};

// Debounce utility for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

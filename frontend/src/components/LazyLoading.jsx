import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy loading hook for images
export const useImageLazyLoading = () => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      if (loadedImages.has(src)) {
        resolve(src);
        return;
      }

      if (failedImages.has(src)) {
        reject(new Error('Image failed to load previously'));
        return;
      }

      const img = new Image();
      img.onload = () => {
        setLoadedImages(prev => new Set([...prev, src]));
        resolve(src);
      };
      img.onerror = () => {
        setFailedImages(prev => new Set([...prev, src]));
        reject(new Error('Failed to load image'));
      };
      img.src = src;
    });
  };

  return { loadImage, isLoaded: (src) => loadedImages.has(src), hasFailed: (src) => failedImages.has(src) };
};

// Intersection Observer hook
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasIntersected, options]);

  return [targetRef, isIntersecting, hasIntersected];
};

// Image with lazy loading
export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  fallback = null,
  onLoad = () => {},
  onError = () => {},
  ...props 
}) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (hasIntersected && src) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoading(false);
        onLoad();
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoading(false);
        onError();
      };
      img.src = src;
    }
  }, [hasIntersected, src, onLoad, onError]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Loading Placeholder */}
      {isLoading && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-white/10 flex items-center justify-center"
        >
          {placeholder || (
            <div className="animate-pulse bg-white/20 w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white/60"></div>
            </div>
          )}
        </motion.div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-red-500/10 border border-red-500/30 flex items-center justify-center"
        >
          {fallback || (
            <div className="text-red-400 text-center p-4">
              <svg className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm">Image non disponible</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Actual Image */}
      {imageSrc && !hasError && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

// Content with intersection observer
export const LazyContent = ({ 
  children, 
  fallback = null, 
  className = '',
  threshold = 0.1,
  rootMargin = '100px'
}) => {
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold,
    rootMargin
  });

  return (
    <div ref={ref} className={className}>
      {hasIntersected ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || (
          <div className="animate-pulse bg-white/10 rounded-lg p-6">
            <div className="space-y-3">
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
              <div className="h-4 bg-white/20 rounded w-1/2"></div>
              <div className="h-4 bg-white/20 rounded w-5/6"></div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

// Grid with virtual scrolling
export const LazyCardGrid = ({ 
  items = [], 
  renderItem, 
  itemsPerPage = 12,
  className = '' 
}) => {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);
  // const loadMoreRef = useRef(null);

  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px'
  });

  useEffect(() => {
    if (isIntersecting && visibleItems < items.length && !isLoading) {
      setIsLoading(true);
      
      // Simulate loading delay
      setTimeout(() => {
        setVisibleItems(prev => Math.min(prev + itemsPerPage, items.length));
        setIsLoading(false);
      }, 500);
    }
  }, [isIntersecting, visibleItems, items.length, itemsPerPage, isLoading]);

  const displayedItems = items.slice(0, visibleItems);
  const hasMore = visibleItems < items.length;

  return (
    <div className={className}>
      {/* Grid Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedItems.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: (index % itemsPerPage) * 0.1 
            }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </div>

      {/* Load More Trigger */}
      {hasMore && (
        <div ref={ref} className="mt-8 flex justify-center">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 text-white/60"
            >
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <span>Chargement...</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/40 text-sm"
            >
              Faites défiler pour charger plus
            </motion.div>
          )}
        </div>
      )}

      {/* End Message */}
      {!hasMore && items.length > itemsPerPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 text-center text-white/60"
        >
          <p>Vous avez vu toutes les cartes ({items.length})</p>
        </motion.div>
      )}
    </div>
  );
};

// Dynamic component loader
export const LazyComponentLoader = ({ 
  component: Component, 
  fallback = null,
  errorFallback = null,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);

  const defaultFallback = (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
    </div>
  );

  const defaultErrorFallback = (
    <div className="text-center p-8 text-red-400">
      <p>Erreur lors du chargement du composant</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-2 text-sm underline hover:no-underline"
      >
        Actualiser la page
      </button>
    </div>
  );

  if (hasError) {
    return errorFallback || defaultErrorFallback;
  }

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Virtual list for performance
export const VirtualList = ({ 
  items = [], 
  renderItem, 
  itemHeight = 100,
  containerHeight = 400,
  overscan = 5,
  className = ''
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight) + overscan,
    items.length
  );

  const visibleItems = items.slice(
    Math.max(0, visibleStart - overscan), 
    visibleEnd
  );

  const offsetY = Math.max(0, (visibleStart - overscan) * itemHeight);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => (
            <div
              key={item.id || (visibleStart - overscan + index)}
              style={{ height: itemHeight }}
            >
              {renderItem(item, visibleStart - overscan + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    fps: 0
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frameCount * 1000) / (currentTime - lastTime))
        }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Memory usage (if available)
    if ('memory' in performance) {
      const updateMemory = () => {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: Math.round(performance.memory.usedJSHeapSize / 1048576) // MB
        }));
      };
      
      const memoryInterval = setInterval(updateMemory, 2000);
      return () => {
        cancelAnimationFrame(animationId);
        clearInterval(memoryInterval);
      };
    }

    return () => cancelAnimationFrame(animationId);
  }, []);

  return metrics;
};

export default {
  LazyImage,
  LazyContent,
  LazyCardGrid,
  LazyComponentLoader,
  VirtualList,
  useImageLazyLoading,
  useIntersectionObserver,
  usePerformanceMonitor
};

import React, { memo, useMemo, useCallback, useState } from 'react';

/**
 * Higher-order component for memoization with custom comparison
 */
export const withMemo = (Component, areEqual) => {
  return memo(Component, areEqual);
};

/**
 * Memoized card item component
 */
export const MemoizedCardItem = memo(({ card, onLike, onFavorite, onView }) => {
  const handleLike = useCallback(() => {
    onLike?.(card.id);
  }, [card.id, onLike]);

  const handleFavorite = useCallback(() => {
    onFavorite?.(card.id);
  }, [card.id, onFavorite]);

  const handleView = useCallback(() => {
    onView?.(card.id);
  }, [card.id, onView]);

  const cardStyle = useMemo(() => ({
    background: `linear-gradient(135deg, ${card.gradient?.from || '#667eea'} 0%, ${card.gradient?.to || '#764ba2'} 100%)`
  }), [card.gradient]);

  return (
    <div className="card-item" style={cardStyle}>
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <div className="card-actions">
        <button onClick={handleLike}>Like ({card.likes})</button>
        <button onClick={handleFavorite}>Favorite</button>
        <button onClick={handleView}>View</button>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.card.id === nextProps.card.id &&
    prevProps.card.likes === nextProps.card.likes &&
    prevProps.card.title === nextProps.card.title &&
    prevProps.card.description === nextProps.card.description
  );
});

/**
 * Memoized list component with virtualization support
 */
export const MemoizedList = memo(({ items, renderItem, keyExtractor }) => {
  const memoizedItems = useMemo(() => {
    return items.map((item, index) => ({
      key: keyExtractor ? keyExtractor(item, index) : index,
      item,
      index
    }));
  }, [items, keyExtractor]);

  return (
    <div className="memoized-list">
      {memoizedItems.map(({ key, item, index }) => (
        <div key={key}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
});

/**
 * Performance monitoring wrapper
 */
export const withPerformanceMonitoring = () => {
  return React.memo((props) => {
    const [, setRenderTime] = useState(0);
    
    React.useEffect(() => {
      const startTime = performance.now();
      
      // Use requestAnimationFrame to measure after render
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const time = endTime - startTime;
        setRenderTime(time);
        
        if (time > 16) { // More than one frame (16ms)
          // Performance warning for slow renders
        }
      });
    });
    
    return <Component {...props} />;
  });
};

export default memo;

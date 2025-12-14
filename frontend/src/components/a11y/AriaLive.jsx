import { useEffect, useRef } from 'react';

const AriaLive = ({ message, priority = 'polite', className = '' }) => {
  const liveRef = useRef(null);

  useEffect(() => {
    if (message && liveRef.current) {
      // Clear and update the live region
      liveRef.current.textContent = '';
      setTimeout(() => {
        liveRef.current.textContent = message;
      }, 100);
    }
  }, [message]);

  return (
    <div
      ref={liveRef}
      aria-live={priority}
      aria-atomic="true"
      className={`sr-only ${className}`}
      role="status"
    />
  );
};

export default AriaLive;

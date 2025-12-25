
/**
 * Skeleton component for loading states
 */
const Skeleton = ({ 
  className = '', 
  width, 
  height, 
  variant = 'rectangular',
  animation = 'pulse',
  ...props 
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: ''
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || (variant === 'circular' ? width : undefined)
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant] || variantClasses.rectangular}
        ${animationClasses[animation]}
        ${className}
      `}
      style={style}
      {...props}
    />
  );
};

/**
 * SkeletonCard component for card loading states
 */
export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-6 border rounded-lg ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <Skeleton variant="circular" width="48px" height="48px" />
      <div className="flex-1">
        <Skeleton variant="text" className="mb-2" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" width="80%" className="mb-4" />
    <div className="flex justify-between">
      <Skeleton width="80px" height="32px" />
      <Skeleton width="80px" height="32px" />
    </div>
  </div>
);

/**
 * SkeletonList component for list loading states
 */
export const SkeletonList = ({ count = 3, className = '' }) => (
  <div className={className}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-center space-x-4 p-4 border-b">
        <Skeleton variant="circular" width="40px" height="40px" />
        <div className="flex-1">
          <Skeleton variant="text" className="mb-2" width="70%" />
          <Skeleton variant="text" width="50%" />
        </div>
        <Skeleton width="60px" height="24px" />
      </div>
    ))}
  </div>
);

export default Skeleton;

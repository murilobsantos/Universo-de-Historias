import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className = '', width = '100%', height = '1rem' }) => {
  return (
    <div
      className={`bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;

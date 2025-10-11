import React from 'react';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 20,
  interactive = false,
  onRate
}) => {
  const handleClick = (starIndex: number) => {
    if (interactive && onRate) {
      onRate(starIndex + 1);
    }
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: maxStars }, (_, index) => {
        const isFilled = index < Math.floor(rating);
        const isHalf = index === Math.floor(rating) && rating % 1 !== 0;
        return (
          <span
            key={index}
            className={`cursor-${interactive ? 'pointer' : 'default'} text-yellow-400`}
            style={{ fontSize: size }}
            onClick={() => handleClick(index)}
          >
            {isFilled ? '★' : isHalf ? '☆' : '☆'}
          </span>
        );
      })}
      <span className="ml-1 text-sm text-textSecondary">({rating.toFixed(1)})</span>
    </div>
  );
};

export default StarRating;

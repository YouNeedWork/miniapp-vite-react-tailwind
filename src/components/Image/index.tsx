import React from 'react';
import { getImageUrl } from '../../utils/image';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
}

export const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  fallback = '/imgs/icon.png',
  className = '', 
  ...props 
}) => {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    if (!error && fallback !== src) {
      setError(true);
    }
  };

  const imageSrc = error ? getImageUrl(fallback) : getImageUrl(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={`${className} ${error ? 'opacity-50' : ''}`}
      loading="lazy"
      {...props}
    />
  );
};
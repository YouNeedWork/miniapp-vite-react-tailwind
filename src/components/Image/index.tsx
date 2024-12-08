import React, { useState, useEffect } from 'react';
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
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && fallback !== imageSrc) {
      setHasError(true);
      setImageSrc(getImageUrl(fallback));
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={`${className} ${hasError ? 'opacity-50' : ''}`}
      loading="lazy"
      {...props}
    />
  );
};
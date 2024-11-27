import React from 'react';

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
    if (!error) {
      setError(true);
    }
  };

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={handleError}
      className={`${className} ${error ? 'opacity-50' : ''}`}
      {...props}
    />
  );
};
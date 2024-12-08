import { NFT_IMAGES } from '../constants/images';

const DEFAULT_FALLBACK = '/imgs/icon.png';

export const preloadImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(true);
    };
    
    img.onerror = () => {
      console.warn(`Image not found: ${url}, using fallback`);
      resolve(false);
    };

    img.src = url;
  });
};

export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path;
  }
  
  // First try to get the image directly
  if (path.startsWith('/')) {
    const img = new Image();
    img.src = path;
    
    // If image exists, return the path
    if (img.complete) {
      return path;
    }
  }
  
  // If image doesn't exist, return default fallback
  return DEFAULT_FALLBACK;
};

export const validateImage = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    return response.ok && contentType?.startsWith('image/');
  } catch (error) {
    console.warn(`Error validating image ${url}:`, error);
    return false;
  }
};

export const validateNftImages = async () => {
  const results = await Promise.all(
    Object.entries(NFT_IMAGES).map(async ([key, path]) => {
      const isValid = await validateImage(path);
      if (!isValid) {
        console.warn(`NFT image not found: ${key}, using fallback`);
      }
      return { key, path, isValid };
    })
  );
  
  return results.every(({ isValid }) => isValid);
};
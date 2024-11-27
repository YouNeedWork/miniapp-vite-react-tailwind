import { NFT_IMAGES } from '../constants/images';

export const preloadImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => {
      resolve(true);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${url}`);
      resolve(false);
    };

    img.src = url;
  });
};

export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) {
    return path;
  }
  
  // Path should already include leading slash from constants
  return path;
};

export const validateImage = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch (error) {
    console.error(`Error validating image ${url}:`, error);
    return false;
  }
};

export const validateNftImages = async () => {
  const results = await Promise.all(
    Object.entries(NFT_IMAGES).map(async ([key, path]) => {
      const isValid = await validateImage(path);
      if (!isValid) {
        console.error(`NFT image not found: ${key} at path ${path}`);
      }
      return { key, path, isValid };
    })
  );
  
  return results.every(({ isValid }) => isValid);
};
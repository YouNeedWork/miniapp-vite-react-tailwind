import { useState, useEffect } from 'react';
import { GAME_ICONS, BACKGROUNDS, TASK_ICONS, ME_ICONS, MINT_ICONS, FRIEND_ICONS, HEADERS, NFT_IMAGES } from '../constants/images';
import { preloadImage } from '../utils/image';

const getAllImages = () => {
  const images = [
    ...Object.values(GAME_ICONS),
    ...Object.values(BACKGROUNDS),
    ...Object.values(TASK_ICONS),
    ...Object.values(ME_ICONS),
    ...Object.values(MINT_ICONS),
    ...Object.values(FRIEND_ICONS),
    ...Object.values(HEADERS),
    ...Object.values(NFT_IMAGES),
  ];

  return images.filter(Boolean);
};

export const useImagePreload = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const imageUrls = getAllImages();
    setTotalImages(imageUrls.length);
    let mounted = true;

    const loadImages = async () => {
      try {
        const results = await Promise.all(
          imageUrls.map(async (url) => {
            const success = await preloadImage(url);
            if (mounted) {
              setLoadedCount(prev => prev + 1);
            }
            return success;
          })
        );

        if (mounted) {
          const allLoaded = results.every(Boolean);
          setImagesLoaded(allLoaded);
          
          if (!allLoaded) {
            console.warn('Some images failed to load:', 
              imageUrls.filter((_, i) => !results[i])
            );
          }
        }
      } catch (error) {
        console.error('Error preloading images:', error);
        if (mounted) {
          setImagesLoaded(true);
        }
      }
    };

    loadImages();

    return () => {
      mounted = false;
    };
  }, []);

  return imagesLoaded;
};
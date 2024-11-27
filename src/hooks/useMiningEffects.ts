import { useState, useCallback, useRef } from 'react';

export const useMiningEffects = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const miningSound = useRef(new Audio('/audio/mining.mp3'));
  const coinSound = useRef(new Audio('/audio/coin.mp3'));

  const playMiningEffect = useCallback(async () => {
    setIsAnimating(true);
    
    try {
      miningSound.current.currentTime = 0;
      await miningSound.current.play();
      
      setTimeout(() => {
        coinSound.current.currentTime = 0;
        coinSound.current.play();
      }, 300);
      
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, []);

  return {
    isAnimating,
    playMiningEffect
  };
};
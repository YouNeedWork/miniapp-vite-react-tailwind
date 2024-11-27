import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface BackgroundMusicContextType {
  isPlaying: boolean;
  isMuted: boolean;
  togglePlay: () => void;
  toggleMute: () => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | null>(null);

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useLocalStorage("bgm-muted", false);

  // Initialize audio on mount
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/background.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.muted = isMuted;
    }

    // Start playing automatically
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Autoplay prevented:", error);
      });
    }

    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Handle mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(console.error);
        }
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted, setIsMuted]);

  return (
    <BackgroundMusicContext.Provider 
      value={{
        isPlaying,
        isMuted,
        togglePlay,
        toggleMute,
      }}
    >
      {children}
    </BackgroundMusicContext.Provider>
  );
};

export const useBackgroundMusicContext = () => {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error('useBackgroundMusicContext must be used within a BackgroundMusicProvider');
  }
  return context;
};
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// 创建全局单例
const audioInstance = new Audio("/audio/background.mp3");
audioInstance.loop = true;
audioInstance.volume = 0.5;

interface BackgroundMusicContextType {
    isPlaying: boolean;
    isMuted: boolean;
    togglePlay: () => void;
    toggleMute: () => void;
}

const BackgroundMusicContext = createContext<BackgroundMusicContextType | null>(null);

export const BackgroundMusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useLocalStorage("bgm-muted", true);

    // 初始化音频状态
    useEffect(() => {
        audioInstance.muted = true;
    }, []);

    const togglePlay = useCallback(() => {
        if (isPlaying) {
            audioInstance.pause();
        } else {
            audioInstance.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const toggleMute = useCallback(() => {
        audioInstance.muted = !isMuted;
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
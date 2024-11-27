import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBackgroundMusicContext } from '@/contexts/BackgroundMusicContext';

interface AudioControlProps {
  className?: string;
}

export const AudioControl: React.FC<AudioControlProps> = ({ className }) => {
  const { isMuted, toggleMute } = useBackgroundMusicContext();

  return (
    <button
      onClick={toggleMute}
      className={cn(
        'w-10 h-10 rounded-full border-2 border-black shadow-lg bg-white/90',
        'flex justify-center items-center transition-all duration-200',
        'hover:bg-white active:scale-95',
        className
      )}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-gray-800" />
      ) : (
        <Volume2 className="w-5 h-5 text-gray-800" />
      )}
    </button>
  );
};
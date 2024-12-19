import React from 'react';
import { AudioControl } from '@/components/AudioControl';
import { BoostRateButton } from '@/components/BoostRateButton';

interface MintLayoutProps {
  children: React.ReactNode;
  showSessionKeyModal?: boolean;
}

export const MintLayout: React.FC<MintLayoutProps> = ({ 
  children,
  showSessionKeyModal = false
}) => {
  return (
    <div
      className="w-screen h-screen bg-center bg-no-repeat bg-cover 
        pt-[60px] md:pt-[80px] lg:pt-[100px] relative"
      style={{ backgroundImage: "url('/imgs/mint/bg.png')" }}
    >
      <AudioControl className="absolute top-4 right-4 z-50" />

      {!showSessionKeyModal && (
        <BoostRateButton className="absolute top-4 left-4 z-50" />
      )}

      {children}
    </div>
  );
};
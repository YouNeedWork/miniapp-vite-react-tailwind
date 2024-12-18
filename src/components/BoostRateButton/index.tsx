import React from 'react';
import { useBoostRate } from '@/hooks/queries/useBoostRate';
import { cn } from '@/lib/utils';

interface BoostRateButtonProps {
  className?: string;
}

export const BoostRateButton: React.FC<BoostRateButtonProps> = ({ className }) => {
  const { data: boostRate = 1 } = useBoostRate();

  return (
    <div 
      className={cn(
        "flex items-center justify-center",
        "px-4 py-2 rounded-full",
        "bg-gradient-to-r from-[#edad4b] to-[#d99b39]",
        "border-2 border-black shadow-lg",
        "transform transition-all duration-200",
        "hover:scale-105 active:scale-95",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <img 
          src="/imgs/mint/mint_icon.png" 
          alt="Boost" 
          className="w-6 h-6 object-contain"
        />
        <span className="text-white font-bold">
          {boostRate}x Boost
        </span>
      </div>
    </div>
  );
};
import React from 'react';
import { useBoostStatus } from '@/hooks/queries/useBoostStatus';
import { cn } from '@/lib/utils';
import { formatDuration } from './utils';

interface BoostRateButtonProps {
  className?: string;
}

export const BoostRateButton: React.FC<BoostRateButtonProps> = ({ className }) => {
  const { data: boostStatus } = useBoostStatus();
  const { isActive, multiplier = 0, timeRemaining } = boostStatus || {};

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        "px-4 py-2 rounded-full",
        isActive
          ? "bg-gradient-to-r from-[#67d488] to-[#4fb36a]"
          : "bg-gradient-to-r from-[#edad4b] to-[#d99b39]",
        "border-2 border-black shadow-lg",
        "transform transition-all duration-200",
        "hover:scale-105 active:scale-95",
        className
      )}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2">
          <img
            src="/imgs/mint/mint_icon.png"
            alt="Boost"
            className="w-6 h-6 object-contain"
          />
          <span className="text-white font-bold">
            {multiplier}x Boost
          </span>
        </div>
        {isActive && timeRemaining && (
          <span className="text-xs text-white/90 mt-1">
            {formatDuration(timeRemaining)}
          </span>
        )}
      </div>
    </div>
  );
};
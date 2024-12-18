import React from 'react';
import { cn } from '@/lib/utils';
import { useMiningEffects } from '@/hooks/useMiningEffects';
import { buttonStyles } from '../Actions/styles';
import { MiningAnimation } from '@/components/MiningAnimation';

interface AutoMiningProps {
  onAutoMine: () => Promise<boolean>;
  autoMiningAmount: number;
  onRefresh?: () => void;
}

export const AutoMining: React.FC<AutoMiningProps> = ({
  onAutoMine,
  autoMiningAmount,
  onRefresh
}) => {
  const { isAnimating, playMiningEffect } = useMiningEffects();

  const handleAutoMineClick = async () => {
    try {
      playMiningEffect();
      const success = await onAutoMine();
      if (success) {
        onRefresh?.();
      }
    } catch (error) {
      console.error('Auto mining failed:', error);
    }
  };

  return (
    <button
      onClick={handleAutoMineClick}
      className={cn(
        buttonStyles.secondary,
        "bg-gradient-to-b from-[#67d488] to-[#4fb36a]",
        "relative"
      )}
    >
      <div className="flex flex-col items-center justify-center">
        <img
          src="/imgs/mint/auto_mining.png"
          alt="Auto Mining"
          className="w-[40px] h-[40px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px]"
        />
        <span className="text-white text-xs md:text-sm font-bold mt-1">
          +{(autoMiningAmount / 1e6).toFixed(2)}/s
        </span>
      </div>
      <MiningAnimation
        isActive={isAnimating}
        className="absolute inset-0"
      />
    </button>
  );
};
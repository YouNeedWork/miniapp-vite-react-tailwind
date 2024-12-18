import React from 'react';
import { cn } from '@/lib/utils';
import { useMiningEffects } from '@/hooks/useMiningEffects';
import { buttonStyles } from '../Actions/styles';
import { MiningAnimation } from '@/components/MiningAnimation';

interface ManualMiningProps {
  onMine: () => Promise<boolean>;
  hunger: string;
  onRefresh?: () => void;
}

export const ManualMining: React.FC<ManualMiningProps> = ({
  onMine,
  hunger,
  onRefresh
}) => {
  const { isAnimating, playMiningEffect } = useMiningEffects();

  const handleMineClick = async () => {
    try {
      playMiningEffect();
      const success = await onMine();
      if (success) {
        onRefresh?.();
      }
    } catch (error) {
      console.error('Mining failed:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleMineClick}
        className={cn(
          buttonStyles.mining,
          "w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px]"
        )}
      >
        <img
          src="/imgs/mint/mint_icon_1.png"
          alt="Mine"
          className={cn(
            "w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]",
            "transition-transform duration-200",
            isAnimating && "animate-bounce"
          )}
        />
        <MiningAnimation
          isActive={isAnimating}
          className="absolute inset-0"
        />
      </button>
      <div className={cn(
        buttonStyles.hunger,
        "text-sm md:text-base lg:text-lg"
      )}>
        {hunger}
      </div>
    </div>
  );
};
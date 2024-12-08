import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { MiningAnimation } from '@/components/MiningAnimation';
import { useMiningEffects } from '@/hooks/useMiningEffects';
import { cn } from '@/lib/utils';
import { buttonStyles } from './styles';
import { useMineInfo } from '@/hooks/queries/useMineInfo';
import { useAutoMiningRate } from '@/hooks/queries/useAutoMiningRate';

interface ActionsProps {
  mine: () => Promise<boolean>;
  hunger: string;
  onOpenBackpack: () => void;
  onOpenShop: () => void;
  onRefresh?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({
  mine,
  hunger,
  onOpenBackpack,
  onOpenShop,
  onRefresh
}) => {
  const { isAnimating, playMiningEffect } = useMiningEffects();
  const { data: mineInfo } = useMineInfo();
  const { data: autoMiningRate = 0 } = useAutoMiningRate();
  const isAutoMining = mineInfo?.type === 'auto';

  const handleMineClick = async () => {
    try {
      playMiningEffect();
      const success = await mine();
      if (success) {
        onRefresh?.();
      }
    } catch (error) {
      console.error('Mining failed:', error);
    }
  };

  return (
    <div className="fixed bottom-[80px] inset-x-0 px-4 md:bottom-[120px] md:px-6 lg:bottom-[160px] lg:px-8">
      <div className="flex relative justify-between items-center mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Backpack Button */}
        <button
          onClick={onOpenBackpack}
          className={cn(
            buttonStyles.secondary,
            "w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
          )}
          aria-label="Open Backpack"
        >
          <img
            src="/imgs/mint/bag.png"
            alt="Backpack"
            className="object-contain w-[40px] h-[40px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px]"
          />
        </button>

        {/* Mining Button */}
        <div className="relative">
          <button
            onClick={handleMineClick}
            className={cn(
              buttonStyles.mining,
              "w-[80px] h-[80px] md:w-[120px] md:h-[120px] lg:w-[160px] lg:h-[160px]",
              isAutoMining && "bg-gradient-to-b from-[#67d488] to-[#4fb36a]"
            )}
          >
            {isAutoMining ? (
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/imgs/mint/auto_mining.png"
                  alt="Auto Mining"
                  className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] lg:w-[80px] lg:h-[80px]"
                />
                <span className="text-white text-xs md:text-sm lg:text-base font-bold mt-1">
                  +{autoMiningRate}/s
                </span>
              </div>
            ) : (
              <img
                src="/imgs/mint/mint_icon_1.png"
                alt="Mine"
                className={cn(
                  "w-[50px] h-[50px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]",
                  "transition-transform duration-200",
                  isAnimating && "animate-bounce"
                )}
              />
            )}
            <MiningAnimation
              isActive={isAnimating}
              className="absolute inset-0"
            />
          </button>

          {/* Hunger Indicator */}
          <div className={cn(
            buttonStyles.hunger,
            "text-sm md:text-base lg:text-lg"
          )}>
            {hunger}
          </div>
        </div>

        {/* Shop Button */}
        <button
          onClick={onOpenShop}
          className={cn(
            buttonStyles.secondary,
            "bg-gradient-to-b from-[#e2a9d7] to-[#d182c0]",
            "w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
          )}
          aria-label="Open Shop"
        >
          <ShoppingCart className="w-[40px] h-[40px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px] text-black" />
        </button>
      </div>
    </div>
  );
};
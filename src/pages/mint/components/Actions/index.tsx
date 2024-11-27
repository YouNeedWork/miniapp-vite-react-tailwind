import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { MiningAnimation } from '@/components/MiningAnimation';
import { useMiningEffects } from '@/hooks/useMiningEffects';
import { cn } from '@/lib/utils';
import { buttonStyles } from './styles';

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

  const handleMineClick = async () => {
    try {
      playMiningEffect();
      const success = await mine();
      if (!success) {
        // Handle mining failure
        
      }
      // Refresh data after mining
      onRefresh?.();
    } catch (error) {
      console.error('Mining failed:', error);
    }
  };

  return (
    <div className="fixed bottom-[80px] inset-x-0 px-4">
      <div className="flex relative justify-between items-center mx-auto max-w-md">
        {/* Backpack Button */}
        <button 
          onClick={onOpenBackpack}
          className={cn(
            buttonStyles.secondary,
            "p-2"
          )}
          aria-label="Open Backpack"
        >
          <img 
            src="/imgs/me/my_orders.png"
            alt="Backpack"
            className="object-contain w-full h-full"
          />
        </button>

        {/* Mining Button */}
        <div className="relative">
          <button
            onClick={handleMineClick}
            className={buttonStyles.mining}
          >
            <img
              src="/imgs/mint/mint_icon_1.png"
              alt="Mine"
              className={cn(
                "w-[50px] h-[50px]",
                "transition-transform duration-200",
                isAnimating && "animate-bounce"
              )}
            />
            <MiningAnimation 
              isActive={isAnimating}
              className="absolute inset-0"
            />
          </button>
          
          {/* Hunger Indicator */}
          <div className={buttonStyles.hunger}>
            {hunger}
          </div>
        </div>

        {/* Shop Button */}
        <button
          onClick={onOpenShop}
          className={cn(
            buttonStyles.secondary,
            "bg-gradient-to-b from-[#e2a9d7] to-[#d182c0]"
          )}
          aria-label="Open Shop"
        >
          <ShoppingCart className="w-6 h-6 text-black" />
        </button>
      </div>
    </div>
  );
};
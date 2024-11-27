import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { MiningAnimation } from '@/components/MiningAnimation';
import { useMiningEffects } from '@/hooks/useMiningEffects';
import { cn } from '@/lib/utils';

interface IconsProps {
  mine: () => Promise<boolean>;
  hunger: string;
  onOpenBackpack: () => void;
  onOpenShop: () => void;
}

export const Icons: React.FC<IconsProps> = ({ 
  mine, 
  hunger,
  onOpenBackpack,
  onOpenShop 
}) => {
  const { isAnimating, playMiningEffect } = useMiningEffects();

  const handleMineClick = async () => {
    try {
      playMiningEffect();
      const success = await mine();
      if (!success) {
        // Handle mining failure
      }
    } catch (error) {
      console.error('Mining failed:', error);
    }
  };

  const buttonStyles = cn(
    "w-[50px] h-[50px] rounded-full",
    "flex items-center justify-center",
    "border-2 border-black shadow-lg",
    "transition-all duration-200",
    "hover:scale-105 active:scale-95"
  );

  return (
    <div className="fixed bottom-[80px] inset-x-0 px-4">
      <div className="relative flex justify-between items-center max-w-md mx-auto">
        {/* Backpack Button */}
        <button 
          onClick={onOpenBackpack}
          className={cn(
            buttonStyles,
            "bg-gradient-to-b from-[#afe1fa] to-[#6db3e1]",
            "p-2"
          )}
          aria-label="Open Backpack"
        >
          <img 
            src="/imgs/me/my_orders.png"
            alt="Backpack"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Mining Button */}
        <div className="relative">
          <button
            onClick={handleMineClick}
            className={cn(
              "w-[80px] h-[80px] rounded-full",
              "bg-gradient-to-b from-[#e04936] to-[#c43d2b]",
              "border-4 border-black shadow-xl",
              "transition-transform duration-200",
              "hover:scale-105 active:scale-95",
              "flex items-center justify-center"
            )}
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
          <div className={cn(
            "absolute -top-2 left-1/2 -translate-x-1/2",
            "px-3 py-1 rounded-full",
            "bg-[#67d488] border border-black",
            "text-white text-sm font-bold"
          )}>
            {hunger}
          </div>
        </div>

        {/* Shop Button */}
        <button
          onClick={onOpenShop}
          className={cn(
            buttonStyles,
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
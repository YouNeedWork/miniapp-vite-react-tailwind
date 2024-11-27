import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { BackpackItem } from '@/hooks/useBackpackItems';

interface BackpackItemProps {
  item: BackpackItem;
  onEat?: () => void;
  onToggleEquip?: (item: BackpackItem) => void;
}

export const BackpackItem: React.FC<BackpackItemProps> = ({ 
  item, 
  onEat,
  onToggleEquip
}) => {
  const isHamburger = item.type === 'HAMBURGER';
  const hasQuantity = item.quantity > 0;

  return (
    <div className={cn(
      "relative flex flex-col items-center p-3 rounded-xl border-2 border-black",
      "bg-gradient-to-b from-[#afe1fa] to-[#6db3e1]",
      !hasQuantity && "opacity-50"
    )}>
      {item.isCard && item.isEquipped && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
      )}
      
      <div className="w-16 h-16 flex items-center justify-center bg-white/10 rounded-lg p-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain filter drop-shadow-lg"
        />
      </div>
      
      <div className="mt-2 w-full text-center">
        <span className="text-sm font-bold text-white text-shadow-sm truncate block">
          {item.name}
        </span>
        <span className={cn(
          "text-xs mt-1 font-medium",
          hasQuantity ? "text-[#fdeeba]" : "text-gray-300"
        )}>
          x{item.quantity}
        </span>
        
        {isHamburger && onEat && hasQuantity && (
          <Button
            variant="primary"
            size="sm"
            rounded="full"
            className="mt-2 w-full"
            onClick={onEat}
          >
            Eat
          </Button>
        )}
        
        {item.isCard && onToggleEquip && hasQuantity && (
          <Button
            variant={item.isEquipped ? "secondary" : "primary"}
            size="sm"
            rounded="full"
            className="mt-2 w-full"
            onClick={() => onToggleEquip(item)}
          >
            {item.isEquipped ? 'Unequip' : 'Equip'}
          </Button>
        )}
      </div>
    </div>
  );
};
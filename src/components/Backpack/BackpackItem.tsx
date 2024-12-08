import React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ITEM_TYPES, type BackpackItemType } from '@/hooks/useBackpackItems';

interface BackpackItemProps {
  item: BackpackItemType;
  onEat?: () => void;
  onToggleEquip?: (item: BackpackItemType) => void;
}

export const BackpackItem: React.FC<BackpackItemProps> = ({
  item,
  onEat,
  onToggleEquip
}) => {
  const isHamburger = item.type === ITEM_TYPES.HAMBURGER;
  const hasQuantity = item.quantity > 0;

  return (
    <div className={cn(
      "relative flex flex-col items-center p-3 rounded-xl border-2 border-black",
      "bg-gradient-to-b from-[#afe1fa] to-[#6db3e1]",
      !hasQuantity && "opacity-50"
    )}>
      {item.isCard && item.isEquipped && (
        <div className="flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 bg-green-500 rounded-full border-2 border-white">
          <span className="text-xs text-white">✓</span>
        </div>
      )}

      <div
        className="flex justify-center items-center p-2 w-16 h-16 rounded-lg bg-white/10"
        style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Remove the img tag */}
      </div>

      <div className="mt-2 w-full text-center">
        <span className="block text-sm font-bold text-white truncate text-shadow-sm">
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
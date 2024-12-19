import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const isHamburger = item.type === ITEM_TYPES.HAMBURGER;
  const isCard = item.isCard;
  const hasQuantity = item.quantity > 0;

  const getItemName = () => {
    switch (item.type) {
      case ITEM_TYPES.HAMBURGER:
        return t('backpack.items.hamburger.name');
      case ITEM_TYPES.BOOST_CARD:
        return t('backpack.items.boostCard.name');
      case ITEM_TYPES.OG_CARD:
        return t('backpack.items.ogCard.name');
      case ITEM_TYPES.EARLY_CARD:
        return t('backpack.items.earlyCard.name');
      case ITEM_TYPES.GOLD_ORE:
        return t('backpack.items.goldOre.name');
      case ITEM_TYPES.SILVER_ORE:
        return t('backpack.items.silverOre.name');
      case ITEM_TYPES.COPPER_ORE:
        return t('backpack.items.copperOre.name');
      case ITEM_TYPES.IRON_ORE:
        return t('backpack.items.ironOre.name');
      case ITEM_TYPES.REFINING_POTION:
        return t('backpack.items.refiningPotion.name');
      default:
        return item.name;
    }
  };

  const getActionText = () => {
    if (isHamburger) {
      return t('backpack.items.hamburger.action');
    }
    
    if (isCard) {
      const cardType = item.cardType;
      return item.isEquipped 
        ? t(`backpack.items.${cardType}Card.action.unequip`)
        : t(`backpack.items.${cardType}Card.action.equip`);
    }
    
    return '';
  };

  return (
    <div className={cn(
      "relative flex flex-col items-center p-3 rounded-xl border-2 border-black",
      "bg-gradient-to-b from-[#afe1fa] to-[#6db3e1]",
      !hasQuantity && "opacity-50"
    )}>
      {isCard && item.isEquipped && (
        <div className="flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 bg-green-500 rounded-full border-2 border-white">
          <span className="text-xs text-white">✓</span>
        </div>
      )}

      <div className="flex justify-center items-center p-2 w-16 h-16 rounded-lg bg-white/10">
        <img 
          src={item.image} 
          alt={getItemName()}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="mt-2 w-full text-center">
        <span className="block text-sm font-bold text-white truncate text-shadow-sm">
          {getItemName()}
        </span>
        <span className={cn(
          "text-xs mt-1 font-medium",
          hasQuantity ? "text-[#fdeeba]" : "text-gray-300"
        )}>
          {t('backpack.quantity', { count: item.quantity })}
        </span>

        {(isHamburger || isCard) && hasQuantity && (
          <Button
            variant={item.isEquipped ? "secondary" : "primary"}
            size="sm"
            rounded="full"
            className="mt-2 w-full"
            onClick={() => isHamburger ? onEat?.() : onToggleEquip?.(item)}
          >
            {getActionText()}
          </Button>
        )}
      </div>
    </div>
  );
};
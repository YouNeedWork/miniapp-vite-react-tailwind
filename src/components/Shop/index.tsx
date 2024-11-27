import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { ShopItemCard } from './ShopItem';
import { SHOP_ITEMS, type ShopItem } from './types';
import { shopStyles } from '@/components/ui/Modal/styles';

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Shop: React.FC<ShopProps> = ({ isOpen, onClose }) => {
  const handleRent = (item: ShopItem, days: number) => {
    console.log(`Renting ${item.name} for ${days} days`);
    // TODO: Implement rental logic
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Modal
      title="Mining Machines Shop"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={shopStyles.container} onClick={handleContentClick}>
        <div className={shopStyles.content}>
          <div className="mb-4 text-center">
            <p className="text-sm font-medium text-gray-600">
              Rent mining machines to increase your mining efficiency
            </p>
          </div>
          
          {SHOP_ITEMS.map((item) => (
            <ShopItemCard
              key={item.id}
              item={item}
              onRent={handleRent}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};
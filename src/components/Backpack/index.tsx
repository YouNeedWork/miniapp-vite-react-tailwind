import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { BackpackItem } from './BackpackItem';
import { useBackpackItems, type BackpackItem as BackpackItemType } from '@/hooks/useBackpackItems';
import { useEatHamburger } from '@/hooks/useEatHamburger';

interface BackpackProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Backpack: React.FC<BackpackProps> = ({ isOpen, onClose }) => {
  const { data: items = [], refetch } = useBackpackItems();
  const { eatHamburger } = useEatHamburger();

  const handleEat = async () => {
    try {
      const success = await eatHamburger();
      if (success) {
        await refetch();
      }
    } catch (error) {
      console.error('Failed to eat hamburger:', error);
    }
  };

  const handleToggleEquip = async (item: BackpackItemType) => {
    // TODO: Implement card equip/unequip logic
    console.log('Toggle equip for item:', item);
  };

  return (
    <Modal
      title="My Backpack"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid grid-cols-3 gap-4 p-4">
        {items.map((item) => (
          <BackpackItem
            key={item.id}
            item={item}
            onEat={item.type === 'HAMBURGER' ? handleEat : undefined}
            onToggleEquip={item.isCard ? handleToggleEquip : undefined}
          />
        ))}
      </div>
    </Modal>
  );
};
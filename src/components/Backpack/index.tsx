import React, { useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { BackpackItem } from './BackpackItem';
import { BackpackItemType, ITEM_TYPES, useBackpackItems } from '@/hooks/useBackpackItems';
import { useEatHamburger } from '@/hooks/useEatHamburger';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { createRoochClient } from '@/utils/rooch';

interface BackpackProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Backpack: React.FC<BackpackProps> = ({ isOpen, onClose }) => {
  const { data: items = [], refetch } = useBackpackItems();
  const { eatHamburger } = useEatHamburger();
  const address = useCurrentAddress();
  const client = createRoochClient();

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  const handleEat = async () => {
    try {
      const hamburgerItem = items.find(item => item.type === ITEM_TYPES.HAMBURGER);
      if (!hamburgerItem || hamburgerItem.quantity === 0) {
        throw new Error("No hamburger available");
      }
      const objects = await client.queryObjectStates({
        filter: {
          object_type_with_owner: {
            object_type: ITEM_TYPES.HAMBURGER,
            owner: address!.toStr(),
          },
        },
      });
      if (!objects.data.length) {
        throw new Error('No hamburger object found');
      }
      const objectId = objects.data[0].id;
      const success = await eatHamburger(objectId);
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
      title="Backpack"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid grid-cols-3 gap-4 p-4">
        {items.map((item) => (
          <BackpackItem
            key={item.id}
            item={item}
            onEat={() => handleEat()}
            onToggleEquip={item.isCard ? handleToggleEquip : undefined}
          />
        ))}
      </div>
    </Modal>
  );
};
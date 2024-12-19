import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';
import { BackpackItem } from './BackpackItem';
import { BackpackItemType, ITEM_TYPES, useBackpackItems } from '@/hooks/useBackpackItems';
import { useEatHamburger } from '@/hooks/useEatHamburger';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { createRoochClient } from '@/utils/rooch';
import { useHunger } from '@/hooks/queries/useHunger';
import { useToggleCard } from './hooks/useToggleCard';

interface BackpackProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Backpack: React.FC<BackpackProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { data: items = [], refetch } = useBackpackItems();
  const { eatHamburger } = useEatHamburger();
  const { refetchHunger } = useHunger();
  const address = useCurrentAddress();
  const client = createRoochClient();
  const { toggleCard } = useToggleCard();

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
        await refetchHunger();
      }
    } catch (error) {
      console.error('Failed to eat hamburger:', error);
    }
  };

  const handleToggleEquip = async (item: BackpackItemType) => {
    if (!item.isCard || item.quantity === 0) return;

    try {
      const objects = await client.queryObjectStates({
        filter: {
          object_type_with_owner: {
            object_type: item.type,
            owner: address!.toStr(),
          },
        },
      });

      if (!objects.data.length) {
        throw new Error('No card object found');
      }

      const objectId = objects.data[0].id;
      const success = await toggleCard(objectId, item.isEquipped);
      if (success) {
        await refetch();
      }
    } catch (error) {
      console.error('Failed to toggle card:', error);
    }
  };

  return (
    <Modal
      title={t('backpack.title')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="grid grid-cols-3 gap-4 p-4">
        {items.map((item) => (
          <BackpackItem
            key={item.id}
            item={item}
            onEat={item.type === ITEM_TYPES.HAMBURGER ? handleEat : undefined}
            onToggleEquip={item.isCard ? handleToggleEquip : undefined}
          />
        ))}
      </div>
    </Modal>
  );
};
import React from 'react';
import { NFT_IMAGES } from '@/constants/images';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { backpackStyles as styles } from '@/components/ui/Modal/styles';

interface BackpackProps {
  isOpen: boolean;
  onClose: () => void;
}

const items = [
  { id: 1, name: 'Gold', image: NFT_IMAGES.GOLD, quantity: 100 },
  { id: 2, name: 'Hamburger', image: NFT_IMAGES.HAMBURGER, quantity: 5 },
  { id: 3, name: 'Gold Ore', image: NFT_IMAGES.GOLD_ORE, quantity: 50 },
  { id: 4, name: 'Iron Ore', image: NFT_IMAGES.IRON_ORE, quantity: 200 },
  { id: 5, name: 'Copper Ore', image: NFT_IMAGES.COPPER_ORE, quantity: 150 },
  { id: 6, name: 'Silver Ore', image: NFT_IMAGES.SILVER_ORE, quantity: 75 },
];

export const Backpack: React.FC<BackpackProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="My Backpack"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.itemImageWrapper}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
            </div>
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQuantity}>x{item.quantity}</span>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
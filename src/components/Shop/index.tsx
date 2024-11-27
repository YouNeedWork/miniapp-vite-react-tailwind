import React from 'react';
import { NFT_IMAGES } from '@/constants/images';
import { Modal } from '@/components/ui/Modal';
import { shopStyles as styles } from '@/components/ui/Modal/styles';

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
}

const shopItems = [
  {
    id: 1,
    name: 'Refining Potion',
    image: NFT_IMAGES.REFINING_POTION,
    price: 1000,
    description: 'Increases mining efficiency by 50%'
  },
  {
    id: 2,
    name: 'Gold Hammer',
    image: NFT_IMAGES.GOLD,
    price: 5000,
    description: 'Doubles gold mining rate'
  },
  {
    id: 3,
    name: 'Energy Burger',
    image: NFT_IMAGES.HAMBURGER,
    price: 500,
    description: 'Restores 50 energy points'
  }
];

export const Shop: React.FC<ShopProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      title="Shop"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.list}>
        {shopItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.itemImage}
            />
            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>
              <p className={styles.itemDescription}>{item.description}</p>
              <div className={styles.priceContainer}>
                <img 
                  src="/imgs/g_icon.png" 
                  alt="Gold" 
                  className={styles.priceIcon} 
                />
                <span className={styles.priceValue}>{item.price}</span>
              </div>
            </div>
            <button className={styles.buyButton}>
              Buy
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};
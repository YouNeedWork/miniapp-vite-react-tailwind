import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '@/components/ui/Modal';
import { ShopItemCard } from './ShopItem';
import { SHOP_ITEMS } from './types';
import { shopStyles } from '@/components/ui/Modal/styles';
import { useMineInfo } from '@/hooks/queries/useMineInfo';
import { useShopPurchase } from './hooks/useShopPurchase';

interface ShopProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Shop: React.FC<ShopProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { data: mineInfo } = useMineInfo();
  const { handlePurchase } = useShopPurchase(onClose);
  const hasAutoMiner = mineInfo?.type === 'auto';

  return (
    <Modal
      title={t('shop.title')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={shopStyles.container}>
        <div className={shopStyles.content}>
          <div className="mb-4 text-center">
            <p className="text-sm font-medium text-gray-600">
              {hasAutoMiner 
                ? t('shop.alreadyOwnedMessage')
                : t('shop.description')}
            </p>
          </div>

          {SHOP_ITEMS.map((item) => (
            <ShopItemCard
              key={item.id}
              item={item}
              onRent={(days) => handlePurchase(item, days)}
              disabled={item.type !== "boost" && hasAutoMiner}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};
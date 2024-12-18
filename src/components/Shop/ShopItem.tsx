import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ShopItem } from './types';
import { useMineInfo } from '@/hooks/queries/useMineInfo';

interface ShopItemProps {
  item: ShopItem;
  onRent: (item: ShopItem, days: number) => void;
}

export const ShopItemCard: React.FC<ShopItemProps> = ({ item, onRent }) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState(item.rentalPeriods[0].days);
  const { data: mineInfo } = useMineInfo();
  const hasAutoMiner = mineInfo?.type === 'auto';

  const handleRent = () => {
    onRent(item, selectedPeriod);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-black p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg p-2">
          <img 
            src={item.image} 
            alt={t(`shop.items.${item.type}.name`)} 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">{t(`shop.items.${item.type}.name`)}</h3>
          <p className="text-sm text-gray-600">{t(`shop.items.${item.type}.description`)}</p>
          <p className="text-sm font-medium text-blue-600">
            {item.clicksPerSecond} {t('shop.clicksPerSecond')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          {item.rentalPeriods.map(({ days, price }) => (
            <button
              key={days}
              onClick={() => setSelectedPeriod(days)}
              disabled={hasAutoMiner}
              className={cn(
                "flex-1 py-1 px-2 rounded border-2 text-sm font-medium transition-colors",
                selectedPeriod === days
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200",
                hasAutoMiner && "opacity-50 cursor-not-allowed"
              )}
            >
              {days} {t('shop.days')}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img src="/imgs/g_icon.png" alt="Gold" className="w-4 h-4" />
            <span className="font-bold">
              {item.rentalPeriods.find(p => p.days === selectedPeriod)?.price}
            </span>
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleRent}
            disabled={hasAutoMiner}
          >
            {hasAutoMiner ? t('shop.alreadyOwned') : t('shop.rentNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};
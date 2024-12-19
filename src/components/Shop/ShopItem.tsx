import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ShopItem } from './types';
import { useMineInfo } from '@/hooks/queries/useMineInfo';
import { useBalances } from '@/hooks/queries/useBalances';
import toast from 'react-hot-toast';

interface ShopItemProps {
  item: ShopItem;
  onRent: (days: number) => void;
  disabled?: boolean;
}

export const ShopItemCard: React.FC<ShopItemProps> = ({ item, onRent, disabled }) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState(item.rentalPeriods[0].days);
  const { data: mineInfo } = useMineInfo();
  const { RgasBalance } = useBalances();
  
  const hasAutoMiner = mineInfo?.type === 'auto';
  const isBoostCard = item.type === 'boost';
  const selectedPrice = item.rentalPeriods.find(p => p.days === selectedPeriod)?.price || 0;
  const hasEnoughRgas = !isBoostCard || parseFloat(RgasBalance) >= selectedPrice;

  const handleAction = () => {
    if (isBoostCard && !hasEnoughRgas) {
      toast.error(t('shop.insufficientRgas'));
      return;
    }
    onRent(selectedPeriod);
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
          {item.clicksPerSecond && (
            <p className="text-sm font-medium text-blue-600">
              {item.clicksPerSecond} {t('shop.clicksPerSecond')}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          {item.rentalPeriods.map(({ days, price }) => (
            <button
              key={days}
              onClick={() => setSelectedPeriod(days)}
              disabled={!isBoostCard && disabled}
              className={cn(
                "flex-1 py-1 px-2 rounded border-2 text-sm font-medium transition-colors",
                selectedPeriod === days
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200",
                !isBoostCard && disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {days} {t('shop.days')}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img 
              src={item.currency === "RGAS" ? "/imgs/me/wallet_icon.png" : "/imgs/g_icon.png"} 
              alt={item.currency} 
              className="w-4 h-4" 
            />
            <span className="font-bold">
              {selectedPrice}
            </span>
            {isBoostCard && !hasEnoughRgas && (
              <span className="text-xs text-red-500 ml-1">
                ({t('shop.insufficientRgas')})
              </span>
            )}
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={handleAction}
            disabled={(!isBoostCard && disabled) || (isBoostCard && !hasEnoughRgas)}
          >
            {isBoostCard 
              ? t('shop.buyNow')
              : !isBoostCard && disabled 
                ? t('shop.alreadyOwned') 
                : t('shop.rentNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};
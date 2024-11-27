import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { ShopItem } from './types';

interface ShopItemProps {
  item: ShopItem;
  onRent: (item: ShopItem, days: number) => void;
}

export const ShopItemCard: React.FC<ShopItemProps> = ({ item, onRent }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(item.rentalPeriods[0].days);

  const handleRent = () => {
    onRent(item, selectedPeriod);
  };

  return (
    <div className="bg-white rounded-xl border-2 border-black p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg p-2">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.description}</p>
          <p className="text-sm font-medium text-blue-600">
            {item.clicksPerSecond} clicks/s
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2">
          {item.rentalPeriods.map(({ days, price }) => (
            <button
              key={days}
              onClick={() => setSelectedPeriod(days)}
              className={cn(
                "flex-1 py-1 px-2 rounded border-2 text-sm font-medium transition-colors",
                selectedPeriod === days
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200"
              )}
            >
              {days}d
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
          >
            Rent Now
          </Button>
        </div>
      </div>
    </div>
  );
};
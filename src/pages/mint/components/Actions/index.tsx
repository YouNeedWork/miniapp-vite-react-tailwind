import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonStyles } from './styles';
import { ManualMining } from '../MiningControls/ManualMining';
import { ClaimButton } from '../MiningControls/ClaimButton';
import { useMineInfo } from '@/hooks/queries/useMineInfo';
import { useAutoMiningRate } from '@/hooks/queries/useAutoMiningRate';

interface ActionsProps {
  mine: () => Promise<boolean>;
  autoMine: () => Promise<boolean>;
  hunger: string;
  onOpenBackpack: () => void;
  onOpenShop: () => void;
  onRefresh?: () => void;
}

export const Actions: React.FC<ActionsProps> = ({
  mine,
  autoMine,
  hunger,
  onOpenBackpack,
  onOpenShop,
  onRefresh
}) => {
  const { data: mineInfo } = useMineInfo();
  const { data: autoMiningAmount = 0 } = useAutoMiningRate();
  const isAutoMining = mineInfo?.type === 'auto';

  return (
    <div className="fixed bottom-[80px] inset-x-0 px-4 md:bottom-[120px] md:px-6 lg:bottom-[160px] lg:px-8">
      <div className="flex relative justify-between items-center mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
        {/* Left Side - Backpack */}
        <button
          onClick={onOpenBackpack}
          className={cn(
            buttonStyles.secondary,
            "w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
          )}
          aria-label="Open Backpack"
        >
          <img
            src="/imgs/mint/bag.png"
            alt="Backpack"
            className="object-contain w-[40px] h-[40px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px]"
          />
        </button>

        {/* Center - Manual Mining */}
        <ManualMining
          onMine={mine}
          hunger={hunger}
          onRefresh={onRefresh}
        />

        {/* Right Side - Shop and Claim */}
        <div className="flex flex-col items-end gap-2">
          {isAutoMining && (
            <ClaimButton
              onClaim={autoMine}
              claimableAmount={autoMiningAmount}
            />
          )}
          <button
            onClick={onOpenShop}
            className={cn(
              buttonStyles.secondary,
              "bg-gradient-to-b from-[#e2a9d7] to-[#d182c0]",
              "w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]"
            )}
            aria-label="Open Shop"
          >
            <ShoppingCart className="w-[40px] h-[40px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px] text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};
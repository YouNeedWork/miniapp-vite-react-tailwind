import React from 'react';
import { cn } from '@/lib/utils';
import { buttonStyles } from '../Actions/styles';

interface ClaimButtonProps {
  onClaim: () => Promise<boolean>;
  claimableAmount: number;
}

export const ClaimButton: React.FC<ClaimButtonProps> = ({
  onClaim,
  claimableAmount
}) => {
  if (claimableAmount <= 0) return null;

  return (
    <button
      onClick={onClaim}
      className={cn(
        buttonStyles.secondary,
        "bg-gradient-to-b from-[#edad4b] to-[#d99b39]",
        "w-[60px] h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px]",
        "flex flex-col items-center justify-center"
      )}
    >
      <img
        src="/imgs/mint.png"
        alt="Claim"
        className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px]"
      />
      <span className="text-white text-xs md:text-sm font-bold mt-1">
        {(claimableAmount / 1e6).toFixed(2)}
      </span>
    </button>
  );
};
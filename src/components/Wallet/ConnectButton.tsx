import React from 'react';
import { cn } from '@/lib/utils';

interface ConnectButtonProps {
  onClick: () => void;
  className?: string;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full px-6 py-4',
        'bg-gradient-to-b from-[#e04936] to-[#c43d2b]',
        'hover:from-[#c43d2b] hover:to-[#b33526]',
        'text-white text-xl font-bold',
        'rounded-full border-2 border-black',
        'shadow-lg transform transition-all duration-200',
        'hover:scale-105 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-[#e04936]/50',
        className
      )}
    >
      Connect Wallet
    </button>
  );
};
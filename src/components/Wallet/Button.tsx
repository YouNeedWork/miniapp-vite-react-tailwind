import React from 'react';
import { cn } from '@/lib/utils';

interface WalletButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'connect';
}

export const WalletButton = React.forwardRef<HTMLButtonElement, WalletButtonProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'w-full px-6 py-3 rounded-xl font-bold transition-all duration-200',
          variant === 'connect' && 'bg-[#e04936] hover:bg-[#c43d2b] text-white text-xl shadow-lg border-2 border-black',
          variant === 'default' && 'bg-[#afe1fa] hover:bg-[#9ad3f0] text-black',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

WalletButton.displayName = 'WalletButton';
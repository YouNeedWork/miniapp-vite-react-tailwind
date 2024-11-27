import React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/styles/utils';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full transition-colors';
    const variants = {
      default: 'bg-white text-gray-900 hover:bg-gray-100',
      primary: `bg-[${theme.colors.primary.blue}] text-white hover:bg-opacity-90`,
      secondary: `bg-[${theme.colors.primary.pink}] text-white hover:bg-opacity-90`
    };
    const sizes = {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12'
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isLoading && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
        ) : children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
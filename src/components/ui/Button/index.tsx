import React from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from './styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variants;
  size?: keyof typeof buttonVariants.sizes;
  rounded?: keyof typeof buttonVariants.rounded;
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary',
    size = 'md',
    rounded = 'md',
    fullWidth = false,
    isLoading = false,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants.base,
          buttonVariants.variants[variant],
          buttonVariants.sizes[size],
          buttonVariants.rounded[rounded],
          fullWidth && 'w-full',
          (isLoading || disabled) && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        <div className="flex items-center justify-center gap-2">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {children}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';
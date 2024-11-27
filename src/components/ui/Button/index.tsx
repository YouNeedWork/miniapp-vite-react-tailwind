import React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/styles/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors';
    const variants = {
      default: 'bg-white text-gray-900 hover:bg-gray-100',
      primary: `bg-[${theme.colors.primary.blue}] text-white hover:bg-opacity-90`,
      secondary: `bg-[${theme.colors.primary.pink}] text-white hover:bg-opacity-90`,
      outline: 'border border-gray-300 bg-transparent hover:bg-gray-100'
    };
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6 text-lg'
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
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
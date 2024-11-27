import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fluid = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto',
          'px-4 sm:px-6 lg:px-8',
          !fluid && 'max-w-7xl',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
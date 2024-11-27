import React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/styles/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  fluid?: boolean;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, fluid = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mx-auto px-4',
          !fluid && `max-w-[${theme.layout.container.maxWidth}]`,
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
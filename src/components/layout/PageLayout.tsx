import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { theme } from '@/styles/utils';
import { BottomNavigation } from '../BottomNavigation';

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  withNavigation?: boolean;
  withContainer?: boolean;
  background?: string;
}

export const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, withNavigation = true, withContainer = true, background, children, ...props }, ref) => {
    const content = withContainer ? <Container>{children}</Container> : children;

    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen w-screen',
          'bg-center bg-no-repeat bg-cover',
          withNavigation && `pb-[${theme.layout.navigation.height}]`,
          className
        )}
        style={background ? { backgroundImage: `url(${background})` } : undefined}
        {...props}
      >
        {content}
        {withNavigation && <BottomNavigation />}
      </div>
    );
  }
);

PageLayout.displayName = 'PageLayout';
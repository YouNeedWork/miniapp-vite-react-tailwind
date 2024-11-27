import React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/styles/utils';

type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  weight?: keyof typeof theme.typography.fontWeight;
  color?: string;
  as?: keyof JSX.IntrinsicElements;
}

const variantStyles: Record<TextVariant, string> = {
  h1: `text-4xl font-[${theme.typography.fontWeight.black}]`,
  h2: `text-3xl font-[${theme.typography.fontWeight.bold}]`,
  h3: `text-2xl font-[${theme.typography.fontWeight.bold}]`,
  h4: `text-xl font-[${theme.typography.fontWeight.bold}]`,
  body: `text-base font-[${theme.typography.fontWeight.normal}]`,
  caption: `text-sm font-[${theme.typography.fontWeight.medium}]`
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  ({ 
    className, 
    variant = 'body',
    weight,
    color,
    as,
    children,
    ...props
  }, ref) => {
    const Component = as || 'p';

    return (
      <Component
        ref={ref as any}
        className={cn(
          'font-[${theme.typography.fontFamily.poppins}]',
          variantStyles[variant],
          weight && `font-[${theme.typography.fontWeight[weight]}]`,
          className
        )}
        style={color ? { color } : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';
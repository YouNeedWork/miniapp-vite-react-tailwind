import { colors, spacing, typography, layout, components } from './theme';

export const createStyles = <T extends Record<string, any>>(styles: T) => styles;

export const cx = (...classes: (string | undefined | null | false)[]) => 
  classes.filter(Boolean).join(' ');

export type Theme = {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  layout: typeof layout;
  components: typeof components;
};

export const theme: Theme = {
  colors,
  spacing,
  typography,
  layout,
  components
};
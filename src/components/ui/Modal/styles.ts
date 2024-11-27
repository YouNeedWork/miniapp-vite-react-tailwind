import { theme } from '@/styles/theme';

export const modalStyles = {
  base: [
    'relative',
    'bg-white',
    'rounded-2xl border-4',
    `border-[${theme.colors.primary.blue}]`,
    'shadow-2xl',
    'overflow-hidden',
    'max-h-[90vh]',
    'flex flex-col',
  ].join(' '),

  header: [
    `bg-gradient-to-r from-[${theme.colors.primary.red}] via-[${theme.colors.primary.pink}] to-[${theme.colors.primary.red}]`,
    'py-3 px-4',
    `border-b-4 border-[${theme.colors.primary.blue}]`,
    'relative',
  ].join(' '),

  title: [
    'text-2xl font-black text-white text-center',
    'text-shadow-sm',
    'uppercase tracking-wider',
  ].join(' '),

  closeButton: [
    'absolute right-4 top-1/2 -translate-y-1/2',
    'w-8 h-8 rounded-full',
    `bg-[${theme.colors.primary.blue}] hover:bg-[${theme.colors.primary.lightBlue}]`,
    'border-2 border-white',
    'flex items-center justify-center',
    'text-white transition-colors duration-200',
    `focus:outline-none focus:ring-2 focus:ring-[${theme.colors.primary.red}]`,
  ].join(' '),

  content: [
    'flex-1',
    'overflow-y-auto',
    'scrollbar-thin',
    `scrollbar-thumb-[${theme.colors.primary.blue}]`,
    `scrollbar-track-[${theme.colors.primary.lightBlue}]`,
  ].join(' '),
};

export const backpackStyles = {
  grid: [
    'grid grid-cols-3 gap-4',
    'p-4',
  ].join(' '),

  item: [
    'relative flex flex-col items-center',
    'p-3 rounded-xl',
    `bg-gradient-to-b from-[${theme.colors.primary.blue}] to-[${theme.colors.primary.lightBlue}]`,
    'border-2 border-white',
    'transform transition-all duration-200',
    'hover:scale-105 active:scale-95',
    'cursor-pointer',
  ].join(' '),

  itemImageWrapper: [
    'w-16 h-16',
    'flex items-center justify-center',
    'bg-white/90 rounded-lg',
    'p-2',
  ].join(' '),

  itemImage: [
    'w-full h-full',
    'object-contain',
    'filter drop-shadow-lg',
  ].join(' '),

  itemDetails: [
    'flex flex-col items-center',
    'mt-2',
    'w-full',
  ].join(' '),

  itemName: [
    'text-sm font-bold text-white',
    'text-center',
    'text-shadow-sm',
    'truncate w-full',
  ].join(' '),

  itemQuantity: [
    'text-xs',
    `text-[${theme.colors.background.light}]`,
    'mt-1',
    'font-medium',
  ].join(' '),
};

export const shopStyles = {
  container: [
    'flex flex-col',
    'h-full max-h-[70vh]',
    'bg-white',
  ].join(' '),

  content: [
    'flex-1',
    'overflow-y-auto',
    'p-4',
    'space-y-4',
    'bg-[#fdeeba]',
  ].join(' '),

  item: [
    'flex items-center gap-4',
    'p-4 rounded-xl',
    `bg-gradient-to-b from-[${theme.colors.primary.blue}] to-[${theme.colors.primary.lightBlue}]`,
    'border-2 border-white',
    'transform transition-all duration-200',
    'hover:translate-x-1',
  ].join(' '),

  itemImage: [
    'w-16 h-16',
    'object-contain',
    'filter drop-shadow-lg',
  ].join(' '),

  itemInfo: [
    'flex-1',
  ].join(' '),

  itemName: [
    'font-bold text-white',
    'text-shadow-sm',
  ].join(' '),

  itemDescription: [
    'text-sm',
    `text-[${theme.colors.background.light}]/90`,
    'mt-1',
  ].join(' '),

  priceContainer: [
    'flex items-center gap-2 mt-2',
  ].join(' '),

  priceIcon: [
    'w-4 h-4',
    'filter drop-shadow',
  ].join(' '),

  priceValue: [
    `text-[${theme.colors.background.light}]`,
    'font-bold',
  ].join(' '),

  rentButton: [
    'px-4 py-2 rounded-lg',
    `bg-gradient-to-b from-[${theme.colors.primary.red}] to-[${theme.colors.primary.pink}]`,
    'text-white font-bold',
    'border-2 border-white',
    'transform transition-all duration-200',
    'hover:scale-105 active:scale-95',
    `focus:outline-none focus:ring-2 focus:ring-[${theme.colors.primary.red}]`,
  ].join(' '),
};
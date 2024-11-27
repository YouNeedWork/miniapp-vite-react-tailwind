import { cn } from '@/lib/utils';

export const buttonStyles = {
  base: cn(
    "transition-all duration-200",
    "border-2 border-black shadow-lg",
    "hover:scale-105 active:scale-95"
  ),

  secondary: cn(
    "w-[50px] h-[50px] rounded-full",
    "flex items-center justify-center",
    "bg-gradient-to-b from-[#afe1fa] to-[#6db3e1]"
  ),

  mining: cn(
    "w-[80px] h-[80px] rounded-full",
    "bg-gradient-to-b from-[#e04936] to-[#c43d2b]",
    "border-4 border-black shadow-xl",
    "transition-transform duration-200",
    "hover:scale-105 active:scale-95",
    "flex items-center justify-center"
  ),

  hunger: cn(
    "absolute -top-2 left-1/2 -translate-x-1/2",
    "px-3 py-1 rounded-full",
    "bg-[#67d488] border border-black",
    "text-white text-sm font-bold"
  )
};
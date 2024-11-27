export const buttonVariants = {
  base: [
    'inline-flex items-center justify-center',
    'font-bold transition-all duration-200',
    'border-2 border-black',
    'shadow-lg active:shadow-md',
    'transform active:scale-98',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
  ].join(' '),
  
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  
  variants: {
    primary: [
      'bg-gradient-to-b from-[#e04936] to-[#c43d2b] text-white',
      'hover:from-[#c43d2b] hover:to-[#b33526]',
      'focus:ring-[#e04936]/50',
    ].join(' '),
    
    secondary: [
      'bg-gradient-to-b from-[#afe1fa] to-[#6db3e1] text-black',
      'hover:from-[#9ad3f0] hover:to-[#5ca4d2]',
      'focus:ring-[#afe1fa]/50',
    ].join(' '),
    
    outline: [
      'bg-gradient-to-b from-white to-[#f0f0f0] text-black',
      'hover:from-[#f0f0f0] hover:to-[#e0e0e0]',
      'focus:ring-black/50',
    ].join(' '),
  },
  
  rounded: {
    none: 'rounded-none',
    sm: 'rounded',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full',
  },
};
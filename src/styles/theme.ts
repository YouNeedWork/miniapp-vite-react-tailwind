export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const;

export const container = {
  maxWidth: {
    xs: '100%',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
} as const;

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
} as const;

export const colors = {
  primary: {
    blue: '#6db3e1',
    lightBlue: '#afe1fa',
    pink: '#e2a9d7',
    yellow: '#edad4b',
    red: '#e04936',
    green: '#67d488',
    purple: '#999de4'
  },
  background: {
    white: '#ffffff',
    light: '#fdeeba'
  },
  border: {
    black: '#000000'
  },
  text: {
    white: '#ffffff',
    black: '#000000'
  }
} as const;

export const typography = {
  fontFamily: {
    poppins: ['Poppins', 'sans-serif']
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900'
  }
} as const;

export const layout = {
  navigation: {
    height: {
      mobile: '65px',
      tablet: '75px',
      desktop: '75px'
    },
    borderRadius: '10px'
  },
  container: {
    maxWidth: '1200px',
    padding: {
      mobile: spacing[4],
      tablet: spacing[6],
      desktop: spacing[8]
    }
  },
  header: {
    height: {
      mobile: '60px',
      tablet: '70px',
      desktop: '80px'
    }
  }
} as const;

export const components = {
  bottomNav: {
    tab: {
      base: {
        height: '45px',
        borderWidth: '3px',
        borderRadius: '5px',
        transition: 'all 300ms ease-in-out'
      },
      active: {
        width: '25%',
        backgroundColor: colors.primary.pink
      },
      inactive: {
        width: '20%',
        backgroundColor: colors.primary.lightBlue
      }
    },
    icon: {
      active: {
        width: '49.22px',
        height: '50.02px',
        marginTop: '-22px'
      },
      inactive: {
        width: '29.11px',
        height: '30.18px',
        marginTop: '-10px'
      }
    }
  }
} as const;

export const theme = {
  breakpoints,
  container,
  colors,
  spacing,
  typography,
  layout,
  components
} as const;
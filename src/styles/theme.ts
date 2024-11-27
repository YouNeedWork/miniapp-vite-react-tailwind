export const colors = {
  primary: {
    blue: '#6db3e1',
    lightBlue: '#ade2f8',
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

export const spacing = {
  px: '1px',
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
  56: '14rem',
  64: '16rem',
} as const;

export const typography = {
  fontFamily: {
    poppins: ['Poppins', 'sans-serif']
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem'
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    bold: '700',
    black: '900'
  }
} as const;

export const layout = {
  navigation: {
    height: '75px',
    borderRadius: '10px'
  },
  container: {
    maxWidth: '1200px'
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
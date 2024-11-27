/** @type {import('tailwindcss').Config} */
import { theme } from './src/styles/theme';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: theme.breakpoints,
    extend: {
      colors: theme.colors,
      spacing: theme.spacing,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      maxWidth: theme.container.maxWidth,
      height: {
        nav: theme.layout.navigation.height,
        header: theme.layout.header.height
      },
      padding: {
        container: theme.layout.container.padding
      }
    },
  },
  plugins: [],
};
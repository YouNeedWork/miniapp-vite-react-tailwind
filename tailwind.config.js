/** @type {import('tailwindcss').Config} */
import { colors, spacing, typography } from './src/styles/theme';

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors,
      spacing,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight
    },
  },
  plugins: [],
};
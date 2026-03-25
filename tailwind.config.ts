import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#0b1020',
        },
      },
    },
  },
  plugins: [],
};

export default config;

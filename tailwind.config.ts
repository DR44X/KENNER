import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        carbon: '#0A0A0B',
        mineral: '#F5F3EF',
        concrete: '#8A8A85',
        metalK: '#C9B37A',
        accent: '#FF3B2F', // uso mínimo, só CTA/micro-detalhe
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

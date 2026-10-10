import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        peony: 'var(--peony-pink)',
        blush: 'var(--soft-pink)',
        cream: 'var(--cream)',
        ivory: 'var(--ivory)',
        paper: 'var(--white)',
        ink: 'var(--ink)',
        cocoa: 'var(--ink)',
        espresso: 'var(--ink)',
        latte: 'var(--plum)',
        sand: 'var(--soft-pink)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-supporting)', 'sans-serif'],
        accent: ['var(--font-accent)', 'cursive'],
      },
    },
  },
  plugins: [],
};

export default config;

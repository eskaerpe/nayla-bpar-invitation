import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--vanilla-cream)',
        sand: 'var(--warm-sand)',
        latte: 'var(--latte)',
        cocoa: 'var(--cocoa-brown)',
        espresso: 'var(--espresso)',
        sage: 'var(--muted-sage)',
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

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans, Caveat } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600', '700'] });
const supporting = DM_Sans({ subsets: ['latin'], variable: '--font-supporting', weight: ['400', '500', '600', '700'] });
const accent = Caveat({ subsets: ['latin'], variable: '--font-accent', weight: ['500', '600'] });

export const metadata: Metadata = {
  title: "Nayla's Sweet Seventeen",
  description: 'A warm invitation for Nayla’s Sweet Seventeen.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="en" className={`${display.variable} ${supporting.variable} ${accent.variable}`}><body>{children}</body></html>;
}

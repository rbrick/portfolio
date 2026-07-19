import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Mono, Manrope } from 'next/font/google';
import './globals.css';

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Ryan — Software Engineer & Astrophotographer',
  description: 'Software engineer and astrophotographer. Selected work and images from under dark skies.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

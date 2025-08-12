import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@madrasah/ui/globals.css';

import ATContainer from '@madrasah/ui/components/ATContainer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Madrasah - Online Medrese',
  description: 'Online Medrese Projesi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className={`${inter.className} `}>
        <ATContainer>{children}</ATContainer>
      </body>
    </html>
  );
}

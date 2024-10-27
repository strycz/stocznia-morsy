import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ConvexClientProvider } from './ConvexClientProvider';
import { ReactNode } from 'react';
import Providers from './providers';
import Footer from '@/components/ui/footer';
import { NavBarComponent } from '@/components/nav-bar-component';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ConvexClientProvider>
            <NavBarComponent />
            {children}
            <Footer />
          </ConvexClientProvider>
        </Providers>
      </body>
    </html>
  );
}

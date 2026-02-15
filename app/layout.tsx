import Header from '@/components/Header';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/provider/theme-provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
});

const departureMono = localFont({
  src: '../public/fonts/DepartureMono-Regular.woff2',
  variable: '--font-departure',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  ),
  title: 'GitGlow - Thumbnail generator',
  description:
    'Generate custom GitHub-style thumbnails for your projects with GitGlow.',
  keywords: ['thumbnail generator', 'github', 'thumbnail', 'gitglow'],
  authors: [{ name: 'Lény Sauzet', url: 'https://lenysauzet.com' }],
  creator: 'Lény Sauzet',
  publisher: 'Lény Sauzet',
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrument.variable} ${departureMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <div className="h-screen overflow-hidden p-10 flex flex-col">
              <Header />
              <div className="flex-1  overflow-hidden flex flex-col">
                {children}
              </div>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

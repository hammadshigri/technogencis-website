import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ParallaxWrapper from '@/components/ux/Parallax';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const poppins = Poppins({
  variable: '--font-heading',
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TechnoGencis - Technology Solutions',
  description:
    'Leading technology solutions provider specializing in innovative software development, digital transformation, and cutting-edge technology consulting.',
  keywords: [
    'technology',
    'software development',
    'digital transformation',
    'consulting',
    'innovation',
  ],
  authors: [{ name: 'TechnoGencis' }],
  creator: 'TechnoGencis',
  publisher: 'TechnoGencis',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://technogencis.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TechnoGencis - Technology Solutions',
    description:
      'Leading technology solutions provider specializing in innovative software development, digital transformation, and cutting-edge technology consulting.',
    url: 'https://technogencis.com',
    siteName: 'TechnoGencis',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TechnoGencis - Technology Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TechnoGencis - Technology Solutions',
    description:
      'Leading technology solutions provider specializing in innovative software development, digital transformation, and cutting-edge technology consulting.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ParallaxWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ParallaxWrapper>
      </body>
    </html>
  );
}

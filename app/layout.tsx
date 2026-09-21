import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://yourfiles.local'),
  title: {
    default: 'YourFiles - Free PDF & Image Tools',
    template: '%s | YourFiles',
  },
  description: 'Fast, free, and privacy-respecting online PDF and image utilities. Process files directly in your browser without accounts, subscriptions, or server uploads.',
  applicationName: 'YourFiles',
  authors: [{ name: 'YourFiles Team' }],
  keywords: [
    'pdf merge',
    'pdf split',
    'pdf compress',
    'jpg to pdf',
    'image compress',
    'image resize',
    'jpg to png',
    'image to pdf',
    'free online tools',
    'browser local file processing',
  ],
  openGraph: {
    title: 'YourFiles - Free PDF & Image Tools',
    description: 'Fast, free, and privacy-respecting online PDF and image utilities with local browser processing.',
    url: 'https://yourfiles.local',
    siteName: 'YourFiles',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

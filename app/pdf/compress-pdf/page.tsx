import { Metadata } from 'next';
import CompressPdfClient from './CompressPdfClient';

export const metadata: Metadata = {
  title: 'Compress PDF - Reduce PDF File Size Online for Free | YourFiles',
  description: 'Compress and optimize PDF documents client-side. See actual original and compressed file sizes with transparent metrics. Free to use and browser-local.',
  openGraph: {
    title: 'Compress PDF Online - Free PDF Optimizer | YourFiles',
    description: 'Reduce PDF file sizes directly in your browser with transparent byte-level metrics.',
    type: 'website',
  },
};

export default function CompressPdfPage() {
  return <CompressPdfClient />;
}

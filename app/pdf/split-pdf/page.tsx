import { Metadata } from 'next';
import SplitPdfClient from './SplitPdfClient';

export const metadata: Metadata = {
  title: 'Split PDF - Extract Pages from PDF Online for Free',
  description: 'Split PDF files and extract individual pages or custom ranges (e.g. 1-3, 5). Fast, browser-local, and free to use.',
  alternates: {
    canonical: '/pdf/split-pdf',
  },
  openGraph: {
    title: 'Split PDF Online - Free PDF Page Extractor | YourFiles',
    description: 'Extract specific pages or page ranges from any PDF document locally in your browser.',
    type: 'website',
  },
};

export default function SplitPdfPage() {
  return <SplitPdfClient />;
}

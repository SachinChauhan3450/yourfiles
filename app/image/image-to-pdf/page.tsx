import { Metadata } from 'next';
import ImageToPdfClient from './ImageToPdfClient';

export const metadata: Metadata = {
  title: 'Image to PDF - Convert JPG, PNG, WebP to PDF Online Free | YourFiles',
  description: 'Convert multiple images of any format (JPG, PNG, WebP) into a clean, single PDF document in seconds. Free to use with browser-local processing.',
  openGraph: {
    title: 'Image to PDF Online - Free Universal Image Combiner | YourFiles',
    description: 'Combine JPG, PNG, and WebP images into a single PDF document in your browser.',
    type: 'website',
  },
};

export default function ImageToPdfPage() {
  return <ImageToPdfClient />;
}

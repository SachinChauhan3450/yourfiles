import { Metadata } from 'next';
import JpgToPdfClient from './JpgToPdfClient';

export const metadata: Metadata = {
  title: 'JPG to PDF - Convert JPG Images to PDF Online Free | YourFiles',
  description: 'Convert JPG pictures to PDF files online in seconds. Reorder pages, customize paper orientation, and merge multiple JPGs into one PDF. Free to use.',
  openGraph: {
    title: 'JPG to PDF Online - Free Image to PDF Converter | YourFiles',
    description: 'Convert JPG images to PDF documents locally in your browser with orientation and layout controls.',
    type: 'website',
  },
};

export default function JpgToPdfPage() {
  return <JpgToPdfClient />;
}

import { Metadata } from 'next';
import JpgToPngClient from './JpgToPngClient';

export const metadata: Metadata = {
  title: 'JPG to PNG - Convert JPG to Lossless PNG Online Free',
  description: 'Convert JPG pictures to crisp PNG images online in your browser. Client-side lossless canvas conversion, free to use without account requirements.',
  alternates: {
    canonical: '/image/jpg-to-png',
  },
  openGraph: {
    title: 'JPG to PNG Online - Free Image Converter | YourFiles',
    description: 'Convert JPG images to PNG format instantly without uploading files to external servers.',
    type: 'website',
  },
};

export default function JpgToPngPage() {
  return <JpgToPngClient />;
}

import { Metadata } from 'next';
import JpgToPngClient from './JpgToPngClient';

export const metadata: Metadata = {
  title: 'JPG to PNG - Convert JPG to Lossless PNG Online Free | YourFiles',
  description: 'Convert JPG pictures to crisp PNG images online in your browser. Pure client-side lossless canvas conversion, 100% free with no limits.',
  openGraph: {
    title: 'JPG to PNG Online - Free Image Converter | YourFiles',
    description: 'Convert JPG images to PNG format instantly without uploading files to external servers.',
    type: 'website',
  },
};

export default function JpgToPngPage() {
  return <JpgToPngClient />;
}

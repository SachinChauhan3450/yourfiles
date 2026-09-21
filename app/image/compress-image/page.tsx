import { Metadata } from 'next';
import CompressImageClient from './CompressImageClient';

export const metadata: Metadata = {
  title: 'Compress Image - Reduce JPG, PNG, WebP Size Online',
  description: 'Compress images online for free. Support JPG, PNG, and WebP with live quality controls and instant side-by-side preview. Browser-local processing.',
  alternates: {
    canonical: '/image/compress-image',
  },
  openGraph: {
    title: 'Compress Image Online - Free Image Optimizer | YourFiles',
    description: 'Reduce JPG, PNG, and WebP image sizes client-side with real-time compression preview.',
    type: 'website',
  },
};

export default function CompressImagePage() {
  return <CompressImageClient />;
}

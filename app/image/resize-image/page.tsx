import { Metadata } from 'next';
import ResizeImageClient from './ResizeImageClient';

export const metadata: Metadata = {
  title: 'Resize Image - Change Photo Dimensions Online for Free',
  description: 'Resize image dimensions by pixels or percentages with aspect ratio lock and presets (Full HD, Square, Social). Fast, browser-local, and free to use.',
  alternates: {
    canonical: '/image/resize-image',
  },
  openGraph: {
    title: 'Resize Image Online - Free Image Resizer | YourFiles',
    description: 'Change image dimensions easily with aspect ratio locking and quick presets.',
    type: 'website',
  },
};

export default function ResizeImagePage() {
  return <ResizeImageClient />;
}

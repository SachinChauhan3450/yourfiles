import { Metadata } from 'next';
import MergePdfClient from './MergePdfClient';

export const metadata: Metadata = {
  title: 'Merge PDF - Combine PDF Files Online for Free | YourFiles',
  description: 'Merge multiple PDF files into one single document directly in your browser. Reorder pages, preserve quality, 100% free with local processing.',
  openGraph: {
    title: 'Merge PDF Online - Free PDF Combiner | YourFiles',
    description: 'Combine multiple PDF files into a single document in your browser without uploading to external servers.',
    type: 'website',
  },
};

export default function MergePdfPage() {
  return <MergePdfClient />;
}

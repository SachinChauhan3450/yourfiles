import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { PDF_TOOLS } from '../../lib/toolsData';
import ToolCard from '../../components/ui/ToolCard';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PDF Tools - Free Online PDF Utilities',
  description: 'Merge, split, compress, and convert PDF files directly in your browser. Free, fast, and no server uploads.',
  alternates: {
    canonical: '/pdf',
  },
  openGraph: {
    title: 'Free PDF Tools - Fast & Private | YourFiles',
    description: 'Process PDF documents client-side in your browser. Fast, browser-local, and free to use.',
  },
};

export default function PdfCategoryPage() {
  return (
    <div className="container" style={{ paddingBottom: '48px' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        marginBottom: '20px',
      }}>
        <Link href="/" className="hover-link-muted">Home</Link>
        <ChevronRight size={13} />
        <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>PDF Tools</span>
      </nav>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ display: 'inline-flex', marginBottom: '10px' }}>
          <span className="badge badge-pdf">PDF Utilities</span>
        </div>
        <h1 style={{
          fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--text-main)',
          marginBottom: '8px',
        }}>
          Free PDF Tools
        </h1>
        <p style={{
          fontSize: '1.02rem',
          color: 'var(--text-secondary)',
          maxWidth: '560px',
          margin: '0 auto 16px',
          lineHeight: 1.5,
        }}>
          Merge, split, optimize, and convert PDF documents in your browser. No accounts, queues, or server storage.
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--success-subtle)',
          border: '1px solid var(--success-border)',
          color: '#15803d',
          fontSize: '0.8rem',
          fontWeight: 500,
        }}>
          <ShieldCheck size={15} />
          <span>Files are processed locally in your browser and aren&apos;t uploaded to our servers.</span>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid-tools">
        {PDF_TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Free PDF & Image Tools',
  description: 'Learn about YourFiles, our mission to provide fast, free, account-free online PDF and image utilities powered by client-side browser technology.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="container" style={{ maxWidth: '760px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
          About YourFiles
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Fast, accessible, and privacy-respecting file utilities for everyone.
        </p>
      </div>

      <div className="utility-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7, fontSize: '0.96rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 700 }}>
          Our Mission
        </h2>
        <p>
          Most online file tools require account creation, bombard users with intrusive popups, restrict file sizes behind paid subscriptions, or transmit sensitive personal documents to remote servers.
        </p>
        <p>
          We built <strong>YourFiles</strong> as a reliable, straightforward alternative. All utilities operate directly within your web browser using modern client-side standards. There are no paywalls, no monthly subscription fees, and no waiting in server queues.
        </p>

        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          How It Works Under the Hood
        </h2>
        <p>
          Instead of transferring multi-megabyte files across the internet to third-party cloud servers, YourFiles runs WebAssembly, JavaScript, and HTML5 Canvas algorithms directly on your local device.
        </p>
        <div style={{
          padding: '14px 18px',
          backgroundColor: 'var(--success-subtle)',
          border: '1px solid var(--success-border)',
          borderRadius: 'var(--radius-md)',
          color: '#15803d',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <ShieldCheck size={20} style={{ flexShrink: 0 }} />
          <span>Files are processed locally in your browser and aren&apos;t uploaded to our servers.</span>
        </div>

        <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          Key Principles
        </h2>
        <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>Free of Charge:</strong> Free to use without hidden fees, paid tiers, or watermarks.</li>
          <li><strong>Zero Accounts:</strong> No signups, email confirmations, or password logins.</li>
          <li><strong>Zero Latency:</strong> No uploading or cloud queue delays.</li>
          <li><strong>Honest Metrics:</strong> We report actual byte savings without fabricated compression statistics.</li>
        </ul>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/" className="btn btn-primary" style={{ padding: '12px 24px' }}>
          <span>Explore All Tools</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

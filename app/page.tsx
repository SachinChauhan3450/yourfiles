import React from 'react';
import { Metadata } from 'next';
import HomeHeroAndTools from '../components/home/HomeHeroAndTools';
import {
  ShieldCheck,
  Zap,
  HardDriveDownload,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'YourFiles - Free PDF & Image Tools',
  description: 'Convert, compress, resize, and manage your PDF and image files directly in your browser. 100% free, fast, and no server uploads.',
  openGraph: {
    title: 'YourFiles - Free PDF & Image Tools',
    description: 'Convert, compress, resize, and manage your files online. No accounts, no fees, private browser-local processing.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div>
      {/* Interactive Hero, Search & Centerpiece Tools Grid */}
      <HomeHeroAndTools />

      {/* Why use YourFiles Section */}
      <section style={{
        paddingTop: '36px',
        paddingBottom: '40px',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: '#ffffff',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px', letterSpacing: '-0.02em' }}>
              Why use YourFiles?
            </h2>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto' }}>
              A clean, modern utility platform built with respect for your time, device, and personal files.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '16px',
          }}>
            {/* Benefit 1 */}
            <div className="benefit-card">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--success-subtle)',
                color: 'var(--success)',
                border: '1px solid var(--success-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                <CheckCircle2 size={20} />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px' }}>
                Free to use
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                All current tools are available without an account or subscription.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="benefit-card">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-subtle)',
                color: 'var(--primary)',
                border: '1px solid var(--primary-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                <Zap size={20} />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px' }}>
                No Account Required
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Open a tool and start working immediately.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="benefit-card">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--primary-subtle)',
                color: 'var(--primary)',
                border: '1px solid var(--primary-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                <ShieldCheck size={20} />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px' }}>
                Local Browser Processing
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Files are processed locally in your browser and aren&apos;t uploaded to our servers.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="benefit-card">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
              }}>
                <HardDriveDownload size={20} />
              </div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '5px' }}>
                No Server Storage
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Your files aren&apos;t stored on our servers as part of the processing workflow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

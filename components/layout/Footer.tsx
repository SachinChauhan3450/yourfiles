import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, Lock } from 'lucide-react';
import { PDF_TOOLS, IMAGE_TOOLS } from '../../lib/toolsData';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      backgroundColor: '#ffffff',
      marginTop: 'auto',
      paddingTop: '36px',
      paddingBottom: '28px',
    }}>
      <div className="container">
        {/* Core Value Props Banner */}
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          marginBottom: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--success)',
              border: '1px solid var(--border-color)',
              flexShrink: 0,
            }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px', color: 'var(--text-main)' }}>
                Browser-Local Processing
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.45 }}>
                Files are processed locally in your browser and aren&apos;t uploaded to our servers.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--primary)',
              border: '1px solid var(--border-color)',
              flexShrink: 0,
            }}>
              <Zap size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px', color: 'var(--text-main)' }}>
                Fast &amp; No Sign-Up
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.45 }}>
                No account, no waiting for cloud queues, and no subscription required.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
            <div style={{
              backgroundColor: '#ffffff',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              flexShrink: 0,
            }}>
              <Lock size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px', color: 'var(--text-main)' }}>
                No Server Storage
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.45 }}>
                Your files aren&apos;t stored on our servers as part of the processing workflow.
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}>
                Y
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>YourFiles</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              A fast, free utility website for everyday PDF and image tasks without accounts or server storage.
            </p>
          </div>

          {/* PDF Tools */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              PDF Tools
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {PDF_TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link href={tool.path} className="hover-link" style={{ fontSize: '0.88rem' }}>
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Image Tools */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Image Tools
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {IMAGE_TOOLS.map((tool) => (
                <li key={tool.id}>
                  <Link href={tool.path} className="hover-link" style={{ fontSize: '0.88rem' }}>
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Legal */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Company
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <Link href="/about" className="hover-link" style={{ fontSize: '0.88rem' }}>
                  About YourFiles
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover-link" style={{ fontSize: '0.88rem' }}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover-link" style={{ fontSize: '0.88rem' }}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover-link" style={{ fontSize: '0.88rem' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
        }}>
          <div>
            © {new Date().getFullYear()} YourFiles. Free PDF & Image Tools.
          </div>
          <div>
            Files are processed locally in your browser and aren&apos;t uploaded to our servers.
          </div>
        </div>
      </div>
    </footer>
  );
}

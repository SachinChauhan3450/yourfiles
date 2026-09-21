import React from 'react';
import { Metadata } from 'next';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - YourFiles | Free PDF & Image Tools',
  description: 'Get in touch with the YourFiles team for feedback, bug reports, or feature suggestions.',
};

export default function ContactPage() {
  return (
    <div className="container" style={{ maxWidth: '760px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
          Contact Us
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Have feedback, found an issue, or want to suggest a new tool? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="utility-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}>
          <div style={{
            backgroundColor: 'var(--bg-page)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--primary-subtle)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Mail size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                General Inquiries
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                For questions or suggestions:
              </div>
              <a href="mailto:probhiya456@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                probhiya456@gmail.com
              </a>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-page)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--success-subtle)',
              color: 'var(--success)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <MessageSquare size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '2px' }}>
                Bug Reports
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Include browser name &amp; device details:
              </div>
              <a href="mailto:probhiya456@gmail.com?subject=Bug%20Report%20-%20YourFiles" style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
                probhiya456@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div style={{
          padding: '14px 18px',
          backgroundColor: 'var(--success-subtle)',
          border: '1px solid var(--success-border)',
          borderRadius: 'var(--radius-md)',
          color: '#15803d',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <ShieldCheck size={18} style={{ flexShrink: 0 }} />
          <span>Please do not send sensitive personal documents via email when reporting issues.</span>
        </div>
      </div>
    </div>
  );
}

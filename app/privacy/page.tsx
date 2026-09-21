import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - YourFiles | Free PDF & Image Tools',
  description: 'Read our transparent privacy policy. Learn how YourFiles processes files locally in your browser with zero server uploads and zero retention.',
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ maxWidth: '780px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Last updated: September 2026
        </p>
      </div>

      <div className="utility-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
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
          <ShieldCheck size={22} style={{ flexShrink: 0 }} />
          <span>Files are processed locally in your browser and aren&apos;t uploaded to our servers.</span>
        </div>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700 }}>
          1. File Processing Architecture
        </h2>
        <p>
          Unlike traditional web converters that require sending your documents over the network to remote backend servers, <strong>YourFiles</strong> runs all processing logic client-side within your own web browser.
        </p>
        <p>
          When you select a PDF or image file:
        </p>
        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>The file is read into your browser&apos;s local memory (RAM) via standard browser APIs (such as HTML5 Canvas and FileReader).</li>
          <li>All operations (merging, splitting, compressing, resizing, format conversion) are executed on your device&apos;s CPU.</li>
          <li>The file is never transmitted across the internet to our hosting servers, databases, or third-party cloud processors.</li>
        </ul>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          2. File Storage and Deletion
        </h2>
        <p>
          Because your files never touch our servers, <strong>we do not store, log, inspect, or archive any of your documents or images</strong>.
        </p>
        <p>
          Your files exist temporarily in your browser tab&apos;s memory while you interact with the tool. Once you close the tab, refresh the page, or click &ldquo;Process Another File&rdquo;, the temporary memory handles and object URLs are immediately released and garbage-collected by your browser.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          3. Personal Information and Accounts
        </h2>
        <p>
          YourFiles does not provide accounts, logins, or user profiles. We do not ask for, collect, or store personal identifiers such as names, email addresses, phone numbers, or payment credentials.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          4. Cookies and Tracking
        </h2>
        <p>
          We do not use advertising tracking cookies. We do not monitor your browsing behavior across external websites.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          5. Contact Us
        </h2>
        <p>
          If you have questions regarding our implementation or privacy practices, please contact us via our <a href="/contact" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Contact Page</a>.
        </p>
      </div>
    </div>
  );
}

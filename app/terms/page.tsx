import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - YourFiles | Free PDF & Image Tools',
  description: 'Terms of service and usage conditions for YourFiles online utility tools.',
};

export default function TermsPage() {
  return (
    <div className="container" style={{ maxWidth: '780px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
          Terms of Service
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Last updated: September 2026
        </p>
      </div>

      <div className="utility-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.7, fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700 }}>
          1. Acceptance of Terms
        </h2>
        <p>
          By using <strong>YourFiles</strong>, you agree to these Terms of Service. If you do not agree with any part of these terms, please do not use the website.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          2. Nature of the Service
        </h2>
        <p>
          YourFiles provides free, client-side browser utilities for manipulating PDF and image files. All processing occurs on your local machine using standard web technology. We do not provide remote file hosting or storage services.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          3. Permitted Use
        </h2>
        <p>
          You agree to use this website only for lawful purposes. You must possess the appropriate intellectual property rights and permissions for any files you load into the application.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          4. Disclaimer of Warranties
        </h2>
        <p>
          YourFiles is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind. While we aim for high reliability, we do not warrant that all non-standard, password-locked, or corrupt files can be recovered or processed without error.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          5. Limitation of Liability
        </h2>
        <p>
          In no event shall YourFiles or its operators be liable for any direct, indirect, incidental, or consequential damages resulting from the use of or inability to use the services.
        </p>
      </div>
    </div>
  );
}

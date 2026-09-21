import React from 'react';
import { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - YourFiles | Free PDF & Image Tools',
  description: 'Read our privacy policy. Learn how YourFiles processes files locally in your browser without server uploads or server-side document storage.',
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
          Unlike traditional web converters that require sending your documents over the network to remote backend servers, <strong>YourFiles</strong> runs file manipulation logic client-side within your own web browser.
        </p>
        <p>
          When you select a PDF or image file:
        </p>
        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>The file is read into your browser&apos;s local memory via standard browser APIs (such as HTML5 Canvas, FileReader, and WebAssembly).</li>
          <li>All operations (merging, splitting, compressing, resizing, format conversion) are executed on your device&apos;s processor.</li>
          <li>The file data is not uploaded or transmitted to our servers or third-party cloud processing pipelines.</li>
        </ul>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          2. Document Storage and Lifecycle
        </h2>
        <p>
          Because file processing happens locally in your browser, <strong>we do not store, inspect, or archive your documents or images on our servers</strong> as part of the processing workflow.
        </p>
        <p>
          Your files exist temporarily in your device&apos;s local browser memory while you interact with the tool. Once you close the browser tab, refresh the page, or clear the file, the temporary memory handles and object URLs are discarded by your browser.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          3. Information We Collect
        </h2>
        <p>
          <strong>No User Accounts:</strong> YourFiles does not require accounts, sign-ups, or login credentials. We do not ask for or collect names, phone numbers, or billing information.
        </p>
        <p>
          <strong>Direct Inquiries:</strong> When you voluntarily email us at <a href="mailto:probhiya456@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>probhiya456@gmail.com</a> for support, questions, or bug reports, we receive the email address you send from and the contents of your message. This personal data is used solely to respond to your inquiry and troubleshoot reported technical issues. It is not shared with third parties or used for marketing.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          4. Hosting and Technical Infrastructure Logs
        </h2>
        <p>
          YourFiles is hosted on static cloud infrastructure provided by Vercel. Like most web hosting platforms, standard HTTP connection logs (such as IP addresses, user-agent strings, and request timestamps) may be processed temporarily by the hosting infrastructure solely for security monitoring, DDoS prevention, and reliable content delivery. These standard infrastructure logs do not include the contents of the files you process in your browser.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          5. External Resources &amp; Cookies
        </h2>
        <p>
          <strong>Cookies &amp; Tracking:</strong> YourFiles does not set advertising tracking cookies, does not use web beacons or tracking pixels, and does not employ third-party analytics scripts to track user sessions.
        </p>
        <p>
          <strong>Web Fonts:</strong> Web typography is provided via Google Fonts. When your browser loads these fonts, it makes a standard HTTP request to Google&apos;s content delivery network.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          6. Data Protection Notice (DPDP Act, 2023 &amp; DPDP Rules, 2025)
        </h2>
        <p>
          Under the Digital Personal Data Protection Act, 2023 and notified DPDP Rules, 2025 (India), users (Data Principals) who communicate with us have specific rights regarding personal data voluntarily provided:
        </p>
        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li><strong>Right to Access:</strong> You may request a summary of personal data (such as email correspondence) held by us.</li>
          <li><strong>Right to Correction &amp; Erasure:</strong> You may request the correction or deletion of your email correspondence data when it is no longer required for the purpose it was provided.</li>
          <li><strong>Right to Grievance Redressal:</strong> You have the right to register concerns or grievances regarding the handling of your communications.</li>
        </ul>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          7. Grievance Redressal &amp; Contact Information
        </h2>
        <p>
          For any questions, privacy inquiries, or data protection concerns, please contact our designated grievance contact at:
        </p>
        <div style={{
          backgroundColor: 'var(--bg-subtle)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginTop: '6px',
        }}>
          <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>YourFiles Grievance &amp; Privacy Contact</div>
          <div style={{ marginTop: '4px' }}>
            Email: <a href="mailto:probhiya456@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>probhiya456@gmail.com</a>
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Inquiries will be reviewed and acknowledged in accordance with applicable data protection timelines.
          </div>
        </div>
      </div>
    </div>
  );
}

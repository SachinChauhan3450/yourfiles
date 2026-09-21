import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Free PDF & Image Tools',
  description: 'Terms of service and usage conditions for YourFiles online utility tools.',
  alternates: {
    canonical: '/terms',
  },
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
          By accessing or using <strong>YourFiles</strong>, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the website.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          2. Nature of the Service
        </h2>
        <p>
          YourFiles provides free, client-side web utility tools for viewing, converting, resizing, merging, splitting, and compressing PDF and image files. All processing operations are executed locally within your device&apos;s browser using client-side technologies. YourFiles does not operate a file hosting, cloud storage, or document archiving service.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          3. Permitted and Prohibited Use
        </h2>
        <p>
          You agree to use this website only for lawful personal or professional utility purposes. You agree not to:
        </p>
        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>Use the service to process, generate, or distribute material that is illegal, defamatory, obscene, or fraudulent.</li>
          <li>Attempt to interfere with, disrupt, or compromise the integrity or security of the website or hosting infrastructure.</li>
          <li>Circumvent or attempt to bypass any device or browser security sandboxing mechanisms.</li>
          <li>Scrape, crawl, or deploy automated abusive requests that impair availability for other users.</li>
        </ul>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          4. User Files and Intellectual Property Rights
        </h2>
        <p>
          You retain full ownership and all intellectual property rights to the files you load and process using YourFiles. You represent and warrant that you possess all necessary rights, licenses, and permissions to process any document or image you load into the application.
        </p>
        <p>
          Because file manipulation occurs locally in your browser, YourFiles does not claim any ownership, license, or right over your processed files.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          5. Copyright and Intellectual Property Inquiries
        </h2>
        <p>
          YourFiles respects intellectual property rights. If you believe any website content or asset infringes upon your copyright or intellectual property, please notify us with relevant documentation at <a href="mailto:probhiya456@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>probhiya456@gmail.com</a>.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          6. Disclaimer of Warranties &amp; Conversion Results
        </h2>
        <p>
          YourFiles is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, either express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.
        </p>
        <p>
          While we strive for accurate conversion, compression, and rendering:
        </p>
        <ul style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>Conversion outcomes, compression ratios, and processing speeds depend on your device&apos;s hardware, browser capabilities, and the specific structural encoding of input files.</li>
          <li>Files that are corrupted, malformed, password-protected, or encrypted may fail to process or require decryption before processing.</li>
          <li>We do not guarantee that the service will be uninterrupted, error-free, or compatible with all legacy or non-standard file formats.</li>
        </ul>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          7. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by applicable law, in no event shall YourFiles, its creators, or its operators be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to loss of data, file corruption, device impairment, or loss of profits arising out of or related to your use of or inability to use the service.
        </p>

        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 700, marginTop: '8px' }}>
          8. Changes to Terms &amp; Contact
        </h2>
        <p>
          We may update these terms periodically. Continued use of the website following any changes constitutes acceptance of the revised terms. For inquiries regarding these terms, please contact: <a href="mailto:probhiya456@gmail.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>probhiya456@gmail.com</a>.
        </p>
      </div>
    </div>
  );
}

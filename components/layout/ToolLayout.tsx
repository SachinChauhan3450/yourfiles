'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { ToolMeta } from '../../lib/types';
import ToolCard from '../ui/ToolCard';
import { ALL_TOOLS } from '../../lib/toolsData';

interface ToolLayoutProps {
  tool: ToolMeta;
  children: React.ReactNode;
  steps: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export default function ToolLayout({
  tool,
  children,
  steps,
  faqs,
}: ToolLayoutProps) {
  const isPdf = tool.category === 'pdf';
  const categoryLabel = isPdf ? 'PDF Tools' : 'Image Tools';
  const categoryHref = isPdf ? '/pdf' : '/image';

  const relatedTools = ALL_TOOLS
    .filter((t) => t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="container" style={{ maxWidth: '920px', margin: '0 auto', paddingBottom: '48px' }}>
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.82rem',
        color: 'var(--text-muted)',
        marginBottom: '20px',
      }}>
        <Link href="/" className="hover-link-muted">
          Home
        </Link>
        <ChevronRight size={13} />
        <Link href={categoryHref} className="hover-link-muted">
          {categoryLabel}
        </Link>
        <ChevronRight size={13} />
        <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>
          {tool.title}
        </span>
      </nav>

      {/* Header Section */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ display: 'inline-flex', marginBottom: '10px' }}>
          <span className={`badge ${isPdf ? 'badge-pdf' : 'badge-image'}`}>
            {isPdf ? 'PDF Tool' : 'Image Tool'}
          </span>
        </div>

        <h1 style={{
          fontSize: 'clamp(1.85rem, 3.4vw, 2.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          color: 'var(--text-main)',
          marginBottom: '8px',
        }}>
          {tool.title}
        </h1>

        <p style={{
          fontSize: '1.02rem',
          color: 'var(--text-secondary)',
          maxWidth: '580px',
          margin: '0 auto 16px',
          lineHeight: 1.5,
        }}>
          {tool.description}
        </p>

        {/* Local Processing Guarantee Banner */}
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

      {/* Tool Interactive Workspace Card */}
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        marginBottom: '48px',
        boxShadow: 'var(--shadow-md)',
      }}>
        {children}
      </div>

      {/* How To Use */}
      {steps.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '1.35rem',
            fontWeight: 800,
            color: 'var(--text-main)',
            marginBottom: '20px',
            textAlign: 'center',
            letterSpacing: '-0.015em',
          }}>
            How to use {tool.title}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
          }}>
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="step-card"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)',
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: 'var(--brand-gradient)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  marginBottom: '12px',
                  boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
                }}>
                  {idx + 1}
                </div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <section style={{ marginBottom: '48px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '20px',
          }}>
            <HelpCircle size={20} color="var(--primary)" />
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.015em' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="faq-card"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '18px 20px',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
                }}
              >
                <h3 style={{ fontSize: '0.96rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>
                  {faq.question}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      <section>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '18px', textAlign: 'center' }}>
          More Free Tools
        </h2>
        <div className="grid-tools">
          {relatedTools.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      </section>

      <style jsx>{`
        .step-card:hover {
          transform: translateY(-2px);
          border-color: var(--border-hover) !important;
          box-shadow: var(--shadow-sm) !important;
        }
        .faq-card:hover {
          border-color: var(--border-hover) !important;
          box-shadow: var(--shadow-sm) !important;
        }
      `}</style>
    </div>
  );
}

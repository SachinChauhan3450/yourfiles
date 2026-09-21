'use client';

import React from 'react';
import Link from 'next/link';
import {
  Files,
  Scissors,
  Minimize2,
  FileImage,
  ImageDown,
  Scaling,
  Repeat,
  FileStack,
  ArrowRight,
} from 'lucide-react';
import { ToolMeta } from '../../lib/types';

interface ToolCardProps {
  tool: ToolMeta;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Files,
  Scissors,
  Minimize2,
  FileImage,
  ImageDown,
  Scaling,
  Repeat,
  FileStack,
};

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = ICON_MAP[tool.iconName] || Files;
  const isPdf = tool.category === 'pdf';

  return (
    <Link
      href={tool.path}
      className={`tool-card-animated ${isPdf ? 'theme-pdf' : 'theme-image'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        textDecoration: 'none',
        height: '100%',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div
            className="icon-box"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isPdf ? 'var(--pdf-subtle)' : 'var(--image-subtle)',
              color: isPdf ? 'var(--pdf-accent)' : 'var(--image-accent)',
              border: `1px solid ${isPdf ? 'var(--pdf-border)' : 'var(--image-border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <IconComponent size={19} />
          </div>

          <span className={`badge ${isPdf ? 'badge-pdf' : 'badge-image'}`}>
            {isPdf ? 'PDF' : 'Image'}
          </span>
        </div>

        <h3 style={{
          fontSize: '1.02rem',
          fontWeight: 700,
          color: 'var(--text-main)',
          marginBottom: '5px',
          letterSpacing: '-0.015em',
        }}>
          {tool.title}
        </h3>

        <p style={{
          fontSize: '0.84rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.45,
          marginBottom: '16px',
        }}>
          {tool.tagline}
        </p>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '0.82rem',
        fontWeight: 600,
        color: isPdf ? 'var(--pdf-accent)' : 'var(--primary)',
        paddingTop: '10px',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <span>Open tool</span>
        <ArrowRight size={13} className="arrow-icon" style={{ transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)' }} />
      </div>

      <style jsx>{`
        .tool-card-animated:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-hover) !important;
          border-color: var(--border-hover) !important;
        }
        .tool-card-animated:hover .icon-box {
          transform: scale(1.06);
        }
        .tool-card-animated:hover .arrow-icon {
          transform: translateX(4px);
        }
        .tool-card-animated:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .tool-card-animated:hover,
          .tool-card-animated:hover .icon-box,
          .tool-card-animated:hover .arrow-icon {
            transform: none !important;
          }
        }
      `}</style>
    </Link>
  );
}

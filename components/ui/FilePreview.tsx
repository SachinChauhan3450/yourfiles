'use client';

import React from 'react';
import { formatBytes } from '../../lib/utils';

interface FilePreviewProps {
  originalUrl?: string;
  processedUrl?: string;
  originalSize?: number;
  newSize?: number;
  alt?: string;
}

export default function FilePreview({
  originalUrl,
  processedUrl,
  originalSize,
  newSize,
  alt = 'Image preview',
}: FilePreviewProps) {
  if (!originalUrl && !processedUrl) return null;

  return (
    <div style={{
      width: '100%',
      margin: '16px 0',
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: originalUrl && processedUrl ? 'repeat(auto-fit, minmax(220px, 1fr))' : '1fr',
        gap: '16px',
      }}>
        {originalUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
            }}>
              <span>Original</span>
              {originalSize !== undefined && <span style={{ color: 'var(--text-muted)' }}>{formatBytes(originalSize)}</span>}
            </div>
            <div style={{
              height: '220px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: '6px',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={originalUrl}
                alt={`${alt} original`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}

        {processedUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--primary)',
            }}>
              <span>Result</span>
              {newSize !== undefined && (
                <span style={{ color: 'var(--success)' }}>{formatBytes(newSize)}</span>
              )}
            </div>
            <div style={{
              height: '220px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--primary-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              padding: '6px',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={processedUrl}
                alt={`${alt} processed`}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

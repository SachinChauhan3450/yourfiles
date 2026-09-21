'use client';

import React from 'react';
import { Download, RefreshCw, CheckCircle2 } from 'lucide-react';
import { formatBytes } from '../../lib/utils';

interface DownloadButtonProps {
  fileName: string;
  originalSize?: number;
  newSize?: number;
  savingsPercentage?: number;
  onDownload: () => void;
  onReset?: () => void;
  downloadLabel?: string;
}

export default function DownloadButton({
  fileName,
  originalSize,
  newSize,
  savingsPercentage,
  onDownload,
  onReset,
  downloadLabel = 'Download File',
}: DownloadButtonProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '18px',
      padding: '36px 24px',
      backgroundColor: '#ffffff',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      textAlign: 'center',
      boxShadow: 'var(--shadow-md)',
      position: 'relative',
    }} className="animate-pop">
      {/* Animated Checkmark Badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        backgroundColor: 'var(--success-subtle)',
        color: 'var(--success)',
        border: '1px solid var(--success-border)',
        boxShadow: '0 0 16px rgba(22, 163, 74, 0.15)',
      }}>
        <CheckCircle2 size={32} />
      </div>

      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '4px', letterSpacing: '-0.015em' }}>
          File Ready for Download!
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', wordBreak: 'break-all', maxWidth: '380px' }}>
          {fileName}
        </p>
      </div>

      {/* File Size & Savings Pill */}
      {originalSize !== undefined && newSize !== undefined && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          backgroundColor: 'var(--bg-subtle)',
          border: '1px solid var(--border-color)',
          padding: '10px 18px',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.88rem',
          boxShadow: 'var(--shadow-xs)',
        }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Original: </span>
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{formatBytes(originalSize)}</span>
          </div>
          <span style={{ color: 'var(--border-hover)' }}>→</span>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Result: </span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{formatBytes(newSize)}</span>
          </div>

          {savingsPercentage !== undefined && savingsPercentage > 0 && (
            <span className="badge badge-success" style={{
              fontSize: '0.78rem',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
            }}>
              -{savingsPercentage}% Saved
            </span>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '4px' }}>
        <button
          onClick={onDownload}
          className="btn btn-primary"
          style={{ minWidth: '210px', padding: '12px 26px', fontSize: '0.96rem' }}
        >
          <Download size={18} />
          <span>{downloadLabel}</span>
        </button>

        {onReset && (
          <button
            onClick={onReset}
            className="btn btn-secondary reset-button"
            style={{ padding: '12px 20px', fontSize: '0.92rem' }}
          >
            <RefreshCw size={16} className="reset-icon" style={{ transition: 'transform var(--transition-fast)' }} />
            <span>Process Another File</span>
          </button>
        )}
      </div>

      <style jsx>{`
        .reset-button:hover .reset-icon {
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
}

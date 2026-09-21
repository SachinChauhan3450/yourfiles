import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProgressIndicatorProps {
  label?: string;
  progress?: number; // 0 to 100
  subLabel?: string;
}

export default function ProgressIndicator({
  label = 'Processing file...',
  progress,
  subLabel,
}: ProgressIndicatorProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '36px 20px',
      gap: '14px',
      textAlign: 'center',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-subtle)',
        color: 'var(--primary)',
      }}>
        <Loader2 size={26} className="animate-spin" />
      </div>

      <div>
        <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-main)', marginBottom: '3px' }}>
          {label}
        </div>
        {subLabel && (
          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            {subLabel}
          </div>
        )}
      </div>

      {typeof progress === 'number' && (
        <div style={{ width: '100%', maxWidth: '280px', marginTop: '4px' }}>
          <div style={{
            height: '6px',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              height: '100%',
              backgroundColor: 'var(--primary)',
              transition: 'width 0.2s ease',
            }} />
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {Math.round(progress)}%
          </div>
        </div>
      )}
    </div>
  );
}

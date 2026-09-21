import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

interface AlertBannerProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  onDismiss?: () => void;
}

export default function AlertBanner({
  type = 'info',
  title,
  message,
  onDismiss,
}: AlertBannerProps) {
  const configs = {
    info: {
      icon: Info,
      bg: 'var(--primary-subtle)',
      border: 'var(--primary-border)',
      color: '#1e40af',
      iconColor: 'var(--primary)',
    },
    success: {
      icon: CheckCircle2,
      bg: 'var(--success-subtle)',
      border: 'var(--success-border)',
      color: '#166534',
      iconColor: 'var(--success)',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'var(--warning-subtle)',
      border: 'var(--warning-border)',
      color: '#92400e',
      iconColor: 'var(--warning)',
    },
    error: {
      icon: AlertCircle,
      bg: 'var(--error-subtle)',
      border: 'var(--error-border)',
      color: '#991b1b',
      iconColor: 'var(--error)',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      backgroundColor: config.bg,
      border: `1px solid ${config.border}`,
      color: config.color,
      margin: '16px 0',
      position: 'relative',
    }}>
      <Icon size={18} color={config.iconColor} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 600, fontSize: '0.92rem', marginBottom: '2px' }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: '0.88rem', lineHeight: 1.5 }}>
          {message}
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: config.color,
            cursor: 'pointer',
            padding: '2px',
          }}
          aria-label="Close"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}

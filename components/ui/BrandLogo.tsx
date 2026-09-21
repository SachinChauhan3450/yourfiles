'use client';

import React, { useId } from 'react';
import Link from 'next/link';

interface BrandIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Compact original symbol for YourFiles:
 * - A primary document file silhouette with a folded dog-ear corner.
 * - An offset secondary file sheet behind, visually signifying multi-file capability.
 * - Integrated PDF/document lines in the upper section.
 * - Integrated sun and twin-peak landscape in the lower section for image/media files.
 * - Restrained blue palette matching the site's design tokens.
 */
export function BrandIcon({ size = 32, className, style }: BrandIconProps) {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const gradId = `yf-grad-${safeId}`;
  const foldGradId = `yf-fold-${safeId}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="6"
          y1="4"
          x2="25.5"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        <linearGradient
          id={foldGradId}
          x1="18.5"
          y1="4"
          x2="25.5"
          y2="11"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
      </defs>

      {/* Secondary file sheet behind */}
      <rect
        x="9"
        y="1.5"
        width="15"
        height="22"
        rx="2.5"
        fill="#93c5fd"
        fillOpacity="0.45"
      />

      {/* Main Document Silhouette */}
      <path
        d="M8.5 4H18.5L25.5 11V26.5C25.5 27.88 24.38 29 23 29H8.5C7.12 29 6 27.88 6 26.5V6.5C6 5.12 7.12 4 8.5 4Z"
        fill={`url(#${gradId})`}
      />

      {/* Folded Dog-Ear Flap */}
      <path
        d="M18.5 4V9.2C18.5 10.2 19.3 11 20.3 11H25.5L18.5 4Z"
        fill={`url(#${foldGradId})`}
      />

      {/* PDF / Document Text Bars */}
      <rect
        x="9.5"
        y="8.5"
        width="6.5"
        height="2"
        rx="1"
        fill="#ffffff"
        fillOpacity="0.95"
      />
      <rect
        x="9.5"
        y="12"
        width="4.5"
        height="1.5"
        rx="0.75"
        fill="#bfdbfe"
        fillOpacity="0.9"
      />

      {/* Image / Media: Sun Dot */}
      <circle cx="20" cy="16.5" r="1.5" fill="#ffffff" />

      {/* Image / Media: Background Mountain */}
      <path
        d="M15.5 25L19 19.8C19.3 19.3 20 19.3 20.3 19.8L23.2 25H15.5Z"
        fill="#93c5fd"
        fillOpacity="0.85"
      />

      {/* Image / Media: Foreground Mountain */}
      <path
        d="M9 25L13.5 18C13.8 17.5 14.6 17.5 14.9 18L19.5 25H9Z"
        fill="#ffffff"
      />
    </svg>
  );
}

interface BrandLogoProps {
  iconSize?: number;
  showWordmark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  linkToHome?: boolean;
}

/**
 * Standard brand logo component for YourFiles.
 * Pairs the BrandIcon SVG with the crisp HTML wordmark.
 */
export default function BrandLogo({
  iconSize = 32,
  showWordmark = true,
  className = '',
  style,
  linkToHome = true,
}: BrandLogoProps) {
  const content = (
    <div
      className={`brand-logo-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '9px',
        userSelect: 'none',
        ...style,
      }}
    >
      <BrandIcon size={iconSize} />
      {showWordmark && (
        <span
          className="brand-wordmark"
          style={{
            fontSize: iconSize >= 32 ? '1.22rem' : '1.08rem',
            fontWeight: 800,
            letterSpacing: '-0.028em',
            color: 'var(--text-main)',
            lineHeight: 1,
          }}
        >
          YourFiles
        </span>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        aria-label="YourFiles homepage"
        className="brand-logo"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Files, Image as ImageIcon, Menu, X, ShieldCheck } from 'lucide-react';
import { BrandIcon } from '../ui/BrandLogo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/pdf', label: 'PDF Tools', icon: Files },
    { href: '/image', label: 'Image Tools', icon: ImageIcon },
    { href: '/about', label: 'About' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      transition: 'all var(--transition-fast)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          className="brand-logo"
          aria-label="YourFiles homepage"
        >
          <div
            className="logo-icon"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform var(--transition-fast)',
            }}
          >
            <BrandIcon size={32} />
          </div>
          <span style={{
            fontSize: '1.2rem',
            fontWeight: 800,
            letterSpacing: '-0.028em',
            lineHeight: 1,
            color: 'var(--text-main)',
          }}>
            YourFiles
          </span>
        </Link>

        {/* Desktop Navigation with Smooth Pill Hover */}
        <nav style={{ display: 'none', gap: '6px', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href + '/'));
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--primary-subtle)' : 'transparent',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative',
                }}
                className="nav-link-pill"
              >
                {link.icon && <link.icon size={15} />}
                <span>{link.label}</span>
                {isActive && (
                  <span style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary)',
                    display: 'inline-block',
                    marginLeft: '2px',
                  }} />
                )}
              </Link>
            );
          })}

          <div style={{
            marginLeft: '12px',
            paddingLeft: '14px',
            borderLeft: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}>
            <ShieldCheck size={16} color="var(--success)" />
            <span>Browser-local processing</span>
          </div>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            padding: '6px',
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '12px 20px 20px',
          borderTop: '1px solid var(--border-color)',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          boxShadow: 'var(--shadow-md)',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {link.icon && <link.icon size={17} />}
              {link.label}
            </Link>
          ))}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 12px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            borderTop: '1px solid var(--border-subtle)',
            marginTop: '6px',
          }}>
            <ShieldCheck size={16} color="var(--success)" />
            <span>Files are processed locally in your browser</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        .brand-logo:hover .logo-icon {
          transform: scale(1.06);
        }
        .nav-link-pill:hover {
          background-color: var(--bg-subtle) !important;
          color: var(--text-main) !important;
        }
      `}</style>
    </header>
  );
}

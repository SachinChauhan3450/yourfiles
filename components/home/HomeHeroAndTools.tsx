'use client';

import React, { useState, useMemo } from 'react';
import { Search, X, ShieldCheck } from 'lucide-react';
import { ALL_TOOLS, PDF_TOOLS, IMAGE_TOOLS } from '../../lib/toolsData';
import ToolCard from '../ui/ToolCard';
import { ToolMeta } from '../../lib/types';

export default function HomeHeroAndTools() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pdf' | 'image'>('all');

  const filteredTools = useMemo(() => {
    let list: ToolMeta[] = ALL_TOOLS;
    if (selectedCategory === 'pdf') {
      list = PDF_TOOLS;
    } else if (selectedCategory === 'image') {
      list = IMAGE_TOOLS;
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.acceptExtensions.some((ext) => ext.toLowerCase().includes(q))
    );
  }, [searchQuery, selectedCategory]);

  return (
    <div>
      {/* 1. Compact Hero Section (15–20% shorter vertical spacing) */}
      <section style={{
        paddingTop: '16px',
        paddingBottom: '24px',
        textAlign: 'center',
      }}>
        <div className="container">
          {/* Trust Banner */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--brand-gradient-subtle)',
            border: '1px solid var(--primary-border)',
            color: 'var(--primary)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '12px',
          }}>
            <ShieldCheck size={14} color="var(--primary)" />
            <span>Files are processed locally in your browser and aren&apos;t uploaded to our servers.</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.95rem, 3.6vw, 2.7rem)',
            fontWeight: 800,
            lineHeight: 1.18,
            letterSpacing: '-0.025em',
            color: 'var(--text-main)',
            marginBottom: '8px',
          }}>
            Free PDF & image tools,{' '}
            <span className="brand-gradient-text">made delightfully simple.</span>
          </h1>

          <p style={{
            fontSize: 'clamp(0.96rem, 1.5vw, 1.08rem)',
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            Convert, compress, resize, and manage your everyday files right in your browser. No sign-up, subscriptions, or server storage.
          </p>
        </div>
      </section>

      {/* 2. Tool Section - The Centerpiece */}
      <section id="tools-section" style={{ paddingBottom: '40px' }}>
        <div className="container">
          {/* Centerpiece Header & Search / Filters */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px',
          }}>
            <h2 style={{
              fontSize: 'clamp(1.4rem, 2.4vw, 1.85rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em',
              marginBottom: '4px',
            }}>
              Everything you need in one place
            </h2>
            <p style={{
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              marginBottom: '18px',
            }}>
              Simple tools for your PDFs and images, right in your browser.
            </p>

            {/* Search Input Bar */}
            <div style={{
              maxWidth: '520px',
              margin: '0 auto 16px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px 6px 16px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
              }} className="search-wrap">
                <Search size={16} color="var(--text-muted)" style={{ flexShrink: 0, marginRight: '8px' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search tools (e.g. compress, merge, split, resize)..."
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    background: 'transparent',
                  }}
                  aria-label="Search tools"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label="Clear search"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Restrained Filter Tabs */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              >
                All Tools (8)
              </button>
              <button
                onClick={() => setSelectedCategory('pdf')}
                className={`filter-btn ${selectedCategory === 'pdf' ? 'active' : ''}`}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--pdf-accent)',
                  display: 'inline-block',
                }} />
                <span>PDF Tools (4)</span>
              </button>
              <button
                onClick={() => setSelectedCategory('image')}
                className={`filter-btn ${selectedCategory === 'image' ? 'active' : ''}`}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--image-accent)',
                  display: 'inline-block',
                }} />
                <span>Image Tools (4)</span>
              </button>
            </div>
          </div>

          {/* If Search Query is Active: show search results */}
          {searchQuery.trim() ? (
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                fontSize: '0.88rem',
                color: 'var(--text-secondary)',
              }}>
                <div>
                  Showing <strong style={{ color: 'var(--text-main)' }}>{filteredTools.length}</strong> matching{' '}
                  {filteredTools.length === 1 ? 'tool' : 'tools'} for &ldquo;{searchQuery}&rdquo;
                </div>
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.84rem',
                  }}
                >
                  Reset search
                </button>
              </div>

              {filteredTools.length === 0 ? (
                <div style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '36px 20px',
                  textAlign: 'center',
                }}>
                  <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px' }}>
                    No tools found matching &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    Try searching for &ldquo;compress&rdquo;, &ldquo;merge&rdquo;, &ldquo;split&rdquo;, or &ldquo;resize&rdquo;.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="btn btn-secondary"
                  >
                    Show all tools
                  </button>
                </div>
              ) : (
                <div className="grid-tools">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* When no search: show cleanly organized sections */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* PDF Tools Section */}
              {(selectedCategory === 'all' || selectedCategory === 'pdf') && (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '14px',
                  }}>
                    {/* Subtle red/coral accent bar (no emojis) */}
                    <span style={{
                      width: '4px',
                      height: '16px',
                      borderRadius: '2px',
                      backgroundColor: 'var(--pdf-accent)',
                      display: 'inline-block',
                    }} />
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      letterSpacing: '-0.015em',
                    }}>
                      PDF Tools
                    </h3>
                  </div>

                  <div className="grid-tools">
                    {PDF_TOOLS.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              )}

              {/* Image Tools Section */}
              {(selectedCategory === 'all' || selectedCategory === 'image') && (
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '14px',
                  }}>
                    {/* Subtle blue accent bar (no emojis) */}
                    <span style={{
                      width: '4px',
                      height: '16px',
                      borderRadius: '2px',
                      backgroundColor: 'var(--image-accent)',
                      display: 'inline-block',
                    }} />
                    <h3 style={{
                      fontSize: '1.15rem',
                      fontWeight: 700,
                      color: 'var(--text-main)',
                      letterSpacing: '-0.015em',
                    }}>
                      Image Tools
                    </h3>
                  </div>

                  <div className="grid-tools">
                    {IMAGE_TOOLS.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .search-wrap:focus-within {
          border-color: var(--primary) !important;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12) !important;
        }
        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
          color: var(--text-secondary);
          font-size: 0.84rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 180ms ease;
        }
        .filter-btn:hover {
          border-color: var(--border-hover);
          background-color: var(--bg-subtle);
          color: var(--text-main);
        }
        .filter-btn.active {
          background-color: var(--primary-subtle);
          border-color: var(--primary);
          color: var(--primary);
          font-weight: 600;
          box-shadow: var(--shadow-xs);
        }
        .filter-btn:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

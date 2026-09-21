'use client';

import React from 'react';
import { ChevronUp, ChevronDown, Trash2, FileText, Image as ImageIcon } from 'lucide-react';
import { ToolFile } from '../../lib/types';
import { formatBytes } from '../../lib/utils';

interface FileListProps {
  files: ToolFile[];
  onRemove: (id: string) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onClearAll?: () => void;
}

export default function FileList({
  files,
  onRemove,
  onMoveUp,
  onMoveDown,
  onClearAll,
}: FileListProps) {
  if (files.length === 0) return null;

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
          Selected Files ({files.length})
        </div>
        {onClearAll && (
          <button
            onClick={onClearAll}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.82rem',
              cursor: 'pointer',
              fontWeight: 500,
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = 'var(--error)')}
            onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            Clear all
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {files.map((item, index) => {
          const isImage = item.type.startsWith('image/');
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: 'var(--bg-page)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                gap: '12px',
              }}
            >
              {/* Order index + icon + details */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  width: '18px',
                }}>
                  {index + 1}.
                </span>

                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isImage ? 'var(--image-subtle)' : 'var(--pdf-subtle)',
                  color: isImage ? 'var(--image-accent)' : 'var(--pdf-accent)',
                  border: `1px solid ${isImage ? 'var(--image-border)' : 'var(--pdf-border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}>
                  {item.previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.previewUrl}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : isImage ? (
                    <ImageIcon size={18} />
                  ) : (
                    <FileText size={18} />
                  )}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    color: 'var(--text-main)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {item.name}
                  </div>
                  <div style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center',
                  }}>
                    <span>{formatBytes(item.size)}</span>
                    {item.pageCount !== undefined && (
                      <span>• {item.pageCount} {item.pageCount === 1 ? 'page' : 'pages'}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                {onMoveUp && (
                  <button
                    onClick={() => onMoveUp(index)}
                    disabled={index === 0}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: index === 0 ? '#cbd5e1' : 'var(--text-secondary)',
                      cursor: index === 0 ? 'not-allowed' : 'pointer',
                      padding: '4px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                    title="Move Up"
                    aria-label="Move file up"
                  >
                    <ChevronUp size={16} />
                  </button>
                )}

                {onMoveDown && (
                  <button
                    onClick={() => onMoveDown(index)}
                    disabled={index === files.length - 1}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: index === files.length - 1 ? '#cbd5e1' : 'var(--text-secondary)',
                      cursor: index === files.length - 1 ? 'not-allowed' : 'pointer',
                      padding: '4px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                    title="Move Down"
                    aria-label="Move file down"
                  >
                    <ChevronDown size={16} />
                  </button>
                )}

                <button
                  onClick={() => onRemove(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: 'var(--radius-sm)',
                    marginLeft: '4px',
                  }}
                  title="Remove"
                  aria-label="Remove file"
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--error)')}
                  onMouseOut={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

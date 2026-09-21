'use client';

import React, { useState } from 'react';
import ToolLayout from '../../../components/layout/ToolLayout';
import FileDropzone from '../../../components/ui/FileDropzone';
import DownloadButton from '../../../components/ui/DownloadButton';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import AlertBanner from '../../../components/ui/AlertBanner';
import { PDF_TOOLS } from '../../../lib/toolsData';
import { CompressionLevel, ProcessingStatus, ToolFile } from '../../../lib/types';
import { compressPdf, CompressPdfResult } from '../../../lib/pdf/compress';
import { getPdfPageCount } from '../../../lib/pdf/merge';
import { downloadBlob, formatBytes } from '../../../lib/utils';
import { Minimize2, FileText, RefreshCw, CheckCircle, Info } from 'lucide-react';

export default function CompressPdfClient() {
  const tool = PDF_TOOLS.find((t) => t.id === 'compress-pdf')!;
  const [fileItem, setFileItem] = useState<ToolFile | null>(null);
  const [level, setLevel] = useState<CompressionLevel>('recommended');
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [result, setResult] = useState<CompressPdfResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFilesSelected = async (selected: File[]) => {
    if (selected.length === 0) return;
    setErrorMessage(null);
    const file = selected[0];

    try {
      const pageCount = await getPdfPageCount(file);
      setFileItem({
        id: file.name,
        file,
        name: file.name,
        size: file.size,
        type: file.type || 'application/pdf',
        pageCount,
      });
    } catch {
      setErrorMessage(`Failed to load "${file.name}". The document may be password-protected or corrupt.`);
    }
  };

  const handleCompress = async () => {
    if (!fileItem) return;
    setStatus('processing');
    setErrorMessage(null);

    try {
      const res = await compressPdf(fileItem.file, level);
      setResult(res);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while compressing the PDF.');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, result.fileName);
  };

  const handleReset = () => {
    setFileItem(null);
    setResult(null);
    setStatus('idle');
    setErrorMessage(null);
  };

  const compressionLevels: {
    id: CompressionLevel;
    title: string;
    description: string;
  }[] = [
    {
      id: 'light',
      title: 'Light Compression',
      description: 'Preserves all metadata and embedded annotations while compressing raw object streams.',
    },
    {
      id: 'recommended',
      title: 'Recommended Compression',
      description: 'Optimizes cross-reference tables, Flate-compresses internal streams, and cleans unreferenced objects.',
    },
    {
      id: 'high',
      title: 'Maximum Optimization',
      description: 'Strips redundant metadata, author history, and packs all eligible PDF dictionaries.',
    },
  ];

  const steps = [
    {
      title: 'Select PDF File',
      description: 'Upload your document directly from your computer or smartphone.',
    },
    {
      title: 'Choose Compression Level',
      description: 'Pick between Light, Recommended, or Maximum optimization based on your needs.',
    },
    {
      title: 'Optimize & Download',
      description: 'Review your genuine file size savings and download the optimized PDF instantly.',
    },
  ];

  const faqs = [
    {
      question: 'How does client-side PDF compression work?',
      answer: 'Your browser uses standard PDF 1.5+ FlateDecode object streams to pack uncompressed PDF objects into consolidated binary streams, cleans up orphan objects, and strips redundant metadata.',
    },
    {
      question: 'Why did my PDF size barely change or stay the same?',
      answer: 'Some PDFs (such as scanned documents already containing compressed JPEGs, or previously optimized files) have already reached maximum compression. We report actual byte sizes honestly rather than displaying fabricated reduction numbers.',
    },
    {
      question: 'Are my files sent to any server?',
      answer: 'No. Files are processed locally in your browser and aren\'t uploaded to our servers.',
    },
  ];

  return (
    <ToolLayout tool={tool} steps={steps} faqs={faqs}>
      {errorMessage && (
        <AlertBanner
          type="error"
          message={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
      )}

      {status === 'processing' && (
        <ProgressIndicator
          label="Compressing PDF..."
          subLabel="Compressing object streams and cleaning metadata in your browser"
        />
      )}

      {status === 'success' && result && (
        <div>
          {result.isAlreadyOptimized && (
            <div style={{ marginBottom: '20px' }}>
              <AlertBanner
                type="info"
                title="Already Highly Optimized"
                message={result.message || 'This PDF is already compactly encoded. No further lossless compression was possible.'}
              />
            </div>
          )}

          <DownloadButton
            fileName={result.fileName}
            originalSize={result.originalSize}
            newSize={result.newSize}
            savingsPercentage={result.savingsPercentage}
            downloadLabel="Download Compressed PDF"
            onDownload={handleDownload}
            onReset={handleReset}
          />
        </div>
      )}

      {status !== 'processing' && status !== 'success' && (
        <div>
          {!fileItem ? (
            <FileDropzone
              onFilesSelected={handleFilesSelected}
              accept={tool.accept}
              acceptExtensions={tool.acceptExtensions}
              multiple={false}
              title="Select a PDF file to compress"
              subtitle="Drop your document to optimize stream storage and remove overhead"
            />
          ) : (
            <div>
              {/* Selected File Card */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '28px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(239, 68, 68, 0.12)',
                    color: '#f87171',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <FileText size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{fileItem.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Original Size: <strong style={{ color: 'var(--text-primary)' }}>{formatBytes(fileItem.size)}</strong>
                      {fileItem.pageCount !== undefined && ` • ${fileItem.pageCount} pages`}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="btn btn-secondary"
                  style={{ padding: '8px 14px', fontSize: '0.85rem' }}
                >
                  <RefreshCw size={14} />
                  <span>Change File</span>
                </button>
              </div>

              {/* Compression Level Selector */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  marginBottom: '14px',
                }}>
                  Select Compression Level:
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '16px',
                }}>
                  {compressionLevels.map((lvl) => {
                    const isSelected = level === lvl.id;
                    return (
                      <div
                        key={lvl.id}
                        onClick={() => setLevel(lvl.id)}
                        style={{
                          padding: '16px 18px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isSelected ? 'var(--primary-subtle)' : '#ffffff',
                          border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.95rem', color: isSelected ? 'var(--primary)' : 'var(--text-main)' }}>
                            {lvl.title}
                          </span>
                          {isSelected && <CheckCircle size={16} color="var(--primary)" />}
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                          {lvl.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Technical Transparency Note */}
              <div style={{
                display: 'flex',
                gap: '10px',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '24px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}>
                <Info size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Our compression analyzes genuine internal object streams and strips unnecessary document metadata. We always show exact byte differences with zero fake percentages.
                </span>
              </div>

              {/* Submit Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleCompress}
                  className="btn btn-primary"
                  style={{ minWidth: '220px' }}
                >
                  <Minimize2 size={18} />
                  <span>Compress PDF Now</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}

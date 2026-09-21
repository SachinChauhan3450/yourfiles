'use client';

import React, { useState, useEffect, useRef } from 'react';
import ToolLayout from '../../../components/layout/ToolLayout';
import FileDropzone from '../../../components/ui/FileDropzone';
import DownloadButton from '../../../components/ui/DownloadButton';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import AlertBanner from '../../../components/ui/AlertBanner';
import FilePreview from '../../../components/ui/FilePreview';
import { IMAGE_TOOLS } from '../../../lib/toolsData';
import { ProcessingStatus, ToolFile } from '../../../lib/types';
import { compressImage, CompressImageResult } from '../../../lib/image/compress';
import { downloadBlob, formatBytes } from '../../../lib/utils';
import { RefreshCw } from 'lucide-react';

export default function CompressImageClient() {
  const tool = IMAGE_TOOLS.find((t) => t.id === 'compress-image')!;
  const [fileItem, setFileItem] = useState<ToolFile | null>(null);
  const [quality, setQuality] = useState<number>(0.75);
  const [maxDimension, setMaxDimension] = useState<string>('original');
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [result, setResult] = useState<CompressImageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleFilesSelected = (selected: File[]) => {
    if (selected.length === 0) return;
    setErrorMessage(null);
    const file = selected[0];
    const previewUrl = URL.createObjectURL(file);

    setFileItem({
      id: file.name,
      file,
      name: file.name,
      size: file.size,
      type: file.type || 'image/jpeg',
      previewUrl,
    });
  };

  // Run compression whenever fileItem, quality, or maxDimension changes
  useEffect(() => {
    if (!fileItem) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(async () => {
      setStatus('processing');
      setErrorMessage(null);

      try {
        const maxWidth = maxDimension === 'original' ? undefined : parseInt(maxDimension, 10);
        const res = await compressImage(fileItem.file, {
          quality,
          maxWidthOrHeight: maxWidth,
          format: 'original',
        });
        setResult(res);
        setStatus('success');
      } catch (err: unknown) {
        setStatus('error');
        setErrorMessage(err instanceof Error ? err.message : 'Failed to compress image.');
      }
    }, 250);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [fileItem, quality, maxDimension]);

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, result.fileName);
  };

  const handleReset = () => {
    if (fileItem?.previewUrl) URL.revokeObjectURL(fileItem.previewUrl);
    if (result?.previewUrl) URL.revokeObjectURL(result.previewUrl);
    setFileItem(null);
    setResult(null);
    setStatus('idle');
    setErrorMessage(null);
    setQuality(0.75);
    setMaxDimension('original');
  };

  const steps = [
    {
      title: 'Upload Any Image',
      description: 'Choose a JPG, PNG, or WebP image from your computer or smartphone.',
    },
    {
      title: 'Adjust Quality',
      description: 'Slide the quality level or adjust maximum resolution to see immediate file size savings.',
    },
    {
      title: 'Download Optimized Image',
      description: 'Preview the compressed result side-by-side with the original and download instantly.',
    },
  ];

  const faqs = [
    {
      question: 'Does this work on transparent PNGs?',
      answer: 'Yes! If you upload a PNG, transparency is preserved unless you explicitly convert to JPG.',
    },
    {
      question: 'What is the recommended quality setting?',
      answer: 'A quality between 70% and 80% typically cuts file size by 50% to 80% with virtually imperceptible visual difference to the human eye.',
    },
    {
      question: 'Are images uploaded to any cloud server?',
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

      {!fileItem ? (
        <FileDropzone
          onFilesSelected={handleFilesSelected}
          accept={tool.accept}
          acceptExtensions={tool.acceptExtensions}
          multiple={false}
          title="Select an image to compress"
          subtitle="Supports JPG, PNG, and WebP formats"
        />
      ) : (
        <div>
          {/* Header Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '24px',
          }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.98rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {fileItem.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Original Size: <strong style={{ color: 'var(--text-primary)' }}>{formatBytes(fileItem.size)}</strong>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="btn btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <RefreshCw size={14} />
              <span>Change Image</span>
            </button>
          </div>

          {/* Controls Panel */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            marginBottom: '24px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}>
            {/* Quality Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label className="input-label" htmlFor="qualityRange" style={{ marginBottom: 0 }}>
                  Image Quality:
                </label>
                <span style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '0.9rem' }}>
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                id="qualityRange"
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>Smaller size (10%)</span>
                <span>Best quality (100%)</span>
              </div>
            </div>

            {/* Resolution Scaling */}
            <div>
              <label className="input-label" htmlFor="dimensionSelect">
                Max Dimension:
              </label>
              <select
                id="dimensionSelect"
                className="select-input"
                value={maxDimension}
                onChange={(e) => setMaxDimension(e.target.value)}
              >
                <option value="original">Original Dimensions</option>
                <option value="2560">Max 2560px (2K QHD)</option>
                <option value="1920">Max 1920px (Full HD)</option>
                <option value="1280">Max 1280px (720p HD)</option>
                <option value="800">Max 800px (Web Optimized)</option>
              </select>
            </div>
          </div>

          {/* Visual Previews */}
          <FilePreview
            originalUrl={fileItem.previewUrl}
            processedUrl={result?.previewUrl}
            originalSize={fileItem.size}
            newSize={result?.newSize}
          />

          {status === 'processing' && (
            <ProgressIndicator
              label="Compressing image in browser..."
              subLabel="Calculating new byte size"
            />
          )}

          {/* Download & Stats Callout */}
          {result && (
            <div style={{ marginTop: '24px' }}>
              <DownloadButton
                fileName={result.fileName}
                originalSize={result.originalSize}
                newSize={result.newSize}
                savingsPercentage={result.savingsPercentage}
                downloadLabel="Download Compressed Image"
                onDownload={handleDownload}
                onReset={handleReset}
              />
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}

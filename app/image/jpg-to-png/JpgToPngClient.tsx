'use client';

import React, { useState } from 'react';
import ToolLayout from '../../../components/layout/ToolLayout';
import FileDropzone from '../../../components/ui/FileDropzone';
import DownloadButton from '../../../components/ui/DownloadButton';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import AlertBanner from '../../../components/ui/AlertBanner';
import FilePreview from '../../../components/ui/FilePreview';
import { IMAGE_TOOLS } from '../../../lib/toolsData';
import { ProcessingStatus, ToolFile } from '../../../lib/types';
import { convertImageFormat, ConvertImageResult, SupportedConversionFormat } from '../../../lib/image/convert';
import { downloadBlob, formatBytes } from '../../../lib/utils';
import { Repeat, RefreshCw } from 'lucide-react';

export default function JpgToPngClient() {
  const tool = IMAGE_TOOLS.find((t) => t.id === 'jpg-to-png')!;
  const [fileItem, setFileItem] = useState<ToolFile | null>(null);
  // Default to converting to PNG; easily toggleable to support PNG -> JPG
  const [targetFormat, setTargetFormat] = useState<SupportedConversionFormat>('image/png');
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [result, setResult] = useState<ConvertImageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const handleConvert = async () => {
    if (!fileItem) return;
    setStatus('processing');
    setErrorMessage(null);

    try {
      const res = await convertImageFormat(fileItem.file, {
        targetFormat,
        quality: 0.95,
      });
      setResult(res);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred during format conversion.');
    }
  };

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
  };

  const steps = [
    {
      title: 'Select JPG File',
      description: 'Upload your JPG or JPEG image from your computer, tablet, or phone.',
    },
    {
      title: 'Verify Output Settings',
      description: 'Confirm target format (PNG lossless standard).',
    },
    {
      title: 'Convert & Download',
      description: 'Instantly convert your image through local browser canvas and download the PNG.',
    },
  ];

  const faqs = [
    {
      question: 'Why convert JPG to PNG?',
      answer: 'PNG is a lossless image format. Converting to PNG avoids further generation compression losses when editing, sharing, or designing graphics with transparent layers.',
    },
    {
      question: 'Does this service upload my pictures to external servers?',
      answer: 'No. Files are processed locally in your browser and aren\'t uploaded to our servers.',
    },
    {
      question: 'Can I also convert other formats?',
      answer: 'Yes! The converter architecture supports PNG, JPG, and WebP, allowing seamless expansion for bidirectional conversion.',
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
          label="Converting image to PNG..."
          subLabel="Rendering uncompressed canvas pixels locally"
        />
      )}

      {status === 'success' && result && (
        <div>
          <FilePreview
            originalUrl={fileItem?.previewUrl}
            processedUrl={result.previewUrl}
            originalSize={result.originalSize}
            newSize={result.newSize}
          />

          <DownloadButton
            fileName={result.fileName}
            originalSize={result.originalSize}
            newSize={result.newSize}
            downloadLabel="Download Converted PNG"
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
              title="Select a JPG image to convert to PNG"
              subtitle="Drop a JPG or JPEG file to convert"
            />
          ) : (
            <div>
              {/* File Info Card */}
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
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{fileItem.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Original JPG • {formatBytes(fileItem.size)}
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

              {/* Conversion Format Selector (Modular & Extensible) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                marginBottom: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
              }}>
                <div>
                  <label className="input-label" htmlFor="formatSelect">
                    Target Format:
                  </label>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Exporting as lossless Portable Network Graphics (.png)
                  </div>
                </div>

                <select
                  id="formatSelect"
                  className="select-input"
                  value={targetFormat}
                  onChange={(e) => setTargetFormat(e.target.value as SupportedConversionFormat)}
                  style={{ width: 'auto', minWidth: '160px' }}
                >
                  <option value="image/png">PNG (.png)</option>
                  <option value="image/jpeg">JPG (.jpg)</option>
                  <option value="image/webp">WebP (.webp)</option>
                </select>
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleConvert}
                  className="btn btn-primary"
                  style={{ minWidth: '220px' }}
                >
                  <Repeat size={18} />
                  <span>Convert to PNG</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}

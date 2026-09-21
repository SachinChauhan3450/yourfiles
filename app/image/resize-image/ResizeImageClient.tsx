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
import { resizeImage, ResizeImageResult } from '../../../lib/image/resize';
import { loadImage } from '../../../lib/image/compress';
import { downloadBlob, formatBytes } from '../../../lib/utils';
import { Scaling, Lock, Unlock, RefreshCw } from 'lucide-react';

export default function ResizeImageClient() {
  const tool = IMAGE_TOOLS.find((t) => t.id === 'resize-image')!;
  const [fileItem, setFileItem] = useState<ToolFile | null>(null);
  const [origWidth, setOrigWidth] = useState<number>(0);
  const [origHeight, setOrigHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [result, setResult] = useState<ResizeImageResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFilesSelected = async (selected: File[]) => {
    if (selected.length === 0) return;
    setErrorMessage(null);
    const file = selected[0];

    try {
      const img = await loadImage(file);
      const width = img.naturalWidth || img.width;
      const height = img.naturalHeight || img.height;

      setOrigWidth(width);
      setOrigHeight(height);
      setTargetWidth(width);
      setTargetHeight(height);

      const previewUrl = URL.createObjectURL(file);
      setFileItem({
        id: file.name,
        file,
        name: file.name,
        size: file.size,
        type: file.type || 'image/jpeg',
        previewUrl,
      });

      const initialFormat = file.type === 'image/png' ? 'image/png' : file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
      setOutputFormat(initialFormat);
    } catch {
      setErrorMessage(`Failed to load "${file.name}".`);
    }
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    if (lockAspect && origWidth > 0) {
      const ratio = origHeight / origWidth;
      setTargetHeight(Math.round(val * ratio));
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    if (lockAspect && origHeight > 0) {
      const ratio = origWidth / origHeight;
      setTargetWidth(Math.round(val * ratio));
    }
  };

  const applyPercentage = (pct: number) => {
    if (origWidth > 0 && origHeight > 0) {
      setTargetWidth(Math.round((origWidth * pct) / 100));
      setTargetHeight(Math.round((origHeight * pct) / 100));
    }
  };

  const applyPreset = (w: number, h: number) => {
    setTargetWidth(w);
    setTargetHeight(h);
    setLockAspect(false); // Presets have their own specific aspect ratio
  };

  const handleResize = async () => {
    if (!fileItem || targetWidth <= 0 || targetHeight <= 0) {
      setErrorMessage('Please specify valid width and height dimensions.');
      return;
    }

    setStatus('processing');
    setErrorMessage(null);

    try {
      const res = await resizeImage(fileItem.file, {
        width: targetWidth,
        height: targetHeight,
        format: outputFormat,
      });
      setResult(res);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while resizing the image.');
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
      title: 'Upload Image',
      description: 'Select your photo or graphic from your device.',
    },
    {
      title: 'Set Target Dimensions',
      description: 'Enter custom pixel dimensions, keep aspect ratio locked, or choose a one-click preset.',
    },
    {
      title: 'Resize & Download',
      description: 'Preview the new dimensions and download your resized file immediately.',
    },
  ];

  const faqs = [
    {
      question: 'What is Aspect Ratio Lock?',
      answer: 'When Aspect Ratio Lock is enabled, modifying the width will automatically recalculate the height (and vice versa) so your image doesn\'t appear stretched or distorted.',
    },
    {
      question: 'Can I resize without losing quality?',
      answer: 'Our canvas resizer uses high-quality bicubic smoothing algorithms to retain maximum sharpness and visual fidelity.',
    },
    {
      question: 'Are my images stored anywhere?',
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
          label="Resizing image in browser..."
          subLabel="Rendering new dimensions via canvas"
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
            savingsPercentage={result.savingsPercentage}
            downloadLabel={`Download Resized Image (${result.width}x${result.height})`}
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
              title="Select an image to resize"
              subtitle="Supports JPG, PNG, and WebP images"
            />
          ) : (
            <div>
              {/* Header Info */}
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
                    Original: <strong style={{ color: 'var(--text-primary)' }}>{origWidth} × {origHeight} px</strong>
                    {' '}({formatBytes(fileItem.size)})
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

              {/* Dimensions Control Panel */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                marginBottom: '28px',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '20px',
                  alignItems: 'end',
                  marginBottom: '24px',
                }}>
                  <div>
                    <label className="input-label" htmlFor="widthInput">
                      Width (px):
                    </label>
                    <input
                      id="widthInput"
                      type="number"
                      className="text-input"
                      value={targetWidth || ''}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value, 10) || 0)}
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="input-label" htmlFor="heightInput">
                      Height (px):
                    </label>
                    <input
                      id="heightInput"
                      type="number"
                      className="text-input"
                      value={targetHeight || ''}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value, 10) || 0)}
                      min="1"
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setLockAspect(!lockAspect)}
                      className={`btn ${lockAspect ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ width: '100%', padding: '12px', fontSize: '0.88rem' }}
                      title="Lock or unlock aspect ratio"
                    >
                      {lockAspect ? <Lock size={16} /> : <Unlock size={16} />}
                      <span>{lockAspect ? 'Aspect Locked' : 'Aspect Unlocked'}</span>
                    </button>
                  </div>

                  <div>
                    <label className="input-label" htmlFor="formatSelect">
                      Output Format:
                    </label>
                    <select
                      id="formatSelect"
                      className="select-input"
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value as 'image/jpeg' | 'image/png' | 'image/webp')}
                    >
                      <option value="image/jpeg">JPG / JPEG</option>
                      <option value="image/png">PNG</option>
                      <option value="image/webp">WebP</option>
                    </select>
                  </div>
                </div>

                {/* Quick Presets & Scale Percentage */}
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    Quick Scale & Presets:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <button type="button" onClick={() => applyPercentage(75)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                      75%
                    </button>
                    <button type="button" onClick={() => applyPercentage(50)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                      50%
                    </button>
                    <button type="button" onClick={() => applyPercentage(25)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                      25%
                    </button>
                    <button type="button" onClick={() => applyPreset(1920, 1080)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                      1920 × 1080 (FHD)
                    </button>
                    <button type="button" onClick={() => applyPreset(1280, 720)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                      1280 × 720 (HD)
                    </button>
                    <button type="button" onClick={() => applyPreset(1080, 1080)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                      1080 × 1080 (Square)
                    </button>
                    <button type="button" onClick={() => applyPreset(800, 600)} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '0.82rem' }}>
                      800 × 600 (SVGA)
                    </button>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleResize}
                  disabled={targetWidth <= 0 || targetHeight <= 0}
                  className="btn btn-primary"
                  style={{ minWidth: '220px' }}
                >
                  <Scaling size={18} />
                  <span>Resize to {targetWidth} × {targetHeight}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}

'use client';

import React, { useState } from 'react';
import ToolLayout from '../../../components/layout/ToolLayout';
import FileDropzone from '../../../components/ui/FileDropzone';
import FileList from '../../../components/ui/FileList';
import DownloadButton from '../../../components/ui/DownloadButton';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import AlertBanner from '../../../components/ui/AlertBanner';
import { IMAGE_TOOLS } from '../../../lib/toolsData';
import { ToolFile, ProcessResult, ProcessingStatus, PageOrientation, PageSizeOption } from '../../../lib/types';
import { imagesToPdf } from '../../../lib/pdf/imagesToPdf';
import { downloadBlob } from '../../../lib/utils';
import { FileStack, Plus } from 'lucide-react';

export default function ImageToPdfClient() {
  const tool = IMAGE_TOOLS.find((t) => t.id === 'image-to-pdf')!;
  const [files, setFiles] = useState<ToolFile[]>([]);
  const [orientation, setOrientation] = useState<PageOrientation>('auto');
  const [pageSize, setPageSize] = useState<PageSizeOption>('a4');
  const [margin, setMargin] = useState<number>(20);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFilesSelected = (newFiles: File[]) => {
    setErrorMessage(null);
    const addedList: ToolFile[] = newFiles.map((f) => {
      const previewUrl = URL.createObjectURL(f);
      return {
        id: `${f.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file: f,
        name: f.name,
        size: f.size,
        type: f.type || 'image/jpeg',
        previewUrl,
      };
    });

    setFiles((prev) => [...prev, ...addedList]);
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => {
      const found = prev.find((f) => f.id === id);
      if (found?.previewUrl) URL.revokeObjectURL(found.previewUrl);
      return prev.filter((f) => f.id !== id);
    });
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setFiles((prev) => {
      const next = [...prev];
      const temp = next[index - 1];
      next[index - 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleMoveDown = (index: number) => {
    setFiles((prev) => {
      if (index === prev.length - 1) return prev;
      const next = [...prev];
      const temp = next[index + 1];
      next[index + 1] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      setErrorMessage('Please select at least one image to convert.');
      return;
    }

    setStatus('processing');
    setErrorMessage(null);

    try {
      const rawFiles = files.map((f) => f.file);
      const res = await imagesToPdf(rawFiles, {
        orientation,
        pageSize,
        margin,
        outputName: 'combined_images.pdf',
      });
      setResult(res);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while building the PDF.');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, result.fileName);
  };

  const handleReset = () => {
    files.forEach((f) => f.previewUrl && URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
    setResult(null);
    setStatus('idle');
    setErrorMessage(null);
  };

  const steps = [
    {
      title: 'Select Images (Any Format)',
      description: 'Upload JPG, PNG, or WebP images from your phone, camera, or desktop folder.',
    },
    {
      title: 'Order & Layout',
      description: 'Rearrange pages, choose portrait or landscape orientation, and customize paper margins.',
    },
    {
      title: 'Generate PDF',
      description: 'Generate your multi-page PDF document locally and download it immediately.',
    },
  ];

  const faqs = [
    {
      question: 'Can I mix different image formats?',
      answer: 'Yes! You can combine JPG, PNG, and WebP images together into a single multi-page PDF file.',
    },
    {
      question: 'Does this service upload my pictures?',
      answer: 'No. Files are processed locally in your browser and aren\'t uploaded to our servers.',
    },
    {
      question: 'Will image orientation be adjusted automatically?',
      answer: 'Yes, if you select "Auto" orientation, portrait images will be assigned portrait pages and landscape images will be assigned landscape pages.',
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
          label="Converting images to PDF..."
          subLabel="Assembling PDF pages client-side"
        />
      )}

      {status === 'success' && result && (
        <DownloadButton
          fileName={result.fileName}
          originalSize={result.originalSize}
          newSize={result.newSize}
          downloadLabel={`Download PDF (${result.pageCount} pages)`}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      )}

      {status !== 'processing' && status !== 'success' && (
        <div>
          <FileDropzone
            onFilesSelected={handleFilesSelected}
            accept={tool.accept}
            acceptExtensions={tool.acceptExtensions}
            multiple={true}
            title="Select images to convert into a PDF"
            subtitle="Upload JPG, PNG, or WebP images to combine into one PDF"
          />

          {files.length > 0 && (
            <div>
              <FileList
                files={files}
                onRemove={handleRemove}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onClearAll={handleReset}
              />

              {/* Layout Options Toolbar */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                marginTop: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '20px',
              }}>
                <div>
                  <label className="input-label" htmlFor="orientationSelect">
                    Page Orientation:
                  </label>
                  <select
                    id="orientationSelect"
                    className="select-input"
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value as PageOrientation)}
                  >
                    <option value="auto">Auto (Match Image)</option>
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                <div>
                  <label className="input-label" htmlFor="pageSizeSelect">
                    Page Size:
                  </label>
                  <select
                    id="pageSizeSelect"
                    className="select-input"
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value as PageSizeOption)}
                  >
                    <option value="a4">A4 Standard</option>
                    <option value="letter">US Letter</option>
                    <option value="fit">Fit to Image</option>
                  </select>
                </div>

                <div>
                  <label className="input-label" htmlFor="marginSelect">
                    Margin:
                  </label>
                  <select
                    id="marginSelect"
                    className="select-input"
                    value={margin}
                    onChange={(e) => setMargin(parseInt(e.target.value, 10))}
                  >
                    <option value="0">No Margin</option>
                    <option value="20">Standard Margin (20pt)</option>
                    <option value="40">Wide Margin (40pt)</option>
                  </select>
                </div>
              </div>

              {/* Action Bar */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginTop: '24px',
              }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Total: <strong style={{ color: 'var(--text-primary)' }}>{files.length} images</strong> selected
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <label className="btn btn-secondary" style={{ cursor: 'pointer', margin: 0 }}>
                    <Plus size={18} />
                    <span>Add More Images</span>
                    <input
                      type="file"
                      accept={tool.accept}
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        if (e.target.files) {
                          handleFilesSelected(Array.from(e.target.files));
                          e.target.value = '';
                        }
                      }}
                    />
                  </label>

                  <button
                    onClick={handleConvert}
                    className="btn btn-primary"
                  >
                    <FileStack size={18} />
                    <span>Generate PDF ({files.length} pages)</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}

'use client';

import React, { useState } from 'react';
import ToolLayout from '../../../components/layout/ToolLayout';
import FileDropzone from '../../../components/ui/FileDropzone';
import DownloadButton from '../../../components/ui/DownloadButton';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import AlertBanner from '../../../components/ui/AlertBanner';
import { PDF_TOOLS } from '../../../lib/toolsData';
import { ProcessResult, ProcessingStatus, ToolFile } from '../../../lib/types';
import { splitPdf } from '../../../lib/pdf/split';
import { getPdfPageCount } from '../../../lib/pdf/merge';
import { downloadBlob, parsePageRange, formatBytes } from '../../../lib/utils';
import { Scissors, FileText, CheckSquare, Square, RefreshCw } from 'lucide-react';

export default function SplitPdfClient() {
  const tool = PDF_TOOLS.find((t) => t.id === 'split-pdf')!;
  const [fileItem, setFileItem] = useState<ToolFile | null>(null);
  const [pageRange, setPageRange] = useState<string>('1');
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [result, setResult] = useState<ProcessResult | null>(null);
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

      // Default to extracting page 1 or 1-2
      const initialIndices = pageCount > 1 ? [0, 1] : [0];
      setSelectedPages(initialIndices);
      setPageRange(pageCount > 1 ? '1-2' : '1');
    } catch {
      setErrorMessage(`Failed to open "${file.name}". The document may be password-protected or corrupted.`);
    }
  };

  const handleRangeTextChange = (text: string) => {
    setPageRange(text);
    if (!fileItem?.pageCount) return;
    const parsed = parsePageRange(text, fileItem.pageCount);
    setSelectedPages(parsed);
  };

  const togglePageSelection = (pageIndex: number) => {
    if (!fileItem?.pageCount) return;
    const exists = selectedPages.includes(pageIndex);
    const updated = exists
      ? selectedPages.filter((p) => p !== pageIndex)
      : [...selectedPages, pageIndex].sort((a, b) => a - b);

    setSelectedPages(updated);
    // Format back into range string
    setPageRange(updated.map((i) => i + 1).join(', '));
  };

  const selectAll = () => {
    if (!fileItem?.pageCount) return;
    const all = Array.from({ length: fileItem.pageCount }, (_, i) => i);
    setSelectedPages(all);
    setPageRange(`1-${fileItem.pageCount}`);
  };

  const selectOdd = () => {
    if (!fileItem?.pageCount) return;
    const odd = Array.from({ length: fileItem.pageCount }, (_, i) => i).filter((i) => (i + 1) % 2 !== 0);
    setSelectedPages(odd);
    setPageRange(odd.map((i) => i + 1).join(', '));
  };

  const selectEven = () => {
    if (!fileItem?.pageCount) return;
    const even = Array.from({ length: fileItem.pageCount }, (_, i) => i).filter((i) => (i + 1) % 2 === 0);
    setSelectedPages(even);
    setPageRange(even.map((i) => i + 1).join(', '));
  };

  const handleSplit = async () => {
    if (!fileItem) return;
    if (selectedPages.length === 0) {
      setErrorMessage('Please select at least one page to extract.');
      return;
    }

    setStatus('processing');
    setErrorMessage(null);

    try {
      const res = await splitPdf(fileItem.file, selectedPages);
      setResult(res);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while splitting the PDF.');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, result.fileName);
  };

  const handleReset = () => {
    setFileItem(null);
    setSelectedPages([]);
    setPageRange('1');
    setResult(null);
    setStatus('idle');
    setErrorMessage(null);
  };

  const steps = [
    {
      title: 'Upload PDF Document',
      description: 'Select or drop a PDF file from your device to inspect its pages.',
    },
    {
      title: 'Specify Pages to Extract',
      description: 'Enter page ranges like "1-3, 5" or click page numbers directly to choose your target pages.',
    },
    {
      title: 'Extract & Download',
      description: 'Click Extract Pages to generate your new PDF with only the selected pages in place.',
    },
  ];

  const faqs = [
    {
      question: 'How do I specify multiple ranges?',
      answer: 'You can separate individual pages or ranges with commas. For instance: "1-3, 5, 8-10" will extract pages 1, 2, 3, 5, 8, 9, and 10.',
    },
    {
      question: 'Will the original PDF be modified or deleted?',
      answer: 'No. Your original file remains untouched on your local computer. A new separate PDF containing the extracted pages is created for download.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes. Files are processed locally in your browser and are not uploaded to our servers.',
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
          label="Extracting selected pages..."
          subLabel="Generating your new PDF document locally"
        />
      )}

      {status === 'success' && result && (
        <DownloadButton
          fileName={result.fileName}
          originalSize={result.originalSize}
          newSize={result.newSize}
          downloadLabel={`Download Extracted PDF (${result.pageCount} pages)`}
          onDownload={handleDownload}
          onReset={handleReset}
        />
      )}

      {status !== 'processing' && status !== 'success' && (
        <div>
          {!fileItem ? (
            <FileDropzone
              onFilesSelected={handleFilesSelected}
              accept={tool.accept}
              acceptExtensions={tool.acceptExtensions}
              multiple={false}
              title="Select a PDF file to split"
              subtitle="Upload any multi-page PDF to extract specific pages"
            />
          ) : (
            <div>
              {/* Selected File Header Card */}
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
                      {formatBytes(fileItem.size)} • {fileItem.pageCount} total pages
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

              {/* Range Selector Input & Quick Selectors */}
              <div style={{ marginBottom: '28px' }}>
                <label className="input-label" htmlFor="pageRangeInput">
                  Enter Page Range to Extract (e.g. 1-3, 5, 7):
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <input
                    id="pageRangeInput"
                    type="text"
                    className="text-input"
                    value={pageRange}
                    onChange={(e) => handleRangeTextChange(e.target.value)}
                    placeholder="e.g. 1-4, 7"
                    style={{ flex: 1, minWidth: '220px' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" onClick={selectAll} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                      All Pages
                    </button>
                    <button type="button" onClick={selectOdd} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                      Odd Pages
                    </button>
                    <button type="button" onClick={selectEven} className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.85rem' }}>
                      Even Pages
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Selected: <strong style={{ color: 'var(--text-primary)' }}>{selectedPages.length}</strong> of {fileItem.pageCount} pages
                </div>
              </div>

              {/* Visual Page Grid */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '10px' }}>
                  Or click pages to toggle selection:
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(75px, 1fr))',
                  gap: '8px',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  padding: '12px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                }}>
                  {Array.from({ length: fileItem.pageCount || 0 }, (_, idx) => {
                    const isSelected = selectedPages.includes(idx);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => togglePageSelection(idx)}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '10px 6px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: isSelected ? 'var(--primary-subtle)' : '#ffffff',
                          border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                          color: isSelected ? 'var(--primary)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)',
                        }}
                      >
                        {isSelected ? <CheckSquare size={16} color="var(--primary)" /> : <Square size={16} />}
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, marginTop: '4px' }}>
                          Page {idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleSplit}
                  disabled={selectedPages.length === 0}
                  className="btn btn-primary"
                  style={{ minWidth: '220px' }}
                >
                  <Scissors size={18} />
                  <span>Extract {selectedPages.length} Pages</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </ToolLayout>
  );
}

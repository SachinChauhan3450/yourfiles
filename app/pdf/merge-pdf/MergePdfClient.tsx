'use client';

import React, { useState } from 'react';
import ToolLayout from '../../../components/layout/ToolLayout';
import FileDropzone from '../../../components/ui/FileDropzone';
import FileList from '../../../components/ui/FileList';
import DownloadButton from '../../../components/ui/DownloadButton';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';
import AlertBanner from '../../../components/ui/AlertBanner';
import { PDF_TOOLS } from '../../../lib/toolsData';
import { ToolFile, ProcessResult, ProcessingStatus } from '../../../lib/types';
import { mergePdfs, getPdfPageCount } from '../../../lib/pdf/merge';
import { downloadBlob } from '../../../lib/utils';
import { Files, Plus } from 'lucide-react';

export default function MergePdfClient() {
  const tool = PDF_TOOLS.find((t) => t.id === 'merge-pdf')!;
  const [files, setFiles] = useState<ToolFile[]>([]);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFilesSelected = async (newFiles: File[]) => {
    setErrorMessage(null);
    const addedList: ToolFile[] = [];

    for (const f of newFiles) {
      let pageCount: number | undefined;
      try {
        pageCount = await getPdfPageCount(f);
      } catch {
        // Corrupt or encrypted PDF
        setErrorMessage(`"${f.name}" could not be opened. It may be encrypted or corrupted.`);
        return;
      }

      addedList.push({
        id: `${f.name}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        file: f,
        name: f.name,
        size: f.size,
        type: f.type || 'application/pdf',
        pageCount,
      });
    }

    setFiles((prev) => [...prev, ...addedList]);
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
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

  const handleMerge = async () => {
    if (files.length < 2) {
      setErrorMessage('Please select at least two PDF files to merge.');
      return;
    }

    setStatus('processing');
    setErrorMessage(null);

    try {
      const rawFiles = files.map((f) => f.file);
      const res = await mergePdfs(rawFiles, 'merged_document.pdf');
      setResult(res);
      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred while merging your PDF files.');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    downloadBlob(result.blob, result.fileName);
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setStatus('idle');
    setErrorMessage(null);
  };

  const steps = [
    {
      title: 'Select PDF Documents',
      description: 'Upload two or more PDF files from your computer or mobile device.',
    },
    {
      title: 'Reorder Files',
      description: 'Use the arrow controls to organize the sequence in which your PDFs will be combined.',
    },
    {
      title: 'Merge & Download',
      description: 'Click Merge PDF to assemble the files locally in seconds and download the merged file.',
    },
  ];

  const faqs = [
    {
      question: 'Are my PDF files uploaded to a remote server?',
      answer: 'No. All PDF merging happens entirely inside your browser using client-side WebAssembly and JavaScript. Files are processed locally in your browser and aren\'t uploaded to our servers.',
    },
    {
      question: 'Is there a limit on how many PDFs I can merge?',
      answer: 'There is no artificial limit on the number of files. Because processing occurs directly in your browser, the limit depends on your device memory.',
    },
    {
      question: 'Will hyperlinks, bookmarks, and formatting be preserved?',
      answer: 'Yes! Vector graphics, high-resolution text, bookmarks, and embedded font structures are faithfully carried over into the merged PDF.',
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
          label="Merging PDF files..."
          subLabel="Reading and combining document streams in your browser"
        />
      )}

      {status === 'success' && result && (
        <DownloadButton
          fileName={result.fileName}
          originalSize={result.originalSize}
          newSize={result.newSize}
          downloadLabel={`Download Merged PDF (${result.pageCount} pages)`}
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
            title="Select multiple PDF files to merge"
            subtitle="Drag & drop PDF files or browse your device"
          />

          {files.length > 0 && (
            <div>
              <FileList
                files={files}
                onRemove={handleRemove}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onClearAll={() => setFiles([])}
              />

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginTop: '24px',
              }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Total: <strong style={{ color: 'var(--text-primary)' }}>{files.length} files</strong>
                  {' '}({files.reduce((acc, f) => acc + (f.pageCount || 0), 0)} total pages)
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <label className="btn btn-secondary" style={{ cursor: 'pointer', margin: 0 }}>
                    <Plus size={18} />
                    <span>Add More PDFs</span>
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
                    onClick={handleMerge}
                    disabled={files.length < 2}
                    className="btn btn-primary"
                  >
                    <Files size={18} />
                    <span>Merge {files.length} PDFs</span>
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

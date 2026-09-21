'use client';

import React, { useRef, useState } from 'react';
import { UploadCloud, FolderOpen } from 'lucide-react';
import { isValidFileType } from '../../lib/utils';

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept: string;
  acceptExtensions: string[];
  multiple?: boolean;
  maxSizeBytes?: number; // default 100MB
  title?: string;
  subtitle?: string;
}

export default function FileDropzone({
  onFilesSelected,
  accept,
  acceptExtensions,
  multiple = false,
  maxSizeBytes = 100 * 1024 * 1024,
  title,
  subtitle,
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const validateAndAddFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage(null);

    const validFiles: File[] = [];
    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
      if (!isValidFileType(file, acceptExtensions)) {
        setErrorMessage(
          `"${file.name}" is not supported. Please select: ${acceptExtensions.join(', ')}`
        );
        return;
      }

      if (file.size > maxSizeBytes) {
        setErrorMessage(
          `"${file.name}" exceeds the maximum limit of ${Math.round(
            maxSizeBytes / (1024 * 1024)
          )}MB.`
        );
        return;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      onFilesSelected(multiple ? validFiles : [validFiles[0]]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    validateAndAddFiles(e.dataTransfer.files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndAddFiles(e.target.files);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div style={{ width: '100%', margin: '12px 0' }}>
      <div
        className={`dropzone ${isDragOver ? 'active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload files"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: isDragOver ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
            color: isDragOver ? 'var(--primary)' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all var(--transition-fast)',
          }}>
            <UploadCloud size={28} />
          </div>

          <div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: 'var(--text-main)',
              marginBottom: '4px',
            }}>
              {title || (multiple ? 'Drop files here or browse' : 'Drop a file here or browse')}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {subtitle || `Supports ${acceptExtensions.join(', ').toUpperCase()}`}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: '4px', pointerEvents: 'none' }}
          >
            <FolderOpen size={16} />
            <span>Select {multiple ? 'Files' : 'File'}</span>
          </button>
        </div>
      </div>

      {errorMessage && (
        <div style={{
          marginTop: '10px',
          padding: '10px 14px',
          backgroundColor: 'var(--error-subtle)',
          border: '1px solid var(--error-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--error)',
          fontSize: '0.85rem',
        }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

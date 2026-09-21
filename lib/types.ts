export type ProcessingStatus = 'idle' | 'processing' | 'success' | 'error';

export interface ToolFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  pageCount?: number;
}

export type CompressionLevel = 'light' | 'recommended' | 'high';

export type PageOrientation = 'auto' | 'portrait' | 'landscape';

export type PageSizeOption = 'a4' | 'fit' | 'letter';

export type ImageOutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export interface ProcessResult {
  blob: Blob;
  fileName: string;
  originalSize: number;
  newSize: number;
  savingsPercentage: number;
  pageCount?: number;
}

export interface ToolMeta {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'pdf' | 'image';
  path: string;
  iconName: string;
  accept: string;
  acceptExtensions: string[];
}

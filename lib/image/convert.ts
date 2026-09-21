import { loadImage } from './compress';
import { ProcessResult } from '../types';

export type SupportedConversionFormat = 'image/png' | 'image/jpeg' | 'image/webp';

export interface ConvertImageOptions {
  targetFormat: SupportedConversionFormat;
  quality?: number; // for jpeg/webp
}

export interface ConvertImageResult extends ProcessResult {
  previewUrl: string;
}

const FORMAT_EXTENSIONS: Record<SupportedConversionFormat, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
};

export async function convertImageFormat(
  file: File,
  options: ConvertImageOptions
): Promise<ConvertImageResult> {
  const { targetFormat, quality = 0.92 } = options;
  const img = await loadImage(file);

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to create canvas context.');

  // If converting transparent image to JPEG, render white background
  if (targetFormat === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error(`Failed to convert image to ${targetFormat}`));
          return;
        }

        const previewUrl = URL.createObjectURL(blob);
        const originalSize = file.size;
        const newSize = blob.size;
        const savingsPercentage = originalSize > 0
          ? Math.round(((originalSize - newSize) / originalSize) * 100)
          : 0;

        const targetExt = FORMAT_EXTENSIONS[targetFormat] || 'png';
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        const fileName = `${baseName}.${targetExt}`;

        resolve({
          blob,
          fileName,
          originalSize,
          newSize,
          savingsPercentage,
          previewUrl,
        });
      },
      targetFormat,
      targetFormat === 'image/png' ? undefined : quality
    );
  });
}

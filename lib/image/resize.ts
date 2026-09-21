import { loadImage } from './compress';
import { ProcessResult } from '../types';

export interface ResizeImageOptions {
  width: number;
  height: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp';
  quality?: number;
}

export interface ResizeImageResult extends ProcessResult {
  previewUrl: string;
  width: number;
  height: number;
}

export async function resizeImage(
  file: File,
  options: ResizeImageOptions
): Promise<ResizeImageResult> {
  const { width, height, format = 'image/jpeg', quality = 0.92 } = options;

  if (width <= 0 || height <= 0) {
    throw new Error('Width and height must be greater than 0.');
  }

  const img = await loadImage(file);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(width);
  canvas.height = Math.round(height);

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Failed to get canvas 2D context.');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  if (format === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to render resized image.'));
          return;
        }

        const previewUrl = URL.createObjectURL(blob);
        const originalSize = file.size;
        const newSize = blob.size;
        const savingsPercentage = originalSize > 0
          ? Math.round(((originalSize - newSize) / originalSize) * 100)
          : 0;

        const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        const fileName = `${baseName}_${Math.round(width)}x${Math.round(height)}.${ext}`;

        resolve({
          blob,
          fileName,
          originalSize,
          newSize,
          savingsPercentage,
          previewUrl,
          width: Math.round(width),
          height: Math.round(height),
        });
      },
      format,
      quality
    );
  });
}

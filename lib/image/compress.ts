import { ProcessResult } from '../types';

export interface CompressImageOptions {
  quality: number; // 0.1 to 1.0
  maxWidthOrHeight?: number;
  format?: 'image/jpeg' | 'image/png' | 'image/webp' | 'original';
}

export interface CompressImageResult extends ProcessResult {
  previewUrl: string;
  width: number;
  height: number;
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };
    img.src = url;
  });
}

export async function compressImage(
  file: File,
  options: CompressImageOptions
): Promise<CompressImageResult> {
  const { quality = 0.8, maxWidthOrHeight, format = 'original' } = options;
  const img = await loadImage(file);

  let targetWidth = img.naturalWidth || img.width;
  let targetHeight = img.naturalHeight || img.height;

  if (maxWidthOrHeight && (targetWidth > maxWidthOrHeight || targetHeight > maxWidthOrHeight)) {
    if (targetWidth > targetHeight) {
      targetHeight = Math.round((targetHeight * maxWidthOrHeight) / targetWidth);
      targetWidth = maxWidthOrHeight;
    } else {
      targetWidth = Math.round((targetWidth * maxWidthOrHeight) / targetHeight);
      targetHeight = maxWidthOrHeight;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not initialize canvas context.');

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Determine output MIME type
  let outputMime = file.type || 'image/jpeg';
  if (format !== 'original') {
    outputMime = format;
  }

  // White background for JPEG if input has transparency
  if (outputMime === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to compress image.'));
          return;
        }

        const previewUrl = URL.createObjectURL(blob);
        const originalSize = file.size;
        const newSize = blob.size;
        const savingsPercentage = originalSize > 0
          ? Math.max(0, Math.round(((originalSize - newSize) / originalSize) * 100))
          : 0;

        // Generate output extension
        const ext = outputMime === 'image/png' ? 'png' : outputMime === 'image/webp' ? 'webp' : 'jpg';
        const baseName = file.name.replace(/\.[^/.]+$/, '');
        const fileName = `${baseName}_compressed.${ext}`;

        resolve({
          blob,
          fileName,
          originalSize,
          newSize,
          savingsPercentage,
          previewUrl,
          width: targetWidth,
          height: targetHeight,
        });
      },
      outputMime,
      quality
    );
  });
}

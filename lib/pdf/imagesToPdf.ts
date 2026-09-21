import { PDFDocument } from 'pdf-lib';
import { PageOrientation, PageSizeOption, ProcessResult } from '../types';

export interface ImageToPdfOptions {
  orientation?: PageOrientation;
  pageSize?: PageSizeOption;
  margin?: number; // points (e.g. 20)
  outputName?: string;
}

// Standard dimensions in points (72 points per inch)
const PAGE_DIMENSIONS = {
  a4: { width: 595.28, height: 841.89 },
  letter: { width: 612, height: 792 },
};

/**
 * Loads a File into an HTMLImageElement to extract dimensions and facilitate canvas conversion if needed.
 */
function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image "${file.name}".`));
    };
    img.src = url;
  });
}

/**
 * Converts any image (including WebP, SVG, BMP) to JPEG ArrayBuffer for reliable embedding in PDF.
 */
async function convertImageToJpegBuffer(img: HTMLImageElement): Promise<Uint8Array> {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth || img.width;
  canvas.height = img.naturalHeight || img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not create canvas context');

  // Fill white background for transparent images
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to encode image to JPEG.'));
          return;
        }
        blob.arrayBuffer().then((buf) => resolve(new Uint8Array(buf)));
      },
      'image/jpeg',
      0.92
    );
  });
}

export async function imagesToPdf(
  files: File[],
  options: ImageToPdfOptions = {}
): Promise<ProcessResult> {
  if (files.length === 0) {
    throw new Error('Please select at least one image.');
  }

  const {
    orientation = 'auto',
    pageSize = 'a4',
    margin = 20,
    outputName = 'converted_images.pdf',
  } = options;

  const pdfDoc = await PDFDocument.create();
  let totalOriginalSize = 0;

  for (const file of files) {
    totalOriginalSize += file.size;
    const img = await loadImageElement(file);
    const imgWidth = img.naturalWidth || img.width;
    const imgHeight = img.naturalHeight || img.height;

    // Convert to JPEG bytes for consistent embedding
    const jpegBytes = await convertImageToJpegBuffer(img);
    const embeddedImage = await pdfDoc.embedJpg(jpegBytes);

    let pageWidth: number;
    let pageHeight: number;

    if (pageSize === 'fit') {
      // Fit page exactly to image with margin
      pageWidth = imgWidth + margin * 2;
      pageHeight = imgHeight + margin * 2;
    } else {
      const standardSize = PAGE_DIMENSIONS[pageSize] || PAGE_DIMENSIONS.a4;
      const isLandscape =
        orientation === 'landscape' ||
        (orientation === 'auto' && imgWidth > imgHeight);

      pageWidth = isLandscape ? standardSize.height : standardSize.width;
      pageHeight = isLandscape ? standardSize.width : standardSize.height;
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    // Calculate fitted dimensions maintaining aspect ratio
    const availableWidth = pageWidth - margin * 2;
    const availableHeight = pageHeight - margin * 2;
    const imgAspect = imgWidth / imgHeight;
    const pageAspect = availableWidth / availableHeight;

    let drawWidth: number;
    let drawHeight: number;

    if (imgAspect > pageAspect) {
      drawWidth = availableWidth;
      drawHeight = availableWidth / imgAspect;
    } else {
      drawHeight = availableHeight;
      drawWidth = availableHeight * imgAspect;
    }

    // Center image on the page
    const x = margin + (availableWidth - drawWidth) / 2;
    const y = margin + (availableHeight - drawHeight) / 2;

    page.drawImage(embeddedImage, {
      x,
      y,
      width: drawWidth,
      height: drawHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

  return {
    blob,
    fileName: outputName,
    originalSize: totalOriginalSize,
    newSize: blob.size,
    savingsPercentage: 0,
    pageCount: files.length,
  };
}

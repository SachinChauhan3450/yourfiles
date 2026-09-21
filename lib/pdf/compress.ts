import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils';
import { CompressionLevel, ProcessResult } from '../types';

export interface CompressPdfResult extends ProcessResult {
  isAlreadyOptimized: boolean;
  message?: string;
}

/**
 * Compresses a PDF file client-side by:
 * 1. Re-building pages into a fresh document to discard orphan streams and unreferenced objects.
 * 2. Applying FlateDecode compression to all eligible indirect object streams via useObjectStreams: true.
 * 3. Stripping redundant metadata and editing history.
 */
export async function compressPdf(
  file: File,
  level: CompressionLevel = 'recommended',
  outputName?: string
): Promise<CompressPdfResult> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  let srcDoc: PDFDocument;
  try {
    srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  } catch {
    throw new Error(`Failed to load "${file.name}". The file may be corrupt or encrypted.`);
  }

  const pageCount = srcDoc.getPageCount();
  if (pageCount === 0) {
    throw new Error('This PDF has no pages to process.');
  }

  // Create clean target document
  const targetDoc = await PDFDocument.create();

  // Copy pages to drop unreferenced objects
  const pageIndices = srcDoc.getPageIndices();
  const copiedPages = await targetDoc.copyPages(srcDoc, pageIndices);
  copiedPages.forEach((page) => targetDoc.addPage(page));

  // Strip non-essential metadata for higher compression levels
  if (level === 'recommended' || level === 'high') {
    targetDoc.setTitle('');
    targetDoc.setAuthor('');
    targetDoc.setSubject('');
    targetDoc.setKeywords([]);
    targetDoc.setProducer('');
    targetDoc.setCreator('');
  }

  // Save with compressed object streams (PDF 1.5+)
  const compressedBytes = await targetDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    updateFieldAppearances: false,
  });

  const originalSize = file.size;
  const finalBytes = compressedBytes;
  let newSize = compressedBytes.byteLength;
  let isAlreadyOptimized = false;
  let message: string | undefined;

  // If the file was already compressed or gained overhead from re-wrapping, preserve the smaller file
  if (newSize >= originalSize) {
    isAlreadyOptimized = true;
    newSize = originalSize;
    message = 'This PDF is already highly compressed and optimized. Further lossless reduction is not possible without downsampling embedded graphics.';
    // Return original file blob so the user doesn't get an enlarged file
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const finalName = outputName || `${file.name.replace(/\.pdf$/i, '')}_compressed.pdf`;

    return {
      blob,
      fileName: finalName,
      originalSize,
      newSize,
      savingsPercentage: 0,
      pageCount,
      isAlreadyOptimized,
      message,
    };
  }

  const savingsPercentage = Math.round(((originalSize - newSize) / originalSize) * 100);
  const blob = new Blob([finalBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
  const finalName = outputName || `${file.name.replace(/\.pdf$/i, '')}_compressed.pdf`;

  return {
    blob,
    fileName: finalName,
    originalSize,
    newSize,
    savingsPercentage,
    pageCount,
    isAlreadyOptimized: false,
  };
}

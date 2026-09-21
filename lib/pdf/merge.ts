import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer } from '../utils';
import { ProcessResult } from '../types';

export async function mergePdfs(
  files: File[],
  outputName: string = 'merged.pdf'
): Promise<ProcessResult> {
  if (files.length < 2) {
    throw new Error('Please select at least two PDF files to merge.');
  }

  const mergedDoc = await PDFDocument.create();
  let totalOriginalSize = 0;
  let totalPages = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    totalOriginalSize += file.size;

    const arrayBuffer = await readFileAsArrayBuffer(file);
    let srcDoc: PDFDocument;
    try {
      srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    } catch {
      throw new Error(`Failed to read "${file.name}". The file may be password protected or corrupted.`);
    }

    const pageIndices = srcDoc.getPageIndices();
    totalPages += pageIndices.length;
    const copiedPages = await mergedDoc.copyPages(srcDoc, pageIndices);
    copiedPages.forEach((page) => mergedDoc.addPage(page));
  }

  const mergedPdfBytes = await mergedDoc.save();
  const blob = new Blob([mergedPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

  return {
    blob,
    fileName: outputName,
    originalSize: totalOriginalSize,
    newSize: blob.size,
    savingsPercentage: 0,
    pageCount: totalPages,
  };
}

export async function getPdfPageCount(file: File): Promise<number> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const doc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  return doc.getPageCount();
}

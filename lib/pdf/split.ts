import { PDFDocument } from 'pdf-lib';
import { readFileAsArrayBuffer, parsePageRange } from '../utils';
import { ProcessResult } from '../types';

export async function splitPdf(
  file: File,
  pageIndicesOrRange: number[] | string,
  outputName?: string
): Promise<ProcessResult> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  let srcDoc: PDFDocument;
  try {
    srcDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
  } catch {
    throw new Error(`Failed to load "${file.name}". The file may be corrupt or encrypted.`);
  }

  const totalPages = srcDoc.getPageCount();
  if (totalPages === 0) {
    throw new Error('This PDF has no pages.');
  }

  let selectedIndices: number[];
  if (typeof pageIndicesOrRange === 'string') {
    selectedIndices = parsePageRange(pageIndicesOrRange, totalPages);
  } else {
    selectedIndices = pageIndicesOrRange.filter((idx) => idx >= 0 && idx < totalPages);
  }

  if (selectedIndices.length === 0) {
    throw new Error('Please select at least one page to extract.');
  }

  const newDoc = await PDFDocument.create();
  const copiedPages = await newDoc.copyPages(srcDoc, selectedIndices);
  copiedPages.forEach((p) => newDoc.addPage(p));

  const newPdfBytes = await newDoc.save();
  const blob = new Blob([newPdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });

  const finalName = outputName || `${file.name.replace(/\.pdf$/i, '')}_extracted.pdf`;

  return {
    blob,
    fileName: finalName,
    originalSize: file.size,
    newSize: blob.size,
    savingsPercentage: file.size > 0 ? Math.round(((file.size - blob.size) / file.size) * 100) : 0,
    pageCount: selectedIndices.length,
  };
}

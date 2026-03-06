/**
 * image-resize.js — Client-side image resizer
 * Resizes images to fit within maxDim (default 1024px) and compresses
 * to stay under maxBytes (default 2MB) before upload.
 *
 * Usage:
 *   import { resizeImage } from '/js/image-resize.js';
 *   const resized = await resizeImage(file);  // returns a Blob
 */

const DEFAULT_MAX_DIM   = 1024;   // px — longest edge
const DEFAULT_MAX_BYTES = 2 * 1024 * 1024;  // 2MB
const DEFAULT_QUALITY   = 0.88;   // JPEG quality

/**
 * Resize + compress an image file client-side.
 * @param {File} file           — input file from <input type="file">
 * @param {object} opts
 * @param {number} opts.maxDim    — max width or height in px (default 1024)
 * @param {number} opts.maxBytes  — max output size in bytes (default 2MB)
 * @param {number} opts.quality   — JPEG quality 0–1 (default 0.88)
 * @returns {Promise<Blob>}       — resized image as Blob (image/jpeg)
 */
export async function resizeImage(file, opts = {}) {
  const maxDim   = opts.maxDim   ?? DEFAULT_MAX_DIM;
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX_BYTES;
  let   quality  = opts.quality  ?? DEFAULT_QUALITY;

  // Already small enough — return as-is (still convert to jpeg for consistency)
  // unless it's already under limit
  if (file.size <= maxBytes && file.type === 'image/jpeg') {
    return file;
  }

  const img = await loadImage(file);
  let { w, h } = fitDimensions(img.width, img.height, maxDim);

  // Draw to canvas at target size
  const canvas  = document.createElement('canvas');
  canvas.width  = w;
  canvas.height = h;
  canvas.getContext('2d').drawImage(img, 0, 0, w, h);

  // Compress, reducing quality if needed to hit maxBytes
  let blob = await canvasToBlob(canvas, quality);
  while (blob.size > maxBytes && quality > 0.4) {
    quality -= 0.08;
    blob = await canvasToBlob(canvas, quality);
  }

  // If still too big, halve dimensions and retry once
  if (blob.size > maxBytes) {
    w = Math.round(w / 2);
    h = Math.round(h / 2);
    canvas.width  = w;
    canvas.height = h;
    canvas.getContext('2d').drawImage(img, 0, 0, w, h);
    blob = await canvasToBlob(canvas, 0.5);
  }

  return blob;
}

/**
 * Resize an image and return a preview data URL (for <img src=...>).
 * @param {File} file
 * @param {object} opts — same as resizeImage
 * @returns {Promise<{blob: Blob, dataUrl: string, originalSize: number, newSize: number}>}
 */
export async function resizeImageWithPreview(file, opts = {}) {
  const blob    = await resizeImage(file, opts);
  const dataUrl = await blobToDataUrl(blob);
  return {
    blob,
    dataUrl,
    originalSize: file.size,
    newSize:      blob.size,
  };
}

// ── Internals ─────────────────────────────────────────────────────

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload  = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = reject;
    img.src     = url;
  });
}

function fitDimensions(srcW, srcH, maxDim) {
  if (srcW <= maxDim && srcH <= maxDim) return { w: srcW, h: srcH };
  const ratio = Math.min(maxDim / srcW, maxDim / srcH);
  return { w: Math.round(srcW * ratio), h: Math.round(srcH * ratio) };
}

function canvasToBlob(canvas, quality) {
  return new Promise(resolve =>
    canvas.toBlob(resolve, 'image/jpeg', quality)
  );
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader  = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

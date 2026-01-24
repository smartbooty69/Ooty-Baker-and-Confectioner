import { put, del, head } from '@vercel/blob';
import { logger } from './logger';

export interface UploadResult {
  success: boolean;
  filePath?: string;
  error?: string;
  hint?: string;
}

/**
 * Check if Vercel Blob is configured
 */
export function isVercelBlobConfigured(): boolean {
  // Vercel Blob requires BLOB_READ_WRITE_TOKEN environment variable
  // On Vercel, this should be automatically available if Blob storage is connected
  // But we need to check for the actual token, not just VERCEL env var
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

/**
 * Upload file to Vercel Blob Storage
 */
export async function uploadToVercelBlob(
  file: { buffer: Buffer; originalFilename: string; mimetype: string }
): Promise<UploadResult> {
  // Check if we have the token (required for both local dev and Vercel)
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      success: false,
      error: 'Vercel Blob not configured. BLOB_READ_WRITE_TOKEN environment variable is required.',
      hint: process.env.VERCEL 
        ? 'Add BLOB_READ_WRITE_TOKEN to your Vercel project environment variables. Go to Vercel Dashboard → Your Project → Settings → Environment Variables → Add BLOB_READ_WRITE_TOKEN'
        : 'Get your token from Vercel Dashboard → Your Project → Storage → Blob → Settings and add it to .env.local'
    };
  }

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const extension = file.originalFilename.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `product-images/${timestamp}_${randomStr}.${extension}`;

    console.log("[VERCEL BLOB] Uploading file:", {
      filename,
      size: file.buffer.length,
      mimetype: file.mimetype
    });

    // Upload to Vercel Blob
    const blob = await put(filename, file.buffer, {
      access: 'public',
      contentType: file.mimetype,
    });

    console.log("[VERCEL BLOB] Upload successful:", blob.url);
    logger.info(`File uploaded to Vercel Blob: ${filename}`);

    return {
      success: true,
      filePath: blob.url
    };
  } catch (error: any) {
    console.error("[VERCEL BLOB] Upload error:", error);
    logger.error('Error uploading to Vercel Blob', error);
    
    return {
      success: false,
      error: error?.message || "Failed to upload file to Vercel Blob"
    };
  }
}

/**
 * Delete file from Vercel Blob Storage
 */
export async function deleteFromVercelBlob(filePath: string): Promise<boolean> {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.VERCEL) {
    logger.warn('Vercel Blob not configured, cannot delete file');
    return false;
  }

  try {
    // Extract the blob URL or path
    // Vercel Blob URLs look like: https://[hash].public.blob.vercel-storage.com/...
    const url = new URL(filePath);
    const pathname = url.pathname;

    // Try to delete using the URL
    await del(filePath);

    logger.info(`File deleted from Vercel Blob: ${filePath}`);
    return true;
  } catch (error: any) {
    logger.error('Error deleting from Vercel Blob', error);
    return false;
  }
}

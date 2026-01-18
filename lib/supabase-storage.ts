import { createClient } from '@supabase/supabase-js';
import { logger } from './logger';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client (only if keys are available)
let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  logger.warn('Supabase credentials not configured. File uploads will fall back to local storage.');
}

export interface UploadResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadToSupabase(
  file: { buffer: Buffer; originalFilename: string; mimetype: string }
): Promise<UploadResult> {
  // Fallback to local storage if Supabase not configured
  if (!supabase) {
    return {
      success: false,
      error: 'Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    };
  }

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const extension = file.originalFilename.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${timestamp}_${randomStr}.${extension}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      logger.error('Supabase upload error', error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filename);

    logger.info(`File uploaded to Supabase: ${filename}`);
    return {
      success: true,
      filePath: publicUrl
    };
  } catch (error: any) {
    logger.error('Error uploading to Supabase', error);
    return {
      success: false,
      error: error?.message || "Failed to upload file to Supabase"
    };
  }
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFromSupabase(filePath: string): Promise<boolean> {
  if (!supabase) {
    logger.warn('Supabase not configured, cannot delete file');
    return false;
  }

  try {
    // Extract filename from URL
    // URL format: https://xxxxx.supabase.co/storage/v1/object/public/product-images/filename.jpg
    const urlParts = filePath.split('/');
    const filename = urlParts[urlParts.length - 1];

    if (!filename) {
      logger.warn('Could not extract filename from path', { filePath });
      return false;
    }

    const { error } = await supabase.storage
      .from('product-images')
      .remove([filename]);

    if (error) {
      logger.error('Error deleting from Supabase', error);
      return false;
    }

    logger.info(`File deleted from Supabase: ${filename}`);
    return true;
  } catch (error) {
    logger.error('Error deleting from Supabase', error);
    return false;
  }
}

/**
 * Check if Supabase is configured
 */
export function isSupabaseConfigured(): boolean {
  return !!(supabaseUrl && supabaseAnonKey && supabase);
}

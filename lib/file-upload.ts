import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { logger } from "./logger";
import { uploadToSupabase, deleteFromSupabase, isSupabaseConfigured } from "./supabase-storage";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads", "images");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

export interface UploadResult {
  success: boolean;
  filePath?: string;
  error?: string;
  hint?: string;
}

/**
 * Validate uploaded file
 */
export function validateFile(file: { size: number; mimetype: string }): { valid: boolean; error?: string } {
  if (file.size === 0) {
    return { valid: false, error: "File size is 0. Please upload a valid image." };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds maximum of ${MAX_FILE_SIZE / 1024 / 1024}MB.` };
  }

  if (!ALLOWED_TYPES.includes(file.mimetype)) {
    return { valid: false, error: "Only JPG, JPEG, PNG, and GIF formats are allowed." };
  }

  return { valid: true };
}

/**
 * Save uploaded file (uses Supabase if configured, otherwise local storage)
 */
export async function saveFile(file: { buffer: Buffer; originalFilename: string; mimetype?: string }): Promise<UploadResult> {
  console.log("[FILE UPLOAD] Starting file upload:", {
    filename: file.originalFilename,
    size: file.buffer.length,
    mimetype: file.mimetype,
    isVercel: !!process.env.VERCEL
  });

  // Validate first
  const validation = validateFile({
    size: file.buffer.length,
    mimetype: file.mimetype || "image/jpeg",
  });

  if (!validation.valid) {
    console.error("[FILE UPLOAD] Validation failed:", validation.error);
    return { success: false, error: validation.error };
  }

  console.log("[FILE UPLOAD] Validation passed");

  // Use Supabase if configured, otherwise fall back to local storage
  const supabaseConfigured = isSupabaseConfigured();
  console.log("[FILE UPLOAD] Supabase configured:", supabaseConfigured);

  if (supabaseConfigured && file.mimetype) {
    console.log("[FILE UPLOAD] Using Supabase Storage");
    try {
      const result = await uploadToSupabase({
        buffer: file.buffer,
        originalFilename: file.originalFilename,
        mimetype: file.mimetype,
      });
      console.log("[FILE UPLOAD] Supabase upload result:", result);
      return result;
    } catch (error: any) {
      console.error("[FILE UPLOAD] Supabase upload error:", error);
      return { success: false, error: error?.message || "Failed to upload to Supabase" };
    }
  }

  // Fallback to local storage (only works in development, not on Vercel)
  // On Vercel, filesystem is read-only except /tmp, so Supabase must be configured
  if (process.env.VERCEL) {
    console.error("[FILE UPLOAD] Vercel detected but Supabase not configured");
    return {
      success: false,
      error: "File uploads require Supabase Storage to be configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables."
    };
  }

  console.log("[FILE UPLOAD] Using local storage fallback");

  try {
    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 15);
    const extension = file.originalFilename.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${timestamp}_${randomStr}.${extension}`;
    const filePath = join(UPLOAD_DIR, filename);

    // Write file to disk
    await writeFile(filePath, file.buffer);

    // Return path relative to public directory (for Next.js)
    const publicPath = `/uploads/images/${filename}`;
    return { success: true, filePath: publicPath };
  } catch (error) {
    logger.error("Error saving file", error);
    return { success: false, error: "Failed to save file." };
  }
}

/**
 * Delete file (uses Supabase if URL is from Supabase, otherwise local storage)
 */
export async function deleteFile(filePath: string): Promise<boolean> {
  // Check if it's a Supabase URL
  if (filePath.includes('supabase.co/storage')) {
    return await deleteFromSupabase(filePath);
  }

  // Fallback to local storage
  try {
    // Remove leading slash and convert to absolute path
    const relativePath = filePath.startsWith("/") ? filePath.slice(1) : filePath;
    const absolutePath = join(process.cwd(), "public", relativePath);

    if (existsSync(absolutePath)) {
      await unlink(absolutePath);
      return true;
    }
    return false;
  } catch (error) {
    logger.error("Error deleting file", error);
    return false;
  }
}

import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads", "images");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

export interface UploadResult {
  success: boolean;
  filePath?: string;
  error?: string;
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
 * Save uploaded file to disk
 */
export async function saveFile(file: { buffer: Buffer; originalFilename: string }): Promise<UploadResult> {
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
    console.error("Error saving file:", error);
    return { success: false, error: "Failed to save file." };
  }
}

/**
 * Delete file from disk
 */
export async function deleteFile(filePath: string): Promise<boolean> {
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
    console.error("Error deleting file:", error);
    return false;
  }
}

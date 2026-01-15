import { getSession } from "./session";
import { NextResponse } from "next/server";

/**
 * Check if user is authenticated (for use in API routes)
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    return {
      error: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  return { session };
}

/**
 * Get current user session (for use in Server Components)
 */
export async function getCurrentUser() {
  return await getSession();
}

import { getSession } from "./session";
import { NextResponse } from "next/server";

/**
 * Check if user is authenticated (for use in API routes)
 */
export async function requireAuth() {
  console.log("[REQUIRE_AUTH] Checking session...");
  const session = await getSession();
  console.log("[REQUIRE_AUTH] Session result:", session ? { id: session.id, email: session.email } : "null");
  
  if (!session) {
    console.log("[REQUIRE_AUTH] No session found, returning 401");
    return {
      error: NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      ),
    };
  }

  console.log("[REQUIRE_AUTH] Session valid, user authenticated");
  return { session };
}

/**
 * Get current user session (for use in Server Components)
 */
export async function getCurrentUser() {
  return await getSession();
}

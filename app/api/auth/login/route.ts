import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, verifyPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    console.log("[LOGIN] Starting login request");
    let body;
    try {
      body = await request.json();
      console.log("[LOGIN] Request body parsed:", { username: body?.username ? "***" : "missing" });
    } catch (parseError: any) {
      console.error("[LOGIN] JSON parse error:", parseError);
      logger.error("JSON parse error in login", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid request format" },
        { status: 400 }
      );
    }

    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Please fill in all fields" },
        { status: 400 }
      );
    }

    // Check if username is email or phone (for now, we'll assume email)
    let user;
    try {
      console.log("[LOGIN] Fetching user by email:", username);
      user = await getUserByEmail(username);
      console.log("[LOGIN] User found:", user ? { id: user.id, email: user.email } : "null");
    } catch (dbError: any) {
      console.error("[LOGIN] Database error fetching user:", {
        code: dbError?.code,
        message: dbError?.message,
        error: dbError
      });
      logger.error("Database error fetching user", dbError);
      // Check if it's a connection error
      if (dbError.code === 'P1001' || dbError.message?.includes('Can\'t reach database')) {
        return NextResponse.json(
          { success: false, error: "Database connection error. Please try again later." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { success: false, error: `Database error: ${dbError?.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    let isValid;
    try {
      console.log("[LOGIN] Verifying password");
      isValid = await verifyPassword(password, user.password);
      console.log("[LOGIN] Password verification result:", isValid);
    } catch (verifyError: any) {
      console.error("[LOGIN] Password verification error:", verifyError);
      logger.error("Password verification error", verifyError);
      return NextResponse.json(
        { success: false, error: `Error verifying password: ${verifyError?.message || "Unknown error"}` },
        { status: 500 }
      );
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session
    try {
      console.log("[LOGIN] Creating session for user:", { id: user.id, email: user.email });
      await createSession(user.id, user.email);
      console.log("[LOGIN] Session created successfully");
    } catch (sessionError: any) {
      console.error("[LOGIN] Session creation error:", {
        message: sessionError?.message,
        stack: sessionError?.stack,
        error: sessionError
      });
      logger.error("Session creation error", sessionError);
      // Provide more specific error message
      const errorMessage = sessionError?.message || "Failed to create session";
      return NextResponse.json(
        { 
          success: false, 
          error: `Failed to create session: ${errorMessage}. Please try again.` 
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
    });
  } catch (error: any) {
    console.error("[LOGIN] Unexpected error:", {
      message: error?.message,
      stack: error?.stack,
      code: error?.code,
      name: error?.name,
      error: error
    });
    logger.error("Login error", error);
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid request format" },
        { status: 400 }
      );
    }
    
    // Return more detailed error for debugging
    const errorMessage = error?.message || "An error occurred during login";
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        code: error?.code || "UNKNOWN"
      },
      { status: 500 }
    );
  }
}

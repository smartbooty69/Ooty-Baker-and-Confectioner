import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, verifyPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError: any) {
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
      user = await getUserByEmail(username);
    } catch (dbError: any) {
      logger.error("Database error fetching user", dbError);
      // Check if it's a connection error
      if (dbError.code === 'P1001' || dbError.message?.includes('Can\'t reach database')) {
        return NextResponse.json(
          { success: false, error: "Database connection error. Please try again later." },
          { status: 503 }
        );
      }
      return NextResponse.json(
        { success: false, error: "Database error. Please try again later." },
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
      isValid = await verifyPassword(password, user.password);
    } catch (verifyError: any) {
      logger.error("Password verification error", verifyError);
      return NextResponse.json(
        { success: false, error: "Error verifying password. Please try again." },
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
      await createSession(user.id, user.email);
    } catch (sessionError: any) {
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

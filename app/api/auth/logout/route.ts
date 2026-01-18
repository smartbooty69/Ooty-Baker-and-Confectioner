import { NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/session";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    await destroySession();
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    logger.error("Logout error", error);
    return NextResponse.json(
      { success: false, error: "An error occurred during logout" },
      { status: 500 }
    );
  }
}

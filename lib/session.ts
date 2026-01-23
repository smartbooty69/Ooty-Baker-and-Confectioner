import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { logger } from "./logger";

export interface SessionUser {
  id: number;
  email: string;
}

const SESSION_COOKIE_NAME = "auth_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: number, email: string) {
  try {
    console.log("[SESSION] Creating session for user:", { userId, email });
    const cookieStore = cookies();
    const sessionData = {
      userId,
      email,
      expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString(),
    };

    console.log("[SESSION] Setting cookie with data:", {
      cookieName: SESSION_COOKIE_NAME,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE
    });

    cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    console.log("[SESSION] Cookie set successfully");
    return sessionData;
  } catch (error: any) {
    console.error("[SESSION] Error creating session cookie:", {
      message: error?.message,
      stack: error?.stack,
      error: error
    });
    logger.error("Error creating session cookie", error);
    throw new Error(`Failed to set session cookie: ${error?.message || "Unknown error"}`);
  }
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    console.log("[GET_SESSION] Getting session cookie...");
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      console.log("[GET_SESSION] No session cookie found");
      return null;
    }

    console.log("[GET_SESSION] Session cookie found, parsing...");
    const sessionData = JSON.parse(sessionCookie.value);
    console.log("[GET_SESSION] Session data parsed:", {
      userId: sessionData.userId,
      email: sessionData.email,
      expiresAt: sessionData.expiresAt
    });

    // Check if session is expired
    const expiresAt = new Date(sessionData.expiresAt);
    const now = new Date();
    console.log("[GET_SESSION] Checking expiration:", {
      expiresAt: expiresAt.toISOString(),
      now: now.toISOString(),
      isExpired: expiresAt < now
    });
    
    if (expiresAt < now) {
      console.log("[GET_SESSION] Session expired, destroying...");
      await destroySession();
      return null;
    }

    // Verify user still exists
    console.log("[GET_SESSION] Verifying user exists in database...");
    const user = await prisma.user.findUnique({
      where: { id: sessionData.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      console.log("[GET_SESSION] User not found in database, destroying session...");
      await destroySession();
      return null;
    }

    console.log("[GET_SESSION] Session valid, returning user:", { id: user.id, email: user.email });
    return { id: user.id, email: user.email };
  } catch (error: any) {
    console.error("[GET_SESSION] Error getting session:", {
      message: error?.message,
      code: error?.code,
      name: error?.name,
      stack: error?.stack
    });
    logger.error("Session error", error);
    return null;
  }
}

export async function destroySession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

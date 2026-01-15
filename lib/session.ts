import { cookies } from "next/headers";
import { prisma } from "./prisma";

export interface SessionUser {
  id: number;
  email: string;
}

const SESSION_COOKIE_NAME = "auth_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function createSession(userId: number, email: string) {
  const cookieStore = cookies();
  const sessionData = {
    userId,
    email,
    expiresAt: new Date(Date.now() + SESSION_MAX_AGE * 1000).toISOString(),
  };

  cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return sessionData;
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

    if (!sessionCookie?.value) {
      return null;
    }

    const sessionData = JSON.parse(sessionCookie.value);

    // Check if session is expired
    if (new Date(sessionData.expiresAt) < new Date()) {
      await destroySession();
      return null;
    }

    // Verify user still exists
    const user = await prisma.user.findUnique({
      where: { id: sessionData.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      await destroySession();
      return null;
    }

    return { id: user.id, email: user.email };
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}

export async function destroySession() {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

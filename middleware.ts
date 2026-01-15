import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/api/dashboard", "/api/inquiries", "/api/products"];

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Check for session cookie
    const sessionCookie = request.cookies.get("auth_session");

    if (!sessionCookie) {
      // Redirect to auth page if not authenticated
      if (pathname.startsWith("/api")) {
        // For API routes, return 401
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 401 }
        );
      } else {
        // For pages, redirect to auth
        const authUrl = new URL("/auth", request.url);
        authUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(authUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|images|uploads).*)",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude auth API routes - they handle their own authentication
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Exclude public API routes
  const publicApiRoutes = [
    "/api/products", // GET is public, POST requires auth (handled in route)
  ];
  
  // For GET requests to public routes, allow through
  if (request.method === "GET" && publicApiRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/api/dashboard", "/api/inquiries"];

  // For /api/products, only protect POST/PUT/DELETE (GET is public)
  if (pathname.startsWith("/api/products") && request.method !== "GET") {
    console.log("[MIDDLEWARE] Checking auth for /api/products", request.method);
    const sessionCookie = request.cookies.get("auth_session");
    console.log("[MIDDLEWARE] Session cookie exists:", !!sessionCookie);
    if (!sessionCookie) {
      console.log("[MIDDLEWARE] No session cookie, returning 401");
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    console.log("[MIDDLEWARE] Session cookie found, allowing request");
    return NextResponse.next();
  }

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

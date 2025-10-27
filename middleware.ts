import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/projects",
  "/analytics",
  "/settings",
  "/predictions",
  "/schedule",
  "/stadiums",
  "/teams",
  "/leagues",
  "/leaderboard",
  "/rules",
];

const authRoutes = ["/login", "/signup"];

/**
 * Check if user is authenticated by checking both:
 * 1. HTTP-only cookies (preferred method)
 * 2. localStorage auth state (fallback for cookie issues)
 */
function isUserAuthenticated(request: NextRequest): boolean {
  // Primary check: accessToken cookie (HTTP-only from backend)
  const accessTokenCookie = request.cookies.get("accessToken");
  if (accessTokenCookie) {
    return true;
  }

  // Fallback check: Check for auth state in cookie/header that client can set
  // This works because the client can set a non-HTTP-only cookie as a signal
  const authStateCookie = request.cookies.get("porraza-auth-state");
  if (authStateCookie) {
    try {
      const authState = JSON.parse(authStateCookie.value);
      return !!(authState?.state?.userId && authState?.state?.accessToken);
    } catch {
      return false;
    }
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthenticated = isUserAuthenticated(request);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas excepto:
     * - api (API routes)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico (favicon)
     * - public (archivos públicos)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};

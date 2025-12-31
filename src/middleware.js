import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Debug logging
  console.log(`[Middleware] Path: ${pathname}, Token found: ${!!token}`);

  // 1. If user is logged in and tries to go to login page, redirect to dashboard
  if (pathname.startsWith("/login")) {
    if (token) {
      console.log(
        "[Middleware] User already logged in, redirecting from login to dashboard"
      );
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // 2. If user is NOT logged in and tries to go to dashboard, redirect to login
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log(
        "[Middleware] No token found for dashboard access, redirecting to login"
      );
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};

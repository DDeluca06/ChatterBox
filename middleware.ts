import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth")
    const isApiAuth = req.nextUrl.pathname.startsWith("/api/auth")
    const isCallback = req.nextUrl.pathname.startsWith("/api/auth/callback")

    // Always allow auth-related API routes and callbacks
    if (isApiAuth || isCallback) {
      return NextResponse.next()
    }

    // If on auth page and authenticated, redirect to dashboard
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // If not authenticated and trying to access protected routes
    if (!isAuth && !isAuthPage) {
      const from = req.nextUrl.pathname
      return NextResponse.redirect(
        new URL(`/auth/signin?callbackUrl=${encodeURIComponent(from)}`, req.url)
      )
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true // We handle the auth check in the middleware function
    },
  }
)

// Protect all routes under /platforms and /dashboard
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/platforms/:path*",
    "/auth/:path*",
    "/api/auth/:path*"
  ]
} 
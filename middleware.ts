import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
)

// Protect all routes under /platforms and /dashboard
export const config = {
  matcher: ["/platforms/:path*", "/dashboard/:path*"]
} 
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Delete all auth-related cookies
  const cookieNames = [
    "token",
    "next-auth.session-token",
    "next-auth.callback-url",
    "next-auth.csrf-token"
  ];

  // Delete cookies
  cookieNames.forEach(cookieName => {
    response.cookies.delete(cookieName);
  });

  return response;
} 
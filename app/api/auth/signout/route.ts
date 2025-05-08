import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  
  // Delete all auth-related cookies
  const cookieNames = [
    "token",
    "next-auth.session-token",
    "next-auth.callback-url",
    "next-auth.csrf-token"
  ];

  // Delete cookies in parallel
  await Promise.all(
    cookieNames.map(cookieName => cookieStore.delete(cookieName))
  );

  return NextResponse.json({ success: true });
} 
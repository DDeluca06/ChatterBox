import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();
  await cookieStore.delete("token");
  await cookieStore.delete("next-auth.session-token");
  await cookieStore.delete("next-auth.callback-url");
  await cookieStore.delete("next-auth.csrf-token");
  
  return NextResponse.json({ success: true });
} 
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const accounts = await prisma.socialConnection.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.error("[SOCIAL_ACCOUNTS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 
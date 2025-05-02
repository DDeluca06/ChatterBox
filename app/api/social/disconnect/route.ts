import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { platform } = await req.json()

    // Update the connection status
    const connection = await prisma.socialConnection.update({
      where: {
        userId_platform: {
          userId: session.user.id,
          platform: platform,
        },
      },
      data: {
        isConnected: false,
        accessToken: null,
        refreshToken: null,
        tokenExpiresAt: null,
      },
    })

    return NextResponse.json(connection)
  } catch (error) {
    console.error("[SOCIAL_DISCONNECT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 
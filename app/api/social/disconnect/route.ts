import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PlatformType } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { platform, username } = body

    if (!platform || !username) {
      return new NextResponse("Missing platform or username", { status: 400 })
    }

    // Delete the social connection
    await prisma.socialConnection.deleteMany({
      where: {
        platform: platform as PlatformType,
        username,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ message: "Account disconnected successfully" })
  } catch (error) {
    console.error("[SOCIAL_DISCONNECT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 
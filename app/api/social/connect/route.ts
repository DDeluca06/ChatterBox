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
    const { platform, accessToken, refreshToken, expiresAt, platformUserId, username } = body

    if (!platform || !accessToken || !platformUserId || !username) {
      return new NextResponse("Missing required fields", { status: 400 })
    }

    // Check if account already exists
    const existingAccount = await prisma.socialConnection.findFirst({
      where: {
        userId: session.user.id,
        platform: platform as PlatformType,
      },
    })

    if (existingAccount) {
      // Update existing account
      await prisma.socialConnection.update({
        where: {
          id: existingAccount.id,
        },
        data: {
          accessToken,
          refreshToken,
          tokenExpiresAt: expiresAt,
          username,
          updatedAt: new Date(),
        },
      })

      return NextResponse.json({ message: "Account updated successfully" })
    }

    // Create new account
    await prisma.socialConnection.create({
      data: {
        userId: session.user.id,
        platform: platform as PlatformType,
        username,
        accessToken,
        refreshToken,
        tokenExpiresAt: expiresAt,
        isConnected: true,
      },
    })

    return NextResponse.json({ message: "Account connected successfully" })
  } catch (error) {
    console.error("[SOCIAL_CONNECT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 
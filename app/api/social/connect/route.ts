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

    const { platform, code } = await req.json()

    // Here we would implement the OAuth flow for each platform
    // This is a simplified example - you'll need to implement the actual OAuth flow
    const platformData = await handlePlatformAuth(platform, code)

    // Create or update the social connection
    const connection = await prisma.socialConnection.upsert({
      where: {
        userId_platform: {
          userId: session.user.id,
          platform: platform,
        },
      },
      update: {
        accessToken: platformData.accessToken,
        refreshToken: platformData.refreshToken,
        tokenExpiresAt: platformData.tokenExpiresAt,
        username: platformData.username,
        isConnected: true,
        metadata: platformData.metadata,
      },
      create: {
        userId: session.user.id,
        platform: platform,
        accessToken: platformData.accessToken,
        refreshToken: platformData.refreshToken,
        tokenExpiresAt: platformData.tokenExpiresAt,
        username: platformData.username,
        isConnected: true,
        metadata: platformData.metadata,
      },
    })

    return NextResponse.json(connection)
  } catch (error) {
    console.error("[SOCIAL_CONNECT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

async function handlePlatformAuth(platform: string, code: string) {
  // This is where you would implement the actual OAuth flow for each platform
  // You'll need to:
  // 1. Exchange the code for access tokens
  // 2. Fetch user profile data
  // 3. Return the necessary data for storage

  // This is a placeholder implementation
  return {
    accessToken: "dummy_access_token",
    refreshToken: "dummy_refresh_token",
    tokenExpiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    username: "@dummy_user",
    metadata: {
      followers: 0,
      engagement: "0%",
      lastSync: new Date().toISOString(),
    },
  }
} 
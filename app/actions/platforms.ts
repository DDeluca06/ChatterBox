"use server"

import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

interface PlatformData {
  followers: number
  engagementRate: number
  totalPosts?: number
  hashtagReach?: number
  retweets?: number
  impressions?: number
  pageLikes?: number
  reach?: number
  communityGrowth?: number
  contentViews?: number
  activeJobs?: number
}

const defaultStats = {
  followers: 0,
  engagementRate: 0,
  totalPosts: 0,
  hashtagReach: 0,
  retweets: 0,
  impressions: 0,
  pageLikes: 0,
  reach: 0,
  communityGrowth: 0,
  contentViews: 0,
  activeJobs: 0,
}

export async function getPlatformData(platform: string): Promise<PlatformData> {
  try {
    // Check authentication
    const user = await getCurrentUser()
    if (!user) {
      redirect("/auth/signin")
    }

    // Check if user has access to this platform
    const hasAccess = user.socialConnections.some(
      (conn) => conn.platform.toLowerCase() === platform.toLowerCase()
    )

    if (!hasAccess) {
      throw new Error("You don't have access to this platform")
    }

    // Fetch platform-specific data from the database
    const platformData = await prisma.platform.findUnique({
      where: {
        name: platform.toLowerCase(),
      },
      include: {
        stats: true,
      },
    })

    // If platform doesn't exist, create it with default stats
    if (!platformData) {
      const newPlatform = await prisma.platform.create({
        data: {
          name: platform.toLowerCase(),
          stats: {
            create: defaultStats
          }
        },
        include: {
          stats: true
        }
      })
      return {
        followers: newPlatform.stats?.followers ?? 0,
        engagementRate: newPlatform.stats?.engagementRate ?? 0,
        totalPosts: newPlatform.stats?.totalPosts ?? 0,
        hashtagReach: newPlatform.stats?.hashtagReach ?? 0,
        retweets: newPlatform.stats?.retweets ?? 0,
        impressions: newPlatform.stats?.impressions ?? 0,
        pageLikes: newPlatform.stats?.pageLikes ?? 0,
        reach: newPlatform.stats?.reach ?? 0,
        communityGrowth: newPlatform.stats?.communityGrowth ?? 0,
        contentViews: newPlatform.stats?.contentViews ?? 0,
        activeJobs: newPlatform.stats?.activeJobs ?? 0,
      }
    }

    // Return platform-specific data based on the platform type
    return {
      followers: platformData.stats?.followers ?? 0,
      engagementRate: platformData.stats?.engagementRate ?? 0,
      totalPosts: platformData.stats?.totalPosts ?? 0,
      hashtagReach: platformData.stats?.hashtagReach ?? 0,
      retweets: platformData.stats?.retweets ?? 0,
      impressions: platformData.stats?.impressions ?? 0,
      pageLikes: platformData.stats?.pageLikes ?? 0,
      reach: platformData.stats?.reach ?? 0,
      communityGrowth: platformData.stats?.communityGrowth ?? 0,
      contentViews: platformData.stats?.contentViews ?? 0,
      activeJobs: platformData.stats?.activeJobs ?? 0,
    }
  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error)
    // Return default values in case of error
    return defaultStats
  }
} 
"use server"

import { prisma } from "@/lib/prisma"

interface PlatformStats {
  instagram?: {
    followers: number
    engagementRate: number
  }
  twitter?: {
    followers: number
    engagementRate: number
  }
  facebook?: {
    followers: number
    engagementRate: number
  }
  linkedin?: {
    followers: number
    engagementRate: number
  }
}

interface PlatformOverviewData {
  date: string;
  followers: number;
  engagement: number;
}

interface PlatformEngagementData {
  type: string;
  count: number;
  rate: number;
}

interface PlatformContentData {
  type: string;
  value: number;
}

interface PlatformAudienceData {
  category: string;
  percentage: number;
  change: number;
}

export async function getPlatformStats(): Promise<PlatformStats> {
  try {
    const platforms = await prisma.platform.findMany({
      include: {
        stats: {
          orderBy: {
            date: 'desc'
          },
          take: 1
        },
      },
    })

    const stats: PlatformStats = {}

    platforms.forEach((platform) => {
      const platformName = platform.name.toLowerCase()
      if (platform.stats?.[0]) {
        stats[platformName as keyof PlatformStats] = {
          followers: platform.stats[0].followers,
          engagementRate: platform.stats[0].engagementRate,
        }
      }
    })

    return stats
  } catch (error) {
    console.error("Error fetching platform stats:", error)
    return {}
  }
}

export async function getPlatformStatsByName(platformName: string) {
  try {
    const platform = await prisma.platform.findFirst({
      where: {
        name: {
          equals: platformName,
        },
      },
      include: {
        stats: {
          orderBy: {
            date: 'desc'
          },
          take: 1
        },
      },
    })

    if (!platform?.stats?.[0]) {
      return {
        followers: 0,
        engagementRate: 0,
        growth: 0,
      }
    }

    const latestStats = platform.stats[0]
    return {
      followers: latestStats.followers,
      engagementRate: latestStats.engagementRate,
      growth: latestStats.communityGrowth,
    }
  } catch (error) {
    console.error(`Error fetching ${platformName} stats:`, error)
    return {
      followers: 0,
      engagementRate: 0,
      growth: 0,
    }
  }
}

export async function getPlatformOverviewStats(platformName: string, limit: number = 12): Promise<PlatformOverviewData[]> {
  try {
    const platform = await prisma.platform.findFirst({
      where: { name: platformName }
    });

    if (!platform) return [];

    const stats = await prisma.stats.findMany({
      where: { platformId: platform.id },
      orderBy: { date: 'asc' }
    });

    if (!stats.length) return [];

    // Get only the last `limit` data points
    const recentStats = stats.slice(-limit);

    return recentStats.map(stat => ({
      date: stat.date.toLocaleDateString('default', { month: 'short', day: '2-digit' }),
      followers: stat.followers,
      engagement: stat.engagementRate,
    }));
  } catch (error) {
    console.error('Error fetching platform overview stats:', error);
    return [];
  }
}

export async function getPlatformEngagementStats(platformName: string): Promise<PlatformEngagementData[]> {
  try {
    const platform = await prisma.platform.findFirst({
      where: { name: platformName },
      include: {
        engagement: true
      }
    });

    if (!platform?.engagement) {
      return [];
    }

    return platform.engagement
      .sort((a, b) => b.count - a.count)
      .map(eng => ({
        type: eng.type,
        count: eng.count,
        rate: eng.rate,
      }));
  } catch (error) {
    console.error('Error fetching platform engagement stats:', error);
    return [];
  }
}

export async function getPlatformContentStats(platformName: string): Promise<PlatformContentData[]> {
  try {
    const platform = await prisma.platform.findFirst({
      where: { name: platformName },
      include: {
        content: true
      }
    });

    if (!platform?.content) {
      return [];
    }

    return platform.content
      .sort((a, b) => b.value - a.value)
      .map(content => ({
        type: content.type,
        value: content.value,
      }));
  } catch (error) {
    console.error('Error fetching platform content stats:', error);
    return [];
  }
}

export async function getPlatformAudienceStats(platformName: string): Promise<PlatformAudienceData[]> {
  try {
    const platform = await prisma.platform.findFirst({
      where: { name: platformName },
      include: {
        audience: true
      }
    });

    if (!platform?.audience) {
      return [];
    }

    return platform.audience
      .sort((a, b) => b.percentage - a.percentage)
      .map(audience => ({
        category: audience.category,
        percentage: audience.percentage,
        change: audience.change,
      }));
  } catch (error) {
    console.error('Error fetching platform audience stats:', error);
    return [];
  }
} 
"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface DashboardData {
  overview: {
    totalFollowers: number;
    avgEngagement: string;
    growthRate: string;
    aiInsights: number;
  };
  platformStats: {
    platform: string;
    followers: number;
    engagement: string;
    growth: number;
  }[];
  growthData: {
    name: string;
    instagram: number;
    twitter: number;
    facebook: number;
    linkedin: number;
  }[];
}

export async function getDashboardData(): Promise<DashboardData> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  try {
    const platforms = await prisma.platform.findMany({
      include: {
        stats: {
          orderBy: {
            date: 'desc'
          },
          take: 1
        }
      }
    });

    const platformStats = platforms.map(platform => ({
      platform: platform.name,
      followers: platform.stats[0]?.followers || 0,
      engagement: platform.stats[0]?.engagementRate?.toFixed(1) || "0",
      growth: platform.stats[0]?.communityGrowth || 0,
    }));

    // Calculate total followers
    const totalFollowers = platformStats.reduce((sum, stat) => sum + stat.followers, 0);

    // Calculate average engagement
    const avgEngagement = platformStats.reduce((sum, stat) => sum + parseFloat(stat.engagement), 0) / platformStats.length;

    // Calculate growth rate
    const growthRate = ((platformStats.reduce((sum, stat) => sum + stat.growth, 0) / totalFollowers) * 100).toFixed(1);

    // Get growth data for the last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('default', { month: 'short' });
    }).reverse();

    // For now, we'll use the current stats for all months
    // In a real app, you'd want to store historical data
    const growthData = months.map(month => ({
      name: month,
      instagram: platforms.find(p => p.name.toLowerCase() === 'instagram')?.stats?.followers || 0,
      twitter: platforms.find(p => p.name.toLowerCase() === 'twitter')?.stats?.followers || 0,
      facebook: platforms.find(p => p.name.toLowerCase() === 'facebook')?.stats?.followers || 0,
      linkedin: platforms.find(p => p.name.toLowerCase() === 'linkedin')?.stats?.followers || 0,
    }));

    return {
      overview: {
        totalFollowers,
        avgEngagement: avgEngagement.toFixed(1),
        growthRate: `+${growthRate}%`,
        aiInsights: 0, // This would come from your AI service
      },
      platformStats,
      growthData,
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      platformStats: [],
      overview: {
        totalFollowers: 0,
        avgEngagement: "0",
        growthRate: "+0%",
        aiInsights: 0,
      },
      growthData: [],
    };
  }
} 
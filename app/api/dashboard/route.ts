import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        socialConnections: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get platform stats
    const platformStats = await Promise.all(
      user.socialConnections.map(async (connection) => {
        // Fetch the platform by type
        const platform = await prisma.platform.findFirst({
          where: { name: connection.platform.toLowerCase() },
        });
        if (!platform) {
          return {
            platform: connection.platform.toLowerCase(),
            followers: 0,
            engagement: "0.0",
            growth: 0,
          };
        }
        // Fetch the stat with the maximum followers
        const maxFollowersStat = await prisma.stats.findFirst({
          where: { platformId: platform.id },
          orderBy: { followers: "desc" },
        });
        if (!maxFollowersStat) {
          return {
            platform: connection.platform.toLowerCase(),
            followers: 0,
            engagement: "0.0",
            growth: 0,
          };
        }
        return {
          platform: connection.platform.toLowerCase(),
          followers: maxFollowersStat.followers,
          engagement: maxFollowersStat.engagementRate?.toFixed(1) ?? "0.0",
          growth: maxFollowersStat.communityGrowth ?? 0,
        };
      })
    );

    // Get growth data for the last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('default', { month: 'short' });
    }).reverse();

    // Use actual stats for growthData if available
    const growthData = await Promise.all(months.map(async (month, idx) => {
      // For each platform, get the stat closest to this month
      const monthStats = {};
      for (const platform of ["instagram", "twitter", "facebook", "linkedin"]) {
        const dbPlatform = await prisma.platform.findFirst({ where: { name: platform } });
        if (dbPlatform) {
          // Find the stat closest to the target month
          const targetDate = new Date();
          targetDate.setMonth(targetDate.getMonth() - (5 - idx));
          const closest = await prisma.stats.findFirst({
            where: { platformId: dbPlatform.id },
            orderBy: [{ date: "asc" }],
          });
          monthStats[platform] = closest?.followers ?? 0;
        } else {
          monthStats[platform] = 0;
        }
      }
      return {
        name: month,
        instagram: monthStats.instagram,
        twitter: monthStats.twitter,
        facebook: monthStats.facebook,
        linkedin: monthStats.linkedin,
      };
    }));

    // Calculate total followers
    const totalFollowers = platformStats.reduce((sum, stat) => sum + stat.followers, 0);

    // Calculate average engagement
    const avgEngagement = platformStats.reduce((sum, stat) => sum + parseFloat(stat.engagement), 0) / platformStats.length;

    // Calculate growth rate
    const growthRate = ((platformStats.reduce((sum, stat) => sum + stat.growth, 0) / totalFollowers) * 100).toFixed(1);

    return NextResponse.json({
      overview: {
        totalFollowers,
        avgEngagement: avgEngagement.toFixed(1),
        growthRate: `+${growthRate}%`,
        aiInsights: Math.floor(Math.random() * 20) + 5,
      },
      platformStats,
      growthData,
    });
  } catch (error) {
    console.error("Dashboard data error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 
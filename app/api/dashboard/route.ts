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
        // Here you would typically fetch real-time stats from each platform's API
        // For now, we'll return mock data based on the connection
        return {
          platform: connection.platform,
          followers: Math.floor(Math.random() * 50000) + 10000,
          engagement: (Math.random() * 5).toFixed(1),
          growth: Math.floor(Math.random() * 200),
        };
      })
    );

    // Get growth data for the last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toLocaleString('default', { month: 'short' });
    }).reverse();

    const growthData = months.map(month => ({
      name: month,
      instagram: Math.floor(Math.random() * 5000) + 25000,
      twitter: Math.floor(Math.random() * 3000) + 15000,
      facebook: Math.floor(Math.random() * 5000) + 40000,
      linkedin: Math.floor(Math.random() * 2000) + 10000,
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
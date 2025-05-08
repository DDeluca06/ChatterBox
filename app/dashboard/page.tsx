import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, TrendingUp, Lightbulb } from "lucide-react";
import { PlatformCards } from "@/components/dashboard/platform-cards";
import {
  GrowthChart,
  GrowthMetricsChart,
  EngagementChart,
  ContentDistributionChart,
} from "@/components/dashboard/charts";
import { getDashboardData } from "@/app/actions/dashboard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-4 w-40 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
}

export default async function Dashboard() {
  const data = await getDashboardData();

  return (
    <div className="bg-background p-6">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-blue-500 text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Followers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{data.overview.totalFollowers.toLocaleString()}</div>
              <div className="flex items-center mt-2 text-sm">
                <Users className="h-4 w-4 mr-1" />
                <span>Across all platforms</span>
                <span className="ml-auto">→</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-500 text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Avg. Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{data.overview.avgEngagement}%</div>
              <div className="flex items-center mt-2 text-sm">
                <MessageSquare className="h-4 w-4 mr-1" />
                <span>+0.2% from last month</span>
                <span className="ml-auto">→</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-500 text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Growth Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{data.overview.growthRate}</div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>Last 30 days</span>
                <span className="ml-auto">→</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-500 text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{data.overview.aiInsights}</div>
              <div className="flex items-center mt-2 text-sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                <span>New recommendations</span>
                <span className="ml-auto">→</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Suspense fallback={<DashboardSkeleton />}>
          <PlatformCards platformStats={data.platformStats} />
        </Suspense>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <GrowthChart data={data.growthData} />
            </Suspense>
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <GrowthMetricsChart data={data.growthData} />
            </Suspense>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <EngagementChart data={data.platformStats} />
            </Suspense>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
              <ContentDistributionChart data={data.platformStats} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 
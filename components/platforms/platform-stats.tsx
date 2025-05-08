"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { OverviewChart } from "./charts/overview-chart";
import { EngagementChart } from "./charts/engagement-chart";
import { ContentChart } from "./charts/content-chart";
import { AudienceChart } from "./charts/audience-chart";

interface PlatformStatsProps {
  stats: {
    followers: number;
    engagementRate: number;
    growth: number;
  };
  platform: string;
  overviewData: {
    date: string;
    followers: number;
    engagement: number;
  }[];
  engagementData: {
    type: string;
    count: number;
    rate: number;
  }[];
  contentData: {
    type: string;
    value: number;
  }[];
  audienceData: {
    category: string;
    percentage: number;
    change: number;
  }[];
}

export function PlatformStats({ 
  stats, 
  platform,
  overviewData,
  engagementData,
  contentData,
  audienceData
}: PlatformStatsProps) {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.followers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+{stats.growth} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.engagementRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Based on last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <OverviewChart data={overviewData} platform={platform} />
          </Suspense>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <EngagementChart data={engagementData} platform={platform} />
          </Suspense>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <ContentChart data={contentData} platform={platform} />
          </Suspense>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
            <AudienceChart data={audienceData} platform={platform} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  );
} 
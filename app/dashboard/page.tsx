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

export default function Dashboard() {
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
              <div className="text-4xl font-bold">108.5K</div>
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
              <div className="text-4xl font-bold">3.0%</div>
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
              <div className="text-4xl font-bold">+3.8%</div>
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
              <div className="text-4xl font-bold">12</div>
              <div className="flex items-center mt-2 text-sm">
                <Lightbulb className="h-4 w-4 mr-1" />
                <span>New recommendations</span>
                <span className="ml-auto">→</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <PlatformCards />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <GrowthChart />
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
            <GrowthMetricsChart />
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <EngagementChart />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <ContentDistributionChart />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 
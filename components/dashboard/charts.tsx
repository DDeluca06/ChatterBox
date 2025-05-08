"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface GrowthData {
  date: string;
  followers: number;
  engagement: number;
}

interface PlatformStats {
  platform: string;
  followers: number;
  engagement: string;
  growth: number;
}

interface ChartProps {
  data: GrowthData[] | PlatformStats[];
}

const COLORS = {
  INSTAGRAM: "#E1306C",
  TWITTER: "#1DA1F2",
  FACEBOOK: "#4267B2",
  LINKEDIN: "#0077B5",
};

export function GrowthChart({ data }: ChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Growth Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="followers"
              stroke="#8884d8"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#82ca9d"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function GrowthMetricsChart({ data }: ChartProps) {
  const growthData = data as GrowthData[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Growth Metrics</CardTitle>
        <CardDescription>Detailed growth analytics across platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={growthData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="followers" name="Followers" fill={COLORS.INSTAGRAM} />
              <Bar dataKey="engagement" name="Engagement" fill={COLORS.TWITTER} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function EngagementChart({ data }: ChartProps) {
  const platformStats = data as PlatformStats[];
  const engagementData = platformStats.map(stat => ({
    name: stat.platform,
    value: parseFloat(stat.engagement),
    color: COLORS[stat.platform as keyof typeof COLORS],
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Rate</CardTitle>
        <CardDescription>Average engagement rate by platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function ContentDistributionChart() {
  const contentData = [
    { name: "Images", value: 45, color: "#FF6384" },
    { name: "Videos", value: 30, color: "#36A2EB" },
    { name: "Text", value: 15, color: "#FFCE56" },
    { name: "Links", value: 10, color: "#4BC0C0" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Distribution</CardTitle>
        <CardDescription>Content types across all platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {contentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 
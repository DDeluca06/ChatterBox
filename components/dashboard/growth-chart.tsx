"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface GrowthChartProps {
  connections: Array<{
    platform: string;
    metadata?: {
      followers?: number;
      engagement?: string;
      growth?: string;
    };
  }>;
}

function getPlatformColor(platform: string): string {
  const colors = {
    INSTAGRAM: "#E1306C",
    TWITTER: "#1DA1F2",
    FACEBOOK: "#4267B2",
    LINKEDIN: "#0077B5",
  };
  return colors[platform as keyof typeof colors] || "#000000";
}

function generateGrowthData(connections: GrowthChartProps["connections"]) {
  // Generate last 7 days of data
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayData: any = {
      name: date.toLocaleDateString("en-US", { weekday: "short" }),
    };

    connections.forEach((connection) => {
      const baseFollowers = connection.metadata?.followers || 0;
      const growth = parseFloat(connection.metadata?.growth || "0") / 100;
      const dailyGrowth = growth / 30; // Assuming growth is monthly
      const followers = Math.round(
        baseFollowers * (1 - dailyGrowth * (6 - i))
      );
      dayData[connection.platform.toLowerCase()] = followers;
    });

    data.push(dayData);
  }

  return data;
}

export function GrowthChart({ connections }: GrowthChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={generateGrowthData(connections)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {connections.map((connection) => (
          <Line
            key={connection.platform}
            type="monotone"
            dataKey={connection.platform.toLowerCase()}
            name={connection.platform}
            stroke={getPlatformColor(connection.platform)}
            activeDot={{ r: 8 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
} 
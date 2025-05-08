"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface EngagementChartProps {
  data: {
    type: string;
    count: number;
    rate: number;
  }[];
  platform: string;
}

export function EngagementChart({ data, platform }: EngagementChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar
                yAxisId="left"
                dataKey="count"
                fill="#8884d8"
                name="Count"
              />
              <Bar
                yAxisId="right"
                dataKey="rate"
                fill="#82ca9d"
                name="Rate"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 
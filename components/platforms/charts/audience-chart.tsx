"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AudienceChartProps {
  data: {
    category: string;
    percentage: number;
    change: number;
  }[];
  platform: string;
}

export function AudienceChart({ data, platform }: AudienceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audience Demographics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="percentage"
                fill="#8884d8"
                name="Percentage"
              />
              <Bar
                dataKey="change"
                fill="#82ca9d"
                name="Change"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
} 
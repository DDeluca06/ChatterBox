"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface OverviewChartProps {
  data: {
    date: string;
    followers: number;
    engagement: number;
  }[];
  platform: string;
}

const DATE_RANGES = [
  { label: "Last 7 days", value: "7" },
  { label: "Last 30 days", value: "30" },
  { label: "Last 90 days", value: "90" },
  { label: "All time", value: "all" },
] as const;

export function OverviewChart({ data }: OverviewChartProps) {
  const [selectedRange, setSelectedRange] = useState<string>("7");

  // Debug: log incoming data
  console.log("[OverviewChart] data:", data);
  if (data.length > 0) {
    console.log("[OverviewChart] first item:", data[0]);
  }

  // Filter data based on selected range
  const filteredData = data
    .filter((item) => {
      if (selectedRange === "all") return true;
      
      // Parse the date string (format: "MMM DD")
      const [month, day] = item.date.split(" ");
      const currentYear = new Date().getFullYear();
      const itemDate = new Date(`${month} ${day}, ${currentYear}`);
      
      // Calculate cutoff date
      const now = new Date();
      const cutoffDate = new Date(now);
      cutoffDate.setDate(now.getDate() - parseInt(selectedRange));
      
      return itemDate >= cutoffDate;
    })
    .sort((a, b) => {
      // Sort by date
      const [monthA, dayA] = a.date.split(" ");
      const [monthB, dayB] = b.date.split(" ");
      const currentYear = new Date().getFullYear();
      
      const dateA = new Date(`${monthA} ${dayA}, ${currentYear}`);
      const dateB = new Date(`${monthB} ${dayB}, ${currentYear}`);
      
      return dateA.getTime() - dateB.getTime();
    });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Growth Overview</CardTitle>
        <Select
          value={selectedRange}
          onValueChange={setSelectedRange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGES.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          {filteredData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No data available for this range.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => value}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  labelFormatter={(value) => value}
                  formatter={(value: number, name: string) => [
                    name === "Engagement Rate" ? `${value.toFixed(1)}%` : value.toLocaleString(),
                    name
                  ]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="followers"
                  stroke="#8884d8"
                  name="Followers"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="engagement"
                  stroke="#82ca9d"
                  name="Engagement Rate"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 
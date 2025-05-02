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

// Sample data for charts
const platformGrowthData = [
  { name: "Jan", instagram: 28500, twitter: 16200, facebook: 41000, linkedin: 10500 },
  { name: "Feb", instagram: 29200, twitter: 16800, facebook: 42100, linkedin: 10800 },
  { name: "Mar", instagram: 30100, twitter: 17200, facebook: 43000, linkedin: 11100 },
  { name: "Apr", instagram: 31000, twitter: 17500, facebook: 43800, linkedin: 11400 },
  { name: "May", instagram: 31800, twitter: 17900, facebook: 44500, linkedin: 11700 },
  { name: "Jun", instagram: 32451, twitter: 18742, facebook: 45328, linkedin: 12184 },
];

const engagementData = [
  { name: "Instagram", value: 3.8, color: "#E1306C" },
  { name: "Twitter", value: 2.1, color: "#1DA1F2" },
  { name: "Facebook", value: 1.9, color: "#4267B2" },
  { name: "LinkedIn", value: 4.2, color: "#0077B5" },
];

const contentTypeData = [
  { name: "Images", value: 45, color: "#FF6384" },
  { name: "Videos", value: 30, color: "#36A2EB" },
  { name: "Text", value: 15, color: "#FFCE56" },
  { name: "Links", value: 10, color: "#4BC0C0" },
];

export function GrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Growth</CardTitle>
        <CardDescription>Follower growth across all platforms</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={platformGrowthData}
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
              <Line
                type="monotone"
                dataKey="instagram"
                name="Instagram"
                stroke="#E1306C"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="twitter" name="Twitter" stroke="#1DA1F2" />
              <Line type="monotone" dataKey="facebook" name="Facebook" stroke="#4267B2" />
              <Line type="monotone" dataKey="linkedin" name="LinkedIn" stroke="#0077B5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function GrowthMetricsChart() {
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
              data={platformGrowthData}
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
              <Bar dataKey="instagram" name="Instagram" fill="#E1306C" />
              <Bar dataKey="twitter" name="Twitter" fill="#1DA1F2" />
              <Bar dataKey="facebook" name="Facebook" fill="#4267B2" />
              <Bar dataKey="linkedin" name="LinkedIn" fill="#0077B5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function EngagementChart() {
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
                data={contentTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value}%)`}
              >
                {contentTypeData.map((entry, index) => (
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
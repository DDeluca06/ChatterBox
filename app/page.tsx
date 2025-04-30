"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "recharts"
import { Users, MessageSquare, TrendingUp, Lightbulb } from "lucide-react"
import { socialIcons } from "../components/ui/social-icons"
import Link from "next/link"

// Sample data for charts
const platformGrowthData = [
  { name: "Jan", instagram: 28500, twitter: 16200, facebook: 41000, linkedin: 10500 },
  { name: "Feb", instagram: 29200, twitter: 16800, facebook: 42100, linkedin: 10800 },
  { name: "Mar", instagram: 30100, twitter: 17200, facebook: 43000, linkedin: 11100 },
  { name: "Apr", instagram: 31000, twitter: 17500, facebook: 43800, linkedin: 11400 },
  { name: "May", instagram: 31800, twitter: 17900, facebook: 44500, linkedin: 11700 },
  { name: "Jun", instagram: 32451, twitter: 18742, facebook: 45328, linkedin: 12184 },
]

const engagementData = [
  { name: "Instagram", value: 3.8, color: "#E1306C" },
  { name: "Twitter", value: 2.1, color: "#1DA1F2" },
  { name: "Facebook", value: 1.9, color: "#4267B2" },
  { name: "LinkedIn", value: 4.2, color: "#0077B5" },
]

const contentTypeData = [
  { name: "Images", value: 45, color: "#FF6384" },
  { name: "Videos", value: 30, color: "#36A2EB" },
  { name: "Text", value: 15, color: "#FFCE56" },
  { name: "Links", value: 10, color: "#4BC0C0" },
]

// Update platformCards to use the custom icons
const platformCards = [
  {
    name: "Instagram",
    icon: socialIcons.Instagram,
    color: "bg-gradient-to-r from-pink-500 to-purple-500",
    followers: "32.4K",
    engagement: "3.8%",
    growth: "+124",
    href: "/platforms/instagram",
  },
  {
    name: "Twitter",
    icon: socialIcons.Twitter,
    color: "bg-[#1DA1F2]",
    followers: "18.7K",
    engagement: "2.1%",
    growth: "+87",
    href: "/platforms/twitter",
  },
  {
    name: "Facebook",
    icon: socialIcons.Facebook,
    color: "bg-[#4267B2]",
    followers: "45.3K",
    engagement: "1.9%",
    growth: "+156",
    href: "/platforms/facebook",
  },
  {
    name: "LinkedIn",
    icon: socialIcons.LinkedIn,
    color: "bg-[#0077B5]",
    followers: "12.1K",
    engagement: "4.2%",
    growth: "+42",
    href: "/platforms/linkedin",
  },
]

export default function Dashboard() {
  return (
    <div className="ml-64 min-h-screen bg-background p-6 md:ml-64">
      <div className="mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Status:</span>
            <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Active</span>
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformCards.map((platform) => (
            <Link href={platform.href} key={platform.name} className="block transition-transform hover:scale-105">
              <Card className="h-full border-none overflow-hidden">
                <div className={`${platform.color} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <platform.icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{platform.name}</span>
                  </div>
                  <div className="mt-4 text-3xl font-bold">{platform.followers}</div>
                  <div className="text-sm opacity-90">Followers</div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-500">Engagement</div>
                      <div className="font-medium">{platform.engagement}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Growth</div>
                      <div className="font-medium text-green-600">{platform.growth}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="growth" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

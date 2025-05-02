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
import { Button } from "@/components/ui/button"

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

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">ChatterBox</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Manage Your Social Media Presence
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Connect your social media accounts and manage your content across platforms with ease.
            </p>
            <div className="space-x-4">
              <Link href="/auth/signup">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Everything you need to manage your social media presence in one place.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Multi-Platform Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect and manage your Instagram, Twitter, Facebook, and LinkedIn accounts.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Content Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Schedule and manage your posts across all your social media platforms.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <div className="space-y-2">
                  <h3 className="font-bold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your performance and engagement across all platforms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, Tailwind CSS, and Shadcn UI.
          </p>
        </div>
      </footer>
    </div>
  )
}

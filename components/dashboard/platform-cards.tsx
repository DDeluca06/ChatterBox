"use client";

import { Card, CardContent } from "@/components/ui/card";
import { socialIcons } from "@/components/ui/social-icons";
import Link from "next/link";

interface PlatformStats {
  platform: string;
  followers: number;
  engagement: string;
  growth: number;
}

interface PlatformCardsProps {
  platformStats: PlatformStats[];
}

const platformCards = [
  {
    name: "Instagram",
    icon: socialIcons.Instagram,
    color: "bg-gradient-to-r from-pink-500 to-purple-500",
    href: "/platforms/instagram",
  },
  {
    name: "Twitter",
    icon: socialIcons.Twitter,
    color: "bg-[#1DA1F2]",
    href: "/platforms/twitter",
  },
  {
    name: "Facebook",
    icon: socialIcons.Facebook,
    color: "bg-[#4267B2]",
    href: "/platforms/facebook",
  },
  {
    name: "LinkedIn",
    icon: socialIcons.LinkedIn,
    color: "bg-[#0077B5]",
    href: "/platforms/linkedin",
  },
];

export function PlatformCards({ platformStats }: PlatformCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {platformCards.map((platform, index) => {
        const stats = platformStats[index] || { followers: 0, engagement: "0", growth: 0 };
        return (
          <Link href={platform.href} key={platform.name} className="block transition-transform hover:scale-105">
            <Card className="h-full border-none overflow-hidden">
              <div className={`${platform.color} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <platform.icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{platform.name}</span>
                </div>
                <div className="mt-4 text-3xl font-bold">
                  {stats.followers.toLocaleString()}
                </div>
                <div className="text-sm opacity-90">Followers</div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Engagement</div>
                    <div className="font-medium">{stats.engagement}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Growth</div>
                    <div className="font-medium text-green-600">+{stats.growth}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
} 
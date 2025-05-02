"use client";

import { Card, CardContent } from "@/components/ui/card";
import { socialIcons } from "@/components/ui/social-icons";
import Link from "next/link";

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
];

export function PlatformCards() {
  return (
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
  );
} 
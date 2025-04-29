"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Settings,
  Home,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Calendar,
  Lightbulb,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Users,
  MessageSquare,
  Eye,
  ThumbsUp,
  Clock,
  Hash,
  TrendingUp,
  Layers,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  badge?: string | number
  badgeColor?: string
  onClick?: () => void
  children?: React.ReactNode
}

function NavItem({
  icon: Icon,
  label,
  href,
  isActive,
  badge,
  badgeColor = "bg-blue-600",
  onClick,
  children,
}: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
          isActive ? "bg-slate-700 text-white font-medium" : "text-slate-300 hover:bg-slate-700 hover:text-white",
        )}
        onClick={onClick}
      >
        <Icon className="h-4 w-4" />
        <span>{label}</span>
        {badge && (
          <span
            className={cn(
              "ml-auto flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium",
              badgeColor,
            )}
          >
            {badge}
          </span>
        )}
        {children}
      </Link>
    </li>
  )
}

interface NavGroupProps {
  title: string
  children: React.ReactNode
  collapsible?: boolean
}

function NavGroup({ title, children, collapsible = false }: NavGroupProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="mb-2">
      <div className="flex items-center px-3 py-2">
        {collapsible ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between text-xs font-semibold uppercase text-slate-400"
          >
            {title}
            <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-90" : "")} />
          </button>
        ) : (
          <h3 className="text-xs font-semibold uppercase text-slate-400">{title}</h3>
        )}
      </div>
      {(!collapsible || isOpen) && <ul className="space-y-1 px-1">{children}</ul>}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Platform stats
  const platformStats = {
    instagram: { followers: "32K", engagement: "3.8%" },
    twitter: { followers: "18K", engagement: "2.1%" },
    facebook: { followers: "45K", engagement: "1.9%" },
    linkedin: { followers: "12K", engagement: "4.2%" },
  }

  // System stats
  const systemStats = [
    { label: "Active", value: true, color: "bg-emerald-500" },
    { label: "API Usage", value: "24%" },
    { label: "Cache Hit Rate", value: "76%" },
    { label: "API Calls", value: "29/min" },
  ]

  // Handle window resize for mobile sidebar
  useEffect(() => {
    setMounted(true)

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Mobile sidebar toggle
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button variant="ghost" size="icon" className="fixed left-4 top-4 z-50 md:hidden" onClick={toggleMobileSidebar}>
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Logo and Brand */}
        <div className="flex h-16 items-center border-b border-slate-700 px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">SocialHub</span>
          </div>
        </div>

        {/* Status Section */}
        <div className="border-b border-slate-700 px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">Acme Inc</p>
                <p className="text-xs text-slate-400">Enterprise Plan</p>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {systemStats.map((stat, index) => (
              <div key={index} className="flex items-center text-xs text-slate-300">
                {typeof stat.value === "boolean" ? (
                  <div className={cn("mr-2 h-2 w-2 rounded-full", stat.color)} />
                ) : null}
                <span className="mr-2 font-medium">{stat.label}:</span>
                <span>{typeof stat.value === "boolean" ? "Online" : stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-13rem)]">
          <div className="px-2 py-2">
            <NavGroup title="Main">
              <NavItem
                icon={Home}
                label="Overview"
                href="/"
                isActive={pathname === "/"}
                badge={9}
                badgeColor="bg-blue-600"
              />
              <NavItem icon={BarChart3} label="Analytics" href="/analytics" isActive={pathname === "/analytics"} />
              <NavItem
                icon={Lightbulb}
                label="Content Optimization"
                href="/content-optimization"
                isActive={pathname === "/content-optimization"}
                badge="AI"
                badgeColor="bg-purple-600"
              />
              <NavItem
                icon={Calendar}
                label="Content Calendar"
                href="/content-calendar"
                isActive={pathname === "/content-calendar"}
              />
            </NavGroup>

            <NavGroup title="Platforms">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <NavItem
                        icon={Instagram}
                        label="Instagram"
                        href="/platforms/instagram"
                        isActive={pathname === "/platforms/instagram"}
                        badge={platformStats.instagram.followers}
                        badgeColor="bg-pink-600"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="text-xs">
                      <p>Followers: {platformStats.instagram.followers}</p>
                      <p>Engagement: {platformStats.instagram.engagement}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <NavItem
                        icon={Twitter}
                        label="Twitter"
                        href="/platforms/twitter"
                        isActive={pathname === "/platforms/twitter"}
                        badge={platformStats.twitter.followers}
                        badgeColor="bg-blue-500"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="text-xs">
                      <p>Followers: {platformStats.twitter.followers}</p>
                      <p>Engagement: {platformStats.twitter.engagement}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <NavItem
                        icon={Facebook}
                        label="Facebook"
                        href="/platforms/facebook"
                        isActive={pathname === "/platforms/facebook"}
                        badge={platformStats.facebook.followers}
                        badgeColor="bg-blue-700"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="text-xs">
                      <p>Followers: {platformStats.facebook.followers}</p>
                      <p>Engagement: {platformStats.facebook.engagement}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <NavItem
                        icon={Linkedin}
                        label="LinkedIn"
                        href="/platforms/linkedin"
                        isActive={pathname === "/platforms/linkedin"}
                        badge={platformStats.linkedin.followers}
                        badgeColor="bg-blue-800"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="text-xs">
                      <p>Followers: {platformStats.linkedin.followers}</p>
                      <p>Engagement: {platformStats.linkedin.engagement}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </NavGroup>

            <NavGroup title="Insights" collapsible>
              <NavItem
                icon={Users}
                label="Audience"
                href="/insights/audience"
                isActive={pathname === "/insights/audience"}
              />
              <NavItem
                icon={MessageSquare}
                label="Engagement"
                href="/insights/engagement"
                isActive={pathname === "/insights/engagement"}
              />
              <NavItem icon={Eye} label="Reach" href="/insights/reach" isActive={pathname === "/insights/reach"} />
              <NavItem
                icon={ThumbsUp}
                label="Performance"
                href="/insights/performance"
                isActive={pathname === "/insights/performance"}
              />
            </NavGroup>

            <NavGroup title="AI Tools" collapsible>
              <NavItem
                icon={Lightbulb}
                label="Content Ideas"
                href="/ai/content-ideas"
                isActive={pathname === "/ai/content-ideas"}
                badge="New"
                badgeColor="bg-purple-600"
              />
              <NavItem icon={Clock} label="Best Times" href="/ai/best-times" isActive={pathname === "/ai/best-times"} />
              <NavItem
                icon={Hash}
                label="Hashtag Optimizer"
                href="/ai/hashtags"
                isActive={pathname === "/ai/hashtags"}
                badge={164}
                badgeColor="bg-emerald-600"
              />
              <NavItem
                icon={TrendingUp}
                label="Trend Predictor"
                href="/ai/trends"
                isActive={pathname === "/ai/trends"}
              />
            </NavGroup>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t border-slate-700 bg-slate-800 px-2 py-2">
          <ul className="space-y-1">
            <NavItem icon={Settings} label="Settings" href="/settings" isActive={pathname === "/settings"} />
            <NavItem icon={HelpCircle} label="Help & Support" href="/help" isActive={pathname === "/help"} />
            <NavItem icon={LogOut} label="Logout" href="/logout" />
          </ul>
        </div>
      </aside>
    </>
  )
}

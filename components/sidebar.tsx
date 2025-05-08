"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { cn } from "@/lib/utils"
import {
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
  Layers,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPlatformStats } from "@/lib/actions/platforms"

interface NavItemProps {
  icon: React.ElementType
  label: string
  href: string
  isActive?: boolean
  badge?: string | number
  badgeColor?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
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

function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Call our custom signout endpoint first
      const response = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to sign out")
      }

      // Then sign out from NextAuth
      await signOut({ 
        redirect: false,
        callbackUrl: "/"
      })

      // Force a hard navigation to the home page
      window.location.href = "/"
    } catch (error) {
      console.error("Error during logout:", error)
      setIsLoading(false)
    }
  }

  return (
    <li>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <LogOut className="h-4 w-4" />
        <span>{isLoading ? "Signing out..." : "Logout"}</span>
      </button>
    </li>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { data: session } = useSession()
  const [platformStats, setPlatformStats] = useState({
    instagram: { followers: "0", engagement: "0%" },
    twitter: { followers: "0", engagement: "0%" },
    facebook: { followers: "0", engagement: "0%" },
    linkedin: { followers: "0", engagement: "0%" },
  })

  // System stats
  const systemStats = [
    { label: "Active", value: true, color: "bg-emerald-500" }
  ]

  // Fetch platform stats
  useEffect(() => {
    async function fetchStats() {
      try {
        const stats = await getPlatformStats()
        if (stats) {
          const formattedStats = {
            instagram: {
              followers: stats.instagram?.followers?.toLocaleString() || "0",
              engagement: `${stats.instagram?.engagementRate?.toFixed(1) || "0"}%`,
            },
            twitter: {
              followers: stats.twitter?.followers?.toLocaleString() || "0",
              engagement: `${stats.twitter?.engagementRate?.toFixed(1) || "0"}%`,
            },
            facebook: {
              followers: stats.facebook?.followers?.toLocaleString() || "0",
              engagement: `${stats.facebook?.engagementRate?.toFixed(1) || "0"}%`,
            },
            linkedin: {
              followers: stats.linkedin?.followers?.toLocaleString() || "0",
              engagement: `${stats.linkedin?.engagementRate?.toFixed(1) || "0"}%`,
            },
          }
          setPlatformStats(formattedStats)
        }
      } catch (error) {
        console.error("Error fetching platform stats:", error)
      }
    }

    if (isMounted) {
      fetchStats()
    }
  }, [isMounted])

  // Handle window resize for mobile sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileOpen(false)
      }
    }

    // Set mounted state immediately
    setIsMounted(true)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Mobile sidebar toggle
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen)
  }

  // Don't render anything until mounted
  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="fixed left-4 top-4 z-50 md:hidden" 
        onClick={toggleMobileSidebar}
        aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo and Brand */}
        <div className="flex h-16 items-center border-b border-slate-700 px-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">SocialHub</span>
          </Link>
        </div>

        {/* Status Section */}
        <div className="border-b border-slate-700 px-4 py-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session?.user?.image || "/placeholder-user.jpg"} alt={session?.user?.name || "User"} />
                <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{session?.user?.name || "User"}</p>
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
                href="/dashboard"
                isActive={pathname === "/dashboard"}
              />
              <NavItem
                icon={Lightbulb}
                label="Content Optimization"
                href="/content-optimization"
                isActive={pathname === "/content-optimization"}
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

          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t border-slate-700 bg-slate-800 px-2 py-2">
          <ul className="space-y-1">
            <NavItem icon={Settings} label="Settings" href="/settings" isActive={pathname === "/settings"} />
            <NavItem icon={HelpCircle} label="Help & Support" href="/help" isActive={pathname === "/help"} />
            <LogoutButton />
          </ul>
        </div>
      </aside>
    </>
  )
}

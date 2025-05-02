"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Instagram, Twitter, Facebook, Linkedin, Moon, Sun, Monitor } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSession } from "next-auth/react"

interface SocialConnection {
  platform: string
  icon: any
  connected: boolean
  username: string | null
  lastSync: string | null
}

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState(true)
  const [emailUpdates, setEmailUpdates] = useState(false)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const [socialConnections, setSocialConnections] = useState<SocialConnection[]>([
    {
      platform: "INSTAGRAM",
      icon: Instagram,
      connected: false,
      username: null,
      lastSync: null,
    },
    {
      platform: "TWITTER",
      icon: Twitter,
      connected: false,
      username: null,
      lastSync: null,
    },
    {
      platform: "FACEBOOK",
      icon: Facebook,
      connected: false,
      username: null,
      lastSync: null,
    },
    {
      platform: "LINKEDIN",
      icon: Linkedin,
      connected: false,
      username: null,
      lastSync: null,
    },
  ])

  const handleConnect = async (platform: string) => {
    try {
      setIsLoading(platform)
      
      // In a real implementation, this would redirect to the OAuth flow
      // For now, we'll simulate a successful connection
      const response = await fetch("/api/social/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platform,
          code: "dummy_code", // In real implementation, this would come from OAuth callback
        }),
      })

      if (!response.ok) throw new Error("Failed to connect")

      const data = await response.json()
      
      setSocialConnections(prev =>
        prev.map(conn =>
          conn.platform === platform
            ? {
                ...conn,
                connected: true,
                username: data.username,
                lastSync: new Date().toISOString(),
              }
            : conn
        )
      )

      toast({
        title: "Connected successfully",
        description: `Successfully connected to ${platform.toLowerCase()}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to connect to ${platform.toLowerCase()}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  const handleDisconnect = async (platform: string) => {
    try {
      setIsLoading(platform)
      
      const response = await fetch("/api/social/disconnect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform }),
      })

      if (!response.ok) throw new Error("Failed to disconnect")

      setSocialConnections(prev =>
        prev.map(conn =>
          conn.platform === platform
            ? {
                ...conn,
                connected: false,
                username: null,
                lastSync: null,
              }
            : conn
        )
      )

      toast({
        title: "Disconnected successfully",
        description: `Successfully disconnected from ${platform.toLowerCase()}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to disconnect from ${platform.toLowerCase()}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(null)
    }
  }

  // Handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="container max-w-5xl py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="connections">Social Connections</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how SocialHub looks on your device.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred theme.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={mounted && theme === "light" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={mounted && theme === "dark" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={mounted && theme === "system" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Connections</CardTitle>
              <CardDescription>Manage your connected social media accounts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialConnections.map((connection) => (
                <div key={connection.platform} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <connection.icon className="h-5 w-5" />
                      <div>
                        <p className="font-medium">{connection.platform}</p>
                        {connection.connected ? (
                          <p className="text-sm text-muted-foreground">
                            {connection.username} • Last synced {connection.lastSync}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant={connection.connected ? "outline" : "default"}
                      onClick={() =>
                        connection.connected
                          ? handleDisconnect(connection.platform)
                          : handleConnect(connection.platform)
                      }
                      disabled={isLoading === connection.platform}
                    >
                      {isLoading === connection.platform
                        ? "Loading..."
                        : connection.connected
                        ? "Disconnect"
                        : "Connect"}
                    </Button>
                  </div>
                  <Separator />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about your social media activity.</p>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your account.</p>
                </div>
                <Switch
                  checked={emailUpdates}
                  onCheckedChange={setEmailUpdates}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 
import { Metadata } from "next"
import SettingsPage from "@/components/settings/settings-page"

export const metadata: Metadata = {
  title: "Settings | SocialHub",
  description: "Manage your account settings and preferences",
}

export default function Settings() {
  return <SettingsPage />
} 
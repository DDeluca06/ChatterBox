import { Sidebar } from "@/components/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Calendar | SocialHub",
  description: "Plan and schedule your social media content with the Content Calendar.",
};

export default function ContentCalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto ml-0 md:ml-64">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  );
} 
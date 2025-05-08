import { SocialIcon } from "@/components/ui/social-icons";
import { PlatformStats } from "@/components/platforms/platform-stats";
import { getPlatformStatsByName, getPlatformOverviewStats, getPlatformEngagementStats, getPlatformContentStats, getPlatformAudienceStats } from "@/lib/actions/platforms";

export default async function LinkedInPage() {
  const stats = await getPlatformStatsByName("linkedin");
  const overviewData = await getPlatformOverviewStats("linkedin");
  const engagementData = await getPlatformEngagementStats("linkedin");
  const contentData = await getPlatformContentStats("linkedin");
  const audienceData = await getPlatformAudienceStats("linkedin");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">LinkedIn</h2>
          <p className="text-sm text-muted-foreground">
            Track your LinkedIn performance and analytics
          </p>
        </div>
        <SocialIcon platform="linkedin" className="h-8 w-8" />
      </div>
      <PlatformStats 
        stats={stats} 
        platform="linkedin"
        overviewData={overviewData}
        engagementData={engagementData}
        contentData={contentData}
        audienceData={audienceData}
      />
    </div>
  );
} 
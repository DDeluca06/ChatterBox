import { SocialIcon } from "@/components/ui/social-icons";
import { PlatformStats } from "@/components/platforms/platform-stats";
import { getPlatformStatsByName, getPlatformOverviewStats, getPlatformEngagementStats, getPlatformContentStats, getPlatformAudienceStats } from "@/lib/actions/platforms";

export default async function InstagramPage() {
  const stats = await getPlatformStatsByName("instagram");
  const overviewData = await getPlatformOverviewStats("instagram");
  const engagementData = await getPlatformEngagementStats("instagram");
  const contentData = await getPlatformContentStats("instagram");
  const audienceData = await getPlatformAudienceStats("instagram");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Instagram</h2>
          <p className="text-sm text-muted-foreground">
            Track your Instagram performance and analytics
          </p>
        </div>
        <SocialIcon platform="instagram" className="h-8 w-8" />
      </div>
      <PlatformStats 
        stats={stats} 
        platform="instagram"
        overviewData={overviewData}
        engagementData={engagementData}
        contentData={contentData}
        audienceData={audienceData}
      />
    </div>
  );
} 
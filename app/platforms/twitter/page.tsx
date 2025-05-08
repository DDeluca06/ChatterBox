import { SocialIcon } from "@/components/ui/social-icons";
import { PlatformStats } from "@/components/platforms/platform-stats";
import { getPlatformStatsByName, getPlatformOverviewStats, getPlatformEngagementStats, getPlatformContentStats, getPlatformAudienceStats } from "@/lib/actions/platforms";

export default async function TwitterPage() {
  const stats = await getPlatformStatsByName("twitter");
  const overviewData = await getPlatformOverviewStats("twitter");
  const engagementData = await getPlatformEngagementStats("twitter");
  const contentData = await getPlatformContentStats("twitter");
  const audienceData = await getPlatformAudienceStats("twitter");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Twitter</h2>
          <p className="text-sm text-muted-foreground">
            Track your Twitter performance and analytics
          </p>
        </div>
        <SocialIcon platform="twitter" className="h-8 w-8" />
      </div>
      <PlatformStats 
        stats={stats} 
        platform="twitter"
        overviewData={overviewData}
        engagementData={engagementData}
        contentData={contentData}
        audienceData={audienceData}
      />
    </div>
  );
} 
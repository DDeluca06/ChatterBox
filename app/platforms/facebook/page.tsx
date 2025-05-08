import { SocialIcon } from "@/components/ui/social-icons";
import { PlatformStats } from "@/components/platforms/platform-stats";
import { getPlatformStatsByName, getPlatformOverviewStats, getPlatformEngagementStats, getPlatformContentStats, getPlatformAudienceStats } from "@/lib/actions/platforms";

export default async function FacebookPage() {
  const stats = await getPlatformStatsByName("facebook");
  const overviewData = await getPlatformOverviewStats("facebook");
  const engagementData = await getPlatformEngagementStats("facebook");
  const contentData = await getPlatformContentStats("facebook");
  const audienceData = await getPlatformAudienceStats("facebook");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Facebook</h2>
          <p className="text-sm text-muted-foreground">
            Track your Facebook performance and analytics
          </p>
        </div>
        <SocialIcon platform="facebook" className="h-8 w-8" />
      </div>
      <PlatformStats 
        stats={stats} 
        platform="facebook"
        overviewData={overviewData}
        engagementData={engagementData}
        contentData={contentData}
        audienceData={audienceData}
      />
    </div>
  );
} 
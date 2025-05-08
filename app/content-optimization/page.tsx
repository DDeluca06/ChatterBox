import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Optimization | SocialHub",
  description: "AI-powered content optimization tools for your social media posts.",
};

export default function ContentOptimizationPage() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Content Optimization</h1>
      <p className="text-muted-foreground mb-6">
        Use AI-powered tools to optimize your social media content for better reach and engagement. More features coming soon!
      </p>
    </div>
  );
} 
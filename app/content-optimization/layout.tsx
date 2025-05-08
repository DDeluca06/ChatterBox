import { Sidebar } from "@/components/sidebar";

export default function ContentOptimizationLayout({
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
"use client";
import React, { useState, useEffect } from "react";
import { FileText, FolderKanban, MessageSquare, Clock, ArrowUpRight, Activity } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import OverviewChart from "@/components/dashboard/OverviewChart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BoneyardSkeleton, DashboardBlogsSkeleton } from "@/components/common/Skeletons";

interface AnalyticsData {
  stats: {
    blogsCount: number;
    projectsCount: number;
    featuredProjectsCount: number;
    messagesCount: number;
    timelinesCount: number;
  };
  chartData: { name: string; total: number }[];
  recentActivity: {
    id: string;
    type: "Blog" | "Project" | "Message";
    title: string;
    subtitle: string;
    created_at: string;
  }[];
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        toast.error("Failed to load real analytics data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching analytics");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const statsList = [
    {
      title: "Blogs",
      value: data?.stats.blogsCount ?? 0,
      change: "Published articles saved in database",
      icon: FileText,
      href: "/dashboard/blogs",
    },
    {
      title: "Projects",
      value: data?.stats.projectsCount ?? 0,
      change: `${data?.stats.featuredProjectsCount ?? 0} featured portfolio projects`,
      icon: FolderKanban,
      href: "/dashboard/projects",
    },
    {
      title: "Messages",
      value: data?.stats.messagesCount ?? 0,
      change: "Direct queries from portfolio contact form",
      icon: MessageSquare,
      href: "/dashboard/messages",
    },
    {
      title: "Timelines",
      value: data?.stats.timelinesCount ?? 5,
      change: "Career milestones & achievements",
      icon: Clock,
      href: "/dashboard/timelines",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 font-primary space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            Live database statistics, monthly creation metrics, and recent activity.
          </p>
        </div>
        <Button variant="outline" onClick={fetchAnalytics} disabled={isLoading}>
          <Activity className="mr-2 h-4 w-4 text-primary" /> Refresh Data
        </Button>
      </div>

      <BoneyardSkeleton
        loading={isLoading}
        name="dashboard-analytics"
        fallback={<DashboardBlogsSkeleton count={4} />}
      >
        <div className="space-y-8">
          {/* Stat Cards Grid */}
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {statsList.map((item, i) => (
              <div
                key={i}
                className="cursor-pointer transition-transform hover:-translate-y-1 h-full"
                onClick={() => router.push(item.href)}
              >
                <StatCard
                  active={i === 0}
                  title={item.title}
                  value={item.value}
                  change={item.change}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>

          {/* Chart & Recent Activity Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Real Recharts Monthly Activity Bar Chart */}
            <OverviewChart data={data?.chartData || []} />

            {/* Real Recent Activity Sidebar */}
            <Card className="lg:col-span-1 border-border/50 shadow-sm flex flex-col justify-between">
              <CardHeader className="pb-3">
                <CardTitle className="font-heading text-xl flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" /> Recent Activity
                </CardTitle>
                <CardDescription className="text-xs">
                  Latest content created across your website.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0 overflow-y-auto max-h-[350px]">
                {data?.recentActivity && data.recentActivity.length > 0 ? (
                  data.recentActivity.map((act) => (
                    <div
                      key={act.id}
                      className="p-3 rounded-xl border border-border/40 bg-muted/20 hover:bg-muted/50 transition-colors space-y-1.5 cursor-pointer"
                      onClick={() => {
                        if (act.type === "Blog") router.push("/dashboard/blogs");
                        else if (act.type === "Project") router.push("/dashboard/projects");
                        else if (act.type === "Message") router.push("/dashboard/messages");
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            act.type === "Blog"
                              ? "default"
                              : act.type === "Project"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-[10px] py-0 px-2 font-medium"
                        >
                          {act.type}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          {new Date(act.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold font-heading text-foreground truncate">
                        {act.title}
                      </h4>
                      <p className="text-xs text-muted-foreground truncate font-mono">
                        {act.subtitle}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-muted-foreground text-xs">
                    No recent activity recorded.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </BoneyardSkeleton>
    </div>
  );
}

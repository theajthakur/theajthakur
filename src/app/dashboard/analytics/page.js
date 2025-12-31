import React from "react";
import { FileText, NotebookPen, MessageSquare, Clock } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import OverviewChart from "@/components/dashboard/OverviewChart";

const analyticsData = [
  {
    title: "Blogs",
    value: 10,
    change: "+2 new this month",
    icon: FileText,
  },
  {
    title: "Guestbook",
    value: 150,
    change: "+12 entries",
    icon: NotebookPen,
  },
  {
    title: "Messages",
    value: 2,
    change: "1 unread",
    icon: MessageSquare,
  },
  {
    title: "Timeline",
    value: 5,
    change: "Last updated 2 days ago",
    icon: Clock,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-heading">
          Analytics
        </h2>
        <p className="text-muted-foreground">
          View your dashboard statistics and metrics.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsData.map((item, i) => (
          <StatCard
            key={i}
            active={i === 0}
            title={item.title}
            value={item.value}
            change={item.change}
            icon={item.icon}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <OverviewChart />
      </div>
    </div>
  );
}

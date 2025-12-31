"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  MessageSquare,
  FileText,
  Clock,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Blogs",
    href: "/dashboard/blogs",
    icon: FileText,
  },
  {
    title: "Timelines",
    href: "/dashboard/timelines",
    icon: Clock,
  },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full bg-sidebar">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar transition-transform">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6 text-sidebar-primary" />
            <span className="text-xl tracking-wider font-heading text-sidebar-foreground">
              DASHBOARD
            </span>
          </Link>
        </div>
        <div className="h-[calc(100vh-64px)] overflow-y-auto px-3 py-4">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive &&
                        "bg-sidebar-accent text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8 bg-background text-foreground">
        {children}
      </main>
    </div>
  );
}

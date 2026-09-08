"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  MessageSquare,
  FileText,
  Clock,
  LayoutDashboard,
  FolderKanban,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { title: "Analytics",  href: "/dashboard/analytics",  icon: BarChart2 },
  { title: "Messages",   href: "/dashboard/messages",   icon: MessageSquare },
  { title: "Blogs",      href: "/dashboard/blogs",      icon: FileText },
  { title: "Projects",   href: "/dashboard/projects",   icon: FolderKanban },
  { title: "Timelines",  href: "/dashboard/timelines",  icon: Clock },
];

function NavLinks({ pathname, onNavigate }) {
  return (
    <ul className="space-y-1 font-medium">
      {sidebarItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center rounded-lg px-3 py-2.5 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
              )}
            >
              <Icon className="mr-3 h-5 w-5 shrink-0" />
              <span>{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <div className="flex min-h-screen w-full bg-sidebar">

      {/* ── Desktop sidebar (lg+) ── */}
      <aside className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:z-40 lg:h-screen lg:w-64 flex-col border-r border-sidebar-border bg-sidebar">
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <LayoutDashboard className="h-6 w-6 text-sidebar-primary" />
            <span className="text-xl tracking-wider font-heading text-sidebar-foreground">
              DASHBOARD
            </span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <NavLinks pathname={pathname} onNavigate={() => {}} />
        </div>
      </aside>

      {/* ── Mobile top bar (hidden lg+) ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 border-b border-sidebar-border bg-sidebar">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-5 w-5 text-sidebar-primary" />
          <span className="text-base tracking-wider font-heading text-sidebar-foreground">
            DASHBOARD
          </span>
        </Link>
        <button
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          className="p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer panel */}
          <div className="relative z-10 flex flex-col w-72 max-w-[85vw] h-full bg-sidebar border-r border-sidebar-border shadow-2xl animate-in slide-in-from-left duration-200">
            {/* Drawer header */}
            <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <LayoutDashboard className="h-5 w-5 text-sidebar-primary" />
                <span className="text-base tracking-wider font-heading text-sidebar-foreground">
                  DASHBOARD
                </span>
              </Link>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-3 py-4">
              <NavLinks pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="flex-1 lg:ml-64 min-w-0 bg-background text-foreground px-4 pb-4 pt-[4.5rem] sm:px-6 sm:pb-6 lg:p-8">
        {children}
      </main>

    </div>
  );
}

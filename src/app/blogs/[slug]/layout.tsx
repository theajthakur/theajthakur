import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllBlogs } from "@/lib/dashboard/blogs/BlogsController";
import { getAllProjects } from "@/lib/dashboard/projects/ProjectsController";
import { ArrowLeft } from "lucide-react";
import BlogSidebar from "./BlogSidebar";

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
    const blogsData = await getAllBlogs();
    const projectsData = await getAllProjects();

    const featuredRaw = projectsData.find((p) => p.featured) || projectsData[0];
    const featuredProject = featuredRaw
        ? {
              ...featuredRaw,
              liveLink: featuredRaw.live_link || featuredRaw.link,
              github: featuredRaw.github,
              link: featuredRaw.link || featuredRaw.live_link,
              thumbnail: Array.isArray(featuredRaw.thumbnail) ? featuredRaw.thumbnail : [featuredRaw.thumbnail].filter(Boolean),
              tags: Array.isArray(featuredRaw.tags) ? featuredRaw.tags : [],
          }
        : null;

    return (
        <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 font-primary">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Navigation Breadcrumb / Back Link */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" size="sm" asChild className="text-xs font-medium">
                        <Link href="/blogs">
                            <ArrowLeft className="w-4 h-4 mr-1.5" />
                            Back to all articles
                        </Link>
                    </Button>
                    <Badge variant="outline" className="rounded-full text-[11px] font-medium">
                        Blog Article
                    </Badge>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Main Article Content */}
                    <main className="lg:col-span-8 min-w-0">
                        {children}
                    </main>

                    {/* Right Sidebar — client component handles slug filtering + independent scroll */}
                    <BlogSidebar blogsData={blogsData} featuredProject={featuredProject} />
                </div>
            </div>
        </div>
    );
}

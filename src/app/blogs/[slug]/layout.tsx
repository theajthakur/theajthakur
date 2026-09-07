import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/pages/_components/ProjectCard";
import { getAllBlogs } from "@/lib/dashboard/blogs/BlogsController";
import { getAllProjects } from "@/lib/dashboard/projects/ProjectsController";
import { ArrowLeft, BookOpen, Sparkles, UserCheck } from "lucide-react";

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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Main Article Content */}
                    <main className="lg:col-span-8 min-w-0">
                        {children}
                    </main>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 self-start">
                        {/* Sidebar Widget 1: Other Articles */}
                        <Card className="rounded-2xl p-4 sm:p-5 gap-0">
                            <CardHeader className="p-0 pb-3 mb-3 border-b border-border/40 flex flex-row items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-primary" />
                                    <CardTitle className="text-base font-bold font-heading">
                                        Other Articles
                                    </CardTitle>
                                </div>
                                <Badge variant="secondary" className="rounded-full text-[10px]">
                                    {blogsData.length}
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-0 space-y-3">
                                {blogsData.length > 0 ? (
                                    blogsData.map((b) => (
                                        <Link
                                            key={b.slug}
                                            href={`/blogs/${b.slug}`}
                                            className="block group p-2.5 rounded-xl hover:bg-accent/60 transition-colors"
                                        >
                                            <h4 className="text-xs font-semibold font-heading text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                {b.title}
                                            </h4>
                                            <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                                                {b.description}
                                            </p>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted-foreground py-2 italic">
                                        No other articles yet.
                                    </p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Sidebar Widget 2: Featured Project Showcase */}
                        {featuredProject && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 px-1 text-xs font-bold font-heading uppercase text-primary tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Featured Showcase</span>
                                </div>
                                <ProjectCard project={featuredProject} index={0} />
                            </div>
                        )}

                        {/* Sidebar Widget 3: Author Profile */}
                        <Card className="rounded-2xl p-4 sm:p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold font-heading text-sm">
                                    VT
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold font-heading text-foreground">Vijay Thakur</h4>
                                    <p className="text-xs text-muted-foreground">Full Stack & AI Engineer</p>
                                </div>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                                Building scalable web applications, real-time systems, and AI-driven automation workflows.
                            </p>
                            <Button asChild variant="outline" size="sm" className="w-full rounded-xl text-xs font-semibold">
                                <Link href="/contact">
                                    <UserCheck className="w-3.5 h-3.5 mr-1.5" />
                                    Get in Touch
                                </Link>
                            </Button>
                        </Card>
                    </aside>
                </div>
            </div>
        </div>
    );
}

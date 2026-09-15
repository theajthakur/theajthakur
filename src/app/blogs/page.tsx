import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { getAllBlogs } from "@/lib/dashboard/blogs/BlogsController";

// Always fetch fresh from Supabase — never serve a stale static build cache
export const dynamic = "force-dynamic";

export const metadata = {
    title: "Blog & Articles | Vijay Thakur",
    description: "Articles on web development, AI automation, full-stack architecture, and software design by Vijay Thakur.",
};

function formatDate(dateStr: string) {
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
}

export default async function BlogsPage() {
    const posts = await getAllBlogs();

    return (
        <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6 font-primary">
            <div className="max-w-4xl mx-auto space-y-10">
                {/* Header */}
                <div className="space-y-3 border-b border-border pb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground tracking-tight">
                        Writing & <span className="text-primary">Articles</span>
                    </h1>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
                        Thoughts, guides, and insights on full-stack web development, AI automation, and software engineering.
                    </p>
                </div>

                {/* Blog Posts List */}
                {posts && posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map((post) => {
                            const tags = post.keywords
                                ? post.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
                                : [];

                            return (
                                <Card
                                    key={post.id || post.slug}
                                    className="group rounded-2xl hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden"
                                >
                                    <CardHeader className="gap-2 pb-4">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="w-3.5 h-3.5 text-primary" />
                                            <time dateTime={post.created_at}>{formatDate(post.created_at)}</time>
                                        </div>

                                        <CardTitle className="text-xl sm:text-2xl font-bold font-heading group-hover:text-primary transition-colors cursor-pointer pt-1">
                                            <Link href={`/blogs/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </CardTitle>

                                        <CardDescription className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                            {post.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="pt-3 pb-4 border-t border-border/40 flex flex-wrap items-center justify-between gap-3">
                                        {tags.length > 0 ? (
                                            <div className="flex flex-wrap gap-1.5">
                                                {tags.map((tag: string) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                                                    >
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <div />
                                        )}

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            asChild
                                            className="group/btn text-xs font-semibold hover:text-primary ml-auto"
                                        >
                                            <Link href={`/blogs/${post.slug}`}>
                                                <span>Read Article</span>
                                                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border rounded-2xl border-dashed">
                        <div className="bg-muted/50 p-4 rounded-full">
                            <BookOpen className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xl font-heading font-medium text-foreground">
                                No articles published yet
                            </p>
                            <p className="text-muted-foreground text-sm max-w-sm">
                                Check back soon for new insights, guides, and technical writeups!
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

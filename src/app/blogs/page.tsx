import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock } from "lucide-react";

export const metadata = {
    title: "Blog & Articles | Vijay Thakur",
    description: "Articles on web development, AI automation, full-stack architecture, and software design by Vijay Thakur.",
};

interface BlogPost {
    title: string;
    description: string;
    createdAt: string;
    slug: string;
    readingTime?: string;
    tags?: string[];
}

const posts: BlogPost[] = [
    {
        title: "Building a Modern AI Shopping Agent",
        description:
            "A practical look at building an AI-powered shopping experience with intelligent product discovery and recommendations.",
        createdAt: "2026-09-07",
        slug: "building-modern-ai-shopping-agent",
        readingTime: "5 min read",
        tags: ["AI", "Next.js", "Commerce"],
    },
    {
        title: "Designing Better Developer Experiences",
        description:
            "Exploring simple principles for creating fast, intuitive, and enjoyable tools for developers.",
        createdAt: "2026-09-03",
        slug: "designing-better-developer-experiences",
        readingTime: "4 min read",
        tags: ["DX", "Design", "Frontend"],
    },
    {
        title: "Why Simplicity Matters in UI Design",
        description:
            "How reducing visual noise and focusing on hierarchy can make interfaces easier to understand and use.",
        createdAt: "2026-08-28",
        slug: "why-simplicity-matters-in-ui-design",
        readingTime: "6 min read",
        tags: ["UI/UX", "Design Systems"],
    },
    {
        title: "Getting Started with Next.js",
        description:
            "A concise guide to building modern web applications with Next.js, React, and TypeScript.",
        createdAt: "2026-08-21",
        slug: "getting-started-with-nextjs",
        readingTime: "8 min read",
        tags: ["Next.js", "React", "TypeScript"],
    },
    {
        title: "Building Scalable APIs",
        description:
            "Key considerations for designing reliable, maintainable, and scalable backend APIs.",
        createdAt: "2026-08-15",
        slug: "building-scalable-apis",
        readingTime: "7 min read",
        tags: ["API", "Backend", "Architecture"],
    },
    {
        title: "My Approach to Full-Stack Development",
        description:
            "A breakdown of the tools, architecture, and development practices I use when building full-stack applications.",
        createdAt: "2026-08-08",
        slug: "my-approach-to-full-stack-development",
        readingTime: "5 min read",
        tags: ["Full-Stack", "WebDev", "Career"],
    },
];

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

export default function BlogsPage() {
    return (
        <div className="min-h-screen py-12 sm:py-16 px-4 sm:px-6">
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
                <div className="space-y-6">
                    {posts.map((post) => (
                        <Card
                            key={post.slug}
                            className="group rounded-2xl hover:border-primary/40 hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <CardHeader className="gap-2">
                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(post.createdAt)}
                                        </span>
                                        {post.readingTime && (
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {post.readingTime}
                                            </span>
                                        )}
                                    </div>
                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {post.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <CardTitle className="text-xl sm:text-2xl font-bold font-heading group-hover:text-primary transition-colors cursor-pointer pt-1">
                                    <Link href={`/blogs/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </CardTitle>

                                <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                                    {post.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0 flex justify-end">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className="group/btn text-xs font-semibold hover:text-primary"
                                >
                                    <Link href={`/blogs/${post.slug}`}>
                                        <span>Read Article</span>
                                        <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}

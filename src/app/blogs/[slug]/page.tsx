import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag } from "lucide-react";
import { getBlogByIdOrSlug } from "@/lib/dashboard/blogs/BlogsController";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogByIdOrSlug(slug);
    if (!post) return { title: "Blog Post | Vijay Thakur" };

    return {
        title: `${post.title} | Vijay Thakur`,
        description: post.description,
    };
}

function formatDate(dateStr: string) {
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
}

function getYouTubeEmbedUrl(url: string) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const dbPost = await getBlogByIdOrSlug(slug);

    if (!dbPost) {
        notFound();
    }

    const post = {
        title: dbPost.title,
        description: dbPost.description,
        content: dbPost.content,
        createdAt: dbPost.created_at,
        keywords: dbPost.keywords
            ? dbPost.keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
            : [],
    };

    return (
        <article className="space-y-8">
            {/* Blog Article Header */}
            <Card className="rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary" />
                        <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>5 min read</span>
                    </div>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight leading-tight">
                    {post.title}
                </h1>

                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                    <Tag className="w-3.5 h-3.5 text-muted-foreground self-center mr-1" />
                    {(post.keywords && post.keywords.length > 0
                        ? post.keywords
                        : ["AI", "Next.js", "Engineering", "WebDev"]
                    ).map((tag: string) => (
                        <Badge key={tag} variant="outline" className="rounded-full px-3 py-0.5 text-xs font-medium">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </Card>

            {/* Main Markdown Body */}
            <Card className="rounded-2xl p-6 sm:p-8">
                <div className="prose dark:prose-invert max-w-none space-y-6">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-foreground mt-8 mb-4 border-b border-border/60 pb-3">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-foreground mt-8 mb-4">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-lg sm:text-xl font-heading font-bold text-foreground mt-6 mb-3">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-foreground/90 leading-relaxed text-sm sm:text-base my-4">
                                    {children}
                                </p>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-primary bg-primary/5 px-4 py-3 my-6 rounded-r-xl italic text-foreground/90 font-medium">
                                    {children}
                                </blockquote>
                            ),
                            ul: ({ children }) => (
                                <ul className="list-disc list-inside my-4 space-y-2 text-foreground/90 text-sm sm:text-base">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="list-decimal list-inside my-4 space-y-2 text-foreground/90 text-sm sm:text-base">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            hr: () => <hr className="my-8 border-border/60" />,
                            a: ({ href, children }: any) => {
                                const youtubeEmbedUrl = href ? getYouTubeEmbedUrl(href) : null;
                                if (youtubeEmbedUrl) {
                                    return (
                                        <span className="block my-6 rounded-xl overflow-hidden border border-border/40 aspect-video w-full">
                                            <iframe
                                                src={youtubeEmbedUrl}
                                                title="YouTube video player"
                                                className="w-full h-full border-0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </span>
                                    );
                                }
                                return (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors"
                                    >
                                        {children}
                                    </a>
                                );
                            },
                            table: ({ children }) => (
                                <div className="overflow-x-auto my-6 border border-border/80 rounded-xl shadow-xs">
                                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children }) => (
                                <thead className="bg-muted/80 border-b border-border text-foreground font-semibold">
                                    {children}
                                </thead>
                            ),
                            tbody: ({ children }) => (
                                <tbody className="divide-y divide-border/40 bg-card">{children}</tbody>
                            ),
                            tr: ({ children }) => (
                                <tr className="hover:bg-accent/40 transition-colors">{children}</tr>
                            ),
                            th: ({ children }) => (
                                <th className="px-4 py-3 font-heading font-semibold text-foreground">{children}</th>
                            ),
                            td: ({ children }) => (
                                <td className="px-4 py-3 text-muted-foreground">{children}</td>
                            ),
                            pre: ({ children, ...props }: any) => (
                                <pre
                                    className="my-6 rounded-xl overflow-hidden border border-border/60 bg-slate-950 text-slate-100 p-4 font-mono text-xs sm:text-sm overflow-x-auto"
                                    {...props}
                                >
                                    {children}
                                </pre>
                            ),
                            code: ({ className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || "");
                                const isInline = !match && !String(children).includes("\n");

                                if (isInline) {
                                    return (
                                        <code
                                            className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono font-medium text-foreground border border-border/40"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    );
                                }
                                return (
                                    <code className="whitespace-pre font-mono text-xs sm:text-sm" {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            img: ({ src, alt }: any) => (
                                <span className="inline-block w-full my-6 rounded-xl overflow-hidden border border-border/40 bg-muted/20">
                                    <img src={src} alt={alt || "Blog image"} className="w-full h-auto object-cover" />
                                    {alt && (
                                        <span className="block text-center text-xs text-muted-foreground py-2 bg-muted/30 italic">
                                            {alt}
                                        </span>
                                    )}
                                </span>
                            ),
                            video: ({ children, ...props }: any) => (
                                <span className="block my-6 rounded-xl overflow-hidden border border-border/40 bg-black/90">
                                    <video className="w-full h-auto rounded-xl" controls {...props}>
                                        {children}
                                    </video>
                                </span>
                            ),
                            kbd: ({ children }) => (
                                <kbd className="px-2 py-0.5 text-xs font-mono font-semibold text-foreground bg-muted border border-border/80 rounded shadow-xs">
                                    {children}
                                </kbd>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </Card>
        </article>
    );
}

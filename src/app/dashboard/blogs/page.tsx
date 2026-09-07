"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Trash2,
  FileText,
  Calendar,
  PlusIcon,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Post {
  id: number;
  created_at: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  keywords?: string | null;
}

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        toast.error("Failed to load blog posts");
      }
    } catch {
      toast.error("Error loading blog posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        toast.success("Blog post deleted successfully");
      } else {
        toast.error("Failed to delete blog post");
      }
    } catch {
      toast.error("Error deleting blog post");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query) ||
      blog.slug.toLowerCase().includes(query) ||
      (blog.keywords && blog.keywords.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Blog Management
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Create, edit, and delete articles saved directly in your Supabase database.
            </p>
          </div>
          <div>
            <Button
              variant="default"
              size="lg"
              onClick={() => router.push("/dashboard/blogs/new")}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add New Blog Post
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search by title, description, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 rounded-xl border-border focus-visible:ring-primary/50"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Blog Post List */}
        {isLoading ? (
          <div className="flex justify-center py-20 text-muted-foreground">
            Loading posts from Supabase...
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => {
                const tags = blog.keywords
                  ? blog.keywords.split(",").map((kw) => kw.trim()).filter(Boolean)
                  : [];

                return (
                  <div
                    key={blog.id}
                    className={cn(
                      "group flex flex-col md:flex-row gap-6 p-5 rounded-xl border border-border/50 bg-card backdrop-blur-sm transition-all duration-200",
                      "hover:bg-accent/40 hover:shadow-md hover:border-primary/30"
                    )}
                  >
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          <span>
                            {new Date(blog.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-muted-foreground/80">
                            /blogs/{blog.slug}
                          </span>
                        </div>

                        <h3
                          className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer"
                          onClick={() => router.push(`/dashboard/blogs/${blog.slug}`)}
                        >
                          {blog.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {blog.description}
                        </p>
                      </div>

                      {/* Keywords / Tech Stack positioned at bottom of card */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
                          {tags.map((keyword, i) => (
                            <Badge key={i} variant="outline" className="text-[11px] py-0.5 px-2.5 rounded-full font-medium">
                              #{keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-end md:justify-center border-t md:border-t-0 md:border-l border-border/50 pt-3 md:pt-0 md:pl-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-muted"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => router.push(`/dashboard/blogs/${blog.slug}`)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Edit Post</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(blog.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Post</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border rounded-xl border-dashed">
                <div className="bg-muted/50 p-4 rounded-full">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-medium text-foreground">
                    No posts found
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {searchQuery ? `No posts matching "${searchQuery}"` : "You haven't created any blog posts yet."}
                  </p>
                </div>
                {searchQuery ? (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button onClick={() => router.push("/dashboard/blogs/new")}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Create First Post
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

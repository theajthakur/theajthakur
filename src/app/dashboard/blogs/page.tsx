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
  Send,
  Calendar,
  PlusIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  description?: string;
  content?: string;
  slug: string;
  tags: string[];
  thumbnail?: string;
  published: boolean;
  createdAt: string;
}

export default function BlogsPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      } else {
        toast.error("Failed to load blogs");
      }
    } catch {
      toast.error("Error loading blogs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const uniqueTags = [
    "All",
    ...new Set(blogs.flatMap((blog) => blog.tags || [])),
  ];

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch {
      toast.error("Error deleting blog");
    }
  };

  const handleTogglePublished = async (id: number) => {
    try {
      const blogToUpdate = blogs.find((b) => b.id === id);
      if (!blogToUpdate) return;

      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !blogToUpdate.published }),
      });

      if (res.ok) {
        const updatedBlog = await res.json();
        setBlogs(
          blogs.map((b) =>
            b.id === id ? { ...b, published: updatedBlog.published } : b
          )
        );
        toast.success(
          updatedBlog.published ? "Blog published!" : "Blog reverted to draft"
        );
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Error updating status");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const query = searchQuery.toLowerCase();
    const matchQuery =
      blog.title.toLowerCase().includes(query) ||
      (blog.content &&
        blog.content.substring(0, 200).toLowerCase().includes(query)) ||
      (blog.tags && blog.tags.some((tag) => tag.toLowerCase().includes(query)));

    const matchTag =
      selectedTag === "All" || (blog.tags && blog.tags.includes(selectedTag));

    return matchQuery && matchTag;
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
            Blog Management
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Manage your articles, track published status, and curate content for
            your readers.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-30 bg-background/95 backdrop-blur py-4">
          <div className="relative w-full md:max-w-md">
            <Input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 rounded-full border-primary/20 focus-visible:ring-primary/50"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {uniqueTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className={cn(
                  "cursor-pointer text-sm px-3 py-1 whitespace-nowrap transition-all",
                  selectedTag === tag
                    ? "hover:bg-primary/90"
                    : "hover:bg-secondary/50"
                )}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div>
            <Button
              variant="default"
              size="lg"
              onClick={() => router.push("/dashboard/blogs/new")}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add New Blog
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">Loading blogs...</div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className={cn(
                    "group flex flex-col md:flex-row gap-6 p-4 rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm transition-all duration-300",
                    "hover:bg-card/80 hover:shadow-lg hover:border-primary/20",
                    !blog.published && "opacity-75 bg-muted/30"
                  )}
                >
                  <div className="relative w-full md:w-48 h-48 md:h-32 shrink-0 rounded-lg overflow-hidden md:self-center bg-muted">
                    {blog.thumbnail ? (
                      <img
                        src={blog.thumbnail}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No Image
                      </div>
                    )}
                    {!blog.published && (
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 backdrop-blur-md"
                        >
                          Draft
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-1 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <h3
                          className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 cursor-pointer"
                          onClick={() =>
                            router.push(`/dashboard/blogs/${blog.slug}`)
                          }
                        >
                          {blog.title}
                        </h3>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-2 font-primary">
                        {blog.content?.substring(0, 150)}...
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="bg-secondary/30 px-2 py-0.5 rounded text-foreground/80"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end md:justify-center items-center gap-2 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-4 mt-2 md:mt-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-secondary"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/dashboard/blogs/${blog.slug}`)
                          }
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleTogglePublished(blog.id)}
                        >
                          {blog.published ? (
                            <>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Revert to Draft</span>
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              <span>Publish</span>
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border rounded-xl border-dashed">
                <div className="bg-muted/50 p-4 rounded-full">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-medium text-foreground">
                    No blogs found
                  </p>
                  <p className="text-muted-foreground">
                    No results for "{searchQuery}"
                    {selectedTag !== "All" && ` with tag "${selectedTag}"`}.
                  </p>
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

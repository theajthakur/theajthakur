"use client";
import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Save, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

export default function BlogEditor() {
  const router = useRouter();
  const params = useParams();
  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const isNew = slugParam === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("## Introduction\n\nWrite your blog content here...");
  const [keywords, setKeywords] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [currentId, setCurrentId] = useState<number | null>(null);

  // Slug check states
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "unique" | "taken">("idle");
  const isManualSlugRef = useRef(false);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!isNew && slugParam) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/blogs/${slugParam}`);
          if (res.ok) {
            const blog = await res.json();
            setTitle(blog.title || "");
            setSlug(blog.slug || "");
            setDescription(blog.description || "");
            setContent(blog.content || "");
            setKeywords(blog.keywords || "");
            setCurrentId(blog.id);
            isManualSlugRef.current = true;
          } else {
            toast.error("Blog post not found");
            router.push("/dashboard/blogs");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch blog post details");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchBlog();
  }, [isNew, slugParam, router]);

  // Debounced auto-slug generation & uniqueness check on Title change
  useEffect(() => {
    if (!isNew || isManualSlugRef.current || !title.trim()) return;

    const timer = setTimeout(async () => {
      const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      if (!baseSlug) {
        setSlug("");
        setSlugStatus("idle");
        return;
      }

      setIsCheckingSlug(true);
      setSlugStatus("checking");

      try {
        let candidateSlug = baseSlug;
        let isUnique = false;
        let attempts = 0;

        while (!isUnique && attempts < 5) {
          const checkRes = await fetch(
            `/api/blogs/check-slug?slug=${encodeURIComponent(candidateSlug)}`
          );
          const checkData = await checkRes.json();

          if (checkData.isUnique) {
            isUnique = true;
          } else {
            attempts++;
            const randomSuffix = Math.random().toString(36).substring(2, 6);
            candidateSlug = `${baseSlug}-${randomSuffix}`;
          }
        }

        setSlug(candidateSlug);
        setSlugStatus(isUnique ? "unique" : "taken");
      } catch (err) {
        console.error("Error checking slug:", err);
        setSlug(baseSlug);
        setSlugStatus("idle");
      } finally {
        setIsCheckingSlug(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [title, isNew]);

  // Debounced uniqueness check when user manually edits slug
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isManualSlugRef.current = true;
    const rawVal = e.target.value;
    const formatted = rawVal.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setSlug(formatted);
  };

  useEffect(() => {
    if (!slug.trim() || !isManualSlugRef.current) return;

    const timer = setTimeout(async () => {
      setIsCheckingSlug(true);
      setSlugStatus("checking");

      try {
        const checkRes = await fetch(
          `/api/blogs/check-slug?slug=${encodeURIComponent(slug)}`
        );
        const checkData = await checkRes.json();
        setSlugStatus(checkData.isUnique ? "unique" : "taken");
      } catch {
        setSlugStatus("idle");
      } finally {
        setIsCheckingSlug(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [slug]);

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !description.trim() || !content.trim()) {
      toast.error("Please fill in all required fields: Title, Slug, Description, Content");
      return;
    }

    if (slugStatus === "taken") {
      toast.error("The slug is already taken. Please enter a unique slug.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isNew) {
        const checkRes = await fetch(`/api/blogs/check-slug?slug=${encodeURIComponent(slug)}`);
        const checkData = await checkRes.json();
        if (!checkData.isUnique) {
          throw new Error("Slug already exists. Please pick a unique slug.");
        }
      }

      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim(),
        content: content.trim(),
        keywords: keywords.trim() || null,
      };

      let res;
      if (isNew) {
        res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/blogs/${currentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save post");
      }

      toast.success(
        isNew ? "Blog post created successfully!" : "Blog post updated successfully!"
      );
      router.push("/dashboard/blogs");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background font-primary">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading post...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-8 max-w-7xl mx-auto font-primary">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/blogs")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-heading">
              {isNew ? "Create New Blog Post" : "Edit Blog Post"}
            </h1>
            <p className="text-muted-foreground">
              {isNew ? "Draft a new article for your website." : `Editing: ${title}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.push("/dashboard/blogs")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting || isCheckingSlug}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Post
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor Main Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg font-semibold">
                  Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter blog post title..."
                  className="text-lg py-6 font-medium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Description Input */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-lg font-semibold">
                  Description / Excerpt <span className="text-destructive">*</span>
                </Label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder="Brief summary or meta description for search engines..."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Content Markdown Editor */}
              <div data-color-mode="light" className="space-y-2">
                <Label className="text-lg font-semibold">
                  Content (Markdown) <span className="text-destructive">*</span>
                </Label>
                <div className="rounded-xl overflow-hidden border border-border">
                  <MDEditor
                    height={500}
                    value={content}
                    onChange={(val) => setContent(val || "")}
                    preview="live"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-6">
              {/* URL Slug Input with Status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="slug" className="font-semibold">
                    URL Slug <span className="text-destructive">*</span>
                  </Label>
                  {isCheckingSlug && (
                    <Badge variant="outline" className="text-xs text-muted-foreground flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" /> Checking...
                    </Badge>
                  )}
                  {!isCheckingSlug && slugStatus === "unique" && slug && (
                    <Badge variant="secondary" className="text-xs text-green-600 dark:text-green-400 bg-green-500/10 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Unique
                    </Badge>
                  )}
                  {!isCheckingSlug && slugStatus === "taken" && slug && (
                    <Badge variant="destructive" className="text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Taken
                    </Badge>
                  )}
                </div>
                <Input
                  type="text"
                  id="slug"
                  placeholder="my-blog-post-slug"
                  value={slug}
                  onChange={handleSlugChange}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <span>URL Path:</span>
                  <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded text-[11px]">
                    /blogs/{slug || "post-slug"}
                  </code>
                </p>
              </div>

              {/* Keywords */}
              <div className="space-y-2">
                <Label htmlFor="keywords" className="font-semibold">
                  Keywords
                </Label>
                <Input
                  type="text"
                  id="keywords"
                  placeholder="nextjs, react, supabase, tutorial"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated keywords or tags for SEO and categorisation.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

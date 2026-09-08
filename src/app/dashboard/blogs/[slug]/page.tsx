"use client";
import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Columns2,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { BoneyardSkeleton, EditorPageSkeleton } from "@/components/common/Skeletons";

type PreviewMode = "edit" | "live" | "preview";

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
  const [previewMode, setPreviewMode] = useState<PreviewMode>("edit");

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
          toast.error("Failed to fetch blog post");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchBlog();
  }, [isNew, slugParam, router]);

  // Auto-slug from title (new posts only)
  useEffect(() => {
    if (!isNew || isManualSlugRef.current || !title.trim()) return;
    const timer = setTimeout(async () => {
      const baseSlug = title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      if (!baseSlug) { setSlug(""); setSlugStatus("idle"); return; }
      setIsCheckingSlug(true); setSlugStatus("checking");
      try {
        let candidate = baseSlug; let unique = false; let tries = 0;
        while (!unique && tries < 5) {
          const r = await fetch(`/api/blogs/check-slug?slug=${encodeURIComponent(candidate)}`);
          const d = await r.json();
          if (d.isUnique) { unique = true; }
          else { tries++; candidate = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`; }
        }
        setSlug(candidate); setSlugStatus(unique ? "unique" : "taken");
      } catch { setSlug(baseSlug); setSlugStatus("idle"); }
      finally { setIsCheckingSlug(false); }
    }, 400);
    return () => clearTimeout(timer);
  }, [title, isNew]);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    isManualSlugRef.current = true;
    setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  useEffect(() => {
    if (!slug.trim() || !isManualSlugRef.current) return;
    const timer = setTimeout(async () => {
      setIsCheckingSlug(true); setSlugStatus("checking");
      try {
        const exclude = currentId ? `&excludeId=${currentId}` : "";
        const r = await fetch(`/api/blogs/check-slug?slug=${encodeURIComponent(slug)}${exclude}`);
        const d = await r.json();
        setSlugStatus(d.isUnique ? "unique" : "taken");
      } catch { setSlugStatus("idle"); }
      finally { setIsCheckingSlug(false); }
    }, 400);
    return () => clearTimeout(timer);
  }, [slug, currentId]);

  const handleSave = async () => {
    if (!title.trim() || !slug.trim() || !description.trim() || !content.trim()) {
      toast.error("Title, Slug, Description and Content are all required.");
      return;
    }
    if (slugStatus === "taken") { toast.error("Slug is already taken."); return; }
    setIsSubmitting(true);
    try {
      if (isNew) {
        const r = await fetch(`/api/blogs/check-slug?slug=${encodeURIComponent(slug)}`);
        const d = await r.json();
        if (!d.isUnique) throw new Error("Slug already exists. Pick a unique slug.");
      }
      const payload = { title: title.trim(), slug: slug.trim(), description: description.trim(), content: content.trim(), keywords: keywords.trim() || null };
      const res = isNew
        ? await fetch("/api/blogs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch(`/api/blogs/${currentId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error || "Failed to save"); }
      toast.success(isNew ? "Post created!" : "Post updated!");
      router.push("/dashboard/blogs");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const SaveButton = () => (
    <Button onClick={handleSave} disabled={isSubmitting || isCheckingSlug}>
      {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving…</> : <><Save className="mr-2 h-4 w-4" />Save Post</>}
    </Button>
  );

  return (
    <BoneyardSkeleton loading={isLoading} name="blog-editor-page" fallback={<EditorPageSkeleton />}>
      <div className="space-y-6 font-primary">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <Button variant="ghost" size="icon" className="shrink-0 mt-0.5" onClick={() => router.push("/dashboard/blogs")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold font-heading leading-tight truncate">
                {isNew ? "Create New Post" : "Edit Post"}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5 truncate">
                {isNew ? "Draft a new article for your website." : `Editing: ${title}`}
              </p>
            </div>
          </div>
          <div className="flex gap-2 sm:self-end">
            <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => router.push("/dashboard/blogs")}>
              Cancel
            </Button>
            <div className="flex-1 sm:flex-none"><SaveButton /></div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main editor */}
          <div className="lg:col-span-2 space-y-5">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">

                <div className="space-y-2">
                  <Label htmlFor="title">Title <span className="text-destructive">*</span></Label>
                  <Input
                    id="title"
                    placeholder="Enter blog post title…"
                    className="text-base font-medium h-11"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description / Excerpt <span className="text-destructive">*</span></Label>
                  <Textarea
                    id="description"
                    rows={3}
                    placeholder="Brief summary shown in cards and used as meta description…"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <Separator />

                {/* Markdown editor with mode toggle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <Label>Content (Markdown) <span className="text-destructive">*</span></Label>
                    <Tabs value={previewMode} onValueChange={(v) => setPreviewMode(v as PreviewMode)}>
                      <TabsList className="h-8">
                        <TabsTrigger value="edit" className="text-xs px-2 h-7 gap-1">
                          <EyeOff className="h-3.5 w-3.5" /><span className="hidden sm:inline">Edit</span>
                        </TabsTrigger>
                        <TabsTrigger value="live" className="text-xs px-2 h-7 gap-1">
                          <Columns2 className="h-3.5 w-3.5" /><span className="hidden sm:inline">Split</span>
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="text-xs px-2 h-7 gap-1">
                          <Eye className="h-3.5 w-3.5" /><span className="hidden sm:inline">Preview</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  <div data-color-mode="light" className="rounded-lg overflow-hidden border border-input">
                    <MDEditor
                      height={480}
                      value={content}
                      onChange={(val) => setContent(val || "")}
                      preview={previewMode}
                      visibleDragbar={false}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supports full Markdown — headings, code blocks, tables, links, images.
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">

                {/* Slug */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <Label htmlFor="slug">URL Slug <span className="text-destructive">*</span></Label>
                    {isCheckingSlug && (
                      <Badge variant="outline" className="text-xs gap-1 shrink-0">
                        <Loader2 className="h-3 w-3 animate-spin" />Checking…
                      </Badge>
                    )}
                    {!isCheckingSlug && slugStatus === "unique" && slug && (
                      <Badge variant="secondary" className="text-xs gap-1 shrink-0 text-green-600 bg-green-500/10">
                        <CheckCircle2 className="h-3 w-3" />Unique
                      </Badge>
                    )}
                    {!isCheckingSlug && slugStatus === "taken" && slug && (
                      <Badge variant="destructive" className="text-xs gap-1 shrink-0">
                        <AlertCircle className="h-3 w-3" />Taken
                      </Badge>
                    )}
                  </div>
                  <Input
                    id="slug"
                    placeholder="my-blog-post-slug"
                    value={slug}
                    onChange={handleSlugChange}
                    className="font-mono text-sm"
                  />
                </div>

                <Separator />

                {/* Keywords */}
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="nextjs, react, tutorial…"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated keywords for SEO.
                  </p>
                </div>

              </CardContent>
            </Card>

            {/* Mobile save repeat */}
            <Card className="lg:hidden">
              <CardContent className="pt-5 flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => router.push("/dashboard/blogs")}>
                  Cancel
                </Button>
                <div className="flex-1"><SaveButton /></div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </BoneyardSkeleton>
  );
}

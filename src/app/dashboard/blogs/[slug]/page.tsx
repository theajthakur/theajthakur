"use client";
import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

const AVAILABLE_TAGS = [
  "full-stack-development",
  "web-development",
  "frontend-development",
  "backend-development",
  "javascript",
  "typescript",
  "react",
  "nextjs",
  "nodejs",
  "api-design",
  "rest-apis",
  "nestjs",
  "database-design",
  "system-design",
  "scalable-apps",
  "aws",
  "s3",
  "cloud-computing",
  "serverless",
  "docker",
  "devops-basics",
  "learning-in-public",
  "building-projects",
  "developer-journey",
  "problem-solving",
  "debugging",
  "freelance-development",
  "startup-building",
  "performance-optimization",
  "best-practices",
];

export default function BlogEditor() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.slug === "new";

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("**Hello world!!!**");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!isNew && params.slug) {
        try {
          const res = await fetch(`/api/blogs`);
          const blogs = await res.json();
          const blog = blogs.find(
            (b: { slug: string | string[] }) => b.slug === params.slug
          );

          if (blog) {
            setTitle(blog.title);
            setSlug(blog.slug);
            setContent(blog.content);
            setSelectedTags(blog.tags);
            setThumbnail(blog.thumbnail || "");
            setCurrentId(blog.id);
          } else {
            toast.error("Blog not found");
            router.push("/dashboard/blogs");
          }
        } catch {
          toast.error("Failed to fetch blog details");
        }
      }
    };
    fetchBlog();
  }, [isNew, params.slug, router]);

  useEffect(() => {
    if (isNew && title && !slug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  }, [title, isNew, slug]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const signRes = await fetch("/api/cloudinary");
      const signData = await signRes.json();

      if (!signRes.ok) throw new Error("Failed to get upload signature");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", signData.apiKey);
      formData.append("timestamp", signData.timestamp);
      formData.append("signature", signData.signature);

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok)
        throw new Error(uploadData.error?.message || "Upload failed");

      setThumbnail(uploadData.secure_url);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title || !content || !slug) {
      toast.error("Please fill in all required fields (Title, Slug, Content)");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isNew) {
        const checkRes = await fetch(`/api/blogs/check-slug?slug=${slug}`);
        const checkData = await checkRes.json();
        if (!checkData.isUnique) {
          throw new Error("Slug already exists");
        }
      }

      const payload = {
        title,
        slug,
        content,
        tags: selectedTags,
        thumbnail,
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
        throw new Error(err.error || "Failed to save blog");
      }

      toast.success(
        isNew ? "Blog created successfully!" : "Blog updated successfully!"
      );
      router.push("/dashboard/blogs");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-8 max-w-7xl mx-auto font-primary">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-heading">
              {isNew ? "Create New Blog" : "Edit Blog"}
            </h1>
            <p className="text-muted-foreground">
              {isNew
                ? "Share your knowledge with the world."
                : `Editing: ${title}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting || uploading}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-lg font-semibold">
                  Blog Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  placeholder="Enter an engaging title..."
                  className="text-lg py-6 font-medium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div data-color-mode="light" className="space-y-2">
                <Label className="text-lg font-semibold">Content</Label>
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

        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label className={""} htmlFor="slug">
                  URL Slug
                </Label>
                <Input
                  type="text"
                  id="slug"
                  placeholder="post-url-slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  The URL-friendly version of the name.
                </p>
              </div>

              <div className="space-y-2">
                <Label className={""}>Thumbnail Image</Label>
                <div className="flex flex-col gap-3">
                  {thumbnail ? (
                    <div className="relative aspect-video rounded-md overflow-hidden border border-border">
                      <img
                        src={thumbnail}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => setThumbnail("")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center text-center gap-2 hover:bg-muted/50 transition-colors">
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        No image selected
                      </p>
                    </div>
                  )}

                  <div className="relative">
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled={uploading}
                    >
                      {uploading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ImageIcon className="mr-2 h-4 w-4" />
                      )}
                      {uploading ? "Uploading..." : "Upload Image"}
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </div>

                  <div className="relative">
                    <span className="bg-background px-2 text-muted-foreground text-xs absolute left-1/2 -top-2.5 -translate-x-1/2">
                      OR
                    </span>
                    <div className="border-t border-border"></div>
                  </div>

                  <Input
                    type="text"
                    placeholder="Paste Image URL"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="text-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className={""}>Tags</Label>
                  <span className="text-xs text-muted-foreground">
                    {selectedTags.length} selected
                  </span>
                </div>

                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        onClick={() => toggleTag(tag)}
                      >
                        {tag} <X className="ml-1 h-3 w-3" />
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="h-64 overflow-y-auto border rounded-md p-2 space-y-1 custom-scrollbar">
                  {AVAILABLE_TAGS.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`flex items-center justify-between px-2 py-1.5 rounded-sm cursor-pointer text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted text-muted-foreground"
                      }`}
                    >
                      # {tag}
                      {selectedTags.includes(tag) && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

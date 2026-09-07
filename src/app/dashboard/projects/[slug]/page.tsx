"use client";
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Save,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FolderKanban,
  Star,
  Globe,
  Github,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { BoneyardSkeleton, EditorPageSkeleton } from "@/components/common/Skeletons";
import { CloudinaryFileUploader } from "@/components/common/ImageCropModal";

export default function ProjectEditorPage() {
  const router = useRouter();
  const params = useParams();
  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const isNew = slugParam === "new";

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [github, setGithub] = useState("");
  const [link, setLink] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Slug check states
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);
  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "unique" | "taken">("idle");
  const isManualSlugRef = useRef(false);

  useEffect(() => {
    setImgError(false);
  }, [thumbnail]);

  useEffect(() => {
    const fetchProject = async () => {
      if (!isNew && slugParam) {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/projects/${slugParam}`);
          if (res.ok) {
            const project = await res.json();
            setName(project.name || "");
            setCategory(project.category || "");
            setSlug(project.slug || "");
            setDescription(project.description || "");
            setLiveLink(project.live_link || "");
            setGithub(project.github || "");
            setLink(project.link || "");
            setThumbnail(
              Array.isArray(project.thumbnail) ? project.thumbnail.join(", ") : ""
            );
            setTags(
              Array.isArray(project.tags) ? project.tags.join(", ") : ""
            );
            setFeatured(!!project.featured);
            setCurrentId(project.id);
            isManualSlugRef.current = true;
          } else {
            toast.error("Project not found");
            router.push("/dashboard/projects");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to fetch project details");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProject();
  }, [isNew, slugParam, router]);

  // Debounced auto-slug generation on Name change for new projects
  useEffect(() => {
    if (!isNew || isManualSlugRef.current || !name.trim()) return;

    const timer = setTimeout(async () => {
      const baseSlug = name
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
            `/api/projects/check-slug?slug=${encodeURIComponent(candidateSlug)}`
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
        console.error("Error checking project slug:", err);
        setSlug(baseSlug);
        setSlugStatus("idle");
      } finally {
        setIsCheckingSlug(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [name, isNew]);

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
        const excludeParam = currentId ? `&excludeId=${currentId}` : "";
        const checkRes = await fetch(
          `/api/projects/check-slug?slug=${encodeURIComponent(slug)}${excludeParam}`
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
  }, [slug, currentId]);

  const resolveThumbnailUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return "";
    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://") ||
      trimmed.startsWith("/")
    ) {
      return trimmed;
    }
    return `/assets/projects/${trimmed}`;
  };

  const handleSave = async () => {
    if (!name.trim() || !slug.trim()) {
      toast.error("Please fill in required fields: Name and Slug");
      return;
    }

    if (slugStatus === "taken" && isNew) {
      toast.error("The slug is already taken. Please enter a unique slug.");
      return;
    }

    setIsSubmitting(true);
    try {
      const thumbnailArray = thumbnail
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const tagsArray = tags
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name: name.trim(),
        slug: slug.trim(),
        category: category.trim() || null,
        description: description.trim() || null,
        live_link: liveLink.trim() || null,
        github: github.trim() || null,
        link: link.trim() || null,
        thumbnail: thumbnailArray,
        tags: tagsArray,
        featured,
      };

      let res;
      if (isNew) {
        res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        const targetId = currentId || slugParam;
        res = await fetch(`/api/projects/${targetId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save project");
      }

      toast.success(
        isNew ? "Project created successfully!" : "Project updated successfully!"
      );
      router.push("/dashboard/projects");
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BoneyardSkeleton
      loading={isLoading}
      name="project-editor-page"
      fallback={<EditorPageSkeleton />}
    >
      <div className="min-h-screen bg-background p-4 md:p-8 space-y-8 max-w-7xl mx-auto font-primary">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard/projects")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-heading">
                {isNew ? "Create New Project" : "Edit Project"}
              </h1>
              <p className="text-muted-foreground">
                {isNew ? "Add a new showcase project to your portfolio." : `Editing: ${name}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push("/dashboard/projects")}
            >
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
                  Save Project
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6 space-y-6">
                {/* Project Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg font-semibold">
                    Project Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="e.g. ShopAgent - AI Commerce Layer"
                    className="text-lg py-6 font-medium"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-lg font-semibold">
                    Description
                  </Label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Comprehensive overview of features, architecture, and technology used..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* Links Section */}
                <div className="space-y-4 pt-4 border-t border-border/40">
                  <h3 className="text-base font-semibold font-heading flex items-center gap-2">
                    <Globe className="h-4 w-4 text-primary" /> Links & URLs
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="liveLink" className="text-sm font-medium flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground" /> Live Link
                      </Label>
                      <Input
                        type="url"
                        id="liveLink"
                        placeholder="https://shopagent.vercel.app"
                        value={liveLink}
                        onChange={(e) => setLiveLink(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="github" className="text-sm font-medium flex items-center gap-1.5">
                        <Github className="h-3.5 w-3.5 text-muted-foreground" /> GitHub Repository
                      </Label>
                      <Input
                        type="url"
                        id="github"
                        placeholder="https://github.com/username/repo"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="link" className="text-sm font-medium">
                      Additional Link / Case Study URL
                    </Label>
                    <Input
                      type="url"
                      id="link"
                      placeholder="https://example.com/case-study"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                </div>

                {/* Thumbnail Image Upload (Cloudinary + Crop) */}
                <div className="space-y-3 pt-4 border-t border-border/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <Label className="text-base font-semibold flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-primary" /> Project Cover Image
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Strictly file uploads only. Select a file from your device, crop it to fit, and upload to Cloudinary.
                      </p>
                    </div>
                    <CloudinaryFileUploader
                      folder="projects"
                      label={thumbnail ? "Crop & Change Image" : "Upload & Crop Image"}
                      onUploadSuccess={(url) => setThumbnail(url)}
                    />
                  </div>

                  {/* Image Display & Controls Container */}
                  {(() => {
                    const firstThumb = thumbnail.split(",")[0]?.trim() || "";
                    const previewSrc = resolveThumbnailUrl(firstThumb);

                    return (
                      <div className="mt-3 relative w-full h-56 rounded-xl overflow-hidden border border-border/50 bg-muted/40 flex items-center justify-center group">
                        {previewSrc && !imgError ? (
                          <>
                            <img
                              key={previewSrc}
                              src={previewSrc}
                              alt="Thumbnail Preview"
                              className="w-full h-full object-cover"
                              onError={() => setImgError(true)}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
                              <CloudinaryFileUploader
                                folder="projects"
                                label="Crop & Replace"
                                onUploadSuccess={(url) => setThumbnail(url)}
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => setThumbnail("")}
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Remove
                              </Button>
                            </div>
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 text-muted-foreground">
                            <ImageIcon className="h-10 w-10 text-muted-foreground/60" />
                            <p className="text-xs font-mono bg-muted px-3 py-1 rounded-md max-w-sm truncate text-foreground border border-border/40">
                              {previewSrc || "No cover image uploaded yet"}
                            </p>
                            {imgError && previewSrc && (
                              <span className="text-[11px] text-amber-500 font-medium flex items-center gap-1">
                                <AlertCircle className="h-3.5 w-3.5" /> Image not found at specified path
                              </span>
                            )}
                            <CloudinaryFileUploader
                              folder="projects"
                              label="Select File to Crop & Upload"
                              onUploadSuccess={(url) => setThumbnail(url)}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <Card className="border-border/50 shadow-sm">
              <CardContent className="p-6 space-y-6">
                {/* Featured Checkbox */}
                <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured" className="font-semibold cursor-pointer flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> Featured Project
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Highlight this project on home & portfolio pages.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-5 w-5 rounded border-border accent-primary cursor-pointer"
                  />
                </div>

                {/* URL Slug Input */}
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
                    placeholder="my-project-slug"
                    value={slug}
                    onChange={handleSlugChange}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <span>Path:</span>
                    <code className="font-mono text-foreground bg-muted px-1.5 py-0.5 rounded text-[11px]">
                      /p/{slug || "project-slug"}
                    </code>
                  </p>
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-semibold">
                    Category
                  </Label>
                  <Input
                    type="text"
                    id="category"
                    placeholder="Full Stack, AI & ML, Mobile App, etc."
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="text-sm"
                  />
                </div>

                {/* Tech Stack / Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags" className="font-semibold">
                    Tech Stack / Tags
                  </Label>
                  <Input
                    type="text"
                    id="tags"
                    placeholder="React, Next.js, Supabase, Tailwind, Python"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated list of technologies used in this project.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </BoneyardSkeleton>
  );
}

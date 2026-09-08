"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Save,
  ArrowLeft,
  Loader2,
  AlertCircle,
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
  const [projectSlug, setProjectSlug] = useState(""); // stored slug from DB (for existing projects)

  // Computed slug from name (always auto-derived)
  const computedSlug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

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
            setProjectSlug(project.slug || "");
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
    if (!name.trim()) {
      toast.error("Please fill in the Project Name");
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
        // slug is always auto-derived from name on the server side; no need to send it
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
        <div className="flex flex-col gap-3">
          {/* Top row: back button + title */}
          <div className="flex items-start gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 mt-0.5"
              onClick={() => router.push("/dashboard/projects")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold font-heading leading-tight truncate">
                {isNew ? "Create New Project" : "Edit Project"}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5 truncate">
                {isNew ? "Add a new showcase project to your portfolio." : `Editing: ${name}`}
              </p>
            </div>
          </div>
          {/* Action buttons — full width on mobile, auto on md+ */}
          <div className="flex items-center gap-2 sm:gap-3 sm:self-end">
            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={() => router.push("/dashboard/projects")}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting} className="flex-1 sm:flex-none">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 min-w-0">
                      <Label htmlFor="liveLink" className="text-sm font-medium flex items-center gap-1.5">
                        <Globe className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> Live Link
                      </Label>
                      <Input
                        type="url"
                        id="liveLink"
                        placeholder="https://shopagent.vercel.app"
                        value={liveLink}
                        onChange={(e) => setLiveLink(e.target.value)}
                        className="min-w-0"
                      />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <Label htmlFor="github" className="text-sm font-medium flex items-center gap-1.5">
                        <Github className="h-3.5 w-3.5 text-muted-foreground shrink-0" /> GitHub Repository
                      </Label>
                      <Input
                        type="url"
                        id="github"
                        placeholder="https://github.com/username/repo"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        className="min-w-0"
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
                  {/* Label row — always stacked, button never fights for space */}
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-primary shrink-0" />
                    <Label className="text-base font-semibold">Project Cover Image</Label>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    File uploads only. Select a file, crop it, and upload to Cloudinary.
                  </p>

                  {/* Image preview + upload controls */}
                  {(() => {
                    const firstThumb = thumbnail.split(",")[0]?.trim() || "";
                    const previewSrc = resolveThumbnailUrl(firstThumb);

                    return previewSrc && !imgError ? (
                      /* — has image — */
                      <div className="space-y-2">
                        <div className="relative w-full rounded-xl overflow-hidden border border-border/50 bg-muted/40 group">
                          <img
                            key={previewSrc}
                            src={previewSrc}
                            alt="Thumbnail Preview"
                            className="w-full h-56 object-cover"
                            onError={() => setImgError(true)}
                          />
                          {/* hover overlay */}
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
                        </div>
                        {/* Button always visible below image on mobile (no hover needed) */}
                        <div className="flex flex-wrap gap-2 sm:hidden">
                          <CloudinaryFileUploader
                            folder="projects"
                            label="Crop & Change Image"
                            onUploadSuccess={(url) => setThumbnail(url)}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setThumbnail("")}
                            className="text-destructive border-destructive/40 hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                    ) : (
                      /* — no image / error — */
                      <div className="w-full rounded-xl border border-dashed border-border/60 bg-muted/30 flex flex-col items-center justify-center gap-3 p-8 text-center">
                        <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
                        {imgError && previewSrc && (
                          <span className="text-[11px] text-amber-500 font-medium flex items-center gap-1">
                            <AlertCircle className="h-3.5 w-3.5" /> Image not found at specified path
                          </span>
                        )}
                        <p className="text-xs text-muted-foreground">No cover image uploaded yet</p>
                        <CloudinaryFileUploader
                          folder="projects"
                          label="Select File to Crop & Upload"
                          onUploadSuccess={(url) => setThumbnail(url)}
                        />
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
                <div className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border/50 bg-muted/20">
                  <div className="space-y-0.5 min-w-0">
                    <Label htmlFor="featured" className="font-semibold cursor-pointer flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-amber-500 fill-amber-500 shrink-0" /> Featured Project
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Highlight this project on home &amp; portfolio pages.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="h-5 w-5 shrink-0 mt-0.5 rounded border-border accent-primary cursor-pointer"
                  />
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

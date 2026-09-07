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
  FolderKanban,
  ExternalLink,
  Github,
  PlusIcon,
  Search,
  Star,
  Edit,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BoneyardSkeleton, ProjectsGridSkeleton } from "@/components/common/Skeletons";

interface Project {
  id: string;
  name: string;
  category?: string | null;
  slug: string;
  live_link?: string | null;
  github?: string | null;
  link?: string | null;
  description?: string | null;
  thumbnail?: string[] | null;
  tags?: string[] | null;
  featured?: boolean;
  created_at: string;
  updated_at: string;
}

export default function DashboardProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        toast.error("Failed to load projects");
      }
    } catch {
      toast.error("Error loading projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        toast.success("Project deleted successfully");
      } else {
        toast.error("Failed to delete project");
      }
    } catch {
      toast.error("Error deleting project");
    }
  };

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    const tagsStr = Array.isArray(project.tags) ? project.tags.join(" ") : "";
    return (
      project.name.toLowerCase().includes(query) ||
      (project.category && project.category.toLowerCase().includes(query)) ||
      (project.description && project.description.toLowerCase().includes(query)) ||
      project.slug.toLowerCase().includes(query) ||
      tagsStr.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 font-primary">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Projects Management
            </h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base">
              Create, edit, and manage portfolio projects saved in your database.
            </p>
          </div>
          <div>
            <Button
              variant="default"
              size="lg"
              onClick={() => router.push("/dashboard/projects/new")}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add New Project
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search by name, category, tech stack, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 rounded-xl border-border focus-visible:ring-primary/50"
          />
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Projects List */}
        <BoneyardSkeleton
          loading={isLoading}
          name="dashboard-projects"
          fallback={<ProjectsGridSkeleton count={6} />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => {
                const rawThumbnail =
                  Array.isArray(project.thumbnail) && project.thumbnail.length > 0
                    ? project.thumbnail[0]?.trim()
                    : null;
                const thumbnailSrc = rawThumbnail
                  ? rawThumbnail.startsWith("http") || rawThumbnail.startsWith("/")
                    ? rawThumbnail
                    : `/assets/projects/${rawThumbnail}`
                  : null;
                const tagsList = Array.isArray(project.tags) ? project.tags : [];

                return (
                  <div
                    key={project.id}
                    className={cn(
                      "group flex flex-col justify-between rounded-2xl border border-border/50 bg-card p-5 transition-all duration-200",
                      "hover:bg-accent/30 hover:shadow-lg hover:border-primary/40 relative"
                    )}
                  >
                    <div>
                      {/* Thumbnail or Fallback */}
                      <div className="relative w-full h-44 rounded-xl overflow-hidden mb-4 bg-muted/60 border border-border/30 flex items-center justify-center">
                        {thumbnailSrc ? (
                          <img
                            src={thumbnailSrc}
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <FolderKanban className="h-12 w-12 text-muted-foreground/50" />
                        )}
                        {project.featured && (
                          <div className="absolute top-3 left-3 bg-amber-500 text-black px-2.5 py-1 rounded-full text-xs font-bold font-heading flex items-center gap-1 shadow-md">
                            <Star className="h-3 w-3 fill-black text-black" /> Featured
                          </div>
                        )}
                      </div>

                      {/* Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          {project.category ? (
                            <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary">
                              {project.category}
                            </Badge>
                          ) : (
                            <span />
                          )}
                          <span className="text-[11px] font-mono text-muted-foreground">
                            /{project.slug}
                          </span>
                        </div>

                        <h3
                          className="text-xl font-heading font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer line-clamp-1"
                          onClick={() => router.push(`/dashboard/projects/${project.slug}`)}
                        >
                          {project.name}
                        </h3>

                        {project.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 mt-4 border-t border-border/40">
                      {/* Tech Stack / Tags */}
                      {tagsList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {tagsList.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-[10px] py-0.5 px-2 font-medium">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Actions Footer */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                          {project.live_link && (
                            <a
                              href={project.live_link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-muted-foreground hover:text-primary p-1 transition-colors"
                              title="Live Preview"
                            >
                              <Globe className="h-4 w-4" />
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="text-muted-foreground hover:text-primary p-1 transition-colors"
                              title="GitHub Repository"
                            >
                              <Github className="h-4 w-4" />
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push(`/dashboard/projects/${project.slug}`)}
                            className="h-8 px-2.5 text-xs"
                          >
                            <Edit className="h-3.5 w-3.5 mr-1" /> Edit
                          </Button>

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
                                onClick={() => router.push(`/dashboard/projects/${project.slug}`)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Edit Project</span>
                              </DropdownMenuItem>
                              {project.live_link && (
                                <DropdownMenuItem
                                  onClick={() => window.open(project.live_link!, "_blank")}
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  <span>View Live</span>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDelete(project.id, project.name)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete Project</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center space-y-4 border rounded-2xl border-dashed p-8">
                <div className="bg-muted/50 p-4 rounded-full">
                  <FolderKanban className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-xl font-medium text-foreground">
                    No projects found
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {searchQuery ? `No projects matching "${searchQuery}"` : "You haven't added any projects yet."}
                  </p>
                </div>
                {searchQuery ? (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                ) : (
                  <Button onClick={() => router.push("/dashboard/projects/new")}>
                    <PlusIcon className="mr-2 h-4 w-4" /> Add First Project
                  </Button>
                )}
              </div>
            )}
          </div>
        </BoneyardSkeleton>
      </div>
    </div>
  );
}

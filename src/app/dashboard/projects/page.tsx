"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderKanban, PlusIcon, Search } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BoneyardSkeleton, ProjectsGridSkeleton } from "@/components/common/Skeletons";
import { DashboardProjectCard } from "./_components/DashboardProjectCard";

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
        setProjects(await res.json());
      } else {
        toast.error("Failed to load projects");
      }
    } catch {
      toast.error("Error loading projects");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        toast.success("Project deleted successfully");
      } else {
        toast.error("Failed to delete project");
      }
    } catch {
      toast.error("Error deleting project");
    }
  };

  const filteredProjects = projects.filter((p) => {
    const q = searchQuery.toLowerCase();
    const tags = Array.isArray(p.tags) ? p.tags.join(" ") : "";
    return (
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      p.slug.toLowerCase().includes(q) ||
      tags.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 py-6 font-primary">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-heading font-bold text-foreground truncate">
            Projects
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage your portfolio projects.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => router.push("/dashboard/projects/new")}
          className="shrink-0"
        >
          <PlusIcon className="mr-1.5 h-4 w-4" /> Add Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search by name, category, tech stack…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 rounded-lg border-border focus-visible:ring-primary/50"
        />
        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>

      {/* Grid */}
      <BoneyardSkeleton
        loading={isLoading}
        name="dashboard-projects"
        fallback={<ProjectsGridSkeleton count={6} />}
      >
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <DashboardProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 border rounded-xl border-dashed border-border/60 p-8">
            <div className="bg-muted/50 p-4 rounded-full">
              <FolderKanban className="h-8 w-8 text-muted-foreground/60" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-medium text-foreground">No projects found</p>
              <p className="text-muted-foreground text-sm">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : "You haven't added any projects yet."}
              </p>
            </div>
            {searchQuery ? (
              <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            ) : (
              <Button size="sm" onClick={() => router.push("/dashboard/projects/new")}>
                <PlusIcon className="mr-1.5 h-4 w-4" /> Add First Project
              </Button>
            )}
          </div>
        )}
      </BoneyardSkeleton>
    </div>
  );
}

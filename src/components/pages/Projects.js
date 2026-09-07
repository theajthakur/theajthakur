"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./_components/ProjectCard";
import ProjectSearch from "./_components/ProjectSearch";
import SearchModal from "./_components/SearchModal";
import { motion, AnimatePresence } from "framer-motion";
import { BoneyardSkeleton, ProjectsGridSkeleton } from "@/components/common/Skeletons";

export default function ProjectsGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          const normalized = data.map((p) => ({
            ...p,
            liveLink: p.live_link || p.liveLink,
            github: p.github,
            link: p.link || p.live_link,
            thumbnail: Array.isArray(p.thumbnail) ? p.thumbnail : [p.thumbnail].filter(Boolean),
            tags: Array.isArray(p.tags) ? p.tags : [],
          }));
          setProjects(normalized);
        }
      } catch (err) {
        console.error("Error loading projects from Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInput =
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.isContentEditable;

      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isInput)
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.tags &&
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  return (
    <div className="w-full">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">
          Featured <span className="text-primary">Projects</span>
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          A premium showcase of full-stack web applications, real-time multiplayer games, multi-tenant SaaS platforms, and developer tooling crafted by Vijay Thakur.
        </p>
      </div>

      <ProjectSearch
        value={searchQuery}
        onChange={setSearchQuery}
        onOpenModal={() => setIsSearchOpen(true)}
      />

      <BoneyardSkeleton
        loading={isLoading}
        name="projects-grid"
        fallback={<ProjectsGridSkeleton count={6} />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((e, index) => (
                <ProjectCard key={e.slug || e.name} project={e} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center py-20 text-muted-foreground col-span-full"
              >
                <p className="text-lg">
                  No projects found matching "{searchQuery}"
                </p>
                <p className="text-sm">Try adjusting your search terms</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </BoneyardSkeleton>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        projects={projects}
      />
    </div>
  );
}

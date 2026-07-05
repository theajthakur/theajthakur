"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Search, X, ArrowRight, CornerDownLeft, Keyboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const TRENDING_SEARCHES = [
  "Oppskills",
  "Multiplayer",
  "URL Shortener",
  "Ponion",
  "Rotaract",
];

const POPULAR_TECHS = [
  "Next.js",
  "FastAPI",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Python",
  "Tailwind CSS",
  "MongoDB",
];

export default function SearchModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  projects,
}) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Sync local query with parent query when modal opens
  useEffect(() => {
    if (isOpen) {
      setLocalQuery(searchQuery);
      // Short timeout to ensure DOM is ready and focus input
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, searchQuery]);

  // Filter projects based on local query
  const filteredProjects = localQuery
    ? projects.filter(
      (project) =>
        project.name.toLowerCase().includes(localQuery.toLowerCase()) ||
        project.category.toLowerCase().includes(localQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(localQuery.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(localQuery.toLowerCase())
        )
    )
    : [];

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [localQuery]);

  // Sync local changes to parent search query
  const handleSelectQuery = (query) => {
    setLocalQuery(query);
    setSearchQuery(query);
    onClose();
  };

  // Keyboard navigation for filtered projects
  useEffect(() => {
    if (!isOpen || filteredProjects.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredProjects.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const selected = filteredProjects[selectedIndex];
        if (selected) {
          window.open(selected.link, "_blank");
          handleSelectQuery(localQuery); // Update query context as well
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredProjects, selectedIndex, localQuery]);

  const handleClear = () => {
    setLocalQuery("");
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden border-border/40 bg-background/95 backdrop-blur-xl shadow-2xl rounded-2xl">
        <DialogTitle className="sr-only">Search Projects</DialogTitle>

        {/* Search Input Area */}
        <div className="relative flex items-center border-b border-border/45 p-4">
          <Search className="h-5 w-5 text-muted-foreground ml-1" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search projects by name, tags, description..."
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              // Proactively update parent query to sync main page
              setSearchQuery(e.target.value);
            }}
            className="w-full pl-3 pr-8 py-1.5 bg-transparent border-0 outline-hidden focus:ring-0 text-sm placeholder:text-muted-foreground text-foreground font-heading"
          />
          {localQuery && (
            <button
              onClick={handleClear}
              className="absolute right-4 p-1 hover:bg-muted/80 rounded-full text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Modal Content */}
        <div className="max-h-[380px] overflow-y-auto p-5 space-y-6 scrollbar-none">
          {localQuery === "" ? (
            <>
              {/* Trending Searches */}
              <div className="space-y-2.5">
                <div className="text-xs text-primary font-heading font-bold tracking-wider select-none">Trending Searches</div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectQuery(term)}
                      className="px-3.5 py-1.5 text-xs rounded-full border border-primary/10 bg-primary/5 hover:bg-primary/10 hover:border-primary/25 text-primary hover:text-dark font-heading transition-all duration-300 cursor-pointer shadow-xs hover:scale-[1.01]"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="space-y-2.5">
                <div className="text-xs text-primary font-heading font-bold tracking-wider select-none">Popular Technologies</div>
                <div className="flex flex-wrap gap-1.5">
                  {POPULAR_TECHS.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleSelectQuery(tech)}
                      className="cursor-pointer"
                    >
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 rounded-full font-heading font-medium tracking-wide text-[10px] bg-muted/40 hover:bg-primary/10 hover:text-primary hover:border-primary/20 border border-transparent transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Search Results */
            <div className="space-y-2.5">
              <div className="text-[10px] text-muted-foreground font-heading font-bold uppercase tracking-wider select-none mb-1">
                Matching Projects ({filteredProjects.length})
              </div>

              {filteredProjects.length > 0 ? (
                <div className="space-y-2">
                  {filteredProjects.map((project, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <div
                        key={project.name}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => {
                          window.open(project.link, "_blank");
                          onClose();
                        }}
                        className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${isSelected
                          ? "bg-primary/5 border-primary/45 shadow-sm translate-x-1"
                          : "bg-card/10 border-border/30 hover:border-border/60"
                          }`}
                      >
                        {/* Thumbnail */}
                        {project.thumbnail && project.thumbnail[0] && (
                          <div className="relative w-20 aspect-1672/941 rounded-sm overflow-hidden shrink-0 border border-border/40 bg-muted/20">
                            <Image
                              src={`/assets/projects/${project.thumbnail[0]}`}
                              alt={project.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                        )}

                        <div className="flex flex-col space-y-0.5 min-w-0 pr-2">
                          <span className="text-[9px] tracking-wider text-primary font-bold font-heading uppercase">
                            {project.category}
                          </span>
                          <h4 className="text-sm font-heading font-semibold text-foreground truncate">
                            {project.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {isSelected && (
                            <span className="text-[9px] font-mono text-primary/60 border border-primary/15 bg-primary/5 px-1 py-0.5 rounded flex items-center gap-0.5 select-none animate-fade-in">
                              <span>Enter</span>
                              <CornerDownLeft className="h-2 w-2" />
                            </span>
                          )}
                          <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${isSelected ? "text-primary translate-x-0.5" : "text-muted-foreground/60"
                            }`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 space-y-1.5 select-none">
                  <p className="text-sm text-foreground font-heading font-medium">No results found for "{localQuery}"</p>
                  <p className="text-xs text-muted-foreground">Try searching for other keywords like "Next.js" or "FastAPI"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Help Footer */}
        <div className="flex items-center justify-between border-t border-border/40 px-5 py-3 bg-muted/20 select-none text-[10px] text-muted-foreground font-heading">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="bg-muted px-1.5 py-0.5 rounded border border-border text-[9px] font-mono">↑↓</span>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="bg-muted px-1.5 py-0.5 rounded border border-border text-[9px] font-mono">Enter</span>
              Select
            </span>
            <span className="flex items-center gap-1">
              <span className="bg-muted px-1.5 py-0.5 rounded border border-border text-[9px] font-mono">Esc</span>
              Close
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Keyboard className="h-3 w-3" />
            <span>Interactive Search</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

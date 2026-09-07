"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({ project, index }) {
  // Determine live link: explicit project.liveLink or fallback project.link (if not empty or '#')
  const liveUrl = project.liveLink || (project.link && project.link !== "#" ? project.link : null);

  // Render checks: missing or empty keys will not render corresponding buttons
  const hasLiveDemo = Boolean(liveUrl && liveUrl.trim() !== "");
  const hasGithub = Boolean(project.github && project.github.trim() !== "");
  const hasReadMore = Boolean(project.slug && project.slug.trim() !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="h-full flex w-full"
    >
      <Card className="overflow-hidden rounded-2xl p-4 sm:p-5 gap-0">
        <div>
          {/* Top Banner Image Container */}
          {project.thumbnail && project.thumbnail[0] && (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-muted/30 border border-border/20">
              <Image
                src={
                  project.thumbnail[0].startsWith("http") || project.thumbnail[0].startsWith("/")
                    ? project.thumbnail[0]
                    : `/assets/projects/${project.thumbnail[0]}`
                }
                alt={`${project.name} thumbnail`}
                fill
                priority={index < 2}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
          )}

          {/* Title Header */}
          <div className="mb-2">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-card-foreground group-hover:text-primary transition-colors tracking-tight">
              {project.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack Badges */}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-nowrap overflow-x-auto gap-1.5 sm:gap-2 mb-5 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="shrink-0 whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium bg-muted/70 hover:bg-muted text-foreground border-0 transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons Row */}
        {(hasLiveDemo || hasGithub || hasReadMore) && (
          <div className="flex items-center gap-2 pt-3 border-t border-border/40 mt-auto w-full">
            {hasReadMore && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-1 rounded-xl border-border/80 hover:bg-accent text-xs font-semibold h-10 px-3 cursor-pointer"
              >
                <Link href={project.slug.startsWith("/") ? project.slug : `/p/${project.slug}`}>
                  <FileText className="w-4 h-4 mr-1.5 shrink-0" />
                  <span className="truncate">Read More</span>
                </Link>
              </Button>
            )}

            {hasGithub && (
              <Button
                variant="outline"
                size="icon"
                asChild
                title="View Code on GitHub"
                className="rounded-xl border-border/80 hover:bg-accent h-10 w-10 shrink-0 cursor-pointer"
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
            )}

            {hasLiveDemo && (
              <Button
                size="icon"
                asChild
                title="Live Demo"
                className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 h-10 w-10 shrink-0 cursor-pointer shadow-xs"
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

